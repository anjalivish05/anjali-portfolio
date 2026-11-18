import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { GitHubSection } from './components/GitHubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'hackathons', 'contact'];
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
    <div className="relative min-h-screen bg-bg-main text-text-primary selection:bg-accent selection:text-bg-main">
      {/* Sticky Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Asymmetric Bento Grid Section */}
        <BentoGrid onOpenProject={handleOpenProject} />

        {/* 3. About Me Section */}
        <About />

        {/* 4. Featured Projects Section */}
        <Projects onOpenProject={handleOpenProject} />

        {/* 5. Technical Skills Section */}
        <Skills />

        {/* 6. Hackathons & Achievements Section */}
        <Achievements />

        {/* 7. GitHub Activity & Public Repos */}
        <GitHubSection />

        {/* 8. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      <ProjectModal
        project={currentProject}
        onClose={handleCloseProject}
      />
    </div>
  );
};

export default App;
