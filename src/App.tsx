import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
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
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { trackPageView } from './lib/analytics';

// Lazy load the 14KB+ ProjectModal to shave critical main bundle size on mobile
const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

// Memoize all main page sections so updating activeSection in Navbar doesn't cascade re-render the entire page
const MemoHero = React.memo(Hero);
const MemoAbout = React.memo(About);
const MemoProjects = React.memo(Projects);
const MemoExperience = React.memo(Experience);
const MemoSkills = React.memo(Skills);
const MemoAchievements = React.memo(Achievements);
const MemoContact = React.memo(Contact);
const MemoFooter = React.memo(Footer);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Optimized passive section observer: zero getBoundingClientRect calls, zero forced reflows
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'experience', 'skills', 'hackathons', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Passive bottom-of-page check for contact
    let scrollTicking = false;
    const handleScrollBottom = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            setActiveSection('contact');
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    window.addEventListener('scroll', handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollBottom);
    };
  }, []);

  // Support URL query parameter ?project=hospitalflow, etc.
  useEffect(() => {
    trackPageView(window.location.pathname);
    const params = new URLSearchParams(window.location.search);
    const proj = params.get('project');
    if (proj && PROJECTS.some((p) => p.id === proj)) {
      setSelectedProjectId(proj);
    }
  }, []);

  const handleOpenProject = useCallback((id: string) => {
    setSelectedProjectId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('project', id);
    window.history.pushState({}, '', url.toString());
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
  }, []);

  const currentProject: Project | null = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || null
    : null;

  return (
    <div className="relative min-h-screen bg-[#160F19] text-[#F7EFF4] selection:bg-[#E6A995] selection:text-[#160F19] overflow-x-clip">
      {/* Unified Continuous Global Background System */}
      <GlobalBackground />

      {/* 1. Floating Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 2. Hero Section */}
        <MemoHero />

        {/* 3. About Section */}
        <MemoAbout />

        {/* 4. Selected Works (Projects) Section */}
        <MemoProjects onOpenProject={handleOpenProject} />

        {/* 5. Where I've Applied My Skills (Experience) Section */}
        <MemoExperience />

        {/* 6. Tools I Work With (Skills) Section */}
        <MemoSkills />

        {/* 6. Beyond the Code (Hackathons & Achievements) Section */}
        <MemoAchievements />

        {/* 7. Contact Section */}
        <MemoContact />
      </main>

      {/* Footer */}
      <MemoFooter />

      {/* Case Study Modal */}
      {currentProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={currentProject}
            onClose={handleCloseProject}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
