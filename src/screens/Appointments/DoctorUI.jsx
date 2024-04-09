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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

  const createCard = () => {
    // Convert starting and ending time strings to Date objects for comparison
    const startingTime = new Date(`2022-01-01T${starting}`);
    const endingTime = new Date(`2022-01-01T${ending}`);
  
    // Check for overlapping time range
    const isOverlapping = data.some(card => {
      const cardStartingTime = new Date(`2022-01-01T${card.startingTime}`);
      const cardEndingTime = new Date(`2022-01-01T${card.endingTime}`);
      return (
        (startingTime >= cardStartingTime && startingTime <= cardEndingTime) ||
        (endingTime >= cardStartingTime && endingTime <= cardEndingTime) ||
        (startingTime <= cardStartingTime && endingTime >= cardEndingTime)
      );
    });
  
    // If there's no overlapping, add the new card
    if (!isOverlapping) {
      const newCard = {
        date: startDate,
        startingTime: starting,
        endingTime: ending
      };
      setData(prevData => [...prevData, newCard]);
    }
  
    // Close the modal
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            Select date:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            Starting from:{" "}
            <TimePicker
              onChange={setStarting}
              value={starting}
            />
            Ending at:{" "}
            <TimePicker
              onChange={setEnding}
              value={ending}
            />
            <button onClick={createCard}>Submit</button>
          </div>
        </Box>
      </Modal>
  
      <div>
        {data.map((card, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <Typography>Date: {card.date.toString()}</Typography>
            <Typography>Starting Time: {card.startingTime}</Typography>
            <Typography>Ending Time: {card.endingTime}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorUI;
