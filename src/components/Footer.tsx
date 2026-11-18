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
    <footer className="bg-bg-secondary border-t border-border/70 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          
          {/* Brand & Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center font-heading font-bold text-sm text-accent">
                AV
              </div>
              <span className="font-heading font-bold tracking-tight text-lg text-text-primary">
                ANJALI<span className="text-accent">.V</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm">
              Full-Stack Developer & BTech IT undergraduate in Mumbai. Focused on engineered web applications, AI-enabled services, and human-centered design.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Summer / Fall 2025-2026 Engineering Roles</span>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider block font-semibold">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-mono text-text-secondary">
              <li>
                <a href="#home" className="hover:text-accent transition-colors">01. Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">02. About</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition-colors">03. Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent transition-colors">04. Skills</a>
              </li>
              <li>
                <a href="#hackathons" className="hover:text-accent transition-colors">05. Hackathons</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">06. Contact</a>
              </li>
            </ul>
          </div>

          {/* Socials & Resume (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider block font-semibold">
              Connect & Verify
            </span>

            <div className="flex flex-wrap gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div>
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Anjali_Vishwakarma_Resume.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-xs font-mono text-text-primary hover:text-accent transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>Download Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Built with React, Vite & Tailwind CSS</span>
            
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-accent transition-all"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
