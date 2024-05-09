import { useLocation } from "react-router-dom";
import { doc, getDocs, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const MedicalRecords = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("patientId");
  const hospitalId = queryParams.get("hospitalId");
  console.log("Patient ID:", patientId);
  console.log("Hospital ID:", hospitalId);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: patientId,
    hospitalId: hospitalId,
    doctorId: "",
    date: "",
    reasonOfVisit: "",
    servicesProvided: [
      {
        serviceName: "",
        serviceDetails: "",
        servicePrice: "", // Added servicePrice property
      },
    ],
  });

  const getAllDoctors = async () => {
    const doctorsArray = [];
    try {
      if (hospitalId) {
        const hospitalDocRef = doc(db, "Hospitals", hospitalId);
        const personnelCollectionRef = collection(hospitalDocRef, "personnel");
        const querySnapshot = await getDocs(personnelCollectionRef);
        querySnapshot.forEach((doc) => {
          const personnelData = doc.data();
          // Check if the personnel belongs to the department "Doctor"
          if (personnelData.department === "Doctor") {
            const doctorObject = { id: doc.id, ...personnelData };
            doctorsArray.push(doctorObject);
          }
        });
        setDoctors(doctorsArray);
        return doctorsArray;
      } else {
        console.log("No hospital UID found for the current user");
        return null;
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return null;
    }
  };

  useEffect(() => {
    // Call getAllDoctors only once when the component mounts
    getAllDoctors();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleServiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = [...formData.servicesProvided];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicesProvided: updatedServices,
    }));
  };

  const addService = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicesProvided: [
        ...prevFormData.servicesProvided,
        { serviceName: "", serviceDetails: "", servicePrice: "" }, // Added servicePrice property
      ],
    }));
  };

  const removeService = (index) => {
    const updatedServices = [...formData.servicesProvided];
    updatedServices.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicesProvided: updatedServices,
    }));
  };

  const handleSubmit = async () => {
    try {
      const hospitalDocRef = doc(db, "Hospitals", hospitalId);
      const medicalRecordsCollectionRef = collection(
        hospitalDocRef,
        "medicalRecords"
      );
      await addDoc(medicalRecordsCollectionRef, formData);
      console.log("Medical record added successfully");
    } catch (error) {
      console.error("Error adding medical record:", error);
    }
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
            <h4 className="w-2/12">Date Of Record</h4>
            <TextField
              type="date"
              name="date"
              className="w-full"
              value={formData.date}
              onChange={handleInputChange}
            />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Reason of Visit</h4>
            <TextField
              name="reasonOfVisit"
              label="Reason Of Visit"
              className="w-full"
              value={formData.reasonOfVisit}
              onChange={handleInputChange}
            />
          </section>
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Doctor</h4>
            <Select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              className="w-full"
            >
              <MenuItem value="">Select a doctor</MenuItem>
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </section>
          <section>
            <h4>Services Provided</h4>
            {formData.servicesProvided.map((service, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
              >
                <TextField
                  name="serviceName"
                  label="Service Name"
                  value={service.serviceName}
                  onChange={(event) => handleServiceChange(index, event)}
                />
                <TextField
                  name="serviceDetails"
                  label="Service Details"
                  value={service.serviceDetails}
                  onChange={(event) => handleServiceChange(index, event)}
                />
                <TextField
                  name="servicePrice"
                  label="Service Price"
                  value={service.servicePrice || ""}
                  onChange={(event) => handleServiceChange(index, event)}
                />
                <Button onClick={() => removeService(index)}>Remove</Button>
              </Box>
            ))}
            <Button onClick={addService}>Add Service</Button>
          </section>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </section>
      </section>
    </div>
  );
};

export default MedicalRecords;
