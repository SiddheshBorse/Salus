import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { opd_patient, ipd_patient } from "../../constants";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select } from "@mui/material";
import { auth,db } from "../../../firebase/firebase";
import { doc,getDocs,collection,getDoc } from "firebase/firestore";

//there needs to be a section that allows the receptionist to set what doctors that they are catering to
const Reception = () => {
  const [personnel, setPersonnel] = useState([]);
  const navigation = useNavigate();
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const userUID = currentUser.uid;
        const personnelMapDocRef = doc(db, 'personnelMap', 'personnelMap');
        const personnelMapDocSnapshot = await getDoc(personnelMapDocRef);

        if (personnelMapDocSnapshot.exists()) {
          const personnelMapData = personnelMapDocSnapshot.data();

          if (personnelMapData && personnelMapData[userUID]) {
            const hospitalUID = personnelMapData[userUID];
            return hospitalUID;
          }
        }

        console.log('No document or user\'s UID found');
        return null;
      } catch (error) {
        console.error('Error fetching document:', error);
        return null;
      }
    } else {
      console.log('No user signed in');
      return null;
    }
  };

  const getAllPersonnel = async () => {
    const personnelArray = [];

    try {
      const hospitalUID = await getCurrentUserHospitalUID();

      if (hospitalUID) {
        const hospitalDocRef = doc(db, 'Hospitals', hospitalUID);
        const personnelCollectionRef = collection(hospitalDocRef, 'personnel');
        const querySnapshot = await getDocs(personnelCollectionRef);

        querySnapshot.forEach((doc) => {
          const personnelData = doc.data();
          const personnelObject = {
            id: doc.id,
            ...personnelData,
          };
          personnelArray.push(personnelObject);
        });

        console.log(personnelArray);
        return personnelArray;
      } else {
        console.log('No hospital UID found for the current user');
        return null;
      }
    } catch (error) {
      console.error('Error fetching personnel:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPersonnelAndAppointments = async () => {
      try {
        const personnelData = await getAllPersonnel();
        if (personnelData) {
          setPersonnel(personnelData);
        }
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }

      const bookedAppointments = getBookedAppointments();
      setBookedAppointments(bookedAppointments);
    };
    fetchPersonnelAndAppointments();
  }, [selectedPersonnel]);

  const handlePersonnelChange = (event) => {
    setSelectedPersonnel(event.target.value);
  };


  const getBookedAppointments = () => {
    // Filter the personnel array to get the selected personnel object
    const selectedPersonnelObj = personnel.find((person) => person.id === selectedPersonnel);
  
    if (selectedPersonnelObj) {
      // Get the schedule object from the selected personnel object
      const { schedule } = selectedPersonnelObj;
  
      // Iterate over the schedule object and combine all appointments
      const allAppointments = Object.values(schedule).flatMap(({ appointments }) => appointments);
  
      // Filter out the booked appointments
      const bookedAppointments = allAppointments.filter((appointment) => appointment.assignedTo === selectedPersonnelObj.id);
  
      return bookedAppointments;
    }
  
    return [];
  };
  
  // Call the function to get the booked appointments
  console.log(bookedAppointments);

  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center">
      <section className="flex items-center gap-2 justify-center w-full">
        <TextField className="w-4/12" label="Search Patient" />
        <FormControl className="w-4/12">
          <InputLabel id="personnel-select-label">Select Personnel</InputLabel>
          <Select
            labelId="personnel-select-label"
            id="personnel-select"
            value={selectedPersonnel}
            onChange={handlePersonnelChange}
          >
            {personnel.filter((person) => person.department === 'Doctor' &&
          person.isICU === false).map((person) => (
              <MenuItem key={person.id} value={person.id}>
                {person.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button
          className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
          variant="contained"
        >
          Search
        </button>
      </section>
      <div className="reception-scroll-container overflow-y-auto h-full w-full">
      <section className="bg-background-2 rounded-xl p-4 flex flex-col justify-center items-center gap-4 w-full">
        <h4 className="font-semibold text-2xl">Booked Appointments</h4>
        {bookedAppointments.map((appointment, index) => (
          <section
            key={index}
            className="bg-white rounded-xl p-4 flex flex-col w-full gap-4"
          >
            <section className="flex justify-between w-full items-center">
              <h4 className="font-semibold text-xl">
                Appointment Time: {appointment.startTime} - {appointment.endTime}
              </h4>
            </section>
          </section>
        ))}
      </section>
        <section className="w-full gap-4 flex flex-col items-center">
          <h4 className="font-semibold text-2xl">IPD Patients</h4>
          {ipd_patient.map((patient, index) => (
            <section
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col w-full gap-4"
            >
              <section className="flex justify-between w-full items-center">
                <h4 className="font-semibold text-xl">{patient.name}</h4>
                <button
                  className="bg-tertiary text-white w-1/12 py-2 font-bold rounded-lg"
                  variant="contained"
                >
                  View
                </button>
              </section>
              <section className="flex justify-between w-full items-center">
                <h4>Bed No.: {patient.bed}</h4>
                <h4>Assigned Doctor: {patient.doctor}</h4>
                <h4>Ward no: {patient.ward}</h4>
              </section>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Reception;