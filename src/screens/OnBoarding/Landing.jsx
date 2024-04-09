import React from 'react'
import landingDoctor from "../../assets/images/landingDoctor.svg"
import { TextField } from "@mui/material";


const Landing = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <section className="flex flex-col items-center gap-6">
      <h1 className="font-bold text-center text-4xl w-4/5 ">Set up your personalised <span className="text-primary">Hospital Management System</span></h1>
      <img className="w-60" src={landingDoctor} alt="" />
      <TextField className="w-4/12" label="Enter your Hospital Name"/>
      <button className="bg-primary text-white w-4/12 py-2 font-semibold rounded-lg">Confirm</button>
      <a href="/" className="text-primary">Or Join an existing system</a>
    </section>
    </div>
  )
}

export default Landing