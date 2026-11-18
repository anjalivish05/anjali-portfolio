import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, FileText, CheckCircle2, ExternalLink, ShieldCheck, Flag } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section id="hackathons" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Competitions & Credentials</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Hackathons & Achievements
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md mt-4 md:mt-0 font-sans">
            Verified competitive milestones, national innovation hackathons, and certified cloud architecture simulations.
          </p>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-border/60 before:hidden md:before:block">
          {ACHIEVEMENTS.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-card border-2 border-accent flex items-center justify-center text-accent z-10 hidden md:flex shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                  <Award className="w-4 h-4" />
                </div>

                {/* Content Card (takes 1/2 of row on desktop) */}
                <div className="w-full md:w-1/2">
                  <div className="bg-bg-card border border-border rounded-2xl p-7 bento-card relative">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-bg-elevated border border-border text-accent">
                        {item.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-text-primary mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs font-mono text-emerald-400 mb-4 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                      <span className="text-border">•</span>
                      <span className="text-text-secondary">{item.badge}</span>
                    </p>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5 font-sans">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 mb-6 text-xs text-text-secondary font-sans border-l-2 border-border pl-3">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Certificate Action if available */}
                    {item.certificateUrl && (
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-mono text-text-muted">
                          Official Certificate Available
                        </span>
                        <a
                          href={item.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated hover:bg-border border border-border text-xs font-mono text-accent hover:border-accent transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Inspect Credential PDF</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      </div>
                    )}

                  </div>
                </div>

                {/* Empty side for balanced spacing */}
                <div className="hidden md:block w-1/2" />

              </motion.div>
            );
          })}
        </div>

        {/* Verification Guarantee Banner */}
        <div className="mt-16 p-5 rounded-2xl bg-bg-card/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-text-secondary">
              Strict Veracity: All hackathon participations and certifications are backed by institutional documentation and verifiable records.
            </span>
          </div>
          <span className="text-accent">No fabricated awards or rankings</span>
        </div>

      </div>
    </section>
  );
};
