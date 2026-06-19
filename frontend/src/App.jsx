import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPortfolioData } from './Store/portfolioStore'

// --- Portfolio (Public) Pages ---
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SectionWrapper from './Components/SectionWrapper'
import HireMe from './Pages/Hire'
import ProjectsPage from './Pages/ProjectPage'
import AboutPage from './Pages/AboutPage'
import Stories from './Pages/Stories'
import StoryPage from './Pages/SingleStory'
import NotFound from './Pages/NotFound'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPortfolioData())
  }, [dispatch])

  return (
    <div>

      <Routes>

        {/* ================================
            PUBLIC PORTFOLIO ROUTES
        ================================= */}
        <Route
          path='/'
          element={
            <>
              <Header />
              <Home />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/hire'
          element={
            <>
              <Header />
              <HireMe />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/project-details'
          element={
            <>
              <Header />
              <ProjectsPage />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Header />
              <AboutPage />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/stories'
          element={
            <>
              <Header />
              <Stories />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/stories/:slug'
          element={
            <>
              <Header />
              <StoryPage />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />



        {/* 404 */}
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>
  )
}

export default App
