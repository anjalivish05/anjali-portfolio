import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail, Sparkles, Terminal, Code2, Database } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33333d15_1px,transparent_1px),linear-gradient(to_bottom,#33333d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle ambient light point - soft and restrained */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Meta Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-bg-card border border-border text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{PERSONAL_INFO.location}</span>
                <span className="text-border">/</span>
                <span className="text-text-primary">B.Tech IT</span>
              </span>

              <span className="text-xs font-mono text-text-muted">
                Shree L. R. Tiwari College of Engineering
              </span>
            </div>

            {/* Editorial Title */}
            <h1 className="font-heading font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-text-primary leading-[0.92] mb-6">
              ANJALI<br />
              <span className="text-text-secondary hover:text-text-primary transition-colors">
                VISHWAKARMA<span className="text-accent">.</span>
              </span>
            </h1>

            {/* Professional Role Display */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-md bg-bg-elevated border border-border font-heading font-semibold text-sm sm:text-base text-accent tracking-wide uppercase">
                {PERSONAL_INFO.role}
              </span>
              <span className="text-text-muted text-sm hidden sm:inline font-mono">
                Full-Stack & Web Architecture
              </span>
            </div>

            {/* Editorial Quotation */}
            <blockquote className="font-editorial text-2xl sm:text-3xl text-text-primary font-normal tracking-wide leading-relaxed mb-6 border-l-2 border-accent/40 pl-4">
              "{PERSONAL_INFO.tagline}"
            </blockquote>

            {/* Professional Introduction */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mb-8 font-sans">
              Undergraduate engineer focused on developing resilient full-stack systems, dynamic real-time interfaces, and practical AI applications. Passionate about solving tangible problems in healthcare, municipal access, and public infrastructure.
            </p>

            {/* CTA Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-accent text-bg-main font-heading font-semibold text-sm hover:bg-accent-light transition-all shadow-[0_4px_24px_-6px_rgba(167,139,250,0.4)]"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Anjali_Vishwakarma_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-card hover:bg-bg-elevated border border-border text-text-primary hover:text-accent font-mono text-xs font-medium transition-all"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>

              {/* Social Channels */}
              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all hover:scale-105"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Send Email"
                  className="p-3 rounded-xl bg-bg-card hover:bg-bg-elevated border border-border text-text-secondary hover:text-text-primary transition-all hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 max-w-lg">
              <div>
                <span className="block font-heading font-bold text-2xl text-text-primary">4+</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Production Projects</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-2xl text-text-primary">2028</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">B.Tech IT Cohort</span>
              </div>
              <div>
                <span className="block font-heading font-bold text-2xl text-text-primary">SIH '25</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">National Participant</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered 3D Depth Card & System Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Layered Decorative Elements */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Interactive System Terminal Card */}
              <div className="relative z-20 rounded-2xl bg-bg-card/95 border border-border p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-text-muted flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    anjali.config.ts
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>

                {/* Structured Developer Spec */}
                <div className="font-mono text-xs space-y-3">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-text-primary font-semibold">developer</span> = &#123;
                  </div>

                  <div className="pl-4 space-y-1.5 text-text-secondary">
                    <div>
                      <span className="text-text-muted">name:</span>{' '}
                      <span className="text-emerald-300">'{PERSONAL_INFO.name}'</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">education:</span>{' '}
                      <span className="text-emerald-300">'B.Tech Information Technology'</span>,
                    </div>
                    <div>
                      <span className="text-text-muted">coreLanguages:</span> [
                      <span className="text-amber-300">'Java'</span>,{' '}
                      <span className="text-amber-300">'Python'</span>,{' '}
                      <span className="text-amber-300">'JavaScript'</span>],
                    </div>
                    <div>
                      <span className="text-text-muted">primaryStack:</span> &#123;
                    </div>
                    <div className="pl-4 space-y-1 text-text-muted">
                      <div>
                        frontend: <span className="text-accent">'React.js'</span>,
                      </div>
                      <div>
                        backend: <span className="text-accent">'Spring Boot & FastAPI'</span>,
                      </div>
                      <div>
                        database: <span className="text-accent">'PostgreSQL & MySQL'</span>,
                      </div>
                    </div>
                    <div>&#125;,</div>
                    <div>
                      <span className="text-text-muted">currentInterest:</span>{' '}
                      <span className="text-emerald-300">'AI-Powered Civic Platforms'</span>
                    </div>
                  </div>

                  <div>&#125;;</div>
                </div>

                {/* Live Engineering Badges */}
                <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-[11px] font-mono text-text-secondary">
                    <Code2 className="w-3 h-3 text-accent" />
                    Clean Architecture
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-[11px] font-mono text-text-secondary">
                    <Database className="w-3 h-3 text-emerald-400" />
                    Relational Schemas
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-[11px] font-mono text-text-secondary">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Gemini AI Integration
                  </span>
                </div>
              </div>

              {/* Layered Floating Accent Card Behind */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 z-30 bg-bg-elevated/95 border border-border rounded-xl p-4 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-heading font-semibold text-text-primary">
                    Smart India Hackathon 2025
                  </span>
                  <span className="text-[11px] font-mono text-text-secondary">
                    National Finalist & Participant
                  </span>
                </div>
              </div>

              {/* Decorative Subtle Background Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-border/40 pointer-events-none -z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
