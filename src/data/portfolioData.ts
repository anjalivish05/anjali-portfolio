import { Project, SkillCategory, Achievement, GitHubRepo } from '../types';

export const PERSONAL_INFO = {
  name: 'Anjali Vishwakarma',
  fullName: 'Anjali Manoj Vishwakarma',
  brand: 'ANJALI.V',
  role: 'Full-Stack Developer',
  identity: 'Full-Stack Developer | Web Developer | AI & Technology Enthusiast',
  tagline: 'Building digital experiences through code, creativity and technology.',
  about: `I am a BTech Information Technology student at Shree L. R. Tiwari College of Engineering, Mumbai (graduating in 2028). My work sits at the intersection of robust backend engineering and thoughtful, human-first frontend design. I am deeply interested in developing scalable web applications, integrating AI capabilities to solve tangible problems, and crafting interfaces that prioritize clarity and refined aesthetics.`,
  philosophy: `Engineering is not just about making things function—it's about making them clear, dependable, and intuitive. Whether designing hospital queue coordination, public library discovery platforms, or interactive maps, I build with attention to system architecture and user empathy.`,
  location: 'Mumbai, India',
  email: 'anjali13anuj@gmail.com',
  phone: '+91 9987406608',
  linkedin: 'https://www.linkedin.com/in/anjali-vishwakarma-736392382/',
  github: 'https://github.com/anjalivish05',
  x: 'https://x.com/anjalivish05',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/assets/profile.jpg',
  status: 'Open for Summer & Fall Opportunities',
  education: [
    {
      institution: 'Shree L. R. Tiwari College of Engineering',
      location: 'Mumbai',
      degree: 'B.Tech in Information Technology',
      period: '2024 — 2028 (Expected)',
      status: 'Current Student',
      highlights: 'Focus on Data Structures, Database Systems, Software Engineering & Web Technologies'
    },
    {
      institution: 'Thakur College of Engineering & Technology',
      location: 'Mumbai',
      degree: 'Higher Secondary Certificate (HSC)',
      period: '2022 — 2024',
      status: 'Completed',
      highlights: 'Strong foundation in Mathematics, Physics & Computer Science'
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'hospitalflow',
    title: 'HospitalFlow',
    subtitle: 'Smart Hospital OPD Coordination Platform',
    tagline: 'Real-Time OPD Coordination & Smart Queue Management',
    shortDescription: 'Multi-hospital OPD coordination platform engineered to reduce wait times and anxiety through live digital tokens, dynamic queue visualization, and doctor availability tracking.',
    overview: 'HospitalFlow transforms unpredictable outpatient clinic delays into a transparent, coordinated digital experience. Rather than traditional static appointment bookings that fail to reflect doctor emergencies or procedure delays, HospitalFlow provides patients and administrators with live OPD queue updates, digital token issuance, and estimated consultation wait times.',
    category: 'Frontend / UI',
    role: 'Frontend UI/UX Developer',
    image: '/assets/projects/hospitalflow-preview.png',
    tags: ['React', 'JavaScript', 'Figma', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/subhamstiwari24-dot/HospitalFlow.git',
    liveDemoUrl: 'https://github.com/subhamstiwari24-dot/HospitalFlow.git',
    featured: true,
    problem: 'Hospital outpatient departments (OPDs) frequently suffer from overcrowded waiting rooms, unpredictable doctor schedules, and lack of real-time visibility. Patients are left stranded with no sense of when their turn will arrive, while hospital staff deal with chaotic crowd congestion.',
    solution: 'Designed and engineered responsive, high-clarity patient and admin interfaces that interface with FastAPI backends. Patients receive dynamic digital tokens that show queue position in real-time, while administrators and doctors can adjust patient flow with immediate client-side UI reflections.',
    keyFeatures: [
      {
        title: 'Digital Token Generation & Live Tracking',
        description: 'Instant ticket booking with unique token identifiers, estimated wait windows, and live queue progress indicators.'
      },
      {
        title: 'Doctor Schedule & Status Dashboard',
        description: 'Real-time toggle states showing Active, In-Consultation, On Break, or Emergency states for doctors across multiple OPD wings.'
      },
      {
        title: 'Dynamic Waiting-Time Estimation UI',
        description: 'Visual cues showing calculated consultation delays and queue pace to set realistic patient expectations.'
      },
      {
        title: 'Accessible & Responsive Healthcare UI',
        description: 'High-contrast, accessible typography and clear color-coded indicators designed for users of all digital literacy levels.'
      }
    ],
    architecture: {
      frontend: 'HTML5, CSS3, JavaScript, Responsive Component Architecture, Tailwind CSS',
      backend: 'Python FastAPI (RESTful API endpoints for token issuance and doctor status)',
      database: 'PostgreSQL (relational schema for patients, doctors, appointments, and token states)',
      apisAndAi: 'AI-assisted waiting time calculation and OPD throughput optimization algorithms',
      deployment: 'Modular client-server deployment with Git version control'
    },
    myContribution: [
      'Engineered the responsive frontend user experience across patient-token views and doctor-queue monitoring dashboards.',
      'Designed high-fidelity mockups, UI components, and design systems in Figma prior to code implementation.',
      'Built dynamic token state cards, modal confirmations, and form validation for booking workflows.',
      'Integrated frontend data stores with REST API endpoints ensuring consistent loading, error, and optimistic state feedback.',
      'Collaborated closely with backend teammates to ensure reliable data serialization and token status synchronization.'
    ],
    developmentChallenges: [
      {
        challenge: 'Synchronizing real-time queue states smoothly without jarring layout shifts or constant intrusive polling.',
        solution: 'Implemented structured status polling with memoized UI cards and smooth transition animations that highlight state changes without freezing user actions.'
      },
      {
        challenge: 'Designing an interface that remains crystal clear under stressful hospital conditions on small mobile screens.',
        solution: 'Adopted an editorial high-contrast hierarchy with large token numbering, distinct status badges, and minimal visual noise.'
      }
    ],
    resultsAndLearnings: [
      'Gained deep experience in healthcare UI/UX design considerations, where clarity directly impacts patient anxiety.',
      'Learned strict separation of concerns between backend state ownership and frontend responsive rendering.',
      'Successfully delivered a clean, cohesive prototype tested across multiple screen resolutions.'
    ]
  },
  {
    id: 'libraryease',
    title: 'LibraryEase',
    subtitle: 'Public Library Information & Vintage Digital Platform',
    tagline: 'A Smarter Way to Discover, Explore and Experience Public Libraries',
    shortDescription: 'Full-stack platform digitizing public libraries with AI-powered book recommendations via Google Gemini, branch geolocation, digital cataloging, and a unique vintage aesthetic.',
    overview: 'LibraryEase modernizes municipal and public library systems that traditionally lack modern web accessibility. By blending a warm vintage library aesthetic with cutting-edge AI assistance, LibraryEase enables readers to search library catalogs, discover branch availability, track borrow history, and receive nuanced reading recommendations generated by Google Gemini AI.',
    category: 'Full-Stack',
    role: 'Full-Stack Developer & UI Architect',
    image: '/assets/projects/libraryease-preview.png',
    caseStudyImages: [
      '/assets/projects/libraryease-preview.png',
      '/assets/projects/libraryease-architecture.png',
      '/assets/projects/libraryease-flowchart.png',
      '/assets/projects/libraryease-emblem.png'
    ],
    tags: ['React', 'FastAPI', 'Python', 'Gemini AI', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/anjalivish05/LibraryEase-Vintage-and-Digital-Library.git',
    liveDemoUrl: 'https://github.com/anjalivish05/LibraryEase-Vintage-and-Digital-Library.git',
    featured: true,
    problem: 'Public and community libraries struggle to engage digital-native readers due to outdated paper-based registries, fragmented branch catalogs, and lack of conversational search capabilities.',
    solution: 'Built a full-stack digital hub connecting library branches with readers. Integrated Google Gemini AI to act as a virtual librarian offering thematic recommendations, created an intuitive book reservation system, and provided branch discovery features.',
    keyFeatures: [
      {
        title: 'Gemini AI Virtual Librarian',
        description: 'Conversational book discovery that recommends literature based on emotional tone, reading level, and thematic preferences.'
      },
      {
        title: 'Multi-Branch Cataloging & Inventory',
        description: 'Real-time book availability checks across physical library branches with shelf locations and borrow durations.'
      },
      {
        title: 'Vintage & Modern Editorial Design',
        description: 'Custom aesthetic marrying classic typography with modern layout mechanics and dark-mode elegance.'
      },
      {
        title: 'Borrow History & Automated Reminders',
        description: 'User dashboard displaying active loans, return countdowns, and renewal requests.'
      }
    ],
    architecture: {
      frontend: 'React with Vite, Tailwind CSS, Lucide Icons, and responsive design',
      backend: 'FastAPI (Python) providing lightweight, high-performance async REST endpoints',
      database: 'PostgreSQL / SQLite with SQLAlchemy ORM for book entities, branches, and loan tracking',
      apisAndAi: 'Google Gemini Pro API integration for natural language literary recommendations',
      deployment: 'Vercel / Render cloud deployment with CI pipeline'
    },
    myContribution: [
      'Architected end-to-end full-stack application from database schema design to responsive frontend UI.',
      'Integrated Google Gemini AI API with tailored prompt structures for contextual literature recommendations.',
      'Designed system architecture diagrams, entity flowcharts, and technical documentation.',
      'Authored the complete research paper analysis and technical requirements specification.'
    ],
    developmentChallenges: [
      {
        challenge: 'Handling API rate limits and response latency from LLM generation without degrading user experience.',
        solution: 'Implemented client-side optimistic loading skeletons and cached popular recommendations to reduce redundant API calls.'
      },
      {
        challenge: 'Balancing a distinctive vintage aesthetic with modern responsive UI and accessibility requirements.',
        solution: 'Combined editorial serif headers with clean sans-serif body typography and calibrated contrast ratios.'
      }
    ],
    resultsAndLearnings: [
      'Mastered full-stack API integration with modern Python asynchronous frameworks (FastAPI).',
      'Developed deep understanding of prompt engineering and structured JSON outputs with Gemini AI.',
      'Produced verified research documentation and complete system architecture diagrams.'
    ]
  },
  {
    id: 'manzil',
    title: 'Manzil',
    subtitle: 'AI-Powered Cafe Finder & Discovery Experience',
    tagline: 'Find Your Next Productive or Cozy Corner',
    shortDescription: 'Smart cafe discovery web application tailored for Mumbai students and professionals, offering purpose-based recommendations (Work, Study, Date, Friends) and Google Maps integration.',
    overview: 'Manzil is designed to eliminate the trial-and-error of finding the right spot to study, work remotely, or socialize. By organizing spots by budget, ambience, seating amenities, Wi-Fi availability, and purpose, Manzil helps users pinpoint their ideal cafe within seconds.',
    category: 'AI / Web',
    role: 'Full-Stack Developer & UI Designer',
    image: '/assets/projects/manzil-hero.png',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Google Maps API', 'Python', 'MySQL'],
    githubUrl: 'https://github.com/anjalivish05/Manzil---The-CafeFinder.git',
    liveDemoUrl: 'https://github.com/anjalivish05/Manzil---The-CafeFinder.git',
    featured: true,
    problem: 'Standard mapping applications list hundreds of cafes but fail to answer practical questions: Does this cafe have reliable Wi-Fi? Are there power outlets? Is it too noisy for remote meetings or studying? What is the average spend per person?',
    solution: 'Engineered a purpose-driven cafe discovery platform with curated categories (Work, Study, Date, Friends), budget filters, interactive Google Maps pinpoints, and smart matching logic.',
    keyFeatures: [
      {
        title: 'Purpose-Driven Quick Picks',
        description: 'Instant filters for Work-Friendly (Wi-Fi + Power Outlets), Quiet Study Zones, Romantic Dates, and Casual Hangouts.'
      },
      {
        title: 'Interactive Google Maps Integration',
        description: 'Geospatial markers with live distance calculations, directions, and locality highlights.'
      },
      {
        title: 'Budget-Tier Matching Matrix',
        description: 'Transparent average cost per head breakdowns with menu price tiering.'
      },
      {
        title: 'Responsive Mobile Exploration',
        description: 'Touch-optimized card deck navigation designed for on-the-go exploration.'
      }
    ],
    architecture: {
      frontend: 'HTML5, CSS3, Modern JavaScript with responsive Flexbox/Grid layouts',
      backend: 'Python / Node backend handling cafe dataset queries and filtering heuristics',
      database: 'MySQL relational database storing venue attributes, amenities, and user ratings',
      apisAndAi: 'Google Maps JavaScript API, Places API, and recommendation scoring algorithms',
      deployment: 'Static/Node web hosting with Git version control'
    },
    myContribution: [
      'Conceptualized and executed the UI/UX design, visual identity, and color palette.',
      'Developed interactive search, filter chips, and card layout with smooth CSS transitions.',
      'Implemented Google Maps API integration with custom markers and responsive info windows.',
      'Structured relational MySQL database schema for cafes, amenities, and pricing tiers.'
    ],
    developmentChallenges: [
      {
        challenge: 'Accurately representing multi-attribute search queries (e.g., Budget < 500 AND Wi-Fi available AND Quiet) without slow query times.',
        solution: 'Normalized MySQL indexing on frequent search dimensions and built client-side filtering for sub-millisecond response.'
      },
      {
        challenge: 'Maintaining map responsiveness on low-bandwidth mobile devices.',
        solution: 'Implemented lazy-loading of map embeds and debounced map panning events.'
      }
    ],
    resultsAndLearnings: [
      'Gained practical expertise with the Google Maps developer ecosystem.',
      'Deepened knowledge of consumer-facing UX heuristics and purpose-based filtering mechanisms.'
    ]
  },
  {
    id: 'transittwin',
    title: 'TransitTwin',
    subtitle: 'Smart Urban Transit Solution & Digital Simulation',
    tagline: 'Real-Time Telemetry & Predictive Fleet Visualization',
    shortDescription: 'Smart public transit digital twin concept providing live route simulation, vehicle telemetry, congestion hotspot detection, and passenger crowd estimation.',
    overview: 'TransitTwin explores how smart city infrastructure can modernize public bus and metro transit systems. By modeling transit fleets in a digital twin environment, the platform simulates vehicle arrival times, passenger density bottlenecks, and predictive delay rerouting to improve urban mobility.',
    category: 'Smart Systems',
    role: 'System Architect & Frontend Engineer',
    image: '/assets/projects/transittwin-preview.svg',
    tags: ['React', 'TypeScript', 'WebSockets', 'Python', 'Leaflet', 'Tailwind CSS'],
    githubUrl: 'https://github.com/anjalivish05',
    liveDemoUrl: 'https://github.com/anjalivish05',
    featured: true,
    problem: 'Urban commuters suffer from unpredictable public transport wait times and overcrowded vehicles, while municipal transit dispatchers struggle to monitor fleet bottlenecks in real time.',
    solution: 'Designed an interactive digital twin dashboard that visualizes active transit routes, vehicle telemetry, delay forecasts, and station crowding levels with interactive maps and telemetry graphs.',
    keyFeatures: [
      {
        title: 'Fleet Telemetry Dashboard',
        description: 'Real-time vehicle position markers, speed indicators, and battery/fuel consumption telemetry.'
      },
      {
        title: 'Congestion & Crowd Heatmaps',
        description: 'Station-by-station passenger density monitoring to anticipate boarding delays.'
      },
      {
        title: 'Predictive ETA Calculator',
        description: 'Dynamic arrival estimations adjusted for current corridor traffic and historical delay patterns.'
      },
      {
        title: 'Interactive Route Simulator',
        description: 'Visual route simulation allowing operators to test headway adjustments and skip-stop schedules.'
      }
    ],
    architecture: {
      frontend: 'React, TypeScript, Leaflet map integration, Tailwind CSS',
      backend: 'Python FastAPI with simulated telemetry feeds and WebSocket broadcast channels',
      database: 'PostgreSQL with PostGIS extensions for spatial queries',
      apisAndAi: 'Predictive traffic regression modeling and route optimization algorithms',
      deployment: 'Containerized deployment architecture'
    },
    myContribution: [
      'Designed technical system architecture and state model for digital transit twins.',
      'Created interactive telemetry visualization dashboard and station status cards.',
      'Built vector map layers and animated vehicle route tracks.'
    ],
    developmentChallenges: [
      {
        challenge: 'Rendering high-frequency coordinate updates without causing UI re-render bottlenecks.',
        solution: 'Utilized React canvas overlays and isolated sub-tree rendering for map vehicle markers.'
      }
    ],
    resultsAndLearnings: [
      'Explored digital twin principles and real-time geospatial data structures.',
      'Strengthened TypeScript proficiency and advanced reactive state synchronization.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    tagline: 'Core languages for algorithm design and systems development',
    skills: [
      { name: 'Java', badge: 'Core & OOP', featured: true },
      { name: 'Python', badge: 'FastAPI & AI', featured: true },
      { name: 'JavaScript', badge: 'ES6+ & Modern', featured: true },
      { name: 'C++', badge: 'Data Structures' },
      { name: 'TypeScript', badge: 'Type Safety' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    tagline: 'Crafting responsive, accessible, and high-performance interfaces',
    skills: [
      { name: 'React.js', badge: 'Component Architecture', featured: true },
      { name: 'Tailwind CSS', badge: 'Design Systems', featured: true },
      { name: 'HTML5 & CSS3', badge: 'Semantic & Layouts' },
      { name: 'JavaScript (DOM)', badge: 'Interactive UI' },
      { name: 'Framer Motion', badge: 'Micro-Interactions' },
      { name: 'Responsive Web Design', badge: 'Mobile-First' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    tagline: 'Designing reliable server architectures and RESTful interfaces',
    skills: [
      { name: 'Java Spring Boot', badge: 'Enterprise Services', featured: true },
      { name: 'Python FastAPI', badge: 'High-Perf REST APIs', featured: true },
      { name: 'RESTful APIs', badge: 'API Contracts', featured: true },
      { name: 'Node.js', badge: 'Full-Stack Runtime' },
      { name: 'Microservices Concept', badge: 'System Design' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    tagline: 'Relational data modeling, query optimization, and schema integrity',
    skills: [
      { name: 'PostgreSQL', badge: 'Relational DB', featured: true },
      { name: 'MySQL', badge: 'Structured Queries', featured: true },
      { name: 'SQL', badge: 'Complex Queries' },
      { name: 'Database Design', badge: 'Normalization & ERD' }
    ]
  },
  {
    id: 'design',
    title: 'Design & UI/UX',
    tagline: 'Bridging technical logic with visual refinement and usability',
    skills: [
      { name: 'Figma', badge: 'Prototyping & Design', featured: true },
      { name: 'UI/UX Design', badge: 'User-Centered' },
      { name: 'Wireframing', badge: 'Information Architecture' },
      { name: 'Design Systems', badge: 'Tokens & Components' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Workflows',
    tagline: 'Industry-standard developer environment and collaboration tooling',
    skills: [
      { name: 'Git & GitHub', badge: 'Version Control', featured: true },
      { name: 'VS Code', badge: 'Primary IDE' },
      { name: 'Postman', badge: 'API Testing' },
      { name: 'Vite', badge: 'Fast Bundling' },
      { name: 'AI-Assisted Dev', badge: 'LLMs & Productivity' }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon (SIH) 2025',
    organization: 'Ministry of Education & AICTE, Government of India',
    date: '2025',
    badge: 'National Hackathon Participant',
    type: 'Hackathon',
    description: 'Selected as participant in India\'s premier national innovation competition, collaborating with a multidisciplinary engineering team on real-world civic technology challenges.',
    bullets: [
      'Collaborated on problem statements addressing public sector modernization and civic digital accessibility.',
      'Iterated on rapid UI prototypes and full-stack backend integrations under time constraints.',
      'Demonstrated collaborative problem solving, code reviews, and architectural presentations.'
    ]
  },
  {
    id: 'aws-forage',
    title: 'AWS Solutions Architecture Job Simulation',
    organization: 'Amazon Web Services & Forage',
    date: 'September 2025',
    badge: 'Verified Credential',
    type: 'Certification',
    description: 'Completed practical simulation tasks designing highly available, cost-effective, and secure cloud infrastructure patterns on AWS.',
    bullets: [
      'Designed multi-tier web architectures balancing availability, fault tolerance, and security.',
      'Evaluated cost optimization and scalability strategies across Amazon EC2, S3, RDS, and VPCs.',
      'Analyzed decoupled microservice architectures using Amazon SQS and SNS.'
    ],
    certificateUrl: '/assets/aws-forage-certificate.pdf'
  },
  {
    id: 'ethglobal-mumbai',
    title: 'ETHGlobal Mumbai',
    organization: 'ETHGlobal',
    date: 'Participation',
    badge: 'Web3 & Distributed Systems',
    type: 'Hackathon',
    description: 'Participated in intense hackathon sessions exploring decentralized architectures, smart contract integration, and next-generation web applications.',
    bullets: [
      'Explored decentralized identity and client-side cryptography patterns.',
      'Engaged with global developers on scalable web infrastructure and modern protocol design.'
    ]
  }
];

export const GITHUB_REPOS: GitHubRepo[] = [
  {
    name: 'LibraryEase-Vintage-and-Digital-Library',
    description: 'Full-stack public library management and discovery platform powered by React, FastAPI, PostgreSQL, and Google Gemini AI.',
    url: 'https://github.com/anjalivish05/LibraryEase-Vintage-and-Digital-Library',
    language: 'JavaScript / Python',
    stars: 1,
    highlight: true
  },
  {
    name: 'HospitalFlow',
    description: 'Smart Hospital OPD Coordination Platform with dynamic patient tokens, real-time queues, and doctor status monitoring.',
    url: 'https://github.com/subhamstiwari24-dot/HospitalFlow',
    language: 'JavaScript / Python',
    stars: 2,
    highlight: true
  },
  {
    name: 'Manzil---The-CafeFinder',
    description: 'AI-assisted cafe discovery platform offering purpose-based recommendations, budget filtering, and Google Maps integration.',
    url: 'https://github.com/anjalivish05/Manzil---The-CafeFinder',
    language: 'Python / JavaScript',
    stars: 1,
    highlight: true
  },
  {
    name: 'My-Portfolio',
    description: 'Personal developer showcase exploring responsive design systems, semantic HTML, and creative interface layouts.',
    url: 'https://github.com/anjalivish05/My-Portfolio',
    language: 'HTML / CSS / JS',
    stars: 0
  }
];

export const BENTO_ITEMS = [
  {
    id: 'about',
    span: 'col-span-12 lg:col-span-7',
    type: 'about'
  },
  {
    id: 'expertise',
    span: 'col-span-12 sm:col-span-6 lg:col-span-5',
    type: 'expertise'
  },
  {
    id: 'exploring',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    type: 'exploring'
  },
  {
    id: 'github',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    type: 'github'
  },
  {
    id: 'hackathons',
    span: 'col-span-12 sm:col-span-6 lg:col-span-4',
    type: 'hackathons'
  }
];
