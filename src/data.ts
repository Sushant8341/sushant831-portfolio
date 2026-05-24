export const PERSONAL_INFO = {
  name: 'Sushant Gunisetti',
  title: 'Frontend Developer & Software Engineer',
  tagline: 'Building responsive, pixel-perfect user interfaces and highly functional React web applications.',
  email: 'sushant.gunisetti@gmail.com',
  github: 'https://github.com/sushant-gunisetti',
  linkedin: 'https://linkedin.com/in/sushant-gunisetti',
  avatar: '', // Auto-generates high-quality initials when empty
  bio: 'A passionate, self-taught web developer and software engineer specializing in Javascript, React, Tailwind CSS, and modern web architectures. Dedicated to clean coding standards, beautiful layouts, and responsive design systems.',
  currentLocation: 'India',
  openToWork: true,
  stats: []
};

export const SKILLS = [];

export const WORK_EXPERIENCE = [];

export const PROJECTS = [
  {
    id: 'proj1',
    title: 'Interactive Task Management system',
    description: 'A fully operating Kanban-style task workspace. Drag, transition, promote, and prioritize task cards dynamically through localized React callback chains and real-time state cycles.',
    tags: ['React', 'CSS Flexbox', 'Dynamic Columns', 'State Board'],
    category: 'Task Workspace',
    stars: 48,
    forks: 12,
    codeSnippet: 'const moveCard = (id, direction) => { ... }',
    interactiveType: 'kanban'
  },
  {
    id: 'proj2',
    title: 'Dynamic E-commerce Web App',
    description: 'An immersive shopping cart and order catalog experience. Select premium catalog goods, apply live discount coupon systems, adjust quantity matrices, and simulate checkout invoice receipts.',
    tags: ['E-Commerce', 'State Management', 'Cart Engine', 'Frictionless UI'],
    category: 'E-Commerce system',
    stars: 62,
    forks: 15,
    codeSnippet: 'const applyDiscount = (code) => { ... }',
    interactiveType: 'ecommerce'
  }
];
