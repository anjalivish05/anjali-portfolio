import React, { forwardRef } from 'react';

// Lightweight drop-in Motion replacement for React 19 compatibility
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
};

interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  initial?: any;
  animate?: any;
  exit?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  layout?: any;
  layoutId?: any;
  whileHover?: any;
  whileTap?: any;
  children?: React.ReactNode;
}

const createMotionComponent = (tag: string) => {
  return forwardRef<HTMLElement, MotionProps>((props, ref) => {
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
      ...rest
    } = props;

    // Filter out motion props so React DOM doesn't complain
    return React.createElement(tag, {
      ...rest,
      ref,
      className,
      style,
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

export default { motion, AnimatePresence };
