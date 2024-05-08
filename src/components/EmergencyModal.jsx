import { useState, useEffect } from "react";
import { Modal, Box, Typography, FormControl, InputLabel, Select, TextField, Button, MenuItem } from "@mui/material";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";


const EmergencyModal = ({ showModal, handleCloseModal }) => {
    const [emergencies, setEmergencies] = useState([]);
  const [location, setLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedEmergency, setSelectedEmergency] = useState('');
  
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
  
    useEffect(() => {
        const fetchEmergencies = async () => {
          try {
            const emergenciesDocRef = doc(db, 'Emergencies', '4i5VNSCEOHmzkT2CwNm8');
            const emergenciesDocSnapshot = await getDoc(emergenciesDocRef);
    
            if (emergenciesDocSnapshot.exists()) {
              const emergenciesData = emergenciesDocSnapshot.data();
              setEmergencies(emergenciesData.Codes);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching emergencies:", error);
          }
        };
    
        fetchEmergencies();
      }, []);
    
      const handleLocationChange = (event) => {
        setLocation(event.target.value);
      };
    
      const handleInstructionsChange = (event) => {
        setInstructions(event.target.value);
      };
    
      const handleEmergencyChange = (event) => {
        setSelectedEmergency(event.target.value);
      };
    
      const handleSubmitEmergency = async () => {
        try {
          const currentHospitalUID = await getCurrentUserHospitalUID();
    
          if (currentHospitalUID) {
            const hospitalDocRef = doc(db, "Hospitals", currentHospitalUID);
            const hospitalDocSnapshot = await getDoc(hospitalDocRef);
    
            if (hospitalDocSnapshot.exists()) {
              const hospitalData = hospitalDocSnapshot.data();
              const emergencyArray = hospitalData.emergencies || [];
    
              const selectedEmergencyData = emergencies.find(emergency => emergency.code === selectedEmergency);
              const description = selectedEmergencyData ? selectedEmergencyData.description : '';
    
              const newEmergency = {
                code: selectedEmergency,
                location: location,
                instructions: instructions,
                description: description,
                timestamp: new Date().toISOString(),
              };
    
              emergencyArray.push(newEmergency);
    
              await setDoc(hospitalDocRef, { emergencies: emergencyArray }, { merge: true });
              console.log("Emergency call submitted successfully!");
            } else {
              console.log("Hospital document does not exist!");
            }
          } else {
            console.log("Unable to retrieve current hospital UID.");
          }
        } catch (error) {
          console.error("Error submitting emergency call:", error);
        }
    
        handleCloseModal();
      };

  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
      aria-labelledby="emergency-modal-title"
      aria-describedby="emergency-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="emergency-modal-title" variant="h6" component="h2">
          Call Emergency
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="emergency-select-label">Emergency Code</InputLabel>
          <Select
            labelId="emergency-select-label"
            id="emergency-select"
            value={selectedEmergency}
            onChange={handleEmergencyChange}
            label="Emergency Code"
          >
            {emergencies.map((emergency, index) => (
              <MenuItem key={index} value={emergency.code}>
                {emergency.code} - {emergency.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Location"
          value={location}
          onChange={handleLocationChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Instructions"
          value={instructions}
          onChange={handleInstructionsChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button onClick={handleSubmitEmergency} variant="contained" color="primary">
          Submit Emergency
        </Button>
        <Button onClick={handleCloseModal}>Close</Button>
      </Box>
    </Modal>
  );
};

export default EmergencyModal;