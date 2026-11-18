import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Terminal, 
  Sparkles, 
  Github, 
  Award, 
  Compass, 
  ArrowUpRight, 
  Layers, 
  Check, 
  Copy, 
  ExternalLink,
  BookOpen,
  Activity,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface BentoGridProps {
  onOpenProject: (projectId: string) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenProject }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Snapshot Matrix</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
              Curated Highlights & Architecture
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md mt-4 md:mt-0 font-sans">
            An overview of engineering domains, core proficiencies, verified hackathons, and recent project initiatives.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(180px,auto)]">
          
          {/* 1. About / Engineering Philosophy (Wide Card: 7 cols) */}
          <div className="md:col-span-7 bg-bg-card border border-border rounded-2xl p-7 flex flex-col justify-between bento-card relative overflow-hidden group">
            {/* Subtle corner badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-accent" />
                ENGINEERING PHILOSOPHY
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-bg-elevated text-text-secondary border border-border">
                B.Tech IT
              </span>
            </div>

            <div>
              <p className="font-editorial text-2xl sm:text-3xl text-text-primary leading-snug mb-4">
                "Code with architectural intent. Design with human empathy."
              </p>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xl font-sans">
                {PERSONAL_INFO.about}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-border">
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <span className="block text-xs font-heading font-semibold text-text-primary">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    Mumbai, India
                  </span>
                </div>
              </div>

              <a
                href="#about"
                className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent-light transition-colors"
              >
                <span>Read Full Background</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. Technical Stack Matrix (5 cols) */}
          <div className="md:col-span-5 bg-bg-card border border-border rounded-2xl p-7 flex flex-col justify-between bento-card relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  CORE PROFICIENCIES
                </span>
                <span className="text-[11px] font-mono text-text-muted">Verified</span>
              </div>

              <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                Multi-Tier Engineering
              </h3>
              <p className="text-xs text-text-secondary mb-6 font-sans">
                Hands-on practical development experience across modern frontend frameworks and robust backend paradigms.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-bg-elevated/70 border border-border/70 rounded-xl p-3">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5 font-semibold">
                    Languages & Logic
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'Python', 'JavaScript', 'C++'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-bg-card text-text-primary text-[11px] border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-bg-elevated/70 border border-border/70 rounded-xl p-3">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5 font-semibold">
                    Full-Stack Frameworks & DBs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React.js', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'MySQL'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-bg-card text-accent text-[11px] border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/60">
              <a
                href="#skills"
                className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary hover:text-accent transition-colors"
              >
                <span>Explore all technical domains</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. Featured Project Callout: HospitalFlow (6 cols) */}
          <div 
            onClick={() => onOpenProject('hospitalflow')}
            className="md:col-span-6 bg-bg-card border border-border rounded-2xl p-7 flex flex-col justify-between bento-card cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-accent flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  HEALTHCARE TECH
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Featured Case Study
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-text-primary group-hover:text-accent transition-colors mb-2 flex items-center justify-between">
                <span>HospitalFlow</span>
                <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </h3>

              <p className="text-xs font-mono text-text-muted mb-3">
                Role: Frontend UI/UX Developer (Patient & Queue Interfaces)
              </p>

              <p className="text-sm text-text-secondary font-sans leading-relaxed mb-6">
                Smart hospital OPD coordination platform reducing patient wait uncertainty through dynamic digital tokens and live queue displays.
              </p>

              {/* Project Preview Image Thumbnail */}
              <div className="rounded-xl overflow-hidden border border-border bg-bg-elevated h-36 relative">
                <img
                  src="/assets/projects/hospitalflow-preview.png"
                  alt="HospitalFlow Platform"
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-text-primary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live Doctor Availability & Token Flow
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>FastAPI • PostgreSQL • React</span>
              <span className="text-accent underline underline-offset-4">View Case Study</span>
            </div>
          </div>

          {/* 4. Featured Project Callout: LibraryEase (6 cols) */}
          <div 
            onClick={() => onOpenProject('libraryease')}
            className="md:col-span-6 bg-bg-card border border-border rounded-2xl p-7 flex flex-col justify-between bento-card cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  AI & PUBLIC ACCESS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Full-Stack Architecture
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-text-primary group-hover:text-accent transition-colors mb-2 flex items-center justify-between">
                <span>LibraryEase</span>
                <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </h3>

              <p className="text-xs font-mono text-text-muted mb-3">
                Role: Full-Stack Developer & UI Architect
              </p>

              <p className="text-sm text-text-secondary font-sans leading-relaxed mb-6">
                Digitizing community libraries with Google Gemini conversational recommendations, multi-branch inventory, and vintage editorial aesthetics.
              </p>

              {/* Project Preview Image Thumbnail */}
              <div className="rounded-xl overflow-hidden border border-border bg-bg-elevated h-36 relative">
                <img
                  src="/assets/projects/libraryease-preview.png"
                  alt="LibraryEase Platform"
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-text-primary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Gemini AI Book Recommender
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>React • FastAPI • Gemini Pro</span>
              <span className="text-accent underline underline-offset-4">View Case Study</span>
            </div>
          </div>

          {/* 5. Currently Exploring (4 cols) */}
          <div className="md:col-span-4 bg-bg-card border border-border rounded-2xl p-6 flex flex-col justify-between bento-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-accent" />
                  LEARNING RADAR
                </span>
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              </div>

              <h4 className="font-heading font-semibold text-lg text-text-primary mb-2">
                Currently Exploring
              </h4>
              <p className="text-xs text-text-secondary mb-4 font-sans">
                Expanding knowledge frontiers in distributed backends and autonomous developer toolchains.
              </p>

              <ul className="space-y-2.5 font-mono text-xs text-text-secondary">
                <li className="flex items-center gap-2 bg-bg-elevated/50 p-2 rounded-lg border border-border/50">
                  <Cpu className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>LLM Agentic Pipelines</span>
                </li>
                <li className="flex items-center gap-2 bg-bg-elevated/50 p-2 rounded-lg border border-border/50">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Cloud Microservices on AWS</span>
                </li>
                <li className="flex items-center gap-2 bg-bg-elevated/50 p-2 rounded-lg border border-border/50">
                  <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Real-time WebSockets & Telemetry</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-text-muted">
              Updated November 2026
            </div>
          </div>

          {/* 6. Hackathons & Verified Milestones (4 cols) */}
          <div className="md:col-span-4 bg-bg-card border border-border rounded-2xl p-6 flex flex-col justify-between bento-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  ACHIEVEMENTS
                </span>
                <span className="text-[10px] font-mono text-text-muted">Verified</span>
              </div>

              <h4 className="font-heading font-semibold text-lg text-text-primary mb-2">
                Hackathons & Credentials
              </h4>
              <p className="text-xs text-text-secondary mb-4 font-sans">
                Tested problem-solving skills under national competition settings.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-bg-elevated/60 border border-border">
                  <span className="font-semibold text-text-primary block">
                    Smart India Hackathon (SIH) '25
                  </span>
                  <span className="text-[11px] text-text-muted">
                    National Participant • Govt of India
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-bg-elevated/60 border border-border">
                  <span className="font-semibold text-text-primary block">
                    AWS Solutions Architecture
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Forage Simulation Credential (Sept '25)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60">
              <a
                href="#hackathons"
                className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent-light"
              >
                <span>View timeline & certificates</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 7. Quick Connect & Availability (4 cols) */}
          <div className="md:col-span-4 bg-bg-card border border-border rounded-2xl p-6 flex flex-col justify-between bento-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AVAILABILITY
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              <h4 className="font-heading font-semibold text-lg text-text-primary mb-2">
                Open for Collaboration
              </h4>
              <p className="text-xs text-text-secondary mb-4 font-sans">
                Seeking Summer & Fall internship opportunities, full-stack projects, and engineering discussions.
              </p>

              <div className="bg-bg-elevated/80 border border-border p-3 rounded-xl mb-4">
                <span className="text-[11px] font-mono text-text-muted block mb-1">
                  Direct Inquiries:
                </span>
                <span className="text-xs font-mono text-text-primary break-all">
                  {PERSONAL_INFO.email}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2 px-3 rounded-xl bg-bg-elevated hover:bg-border text-xs font-mono text-text-primary border border-border flex items-center justify-center gap-1.5 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-text-muted" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#contact"
                className="py-2 px-4 rounded-xl bg-accent text-bg-main text-xs font-heading font-semibold flex items-center justify-center gap-1 hover:bg-accent-light transition-all"
              >
                <span>Write</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
