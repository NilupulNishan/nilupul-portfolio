export const navItems = [
  { label: 'Home', to: '/', type: 'anchor', section: 'home' },
  { label: 'About', to: '/#about', type: 'anchor', section: 'about' },
  { label: 'Experience', to: '/#experience', type: 'anchor', section: 'experience' },
  { label: 'Projects', to: '/#projects', type: 'anchor', section: 'projects' },
  { label: 'Channels', to: '/channels', type: 'route' },
  { label: 'Afterlife', to: '/afterlife', type: 'route' },
  { label: 'Lab', to: '/lab', type: 'route' },
  { label: 'Contact', to: '/#contact', type: 'anchor', section: 'contact' },
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
      'Cosmos DB',
      'ChromaDB',
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

// Brands / content series shown on the /channels page. Each brand carries its own
// platform links. Leave a link `href` empty ('') and it renders as "coming soon".
export const brands = [
  {
    name: 'Nilupul Nishan - AI & Tech',
    category: 'English · Tech',
    description: 'AI/ML, tech, and creator insights in English across professional and social platforms.',
    links: [
      { type: 'instagram', href: 'https://www.instagram.com/nilupul_nishan' },
      { type: 'x', href: '' },
      { type: 'linkedin', href: 'https://www.linkedin.com/in/nilupulnishan/' },
    ],
  },
  {
    name: 'Nilupul Nishan - Real Talk',
    category: 'Sinhala · Motivation',
    description: 'Candid, relatable motivation in Sinhala - real-life moments turned into practical tips for Sri Lankan youth.',
    links: [
      { type: 'facebook', href: 'https://www.facebook.com/mr.nilupul.2k' },
      { type: 'tiktok', href: 'https://www.tiktok.com/@mrnilupul2k' },
    ],
  },
  {
    name: 'Magha Fitness',
    category: 'Fitness',
    description: 'Fitness brand - workouts, routines, and healthy-lifestyle content.',
    links: [
      { type: 'facebook', href: 'https://www.facebook.com/magha.fitzone' },
      { type: 'instagram', href: '' },
      { type: 'tiktok', href: '' },
    ],
  },
  {
    name: 'Emography',
    category: 'Photography',
    logo: '/brands/emography-black.jpg',
    description: 'Photography brand - capturing moments, emotion, and story through the lens.',
    links: [
      { type: 'facebook', href: 'https://www.facebook.com/emography25' },
      { type: 'portfolio', href: 'https://emography.pixieset.com/' },
    ],
  },
];

// Philanthropy / legacy work shown on the /afterlife page. Placeholder copy - edit freely.
export const afterlifeItems = [
  {
    title: 'Tech Education Outreach',
    description: 'Free coding and AI-literacy sessions for students and young creators in Sri Lanka.',
    tags: ['Education', 'Mentoring'],
  },
  {
    title: 'Community Giving',
    description: 'Supporting local causes and charitable initiatives that are close to my heart.',
    tags: ['Charity'],
  },
  {
    title: 'Creator for Good',
    description: 'Using my platforms to raise awareness for the people and issues that matter.',
    tags: ['Awareness'],
  },
];

// Funny / experimental things shown on the /lab page. Placeholder copy - edit freely.
export const labItems = [
  {
    title: 'Experiment #001',
    description: 'A half-baked idea I built purely for the joy of building it.',
    tags: ['WIP'],
  },
  {
    title: 'Silly Demo',
    description: 'Something that made me laugh while making it. No promises it works.',
    tags: ['Fun'],
  },
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

// Hero stats row (Outskill-style). Update values as they change.
export const heroStats = [
  { value: '3+', label: 'Years building software' },
  { value: '10+', label: 'Projects shipped' },
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
