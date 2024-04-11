import React, { useState } from "react";
import home from "../assets/icons/home.svg"
import settings from "../assets/icons/settings.svg"

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabClass = (tabName) => {
    return tabName === activeTab ? 'bg-background-1' : '';
  };

  const activeTabClass = 'px-20 py-3 rounded-xl font-semibold cursor-pointer';
  const inactiveTabClass = 'px-20 py-3 rounded-xl font-semibold cursor-pointer';

  return (
    <div className="w-3/12 flex flex-col items-center">
      <h1 className="font-bold text-center text-3xl w-full">
        <span className="text-primary">Apollo</span> Hospital
      </h1>
      <div>
        <ul className="flex flex-col items-center gap-2">
          <li className={`${tabClass('Home')} ${activeTabClass}`} onClick={() => handleTabClick('Home')}>
            <div className="flex items-center">
              <img src={home} alt="" className="mr-2" />
              Home
            </div>
          </li>
          <li className={`${tabClass('Settings')} ${inactiveTabClass}`} onClick={() => handleTabClick('Settings')}>
            <div className="flex items-center">
              <img src={settings} alt="" className="mr-2" />
              Settings
            </div>
          </li>
          <li>
          <div className="text-xl font-semibold text-tertiary-light">Hospital Sections</div>
          </li>
          <li className={`${tabClass('Patient History')} ${inactiveTabClass}`} onClick={() => handleTabClick('Patient History')}>
            Patient History
          </li>
          <li className={`${tabClass('Billing')} ${inactiveTabClass}`} onClick={() => handleTabClick('Billing')}>
            Billing
          </li>
          <li className={`${tabClass('Reception')} ${inactiveTabClass}`} onClick={() => handleTabClick('Reception')}>
            Reception
          </li>
          <li className={`${tabClass('Sonography')} ${inactiveTabClass}`} onClick={() => handleTabClick('Sonography')}>
            Sonography
          </li>
          <li className={`${tabClass('Xray')} ${inactiveTabClass}`} onClick={() => handleTabClick('Xray')}>
            Xray
          </li>
          <li className={`${tabClass('Medicines')} ${inactiveTabClass}`} onClick={() => handleTabClick('Medicines')}>
            Medicines
          </li>
          <li className={`${tabClass('IPD')} ${inactiveTabClass}`} onClick={() => handleTabClick('IPD')}>
            IPD
          </li>
          <li className={`${tabClass('Emergency')} ${inactiveTabClass}`} onClick={() => handleTabClick('Emergency')}>
            Emergency
          </li>
        </ul>
      </div>
      <div>account settings</div>
    </div>
  );
};

export default Navbar;
