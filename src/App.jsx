import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import MyAppointments from './pages/MyAppointments';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';
import Services from './pages/Services';

const App = () => {
  const location = useLocation();

  return (
    <div className='mx-4 sm:mx-[10%] relative'>
      <ToastContainer />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path='/'
            element={<PageTransition><Home /></PageTransition>}
          />
          <Route
            path='/doctors'
            element={<PageTransition><Doctors /></PageTransition>}
          />
          <Route
            path='/doctors/:speciality'
            element={<Doctors />}
          />
          <Route
            path='/login'
            element={<PageTransition><Login /></PageTransition>}
          />
          <Route
            path='/about'
            element={<PageTransition><About /></PageTransition>}
          />
          <Route
            path='/contact'
            element={<PageTransition><Contact /></PageTransition>}
          />
          <Route
            path='/contact'
            element={<PageTransition><Contact /></PageTransition>}
          />
          <Route
            path='/services'
            element={<PageTransition><Services /></PageTransition>}
          />
          <Route
            path='/my-profile'
            element={<PageTransition><Myprofile /></PageTransition>}
          />
          <Route
            path='/my-appointments'
            element={<PageTransition><MyAppointments /></PageTransition>}
          />
          <Route
            path='/appointments/:docId'
            element={<PageTransition><Appointments /></PageTransition>}
          />
         
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

// Define the transition animation for pages
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default App;
