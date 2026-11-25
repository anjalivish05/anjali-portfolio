import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from '../lib/motion';
import { FileText, ArrowDown, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { trackEvent } from '../lib/analytics';

const ROLES = [
  'Full-Stack Developer',
  'Creative Developer',
  'Technology Enthusiast',
  'Problem Solver'
];

export const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;
    // On mobile screens, skip continuous scroll-driven state updates to eliminate touch scroll jank
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      // Only track while hero is in or near viewport
      if (window.scrollY < 900) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const fullRole = ROLES[currentRoleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < fullRole.length) {
        timer = setTimeout(() => {
          setDisplayText(fullRole.slice(0, displayText.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullRole.slice(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-28 pb-20 select-none bg-transparent scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Centered Content Container with Natural Scroll Flow */}
      <div 
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: Math.max(0, 1 - scrollY / 750),
                transition: 'opacity 100ms ease-out',
                willChange: 'opacity',
              }
        }
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        
        {/* Small greeting badge: "HELLO & WELCOME" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211725]/90 border border-[#403044] mb-6 sm:mb-8 backdrop-blur-md shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995]" />
          <span className="text-[11px] uppercase tracking-[0.26em] font-sans font-medium text-[#E6A995]">
            HELLO &amp; WELCOME
          </span>
        </motion.div>

        {/* Main heading: "I'm Anjali." */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[38px] min-[360px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F7EFF4] font-bold tracking-tight mb-3 sm:mb-6 leading-tight sm:leading-none"
        >
          I'm Anjali<span className="text-[#E6A995]">.</span>
        </motion.h1>

        {/* Animated role text with typing effect & soft peach cursor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl text-[#F7EFF4]/90 mb-4 sm:mb-5 flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
        >
          <span className="font-editorial text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl italic font-normal tracking-wide">
            {displayText}
          </span>
          <span className="inline-block w-[2.5px] h-[1em] ml-2 bg-[#E6A995] align-middle animate-pulse" />
        </motion.div>

        {/* Supporting text: "Building thoughtful digital experiences." */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base font-sans text-[#B3A2AE] max-w-md mx-auto mb-8 sm:mb-10 font-normal tracking-wide leading-relaxed"
        >
          Building thoughtful digital experiences.
        </motion.p>

        {/* Circular Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3.5 mb-9 sm:mb-11"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] hover:border-[#E6A995] hover:bg-[#2B1E30] transition-all flex items-center justify-center hover:scale-105 shadow-sm"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] hover:border-[#E6A995] hover:bg-[#2B1E30] transition-all flex items-center justify-center hover:scale-105 shadow-sm"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] hover:border-[#E6A995] hover:bg-[#2B1E30] transition-all flex items-center justify-center hover:scale-105 shadow-sm"
            title="X"
          >
            <Twitter className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send Email"
            className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] hover:border-[#E6A995] hover:bg-[#2B1E30] transition-all flex items-center justify-center hover:scale-105 shadow-sm"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Action Buttons: Primary (Peach) & Secondary (Transparent Plum) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col min-[420px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs min-[420px]:max-w-none"
        >
          {/* Primary Button */}
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_download', 'Hero Section Resume Button')}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 w-full min-[420px]:w-auto rounded-full bg-[#E6A995] text-[#160F19] font-sans font-semibold text-xs sm:text-sm hover:bg-[#D9907B] transition-all shadow-[0_4px_20px_-4px_rgba(230,169,149,0.35)] hover:shadow-[0_6px_24px_-4px_rgba(230,169,149,0.5)] hover:scale-[1.02] min-h-[44px]"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </a>

          {/* Secondary Button */}
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 w-full min-[420px]:w-auto rounded-full bg-[#211725]/80 hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-[#F7EFF4] hover:text-[#E6A995] font-sans font-medium text-xs sm:text-sm transition-all hover:scale-[1.02] min-h-[44px]"
          >
            <span>Explore My Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#E6A995] transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

      </div>

      {/* 3. Minimal Animated Scroll Indicator at Bottom Centre */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#8E7D8A] hover:text-[#E6A995] transition-colors cursor-pointer group"
        aria-label="Scroll to About section"
      >
        <div className="w-5 h-8 rounded-full border border-[#403044] group-hover:border-[#E6A995]/60 flex justify-center pt-1.5 transition-colors">
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#E6A995]"
          />
        </div>
      </motion.a>
    </section>
  );
};
