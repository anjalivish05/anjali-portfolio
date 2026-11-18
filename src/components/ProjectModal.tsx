import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Cpu, 
  UserCheck, 
  Image as ImageIcon
} from 'lucide-react';
import { Github } from './Icons';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg-main/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-border bg-bg-card/90 backdrop-blur flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-bg-elevated border border-border text-accent">
                {project.category}
              </span>
              <span className="text-xs font-mono text-text-muted hidden sm:inline">
                Case Study Specification
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated hover:bg-border text-text-secondary hover:text-text-primary border border-border transition-colors text-xs font-mono flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Source Code</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-bg-elevated hover:bg-border text-text-secondary hover:text-text-primary border border-border transition-colors"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
            
            {/* Title & Tagline Banner */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono text-accent">
                <span>Role: {project.role}</span>
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-2">
                {project.title}
              </h1>
              <p className="font-editorial text-xl sm:text-2xl text-text-secondary mb-4">
                {project.tagline}
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
                {project.overview}
              </p>
            </div>

            {/* Primary Image / Diagram Showcase */}
            <div className="rounded-xl overflow-hidden border border-border bg-bg-elevated">
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                className="w-full h-auto max-h-[420px] object-cover object-top"
              />
            </div>

            {/* Additional Project Diagrams & Screenshots if available */}
            {project.caseStudyImages && project.caseStudyImages.length > 1 && (
              <div>
                <h3 className="font-heading font-semibold text-base text-text-primary mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-accent" />
                  <span>Architecture & System Flow Diagrams</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.caseStudyImages.slice(1).map((imgSrc, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-border bg-bg-elevated p-2">
                      <img
                        src={imgSrc}
                        alt={`${project.title} Diagram ${i + 1}`}
                        className="w-full h-auto rounded-lg object-contain max-h-56"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-bg-elevated/40 border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Problem Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>

              <div className="bg-bg-elevated/40 border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Proposed Engineering Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                <span>Key Platform Capabilities</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-bg-elevated/40 border border-border/80 space-y-1.5"
                  >
                    <h4 className="font-mono text-xs font-semibold text-text-primary">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Contribution (Crucial for honest attribution) */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-3 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-accent" />
                <span>Specific Engineering Contributions</span>
              </h3>
              <p className="text-xs font-mono text-accent mb-4">
                Transparent delineation of technical responsibility:
              </p>
              <ul className="space-y-2 text-xs text-text-secondary font-sans">
                {project.myContribution.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Architecture Breakdown */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" />
                <span>System Architecture Stack</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-bg-elevated/50 border border-border">
                  <span className="text-text-muted block text-[10px] uppercase">Frontend Layer</span>
                  <span className="text-text-primary">{project.architecture.frontend}</span>
                </div>
                <div className="p-3 rounded-lg bg-bg-elevated/50 border border-border">
                  <span className="text-text-muted block text-[10px] uppercase">Backend & API Layer</span>
                  <span className="text-text-primary">{project.architecture.backend}</span>
                </div>
                <div className="p-3 rounded-lg bg-bg-elevated/50 border border-border">
                  <span className="text-text-muted block text-[10px] uppercase">Database & Persistence</span>
                  <span className="text-text-primary">{project.architecture.database}</span>
                </div>
                <div className="p-3 rounded-lg bg-bg-elevated/50 border border-border">
                  <span className="text-text-muted block text-[10px] uppercase">APIs & Intelligence</span>
                  <span className="text-text-primary">{project.architecture.apisAndAi}</span>
                </div>
              </div>
            </div>

            {/* Development Challenges & Overcoming Them */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Engineering Challenges & Resolutions
              </h3>
              <div className="space-y-4">
                {project.developmentChallenges.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-bg-elevated/40 border border-border space-y-2">
                    <div className="text-xs font-mono text-rose-300 font-semibold">
                      Challenge: {item.challenge}
                    </div>
                    <div className="text-xs text-text-secondary leading-relaxed font-sans pl-2 border-l border-emerald-400/40">
                      <strong className="text-emerald-400 font-mono font-medium block mb-0.5">Solution:</strong>
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results and Learnings */}
            <div className="border-t border-border/80 pt-6">
              <h3 className="font-heading font-semibold text-base text-text-primary mb-3">
                Key Results & Retrospective
              </h3>
              <ul className="space-y-2 text-xs text-text-secondary font-sans">
                {project.resultsAndLearnings.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-border bg-bg-card/90 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
            <div className="text-xs font-mono text-text-muted">
              Project Identifier: #{project.id}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-accent text-bg-main font-heading font-semibold text-xs flex items-center gap-1.5 hover:bg-accent-light transition-all"
              >
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-bg-elevated hover:bg-border text-text-primary font-mono text-xs border border-border transition-colors"
              >
                Close
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
