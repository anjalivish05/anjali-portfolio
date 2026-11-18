import React, { useEffect, useRef, useState } from 'react';
import { 
  Trophy, 
  Award, 
  Code2, 
  ArrowUpRight, 
  FileText,
  ExternalLink 
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

interface TimelineItem {
  id: string;
  category: string;
  dateOrStatus: string;
  title: string;
  organization: string;
  description: string;
  project?: string;
  icon: React.ReactNode;
  certificateUrl?: string;
  certificateLabel?: string;
  showcaseUrl?: string;
}

export const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const currentEl = sectionRef.current;
    if (!currentEl) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const timelineItems: TimelineItem[] = [
    {
      id: 'sih-2025',
      category: 'HACKATHON',
      dateOrStatus: '2025',
      title: 'Smart India Hackathon (SIH) 2025',
      organization: 'Ministry of Education & AICTE, Government of India',
      description:
        "Selected as participant in India's premier national innovation competition, partnering with a multidisciplinary engineering team on real-world civic technology challenges.",
      icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6A995]" />,
    },
    {
      id: 'aws-forage',
      category: 'CERTIFICATION',
      dateOrStatus: 'September 2025',
      title: 'AWS Solutions Architecture Job Simulation',
      organization: 'Amazon Web Services & Forage',
      description:
        'Completed practical simulation tasks designing highly available, cost-effective, and secure cloud infrastructure patterns on AWS.',
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6A995]" />,
      certificateUrl: '/assets/aws-forage-certificate.pdf',
      certificateLabel: 'View Certificate (PDF)',
    },
    {
      id: 'ethglobal-mumbai',
      category: 'HACKATHON PARTICIPATION',
      dateOrStatus: 'November 5–7, 2026',
      title: 'ETHGlobal Mumbai',
      organization: 'ETHGlobal',
      description:
        'Participated in ETHGlobal Mumbai, an official ETHGlobal event featuring coding, workshops, keynotes and technical talks. Submitted the project Stealth Pay as part of the event.',
      project: 'Stealth Pay',
      icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6A995]" />,
      certificateUrl: '/assets/ethglobal-mumbai-certificate.jpg',
      certificateLabel: 'View Participation Certificate',
      showcaseUrl: 'https://ethglobal.com/showcase/stealth-pay-xtdtj',
    },
  ];

  const getRevealStyle = (delayMs: number, yOffset: number = 20): React.CSSProperties => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0)' : `translateY(${yOffset}px)`,
      transition: `opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      willChange: isRevealed ? 'auto' : 'transform, opacity',
    };
  };

  return (
    <section 
      id="hackathons" 
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-[#160F19] border-t border-[#403044]/60 overflow-hidden"
    >
      {/* Subtle ambient peach lighting */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#E6A995]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#E6A995]/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Section Header */}
        <div 
          style={getRevealStyle(0, 20)}
          className="mb-16 sm:mb-24 text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-mono font-medium text-[#E6A995] mb-3 block">
            CREDENTIALS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-normal tracking-tight mb-4">
            Beyond the <span className="text-[#E6A995]">Code</span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal max-w-xl mx-auto">
            Verified hackathon participation, competitions, and technical credentials.
          </p>
        </div>

        {/* 2. Achievement Timeline Container */}
        <div className="relative">
          
          {/* Continuous Vertical Timeline Line on Left */}
          <div 
            style={{
              opacity: isRevealed || prefersReducedMotion ? 1 : 0,
              transform: isRevealed || prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: prefersReducedMotion ? 'none' : 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity 800ms ease 150ms',
            }}
            className="absolute left-[23px] sm:left-[27px] md:left-[31px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#E6A995]/80 via-[#403044] to-[#403044]/30 pointer-events-none z-0" 
          />

          {/* Timeline Entries */}
          <div className="space-y-12 sm:space-y-16">
            {timelineItems.map((item, idx) => {
              const delay = 200 + idx * 220;

              return (
                <div 
                  key={item.id}
                  style={getRevealStyle(delay, 24)}
                  className="relative flex items-start group"
                >
                  {/* Circular Peach-Outlined Icon on the Timeline */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#211725] border-2 border-[#E6A995] flex items-center justify-center shadow-[0_0_20px_-4px_rgba(230,169,149,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_-2px_rgba(230,169,149,0.55)] group-hover:border-[#F7EFF4]">
                      {item.icon}
                    </div>
                  </div>

                  {/* Main Content Area beside Timeline Icon */}
                  <div className="ml-5 sm:ml-8 md:ml-10 flex-1 pt-1 sm:pt-2">
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#211725]/80 border border-[#403044] hover:border-[#E6A995]/50 transition-all duration-300 shadow-xl group-hover:shadow-[0_8px_30px_-8px_rgba(230,169,149,0.15)] group-hover:-translate-y-0.5">
                      
                      {/* Two-Column Content Grid on Desktop */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        
                        {/* Left Column: Category, Date, Title, Organization & Project */}
                        <div className="lg:col-span-6 flex flex-col justify-start">
                          {/* Category Badge & Date/Status */}
                          <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                            <span className="px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#160F19] border border-[#403044] text-[#E6A995]">
                              {item.category}
                            </span>
                            <span className="text-xs sm:text-sm font-mono text-[#8E7D8A]">
                              {item.dateOrStatus}
                            </span>
                          </div>

                          {/* Achievement Title */}
                          <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFF4] font-normal tracking-tight mb-2 leading-snug group-hover:text-[#E6A995] transition-colors">
                            {item.title}
                          </h3>

                          {/* Organization Name */}
                          <p className="text-xs sm:text-sm font-sans text-[#E6A995] font-medium mb-2">
                            {item.organization}
                          </p>

                          {/* Associated Project (if applicable) */}
                          {item.project && (
                            <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#160F19] border border-[#403044] text-xs font-mono text-[#F7EFF4] w-fit">
                              <span className="text-[#E6A995]">Project:</span>
                              <span className="font-medium">{item.project}</span>
                            </div>
                          )}
                        </div>

                        {/* Right Column: Description & Action Buttons */}
                        <div className="lg:col-span-6 flex flex-col justify-between">
                          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] leading-relaxed font-normal">
                            {item.description}
                          </p>

                          {/* Action Buttons Row */}
                          {(item.certificateUrl || item.showcaseUrl) && (
                            <div className="mt-5 pt-4 border-t border-[#403044]/60 flex flex-wrap items-center gap-3">
                              {/* Certificate Action */}
                              {item.certificateUrl && (
                                <a
                                  href={item.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E6A995] text-[#160F19] hover:bg-[#D9907B] text-xs sm:text-sm font-sans font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] group/btn"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{item.certificateLabel || 'View Certificate'}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                </a>
                              )}

                              {/* Showcase Action */}
                              {item.showcaseUrl && (
                                <a
                                  href={item.showcaseUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#403044] hover:border-[#E6A995] bg-[#160F19] hover:bg-[#2B1E30] text-[#F7EFF4] hover:text-[#E6A995] text-xs sm:text-sm font-sans font-medium transition-all duration-200 shadow-sm hover:scale-[1.02] group/btn"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-[#E6A995]" />
                                  <span>View Project Showcase</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
