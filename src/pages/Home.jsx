import React from 'react'
import Hero from '../components/Hero'
import Speciality from '../components/Speciality'
import Topdoctors from '../components/Topdoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
        <Hero />
        <Speciality />
        <Topdoctors />
        <Banner />
    </div>
  )
}

export default Home