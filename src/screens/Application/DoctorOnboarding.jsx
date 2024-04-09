import React from "react";
import { TextField, Select, MenuItem, Button } from '@mui/material';

const DoctorOnboarding = () => {
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2">
      {/* Go back button */}
      <button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
        Go back
      </button>
      {/* Main section */}
      <section className="bg-white rounded-xl p-4 h-full">
        {/* Action buttons */}
        <section className="flex items-center justify-between">
          <button className="text-error font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Delete
          </button>
          <h3 className="font-medium text-3xl">Add Personnel to Staff</h3>
          <button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Edit
          </button>
        </section>
        {/* Form */}
        <section className="flex flex-col gap-10">
          <h4 className="text-tertiary-light">Personal Details</h4>
          {/* Name */}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Name</h4>
            <TextField label="Name" className="w-full"/>
          </section>
          {/* Email */}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Email</h4>
            <TextField label="Email" className="w-full"/>
          </section>
          {/* Address */}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Address</h4>
            <TextField label="Address" className="w-full"/>
          </section>
          {/* Phone */}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Phone</h4>
            <TextField label="Phone" className="w-full"/>
          </section>
          {/* Role */}
          <section className="flex w-full items-center">
            <h4 className="w-2/12">Role</h4>
            <Select
              label="Role"
              className="w-full"
              variant="outlined" // Ensure consistent styling
              size="small" // Ensure consistent size
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
            
          </section>
          <Button
            className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
            variant="contained"
          >
            Create
          </Button> 
        </section>
        
      </section>
    </div>
  );
};

export default DoctorOnboarding;