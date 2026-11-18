import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Palette, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { Figma } from './Icons';

interface SkillCardData {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  technologies: { name: string; isProminent?: boolean }[];
  countLabel: string;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'programming',
    number: '01',
    title: 'Programming',
    icon: <Code2 className="w-4 h-4 text-[#E6A995]" />,
    description: 'Programming languages used for problem-solving, application development and software engineering.',
    technologies: [
      { name: 'Java' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'JavaScript' }
    ],
    countLabel: '4 Languages'
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend Development',
    icon: <Layout className="w-4 h-4 text-[#E6A995]" />,
    description: 'Building responsive, accessible and interactive web experiences.',
    technologies: [
      { name: 'React.js' },
      { name: 'TypeScript' },
      { name: 'HTML5' },
      { name: 'CSS3' }
    ],
    countLabel: '4 Technologies'
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend Development',
    icon: <Server className="w-4 h-4 text-[#E6A995]" />,
    description: 'Developing backend services, APIs and application logic.',
    technologies: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'REST APIs' }
    ],
    countLabel: '5 Technologies'
  },
  {
    id: 'database',
    number: '04',
    title: 'Database',
    icon: <Database className="w-4 h-4 text-[#E6A995]" />,
    description: 'Working with relational databases, queries and structured data.',
    technologies: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'SQL' }
    ],
    countLabel: '3 Technologies'
  },
  {
    id: 'design',
    number: '05',
    title: 'UI/UX & Design',
    icon: <Figma className="w-4 h-4 text-[#E6A995]" />,
    description: 'Designing intuitive interfaces, creating wireframes and prototypes, and improving digital user experiences.',
    technologies: [
      { name: 'Figma', isProminent: true },
      { name: 'UI Design' },
      { name: 'UX Design' },
      { name: 'Wireframing' },
      { name: 'Prototyping' },
      { name: 'Responsive Design' }
    ],
    countLabel: '6 Disciplines'
  },
  {
    id: 'tools',
    number: '06',
    title: 'Developer Tools',
    icon: <Terminal className="w-4 h-4 text-[#E6A995]" />,
    description: 'Tools for development workflows, version control, API testing and team workflows.',
    technologies: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Postman' }
    ],
    countLabel: '4 Workflows'
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-28 sm:py-36 relative bg-[#160F19] border-t border-[#403044]/60">
      {/* Subtle ambient peach lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#E6A995]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.26em] font-sans font-medium text-[#E6A995] mb-3 block">
            TECHNICAL ARSENAL
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-normal tracking-tight mb-4">
            Technologies I Work With<span className="text-[#E6A995]">.</span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal">
            Tools, technologies and creative skills I use to build digital experiences.
          </p>
        </div>

        {/* 6-Card Grid Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SKILL_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group p-7 sm:p-8 rounded-2xl bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-10px_rgba(10,6,12,0.85)] flex flex-col justify-between"
            >
              <div>
                {/* Card Top Row: Icon Container + Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/40 flex items-center justify-center transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-xs font-mono text-[#8E7D8A]">
                    {card.number}
                  </span>
                </div>

                {/* Card Heading */}
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors font-normal mb-2.5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] font-sans text-[#B3A2AE] leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-2">
                  {card.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 flex items-center gap-1.5 ${
                        tech.isProminent
                          ? 'bg-[#E6A995]/15 border border-[#E6A995]/50 text-[#E6A995] font-medium shadow-sm hover:bg-[#E6A995]/25 hover:border-[#E6A995]'
                          : 'bg-[#211725] border border-[#403044] text-[#F7EFF4] hover:border-[#E6A995]/50 hover:text-[#E6A995]'
                      }`}
                    >
                      {tech.isProminent && <Figma className="w-3.5 h-3.5 text-[#E6A995]" />}
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Divider */}
              <div className="mt-8 pt-4 border-t border-[#403044]/60 flex items-center justify-between text-[11px] font-mono text-[#8E7D8A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995]" />
                  <span>Production Ready</span>
                </span>
                <span>{card.countLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
