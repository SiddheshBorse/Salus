import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db, auth } from '../../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button } from '@mui/base';

const AppointmentProcessing = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [personnelId, setPersonalId] = useState(queryParams.get("personnelId"));
    const [hospitalId, setHospitalId] = useState(queryParams.get("hospitalId"));
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const personnelDocRef = doc(db, "Hospitals", hospitalId, "personnel", personnelId);
          const personnelDocSnapshot = await getDoc(personnelDocRef);
  
          if (personnelDocSnapshot.exists()) {
            const personnelData = personnelDocSnapshot.data();
            const lastSchedule = personnelData.schedule[personnelData.schedule.length - 1];
            if (lastSchedule && lastSchedule.appointments) {
              setAppointments(lastSchedule.appointments);
            }
          } else {
            console.log('No such personnel document!');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [personnelId, hospitalId]);
  
    const handleBookAppointment = async (index) => {
        try {
          const userId = auth.currentUser.uid;
          const personnelDocRef = doc(db, "Hospitals", hospitalId, "personnel", personnelId);
          const personnelDocSnapshot = await getDoc(personnelDocRef);
      
          if (personnelDocSnapshot.exists()) {
            const personnelData = personnelDocSnapshot.data();
            const lastScheduleIndex = personnelData.schedule.length - 1;
      
            // Create a new array with the updated appointment
            const updatedAppointments = appointments.map((appointment, appointmentIndex) => {
              if (appointmentIndex === index) {
                return {
                  ...appointment,
                  assignedTo: userId,
                };
              }
              return appointment;
            });
      
            // Update the Firestore document with the updated appointments array
            await updateDoc(personnelDocRef, {
              [`schedule.${lastScheduleIndex}.appointments`]: updatedAppointments,
            });
      
            // Update the UI with the updated appointments array
            setAppointments(updatedAppointments);
      
            console.log('Appointment booked successfully!');
          } else {
            console.log('No such personnel document!');
          }
        } catch (error) {
          console.error('Error booking appointment:', error);
        }
      };
  return (
    <div className="container mx-auto py-8 overflow-scroll">
      <h1 className="text-3xl font-bold mb-4">Appointment Processing</h1>
      <p className="mb-2">Personnel ID: {personnelId}</p>
      <p className="mb-4">Hospital ID: {hospitalId}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {appointments.map((appointment, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg font-semibold mb-2">Appointment {index + 1}</p>
            <p className="text-gray-600 mb-2">Start Time: {appointment.startTime}</p>
            <p className="text-gray-600 mb-2">End Time: {appointment.endTime}</p>
            <p className="text-gray-600">Assigned To: {appointment.assignedTo}</p>
            <Button onClick={() => handleBookAppointment(index)}>Book</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentProcessing;
