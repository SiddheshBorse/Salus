import React from "react";
import { TextField} from "@mui/material";
import { opd_patient, ipd_patient } from "../../constants";
import { Link } from "react-router-dom";

const Patients = () => {
    return (
        <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center">
        <section className="flex items-center justify-between w-full">
  <TextField className="w-4/12" label="Search Patient" />
  <div className="flex items-center"> {/* Wrap buttons in a div and apply flexbox */}
    <button className="bg-primary text-white py-2 px-4 font-bold rounded-lg mr-2" variant="contained"> {/* Added padding */}
      Search
    </button>
    <Link to="/dashboard/patientRegistration">
      <button className="bg-gray-700 text-white py-2 px-8 font-bold rounded-lg" variant="contained"> {/* Adjusted padding and width */}
        Add New Patient
      </button>
    </Link>
  </div>
</section>

        <div className="reception-scroll-container overflow-y-auto h-full w-full">
          <section className="bg-background-2 rounded-xl p-4 flex flex-col justify-center items-center gap-4 w-full">
            <h4 className="font-semibold text-2xl">OPD Patients</h4>
            {opd_patient.slice(0, 5).map((patient, index) => (
              <section key={index} className="bg-white rounded-xl p-4 flex flex-col w-full gap-4">
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
            {ipd_patient.slice(0, 5).map((patient, index) => (
              <section key={index} className="bg-white rounded-xl p-4 flex flex-col w-full gap-4">
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
    )
};

export default Patients;