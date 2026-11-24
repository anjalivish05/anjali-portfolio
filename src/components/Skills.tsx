import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Terminal,
  Cpu,
  Sparkles
} from 'lucide-react';
import { Figma } from './Icons';
import { useReducedMotion } from '../lib/motion';

// --- Custom 3D Isometric Illustrations (Pure SVG, Zero external assets) ---

const Programming3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="progEditorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3A2740" />
        <stop offset="100%" stopColor="#211725" />
      </linearGradient>
      <linearGradient id="progTopBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A3452" />
        <stop offset="100%" stopColor="#2F1E35" />
      </linearGradient>
      <linearGradient id="progBracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D0C5" />
        <stop offset="100%" stopColor="#E6A995" />
      </linearGradient>
      <filter id="peachGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Ground ambient shadow */}
    <ellipse cx="80" cy="116" rx="55" ry="10" fill="#160F19" opacity="0.6" />

    {/* Main Code Editor Panel (Isometric Angle) */}
    <g transform="translate(18, 12)">
      {/* Back Layer / Editor Shadow Base */}
      <polygon points="12,18 108,6 112,88 16,100" fill="#1B1220" opacity="0.9" />
      
      {/* Front Editor Window */}
      <polygon points="8,14 104,2 108,84 12,96" fill="url(#progEditorGrad)" stroke="#4A3452" strokeWidth="1.2" />
      
      {/* Editor Top Bar */}
      <polygon points="8,14 104,2 105,16 9,28" fill="url(#progTopBar)" />
      
      {/* Window Controls (3 Dots) */}
      <circle cx="17" cy="22" r="2.2" fill="#E6A995" opacity="0.9" />
      <circle cx="24" cy="21" r="2.2" fill="#D4A373" opacity="0.8" />
      <circle cx="31" cy="20" r="2.2" fill="#8E7D8A" opacity="0.7" />

      {/* Code Lines with Syntax Colors */}
      {/* Line 1: class Logic { */}
      <rect x="18" y="36" width="22" height="3" rx="1.5" fill="#E6A995" opacity="0.9" transform="skewY(-6.5)" />
      <rect x="44" y="39" width="30" height="3" rx="1.5" fill="#F7EFF4" opacity="0.85" transform="skewY(-6.5)" />
      
      {/* Line 2: function solve(task) { */}
      <rect x="24" y="49" width="26" height="3" rx="1.5" fill="#E6A995" opacity="0.8" transform="skewY(-6.5)" />
      <rect x="54" y="52" width="28" height="3" rx="1.5" fill="#B3A2AE" opacity="0.75" transform="skewY(-6.5)" />
      
      {/* Line 3: return solution; */}
      <rect x="30" y="62" width="20" height="3" rx="1.5" fill="#E6A995" opacity="0.9" transform="skewY(-6.5)" />
      <rect x="54" y="65" width="24" height="3" rx="1.5" fill="#D4A373" opacity="0.8" transform="skewY(-6.5)" />
      
      {/* Blinking Cursor Bar */}
      <line x1="82" y1="58" x2="82" y2="65" stroke="#E6A995" strokeWidth="1.8" strokeLinecap="round" transform="skewY(-6.5)">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
      </line>
    </g>

    {/* Floating 3D Code Symbol Badge < / > in foreground */}
    <g transform={`translate(${isHovered ? 86 : 84}, ${isHovered ? 58 : 62})`} className="transition-transform duration-500">
      {/* 3D Depth Base */}
      <rect x="2" y="2" width="46" height="38" rx="10" fill="#1C1221" opacity="0.9" />
      <rect x="1" y="1" width="46" height="38" rx="10" fill="#2E1D33" stroke="#503757" strokeWidth="1" />
      
      {/* Front Face with Peach Glow */}
      <rect x="0" y="0" width="46" height="38" rx="10" fill="#3B2642" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.8" />
      
      {/* Bracket Icons: < / > */}
      <path 
        d="M14 20 L9 24 L14 28" 
        stroke="url(#progBracketGrad)" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      <line 
        x1="21" y1="28" x2="25" y2="19" 
        stroke="#E6A995" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M32 20 L37 24 L32 28" 
        stroke="url(#progBracketGrad)" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </g>

    {/* Subtle floating particle */}
    <circle cx="128" cy="30" r="2" fill="#E6A995" opacity={isHovered ? 0.9 : 0.5}>
      <animate attributeName="cy" values="30;27;30" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const Frontend3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#37243C" />
        <stop offset="100%" stopColor="#1E1422" />
      </linearGradient>
      <linearGradient id="heroCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E6A995" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#402D45" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A3452" />
        <stop offset="100%" stopColor="#2A1B2E" />
      </linearGradient>
    </defs>

    {/* Stand Base */}
    <ellipse cx="78" cy="118" rx="48" ry="8" fill="#160F19" opacity="0.6" />
    <path d="M72 96 L84 96 L87 114 L69 114 Z" fill="url(#standGrad)" stroke="#4A3452" strokeWidth="0.8" />
    <ellipse cx="78" cy="114" rx="22" ry="4" fill="#3A2740" stroke="#553A5F" strokeWidth="1" />

    {/* Isometric Monitor Frame */}
    <g transform="translate(14, 10)">
      {/* Outer Monitor Shell */}
      <rect x="6" y="6" width="116" height="82" rx="7" fill="#1C1221" />
      <rect x="4" y="4" width="116" height="82" rx="7" fill="#2B1C30" stroke="#4A3452" strokeWidth="1.2" />

      {/* Screen Area */}
      <rect x="9" y="9" width="106" height="72" rx="4" fill="url(#screenGrad)" stroke="#38263D" strokeWidth="0.8" />

      {/* Browser Bar */}
      <rect x="9" y="9" width="106" height="12" rx="3" fill="#241728" />
      <circle cx="16" cy="15" r="1.8" fill="#E6A995" />
      <circle cx="22" cy="15" r="1.8" fill="#D4A373" />
      <circle cx="28" cy="15" r="1.8" fill="#8E7D8A" />
      <rect x="36" y="12" width="52" height="6" rx="3" fill="#36253C" />

      {/* UI Layout inside screen */}
      {/* Hero Banner with soft peach accent */}
      <rect x="15" y="27" width="94" height="22" rx="4" fill="url(#heroCardGrad)" stroke="#E6A995" strokeWidth="0.8" strokeOpacity="0.4" />
      <rect x="21" y="32" width="40" height="3" rx="1.5" fill="#F7EFF4" opacity="0.9" />
      <rect x="21" y="39" width="54" height="2.5" rx="1.2" fill="#B3A2AE" opacity="0.8" />
      {/* CTA Button */}
      <rect x="80" y="33" width="22" height="9" rx="3" fill="#E6A995" />
      
      {/* Two Grid Cards */}
      <rect x="15" y="54" width="44" height="21" rx="3" fill="#291A2E" stroke="#403044" strokeWidth="0.8" />
      <rect x="20" y="58" width="18" height="2.5" rx="1.2" fill="#E6A995" opacity="0.9" />
      <rect x="20" y="64" width="32" height="2" rx="1" fill="#8E7D8A" />

      <rect x="65" y="54" width="44" height="21" rx="3" fill="#291A2E" stroke="#403044" strokeWidth="0.8" />
      <rect x="70" y="58" width="18" height="2.5" rx="1.2" fill="#E6A995" opacity="0.9" />
      <rect x="70" y="64" width="32" height="2" rx="1" fill="#8E7D8A" />
    </g>

    {/* Floating Companion Mobile Device Card on Right */}
    <g transform={`translate(${isHovered ? 104 : 100}, ${isHovered ? 40 : 44})`} className="transition-transform duration-500">
      <rect x="0" y="0" width="34" height="52" rx="6" fill="#1C1221" />
      <rect x="1" y="1" width="32" height="50" rx="5" fill="#2E1C33" stroke="#E6A995" strokeWidth="1" strokeOpacity="0.7" />
      {/* Mobile Screen UI */}
      <rect x="4" y="6" width="26" height="38" rx="3" fill="#211526" />
      <rect x="7" y="10" width="14" height="2" rx="1" fill="#E6A995" />
      <rect x="7" y="16" width="20" height="10" rx="2" fill="#3D2944" />
      <rect x="7" y="30" width="20" height="4" rx="2" fill="#E6A995" opacity="0.8" />
      <circle cx="17" cy="47" r="1.5" fill="#8E7D8A" />
    </g>
  </svg>
);

const Backend3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="bladeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A3452" />
        <stop offset="100%" stopColor="#301F36" />
      </linearGradient>
      <linearGradient id="bladeFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2C1D32" />
        <stop offset="100%" stopColor="#1C1121" />
      </linearGradient>
      <linearGradient id="apiPillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E6A995" />
        <stop offset="100%" stopColor="#F5D0C5" />
      </linearGradient>
    </defs>

    {/* Ambient Floor Shadow */}
    <ellipse cx="80" cy="116" rx="54" ry="10" fill="#160F19" opacity="0.6" />

    {/* Server Blade 3 (Bottom) */}
    <g transform="translate(24, 76)">
      {/* Top Face */}
      <polygon points="12,6 88,6 100,20 24,20" fill="url(#bladeTop)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Front Face */}
      <polygon points="24,20 100,20 100,34 24,34" fill="url(#bladeFront)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Side Face */}
      <polygon points="12,6 24,20 24,34 12,20" fill="#1E1323" stroke="#4A3452" strokeWidth="0.8" />
      {/* Grill & Status LEDs */}
      <line x1="32" y1="27" x2="72" y2="27" stroke="#3F2B45" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="82" cy="27" r="2" fill="#E6A995">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="89" cy="27" r="2" fill="#E6A995" opacity="0.8" />
      <circle cx="95" cy="27" r="1.5" fill="#8E7D8A" />
    </g>

    {/* Server Blade 2 (Middle) */}
    <g transform="translate(24, 46)">
      {/* Top Face */}
      <polygon points="12,6 88,6 100,20 24,20" fill="url(#bladeTop)" stroke="#503758" strokeWidth="0.8" />
      {/* Front Face */}
      <polygon points="24,20 100,20 100,34 24,34" fill="url(#bladeFront)" stroke="#503758" strokeWidth="0.8" />
      {/* Side Face */}
      <polygon points="12,6 24,20 24,34 12,20" fill="#1E1323" stroke="#503758" strokeWidth="0.8" />
      {/* Grill & Status LEDs */}
      <line x1="32" y1="27" x2="72" y2="27" stroke="#3F2B45" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="82" cy="27" r="2" fill="#E6A995" />
      <circle cx="89" cy="27" r="2" fill="#E6A995">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="27" r="1.5" fill="#8E7D8A" />
    </g>

    {/* Server Blade 1 (Top) */}
    <g transform="translate(24, 16)">
      {/* Top Face */}
      <polygon points="12,6 88,6 100,20 24,20" fill="url(#bladeTop)" stroke="#5A3E62" strokeWidth="1" />
      {/* Front Face */}
      <polygon points="24,20 100,20 100,34 24,34" fill="url(#bladeFront)" stroke="#5A3E62" strokeWidth="1" />
      {/* Side Face */}
      <polygon points="12,6 24,20 24,34 12,20" fill="#201426" stroke="#5A3E62" strokeWidth="1" />
      {/* Grill & Status LEDs */}
      <line x1="32" y1="27" x2="72" y2="27" stroke="#483250" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="82" cy="27" r="2" fill="#E6A995">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="89" cy="27" r="2" fill="#E6A995" />
      <circle cx="95" cy="27" r="1.5" fill="#8E7D8A" />
    </g>

    {/* Connecting High-Speed Fiber Bus Lines on side */}
    <path 
      d="M34 38 C28 50, 28 65, 34 80 C28 92, 28 100, 34 105" 
      stroke="#E6A995" 
      strokeWidth="1.6" 
      strokeDasharray="4 3" 
      fill="none" 
      opacity="0.85" 
    />

    {/* Floating API Status Badge in front */}
    <g transform={`translate(${isHovered ? 90 : 86}, ${isHovered ? 38 : 42})`} className="transition-transform duration-500">
      <rect x="0" y="0" width="48" height="24" rx="12" fill="#231528" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.85" />
      <circle cx="10" cy="12" r="3" fill="#E6A995">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="18" y="15" fill="#F7EFF4" fontSize="9" fontFamily="monospace" fontWeight="600">
        REST
      </text>
    </g>
  </svg>
);

const Database3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="diskTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A3452" />
        <stop offset="100%" stopColor="#2E1C34" />
      </linearGradient>
      <linearGradient id="diskCylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#25162A" />
        <stop offset="50%" stopColor="#3C2843" />
        <stop offset="100%" stopColor="#201325" />
      </linearGradient>
      <linearGradient id="queryBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E6A995" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E6A995" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Ground Shadow */}
    <ellipse cx="76" cy="116" rx="52" ry="10" fill="#160F19" opacity="0.6" />

    {/* Center Vertical Query Axis Beam */}
    <line x1="76" y1="20" x2="76" y2="108" stroke="url(#queryBeamGrad)" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.8" />

    {/* Cylinder Disk 3 (Bottom) */}
    <g transform="translate(32, 78)">
      <path d="M0,12 C0,22 88,22 88,12 L88,26 C88,36 0,36 0,26 Z" fill="url(#diskCylinderGrad)" stroke="#4A3452" strokeWidth="1" />
      <ellipse cx="44" cy="12" rx="44" ry="10" fill="url(#diskTopGrad)" stroke="#E6A995" strokeWidth="1" strokeOpacity="0.5" />
      {/* Glowing ring band */}
      <path d="M4,18 C12,25 76,25 84,18" stroke="#E6A995" strokeWidth="1" strokeOpacity="0.7" fill="none" />
    </g>

    {/* Cylinder Disk 2 (Middle) */}
    <g transform="translate(32, 50)">
      <path d="M0,12 C0,22 88,22 88,12 L88,26 C88,36 0,36 0,26 Z" fill="url(#diskCylinderGrad)" stroke="#4A3452" strokeWidth="1" />
      <ellipse cx="44" cy="12" rx="44" ry="10" fill="url(#diskTopGrad)" stroke="#E6A995" strokeWidth="1" strokeOpacity="0.6" />
      {/* Glowing ring band */}
      <path d="M4,18 C12,25 76,25 84,18" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
    </g>

    {/* Cylinder Disk 1 (Top) */}
    <g transform="translate(32, 22)">
      <path d="M0,12 C0,22 88,22 88,12 L88,26 C88,36 0,36 0,26 Z" fill="url(#diskCylinderGrad)" stroke="#503758" strokeWidth="1" />
      <ellipse cx="44" cy="12" rx="44" ry="10" fill="url(#diskTopGrad)" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.8" />
      {/* Inner Ring */}
      <ellipse cx="44" cy="12" rx="20" ry="4.5" fill="#25162A" stroke="#E6A995" strokeWidth="0.8" strokeOpacity="0.8" />
    </g>

    {/* Floating SQL Query Badge */}
    <g transform={`translate(${isHovered ? 96 : 92}, ${isHovered ? 26 : 30})`} className="transition-transform duration-500">
      <rect x="0" y="0" width="46" height="26" rx="8" fill="#231528" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.9" />
      <text x="9" y="17" fill="#F7EFF4" fontSize="10" fontFamily="monospace" fontWeight="700">
        SQL
      </text>
      <circle cx="37" cy="13" r="2.5" fill="#E6A995">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

const Design3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="artboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#37243D" />
        <stop offset="100%" stopColor="#1E1423" />
      </linearGradient>
      <linearGradient id="stylusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D0C5" />
        <stop offset="50%" stopColor="#E6A995" />
        <stop offset="100%" stopColor="#4A3452" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="80" cy="116" rx="55" ry="9" fill="#160F19" opacity="0.6" />

    {/* Isometric Design Canvas Artboard */}
    <g transform="translate(16, 14)">
      {/* 3D Depth Base */}
      <polygon points="10,14 102,4 114,80 22,90" fill="#180F1E" opacity="0.9" />
      <polygon points="6,10 98,0 110,76 18,86" fill="url(#artboardGrad)" stroke="#4A3452" strokeWidth="1.2" />

      {/* Grid Lines on Artboard */}
      <line x1="26" y1="25" x2="98" y2="17" stroke="#37273F" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="32" y1="50" x2="104" y2="42" stroke="#37273F" strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="48" y1="12" x2="56" y2="78" stroke="#37273F" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* Smooth Vector Bezier Curve with soft peach line */}
      <path 
        d="M24 66 C 45 20, 68 85, 94 38" 
        stroke="#E6A995" 
        strokeWidth="2.4" 
        fill="none" 
        strokeLinecap="round" 
      />

      {/* Tangent Handle Lines & Anchor Points */}
      <line x1="56" y1="42" x2="68" y2="28" stroke="#8E7D8A" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="68" cy="28" r="2" fill="#E6A995" />
      
      {/* Anchor Node 1 */}
      <rect x="22" y="64" width="4.5" height="4.5" fill="#211725" stroke="#E6A995" strokeWidth="1.4" />
      {/* Anchor Node 2 (Center Vertex) */}
      <rect x="54" y="40" width="5" height="5" fill="#F7EFF4" stroke="#E6A995" strokeWidth="1.6" />
      {/* Anchor Node 3 */}
      <rect x="92" y="36" width="4.5" height="4.5" fill="#211725" stroke="#E6A995" strokeWidth="1.4" />

      {/* Floating UI Swatch Layer Badge */}
      <g transform="translate(12, 14)">
        <rect x="0" y="0" width="30" height="18" rx="4" fill="#281A2D" stroke="#4A3452" strokeWidth="0.8" />
        <circle cx="8" cy="9" r="3" fill="#E6A995" />
        <circle cx="16" cy="9" r="3" fill="#B3A2AE" />
        <circle cx="24" cy="9" r="3" fill="#3D2944" />
      </g>
    </g>

    {/* Floating 3D Stylus Pen angled downward */}
    <g transform={`translate(${isHovered ? 98 : 94}, ${isHovered ? 34 : 38}) rotate(-28)`} className="transition-transform duration-500">
      {/* Stylus Shadow */}
      <ellipse cx="6" cy="46" rx="8" ry="3" fill="#160F19" opacity="0.5" />
      {/* Stylus Body */}
      <rect x="3" y="0" width="6" height="40" rx="3" fill="url(#stylusGrad)" stroke="#503758" strokeWidth="0.8" />
      {/* Stylus Peach Grip Band */}
      <rect x="3" y="24" width="6" height="8" fill="#E6A995" />
      {/* Stylus Tip */}
      <polygon points="3,40 9,40 6,48" fill="#E6A995" />
    </g>
  </svg>
);

const Blockchain3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <svg 
    viewBox="0 0 160 130" 
    className="w-full h-full max-w-[140px] max-h-[115px] transition-transform duration-500 ease-out select-none drop-shadow-[0_12px_24px_rgba(10,6,12,0.6)]"
    style={{ transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)' }}
  >
    <defs>
      <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4D3656" />
        <stop offset="100%" stopColor="#35223C" />
      </linearGradient>
      <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#25162A" />
        <stop offset="100%" stopColor="#36233D" />
      </linearGradient>
      <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2F1E36" />
        <stop offset="100%" stopColor="#1E1223" />
      </linearGradient>
      <linearGradient id="nodeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E6A995" />
        <stop offset="100%" stopColor="#D4A373" />
      </linearGradient>
    </defs>

    {/* Ambient Ground Shadow */}
    <ellipse cx="80" cy="116" rx="54" ry="10" fill="#160F19" opacity="0.6" />

    {/* Network Connection Lines between Cubes */}
    <line x1="42" y1="52" x2="80" y2="40" stroke="url(#nodeBeam)" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.8" />
    <line x1="80" y1="40" x2="120" y2="60" stroke="url(#nodeBeam)" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.8" />
    <line x1="42" y1="52" x2="80" y2="82" stroke="url(#nodeBeam)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
    <line x1="80" y1="82" x2="120" y2="60" stroke="url(#nodeBeam)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />

    {/* Left Isometric Cube (Offset) */}
    <g transform="translate(20, 36)">
      {/* Top */}
      <polygon points="20,0 38,9 20,18 2,9" fill="url(#cubeTop)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Left */}
      <polygon points="2,9 20,18 20,40 2,31" fill="url(#cubeLeft)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Right */}
      <polygon points="20,18 38,9 38,31 20,40" fill="url(#cubeRight)" stroke="#4A3452" strokeWidth="0.8" />
      <circle cx="20" cy="18" r="2" fill="#E6A995" opacity="0.8" />
    </g>

    {/* Right Isometric Cube (Offset) */}
    <g transform="translate(100, 44)">
      {/* Top */}
      <polygon points="20,0 38,9 20,18 2,9" fill="url(#cubeTop)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Left */}
      <polygon points="2,9 20,18 20,40 2,31" fill="url(#cubeLeft)" stroke="#4A3452" strokeWidth="0.8" />
      {/* Right */}
      <polygon points="20,18 38,9 38,31 20,40" fill="url(#cubeRight)" stroke="#4A3452" strokeWidth="0.8" />
      <circle cx="20" cy="18" r="2" fill="#E6A995" opacity="0.8" />
    </g>

    {/* Center Hero Isometric Cube (Larger with Peach Edge Lighting) */}
    <g transform={`translate(55, ${isHovered ? 24 : 28})`} className="transition-transform duration-500">
      {/* Top Face */}
      <polygon points="25,0 50,13 25,26 0,13" fill="url(#cubeTop)" stroke="#E6A995" strokeWidth="1.2" strokeOpacity="0.85" />
      {/* Left Face */}
      <polygon points="0,13 25,26 25,58 0,45" fill="url(#cubeLeft)" stroke="#503758" strokeWidth="1" />
      {/* Right Face */}
      <polygon points="25,26 50,13 50,45 25,58" fill="url(#cubeRight)" stroke="#503758" strokeWidth="1" />

      {/* Engraved Cryptographic / ERC-5564 Stealth Symbol on Front-Right */}
      <g transform="translate(28, 24)">
        {/* Shield / Key Node */}
        <polygon points="8,4 16,8 16,18 8,22 0,18 0,8" fill="#201325" stroke="#E6A995" strokeWidth="1.2" />
        <circle cx="8" cy="13" r="2.5" fill="#E6A995">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>

    {/* Floating Node Particles */}
    <circle cx="80" cy="18" r="2.2" fill="#E6A995" opacity={isHovered ? 1 : 0.6}>
      <animate attributeName="cy" values="18;15;18" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="135" cy="38" r="1.8" fill="#E6A995" opacity="0.7" />
    <circle cx="25" cy="80" r="1.8" fill="#8E7D8A" opacity="0.7" />
  </svg>
);

// --- Component Interfaces ---

interface SkillCardData {
  id: string;
  number: string;
  title: string;
  lineIcon: React.ReactNode;
  description: string;
  technologies: { name: string; isProminent?: boolean }[];
  countLabel: string;
  Illustration: React.FC<{ isHovered: boolean }>;
}

const PRIMARY_SKILL_CARDS: SkillCardData[] = [
  {
    id: 'programming',
    number: '01',
    title: 'Programming',
    lineIcon: <Code2 className="w-4 h-4 text-[#E6A995]" />,
    description: 'Building logic, solving problems and creating efficient solutions.',
    technologies: [
      { name: 'Java' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'JavaScript' }
    ],
    countLabel: '4 Languages',
    Illustration: Programming3D
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend Development',
    lineIcon: <Layout className="w-4 h-4 text-[#E6A995]" />,
    description: 'Crafting responsive and intuitive user interfaces.',
    technologies: [
      { name: 'React.js' },
      { name: 'TypeScript' },
      { name: 'HTML5' },
      { name: 'CSS3' }
    ],
    countLabel: '4 Technologies',
    Illustration: Frontend3D
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend Development',
    lineIcon: <Server className="w-4 h-4 text-[#E6A995]" />,
    description: 'Developing scalable, secure and high-performance applications.',
    technologies: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'REST APIs' }
    ],
    countLabel: '5 Technologies',
    Illustration: Backend3D
  },
  {
    id: 'database',
    number: '04',
    title: 'Database',
    lineIcon: <Database className="w-4 h-4 text-[#E6A995]" />,
    description: 'Managing and organizing data for real-world applications.',
    technologies: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'SQL' }
    ],
    countLabel: '3 Technologies',
    Illustration: Database3D
  },
  {
    id: 'design',
    number: '05',
    title: 'UI/UX Design',
    lineIcon: <Figma className="w-4 h-4 text-[#E6A995]" />,
    description: 'Designing user-centered, beautiful and functional experiences.',
    technologies: [
      { name: 'Figma', isProminent: true },
      { name: 'UI Design' },
      { name: 'UX Design' },
      { name: 'Wireframing' },
      { name: 'Prototyping' },
      { name: 'Responsive Design' }
    ],
    countLabel: '6 Disciplines',
    Illustration: Design3D
  },
  {
    id: 'blockchain',
    number: '06',
    title: 'Blockchain / Web3',
    lineIcon: <Cpu className="w-4 h-4 text-[#E6A995]" />,
    description: 'Exploring decentralized technologies and next-generation digital solutions.',
    technologies: [
      { name: 'Web3' },
      { name: 'Blockchain Fundamentals' },
      { name: 'Smart Contracts' },
      { name: 'ERC-5564' }
    ],
    countLabel: '4 Technologies',
    Illustration: Blockchain3D
  }
];

const DEVELOPER_TOOLS = [
  { name: 'Git', category: 'VCS' },
  { name: 'GitHub', category: 'Collaboration' },
  { name: 'VS Code', category: 'Editor' },
  { name: 'Postman', category: 'API Testing' }
];

const ROTATING_WORDS = ['DESIGN', 'DEVELOP', 'BUILD', 'INNOVATE', 'CREATE'];

// --- Animated Rotating Words Header Subcomponent ---
const RotatingWordsHeader: React.FC<{ prefersReducedMotion: boolean }> = ({ prefersReducedMotion }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Animated Vertical Rotating Word Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211725] border border-[#403044] shadow-[0_4px_16px_rgba(10,6,12,0.4)]">
        <Sparkles className="w-3.5 h-3.5 text-[#E6A995]" />
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#B3A2AE]">Focus:</span>
        <div className="h-6 overflow-hidden relative w-28 sm:w-32 flex items-center justify-start">
          <div
            className="transition-transform duration-500 ease-out flex flex-col absolute top-0 left-0"
            style={
              prefersReducedMotion
                ? undefined
                : { transform: `translateY(-${wordIndex * 24}px)` }
            }
          >
            {ROTATING_WORDS.map((word) => (
              <span
                key={word}
                className="h-6 flex items-center font-mono text-xs sm:text-[13px] font-semibold tracking-wider text-[#E6A995]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sequential Progression Indicator (DESIGN → DEVELOP → BUILD → INNOVATE → CREATE) */}
      <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-wider">
        {ROTATING_WORDS.map((word, idx) => {
          const isActive = idx === wordIndex;
          return (
            <React.Fragment key={word}>
              <span
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-[#E6A995] font-semibold drop-shadow-[0_0_8px_rgba(230,169,149,0.3)] scale-105'
                    : 'text-[#8E7D8A]/70 hover:text-[#B3A2AE]'
                }`}
              >
                {word}
              </span>
              {idx < ROTATING_WORDS.length - 1 && (
                <span className="text-[#403044]">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// --- Letter-by-Letter Reveal Section Heading (Word-Safe Wrapping) ---
const LetterRevealHeading: React.FC<{
  text: string;
  isRevealed: boolean;
  prefersReducedMotion: boolean;
}> = ({ text, isRevealed, prefersReducedMotion }) => {
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFF4] font-bold tracking-tight mb-4 inline-flex flex-wrap justify-center items-center gap-x-[0.28em] gap-y-1">
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
                          transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * 35}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${charIndex * 35}ms`,
                          willChange: 'opacity, transform',
                        }
                  }
                >
                  {char}
                </span>
              );
            })}
            {isLastWord && (
              <span 
                className="text-[#E6A995] inline-block transition-all"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'scale(1)' : 'scale(0)',
                        transition: `opacity 400ms ease ${charCounter * 35}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${charCounter * 35}ms`
                      }
                }
              >
                .
              </span>
            )}
          </span>
        );
      })}
    </h2>
  );
};

// --- Single Skill Card Item with 3D Tilt, Depth Lift & Responsive Layout ---
const SkillCardItem: React.FC<{
  card: SkillCardData;
  idx: number;
  isRevealed: boolean;
  prefersReducedMotion: boolean;
}> = ({ card, idx, isRevealed, prefersReducedMotion }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [canTilt, setCanTilt] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Gentle 3D rotation capped at ~4.5 degrees
    const rotateX = -Number(((y / (rect.height / 2)) * 4.5).toFixed(2));
    const rotateY = Number(((x / (rect.width / 2)) * 4.5).toFixed(2));

    setTilt({ rotateX, rotateY, isHovered: true });
  };

  const handleMouseEnter = () => {
    if (!canTilt || prefersReducedMotion) return;
    setTilt((prev) => ({ ...prev, isHovered: true }));
  };

  const handleMouseLeave = () => {
    // Smooth reset on mouse leave
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  const staggerDelay = idx * 90; // Sequential stagger

  // Card motion and 3D perspective style
  const cardStyle = useMemo<React.CSSProperties>(() => {
    if (prefersReducedMotion) {
      return { opacity: 1, transform: 'none' };
    }

    if (!isRevealed) {
      return {
        opacity: 0,
        transform: 'translateY(28px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
        willChange: 'transform, opacity',
      };
    }

    if (canTilt) {
      const transform = tilt.isHovered
        ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-6px)`
        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';

      return {
        opacity: 1,
        transform,
        transformStyle: 'preserve-3d',
        transition: tilt.isHovered
          ? 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease'
          : `transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease, border-color 400ms ease, opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
        boxShadow: tilt.isHovered
          ? '0 20px 40px -15px rgba(10, 6, 12, 0.95), 0 0 24px -6px rgba(230, 169, 149, 0.16)'
          : '0 4px 16px -8px rgba(10, 6, 12, 0.4)',
        borderColor: tilt.isHovered ? 'rgba(230, 169, 149, 0.45)' : undefined,
        willChange: tilt.isHovered ? 'transform' : 'auto',
      };
    }

    // Tablet & Mobile
    return {
      opacity: 1,
      transform: 'translateY(0px)',
      transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
      willChange: 'auto',
    };
  }, [idx, isRevealed, tilt, canTilt, prefersReducedMotion, staggerDelay]);

  const { Illustration } = card;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`group p-4.5 min-[380px]:p-6 sm:p-7 rounded-2xl bg-[#2B1E30] border border-[#403044] ${
        !canTilt
          ? 'hover:border-[#E6A995]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-10px_rgba(10,6,12,0.85)]'
          : ''
      } flex flex-col justify-between relative overflow-hidden`}
    >
      {/* Subtle Ambient Radial Lighting in Card Corner */}
      <div 
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-radial from-[#E6A995]/10 to-transparent pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
      />

      <div style={canTilt && tilt.isHovered ? { transform: 'translateZ(14px)', transition: 'transform 250ms ease' } : undefined}>
        {/* Card Header Row: Icon + Number */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div 
            style={canTilt && tilt.isHovered ? { transform: 'translateZ(26px)', transition: 'transform 250ms ease' } : undefined}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#211725] border border-[#403044] group-hover:border-[#E6A995]/50 group-hover:shadow-[0_4px_16px_rgba(230,169,149,0.18)] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-0.5"
          >
            {card.lineIcon}
          </div>
          <span className="text-xs font-mono text-[#8E7D8A]">
            {card.number}
          </span>
        </div>

        {/* Content & 3D Illustration Area (Text Left, 3D Illustration Right) */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          {/* Left Text Column */}
          <div className="flex-1 min-w-0 pr-1">
            <h3 
              className="font-serif text-xl min-[380px]:text-2xl text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors font-semibold tracking-tight mb-2 leading-tight"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateY(0)' : 'translateY(12px)',
                      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 100}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 100}ms`
                    }
              }
            >
              {card.title}
            </h3>
            <p 
              className="text-xs sm:text-[13px] font-sans text-[#B3A2AE] leading-relaxed line-clamp-3"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 200}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 200}ms`
                    }
              }
            >
              {card.description}
            </p>
          </div>

          {/* Right 3D Illustration */}
          <div 
            style={canTilt && tilt.isHovered ? { transform: 'translateZ(30px)', transition: 'transform 250ms ease' } : undefined}
            className="flex-shrink-0 w-20 min-[380px]:w-26 sm:w-32 h-20 min-[380px]:h-26 sm:h-28 flex items-center justify-center relative pointer-events-none"
          >
            <Illustration isHovered={tilt.isHovered} />
          </div>
        </div>

        {/* Technology Badges (Accessible via Hover & Touch Tap) */}
        <div className="flex flex-wrap gap-2 pt-1">
          {card.technologies.map((tech) => (
            <span
              key={tech.name}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 flex items-center gap-1.5 cursor-default ${
                tech.isProminent
                  ? 'bg-[#E6A995]/15 border border-[#E6A995]/50 text-[#E6A995] font-medium shadow-sm hover:bg-[#E6A995]/25 hover:border-[#E6A995]'
                  : 'bg-[#211725] border border-[#403044] text-[#F7EFF4] hover:border-[#E6A995]/50 hover:text-[#E6A995] active:border-[#E6A995]'
              }`}
            >
              {tech.isProminent && <Figma className="w-3.5 h-3.5 text-[#E6A995]" />}
              <span>{tech.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Divider */}
      <div 
        style={canTilt && tilt.isHovered ? { transform: 'translateZ(10px)', transition: 'transform 250ms ease' } : undefined}
        className="mt-7 pt-4 border-t border-[#403044]/60 flex items-center justify-between text-[11px] font-mono text-[#8E7D8A]"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995]" />
          <span>Production Ready</span>
        </span>
        <span>{card.countLabel}</span>
      </div>
    </div>
  );
};

// --- Developer Tools Compact Additional Row ---
const DeveloperToolsRow: React.FC<{ isRevealed: boolean; prefersReducedMotion: boolean }> = ({ isRevealed, prefersReducedMotion }) => {
  return (
    <div 
      className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#211725] border border-[#403044] hover:border-[#E6A995]/40 transition-all duration-300 shadow-[0_8px_24px_-8px_rgba(10,6,12,0.6)]"
      style={
        prefersReducedMotion
          ? undefined
          : {
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 600ms'
            }
      }
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Tools Header & Description */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#2B1E30] border border-[#403044] flex items-center justify-center flex-shrink-0">
            <Terminal className="w-4 h-4 text-[#E6A995]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#E6A995]">
                DEVELOPER TOOLS & WORKFLOW
              </span>
              <span className="text-[10px] font-mono text-[#8E7D8A] bg-[#2B1E30] px-2 py-0.5 rounded-full border border-[#403044]">
                4 Tools
              </span>
            </div>
            <p className="text-xs text-[#B3A2AE] mt-0.5">
              Essential instrumentation for version control, local environment setup, and API verification.
            </p>
          </div>
        </div>

        {/* Right: Tools Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {DEVELOPER_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="px-3.5 py-1.5 rounded-xl bg-[#2B1E30] border border-[#403044] hover:border-[#E6A995]/50 transition-all duration-200 flex items-center gap-2 group cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6A995] group-hover:scale-125 transition-transform" />
              <span className="text-xs font-sans text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors font-medium">
                {tool.name}
              </span>
              <span className="text-[10px] font-mono text-[#8E7D8A] pl-1 border-l border-[#403044]">
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Skills Component ---
export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          {/* Small Uppercase Label */}
          <span className="text-[11px] uppercase tracking-[0.26em] font-sans font-medium text-[#E6A995] mb-3 block">
            SKILLS
          </span>

          {/* Main Heading with Letter-by-Letter Reveal */}
          <LetterRevealHeading 
            text="My Skill Set" 
            isRevealed={isRevealed} 
            prefersReducedMotion={prefersReducedMotion} 
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal mb-6">
            A blend of development, design, and emerging technologies.
          </p>

          {/* Animated Rotating Words: DESIGN → DEVELOP → BUILD → INNOVATE → CREATE */}
          <RotatingWordsHeader prefersReducedMotion={prefersReducedMotion} />
        </div>

        {/* Six Primary Skill Cards (3 Columns × 2 Rows on Desktop, 2 Columns on Tablet, 1 Column on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PRIMARY_SKILL_CARDS.map((card, idx) => (
            <SkillCardItem
              key={card.id}
              card={card}
              idx={idx}
              isRevealed={isRevealed}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Developer Tools Compact Additional Row */}
        <DeveloperToolsRow 
          isRevealed={isRevealed} 
          prefersReducedMotion={prefersReducedMotion} 
        />

      </div>
    </section>
  );
};
