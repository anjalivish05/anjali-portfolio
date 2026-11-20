import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GlobalBackground } from './components/GlobalBackground';
import { ProjectModal } from './components/ProjectModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'experience', 'skills', 'hackathons', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Support URL query parameter ?project=hospitalflow, etc.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proj = params.get('project');
    if (proj && PROJECTS.some(p => p.id === proj)) {
      setSelectedProjectId(proj);
    }
  }, []);

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('project', id);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
  };

  const currentProject: Project | null = selectedProjectId
    ? PROJECTS.find(p => p.id === selectedProjectId) || null
    : null;

  return (
    <div className="relative min-h-screen bg-[#160F19] text-[#F7EFF4] selection:bg-[#E6A995] selection:text-[#160F19] overflow-x-hidden">
      {/* Unified Continuous Global Background System */}
      <GlobalBackground />

      {/* 1. Floating Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Section */}
        <About />

        {/* 4. Selected Works (Projects) Section */}
        <Projects onOpenProject={handleOpenProject} />

        {/* 5. Where I've Applied My Skills (Experience) Section */}
        <Experience />

        {/* 6. Tools I Work With (Skills) Section */}
        <Skills />

        {/* 6. Beyond the Code (Hackathons & Achievements) Section */}
        <Achievements />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      {currentProject && (
        <ProjectModal
          project={currentProject}
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
};

export default App;
