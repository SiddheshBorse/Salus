import React from "react";
import { TextField} from "@mui/material";
import { staff, doctor } from "../../constants";
import { useNavigate } from "react-router-dom";

const StaffDisplay = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-highlight flex flex-col flex-start p-2 gap-2 h-full overflow-scroll">
      <section className="flex items-center gap-2 justify-center">
        <TextField className="w-4/12" label="Search staff member" />
        <button
          className="bg-primary text-white w-2/12 py-2 font-bold rounded-lg"
          variant="contained">
          Search
        </button>
        <button
          className="bg-tertiary text-white w-2/12 py-2 font-bold rounded-lg"
          variant="contained"
          onClick={()=>{navigate("/dashboard/doctorOnboarding")}}>
          Add new member
        </button>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Active Doctors (General) </h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Admin Staff</h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Support Staff (General)</h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Ancillary Services</h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Specialized Personnel</h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Emergency Response Team </h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl p-4 h-fit flex flex-col mt-4">
        <h4 className="font-semibold">Active Doctors</h4>
        <ul>
          {doctor.map((doctorMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2 border-b border-gray-300">
              <span>{doctorMember.name}</span>
              <span className="text-tertiary-light">
                {doctorMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StaffDisplay;
