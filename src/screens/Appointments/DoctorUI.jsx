import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import { auth,db } from "../../../firebase/firebase";
import { doc, updateDoc, arrayUnion,getDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500, // Increase the width
  maxWidth: "90%", // Set maximum width to prevent it from being too wide on large screens
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4, // Add padding
};

const DoctorUI = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [starting, setStarting] = useState("10:00");
  const [ending, setEnding] = useState("10:00");    

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

  const updatePersonnelSchedule = async (data) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userUID = currentUser.uid;
        const hospitalUID = await getCurrentUserHospitalUID();
  
        if (hospitalUID) {
          const personnelDocRef = doc(db, "Hospitals", hospitalUID, "personnel", userUID);
  
          // Convert data to an array of objects with correct format
          const scheduleData = data.map((card) => {
            const { date, startingTime, endingTime, appointments } = card;
            // Convert appointments array to Firestore-compatible format
            const formattedAppointments = appointments.map(appointment => ({
              assignedTo: appointment.assignedTo,
              startTime: appointment.startTime,
              endTime: appointment.endTime
            }));
            return {
              date: date.toISOString().slice(0, 10), // Only keep the date part
              startTime: startingTime,
              endTime: endingTime,
              appointments: formattedAppointments
            };
          });
  
          // Use the spread operator to pass individual objects to arrayUnion
          await updateDoc(personnelDocRef, {
            schedule: arrayUnion(...scheduleData),
          });
  
          console.log("Personnel schedule updated successfully.");
        } else {
          console.log("Hospital UID not found.");
        }
      } else {
        console.log("No user signed in.");
      }
    } catch (error) {
      console.error("Error updating personnel schedule:", error);
    }
  };

const createCard = async () => {
  // Convert starting and ending time strings to Date objects
  const startingTime = new Date(`${startDate.toISOString().slice(0, 10)}T${starting}`);
  const endingTime = new Date(`${startDate.toISOString().slice(0, 10)}T${ending}`);

  // Check for overlapping time range
  const isOverlapping = data.some((card) => {
    const cardStartingTime = new Date(`${card.date.toISOString().slice(0, 10)}T${card.startingTime}`);
    const cardEndingTime = new Date(`${card.date.toISOString().slice(0, 10)}T${card.endingTime}`);
    return (
      (startingTime >= cardStartingTime && startingTime <= cardEndingTime) ||
      (endingTime >= cardStartingTime && endingTime <= cardEndingTime) ||
      (startingTime <= cardStartingTime && endingTime >= cardEndingTime)
    );
  });

  // If there's no overlapping, create appointment slots
  if (!isOverlapping) {
    const appointments = [];

    // Iterate over time range in 30-minute intervals
    let currentTime = new Date(startingTime);
    while (currentTime < endingTime) {
      const appointmentStartTime = new Date(currentTime);
      const appointmentEndTime = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes later

      // Create appointment slot map
      const appointmentSlot = {
        assignedTo: "",
        startTime: appointmentStartTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        endTime: appointmentEndTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      };

      // Add appointment slot to array
      appointments.push(appointmentSlot);

      // Move to next 30-minute interval
      currentTime = appointmentEndTime;
    }

    // Create new card with appointments
    const newCard = {
      date: startDate,
      startingTime: starting,
      endingTime: ending,
      appointments: appointments,
    };

    // Add the new card to state
    setData([...data, newCard]);

    // Update the personnel schedule in Firestore
    await updatePersonnelSchedule([...data, newCard]);

    // Close the modal
    handleClose();
  } else {
    alert("Time range overlaps with existing appointments. Please select a different time range.");
  }
};



  const isEmpty = data.length === 0;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: '10px'}}>
        {isEmpty ? (
          <Typography>No appointments found. Click the button above to add the first appointment.</Typography>
        ) : (
          <Typography>You have appointments scheduled. Add a new appointment.</Typography>
        )}
        <Button onClick={handleOpen} style={{ marginLeft: "10px" }}>
          Open modal
        </Button>
      </div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <div>
      <Typography>Select date:</Typography>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
    <div style={{ marginTop: "10px" }}>
      <Typography>Starting from:</Typography>
      <TimePicker onChange={setStarting} value={starting} />
    </div>
    <div style={{ marginTop: "10px" }}>
      <Typography>Ending at:</Typography>
      <TimePicker onChange={setEnding} value={ending} />
    </div>
    <div style={{ marginTop: "20px", textAlign: "right" }}>
      <Button onClick={createCard} variant="contained" color="primary" style={{ marginRight: "10px" }}>
        Submit
      </Button>
      <Button onClick={handleClose} variant="outlined" color="primary">
        Cancel
      </Button>
    </div>
  </Box>
</Modal>

  
      <div>
        {data.map((card, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <Typography>Date: {card.date.toString()}</Typography>
            <Typography>Starting Time: {card.startingTime}</Typography>
            <Typography>Ending Time: {card.endingTime}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorUI;