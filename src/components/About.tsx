import React, { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  Layers, 
  Palette, 
  Cpu, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

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
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const getRevealStyle = (delayMs: number, yOffset: number = 20): React.CSSProperties => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0)' : `translateY(${yOffset}px)`,
      transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      willChange: isRevealed ? 'auto' : 'transform, opacity',
    };
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Section Header */}
        <div 
          style={getRevealStyle(0, 24)}
          className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] uppercase tracking-[0.26em] font-mono font-medium text-[#E6A995] mb-3 block">
            BIOGRAPHY
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-normal tracking-tight">
            A Little About Me
          </h2>
        </div>

        {/* 2. Two-Column Introduction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center mb-16 sm:mb-24">
          
          {/* LEFT SIDE: Creative Polaroid-Style Image Collage (5 Cols on Large) */}
          <div 
            style={getRevealStyle(150, 25)}
            className="lg:col-span-5 w-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[340px] sm:h-[400px] flex items-center justify-center">

              {/* Polaroid 1: Books & Learning (Top Left / Back Layer) */}
              <div 
                className="absolute top-2 left-2 sm:left-4 w-40 sm:w-48 -rotate-6 hover:-rotate-2 transition-all duration-500 hover:scale-105 z-10 hover:z-30 cursor-pointer"
                title="Curiosity & books"
              >
                <div className="p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-2xl bg-[#211725] border border-[#E6A995]/30 hover:border-[#E6A995] shadow-xl backdrop-blur-sm group/polaroid">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#160F19]">
                    <img 
                      src="/assets/about/books-learning.jpg" 
                      alt="Books and continuous learning" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/polaroid:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center font-serif italic text-[11px] text-[#B3A2AE] group-hover/polaroid:text-[#E6A995] transition-colors">
                    curiosity &amp; books
                  </p>
                </div>
              </div>

              {/* Polaroid 2: Coding & Systems (Bottom Right / Middle Layer) */}
              <div 
                className="absolute bottom-3 right-2 sm:right-4 w-44 sm:w-52 rotate-6 hover:rotate-2 transition-all duration-500 hover:scale-105 z-15 hover:z-30 cursor-pointer"
                title="Crafting with code"
              >
                <div className="p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-2xl bg-[#211725] border border-[#E6A995]/30 hover:border-[#E6A995] shadow-2xl backdrop-blur-sm group/polaroid">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#160F19]">
                    <img 
                      src="/assets/about/coding.jpg" 
                      alt="Programming logic and web architecture" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/polaroid:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center font-serif italic text-[11px] text-[#B3A2AE] group-hover/polaroid:text-[#E6A995] transition-colors">
                    crafting with code
                  </p>
                </div>
              </div>

              {/* Polaroid 3: Coffee & Creative Workspace (Center / Front Layer) */}
              <div 
                className="absolute top-12 sm:top-14 left-10 sm:left-14 w-44 sm:w-52 -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 z-20 hover:z-30 cursor-pointer"
                title="Creative workspace"
              >
                <div className="p-3 pb-7 sm:p-3.5 sm:pb-8 rounded-2xl bg-[#2B1E30] border border-[#E6A995]/50 hover:border-[#E6A995] shadow-2xl backdrop-blur-sm group/polaroid">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#160F19]">
                    <img 
                      src="/assets/about/workspace-coffee.jpg" 
                      alt="Creative workspace and coffee" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/polaroid:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center font-serif italic text-[11px] text-[#B3A2AE] group-hover/polaroid:text-[#E6A995] transition-colors">
                    creative studio vibes
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Personal Introduction & Identity Badges (7 Cols on Large) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Identity Greeting */}
            <div style={getRevealStyle(250, 18)} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#E6A995]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E6A995] font-semibold">
                  PERSONAL PROFILE
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EFF4] font-normal tracking-tight leading-tight">
                I'm <span className="text-[#E6A995] font-serif italic">Anjali Manoj Vishwakarma</span>
              </h3>
            </div>

            {/* Introduction Lead Statement */}
            <div style={getRevealStyle(350, 18)}>
              <p className="font-serif text-xl sm:text-2xl text-[#F7EFF4] leading-relaxed font-normal mb-5">
                "An Information Technology engineering student passionate about building thoughtful digital experiences through technology and creativity."
              </p>
            </div>

            {/* Supporting Paragraph */}
            <div style={getRevealStyle(450, 18)}>
              <p className="text-sm sm:text-base font-sans text-[#B3A2AE] leading-relaxed mb-7 max-w-2xl font-normal">
                I focus on continuously learning modern web architectures, experimenting with emerging developer technologies, and engineering dependable solutions to practical challenges.
              </p>
            </div>

            {/* Developer Identity Badges (Section 4) */}
            <div style={getRevealStyle(550, 18)}>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {/* 1. Full-Stack Developer */}
                <div className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 cursor-default">
                  <Layers className="w-3.5 h-3.5 text-[#E6A995] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs font-sans text-[#F7EFF4] font-medium">Full-Stack Developer</span>
                </div>

                {/* 2. UI/UX Enthusiast */}
                <div className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 cursor-default">
                  <Palette className="w-3.5 h-3.5 text-[#E6A995] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs font-sans text-[#F7EFF4] font-medium">UI/UX Enthusiast</span>
                </div>

                {/* 3. Problem Solver */}
                <div className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 cursor-default">
                  <Cpu className="w-3.5 h-3.5 text-[#E6A995] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs font-sans text-[#F7EFF4] font-medium">Problem Solver</span>
                </div>

                {/* 4. Lifelong Learner */}
                <div className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995] hover:-translate-y-1 hover:shadow-[0_0_15px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 cursor-default">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6A995] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs font-sans text-[#F7EFF4] font-medium">Lifelong Learner</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Three Information Cards (Section 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* CARD 1: ACADEMIC DEGREE */}
          <div 
            style={getRevealStyle(650, 20)}
            className="p-7 sm:p-8 rounded-2xl bg-[#2B1E30]/70 border border-[#403044] hover:border-[#E6A995]/50 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-6px_rgba(230,169,149,0.15)] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#E6A995] mb-5 transition-colors">
                <GraduationCap className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E6A995] block mb-1">
                ACADEMIC DEGREE
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F7EFF4] font-normal mb-2.5">
                B.Tech in Information Technology
              </h4>
              <p className="text-xs sm:text-sm font-sans text-[#B3A2AE] leading-relaxed">
                Shree L. R. Tiwari College of Engineering, Mumbai (2024–2028).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#403044]/60 text-xs font-mono text-[#8E7D8A] flex items-center justify-between">
              <span>Expected Graduation: 2028</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#E6A995] transition-opacity" />
            </div>
          </div>

          {/* CARD 2: TECHNICAL FOCUS (Technology Pills) */}
          <div 
            style={getRevealStyle(750, 20)}
            className="p-7 sm:p-8 rounded-2xl bg-[#2B1E30]/70 border border-[#403044] hover:border-[#E6A995]/50 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-6px_rgba(230,169,149,0.15)] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#E6A995] mb-5 transition-colors">
                <Code2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E6A995] block mb-1">
                TECHNICAL FOCUS
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F7EFF4] font-normal mb-3">
                Full-Stack Architecture
              </h4>
              
              {/* Stylish technology pills */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['React', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium bg-[#211725] border border-[#403044] text-[#B3A2AE] hover:text-[#E6A995] hover:border-[#E6A995]/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#403044]/60 text-xs font-mono text-[#8E7D8A] flex items-center justify-between">
              <span>Modern Web &amp; Scalable Systems</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#E6A995] transition-opacity" />
            </div>
          </div>

          {/* CARD 3: BASE & REACH */}
          <div 
            style={getRevealStyle(850, 20)}
            className="p-7 sm:p-8 rounded-2xl bg-[#2B1E30]/70 border border-[#403044] hover:border-[#E6A995]/50 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-6px_rgba(230,169,149,0.15)] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#E6A995] mb-5 transition-colors">
                <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E6A995] block mb-1">
                BASE &amp; REACH
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#F7EFF4] font-normal mb-2.5">
                Mumbai, India
              </h4>
              <p className="text-xs sm:text-sm font-sans text-[#B3A2AE] leading-relaxed">
                Open to remote and on-site engineering internships, hackathons, and innovative projects.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#403044]/60 text-xs font-mono text-[#8E7D8A] flex items-center justify-between">
              <span>Available Worldwide</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#E6A995] transition-opacity" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
