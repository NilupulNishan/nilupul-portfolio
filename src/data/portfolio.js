export const navItems = [
  { label: 'Home', to: '/', type: 'anchor', section: 'home' },
  { label: 'About', to: '/#about', type: 'anchor', section: 'about' },
  { label: 'Experience', to: '/#experience', type: 'anchor', section: 'experience' },
  { label: 'Projects', to: '/projects', type: 'route' },
  { label: 'Afterlife', to: '/afterlife', type: 'route' },
  { label: 'Lab', to: '/lab', type: 'route' },
  { label: 'Contact', to: '/contact', type: 'route' },
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

// Six cards, ordered strongest-first, each sized to fill its grid cell. Every
// chip maps to something on the CV - see techIconMap in sections.jsx for icons.
export const techCategories = [
  {
    title: 'AI & Agents',
    items: [
      'Agentic Workflows',
      'RAG Systems',
      'LangChain',
      'LangGraph',
      'LlamaIndex',
      'Hugging Face',
      'OpenAI APIs',
      'Claude',
    ],
  },
  {
    title: 'ML & Data Science',
    items: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Power BI',
    ],
  },
  {
    title: 'Web & APIs',
    items: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'FastAPI',
      'REST APIs',
      'Postman',
      'UI/UX',
      'Figma',
    ],
  },
  {
    title: 'Databases',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Firebase',
      'Cosmos DB',
      'ChromaDB',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'Azure',
      'AWS',
      'Cloudera',
      'Docker',
      'Vercel',
      'Git',
      'GitHub',
      'Jira',
    ],
  },
  {
    title: 'Mobile & Embedded',
    items: [
      'Android Studio',
      'Arduino',
      'Raspberry Pi',
    ],
  },
];

export const logoLoopItems = [
  'Python',
  'LangChain',
  'PyTorch',
  'Hugging Face',
  'React',
  'Tailwind CSS',
  'FastAPI',
  'PostgreSQL',
  'Firebase',
  'Docker',
  'Azure',
  'GitHub',
];

// Brands / content series shown on the /projects page. Each brand carries its own
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
    title: 'Magha Philanthropy',
    description: 'Charitable initiatives under the Magha name — giving back to the communities and causes that matter most.',
    tags: ['Charity', 'Community'],
  },
  {
    title: 'Tech Education Outreach',
    description: 'Free coding and AI-literacy sessions for students and young creators in Sri Lanka.',
    tags: ['Education', 'Mentoring'],
  },
  {
    title: 'Blood Donor',
    description: 'A regular blood donor — showing up for people in need, one donation at a time.',
    tags: ['Health', 'Giving'],
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

// Ordered most recent first - CaseStudies paginates straight through the array, so
// the order here is the order on the page.
//
// The descriptions below restate what each project *is*, drawn from its title and
// stack. They deliberately claim no results, metrics or impact, because none were
// supplied - anything of that kind has to come from Nilupul rather than be inferred.
export const projects = [
  {
    title: 'FaceMark LK',
    period: 'Present',
    description:
      'Privacy-first face attendance system with liveness detection, so a photo or a replayed video cannot be used to mark attendance.',
    tags: [
      'Python', 'FastAPI', 'SQLAlchemy', 'OpenCV', 'MediaPipe',
      'ONNX Runtime', 'ArcFace', 'NumPy', 'React', 'TypeScript', 'Docker',
    ],
    github: 'https://github.com/NilupulNishan/liveness-face-attendance-lk',
    live: '',
  },
  {
    title: 'Log Classification With Hybrid Classification Framework',
    period: 'June 2025',
    description:
      'Log message classifier that combines sentence-embedding models with an LLM served through Groq, exposed over a FastAPI service.',
    tags: ['Python', 'pandas', 'scikit-learn', 'sentence-transformers', 'FastAPI', 'Groq'],
    github: 'https://github.com/NilupulNishan/nlp_log_classification',
    live: '',
  },
  {
    title: 'Sales Insight Prediction',
    period: 'April 2025',
    description:
      'Predictive analysis of the Kaggle Superstore dataset, with modelling in scikit-learn and the findings reported through Power BI.',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Seaborn', 'NumPy', 'Power BI'],
    github: 'https://github.com/NilupulNishan/Sales-Insight-Prediction',
    live: '',
  },
  {
    title: 'Analysing and Visualising Wine Data',
    period: 'Dec 2024',
    description:
      'Exploratory analysis and interactive dashboards over a wine dataset, built and presented for PyData Sri Lanka.',
    tags: ['Python', 'Pandas', 'Plotly Dash', 'Hugging Face', 'Transformers'],
    github: 'https://github.com/Vimukthixsandeepa/Analyzing-and-Visualizing-Wine-Data',
    live: '',
  },
  {
    title: 'WAITER_117',
    period: 'Nov 2024',
    description:
      'Smart waiter robot for restaurant service, driven by an Arduino control loop with IoT connectivity.',
    tags: ['Arduino', 'PDE Controlling', 'IoT', 'C++'],
    github: 'https://github.com/NilupulNishan/Waiter_117-v1',
    live: '',
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
