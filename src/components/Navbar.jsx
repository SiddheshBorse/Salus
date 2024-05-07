import home from "../assets/icons/home.svg"
import settings from "../assets/icons/settings.svg"
import { auth,db } from "../../firebase/firebase";
import { doc,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

const getCurrentUserHospitalName = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      // Get the UID of the current user
      const userUID = currentUser.uid;

      // Reference to the "personnelMap" document
      const personnelMapDocRef = doc(db, "personnelMap", "personnelMap");

      // Get the document snapshot
      const personnelMapDocSnapshot = await getDoc(personnelMapDocRef);

      // Check if the document exists
      if (personnelMapDocSnapshot.exists()) {
        // Get the data from the document
        const personnelMapData = personnelMapDocSnapshot.data();

        // Check if the user's UID exists in the personnelMap
        if (personnelMapData && personnelMapData[userUID]) {
          const hospitalUID = personnelMapData[userUID];

          // Reference to the document in the "Hospitals" collection with the retrieved hospitalUID
          const hospitalDocRef = doc(db, "Hospitals", hospitalUID);

          // Get the document snapshot
          const hospitalDocSnapshot = await getDoc(hospitalDocRef);

          // Check if the hospital document exists
          if (hospitalDocSnapshot.exists()) {
            // Get the data from the hospital document
            const hospitalData = hospitalDocSnapshot.data();

            // Access the "name" field
            const hospitalName = hospitalData.name;

            // Return the hospital name
            return hospitalName;
          }
        }
      }

      // Document or user's UID not found
      console.log("No document or user's UID found");
      return null;
    } catch (error) {
      console.error("Error fetching document:", error);
      return null;
    }
  } else {
    // No user is signed in
    console.log("No user signed in");
    return null;
  }
};
const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const [hospitalName, setHospitalName] = useState("");

  useEffect(()=>{
    getCurrentUserHospitalName().then(name => {
      if (name !== null) {
        setHospitalName(name); // Set the user's name in the state
      }
    });
  },[])
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabClass = (tabName) => {
    return tabName === activeTab ? 'bg-background-1' : '';
  };

  const activeTabClass = 'px-20 py-3 rounded-xl font-semibold cursor-pointer';
  const inactiveTabClass = 'px-20 py-3 rounded-xl font-semibold cursor-pointer';

  return (
    <div className="w-3/12 flex flex-col items-center border-r-2">
      <h1 className="font-bold text-center text-3xl w-full">
        <span className="text-primary">{hospitalName}</span>
      </h1>
      <div>
        <ul className="flex flex-col items-center gap-2">
          <li
            className={`${tabClass("Home")} ${activeTabClass}`}
            onClick={() => handleTabClick("Home")}
          >
            <NavLink to="/dashboard/home" className="flex items-center">
              <img src={home} alt="" className="mr-2" />
              Home
            </NavLink>
          </li>
          <li
            className={`${tabClass("Settings")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Settings")}
          >
            <NavLink to="/dashboard/settings" className="flex items-center">
              <img src={settings} alt="" className="mr-2" />
              Settings
            </NavLink>
          </li>
          <li>
            <div className="text-xl font-semibold text-tertiary-light">
              Hospital Sections
            </div>
          </li>
          <li
            className={`${tabClass("Doctor UI")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Doctor UI")}
          >
            <NavLink to="/dashboard/doctorUI">Doctor UI</NavLink>
          </li>
          <li
            className={`${tabClass("Staff Onboarding")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Staff Onboarding")}
          >
            <NavLink to="/dashboard/doctorOnboarding">Staff Onboarding</NavLink>
          </li>
          <li
            className={`${tabClass("Staff Display")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Staff Display")}
          >
            <NavLink to="/dashboard/staffDisplay">Staff Display</NavLink>
          </li>
          <li
            className={`${tabClass("Reception")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Reception")}
          >
            <NavLink to="/dashboard/reception">Reception</NavLink>
          </li>
          <li
            className={`${tabClass("Wards and Beds")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Wards and Beds")}
          >
            <NavLink to="/dashboard/wardsDisplay">Wards and Beds</NavLink>
          </li>
          <li
            className={`${tabClass("Patients")} ${inactiveTabClass}`}
            onClick={() => handleTabClick("Patients")}
          >
            <NavLink to="/dashboard/patients">Patients</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
