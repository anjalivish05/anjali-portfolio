import React, { forwardRef, useEffect, useRef, useState, useMemo, useCallback } from 'react';

// --- Accessibility: prefers-reduced-motion check ---
export const useReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
};

// --- Reusable Bidirectional Scroll Reveal Hook ---
export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '-40px 0px -40px 0px', once = false } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const lastScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      setHasEntered(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          setHasEntered(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          // Bidirectional: when scrolling away, reverse the animation smoothly
          if (!once) {
            setIsRevealed(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, prefersReducedMotion]);

  return { ref, isRevealed, hasEntered, scrollDirection, prefersReducedMotion };
};

// --- Reusable 3D Tilt Hook for Cards ---
export interface TiltOptions {
  maxTilt?: number; // max degrees, e.g. 4.5
  elevation?: number; // translateY on hover in px, e.g. -6
  perspective?: number; // perspective in px, e.g. 1000
}

export const use3DTilt = <T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
) => {
  const { maxTilt = 4.5, elevation = -6, perspective = 1000 } = options;
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [canTilt, setCanTilt] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    setCanTilt(mediaQuery.matches && !prefersReducedMotion);

    const handler = (e: MediaQueryListEvent) => {
      setCanTilt(e.matches && !prefersReducedMotion);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [prefersReducedMotion]);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!canTilt || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -Number(((y / (rect.height / 2)) * maxTilt).toFixed(2));
    const rotateY = Number(((x / (rect.width / 2)) * maxTilt).toFixed(2));

    setTilt({ rotateX, rotateY, isHovered: true });
  }, [canTilt, maxTilt, prefersReducedMotion]);

  const onMouseEnter = useCallback(() => {
    if (!canTilt || prefersReducedMotion) return;
    setTilt((prev) => ({ ...prev, isHovered: true }));
  }, [canTilt, prefersReducedMotion]);

  const onMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  }, []);

  const style = useMemo<React.CSSProperties>(() => {
    if (prefersReducedMotion) {
      return {};
    }
    if (!canTilt) {
      return {};
    }
    const transform = tilt.isHovered
      ? `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${elevation}px)`
      : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`;

    return {
      transform,
      transformStyle: 'preserve-3d',
      transition: tilt.isHovered
        ? 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease'
        : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease, border-color 400ms ease',
      boxShadow: tilt.isHovered
        ? '0 20px 40px -15px rgba(10, 6, 12, 0.95), 0 0 24px -6px rgba(230, 169, 149, 0.16)'
        : '0 4px 16px -8px rgba(10, 6, 12, 0.4)',
      borderColor: tilt.isHovered ? 'rgba(230, 169, 149, 0.45)' : undefined,
      willChange: tilt.isHovered ? 'transform' : 'auto',
    };
  }, [canTilt, elevation, perspective, prefersReducedMotion, tilt]);

  return {
    ref,
    tiltProps: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      style,
    },
    isHovered: tilt.isHovered,
    canTilt,
  };
};

// --- Reusable Letter-by-Letter Reveal Heading Component (Word-Safe Wrapping) ---
export const LetterRevealHeading: React.FC<{
  text: string;
  isRevealed: boolean;
  className?: string;
  accentChar?: string;
  prefersReducedMotion?: boolean;
}> = ({ text, isRevealed, className = '', accentChar = '.', prefersReducedMotion = false }) => {
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <span className={`inline-flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, wordIdx) => {
        const isLastWord = wordIdx === words.length - 1;
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char) => {
              const charIndex = charCounter++;
              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={
                    prefersReducedMotion
                      ? { opacity: 1, transform: 'none' }
                      : {
                          opacity: isRevealed ? 1 : 0,
                          transform: isRevealed ? 'translateY(0)' : 'translateY(22px)',
                          transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * 28}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * 28}ms`,
                          willChange: 'opacity, transform',
                        }
                  }
                >
                  {char}
                </span>
              );
            })}
            {isLastWord && accentChar && (
              <span 
                className="text-[#E6A995] inline-block transition-all"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'scale(1)' : 'scale(0)',
                        transition: `opacity 400ms ease ${charCounter * 28}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${charCounter * 28}ms`
                      }
                }
              >
                {accentChar}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

// --- AnimatePresence Drop-in Replacement ---
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// --- Framer-Motion API Compatibility Shim ---
interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  whileInView?: Record<string, any>;
  viewport?: { once?: boolean; margin?: string; amount?: number };
  transition?: { duration?: number; delay?: number; ease?: any; repeat?: any };
  layout?: boolean | string;
  layoutId?: string;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  children?: React.ReactNode;
}

const parseMotionValues = (
  target: Record<string, any> | undefined,
  transition: any,
  isHovered: boolean,
  hoverTarget: Record<string, any> | undefined,
  prefersReduced: boolean
): React.CSSProperties => {
  if (prefersReduced) {
    return { opacity: 1, transform: 'none' };
  }
  if (!target && !hoverTarget) {
    return {};
  }

  const merged = { ...(target || {}), ...(isHovered && hoverTarget ? hoverTarget : {}) };
  const transforms: string[] = [];

  if (merged.perspective !== undefined) transforms.push(`perspective(${merged.perspective}px)`);
  if (merged.x !== undefined) transforms.push(`translateX(${typeof merged.x === 'number' ? `${merged.x}px` : merged.x})`);
  if (merged.y !== undefined) transforms.push(`translateY(${typeof merged.y === 'number' ? `${merged.y}px` : merged.y})`);
  if (merged.z !== undefined) transforms.push(`translateZ(${typeof merged.z === 'number' ? `${merged.z}px` : merged.z})`);
  if (merged.scale !== undefined) transforms.push(`scale(${merged.scale})`);
  if (merged.rotate !== undefined) transforms.push(`rotate(${merged.rotate}deg)`);
  if (merged.rotateX !== undefined) transforms.push(`rotateX(${merged.rotateX}deg)`);
  if (merged.rotateY !== undefined) transforms.push(`rotateY(${merged.rotateY}deg)`);

  const durationSec = typeof transition?.duration === 'number' ? transition.duration : 0.6;
  const delaySec = typeof transition?.delay === 'number' ? transition.delay : 0;
  
  let easeStr = 'cubic-bezier(0.16, 1, 0.3, 1)';
  if (Array.isArray(transition?.ease)) {
    easeStr = `cubic-bezier(${transition.ease.join(',')})`;
  } else if (typeof transition?.ease === 'string') {
    easeStr = transition.ease;
  }

  const res: React.CSSProperties = {
    transition: isHovered
      ? 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease, box-shadow 300ms ease'
      : `transform ${Math.round(durationSec * 1000)}ms ${easeStr} ${Math.round(delaySec * 1000)}ms, opacity ${Math.round(durationSec * 1000)}ms ${easeStr} ${Math.round(delaySec * 1000)}ms`,
    willChange: 'transform, opacity',
  };

  if (transforms.length > 0) res.transform = transforms.join(' ');
  if (merged.opacity !== undefined) res.opacity = merged.opacity;
  if (merged.boxShadow !== undefined) res.boxShadow = merged.boxShadow;
  if (merged.borderColor !== undefined) res.borderColor = merged.borderColor;

  return res;
};

const createMotionComponent = (tag: string) => {
  return forwardRef<HTMLElement, MotionProps>((props, forwardedRef) => {
    const {
      initial,
      animate,
      exit,
      whileInView,
      viewport,
      transition,
      layout,
      layoutId,
      whileHover,
      whileTap,
      className = '',
      style = {},
      onMouseEnter,
      onMouseLeave,
      children,
      ...rest
    } = props;

    const internalRef = useRef<HTMLElement>(null);
    const prefersReduced = useReducedMotion();
    const [isInView, setIsInView] = useState(!whileInView);
    const [isHovered, setIsHovered] = useState(false);

    // Synchronize ref with forwarded ref
    useEffect(() => {
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') {
        forwardedRef(internalRef.current);
      } else {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = internalRef.current;
      }
    });

    // Bidirectional Intersection Observer when whileInView is specified
    useEffect(() => {
      if (!whileInView || prefersReduced) return;
      const el = internalRef.current;
      if (!el || !('IntersectionObserver' in window)) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (viewport?.once) {
              observer.unobserve(entry.target);
            }
          } else {
            // Smoothly reverse animation when leaving viewport
            if (!viewport?.once) {
              setIsInView(false);
            }
          }
        },
        {
          threshold: viewport?.amount ?? 0.1,
          rootMargin: viewport?.margin ?? '-30px 0px -30px 0px',
        }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [whileInView, viewport?.amount, viewport?.margin, viewport?.once, prefersReduced]);

    const activeTarget = useMemo(() => {
      if (whileInView) {
        return isInView ? whileInView : initial;
      }
      if (animate) {
        return animate;
      }
      return initial;
    }, [whileInView, isInView, initial, animate]);

    const motionStyle = useMemo(() => {
      return parseMotionValues(activeTarget, transition, isHovered, whileHover, prefersReduced);
    }, [activeTarget, transition, isHovered, whileHover, prefersReduced]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (whileHover) setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      if (whileHover) setIsHovered(false);
      onMouseLeave?.(e);
    };

    return React.createElement(tag, {
      ...rest,
      ref: internalRef,
      className,
      style: { ...motionStyle, ...style },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children,
    });
  });
};

const tags = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'article',
  'section',
  'header',
  'footer',
  'nav',
  'aside',
  'ul',
  'li',
  'button',
  'a',
  'img',
  'blockquote'
];

export const motion: Record<string, any> = {};

tags.forEach((tag) => {
  motion[tag] = createMotionComponent(tag);
});

export default { 
  motion, 
  AnimatePresence, 
  useReducedMotion, 
  useScrollReveal, 
  use3DTilt, 
  LetterRevealHeading 
};
