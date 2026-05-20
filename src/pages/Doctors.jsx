import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setfilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='py-4'>Browse through the doctors specialist.</p>
      <div className='flex md:flex-row flex-col gap-8'>
        <div className="md:w-[18%] w-full">
          {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((specialty) => (
            <p
              key={specialty}
              onClick={() =>
                speciality === specialty ? navigate("/doctors") : navigate(`/doctors/${specialty}`)
              }
              className={`border ${
                speciality === specialty ? "bg-blue-100" : ""
              } cursor-pointer px-4 w-[70%] md:w-full py-2 mb-2`}
            >
              {specialty}
            </p>
          ))}
        </div>
        <div className='grid xl:grid-cols-4 md:w-[82%] w-full sm:px-0 gap-8 lg:grid-cols-2'>
          {filterDoc.map((p, i) => (
            <div onClick={()=> navigate(`/appointments/${p._id}`)} key={i} className='flex transition-all flex-shrink-0 hover:-translate-y-4 duration-700 flex-col rounded-b-lg shadow-md cursor-pointer'>
              <img className='bg-[#EAEFFF] rounded-t-lg' src={p.image} alt="" />
              <div className='bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-2.5 h-2.5 rounded-full bg-orange-300'></div>
                  <span className='text-sm text-orange-300 font-semibold'>Available</span>
                </div>
                <h2 className='text-lg font-semibold mt-1'>{p.name}</h2>
                <p className='text-sm font-[500] text-slate-600'>{p.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
