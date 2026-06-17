export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Creator', href: '#playlist' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/NilupulNishan', type: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nilupulnishan', type: 'linkedin' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@mrnilupul2k', type: 'tiktok' },
  { label: 'Instagram', href: 'https://www.instagram.com/nilupul_nishan', type: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/mr.nilupul.2k', type: 'facebook' },
  { label: 'WhatsApp', href: 'https://wa.me/94712702279', type: 'whatsapp' },
  { label: 'Email', href: 'mailto:nilupulofficial2000@gmail.com', type: 'email' },
];

export const techCategories = [
  {
    title: 'AI / LLM Tools',
    items: [
      'Python',
      'Machine Learning',
      'OpenAI APIs',
      'AI Agents',
      'LlamaIndex',
      'LangChain',
      'LangGraph',
      'Model Integration',
      'Image Classification',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      'Java',
      'Spring Boot basics',
      'Node.js',
      'Express.js',
      'REST APIs',
      'API Integration',
    ],
  },
  {
    title: 'Mobile',
    items: [
      'Flutter',
    ],
  },
  {
    title: 'Database',
    items: [
      'MySQL',
      'PostgreSQL',
      'Firebase',
      'MongoDB',
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Vercel',
      'Azure',
      'Figma',
      'Postman',
      'VS Code',
      'Codex',
      'Claude',
    ],
  },
];

export const logoLoopItems = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Java',
  'Python',
  'Flutter',
  'Firebase',
  'PostgreSQL',
  'Figma',
  'GitHub',
  'Postman',
];

export const projects = [
  {
    title: 'Venomverse',
    description: 'Image-based snake, insect, and spider identification app using machine learning models.',
    tags: ['Flutter', 'Machine Learning', 'Image Classification', 'Firebase'],
    github: 'https://github.com/PulinduYK/VenomVerseApp',
    live: '',
    featured: true,
  },
  {
    title: 'Taxi Booking System',
    description: 'A software engineering project focused on taxi booking, ride management, and user-friendly transport workflows.',
    tags: ['Java', 'OOP', 'Database', 'System Design'],
    github: '',
    live: '',
    featured: false,
  },
  {
    title: 'Racketminster Database Project',
    description: 'A database design coursework project involving conceptual and logical data modeling, enhanced entity-relationship diagrams, and structured data requirements.',
    tags: ['Database Design', 'EERD', 'SQL', 'Data Modeling'],
    github: '',
    live: '',
    featured: false,
  },
  {
    title: 'Personal Portfolio',
    description: 'A personal portfolio website to showcase projects, skills, certifications, and creator collaboration paths.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    github: '',
    live: 'https://www.nilupulnishan.me/',
    featured: false,
  },
  {
    title: 'No More Hunger SDG Website',
    description: "An interactive website promoting the UN's Zero Hunger goal through educational web content.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: '',
    live: '',
    featured: false,
  },
  {
    title: 'Plane Seat Management System',
    description: 'A Java-based private aviation seat reservation and management system.',
    tags: ['Java', 'OOP', 'Seat Reservation'],
    github: '',
    live: '',
    featured: false,
  },
  {
    title: 'Academic Progression Prediction System',
    description: "A modular application to predict university students' academic progression from academic input data.",
    tags: ['Python'],
    github: '',
    live: '',
    featured: false,
  },
];

export const tiktokStats = {
  mode: 'manual',
  followers: 'ADD_CURRENT_FOLLOWERS',
  likes: 'ADD_CURRENT_LIKES',
  videos: 'ADD_CURRENT_VIDEO_COUNT',
};

export async function getOfficialTikTokStats() {
  // TODO: Integrate TikTok's official API after OAuth, scopes, and user authorization are available.
  return null;
}
