import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../lib/motion';

export const GlobalBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax scroll listener: only run on desktop with fine pointers and no reduced motion
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion, isMobile]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Dark Plum Radial Depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,#211725_0%,#160F19_55%,#110B13_100%)]" 
      />

      {/* 2. Soft Ambient Lighting / Radial Glows with Gentle Parallax on Desktop, Static on Mobile */}
      <div 
        style={
          prefersReducedMotion || isMobile
            ? undefined
            : {
                transform: `translate3d(0, ${scrollY * 0.02}px, 0)`,
              }
        }
        className="absolute inset-0 global-ambient-layer overflow-hidden max-w-full"
      >
        {/* Deep aubergine central glow (from hero) - lightweight blur on mobile */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[600px] lg:w-[900px] h-[260px] sm:h-[450px] lg:h-[550px] bg-[#2B1E30]/60 rounded-full blur-[40px] sm:blur-[120px] lg:blur-[150px]" />
        
        {/* Soft peach top edge ambient glow */}
        <div className="absolute -top-32 right-1/4 w-[200px] sm:w-[380px] lg:w-[480px] h-[180px] sm:h-[300px] lg:h-[380px] bg-[#E6A995]/[0.05] sm:bg-[#E6A995]/[0.07] rounded-full blur-[45px] sm:blur-[110px] lg:blur-[140px]" />
        
        {/* Soft peach bottom-left ambient glow */}
        <div className="absolute -bottom-28 left-6 sm:left-10 w-[220px] sm:w-[420px] lg:w-[520px] h-[180px] sm:h-[320px] lg:h-[400px] bg-[#E6A995]/[0.04] sm:bg-[#E6A995]/[0.055] rounded-full blur-[45px] sm:blur-[120px] lg:blur-[145px]" />

        {/* Muted plum mid-right secondary glow - hidden on small mobile to reduce fill rate */}
        <div className="hidden sm:block absolute top-2/3 right-10 w-[350px] lg:w-[450px] h-[350px] lg:h-[450px] bg-[#37283E]/40 rounded-full blur-[110px] sm:blur-[140px]" />
      </div>

      {/* 3. Flowing Curved Wave Contours with Organic Counter-Parallax on Desktop */}
      <div 
        style={
          prefersReducedMotion || isMobile
            ? undefined
            : {
                transform: `translate3d(0, ${scrollY * -0.025}px, 0)`,
              }
        }
        className="absolute inset-0 global-wave-layer overflow-hidden max-w-full"
      >
        <svg
          className="w-full h-full opacity-[0.04] sm:opacity-[0.055] lg:opacity-[0.065] text-[#E6A995] overflow-hidden"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary Graceful Sweeping Wave */}
          <path
            d="M0 450 C 300 200, 700 700, 1100 400 C 1250 250, 1350 480, 1440 450"
            stroke="currentColor"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Delicate Dashed Echo Contour */}
          <path
            d="M0 520 C 350 280, 650 780, 1050 480 C 1200 330, 1350 550, 1440 520"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Upper Diagonal Flowing Wave */}
          <path
            d="M50 150 C 450 350, 800 100, 1150 280 C 1280 360, 1380 260, 1440 280"
            stroke="currentColor"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Extended Lower Organic Contour */}
          <path
            d="M0 720 C 260 580, 640 820, 1020 660 C 1200 560, 1340 680, 1440 650"
            stroke="currentColor"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          />

          {/* Soft Secondary Whispering Wave */}
          <path
            d="M0 280 C 220 120, 560 380, 960 210 C 1180 100, 1340 230, 1440 190"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* 4. Subtle Radial Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#160F19_96%)]" 
      />
    </div>
  );
};
