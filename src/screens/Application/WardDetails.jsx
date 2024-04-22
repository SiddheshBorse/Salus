import React from "react";
import { TextField} from '@mui/material';
import { staff } from "../../constants";

const WardDetails = () => {
  return (
    <div className="bg-highlight h-full flex flex-start p-2 gap-2 items-start overflow-y-auto">
      <div className="bg-white rounded-xl w-full p-4">
        <section className="flex items-center justify-between w-full">
          <button className="text-error font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Delete
          </button>
          <h3 className="font-medium text-3xl">Ward 1</h3>
          <button className="text-primary font-medium bg-white w-fit px-5 py-2 rounded-xl">
            Edit
          </button>
        </section>
        <section className="flex flex-col">
          <section className="text-tertiary-light">Ward details</section>
          <section className="flex justify-between gap-4">
            <section className="flex flex-col w-6/12 gap-4">
            <section className="flex w-full justify-between items-center gap-4">
            <h4>Current Occupancy</h4>
            <TextField label="18" className="w-96" disabled/>
          </section>
          <section className="flex w-full justify-between items-center gap-4">
            <h4>Total Occupancy</h4>
            <TextField label="18" className="w-96" disabled/>
          </section>
            </section>
            <section className="bg-background-1 rounded-xl p-4 h-fit flex flex-col w-6/12">
        <h4 className="font-semibold">Active Staff</h4>
        <ul>
          {staff.map((staffMember, index) => (
            <li
              key={index}
              className="flex justify-between py-2">
              <span>{staffMember.name}</span>
              <span className="text-tertiary-light">
                {staffMember.designation}
              </span>
            </li>
          ))}
        </ul>
      </section>
          </section>
        </section>
        <section>
          <section className="flex justify-between">
          <section className="text-tertiary-light">Ward details</section>
          <button className="bg-primary font-medium text-white w-fit px-5 py-2 rounded-xl">
            Add new patient
          </button>
          </section>
          <section>ward patients cards</section>
        </section>
      </div>
    </div>
  );
};

export default WardDetails;
