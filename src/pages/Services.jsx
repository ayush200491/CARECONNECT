import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'

const Services = () => {
  const navigate = useNavigate();

  return (
    <div>
     <div className='flex flex-col items-center gap-4 mt-16'>
        <h1 className='text-3xl font-semibold text-gray-700'>Our Services</h1>
        <p className='text-gray-600 text-center w-[80%]'>We offer a wide range of healthcare services to meet your needs. From general consultations to specialized treatments, our experienced doctors are here to provide you with the best care possible.</p>
      </div> 
        <div className='flex flex-col md:flex-row gap-6 mt-8'>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={"https://images.stockcake.com/public/0/7/4/0746ef10-9e91-44dc-8ee6-b1b9451b7623_large/virtual-doctor-consultation-stockcake.jpg"} alt="Online Doctor Consultation" />
            <h2 className='text-xl font-medium'>Online Doctor Consultation</h2>
            <p className='text-gray-600 text-center'>Video/chat consultations with experienced specialists — secure, private sessions for diagnosis, follow-ups, and personalized treatment plans.</p>
          </div>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF7TvGlwO_eAmZ-lVksFaFD7e03YAyXrEXBg&s"} alt="In-Clinic Appointments" />
            <h2 className='text-xl font-medium'>In-Clinic Appointments </h2>
            <p className='text-gray-600 text-center'>Book appointments at certified clinics and hospitals with real-time availability, confirmations, and reminders.</p>
          </div>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={assets.Medical_Specialist} alt="Medical_Specialist" />
            <h2 className='text-xl font-medium'>Medical Specialists</h2>
            <p className='text-gray-600 text-center'>Access experienced specialists across multiple fields for expert consultations, referrals, and second opinions.</p>
          </div>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center object-cover justify-center" src={assets.Medical_Emergency} alt="Medical_Emergency" />
            <h2 className='text-xl font-medium'>Emergency Care</h2>
            <p className='text-gray-600 text-center'>24/7 emergency coordination and triage support to connect you quickly with the nearest appropriate care.</p>
          </div>

        </div>

        <div className='flex flex-col md:flex-row gap-6 mt-8'>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={assets.Lab} alt="Lab" />
            <h2 className='text-xl font-medium'>Lab & Diagnostic Tests</h2>
            <p className='text-gray-600 text-center'>Book lab and diagnostic tests with fast, reliable results and secure online reports reviewed by our clinicians.</p>
          </div>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={assets.Health_Records_Management} alt="Health_Records_Management" />
            <h2 className='text-xl font-medium'>Health Records Management </h2>
            <p className='text-gray-600 text-center'>Securely store and access your medical history, test results, and documents in one centralized, private place.</p>
          </div>

          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]'>
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center  justify-center" src={assets.Prescription_Management} alt="Prescription_Management" />
            <h2 className='text-xl font-medium'>Prescription Management</h2>
            <p className='text-gray-600 text-center'>Track prescriptions, request refills, and receive medication reminders and interaction warnings.</p>
          </div>
          
          <div className='flex flex-col items-center gap-3 border bg-[#EAEFFF] rounded-lg p-6 w-full md:w-[30%]' >
            <img className="w-60 h-60 md:w-72 md:h-72 overflow-hidden rounded-lg bg-[#EAEFFF] flex items-center justify-center" src={assets.Second_Medical_Opinion} alt="Second_Medical_Opinion" />
            <h2 className='text-xl font-medium'>Second Medical Opinion</h2>
            <p className='text-gray-600 text-center'>Request an independent second opinion from senior specialists to confirm diagnoses or explore alternative treatment options.</p>
          </div>

        </div>
      </div> 
    
  )
}

export default Services
