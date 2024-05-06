import React, { useState } from "react";
import { TextField, Select, MenuItem, InputLabel, Button , FormControlLabel, Switch} from '@mui/material';
import { auth, db} from "../../../firebase/firebase";
import { doc,getDoc, collection ,addDoc} from "firebase/firestore";
import QRCode from 'qrcode.react';

const DoctorOnboarding = () => {

  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const uid = currentUser.uid;
        const masterAccountDocRef = doc(db, "Master Accounts", uid);
        const docSnapshot = await getDoc(masterAccountDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const hospitalUID = userData.hospitalUID;
          return hospitalUID;
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

  const pushPersonellToHospital = async (hospitalUID, personnelData) => {
    try {
      const personnelCollectionRef = collection(db, "Hospitals", hospitalUID, "personnel");
      const docRef = await addDoc(personnelCollectionRef, personnelData);
      const documentId = docRef.id;
      console.log("Personnel added to hospital collection successfully.");
      return documentId; // Return the document ID
    } catch (error) {
      console.error("Error adding personnel to hospital collection:", error);
      throw error; // Throw error for handling in handleCreate
    }
  };

  const [personnelDocID, setPersonnelDocID] = useState(null);

  const [qrCodeData, setQrCodeData] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    department: "",
    specialty: "",
    designation: "",
    isICU: false // Added ICU status
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      department: value
    }));
  };

  const handleSpecialtyChange = (event) => {
    const value = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      specialty: value
    }));
  };

  const handleICUToggle = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      isICU: !prevFormData.isICU
    }));
  };

  const handleCreate = async () => {
    try {
      // Wait for the hospital UID
      const hospitalUID = await getCurrentUserHospitalUID();
      console.log("Hospital UID:", hospitalUID);
      console.log("Form Data:", formData);
  
      // Call the function to add personnel to the hospital subcollection
      const personnelDocID = await pushPersonellToHospital(hospitalUID, formData);
  
      // Generate QR code data
      const qrData = JSON.stringify({ key:"bbldrizzy",hospitalUID: hospitalUID , uid: personnelDocID });
      setQrCodeData(qrData);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 overflow-scroll">
      <Button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
        Go back
      </Button>
      <section className="bg-white rounded-xl p-4 h-full">
        <section className="flex items-center justify-between">
          <Button className="text-error font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Delete
          </Button>
          <h3 className="font-medium text-3xl">Add Personnel to Staff</h3>
          <Button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Edit
          </Button>
        </section>
        <section className="flex flex-col gap-10">
          <h4 className="text-tertiary-light">Personal Details</h4>
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
            <h4 className="w-2/12">Phone</h4>
            <TextField name="phone" label="Phone" className="w-full" value={formData.phone} onChange={handleInputChange} />
          </section>
          <section className="flex w-full items-center">
            <InputLabel className="w-2/12" id="role-label"><h4>Department</h4></InputLabel>
            <Select
              labelId="role-label"
              value={formData.department}
              onChange={handleRoleChange}
              className="w-full"
              variant="outlined"
              size="small"
              name="department"
            >
              <MenuItem value="Doctor">Medical Staff</MenuItem>
              <MenuItem value="Admin">Administrative Staff</MenuItem>
              <MenuItem value="Support">Support Staff</MenuItem>
              <MenuItem value="Ancillary">Ancillary Services</MenuItem>
              <MenuItem value="Specialized">Specialized Personnel</MenuItem>
              <MenuItem value="Emergency">Emergency Response Team</MenuItem>
            </Select>
          </section>
          {formData.department === "Doctor" && (
            <section className="flex w-full items-center">
              <h4 className="w-2/12">Specialty</h4>
              <Select
                value={formData.specialty}
                onChange={handleSpecialtyChange}
                className="w-full"
                variant="outlined"
                size="small"
                name="specialty"
              >
                <MenuItem value="Cardiology">Cardiology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
                <MenuItem value="Pediatrics">Pediatrics</MenuItem>
              </Select>
            </section>
          )}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Designation</h4>
            <TextField name="designation" label="Designation" className="w-full" value={formData.designation} onChange={handleInputChange} />
          </section>
          <FormControlLabel
        control={<Switch checked={formData.isICU} onChange={handleICUToggle} />}
        label="Working in ICU"
      />
      {qrCodeData && (
      <div className="flex justify-center">
        <QRCode value={qrCodeData} />
      </div>
    )}
          <Button
            className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
            variant="contained"
            onClick={handleCreate}
          >
            Create
          </Button>
        </section>
      </section>
    </div>
  );
};

export default DoctorOnboarding;
