import React, { useState, useEffect } from 'react';
import { auth, db } from "../../../firebase/firebase";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      try {
        // Get the UID of the current user
        const userUID = currentUser.uid;
  
        // Reference to the "personnelMap" document
        const personnelMapDocRef = doc(db, "personnelMap", "personnelMap");
  
        // Get the document snapshot
        const personnelMapDocSnapshot = await getDoc(personnelMapDocRef);
  
        // Check if the document exists
        if (personnelMapDocSnapshot.exists()) {
          // Get the data from the document
          const personnelMapData = personnelMapDocSnapshot.data();
  
          // Check if the user's UID exists in the personnelMap
          if (personnelMapData && personnelMapData[userUID]) {
            const hospitalUID = personnelMapData[userUID];
  
            // Return the hospital UID
            return hospitalUID;
          }
        }
  
        // Document or user's UID not found
        console.log("No document or user's UID found");
        return null;
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    } else {
      // No user is signed in
      console.log("No user signed in");
      return null;
    }
  };

  useEffect(() => {
    const fetchMedicalRecords = async () => {
        try {
            const hospitalUID = await getCurrentUserHospitalUID();
            const hospitalDocRef = doc(db, 'Hospitals', hospitalUID);
            const medicalRecordsCollectionRef = collection(hospitalDocRef, 'medicalRecords');
            const doctorsCollectionRef = collection(hospitalDocRef, 'personnel');
            const patientsCollectionRef = collection(hospitalDocRef, 'patients');
    
            const medicalRecordsQuerySnapshot = await getDocs(medicalRecordsCollectionRef);
            const doctorsQuerySnapshot = await getDocs(doctorsCollectionRef);
            const patientsQuerySnapshot = await getDocs(patientsCollectionRef);
    
            const records = medicalRecordsQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const doctorsList = doctorsQuerySnapshot.docs
              .filter((doc) => doc.data().department === 'Doctor')
              .map((doc) => ({ id: doc.id, ...doc.data() }));
            const patientsList = patientsQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
            setMedicalRecords(records);
            setDoctors(doctorsList);
            setPatients(patientsList);
          } catch (error) {
            console.error('Error fetching medical records:', error);
          }
    };

    fetchMedicalRecords();
  }, []);

  const handleAddToSelectedRecords = (record) => {
    setSelectedRecords((prevRecords) => [...prevRecords, record]);
  };

  const handleRemoveFromSelectedRecords = (index) => {
    setSelectedRecords((prevRecords) => prevRecords.filter((_, i) => i !== index));
  };

  const generateBillPDF = () => {
    const doc = new jsPDF();
    const tableData = selectedRecords.flatMap((record) => [
      [record.patientId, record.date, record.reasonOfVisit, getDoctorName(record.doctorId), ''],
      ...record.servicesProvided.map((service) => ['', '', '', service.serviceName, parseFloat(service.servicePrice || 0)]),
      ['', '', '', 'Total', record.servicesProvided.reduce((total, service) => total + parseFloat(service.servicePrice || 0), 0)],
    ]);

    const grandTotal = selectedRecords.reduce((total, record) => {
      const recordTotal = record.servicesProvided.reduce((subTotal, service) => subTotal + parseFloat(service.servicePrice || 0), 0);
      return total + recordTotal;
    }, 0);

    doc.autoTable({
      head: [['Patient ID', 'Date', 'Reason of Visit', 'Doctor Name', 'Cost']],
      body: [...tableData, ['', '', '', 'Grand Total', grandTotal]],
      startY: 20,
    });

    doc.save('bill.pdf');
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((doc) => doc.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const getPatientName = (patientId) => {
    const patient = patients.find((pat) => pat.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const filteredRecords = medicalRecords.filter((record) =>
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-highlight h-full flex flex-col p-2 gap-2 overflow-scroll">
      <h2 className="font-bold text-2xl">Billing</h2>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      {filteredRecords.map((record) => (
        <div key={record.id}>
          <section className="bg-white rounded-xl p-4 flex flex-col gap-4 my-2">
            <h4 className="font-semibold text-xl">{getPatientName(record.patientId)}</h4>
            <section className="flex flex-row gap-4">
              <p>Phone: {record.patientPhoneNumber}</p>
              <p>Date: {record.date}</p>
              <p>Reason of Visit: {record.reasonOfVisit}</p>
              <p>Doctor: {getDoctorName(record.doctorId)}</p>
            </section>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() => handleAddToSelectedRecords(record)}
            >
              Add to Bill
            </button>
          </section>
        </div>
      ))}
      <h3 className="font-semibold text-xl">Selected Records</h3>
      {selectedRecords.map((record, index) => (
        <section key={index} className="bg-white rounded-xl p-4 flex flex-col gap-4 my-2">
          <h4 className="font-semibold text-xl">{getPatientName(record.patientId)}</h4>
          <section className="flex flex-row gap-4">
            <p>Phone: {record.patientPhoneNumber}</p>
            <p>Date: {record.date}</p>
            <p>Reason of Visit: {record.reasonOfVisit}</p>
            <p>Doctor: {getDoctorName(record.doctorId)}</p>
          </section>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={() => handleRemoveFromSelectedRecords(index)}
          >
            Remove from Bill
          </button>
        </section>
      ))}
      {selectedRecords.length > 0 && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={generateBillPDF}
        >
          Generate Bill PDF
        </button>
      )}
    </div>
  );
};

export default Billing;