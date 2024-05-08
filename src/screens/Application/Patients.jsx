import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button, Modal, Box } from "@mui/material";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";

// Patient Card Component
const PatientCard = ({ patient, onClick }) => {
  return (
    <section
      className="bg-white rounded-xl p-4 flex flex-col w-full gap-4 my-2"
      onClick={() => onClick(patient)}
    >
      <h4 className="font-semibold text-xl">{patient.name}</h4>
      <section className="flex justify-between w-full items-center">
        <span>Status:</span>
        <span>{patient.status}</span>
      </section>
      <section className="flex justify-between w-full items-center">
        <span>Doctor:</span>
        <span>{patient.doctor}</span>
      </section>
      <section className="flex justify-between w-full items-center">
        <span>Ailment:</span>
        <span>{patient.ailment}</span>
      </section>
    </section>
  );
};

const Patients = () => {
  const [hospitalUID, setHospitalUID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch the hospital UID for the current user
  const fetchHospitalUID = async () => {
    // Implementation similar to the one in the StaffDisplay page
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
            console.log(hospitalUID);
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

  // Function to fetch patients from the database
  const fetchPatients = async () => {
    try {
      const patientsCollectionRef = collection(
        db,
        "Hospitals",
        hospitalUID,
        "patients"
      );
      const querySnapshot = await getDocs(patientsCollectionRef);
      const patientList = [];
      querySnapshot.forEach((doc) => {
        patientList.push(doc.data());
      });
      setPatients(patientList);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch hospital UID and patients data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await fetchHospitalUID();
        setHospitalUID(uid);
        fetchPatients(); // Fetch patients after getting hospital UID
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchHospitalUID]);

  // Function to refetch data when needed (e.g., when navigating back to the page)
  const refetchData = () => {
    const fetchData = async () => {
      try {
        const uid = await fetchHospitalUID();
        setHospitalUID(uid);
        fetchPatients(); // Fetch patients after getting hospital UID
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  // Function to handle opening the patient details modal
  const handleOpenModal = (patientData) => {
    setSelectedPatient(patientData);
    setOpenModal(true);
  };

  // Function to handle closing the patient details modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to handle selecting a patient card
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };
  
    // Function to handle search term change
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Render patient list and other components
    // Render patient list and other components
    return (
      <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center">
        {/* Search and add patient components */}
        <TextField
          className="w-4/12"
          label="Search Patient"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Patient list components */}
        <div className="reception-scroll-container overflow-y-auto h-full w-full">
          {filteredPatients.map((patient, index) => (
            <PatientCard
              key={index}
              patient={patient}
              onClick={handleSelectPatient}
            />
          ))}
        </div>
        {/* Other sections as needed */}
  
        {/* Patient Details Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* Display patient details */}
            {selectedPatient && (
              <>
                <h2>{selectedPatient.name}</h2>
                {/* Display other patient details */}
              </>
            )}
          </Box>
        </Modal>
      </div>
    );
  };

export default Patients;