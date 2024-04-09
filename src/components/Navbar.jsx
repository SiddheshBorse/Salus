import React, { useState } from 'react';

const Navbar = () => {
  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState('Home');

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // CSS class for active tab
  const activeTabClass = 'bg-background-1 py-2 rounded-xl font-semibold';

  // CSS class for inactive tabs
  const inactiveTabClass = ' py-2 rounded-xl font-semibold';

  return (
    <div className='w-1/6 flex-col items-center gap-10'>
        <h1 className="font-bold text-center text-3xl w-full">
          <span className="text-primary">Apollo</span> Hospital
        </h1>
      <section className='w-full flex flex-col items-center'>
        <ul className='flex flex-col gap-5'>
          <li className={activeTab === 'Home' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Home')}>Home</a>
          </li>
          <li className={activeTab === 'Settings' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Settings')}>Settings</a>
          </li>
        </ul>
      </section>

      <section className='w-full flex flex-col items-center gap-10'>
        <h4>Hospital Sections</h4>
        <ul className=''>
          <li className={activeTab === 'Patient History' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Patient History')}>Patient History</a>
          </li>
          <li className={activeTab === 'Billing' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Billing')}>Billing</a>
          </li>
          <li className={activeTab === 'Reception' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Reception')}>Reception</a>
          </li>
          <li className={activeTab === 'Sonography' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Sonography')}>Sonography</a>
          </li>
          <li className={activeTab === 'X-Ray' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('X-Ray')}>X-Ray</a>
          </li>
          <li className={activeTab === 'Medicines' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Medicines')}>Medicines</a>
          </li>
          <li className={activeTab === 'IPD' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('IPD')}>IPD</a>
          </li>
          <li className={activeTab === 'Emergency' ? activeTabClass : inactiveTabClass}>
            <a href="#" onClick={() => handleTabClick('Emergency')}>Emergency</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
