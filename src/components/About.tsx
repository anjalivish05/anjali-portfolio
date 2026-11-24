import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Code2, Palette } from 'lucide-react';

export const About: React.FC = () => {
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
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const getRevealStyle = (delayMs: number, yOffset: number = 18): React.CSSProperties => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0)' : `translateY(${yOffset}px)`,
      transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
      willChange: isRevealed ? 'auto' : 'transform, opacity',
    };
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden select-none scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Layout on Desktop (~42% Left, ~58% Right with subtle vertical divider)
            On Mobile & Tablet (<1024px), stacks vertically with About Me first, then subtle divider, then Information */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* RIGHT COLUMN (About Me): Mobile order-1, Desktop order-2 (col-span-7 = ~58%) */}
          <div 
            style={getRevealStyle(100, 20)}
            className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center lg:border-l lg:border-[#403044]/60 lg:pl-10 xl:pl-14 w-full"
          >
            {/* Small Uppercase Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#E6A995] font-semibold">
                ABOUT ME
              </span>
            </div>

            {/* Main Heading with Subtle Soft-Peach Name Accent */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-[#F7EFF4] font-bold tracking-tight mb-5 sm:mb-6 leading-tight">
              I'm <span className="text-[#E6A995]">Anjali Manoj Vishwakarma</span>
            </h2>

            {/* Main Description */}
            <p className="text-base sm:text-lg text-[#F7EFF4]/95 font-serif leading-relaxed mb-4 sm:mb-5 font-normal tracking-wide">
              I'm a Full-Stack Developer and UI/UX Designer focused on building practical, user-centric digital solutions. I work across frontend development, backend technologies, and interface design to create web applications that are functional, scalable, and visually intuitive.
            </p>

            {/* Supporting Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-sans text-[#B3A2AE] leading-relaxed font-normal">
              My approach combines technical problem-solving with thoughtful design, with an emphasis on clean implementation, usability, and continuous improvement.
            </p>
          </div>

          {/* Subtle Horizontal Divider for Mobile / Tablet between columns */}
          <div className="order-2 lg:hidden h-[1px] bg-[#403044]/50 w-full" />

          {/* LEFT COLUMN (Professional Information): Mobile order-3, Desktop order-1 (col-span-5 = ~42%) */}
          <div 
            style={getRevealStyle(200, 20)}
            className="order-3 lg:order-1 lg:col-span-5 flex flex-col justify-center w-full space-y-6 sm:space-y-7"
          >
            
            {/* 1. EDUCATION */}
            <div className="flex items-start gap-3.5 sm:gap-4 group">
              {/* Subtle square container with rounded corners and thin border */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/50 flex items-center justify-center text-[#E6A995] shrink-0 transition-colors shadow-sm mt-0.5">
                <GraduationCap className="w-5 h-5 text-[#E6A995] transition-transform group-hover:scale-105" />
              </div>
              
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[10.5px] sm:text-[11px] font-mono text-[#E6A995] uppercase tracking-[0.2em] block font-semibold">
                  EDUCATION
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#F7EFF4] font-semibold tracking-tight leading-snug">
                  B.E. Information Technology
                </h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-sans text-[#B3A2AE]">
                  <span>2024 – 2028</span>
                  <span className="text-[#403044] select-none">•</span>
                  <span className="text-[#8E7D8A]">Shree L. R. Tiwari College of Engineering</span>
                </div>
              </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="h-[1px] bg-[#403044]/50 w-full" />

            {/* 2. ROLE */}
            <div className="flex items-start gap-3.5 sm:gap-4 group">
              {/* Subtle square container with rounded corners and thin border */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/50 flex items-center justify-center text-[#E6A995] shrink-0 transition-colors shadow-sm mt-0.5">
                <Code2 className="w-5 h-5 text-[#E6A995] transition-transform group-hover:scale-105" />
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[10.5px] sm:text-[11px] font-mono text-[#E6A995] uppercase tracking-[0.2em] block font-semibold">
                  ROLE
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#F7EFF4] font-semibold tracking-tight leading-snug">
                  Full-Stack Developer
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#B3A2AE] leading-relaxed">
                  Building scalable web solutions
                </p>
              </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="h-[1px] bg-[#403044]/50 w-full" />

            {/* 3. FOCUS */}
            <div className="flex items-start gap-3.5 sm:gap-4 group">
              {/* Subtle square container with rounded corners and thin border */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/50 flex items-center justify-center text-[#E6A995] shrink-0 transition-colors shadow-sm mt-0.5">
                <Palette className="w-5 h-5 text-[#E6A995] transition-transform group-hover:scale-105" />
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[10.5px] sm:text-[11px] font-mono text-[#E6A995] uppercase tracking-[0.2em] block font-semibold">
                  FOCUS
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#F7EFF4] font-semibold tracking-tight leading-snug">
                  UI/UX Designer
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#B3A2AE] leading-relaxed">
                  Designing intuitive and meaningful digital experiences
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
