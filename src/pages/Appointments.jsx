import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import dayjs from 'dayjs';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Appointments = () => {

  const navigate = useNavigate()
  const { docId } = useParams();
  const { doctors, currencySymbol ,appointments,bookAppointment} = useContext(AppContext);
  
  const [appointment, setAppointment] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('');
  
  // Time slots array
  const timeSlots = [
    '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', 
    '01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm'
  ];
  
  // Generate the next 7 days for date selection
  const generateNext7Days = () => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = dayjs().add(index, 'day');
      return { day: date.format('ddd'), date: date.format('D'), fullDate: date.format('YYYY-MM-DD') };
    });
  };
  
  const next7Days = generateNext7Days();

  const appointFilter = () => {
    const app = doctors.find(doc => doc._id === docId);
    setAppointment(app);
    // console.log(app);
  };

  const handleBookAppointment = () => {
    const newAppointment = {
      id: docId,
      name: appointment.name,
      speciality: appointment.speciality,
      address: appointment.address,
      date: selectedDate,
      time: selectedTime,
      image: appointment.image
    };
    bookAppointment(newAppointment);
    navigate('/my-appointments'); // Redirect to MyAppointments page
    toast.success("Appointment booked successfully")
  };


  useEffect(() => {
    appointFilter(); 
  }, [docId]);

  return (
    <div className=''>
      <div className='flex md:flex-row flex-col mt-5 flex-shrink-0 gap-5 w-full h-full'>
        {/* Doctor Information */}
        <div className='bg-[#5F6FFF] flex-shrink-0 lg:w-[30%] md:w-[45%] rounded-lg '>
          <img className='w-full h-full object-cover' src={appointment.image} alt="" />
        </div>
        <div className='lg:w-[76%]  border border-slate-300 rounded-md px-7 py-7'>
          <div className='flex gap-3 items-center'>
            <h1 className='text-3xl font-semibold text-gray-700'>{appointment.name}</h1>
            <img className='w-5' src={assets.verified_icon} alt="" />
          </div>
          <div className='flex gap-3 items-center mt-2'>
            <p>{appointment.degree} - {appointment.speciality}</p>
            <p className='border rounded-full px-2 py-1 text-xs'>{appointment.experience}</p>
          </div>
          <div className='flex gap-2 mt-2 items-center'>
            <h3>About</h3>
            <img className='w-3' src={assets.info_icon} alt="" />
          </div>
          <p className='text-sm w-[75%] text-gray-600'>{appointment.about}</p>
          <h2 className='mt-6'>Appointment fee: {currencySymbol}{appointment.fees}</h2>
        </div>
      </div>

      {/* Date and Time Slot Selection */}
      <div className='mt-8'>
        <h3 className='text-lg font-medium'>Booking slots</h3>
        <div className='flex gap-3 mt-4 overflow-x-scroll'>
          {next7Days.map(({ day, date, fullDate }) => (
            <button
              key={fullDate}
              onClick={() => setSelectedDate(fullDate)}
              className={`px-4 py-2 rounded-md ${selectedDate === fullDate ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <p className='font-semibold'>{day}</p>
              <p>{date}</p>
            </button>
          ))}
        </div>
        
        <div className='flex gap-3 mt-6 overflow-x-scroll'>
          {timeSlots.map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`px-3 py-2 rounded-full border ${selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {slot}
            </button>
          ))}
        </div>
        
        <button onClick={handleBookAppointment} className='mt-8 px-6 py-2 bg-blue-500 text-white rounded-md'>
          Book an appointments
        </button>
      </div>  
      {/* related Products */}
        <div className='mt-16'>
            <div className='text-center'>
                  <h1 className='text-3xl pb-4 font-semibold'>Related Doctors</h1>
                  <p className='md:w-[35%] mx-auto text-sm font-medium text-slate-500' >Simply browse through our extensive list of trusted doctors.</p>
            </div>
            <RelatedProducts docId={docId} speciality={appointment.speciality} />
        </div>
    </div>
  );
};

export default Appointments;
