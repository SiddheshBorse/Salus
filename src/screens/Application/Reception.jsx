import React from "react";
import { TextField, Button } from "@mui/material";
import { opd_patient, ipd_patient } from "../../constants";
//there needs to be a section that allows the receptionist to set what doctors that they are catering to
const Reception = () => {
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center">
      <section className="flex items-center gap-2 justify-center w-full">
        <TextField className="w-4/12" label="Search Patient" />
        <button
          className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
          variant="contained">
          Search
        </button>
      </section>
      <div className="reception-scroll-container overflow-y-auto h-full w-full">
        <section className="bg-background-2 rounded-xl p-4 flex flex-col justify-center items-center gap-4 w-full">
          <h4 className="font-semibold text-2xl">OPD Patients</h4>
          {opd_patient.map((patient, index) => (
            <section
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col w-full gap-4">
              <section className="flex justify-between w-full items-center">
                <h4 className="font-semibold text-xl">{patient.name}</h4>
                <button className="bg-tertiary text-white w-1/12 py-2 font-bold rounded-lg" variant="contained">
                  View
                </button>
              </section>
              <section className="flex justify-between w-full items-center">
                <h4>Status</h4>
                <h4>{patient.status}</h4>
              </section>
              <section className="flex justify-between w-full items-center">
                <h4>{patient.doctor}</h4>
                <h4>{patient.ailment}</h4>
              </section>
            </section>
          ))}
        </section>
        <section className="w-full gap-4 flex flex-col items-center">
          <h4 className="font-semibold text-2xl">IPD Patients</h4>
          {ipd_patient.map((patient, index) => (
            <section
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col w-full gap-4">
              <section className="flex justify-between w-full items-center">
                <h4 className="font-semibold text-xl">{patient.name}</h4>
                <button className="bg-tertiary text-white w-1/12 py-2 font-bold rounded-lg" variant="contained">
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
