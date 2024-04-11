import React, { useState } from 'react';
import landingDoctor from "../../assets/images/landingDoctor.svg";
import { TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Landing = () => {
  const [hospitalName, setHospitalName] = useState(""); 

  const handleConfirmClick = () => {
    // No need to use useHistory, just construct the link URL
    const url = `/master?hospitalName=${hospitalName}`;
    // Navigate to the master page
    window.location.href = url;
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <section className="flex flex-col items-center gap-6">
        <h1 className="font-bold text-center text-4xl w-4/5 ">Set up your personalised <span className="text-primary">Hospital Management System</span></h1>
        <img className="w-60" src={landingDoctor} alt="" />
        <TextField
          className="w-4/12"
          label="Enter your Hospital Name"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
        <button
          className="bg-primary text-white w-4/12 py-2 font-semibold rounded-lg"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
        <Link to="/login" className="text-primary">Or Join an existing system</Link> {/* Use Link for navigation */}
      </section>
    </div>
  )
}

export default Landing;

//done
