import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

// Patient Card Component
const PatientCard = ({ patient, onClick, navigate }) => {
  const handleNavigateToMedicalRecords = async () => {
    // Navigate to the Medical Records page and pass patient data via state
    const hospitalUID = await getCurrentUserHospitalUID();
    navigate(`/dashboard/medicalRecords?patientId=${patient.id}&hospitalId=${hospitalUID}`);
  };

  return (
    <section
      className="bg-white rounded-xl p-4 flex flex-col w-full gap-4 my-2"
    >
      <h4 className="font-semibold text-xl">{patient.name}</h4>
      <section className="flex flex-row gap-4">
        <p>Mobile : {patient.mobile}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Gender: {patient.gender}</p>
      </section>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={handleNavigateToMedicalRecords}
      >
        Add Medical Records
      </button>
    </section>
  );
};

const Patients = () => {
  const [hospitalUID, setHospitalUID] = useState(null);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllPersonnel = async () => {
    const patientsArray = [];
  
    try {
      const hospitalUID = await getCurrentUserHospitalUID();
  
      if (hospitalUID) {
        const hospitalDocRef = doc(db, "Hospitals", hospitalUID);
        const patientsCollectionRef = collection(hospitalDocRef, "patients");
  
        const querySnapshot = await getDocs(patientsCollectionRef);
  
        querySnapshot.forEach((doc) => {
          const patientsData = doc.data();
          const patientsObject = {
            id: doc.id,
            ...patientsData,
          };
          patientsArray.push(patientsObject);
        });
        console.log(patientsArray);
        setPatients(patientsArray);
        return patientsArray;
      } else {
        console.log("No hospital UID found for the current user");
        return null;
      }
    } catch (error) {
      console.error("Error fetching personnel:", error);
      return null;
    }
  };

  useEffect(() => {
  
    const fetchHospitalUID = async () => {
      try {
        const uid = await getCurrentUserHospitalUID();
        setHospitalUID(uid);
      } catch (error) {
        console.error('Error fetching hospital UID:', error);
      }
    };
  
    fetchHospitalUID();
    getAllPersonnel();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigateToPatientRegistration = () => {
    navigate("/dashboard/patientRegistration");
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-4 items-center">
      <div className="flex items-center gap-2">
        <TextField
          className="w-1/2"
          label="Search Patient"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateToPatientRegistration}
        >
          Add Patient
        </Button>
      </div>
      <div className="reception-scroll-container overflow-y-auto h-full w-full">
        {filteredPatients.map((patient, index) => (
          <PatientCard key={index} patient={patient} navigate={navigate}/>
        ))}
      </div>
    </div>
  );
};


export default Patients;