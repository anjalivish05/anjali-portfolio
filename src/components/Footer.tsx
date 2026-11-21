import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-transparent border-t border-[#403044] py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row: 3 Balanced Columns (2-col grid for nav on mobile avoids excessive height) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 pb-10 sm:pb-14 border-b border-[#403044]/60">
          
          {/* 1. Brand Section (5 cols) */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#211725] border border-[#403044] flex items-center justify-center font-serif text-xs sm:text-sm font-bold text-[#E6A995] shrink-0 shadow-sm">
                AV
              </div>
              <h3 className="font-serif text-base sm:text-xl lg:text-2xl tracking-tight text-[#F7EFF4] font-bold leading-tight">
                ANJALI MANOJ VISHWAKARMA
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#B3A2AE] leading-relaxed font-sans max-w-sm pt-0.5 sm:pt-1">
              Full-Stack &amp; Creative Developer based in Mumbai. Building thoughtful digital experiences through technology and human-centered design.
            </p>
          </div>

          {/* 2. Navigation Section (3 cols on desktop; 2-col compact grid on mobile) */}
          <div className="md:col-span-3 space-y-3 sm:space-y-3.5">
            <span className="text-[11px] font-mono text-[#E6A995] uppercase tracking-[0.2em] block font-medium">
              NAVIGATION
            </span>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2.5 text-xs sm:text-sm font-sans text-[#B3A2AE]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="inline-block hover:text-[#E6A995] hover:translate-x-1 transition-all duration-200 py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Connect Section (4 cols) */}
          <div className="md:col-span-4 space-y-4 sm:space-y-5">
            <span className="text-[11px] font-mono text-[#E6A995] uppercase tracking-[0.2em] block font-medium">
              LET'S CONNECT
            </span>

            {/* Social Icons Row with accessible 40px+ touch targets */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#211725] hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-[#B3A2AE] hover:text-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.3)] transition-all duration-300 flex items-center justify-center group"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#211725] hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-[#B3A2AE] hover:text-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.3)] transition-all duration-300 flex items-center justify-center group"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={PERSONAL_INFO.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#211725] hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-[#B3A2AE] hover:text-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.3)] transition-all duration-300 flex items-center justify-center group"
                title="X"
                aria-label="X"
              >
                <Twitter className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-10 h-10 rounded-full bg-[#211725] hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-[#B3A2AE] hover:text-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.3)] transition-all duration-300 flex items-center justify-center group"
                title="Email"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>

            {/* Prominent VIEW RESUME ↗ Button (Properly sized for all devices) */}
            <div className="pt-0.5">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#E6A995] hover:bg-[#D9907B] text-[#160F19] font-sans font-semibold text-xs tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 min-h-[40px]"
              >
                <span>VIEW RESUME</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* 4. Bottom Copyright Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8E7D8A] text-center sm:text-left">
          <div>
            © 2026 Anjali Manoj Vishwakarma. All rights reserved.
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#211725] hover:bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/60 text-xs font-sans text-[#B3A2AE] hover:text-[#E6A995] hover:-translate-y-0.5 transition-all duration-300 group min-h-[38px]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E6A995] transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};
