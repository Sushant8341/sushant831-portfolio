export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  stars: number;
  forks: number;
  demoUrl?: string;
  codeSnippet?: string;
  interactiveType?: 'kanban' | 'markdown' | 'canvas';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'languages';
  level: number; // 0 to 100
  yearsOfExperience: number;
  featured: boolean;
}

export interface TimelineEvent {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  bullets: string[];
  isCurrent?: boolean;
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'warning';
}

export interface UserMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
