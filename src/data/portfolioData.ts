import { Project, SkillCategory, Achievement, GitHubRepo } from '../types';

export const PERSONAL_INFO = {
  name: 'Anjali Vishwakarma',
  fullName: 'Anjali Manoj Vishwakarma',
  brand: 'ANJALI',
  role: 'Full-Stack Developer',
  identity: 'Full-Stack Developer | Creative Developer | Technology Enthusiast',
  tagline: 'Building thoughtful digital experiences.',
  about: `I'm Anjali Manoj Vishwakarma, an Information Technology engineering student passionate about building thoughtful digital experiences through technology and creativity. Constantly learning, experimenting with modern architectures, and developing practical solutions to real-world challenges.`,
  philosophy: `Engineering is not just about making things function—it's about making them thoughtful, dependable, and intuitive. Whether designing hospital queue coordination, public library discovery platforms, or interactive maps, I build with attention to system architecture and user empathy.`,
  location: 'Mumbai, India',
  email: 'anjali13anuj@gmail.com',
  phone: '+91 9987406608',
  linkedin: 'https://www.linkedin.com/in/anjali-vishwakarma-736392382/',
  github: 'https://github.com/anjalivish05',
  x: 'https://x.com/anjali50568',
  resumeUrl: '/resume.pdf',
  status: 'Open for Opportunities',
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
    id: 'movesmart',
    title: 'MoveSmart',
    subtitle: 'Smart Mobility & Urban Transportation',
    role: 'Full Stack Developer',
    year: '2024',
    tagline: 'Incident Reporting, Interactive Mapping & Structured Intelligence',
    shortDescription: 'A smart mobility platform designed to support urban transportation management through incident reporting, interactive mapping and structured incident information.',
    overview: 'MoveSmart bridges commuters and municipal traffic command through real-time hazard reporting, geotagged GPS, and photographic incident verification across highway corridors and arterial urban connectors.',
    category: 'Smart Systems',
    image: '/assets/projects/movesmart-inner.png',
    deploymentUrl: 'https://move-smart-five.vercel.app',
    liveDemoUrl: 'https://move-smart-five.vercel.app',
    githubUrl: 'https://github.com/anjalivish05',
    tags: ['React', 'TypeScript', 'Java Spring Boot', 'PostgreSQL', 'Maps Integration', 'Tailwind CSS'],
    featured: true,
    problem: 'Urban commuters and traffic management authorities suffer from delayed road incident awareness, uncoordinated hazard clearing, and lack of verified photographic evidence.',
    solution: 'Engineered an interactive incident intelligence portal combining Leaflet mapping, Spring Boot microservices, geotagged GPS reporting, and live status dispatch workflows.',
    keyFeatures: [
      {
        title: 'Geospatial Incident Reporting',
        description: 'Real-time road hazard logging with geotagged GPS coordinates and photographic documentation.'
      },
      {
        title: 'Interactive Operations Map',
        description: 'Live interactive mapping interface visualizing incidents, road congestion, and clearance progress.'
      },
      {
        title: 'Structured Tracking & Dispatch',
        description: 'Unique incident tracking IDs allowing citizens and dispatchers to monitor resolution stages.'
      }
    ],
    architecture: {
      frontend: 'React, TypeScript, Leaflet Maps, Tailwind CSS, Vite',
      backend: 'Java Spring Boot RESTful microservices for incident processing',
      database: 'PostgreSQL with spatial indexing for location-based queries',
      apisAndAi: 'Map integration, telemetry calculation, and automated status alerts',
      deployment: 'Vercel / Cloud Container Deployment'
    },
    myContribution: [
      'Engineered the responsive citizen and command center frontend interfaces in React and TypeScript.',
      'Integrated interactive geospatial mapping with custom marker layers and real-time state updates.',
      'Built structured incident reporting forms with client-side validation and photo attachments.'
    ],
    developmentChallenges: [
      {
        challenge: 'Rendering high-density incident markers without map panning stutter on mobile screens.',
        solution: 'Implemented marker clustering and viewport-bounded query debouncing.'
      }
    ],
    resultsAndLearnings: [
      'Deepened proficiency in geospatial UI engineering and Java Spring Boot API integration.',
      'Delivered an intuitive civic intelligence dashboard tested across multiple device form factors.'
    ]
  },
  {
    id: 'stealthpay',
    title: 'Stealth Pay',
    subtitle: 'Privacy-focused Payments',
    role: 'Web3 & Full Stack Developer',
    year: '2026',
    highlight: 'Developed and submitted to ETHGlobal Mumbai (November 2026).',
    tagline: 'Resolving the Public Ledger Privacy Paradox on Ethereum',
    shortDescription: 'A blockchain-based privacy payment concept exploring stealth-address technology to improve payment privacy and reduce public exposure of recipient wallet activity.',
    overview: 'Stealth Pay resolves the public blockchain privacy paradox where wallet addresses expose entire transaction histories. Utilizing an ERC-5564 dual-key architecture (Viewing key and Spending key), senders interact with ephemeral private keys to generate fresh, single-use, deterministic stealth addresses via ECDH secrets, ensuring zero traceable link on-chain to the recipient.',
    category: 'Web3 / Privacy',
    image: '/assets/projects/stealthpay-inner.png',
    deploymentUrl: 'https://stealth-pay-team1.vercel.app',
    liveDemoUrl: 'https://stealth-pay-team1.vercel.app',
    showcaseUrl: 'https://ethglobal.com/showcase/stealth-pay-xtdtj',
    githubUrl: '',
    isComingSoonSource: true,
    tags: ['Web3', 'Blockchain', 'Smart Contracts', 'ERC-5564', 'React', 'TypeScript'],
    featured: true,
    problem: 'Public blockchains enforce full transparency by design, exposing account balances and transaction histories to malicious tracking, address poisoning, and targeted threats.',
    solution: 'Developed an intuitive web application implementing ERC-5564 dual-key stealth addresses with a real-time cryptographic derivation stepper, scanning engine, and one-click sweep modal.',
    keyFeatures: [
      {
        title: 'Stealth Meta-Address Generator',
        description: 'Deterministic derivation of viewing and spending keypairs with 1-click copy and QR code export.'
      },
      {
        title: 'Real-time Cryptographic Stepper',
        description: 'Live UI visualization of ephemeral key generation, ECDH shared secret derivation, and stealth address computation.'
      },
      {
        title: 'Automated Payment Scanner',
        description: 'Lightweight client-side parsing of announcer contract logs using viewing keys without compromising private spending authority.'
      },
      {
        title: 'One-Click Funds Sweeper',
        description: 'Direct settlement to recipient-specified clean destination wallets in a single transaction.'
      }
    ],
    architecture: {
      frontend: 'React, TypeScript, RainbowKit/Wagmi, Tailwind CSS',
      backend: 'Smart contracts implementing ERC-5564 standard on Ethereum testnets',
      database: 'Client-side local storage indexing for detected stealth payments',
      apisAndAi: 'Client-side elliptic curve cryptography (ECDH on secp256k1 curve)',
      deployment: 'IPFS / Vercel Web3 hosting'
    },
    myContribution: [
      'Designed the complete frontend interface specification, visual identity, and component design system.',
      'Built the interactive cryptographic stepper demonstrating step-by-step mathematical derivation.',
      'Implemented the receiver dashboard and payment scanner user flow for hackathon demonstration.'
    ],
    developmentChallenges: [
      {
        challenge: 'Translating complex elliptic curve math into an intuitive visual stepper for non-technical users.',
        solution: 'Engineered an interactive state machine with progress indicators and simplified cryptographic explanations.'
      }
    ],
    resultsAndLearnings: [
      'Mastered ERC-5564 privacy standards and dual-key cryptographic workflows.',
      'Deepened experience designing high-stakes Web3 interfaces requiring maximum clarity and security assurances.'
    ]
  },
  {
    id: 'royaledge',
    title: 'Royal Edge Enterprises',
    subtitle: 'B2B Business Catalogue & Enquiry Platform',
    label: 'FREELANCE PROJECT',
    role: 'Full Stack Developer',
    year: '2024',
    tagline: 'Precision Fusible Interlining & Backing Materials for Apparel Excellence',
    shortDescription: 'A B2B manufacturing catalogue and enquiry platform designed to help customers explore embroidery backing materials and submit product enquiries for private quotations.',
    overview: 'Royal Edge Enterprises is a commercial platform engineered to streamline B2B wholesale transactions. It delivers a modern product showcase, custom quotation builder, order inquiry workflows, and administrative back-office management to eliminate manual paperwork and enhance client acquisition.',
    category: 'Full-Stack',
    image: '/assets/projects/royaledge-inner.png',
    deploymentUrl: 'https://royal-edge-enterprise-v2.vercel.app',
    liveDemoUrl: 'https://royal-edge-enterprise-v2.vercel.app',
    githubUrl: 'https://github.com/anjalivish05',
    tags: ['React', 'TypeScript', 'Java Spring Boot', 'PostgreSQL', 'Tailwind CSS'],
    featured: true,
    problem: 'Traditional B2B wholesale procurement involves slow manual quoting, disconnected product sheets, and delayed inquiry handling that reduces customer conversion.',
    solution: 'Engineered a modern web portal allowing wholesale buyers to browse categorized products, configure quotation requests, and submit structured procurement inquiries directly to administrators.',
    keyFeatures: [
      {
        title: 'Dynamic Product Catalog',
        description: 'Searchable inventory with specifications, volume pricing brackets, and high-resolution galleries.'
      },
      {
        title: 'Quotation Request Engine',
        description: 'Step-by-step RFQ submission with customized parameter selection and quantity tiers.'
      },
      {
        title: 'Customer Inquiry Portal',
        description: 'Structured inquiry routing with automated acknowledgment and status tracking.'
      },
      {
        title: 'Administrative Order Review',
        description: 'Secure back-office management for processing customer requests and order dispatching.'
      }
    ],
    architecture: {
      frontend: 'React, TypeScript, Tailwind CSS, Lucide React, Vite',
      backend: 'Java Spring Boot / RESTful APIs for catalog indexing and quotation ingestion',
      database: 'Structured PostgreSQL storage for catalog items and customer inquiries',
      apisAndAi: 'Automated quotation generation and structured email notification webhooks',
      deployment: 'Vercel / Cloud hosting'
    },
    myContribution: [
      'Designed the UI architecture, component hierarchy, and design tokens in Figma and code.',
      'Implemented interactive catalog filtering, product modal views, and multi-step quotation forms.',
      'Developed responsive layouts optimized for desktop buyers and mobile procurement agents.'
    ],
    developmentChallenges: [
      {
        challenge: 'Managing dynamic pricing logic based on tiered bulk order quantities without UI latency.',
        solution: 'Created memoized calculation hooks that update subtotal estimates client-side instantaneously.'
      }
    ],
    resultsAndLearnings: [
      'Delivered a commercial production solution meeting real-world business requirements.',
      'Strengthened expertise in client consulting, scope definition, and end-to-end frontend architecture.'
    ]
  },
  {
    id: 'libraryease',
    title: 'LibraryEase',
    subtitle: 'Public Library Management & Digital Services',
    role: 'Full Stack Developer',
    year: '2024',
    tagline: 'Your Gateway to Knowledge — Public Library Management & Digital Services',
    shortDescription: 'A modern public library management system and digital service platform connecting classical book preservation with intelligent discovery, catalogue search, and branch navigation.',
    overview: 'LibraryEase modernizes municipal and public library systems that traditionally lack modern web accessibility. By blending a warm vintage library aesthetic with cutting-edge AI assistance, LibraryEase enables readers to search library catalogs, discover branch availability, track borrow history, and receive nuanced reading recommendations generated by Google Gemini AI.',
    category: 'Full-Stack',
    image: '/assets/projects/libraryease-inner.png',
    caseStudyImages: [
      '/assets/projects/libraryease-inner.png',
      '/assets/projects/libraryease-architecture.png',
      '/assets/projects/libraryease-flowchart.png',
      '/assets/projects/libraryease-emblem.png'
    ],
    deploymentUrl: 'https://libraryease-frontend.vercel.app',
    liveDemoUrl: 'https://libraryease-frontend.vercel.app',
    githubUrl: 'https://github.com/anjalivish05/LibraryEase-Vintage-and-Digital-Library.git',
    tags: ['React', 'Python', 'Leaflet', 'JavaScript', 'HTML5', 'CSS3'],
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
      frontend: 'React with Vite, Leaflet, Tailwind CSS, Lucide Icons, and responsive design',
      backend: 'Python FastAPI providing lightweight, high-performance async REST endpoints',
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
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    tagline: 'Programming languages used for problem-solving, application development and software engineering.',
    skills: [
      { name: 'Java', badge: 'Core & OOP', featured: true },
      { name: 'Python', badge: 'FastAPI & Scripting', featured: true },
      { name: 'C++', badge: 'Data Structures' },
      { name: 'JavaScript', badge: 'ES6+ & Modern', featured: true }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    tagline: 'Building responsive, accessible and interactive web experiences.',
    skills: [
      { name: 'React.js', badge: 'Component Architecture', featured: true },
      { name: 'TypeScript', badge: 'Type Safety', featured: true },
      { name: 'HTML5', badge: 'Semantic Structure' },
      { name: 'CSS3', badge: 'Modern Styling & Grid' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    tagline: 'Developing backend services, APIs and application logic.',
    skills: [
      { name: 'Python', badge: 'Core Language', featured: true },
      { name: 'FastAPI', badge: 'Async APIs', featured: true },
      { name: 'Java', badge: 'Core & OOP' },
      { name: 'Spring Boot', badge: 'Enterprise Services', featured: true },
      { name: 'REST APIs', badge: 'Contract Architecture', featured: true }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    tagline: 'Working with relational databases, queries and structured data.',
    skills: [
      { name: 'MySQL', badge: 'Relational DB', featured: true },
      { name: 'PostgreSQL', badge: 'ACID Transactions', featured: true },
      { name: 'SQL', badge: 'Complex Queries' }
    ]
  },
  {
    id: 'design',
    title: 'UI/UX & Design',
    tagline: 'Designing intuitive interfaces, creating wireframes and prototypes, and improving digital user experiences.',
    skills: [
      { name: 'Figma', badge: 'Primary Tool', featured: true },
      { name: 'UI Design', badge: 'Visual Systems', featured: true },
      { name: 'UX Design', badge: 'User-Centered' },
      { name: 'Wireframing', badge: 'Information Flow' },
      { name: 'Prototyping', badge: 'Interactive Mockups' },
      { name: 'Responsive Design', badge: 'Cross-Device' }
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    tagline: 'Tools for development workflows, version control, API testing and team workflows.',
    skills: [
      { name: 'Git', badge: 'Version Control', featured: true },
      { name: 'GitHub', badge: 'Version Control', featured: true },
      { name: 'VS Code', badge: 'Primary IDE' },
      { name: 'Postman', badge: 'API Testing' }
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
    description: 'Selected as participant in India\'s premier national innovation competition, partnering with a multidisciplinary engineering team on real-world civic technology challenges.',
    bullets: [
      'Worked on problem statements addressing public sector modernization and civic digital accessibility.',
      'Iterated on rapid UI prototypes and full-stack backend integrations under time constraints.',
      'Demonstrated structured problem solving, code reviews, and architectural presentations.'
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
    date: 'November 5–7, 2026',
    badge: 'Hackathon Participation',
    type: 'Hackathon Participation',
    description: 'Participated in ETHGlobal Mumbai, an official ETHGlobal event featuring coding, workshops, keynotes and technical talks. Submitted the project Stealth Pay as part of the event.',
    project: 'Stealth Pay',
    certificateUrl: '/assets/ethglobal-mumbai-certificate.jpg',
    showcaseUrl: 'https://ethglobal.com/showcase/stealth-pay-xtdtj',
    bullets: [
      'Submitted privacy-focused Web3 project Stealth Pay implementing ERC-5564 stealth addresses.',
      'Engaged in technical keynotes, workshops, and protocol deep-dives with global Ethereum contributors.'
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
    name: 'royal-edge-enterprises',
    description: 'B2B commercial wholesale platform with custom quotation builder, order inquiry portal, and administrative workflows.',
    url: 'https://github.com/anjalivish05',
    language: 'TypeScript / React',
    stars: 2,
    highlight: true
  },
  {
    name: 'StealthPay-Protocol',
    description: 'ERC-5564 dual-key stealth address privacy protocol with interactive cryptographic stepper and automated scanner.',
    url: 'https://github.com/anjalivish05',
    language: 'TypeScript / Web3',
    stars: 1,
    highlight: true
  },
  {
    name: 'Anjali-Vishwakarma---live-Portfolio-',
    description: 'Personal developer showcase exploring responsive design systems, semantic HTML, and creative interface layouts.',
    url: 'https://github.com/anjalivish05/Anjali-Vishwakarma---live-Portfolio-',
    language: 'TypeScript / React',
    stars: 1
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
