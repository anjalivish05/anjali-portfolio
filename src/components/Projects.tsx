import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink, 
  Pause, 
  Play 
} from 'lucide-react';
import { Github } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import { useScrollReveal, LetterRevealHeading } from '../lib/motion';
import { trackEvent } from '../lib/analytics';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
    once: true,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  // Drag / swipe gesture state
  const dragStartX = useRef<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const AUTOPLAY_DURATION = 5000;

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Pause autoplay when browser tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setProgress(0);
  }, []);

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  // Keyboard arrow navigation when projects section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const projectsEl = document.getElementById('projects');
      if (!projectsEl) return;
      const rect = projectsEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Autoplay timer (5 seconds) with pause-on-hover & pause-on-hidden
  useEffect(() => {
    if (isHovered || !isTabVisible || prefersReducedMotion || isDragging) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTOPLAY_DURATION) {
        handleNext();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex, isHovered, isTabVisible, prefersReducedMotion, isDragging, handleNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    setDragDelta(e.touches[0].clientX - dragStartX.current);
  };

  const handleTouchEnd = () => {
    if (dragDelta > 45) {
      handlePrev();
    } else if (dragDelta < -45) {
      handleNext();
    }
    dragStartX.current = null;
    setDragDelta(0);
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    setDragDelta(e.clientX - dragStartX.current);
  };

  const handleMouseUp = () => {
    if (dragDelta > 45) {
      handlePrev();
    } else if (dragDelta < -45) {
      handleNext();
    }
    dragStartX.current = null;
    setDragDelta(0);
    setIsDragging(false);
  };

  const activeProject = PROJECTS[activeIndex];

  // Calculate 3D Coverflow geometry for slide at index `idx`
  const getCoverflowStyle = (idx: number): React.CSSProperties => {
    let diff = idx - activeIndex;
    // Circular distance wrap for 4 items
    if (diff > 2) diff -= 4;
    if (diff < -1) diff += 4;

    if (prefersReducedMotion) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: diff === 0 ? 1 : 0,
        pointerEvents: diff === 0 ? 'auto' : 'none',
        display: diff === 0 ? 'block' : 'none',
        zIndex: diff === 0 ? 30 : 10,
      };
    }

    // Active Center Slide
    if (diff === 0) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + ${dragDelta * 0.4}px), -50%) translate3d(0, 0, 0) rotateY(${dragDelta * -0.05}deg) scale(1)`,
        zIndex: 30,
        opacity: 1,
        pointerEvents: 'auto',
        filter: 'none',
        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, filter 600ms ease',
      };
    }

    // Next Slide (Right side)
    if (diff === 1) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + 48% + ${dragDelta * 0.25}px), -50%) translate3d(0, 0, -160px) rotateY(-28deg) scale(0.82)`,
        zIndex: 20,
        opacity: 0.65,
        pointerEvents: 'auto',
        filter: 'brightness(0.65) blur(0.5px)',
        cursor: 'pointer',
        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, filter 600ms ease',
      };
    }

    // Prev Slide (Left side)
    if (diff === -1) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% - 48% + ${dragDelta * 0.25}px), -50%) translate3d(0, 0, -160px) rotateY(28deg) scale(0.82)`,
        zIndex: 20,
        opacity: 0.65,
        pointerEvents: 'auto',
        filter: 'brightness(0.65) blur(0.5px)',
        cursor: 'pointer',
        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, filter 600ms ease',
      };
    }

    // Far / Opposite Slide
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(calc(-50% + ${diff > 0 ? '90%' : '-90%'}), -50%) translate3d(0, 0, -320px) rotateY(${diff > 0 ? -45 : 45}deg) scale(0.65)`,
      zIndex: 10,
      opacity: 0,
      pointerEvents: 'none',
      filter: 'brightness(0.4) blur(2px)',
      transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease',
    };
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div 
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto transition-all duration-700"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E6A995] block">
              SELECTED WORK / 01—04
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-bold tracking-tight mb-3">
            <LetterRevealHeading
              text="Things I've Built"
              isRevealed={isRevealed}
              accentChar=""
              prefersReducedMotion={prefersReducedMotion}
            />
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal max-w-xl mx-auto">
            A few ideas turned into working experiences. Explore via 3D Coverflow slider.
          </p>
        </div>

        {/* 1. 3D Coverflow Carousel Stage */}
        <div 
          className="relative w-full py-4 sm:py-6 cursor-grab active:cursor-grabbing select-none transition-all duration-700"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(32px)',
                  transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
                }
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); handleMouseUp(); }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* 3D Perspective Stage */}
          <div 
            className="relative w-full h-[280px] sm:h-[370px] md:h-[440px] lg:h-[480px] flex items-center justify-center"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {PROJECTS.map((project, idx) => {
              let diff = idx - activeIndex;
              if (diff > 2) diff -= 4;
              if (diff < -1) diff += 4;
              const isActive = diff === 0;

              return (
                <div
                  key={project.id}
                  style={getCoverflowStyle(idx)}
                  onClick={() => {
                    if (diff === 1) handleNext();
                    if (diff === -1) handlePrev();
                  }}
                  className={`w-[88%] sm:w-[78%] md:w-[640px] lg:w-[740px] max-w-[760px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    isActive
                      ? 'border-2 border-[#E6A995]/80 shadow-[0_20px_50px_-10px_rgba(230,169,149,0.3)] bg-[#211725]'
                      : 'border border-[#403044] bg-[#1B1320] hover:border-[#E6A995]/50'
                  }`}
                >
                  {/* Browser-Style Top Header Bar */}
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-[#1B1320] border-b border-[#403044] flex items-center justify-between gap-2 sm:gap-3">
                    {/* 3 Window Control Dots */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]/90 inline-block shadow-sm" />
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]/90 inline-block shadow-sm" />
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981]/90 inline-block shadow-sm" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 min-w-0 max-w-sm sm:max-w-md mx-1.5 sm:mx-2 px-2 sm:px-3 py-1 bg-[#160F19] border border-[#403044] rounded-lg text-[9px] min-[360px]:text-[10px] sm:text-xs font-mono text-[#B3A2AE] truncate flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[#8E7D8A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="truncate">{project.deploymentUrl || project.liveDemoUrl || 'https://vercel.app'}</span>
                    </div>

                    {/* Live Application Status Badge */}
                    <div className="px-1.5 min-[360px]:px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[8.5px] min-[360px]:text-[9px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="hidden sm:inline">Live Application</span>
                      <span className="sm:hidden">Live</span>
                    </div>
                  </div>

                  {/* Screenshot Viewport */}
                  <div className="relative w-full h-[calc(100%-38px)] sm:h-[calc(100%-44px)] bg-[#160F19] overflow-hidden">
                    <img 
                      src={project.image}
                      alt={`${project.title} live interface preview`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#160F19]/95 via-[#160F19]/50 to-transparent pointer-events-none" />

                    {/* Slide Bottom Bar Info */}
                    <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#160F19]/85 backdrop-blur-md border border-[#403044]/90 text-xs font-mono gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#E6A995] shrink-0" />
                        <span className="text-[#F7EFF4] font-medium text-xs sm:text-sm font-serif truncate">
                          {project.title}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#8E7D8A] font-mono hidden sm:inline truncate">
                          ({project.role})
                        </span>
                      </div>

                      {isActive ? (
                        <a
                          href={project.deploymentUrl || project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E6A995] flex items-center gap-1 hover:underline text-[10px] sm:text-xs font-sans font-medium shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Open Live</span>
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[#B3A2AE] text-[9.5px] sm:text-xs font-sans shrink-0">
                          Click to View
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Arrow Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-[#211725]/90 border border-[#403044] hover:border-[#E6A995] hover:bg-[#2B1E30] text-[#F7EFF4] hover:text-[#E6A995] transition-all shadow-xl hover:scale-105"
            aria-label="Previous Project"
            title="Previous Project (Left Arrow)"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-[#211725]/90 border border-[#403044] hover:border-[#E6A995] hover:bg-[#2B1E30] text-[#F7EFF4] hover:text-[#E6A995] transition-all shadow-xl hover:scale-105"
            aria-label="Next Project"
            title="Next Project (Right Arrow)"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Carousel Progress & Indicator Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8 mb-10">
          {/* Autoplay Pause / Play Status Indicator */}
          <button
            onClick={() => setIsHovered(!isHovered)}
            className="p-1.5 rounded-full bg-[#211725] border border-[#403044] text-[#8E7D8A] hover:text-[#E6A995] transition-colors"
            title={isHovered ? 'Resume Autoplay' : 'Pause Autoplay'}
            aria-label={isHovered ? 'Resume Autoplay' : 'Pause Autoplay'}
          >
            {isHovered ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>

          {/* Pagination Indicators (4 Projects) */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((proj, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? 'w-8 sm:w-10 h-2 bg-[#E6A995] shadow-[0_0_12px_rgba(230,169,149,0.5)]'
                      : 'w-2 h-2 bg-[#403044] hover:bg-[#B3A2AE]'
                  }`}
                  aria-label={`Go to project 0${idx + 1} - ${proj.title}`}
                  title={`0${idx + 1} • ${proj.title}`}
                />
              );
            })}
          </div>

          {/* Autoplay 5-second indicator bar */}
          <div className="w-16 sm:w-24 h-1 bg-[#211725] rounded-full overflow-hidden border border-[#403044]/60">
            <div 
              className="h-full bg-[#E6A995] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 2. Active Project Details Showcase Card */}
        <div 
          className="max-w-4xl mx-auto rounded-3xl bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/50 transition-all duration-500 p-5 min-[380px]:p-7 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, border-color 400ms ease',
                }
          }
        >
          {/* Subtle card internal ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6A995]/[0.025] rounded-full blur-3xl pointer-events-none" />

          {/* Top Meta Row */}
          <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#E6A995] font-semibold">
                0{activeIndex + 1} / 04 • {activeProject.role}
              </span>
              {activeProject.label && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider bg-[#E6A995]/15 border border-[#E6A995]/40 text-[#E6A995]">
                  {activeProject.label}
                </span>
              )}
            </div>
            {activeProject.year && (
              <span className="text-xs font-mono text-[#8E7D8A]">
                {activeProject.year}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EFF4] font-bold tracking-tight mb-2 relative z-10">
            {activeProject.title}
          </h3>

          {/* Project Subtitle */}
          <p className="text-xs sm:text-sm font-sans uppercase tracking-wider text-[#E6A995] mb-4 font-medium relative z-10">
            {activeProject.subtitle}
          </p>

          {/* Project Description */}
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] leading-relaxed mb-5 font-normal relative z-10">
            {activeProject.shortDescription}
          </p>

          {/* Highlight Box (e.g. for Stealth Pay ETHGlobal submission) */}
          {activeProject.highlight && (
            <div className="p-3.5 rounded-xl bg-[#211725] border border-[#403044] flex items-center gap-2.5 text-xs text-[#F7EFF4] mb-5 relative z-10">
              <span className="text-[#E6A995] text-sm shrink-0">✦</span>
              <span>{activeProject.highlight}</span>
            </div>
          )}

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-7 relative z-10">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#211725] border border-[#403044] text-xs font-sans text-[#B3A2AE] hover:border-[#E6A995]/40 hover:text-[#F7EFF4] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 relative z-10">
            {/* View Case Study Button */}
            <button
              onClick={() => {
                trackEvent('project_click', `${activeProject.title} - Case Study`);
                onOpenProject(activeProject.id);
              }}
              className="px-5 py-2.5 rounded-full bg-[#E6A995] text-[#160F19] hover:bg-[#D9907B] transition-all duration-200 font-sans text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md group/btn"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </button>

            {/* View Live Demo Button */}
            {activeProject.deploymentUrl && (
              <a
                href={activeProject.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('project_click', `${activeProject.title} - Live Demo`)}
                className="px-4 py-2.5 rounded-full border border-[#403044] text-[#F7EFF4] hover:border-[#E6A995] hover:text-[#E6A995] transition-colors font-sans text-xs sm:text-sm font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Demo</span>
              </a>
            )}

            {/* View Source Code Button (only when valid link exists) */}
            {activeProject.githubUrl && !activeProject.isComingSoonSource ? (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('project_click', `${activeProject.title} - Source Code`)}
                className="px-4 py-2.5 rounded-full border border-[#403044] text-[#F7EFF4] hover:border-[#E6A995] hover:text-[#E6A995] transition-colors font-sans text-xs sm:text-sm font-medium flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Code</span>
              </a>
            ) : activeProject.isComingSoonSource ? (
              <span
                className="px-4 py-2.5 rounded-full bg-[#211725] border border-[#403044] text-[#8E7D8A] font-sans text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-not-allowed"
                title="Source code repository will be published soon"
              >
                <Github className="w-3.5 h-3.5 opacity-50" />
                <span>Source Code: Coming Soon</span>
              </span>
            ) : null}

            {/* Showcase Button (if configured, e.g. for Stealth Pay) */}
            {activeProject.showcaseUrl && (
              <a
                href={activeProject.showcaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-[#403044] text-[#F7EFF4] hover:border-[#E6A995] hover:text-[#E6A995] transition-colors font-sans text-xs sm:text-sm font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
