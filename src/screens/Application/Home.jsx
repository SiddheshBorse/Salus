import React from "react";
import { auth , db} from "../../../firebase/firebase";
import { doc,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { emergencies, staff, doctor, appointments, nextShift } from "../../constants";

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

  const navigate = useNavigate();

  const [userName, setUserName] = useState(""); // State to store the current user's master account name

  useEffect(() => {
    getCurrentUserMasterAccountName().then(name => {
      if (name !== null) {
        setUserName(name); // Set the user's name in the state
      }
    });
  }, []); // Run only once when the component mounts


  
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 overflow-y-auto">
      <section className="bg-background-2 w-full flex justify-between p-4 rounded-xl">
        <h4 className="text-secondary font-semibold">No Emergency Code</h4>
        <button className="text-error font-semibold">Call Emergency</button>
      </section>
      <section className="flex flex-col gap-4 bg-background-1 p-4 w-full rounded-xl">
        <section>
          <h4 className="font-semibold">Hospital Emergencies</h4>
          {emergencies.map((emergency, index) => (
            <section key={index} className="flex justify-between">
              <section className="flex flex-col">
                <h5 className="text-tertiary">Room Number</h5>
                <h5>{emergency.RoomNo}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Emergency Type</h5>
                <h5>{emergency.EmergencyType}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Instructions</h5>
                <h5>{emergency.instructions}</h5>
              </section>
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
    </div>
  );
};

export default Home;
