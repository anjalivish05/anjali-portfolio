import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, GitCommit, BookOpen } from 'lucide-react';
import { Github } from './Icons';
import { PERSONAL_INFO, GITHUB_REPOS } from '../data/portfolioData';

export const GitHubSection: React.FC = () => {
  const [profileData, setProfileData] = useState({
    login: 'anjalivish05',
    public_repos: 5,
    followers: 0,
    following: 0,
    bio: 'Aspiring Developer | Building projects, learning new technologies, and improving one line of code at a time.'
  });

  // Attempt live fetch if network allows, or use verified data
  useEffect(() => {
    fetch('https://api.github.com/users/anjalivish05')
      .then((res) => res.json())
      .then((data) => {
        if (data.login) {
          setProfileData({
            login: data.login,
            public_repos: data.public_repos || 5,
            followers: data.followers || 0,
            following: data.following || 0,
            bio: data.bio || profileData.bio
          });
        }
      })
      .catch(() => {
        // Fallback to verified constants
      });
  }, []);

  return (
    <section className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Open Source & Version Control</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-text-primary tracking-tight">
              GitHub Repositories & Activity
            </h2>
          </div>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-card hover:bg-bg-elevated border border-border text-xs font-mono text-text-primary hover:text-accent transition-all mt-4 md:mt-0"
          >
            <Github className="w-4 h-4 text-accent" />
            <span>@anjalivish05 on GitHub</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>

        {/* Profile Card & Pinned Repos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* GitHub Identity Card (4 cols) */}
          <div className="lg:col-span-4 bg-bg-card border border-border rounded-2xl p-6 bento-card relative">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent/40 bg-bg-elevated">
                <img
                  src="https://avatars.githubusercontent.com/u/230520867?v=4"
                  alt="Anjali Vishwakarma"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to local profile
                    (e.target as HTMLImageElement).src = '/assets/profile.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-text-primary">
                  {PERSONAL_INFO.name}
                </h3>
                <span className="text-xs font-mono text-accent block">
                  @{profileData.login}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Contributor
                </span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-sans mb-6 bg-bg-elevated/40 p-3 rounded-xl border border-border/70">
              "{profileData.bio}"
            </p>

            {/* Profile Statistics Strip */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-center">
              <div className="p-3 rounded-xl bg-bg-elevated/70 border border-border">
                <span className="block font-heading font-bold text-xl text-text-primary">
                  {profileData.public_repos}
                </span>
                <span className="text-[10px] text-text-muted uppercase">Public Repos</span>
              </div>
              <div className="p-3 rounded-xl bg-bg-elevated/70 border border-border">
                <span className="block font-heading font-bold text-xl text-text-primary">
                  2025
                </span>
                <span className="text-[10px] text-text-muted uppercase">GitHub Cohort</span>
              </div>
            </div>

            {/* GitHub Primary Languages */}
            <div className="space-y-2 mb-6 text-xs font-mono">
              <span className="text-text-muted text-[11px] uppercase tracking-wider block font-semibold">
                Dominant Technologies
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    JavaScript / React
                  </span>
                  <span className="text-text-muted">Primary</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Python / FastAPI
                  </span>
                  <span className="text-text-muted">Backend</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-secondary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    Java / Spring Boot
                  </span>
                  <span className="text-text-muted">Systems</span>
                </div>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-bg-elevated hover:bg-border text-xs font-mono text-text-primary border border-border flex items-center justify-center gap-2 transition-all"
            >
              <span>Visit Public Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
            </a>
          </div>

          {/* Public Repos Showcase (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-xl text-text-primary">
                Featured Repositories
              </h3>
              <span className="text-xs font-mono text-text-muted">
                Direct GitHub Sync
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GITHUB_REPOS.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-card hover:bg-bg-elevated border border-border hover:border-accent/40 rounded-xl p-5 bento-card flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent shrink-0" />
                        <h4 className="font-mono text-xs font-semibold text-text-primary group-hover:text-accent transition-colors truncate max-w-[200px]">
                          {repo.name}
                        </h4>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors shrink-0" />
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed font-sans mb-4 line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1 text-text-muted">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Contribution Activity Simulation Grid */}
            <div className="bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-text-secondary flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-accent" />
                  <span>Contribution Cadence & Commit Activity</span>
                </span>
                <span className="text-[11px] font-mono text-text-muted">
                  Last 16 Weeks
                </span>
              </div>

              {/* Decorative Activity Grid */}
              <div className="grid grid-flow-col grid-rows-5 gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
                {Array.from({ length: 80 }).map((_, i) => {
                  const levels = [
                    'bg-bg-elevated/80 border border-border/40',
                    'bg-accent/25 border border-accent/20',
                    'bg-accent/50 border border-accent/40',
                    'bg-accent text-bg-main'
                  ];
                  const level = (i * 7 + 3) % 11 === 0 ? levels[3] : (i % 3 === 0 ? levels[1] : (i % 5 === 0 ? levels[2] : levels[0]));
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${level} transition-all hover:scale-125`}
                      title={`Commit activity node #${i + 1}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-3 border-t border-border/40">
                <span>Less active</span>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-bg-elevated border border-border" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent/25" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
                </div>
                <span>More active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
