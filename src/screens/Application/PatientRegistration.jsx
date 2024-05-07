import React, { useState, useEffect } from "react";
import { TextField, Button, Snackbar } from '@mui/material';
import { auth, db } from "../../../firebase/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
    mobile: "",
    zipcode: ""
  });

  const [hospitalUID, setHospitalUID] = useState(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    getCurrentUserHospitalUID();
  }, []);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCreate = async () => {
    try {
      const patientsCollectionRef = collection(db, "Hospitals", hospitalUID, "patients");
      await addDoc(patientsCollectionRef, formData);
      console.log("Patient added successfully.");
      setSuccessMessageOpen(true);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessageOpen(false);
    navigate("/dashboard/patients");
  };
  
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 overflow-scroll">
      <Link to="/dashboard/patients">
        <Button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
          Go back
        </Button>
      </Link>
      <section className="bg-white rounded-xl p-4 h-full">
        <h3 className="font-medium text-3xl">Patient Registration</h3>
        <section className="flex flex-col gap-10">
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Name</h4>
            <TextField name="name" label="Name" className="w-full" value={formData.name} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Email</h4>
            <TextField name="email" label="Email" className="w-full" value={formData.email} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Address</h4>
            <TextField name="address" label="Address" className="w-full" value={formData.address} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Date of Birth</h4>
            <TextField type="date" name="dob" className="w-full" value={formData.dob} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Gender</h4>
            <TextField name="gender" label="Gender" className="w-full" value={formData.gender} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Mobile</h4>
            <TextField name="mobile" label="Mobile" className="w-full" value={formData.mobile} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Zipcode</h4>
            <TextField name="zipcode" label="Zipcode" className="w-full" value={formData.zipcode} onChange={handleInputChange} />
          </section>
          <Button
            className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
            variant="contained"
            onClick={handleCreate}
          >
            Register
          </Button>
        </section>
      </section>
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Patient registered successfully!"
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default PatientRegistration;
