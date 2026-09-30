import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPortfolioData } from './Store/portfolioStore'

// --- Portfolio (Public) Pages ---
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Header from './Components/Header'
import SectionWrapper from './Components/SectionWrapper'
import ScrollToTop from './Components/ScrollToTop'
import ScrollProgress from './Components/ScrollProgress'
import AnalyticsTracker from './Components/AnalyticsTracker'
import HireMe from './Pages/Hire'
import ProjectsPage from './Pages/ProjectPage'
import AboutPage from './Pages/AboutPage'
import Stories from './Pages/Stories'
import StoryPage from './Pages/SingleStory'
import BlogsPage from './Pages/BlogsPage'
import BlogDetail from './Pages/BlogDetail'
import NotFound from './Pages/NotFound'

import CustomCursor from './Components/CustomCursor'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPortfolioData())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#050315] text-[#fbfbfe] selection:bg-[#433bff] selection:text-white transition-colors duration-300">
      <CustomCursor />
      <AnalyticsTracker />
      <ScrollProgress />
      <ScrollToTop />
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
          path='/blogs'
          element={
            <>
              <Header />
              <BlogsPage />
              <SectionWrapper><Footer /></SectionWrapper>
            </>
          }
        />
        <Route
          path='/blog/:slug'
          element={
            <>
              <Header />
              <BlogDetail />
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
