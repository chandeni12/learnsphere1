import React from 'react'
import Navbar from '../Pages/Navbar'
import Header from '../Pages/Header'
import Projects from '../Pages/Projects'
import Footer from '../Pages/Footer'
import Spinner from '../Pages/Spinner'

export default function Projects1() {
  return (
    <>
      <Spinner/>
      <Navbar/>
      <Header name="Projects"/>
      <Projects/>
      <Footer/>
    </>
  )
}
