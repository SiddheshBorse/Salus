import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const hospitalUID = await getCurrentUserHospitalUID();
      if (hospitalUID) {
        const patientsCollectionRef = collection(db, "Hospitals", hospitalUID, "patients");
        const querySnapshot = await getDocs(patientsCollectionRef);
        const patientData = [];
        querySnapshot.forEach((doc) => {
          patientData.push({ id: doc.id, ...doc.data() });
        });
        setPatients(patientData);
      } else {
        console.log("No hospital UID found for the current user");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const uid = currentUser.uid;
        const masterAccountDocRef = doc(db, "Master Accounts", uid);
        const docSnapshot = await getDoc(masterAccountDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          return userData.hospitalUID;
        } else {
          console.log("No document found for the current user");
          return null;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    } else {
      console.log("No user signed in");
      return null;
    }
  };

  const handleSearch = () => {
    // Perform search logic here
  };

  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center">
      <section className="flex items-center justify-between w-full">
        <TextField
          className="w-4/12"
          label="Search Patient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center">
          <Button
            className="bg-primary text-white py-2 px-4 font-bold rounded-lg mr-2"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Link to="/dashboard/patientRegistration">
            <Button
              className="bg-gray-700 text-white py-2 px-8 font-bold rounded-lg"
              variant="contained"
            >
              Add New Patient
            </Button>
          </Link>
        </div>
      </section>
      <div className="reception-scroll-container overflow-y-auto h-full w-full">
        {/* Render patient list here */}
        {loading ? (
          <p>Loading...</p>
        ) : patients.length === 0 ? (
          <p>No patients found</p>
        ) : (
          patients.map((patient) => (
            <div key={patient.id}>
              {/* Render patient details */}
              <p>{patient.name}</p>
              <p>{patient.email}</p>
              {/* Add more patient details as needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
