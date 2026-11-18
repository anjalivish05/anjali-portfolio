import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Code2, Sparkles, BookOpen, Compass, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Biography & Background</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-text-primary tracking-tight">
            About Me
          </h2>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Professional Photograph & Credential Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Image Frame with Editorial Border and Offset Backdrop */}
              <div className="relative rounded-2xl overflow-hidden bg-bg-card border border-border shadow-2xl aspect-[4/5]">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent opacity-80" />
                
                {/* Overlay Caption */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-bg-card/90 border border-border backdrop-blur-md">
                  <span className="font-heading font-semibold text-sm text-text-primary block">
                    {PERSONAL_INFO.fullName}
                  </span>
                  <div className="flex items-center justify-between text-xs font-mono text-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      Mumbai, Maharashtra
                    </span>
                    <span className="text-accent">B.Tech IT '28</span>
                  </div>
                </div>
              </div>

              {/* Offset Accent Outline Box */}
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border border-accent/20 -z-10 hidden sm:block pointer-events-none" />
            </div>

            {/* Quick Education Card */}
            <div className="mt-8 bg-bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Roadmap</span>
              </div>

              {PERSONAL_INFO.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-border pl-3 space-y-1">
                  <span className="text-xs font-mono text-text-muted block">{edu.period}</span>
                  <h4 className="font-heading font-semibold text-sm text-text-primary">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-[11px] font-mono text-text-muted">
                    {edu.highlights}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Narrative & Engineering Focus */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              
              <blockquote className="font-editorial text-3xl sm:text-4xl text-text-primary leading-tight">
                "Bridging rigorous backend systems with clear, human-first digital experiences."
              </blockquote>

              <p className="text-base text-text-secondary leading-relaxed font-sans">
                I am an Information Technology undergraduate student at <strong className="text-text-primary font-medium">Shree L. R. Tiwari College of Engineering, Mumbai</strong>. My journey in software engineering began with a curiosity about how software solves everyday bottlenecks—from chaotic hospital OPD waiting rooms to outdated municipal libraries.
              </p>

              <p className="text-base text-text-secondary leading-relaxed font-sans">
                Rather than treating frontend and backend as isolated silos, I approach web applications holistically. I focus on developing clean RESTful APIs using <strong className="text-text-primary font-medium">Java Spring Boot</strong> and <strong className="text-text-primary font-medium">Python FastAPI</strong>, organizing structured relational schemas with <strong className="text-text-primary font-medium">PostgreSQL</strong> and <strong className="text-text-primary font-medium">MySQL</strong>, and pairing them with high-fidelity, accessible interfaces using <strong className="text-text-primary font-medium">React.js</strong> and <strong className="text-text-primary font-medium">Tailwind CSS</strong>.
              </p>

              <p className="text-base text-text-secondary leading-relaxed font-sans">
                I am especially enthusiastic about integrating <strong className="text-accent font-medium">Generative AI and LLMs</strong> into real-world applications—not as cosmetic gimmicks, but as functional assistants that interpret unstructured user requests and produce structured, actionable recommendations.
              </p>

              {/* Three Core Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                
                <div className="bg-bg-card border border-border rounded-xl p-4">
                  <Code2 className="w-5 h-5 text-accent mb-2" />
                  <h4 className="font-heading font-semibold text-sm text-text-primary mb-1">
                    System Clarity
                  </h4>
                  <p className="text-xs text-text-secondary font-sans">
                    Modular codebases, explicit contracts, and predictable data flow.
                  </p>
                </div>

                <div className="bg-bg-card border border-border rounded-xl p-4">
                  <Sparkles className="w-5 h-5 text-emerald-400 mb-2" />
                  <h4 className="font-heading font-semibold text-sm text-text-primary mb-1">
                    Human Usability
                  </h4>
                  <p className="text-xs text-text-secondary font-sans">
                    Clear typography, meaningful feedback, and zero cognitive overload.
                  </p>
                </div>

                <div className="bg-bg-card border border-border rounded-xl p-4">
                  <Compass className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="font-heading font-semibold text-sm text-text-primary mb-1">
                    Civic Impact
                  </h4>
                  <p className="text-xs text-text-secondary font-sans">
                    Tools that genuinely simplify healthcare, transport, and community access.
                  </p>
                </div>

              </div>

              {/* Download Resume Strip */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-text-muted">
                  Looking for full-stack developer internships & collaborative engineering opportunities.
                </div>

                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="Anjali_Vishwakarma_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-elevated hover:bg-bg-card border border-border text-xs font-mono text-accent hover:border-accent transition-all"
                >
                  <span>Download Curriculum Vitae (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
