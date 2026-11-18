import React from 'react';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#160F19] border-t border-[#403044] py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#403044]/60">
          
          {/* Brand & Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2B1E30] border border-[#403044] flex items-center justify-center font-sans font-semibold text-xs text-[#E6A995]">
                AV
              </div>
              <span className="font-serif text-xl tracking-wider text-[#F7EFF4] font-medium">
                ANJALI<span className="text-[#E6A995]">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#B3A2AE] leading-relaxed font-sans max-w-sm">
              Full-Stack &amp; Creative Developer based in Mumbai. Building thoughtful digital experiences through technology and human-centered design.
            </p>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-sans text-[#E6A995] uppercase tracking-wider block font-medium">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#B3A2AE]">
              <li>
                <a href="#home" className="hover:text-[#E6A995] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E6A995] transition-colors">About</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#E6A995] transition-colors">Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#E6A995] transition-colors">Skills</a>
              </li>
              <li>
                <a href="#hackathons" className="hover:text-[#E6A995] transition-colors">Hackathons</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E6A995] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Socials & Resume (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-sans text-[#E6A995] uppercase tracking-wider block font-medium">
              Connect
            </span>

            <div className="flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] transition-all flex items-center justify-center hover:scale-105"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] transition-all flex items-center justify-center hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] transition-all flex items-center justify-center hover:scale-105"
                title="X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] transition-all flex items-center justify-center hover:scale-105"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <div>
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-xs font-sans text-[#F7EFF4] hover:text-[#E6A995] transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-[#E6A995]" />
                <span>View Resume</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8E7D8A]">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2B1E30] hover:bg-[#37283E] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] transition-all"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[#E6A995]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
