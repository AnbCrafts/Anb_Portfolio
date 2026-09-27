import React from 'react'
import Hero from '../Components/Hero'
import AboutSection from '../Components/About'
import SkillsSection from '../Components/Skills'
import ProjectsSection from '../Components/Project'
import ExperienceSection from '../Components/Experience'
import BlogSection from '../Components/BlogSection'
import ContactSection from '../Components/ContactSection'
import SectionWrapper from '../Components/SectionWrapper'

const Home = () => {
  return (
    <div>
      <div className="relative z-30">
        <SectionWrapper>
          <Hero />
        </SectionWrapper>
      </div>
      
      <div className="relative z-10">
        <SectionWrapper>
          <AboutSection />
        </SectionWrapper>
      </div>
        <SectionWrapper>
        <SkillsSection/>
            
          </SectionWrapper>
        <SectionWrapper>
        <ProjectsSection/>
            
          </SectionWrapper>
        <SectionWrapper>
        <ExperienceSection/>
            
          </SectionWrapper>
        <SectionWrapper>
        <BlogSection/>
            
          </SectionWrapper>
          <SectionWrapper>
        <ContactSection/>
            
          </SectionWrapper>
      
    </div>
  )
}

export default Home
