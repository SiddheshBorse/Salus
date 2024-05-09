import React, { useEffect,useState } from 'react'
import { auth,db } from '../../../firebase/firebase';
import { doc,getDocs,collection,getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [personnel, setPersonnel] = useState([]);
  const navigation = useNavigate();

  const getCurrentUserHospitalUID = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const userUID = currentUser.uid;
        const personnelMapDocRef = doc(db, 'personnelMap', 'personnelMap');
        const personnelMapDocSnapshot = await getDoc(personnelMapDocRef);

        if (personnelMapDocSnapshot.exists()) {
          const personnelMapData = personnelMapDocSnapshot.data();

          if (personnelMapData && personnelMapData[userUID]) {
            const hospitalUID = personnelMapData[userUID];
            return hospitalUID;
          }
        }

        console.log('No document or user\'s UID found');
        return null;
      } catch (error) {
        console.error('Error fetching document:', error);
        return null;
      }
    } else {
      console.log('No user signed in');
      return null;
    }
  };

  const getAllPersonnel = async () => {
    const personnelArray = [];

    try {
      const hospitalUID = await getCurrentUserHospitalUID();

      if (hospitalUID) {
        const hospitalDocRef = doc(db, 'Hospitals', hospitalUID);
        const personnelCollectionRef = collection(hospitalDocRef, 'personnel');
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
        return personnelArray;
      } else {
        console.log('No hospital UID found for the current user');
        return null;
      }
    } catch (error) {
      console.error('Error fetching personnel:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const personnelData = await getAllPersonnel();
        if (personnelData) {
          console.log(personnelData);
          setPersonnel(personnelData);
        }
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    };

    fetchPersonnel();
  }, []);

  const handleDivClick = async (personnelId) => {
    const hospitalId = await getCurrentUserHospitalUID();
    console.log("sending"+ personnelId);
    console.log("sending"+ hospitalId);
    navigation(`/dashboard/appointmentProcessing?personnelId=${personnelId}&hospitalId=${hospitalId}`);
  };


  return (
    <div className='overflow-scroll flex flex-wrap gap-2 *:'>
       {personnel.filter((person) => person.department === 'Doctor' &&
          person.isICU === false).map((doctor) => (
        <div className='flex flex-col justify-center items-center border-solid border-2 border-black p-10 font-semibold rounded-xl
      ' style={{ width: '200px', height: '200px' }}
      onClick={() => handleDivClick(doctor.id)}>
        {doctor.name}
      </div>
      ))}
    </div>
  )
}

export default Booking