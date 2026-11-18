import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsProps {
  onOpenProject: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => {
        if (filter === 'frontend') return p.category.includes('Frontend');
        if (filter === 'fullstack') return p.category.includes('Full-Stack');
        if (filter === 'ai') return p.category.includes('AI') || p.tags.includes('Gemini AI');
        return true;
      });

  return (
    <section id="projects" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Selected Works</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md mt-4 md:mt-0 font-sans">
            Real software systems with accurate role attribution, architectural breakdowns, and working source code repositories.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'fullstack', label: 'Full-Stack Systems' },
            { id: 'frontend', label: 'Frontend UI/UX' },
            { id: 'ai', label: 'AI & Smart Applications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                filter === tab.id
                  ? 'bg-accent text-bg-main font-semibold shadow-md'
                  : 'bg-bg-card hover:bg-bg-elevated text-text-secondary border border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-bg-card border border-border rounded-2xl overflow-hidden flex flex-col justify-between bento-card group relative"
              >
                <div>
                  {/* Screenshot Thumbnail Frame */}
                  <div className="relative w-full h-64 bg-bg-elevated overflow-hidden border-b border-border">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />
                    
                    {/* Category & Attribution Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-bg-card/90 border border-border text-accent backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-bg-card/90 border border-border text-text-primary backdrop-blur-md">
                        {project.role}
                      </span>
                    </div>

                    {/* Quick Case Study Overlay Trigger */}
                    <button
                      onClick={() => onOpenProject(project.id)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-bg-main/60 backdrop-blur-sm transition-opacity duration-300"
                    >
                      <span className="px-5 py-2.5 rounded-xl bg-accent text-bg-main font-heading font-semibold text-xs flex items-center gap-2 shadow-lg">
                        <span>Inspect Full Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-7">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-heading font-bold text-2xl text-text-primary group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-text-muted">0{idx + 1}</span>
                    </div>

                    <p className="font-editorial text-lg text-text-secondary mb-3 italic">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                      {project.shortDescription}
                    </p>

                    {/* Key Feature Callout Bullets */}
                    <div className="space-y-1.5 mb-6 text-xs font-mono text-text-muted border-l-2 border-border pl-3">
                      {project.keyFeatures.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-text-secondary">{feat.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-[11px] font-mono text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-7 py-4 border-t border-border/70 bg-bg-card flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-bg-elevated hover:bg-border text-text-secondary hover:text-text-primary border border-border transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-bg-elevated hover:bg-border text-text-secondary hover:text-text-primary border border-border transition-colors"
                        title="View Live Demo / Source"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenProject(project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:text-accent-light transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
