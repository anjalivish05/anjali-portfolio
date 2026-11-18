import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Terminal, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { Figma } from './Icons';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryIcons: Record<string, React.ReactNode> = {
    languages: <Code2 className="w-4 h-4" />,
    frontend: <Layout className="w-4 h-4" />,
    backend: <Server className="w-4 h-4" />,
    databases: <Database className="w-4 h-4" />,
    design: <Figma className="w-4 h-4" />,
    tools: <Terminal className="w-4 h-4" />,
  };

  const filteredCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Skills & Engineering Toolkit
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md mt-4 md:mt-0 font-sans">
            Categorized technical capabilities applied across verified full-stack applications and collaborative initiatives.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-accent text-bg-main font-semibold shadow-md'
                : 'bg-bg-card hover:bg-bg-elevated text-text-secondary border border-border'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Categories ({SKILL_CATEGORIES.length})</span>
          </button>

          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-accent text-bg-main font-semibold shadow-md'
                  : 'bg-bg-card hover:bg-bg-elevated text-text-secondary border border-border'
              }`}
            >
              {categoryIcons[cat.id]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-card border border-border rounded-2xl p-6 flex flex-col justify-between bento-card relative"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/70">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent">
                        {categoryIcons[category.id] || <Code2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-base text-text-primary">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted">
                      {category.skills.length} competencies
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary mb-5 font-sans">
                    {category.tagline}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-bg-elevated/50 hover:bg-bg-elevated border border-border/50 hover:border-border transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="font-mono text-xs font-medium text-text-primary group-hover:text-accent transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        {skill.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-card text-text-muted border border-border/60">
                            {skill.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Micro-note */}
                <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Applied in real projects
                  </span>
                  <span>Tested</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Verification Note (Explicitly avoiding fake percentages) */}
        <div className="mt-12 p-4 rounded-xl bg-bg-card/50 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Honest Technical Assessment: Skills backed by working repositories, schema designs, and system architectures.</span>
          </div>
          <span className="text-text-muted">Zero artificial percentage bars</span>
        </div>

      </div>
    </section>
  );
};
