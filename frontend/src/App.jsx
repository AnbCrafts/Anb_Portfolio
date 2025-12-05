import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SectionWrapper from './Components/SectionWrapper'
import HireMe from './Pages/Hire'
import ProjectsPage from './Pages/ProjectPage'
import AboutPage from './Pages/AboutPage'
const App = () => {
  return (
    <div className=''>

      <SectionWrapper>
       <Header/>
                   
        </SectionWrapper>


                
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/hire' element={<HireMe/>} />
        <Route path='/project-details' element={<ProjectsPage/>} />
        <Route path='/about' element={<AboutPage/>} />

      </Routes>

      <SectionWrapper>
                  
      <Footer/>
                </SectionWrapper>

 
      


    </div>
  )
}

export default App
