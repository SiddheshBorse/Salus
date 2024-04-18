import React from 'react';
import { wards } from '../../constants';

const WardsAndBeds = () => {
  return (
    <div className="bg-highlight h-full flex flex-start p-2 gap-2 items-start overflow-y-auto">
      {wards.map((ward) => (
        <section className='flex flex-col items-center font-semibold' key={ward.name}>
          <div className='flex flex-col justify-center items-center border-solid border-2 border-black p-10 font-semibold rounded-xl' style={{ width: '200px', height: '200px' }}>
            {ward.occupancy} / {ward.totalCapacity}
            {ward.occupancy === "0" && (
              <span>Empty</span>
            )}
            {ward.occupancy === ward.totalCapacity && (
              <span>Full</span>
            )}
            {ward.occupancy !== "0" && ward.occupancy !== ward.totalCapacity && (
              <span>Available</span>
            )}
          </div>
          {ward.name}
        </section>
      ))}
      <section className='flex flex-col items-center font-semibold'>
      <div className='flex flex-col justify-center items-center border-solid border-2 border-black p-10 font-semibold rounded-xl
      ' style={{ width: '200px', height: '200px' }}>
        <span>+</span>
        <span>Add New</span>
      </div>
    </section>
    </div>
  );
};

export default WardsAndBeds;
