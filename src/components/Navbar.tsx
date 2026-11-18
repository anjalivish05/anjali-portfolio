import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3.5 shadow-2xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="group flex items-center gap-2.5 text-text-primary hover:text-accent transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center font-heading font-bold text-sm tracking-wider text-accent group-hover:border-accent transition-all">
                AV
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold tracking-tight text-base text-text-primary group-hover:text-accent transition-colors">
                  ANJALI<span className="text-accent">.V</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open for Opportunities
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-bg-card/70 border border-border/80 rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs font-medium font-heading tracking-wide transition-all rounded-full ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-bg-elevated rounded-full border border-border"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Resume Button & Contact CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Anjali_Vishwakarma_Resume.pdf"
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium font-mono text-text-secondary hover:text-accent bg-bg-card hover:bg-bg-elevated border border-border rounded-lg transition-all"
                title="Download Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>Resume</span>
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-heading font-medium tracking-wide text-bg-main bg-accent hover:bg-accent-light rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(167,139,250,0.5)]"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Anjali_Vishwakarma_Resume.pdf"
                className="p-2 text-text-secondary hover:text-accent bg-bg-card border border-border rounded-lg"
                title="Resume"
              >
                <FileText className="w-4 h-4 text-accent" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-secondary hover:text-text-primary bg-bg-card border border-border rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 p-4 md:hidden"
          >
            <div className="bg-bg-card border border-border rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-heading font-medium text-text-primary hover:bg-bg-elevated hover:text-accent transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-text-muted" />
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2.5">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="Anjali_Vishwakarma_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono text-text-primary bg-bg-elevated border border-border rounded-xl"
                >
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Download Resume PDF</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-heading font-semibold text-bg-main bg-accent rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
