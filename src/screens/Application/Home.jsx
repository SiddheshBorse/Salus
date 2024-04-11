import React from "react";

import { emergencies, staff, doctor, appointments, nextShift } from "../../constants";

const Home = () => {
  return (
    <div className="bg-highlight h-full flex flex-col flex-start p-2 gap-2 items-center overflow-y-auto">
      <section className="bg-background-2 w-full flex justify-between p-4 rounded-xl">
        <h4 className="text-secondary font-semibold">No Emergency Code</h4>
        <button className="text-error font-semibold">Call Emergency</button>
      </section>
      <section className="flex flex-col gap-4 bg-background-1 p-4 w-full rounded-xl">
        <section>
          <h4 className="font-semibold">Hospital Emergencies</h4>
          {emergencies.map((emergency, index) => (
            <section key={index} className="flex justify-between">
              <section className="flex flex-col">
                <h5 className="text-tertiary">Room Number</h5>
                <h5>{emergency.RoomNo}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Emergency Type</h5>
                <h5>{emergency.EmergencyType}</h5>
              </section>
              <section className="flex flex-col">
                <h5 className="text-tertiary">Instructions</h5>
                <h5>{emergency.instructions}</h5>
              </section>
            </section>
          ))}
        </section>
      </section>
      <section>Manage hospital staff button</section>
      <section className="flex w-full justify-between gap-4 items-start">
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-6/12">
          <h4 className="font-semibold">Active Doctors</h4>
          <ul>
            {doctor.map((doctorMember, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{doctorMember.name}</span>
                <span className="text-tertiary-light">
                  {doctorMember.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-6/12">
          <h4 className="font-semibold">Active Staff</h4>
          <ul>
            {staff.map((staffMember, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{staffMember.name}</span>
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-full">
          <h4 className="font-semibold">Appointments</h4>
          <ul>
            {appointments.map((appointment, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{appointment.name}</span>
                <span className="text-tertiary-light">
                  {appointment.doctor}
                </span>
                <span className="text-tertiary-light">
                  {appointment.ailment}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl p-4 h-fit flex flex-col w-full">
          <h4 className="font-semibold">Next Shift</h4>
          <ul>
            {nextShift.map((staffMemeber, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-300"
              >
                <span>{staffMemeber.name}</span>
                <span className="text-tertiary-light">
                  {staffMemeber.designation}
                </span>
              </li>
            ))}
          </ul>
        </section>
    </div>
  );
};

export default Home;
