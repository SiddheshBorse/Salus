import { TextField } from "@mui/material";
import { staff, doctor } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { auth,db } from "../../../firebase/firebase";
import { doc,getDocs,collection,getDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';

const StaffDisplay = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [onDutyPersonnel, setOnDutyPersonnel] = useState([]);
  const [personnel, setPersonnel] = useState([]);


  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const uid = currentUser.uid;
        const masterAccountDocRef = doc(db, "Master Accounts", uid);
        const docSnapshot = await getDoc(masterAccountDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const hospitalUID = userData.hospitalUID;
          return hospitalUID;
        } else {
          console.log("No document found for the current user");
          return null;
        }
      } catch (error) {
          console.error("Error fetching document:", error);
          return null;
      }
    } else {
      console.log("No user signed in");
      return null;
    }
  };

  const getAllPersonnel = async () => {
    const personnelArray = [];
  
    try {
      const hospitalUID = await getCurrentUserHospitalUID();
  
      if (hospitalUID) {
        const hospitalDocRef = doc(db, "Hospitals", hospitalUID);
        const personnelCollectionRef = collection(hospitalDocRef, "personnel");
  
        const querySnapshot = await getDocs(personnelCollectionRef);
  
        querySnapshot.forEach((doc) => {
          const personnelData = doc.data();
          const personnelObject = {
            id: doc.id,
            ...personnelData,
          };
          personnelArray.push(personnelObject);
        });
        console.log(personnelArray);
        setPersonnel(personnelArray)
        return personnelArray;
      } else {
        console.log("No hospital UID found for the current user");
        return null;
      }
    } catch (error) {
      console.error("Error fetching personnel:", error);
      return null;
    }
  };

  const getOnDutyPersonnel = (personnelArray) => {
    const onDutyPersonnel = [];
    console.log("inside the onduty personnel");
  
    personnelArray.forEach((personnel) => {
      const { clock, ...otherPersonnelData } = personnel;
  
      if (clock && clock.length > 0) {
        const lastClockEntry = clock[clock.length - 1];

        console.log(lastClockEntry);
  
        if (lastClockEntry.clockout === null) {
          onDutyPersonnel.push({ ...otherPersonnelData, isOnDuty: true });
        } 
      }
    });
    console.log(onDutyPersonnel);
    return onDutyPersonnel;
  };


  useEffect(() => {
    const fetchOnDutyPersonnel = async () => {
      try {
        const allPersonnel = await getAllPersonnel();
        const onDutyPersonnel = getOnDutyPersonnel(allPersonnel);
        setOnDutyPersonnel(onDutyPersonnel);
      } catch (error) {
        console.error('Error fetching on-duty personnel:', error);
      }
    };

    fetchOnDutyPersonnel();
  }, []);

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
          onClick={() => {
            navigate("/dashboard/doctorOnboarding");
          }}>
          Add new member
        </button>
      </section>

      <section className="bg-white rounded-xl p-4 h-fit flex flex-col mt-4">
  <h4 className="font-semibold">Active Doctors (IPD)</h4>
  <ul>
    {onDutyPersonnel
      .filter(
        (personnel) =>
          personnel.department === "Doctor" &&
          personnel.isICU
      )
      .map((personnel, index) => (
        <li
          key={index}
          className="flex justify-between py-2 border-b border-gray-300"
        >
          <span>{personnel.name}</span>
          <div className="flex items-center justify-between mb-4">
            <span className="text-tertiary-light">{personnel.designation}</span>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={handleOpenModal}
            />
          </div>
        </li>
      ))}
  </ul>
</section>
<section className="bg-white rounded-xl p-4 h-fit flex flex-col mt-4">
  <h4 className="font-semibold">Active Doctors (General)</h4>
  <ul>
    {onDutyPersonnel
      .filter(
        (personnel) =>
          personnel.department === "Doctor" &&
          personnel.isICU === false
      )
      .map((personnel, index) => (
        <li
          key={index}
          className="flex justify-between py-2 border-b border-gray-300"
        >
          <span>{personnel.name}</span>
          <div className="flex items-center justify-between mb-4">
            <span className="text-tertiary-light">{personnel.designation}</span>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={handleOpenModal}
            />
          </div>
        </li>
      ))}
  </ul>
</section>
      <section className="bg-white rounded-xl p-4 h-fit flex flex-col">
        <h4 className="font-semibold">Admin Staff</h4>
        <ul>
        {onDutyPersonnel
      .filter(
        (personnel) =>
          personnel.department === "Admin"
      )
      .map((personnel, index) => (
        <li
          key={index}
          className="flex justify-between py-2 border-b border-gray-300"
        >
          <span>{personnel.name}</span>
          <div className="flex items-center justify-between mb-4">
            <span className="text-tertiary-light">{personnel.designation}</span>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QrCodeIcon />}
              onClick={handleOpenModal}
            />
          </div>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeIcon />}
                  onClick={handleOpenModal}
                />
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeIcon />}
                  onClick={handleOpenModal}
                />
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeIcon />}
                  onClick={handleOpenModal}
                />
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-tertiary-light">
                  {staffMember.designation}
                </span>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QrCodeIcon />}
                  onClick={handleOpenModal}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          {/* Replace this with your QR code component */}
          <h2>QR Code</h2>
        </Box>
      </Modal>
    </div>
  );
};

export default StaffDisplay;
