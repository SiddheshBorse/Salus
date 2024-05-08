import React from "react";
import { auth , db} from "../../../firebase/firebase";
import { doc,getDoc, updateDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emergencies, staff, doctor, appointments, nextShift } from "../../constants";
import { Modal, Box, Typography, Button } from '@mui/material';
import EmergencyModal from "../../components/EmergencyModal";

const getCurrentUserMasterAccountName = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
      try {
          // Get the UID of the current user
          const uid = currentUser.uid;

          // Reference to the document in the "Master Accounts" collection with the same UID as the current user
          const masterAccountDocRef = doc(db, "Master Accounts", uid);

          // Get the document snapshot
          const docSnapshot = await getDoc(masterAccountDocRef);

          // Check if the document exists
          if (docSnapshot.exists()) {
              // Get the data from the document
              const userData = docSnapshot.data();

              // Access the "name" field
              const name = userData.name;

              // Return the name
              return name;
          } else {
              // Document does not exist
              console.log("No document found for the current user");
              return null;
          }
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


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [hospitalEmergencies, setHospitalEmergencies] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const getCurrentUserHospitalUID = async () => {
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

  const handleRemoveEmergency = async (index) => {
    const currentHospitalUID = await getCurrentUserHospitalUID();
  
    if (currentHospitalUID) {
      const hospitalDocRef = doc(db, "Hospitals", currentHospitalUID);
      const hospitalDocSnapshot = await getDoc(hospitalDocRef);
  
      if (hospitalDocSnapshot.exists()) {
        const hospitalData = hospitalDocSnapshot.data();
        const emergencyArray = hospitalData.emergencies || [];
  
        // Create a new array by removing the emergency at the specified index
        const updatedEmergencyArray = emergencyArray.filter((_, i) => i !== index);
  
        try {
          // Update the hospital document with the new emergencies array
          await updateDoc(hospitalDocRef, { emergencies: updatedEmergencyArray });
  
          // Update the state with the new emergencies array
          setHospitalEmergencies(updatedEmergencyArray);
        } catch (error) {
          console.error("Error updating document:", error);
        }
      } else {
        console.log("Hospital document does not exist!");
      }
    } else {
      console.log("Unable to retrieve current hospital UID.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getCurrentUserMasterAccountName().then(name => {
        if (name !== null) {
          setUserName(name);
        }
      });

      const currentHospitalUID = await getCurrentUserHospitalUID();
      if (currentHospitalUID) {
        const hospitalDocRef = doc(db, "Hospitals", currentHospitalUID);
        const hospitalDocSnapshot = await getDoc(hospitalDocRef);

        if (hospitalDocSnapshot.exists()) {
          const hospitalData = hospitalDocSnapshot.data();
          const emergencyArray = hospitalData.emergencies || [];
          setHospitalEmergencies(emergencyArray);
        } else {
          console.log("Hospital document does not exist!");
        }
      } else {
        console.log("Unable to retrieve current hospital UID.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 overflow-y-auto">
      <section className="bg-background-2 w-full flex justify-between p-4 rounded-xl">
        <h4 className="text-secondary font-semibold">No Emergency Code</h4>
        <button className="text-error font-semibold" onClick={() => setShowModal(true)}>Call Emergency</button>
      </section>
      <section className="flex flex-col gap-4 bg-background-1 p-4 w-full rounded-xl">
        <section>
          <h4 className="font-semibold">Hospital Emergencies</h4>
          {hospitalEmergencies.map((emergency, index) => (
            <section key={index} className="flex justify-between">
              <section className="flex flex-col">
                <h5 className="text-tertiary">Emergency Code</h5>
                <h5>{emergency.code}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Location</h5>
                <h5>{emergency.location}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Instructions</h5>
                <h5>{emergency.instructions}</h5>
              </section>
              <Button variant="contained" color="error" onClick={() => handleRemoveEmergency(index)}>
                Remove
              </Button>
            </section>
          ))}
        </section>
      </section>
      <section className="w-full border-2 border-tertiary p-2 flex justify-between items-center rounded-xl  ">
        <h4 className="font-semibold text-xl text-tertiary">Manage Hospital Staff</h4>
        <button className="bg-tertiary p-3 rounded-lg text-white" onClick={()=>{navigate('/dashboard/staffDisplay')}}>
          Manage
        </button>
      </section>
      <section className="flex w-full justify-between gap-4 items-start">
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-6/12">
          <h4 className="font-semibold">Active Doctors</h4>
          <ul>
            {doctor.map((doctorMember, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{doctorMember.name}</span>
                <span className="text-tertiary-light">
                  {doctorMember.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-6/12">
          <h4 className="font-semibold">Active Staff</h4>
          <ul>
            {staff.map((staffMember, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{staffMember.name}</span>
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-full">
          <h4 className="font-semibold">Appointments</h4>
          <ul>
            {appointments.map((appointment, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{appointment.name}</span>
                <span className="text-tertiary-light">
                  {appointment.doctor}
                </span>
                <span className="text-tertiary-light">
                  {appointment.ailment}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-full">
          <h4 className="font-semibold">Next Shift</h4>
          <ul>
            {nextShift.map((staffMemeber, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{staffMemeber.name}</span>
                <span className="text-tertiary-light">
                  {staffMemeber.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <EmergencyModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Home;
