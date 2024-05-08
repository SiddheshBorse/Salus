import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Patient Card Component
const PatientCard = ({ patient, onClick }) => {
  return (
    <section
      className="bg-white rounded-xl p-4 flex flex-col w-full gap-4 my-2"
      onClick={() => onClick(patient)}
    >
      <h4 className="font-semibold text-xl">{patient.name}</h4>
      <section className="flex flex-row gap-4">
        <p>Mobile : {patient.mobile}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Gender: {patient.gender}</p>
      </section>
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
  const navigate = useNavigate();

  const fetchHospitalUID = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const userUID = currentUser.uid;
        const personnelMapDocRef = doc(db, "personnelMap", "personnelMap");
        const personnelMapDocSnapshot = await getDoc(personnelMapDocRef);
        if (personnelMapDocSnapshot.exists()) {
          const personnelMapData = personnelMapDocSnapshot.data();
          if (personnelMapData && personnelMapData[userUID]) {
            const hospitalUID = personnelMapData[userUID];
            console.log(hospitalUID);
            return hospitalUID;
          }
        }
        console.log("No document or user's UID found");
        return null;
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    } else {
      console.log("No user signed in");
      return null;
    }
  }, []);

  const fetchPatients = useCallback(async () => {
    if (hospitalUID) {
      try {
        const patientsCollectionRef = collection(db, "Hospitals", hospitalUID, "patients");
        const querySnapshot = await getDocs(patientsCollectionRef);
        const patientList = [];
        querySnapshot.forEach((doc) => {
          patientList.push(doc.data());
        });
        setPatients(patientList);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    } else {
      console.error("Hospital UID is not available");
    }
  }, [hospitalUID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await fetchHospitalUID();
        setHospitalUID(uid);
        if (uid) {
          fetchPatients();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fetchHospitalUID, fetchPatients]);

  const refetchData = useCallback(() => {
    const fetchData = async () => {
      try {
        const uid = await fetchHospitalUID();
        setHospitalUID(uid);
        if (uid) {
          fetchPatients();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fetchHospitalUID, fetchPatients]);

  const handleOpenModal = (patientData) => {
    setSelectedPatient(patientData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

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
          <PatientCard key={index} patient={patient} onClick={handleSelectPatient} />
        ))}
      </div>

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
          {selectedPatient && (
            <>
              <h2>{selectedPatient.name}</h2>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Patients;
