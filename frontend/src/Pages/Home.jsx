import React from 'react'
import Hero from '../Components/Hero'
import MetricsSection from '../Components/MetricsSection'
import AboutSection from '../Components/About'
import SkillsSection from '../Components/Skills'
import ProjectsSection from '../Components/Project'
import ExperienceSection from '../Components/Experience'
import ContactSection from '../Components/ContactSection'
import SectionWrapper from '../Components/SectionWrapper'

const Home = () => {
  return (
    <div>

          <SectionWrapper>

        <Hero/>
          </SectionWrapper>
          <SectionWrapper>
            
        <MetricsSection/>
          </SectionWrapper>
          
        <SectionWrapper>

        <AboutSection/>
            
          </SectionWrapper>
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
        <ContactSection/>
            
          </SectionWrapper>
      
    </div>
  )
}

export default Home
