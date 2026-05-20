import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedProducts = ({ docId, speciality }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setrelDoc] = useState([])

  useEffect(() => {
    const relatedDoc = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
    setrelDoc(relatedDoc)
  }, [docId, speciality,doctors])

  const handleNavigate = (id) => {
    navigate(`/appointments/${id}`)
    window.scrollTo(0, 0) // Scroll to top after navigating
  }

  return (
    <div className='grid xl:grid-cols-4 md:w-[82%] w-full sm:px-0 mt-16 gap-8 lg:grid-cols-2'>
      {relDoc.map((p, i) => (
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
      ))}
    </div>
  )
}

export default RelatedProducts
