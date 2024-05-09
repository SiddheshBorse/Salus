import React, { useState, useEffect } from 'react';
import { auth,db } from "../../../firebase/firebase";
import { doc,getDocs,collection,getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const BillingPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const navigate = useNavigate();

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
        // Get the hospital ID from the current user
        const hospitalUID = await getCurrentUserHospitalUID();

        // Get the reference to the hospital document
        const hospitalDocRef = doc(db, 'Hospitals', hospitalUID);

        // Get the reference to the 'medicalRecords' collection
        const medicalRecordsCollectionRef = collection(hospitalDocRef, 'medicalRecords');

        // Fetch the medical records for the current hospital
        const querySnapshot = await getDocs(medicalRecordsCollectionRef);
        const records = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setMedicalRecords(records);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const handleNavigateToBilling = (recordId) => {
    navigate(`/dashboard/billing?recordId=${recordId}`);
  };

  const getPatientName = (patientId) => {
    const patient = patients.find((pat) => pat.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  return (
    <div className="bg-highlight h-full flex flex-col p-2 gap-2 overflow-scroll">
      <h2 className="font-bold text-2xl">Recent Medical Records</h2>
      {medicalRecords.map((record) => (
        <section
          key={record.id}
          className="bg-white rounded-xl p-4 flex flex-col gap-4 my-2"
        >
          <h4 className="font-semibold text-xl">{record.patientId}</h4>
          <section className="flex flex-row gap-4">
            <p>Date: {record.date}</p>
            <p>Reason of Visit: {record.reasonOfVisit}</p>
            <p>Doctor: {record.doctorId}</p>
          </section>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={() => handleNavigateToBilling(record.id)}
          >
            Bill Record
          </button>
        </section>
      ))}
    </div>
  );
};

export default BillingPage;