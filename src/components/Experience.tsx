import React from 'react';
import { 
  Layout, 
  Coffee 
} from 'lucide-react';
import { LetterRevealHeading, useScrollReveal, use3DTilt } from '../lib/motion';

interface ExperienceItem {
  id: string;
  number: string;
  role: string;
  project: string;
  type: string;
  description: string;
  contributions: string[];
  tags: string[];
  icon: React.ReactNode;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'hospitalflow',
    number: '01',
    role: 'Frontend Developer',
    project: 'HospitalFlow',
    type: 'Project Experience',
    description:
      'Worked on the frontend development and UI/UX of a smart hospital OPD coordination platform.',
    contributions: [
      'Developed responsive frontend interfaces for patient and hospital workflows.',
      'Worked on digital token and dynamic queue interfaces.',
      'Improved UI consistency, accessibility and user experience.',
      'Implemented frontend form validation and loading states.',
      'Focused on connecting patient-facing interfaces with existing backend APIs.',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'UI/UX Design', 'Queue Interface'],
    icon: <Layout className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: 'manzil',
    number: '02',
    role: 'Full-Stack Developer',
    project: 'Manzil – AI Cafe Finder',
    type: 'Personal Project',
    description:
      'Developed an AI-powered cafe discovery platform designed to help users find cafes based on their preferences and budget.',
    contributions: [
      'Designed and developed the frontend user experience.',
      'Worked on backend development using Python and FastAPI.',
      'Implemented REST API integration.',
      'Worked on budget-based cafe discovery and search functionality.',
      'Explored Google Maps integration for location-based cafe discovery.',
      'Worked on frontend and backend integration.',
    ],
    tags: ['Python', 'FastAPI', 'React', 'REST APIs', 'Google Maps API', 'Full-Stack Integration'],
    icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
];

interface TimelineRowProps {
  item: ExperienceItem;
  index: number;
  isEven: boolean;
  prefersReducedMotion: boolean;
}

const TimelineRow: React.FC<TimelineRowProps> = ({ item, isEven, prefersReducedMotion }) => {
  const { ref: rowRef, isRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: '-30px 0px -30px 0px',
    once: false,
  });

  const { ref: tiltRef, tiltProps, isHovered } = use3DTilt<HTMLDivElement>({
    maxTilt: 4.5,
    elevation: -6,
    perspective: 1000,
  });

  // Reveal transition style for the card
  const cardStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed
          ? 'translateY(0) scale(1)'
          : 'translateY(24px) scale(0.98)',
        transition: 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isRevealed ? 'auto' : 'transform, opacity',
      };

  return (
    <div
      ref={rowRef}
      className={`relative flex flex-col md:flex-row items-center w-full group ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* 1. Center / Left Timeline Node */}
      <div 
        className="absolute left-5 sm:left-6 md:left-1/2 top-6 md:top-10 -translate-x-1/2 z-20 shrink-0 select-none"
      >
        <div
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#211725] border-2 flex items-center justify-center transition-all duration-500 ${
            isRevealed
              ? 'border-[#E6A995] text-[#E6A995] shadow-[0_0_22px_rgba(230,169,149,0.45)] scale-110'
              : 'border-[#403044] text-[#8E7D8A]'
          }`}
        >
          {item.icon}
        </div>
        {/* Animated ambient pulse ring when illuminated */}
        {isRevealed && !prefersReducedMotion && (
          <span className="absolute inset-0 rounded-full border border-[#E6A995]/40 animate-ping pointer-events-none" />
        )}
      </div>

      {/* 2. Horizontal Connector Line (Desktop Only) */}
      <div
        className={`hidden md:block absolute top-10 md:top-15.5 h-[1.5px] z-10 transition-all duration-700 pointer-events-none ${
          isEven
            ? 'right-[calc(50%+1.25rem)] w-7 bg-gradient-to-l'
            : 'left-[calc(50%+1.25rem)] w-7 bg-gradient-to-r'
        } ${
          isRevealed
            ? 'from-[#E6A995] to-transparent opacity-100'
            : 'from-[#403044] to-transparent opacity-30'
        }`}
      />

      {/* 3. Experience Card Container */}
      <div
        className={`w-full md:w-[calc(50%-2.5rem)] pl-11 sm:pl-16 md:pl-0 ${
          isEven ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div style={cardStyle}>
          {/* Card element with 3D tilt props */}
          <div
            ref={tiltRef}
            {...tiltProps}
            className={`p-4 min-[380px]:p-6 sm:p-8 rounded-2xl bg-[#2B1E30]/80 border transition-all duration-300 relative backdrop-blur-md shadow-xl ${
              isHovered
                ? 'border-[#E6A995]/60 shadow-[0_12px_36px_-8px_rgba(230,169,149,0.22)]'
                : 'border-[#403044] hover:border-[#E6A995]/40 shadow-[0_4px_20px_-6px_rgba(10,6,12,0.6)]'
            }`}
          >
            {/* Top Row: Experience Number & Type Badge */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E6A995] font-semibold">
                  EXPERIENCE {item.number}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-mono font-medium uppercase tracking-wider bg-[#211725] border border-[#403044] text-[#E6A995]">
                {item.type}
              </span>
            </div>

            {/* Role Title & Project Name */}
            <div className="mb-3.5">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFF4] font-bold tracking-tight mb-1 group-hover:text-[#E6A995] transition-colors leading-snug">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium">
                <span className="text-[#8E7D8A]">Project:</span>
                <span className="text-[#E6A995] font-semibold">{item.project}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#B3A2AE] leading-relaxed mb-5 font-normal">
              {item.description}
            </p>

            {/* Key Contributions Section */}
            <div className="pt-4.5 border-t border-[#403044]/70 mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E7D8A] block mb-3 font-semibold">
                Key Contributions
              </span>
              <ul className="space-y-2.5">
                {item.contributions.map((contribution, cIdx) => (
                  <li 
                    key={cIdx} 
                    className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans text-[#B3A2AE] leading-relaxed"
                  >
                    <span className="text-[#E6A995] text-xs shrink-0 mt-0.5 select-none leading-none">✦</span>
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology / Focus Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:border-[#E6A995]/50 hover:text-[#F7EFF4] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const { ref: sectionRef, isRevealed, prefersReducedMotion } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: '-40px 0px -40px 0px',
    once: true,
  });

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28 z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Section Header */}
        <div 
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="mb-16 sm:mb-24 text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] uppercase tracking-[0.26em] font-mono font-medium text-[#E6A995] mb-3 block">
            EXPERIENCE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-bold tracking-tight mb-4">
            <LetterRevealHeading
              text="Where I've Applied My Skills"
              isRevealed={isRevealed}
              accentChar=""
              prefersReducedMotion={prefersReducedMotion}
            />
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal max-w-xl mx-auto leading-relaxed">
            "Turning ideas into functional digital experiences through hands-on development."
          </p>
        </div>

        {/* 2. Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Continuous Vertical Timeline Line on Mobile (Left) and Desktop (Center) */}
          <div 
            className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#403044]/40 pointer-events-none z-0"
          >
            {/* Animated Progressive Fill Line */}
            <div
              style={{
                transform: isRevealed || prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: prefersReducedMotion ? 'none' : 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
              className="w-full h-full bg-gradient-to-b from-[#E6A995] via-[#E6A995]/70 to-[#403044]/20"
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24 relative z-10">
            {EXPERIENCES.map((item, idx) => (
              <TimelineRow
                key={item.id}
                item={item}
                index={idx}
                isEven={idx % 2 === 0}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
