export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  category: 'Full-Stack' | 'Frontend / UI' | 'AI / Web' | 'Smart Systems';
  role: string;
  image: string;
  caseStudyImages?: string[];
  tags: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  keyFeatures: { title: string; description: string }[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    apisAndAi: string;
    deployment: string;
  };
  myContribution: string[];
  developmentChallenges: { challenge: string; solution: string }[];
  resultsAndLearnings: string[];
}

export interface SkillItem {
  name: string;
  badge?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  badge: string;
  type: 'Hackathon' | 'Certification' | 'Academic';
  description: string;
  bullets: string[];
  certificateUrl?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  highlight?: boolean;
}
