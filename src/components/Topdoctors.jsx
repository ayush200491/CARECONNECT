import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Topdoctors = () => {
   const navigate = useNavigate()
   const { doctors } = useContext(AppContext)

   const handleNavigate = (id) => {
     navigate(`/appointments/${id}`)
     window.scrollTo(0, 0)
   }

   return (
     <div className=' mt-16 '>
       <div className='text-center'>
         <h1 className='text-3xl pb-4 font-semibold'>Top Doctors to Book</h1>
         <p className='md:w-[35%] mx-auto text-sm font-medium text-slate-500'>
           Simply browse through our extensive list of trusted doctors.
         </p>
       </div>
       <div className='grid xl:grid-cols-5 sm:px-0 px-5 pt-6 gap-8 mt-6 lg:grid-cols-3 md:grid-cols-2'>
         {doctors.slice(0, 10).map((p, i) => {
           return (
             <div 
               onClick={() => handleNavigate(p._id)} 
               key={i} 
               className='flex transition-all flex-shrink-0 hover:-translate-y-4 duration-700 flex-col rounded-b-lg shadow-md cursor-pointer'
             >
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
           )
         })}
       </div>
       <div className='flex justify-center w-full my-8'>
         <button
           onClick={() => { 
             navigate("/doctors")
             window.scrollTo(0, 0)
           }}
           className='bg-white text-sm py-3 px-8 rounded-full border text-orange-300 font-semibold'
         >
           View all doctors
         </button>
       </div>
     </div>
   )
}

export default Topdoctors
