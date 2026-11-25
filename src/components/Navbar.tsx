import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../lib/motion';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track window scroll for background glass transition
  useEffect(() => {
    const handleScroll = () => {
      const isPast20 = window.scrollY > 20;
      setScrolled((prev) => (prev !== isPast20 ? isPast20 : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Support Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        } ${
          scrolled
            ? 'bg-[#160F19]/96 md:backdrop-blur-md py-2.5 sm:py-3 border-b border-[#403044]/80 shadow-lg shadow-black/30'
            : 'bg-transparent py-3 sm:py-4 lg:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4">
            
            {/* 1. LEFT BRANDING: AV Monogram + Complete Name ANJALI MANOJ VISHWAKARMA */}
            <a
              href="#home"
              className="group flex items-center gap-1.5 sm:gap-2.5 text-[#F7EFF4] hover:text-[#E6A995] transition-colors shrink-0 min-w-0"
              aria-label="Anjali Manoj Vishwakarma — Home"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-[#2B1E30] border border-[#403044] flex items-center justify-center font-sans font-semibold text-[10px] sm:text-xs tracking-wider text-[#E6A995] group-hover:border-[#E6A995] group-hover:shadow-[0_0_12px_rgba(230,169,149,0.25)] transition-all shrink-0">
                AV
              </div>
              <span className="font-serif text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-[11px] lg:text-[12px] xl:text-[13px] tracking-normal sm:tracking-wider lg:tracking-[0.1em] xl:tracking-[0.12em] uppercase font-bold text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors truncate max-w-[150px] min-[360px]:max-w-[210px] min-[420px]:max-w-none">
                ANJALI MANOJ VISHWAKARMA
              </span>
            </a>

            {/* 2A. CENTRE: Desktop Navigation (1024px and above) */}
            <nav
              className="hidden lg:flex items-center gap-1 bg-[#211725]/85 border border-[#403044] rounded-full px-3 xl:px-4 py-1.5 backdrop-blur-md shrink-0"
              aria-label="Desktop Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-2 xl:px-3 py-1 text-[11px] xl:text-xs font-medium font-sans tracking-tight xl:tracking-wide transition-all rounded-full ${
                      isActive
                        ? 'text-[#160F19]'
                        : 'text-[#B3A2AE] hover:text-[#F7EFF4] hover:bg-[#2B1E30]/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-[#E6A995] rounded-full shadow-[0_2px_12px_rgba(230,169,149,0.35)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* 2B. CENTRE: Tablet Navigation (768px to 1023px) — Compact layout preventing overflow */}
            <nav
              className="hidden md:flex lg:hidden items-center gap-0.5 bg-[#211725]/85 border border-[#403044] rounded-full px-2 py-1 backdrop-blur-md shrink-0"
              aria-label="Tablet Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-1.5 py-0.5 text-[10px] font-medium font-sans tracking-tight transition-all rounded-full ${
                      isActive
                        ? 'text-[#160F19]'
                        : 'text-[#B3A2AE] hover:text-[#F7EFF4] hover:bg-[#2B1E30]/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicatorTablet"
                        className="absolute inset-0 bg-[#E6A995] rounded-full shadow-[0_2px_10px_rgba(230,169,149,0.3)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* 3A. RIGHT ACTIONS: Desktop CTAs (1024px and above) */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 text-[11.5px] xl:text-xs font-medium font-sans text-[#B3A2AE] hover:text-[#E6A995] bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] hover:border-[#E6A995]/50 rounded-full transition-all"
                title="View Resume (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-[#E6A995]" />
                <span>View Resume</span>
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 text-[11.5px] xl:text-xs font-sans font-medium tracking-wide text-[#160F19] bg-[#E6A995] hover:bg-[#D9907B] rounded-full transition-all shadow-[0_0_20px_-4px_rgba(230,169,149,0.4)]"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* 3B. RIGHT ACTIONS: Tablet CTAs (768px to 1023px) — Compact */}
            <div className="hidden md:flex lg:hidden items-center gap-1.5 shrink-0">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden min-[900px]:flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-medium font-sans text-[#B3A2AE] hover:text-[#E6A995] bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] hover:border-[#E6A995]/50 rounded-full transition-all"
                title="View Resume (PDF)"
              >
                <FileText className="w-3 h-3 text-[#E6A995]" />
                <span>View Resume</span>
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-sans font-medium tracking-tight text-[#160F19] bg-[#E6A995] hover:bg-[#D9907B] rounded-full transition-all shadow-sm"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* 4. MOBILE CONTROLS (Below 768px): Quick Resume Icon + Accessible 40px+ Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-full bg-[#2B1E30] border border-[#403044] text-[#E6A995] hover:border-[#E6A995] transition-all"
                aria-label="View Resume (PDF)"
                title="View Resume"
              >
                <FileText className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-full bg-[#2B1E30] border border-[#403044] text-[#F7EFF4] hover:text-[#E6A995] hover:border-[#E6A995]/50 transition-colors"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#E6A995]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 5. MOBILE NAVIGATION DRAWER & BACKDROP */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Dropdown Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-[52px] sm:top-[60px] z-40 bg-[#160F19]/98 backdrop-blur-2xl border-b border-[#403044] px-5 sm:px-6 py-5 shadow-2xl md:hidden max-h-[calc(100vh-60px)] overflow-y-auto"
            >
              <nav className="flex flex-col space-y-2.5" aria-label="Mobile Navigation Menu">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all ${
                        isActive
                          ? 'bg-[#E6A995] text-[#160F19] shadow-sm'
                          : 'text-[#B3A2AE] hover:text-[#F7EFF4] hover:bg-[#2B1E30]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#160F19]" />}
                    </a>
                  );
                })}

                {/* Mobile Actions: Resume & Let's Talk */}
                <div className="pt-4 mt-2 border-t border-[#403044] flex flex-col gap-2.5">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-xs font-sans text-[#E6A995] font-medium transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#E6A995]" />
                    <span>View Resume</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#E6A995] hover:bg-[#D9907B] text-[#160F19] text-xs font-sans font-semibold shadow-md transition-colors"
                  >
                    <span>Let's Talk</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
