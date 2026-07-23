import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaArrowUp,
  FaAws,
  FaBrain,
  FaCode,
  FaCodeBranch,
  FaCubes,
  FaDatabase,
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaGraduationCap,
  FaImage,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMicrosoft,
  FaMoon,
  FaPlug,
  FaRobot,
  FaStar,
  FaSun,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  SiClaude,
  SiCoursera,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { DiJava, DiPython } from 'react-icons/di';
import { VscAzure, VscVscode } from 'react-icons/vsc';
import profilePic from './assets/profile/profile_pic2.jpg';
import certifications from './data/certifications.json';
import {
  heroStats,
  navItems,
  projects,
  socialLinks,
  techCategories,
} from './data/portfolio';

const promotionTypes = [
  'Sponsored Post',
  'Music Promotion',
  'Product Promotion',
  'Brand Collaboration',
  'Shoutout',
  'Content Partnership',
  'Other',
];

const githubContributionSummary = {
  username: 'NilupulNishan',
};

const projectDesktopPageSize = 3;
const projectMobileBatchSize = 2;

const sectionToNavMap = {
  home: '#home',
  about: '#about',
  education: '#about',
  experience: '#experience',
  'tech-stack': '#about',
  projects: '#projects',
  'featured-project': '#projects',
  github: '#projects',
  certificates: '#projects',
  certifications: '#projects',
  contact: '#contact',
};

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  facebook: FaFacebookSquare,
  whatsapp: FaWhatsapp,
};

const techIconMap = {
  Python: DiPython,
  'Machine Learning': FaBrain,
  'OpenAI APIs': SiOpenai,
  'AI Agents': FaRobot,
  LlamaIndex: FaBrain,
  LangChain: FaArrowRight,
  LangGraph: SiGraphql,
  'Model Integration': FaCubes,
  'Image Classification': FaImage,
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  Java: DiJava,
  'Spring Boot basics': SiSpringboot,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': SiOpenapiinitiative,
  'API Integration': FaPlug,
  Flutter: SiFlutter,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  'Cosmos DB': VscAzure,
  ChromaDB: FaDatabase,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Vercel: SiVercel,
  Azure: FaMicrosoft,
  Figma: SiFigma,
  Postman: SiPostman,
  'VS Code': VscVscode,
  Codex: FaRobot,
  Claude: SiClaude,
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileFadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: 'easeOut',
    },
  },
};

const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const mobileHeroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.03,
    },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const mobileCardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0,
    },
  },
};

const heroWordReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: 'easeOut',
    },
  },
};

const mobileHeroWordReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: 'easeOut',
    },
  },
};

function useLeanMotion() {
  const [leanMotion, setLeanMotion] = useState(() => (
    window.matchMedia('(max-width: 720px), (pointer: coarse)').matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px), (pointer: coarse)');
    const handleChange = () => setLeanMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return leanMotion;
}

function Reveal({ children, className = '' }) {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className={className}
      variants={leanMotion ? mobileFadeUp : fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: leanMotion ? '-16px' : '-80px', amount: leanMotion ? 0.15 : 0.18 }}
    >
      {children}
    </Motion.div>
  );
}

function StaggerContainer({ children, className = '' }) {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className={className}
      variants={leanMotion ? mobileCardStagger : cardStagger}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: leanMotion ? '-16px' : '-70px', amount: leanMotion ? 0.15 : 0.16 }}
    >
      {children}
    </Motion.div>
  );
}

function MotionCard({ children, className = '' }) {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className={className}
      variants={leanMotion ? mobileFadeUp : fadeUp}
      whileHover={leanMotion || reduceMotion ? undefined : {
        y: -4,
      }}
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      transition={{ duration: leanMotion ? 0.18 : 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function SectionHeader({ eyebrow, title, children }) {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  return (
    <Motion.div
      className="section-header"
      variants={leanMotion ? mobileFadeUp : fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: leanMotion ? '-16px' : '-80px', amount: leanMotion ? 0.15 : 0.25 }}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <span>{children}</span> : null}
    </Motion.div>
  );
}

function FormError({ id, children }) {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  return (
    <Motion.small
      id={id}
      className="form-error"
      initial={reduceMotion ? false : { opacity: 0, y: leanMotion ? -3 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.14 : 0.18, ease: 'easeOut' }}
    >
      {children}
    </Motion.small>
  );
}

function SectionPagination({
  label,
  currentPage = 0,
  totalPages = 1,
  onPrevious,
  onNext,
  onPageChange,
  isMobileShowMore = false,
  visibleCount = 0,
  totalItems = 0,
  initialVisibleCount = 0,
  onShowMore,
  onShowLess,
  showMoreLabel = 'Show More',
  showLessLabel = 'Show Less',
}) {
  if (isMobileShowMore) {
    const canShowMore = visibleCount < totalItems;
    const canShowLess = visibleCount > initialVisibleCount;

    if (!canShowMore && !canShowLess) {
      return null;
    }

    return (
      <div className="section-pagination section-pagination-mobile" aria-label={`${label} controls`}>
        {canShowMore ? (
          <button className="pagination-button pagination-button-primary" type="button" onClick={onShowMore}>
            {showMoreLabel}
          </button>
        ) : null}
        {canShowLess ? (
          <button className="pagination-button pagination-button-secondary" type="button" onClick={onShowLess}>
            {showLessLabel}
          </button>
        ) : null}
      </div>
    );
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="section-pagination" aria-label={`${label} pages`}>
      <button className="pagination-button" type="button" onClick={onPrevious} disabled={currentPage === 0}>
        Previous
      </button>
      <div className="pagination-pages" aria-label={`${label} page numbers`}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index ? 'active-page' : ''}
            type="button"
            onClick={() => onPageChange?.(index)}
            aria-label={`Show ${label.toLowerCase()} page ${index + 1}`}
            aria-current={currentPage === index ? 'page' : undefined}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button className="pagination-button" type="button" onClick={onNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </nav>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('#home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme-v2') || 'dark');
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme-v2', theme);
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#08090a' : '#ffffff');
    }
  }, [theme]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleOutsidePointerDown = (event) => {
      const mobilePanel = document.getElementById('mobile-navigation');
      const menuButton = document.querySelector('.menu-button');

      if (!mobilePanel?.contains(event.target) && !menuButton?.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown, true);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown, true);
  }, [closeMobileMenu, open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);

      if (!isHome) {
        return;
      }

      const sectionTargets = Array.from(document.querySelectorAll('section[id]'))
        .filter((section) => sectionToNavMap[section.id]);

      const documentHeight = document.documentElement.scrollHeight;
      const bottomDistance = documentHeight - (window.scrollY + window.innerHeight);

      if (bottomDistance < 24) {
        setActiveNav('#contact');
        return;
      }

      const contactSection = document.querySelector('#contact');
      if (contactSection?.getBoundingClientRect().top <= window.innerHeight * 0.72) {
        setActiveNav('#contact');
        return;
      }

      const marker = window.innerHeight * 0.45;
      const currentSectionId = sectionTargets.reduce((current, section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker) {
          return section.id;
        }
        return current;
      }, '');

      if (!currentSectionId) {
        return;
      }

      const mappedNav = sectionToNavMap[currentSectionId];
      if (mappedNav) {
        setActiveNav(mappedNav);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const goToSection = useCallback((section) => {
    closeMobileMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      navigate(section === 'home' ? '/' : `/#${section}`, { replace: true });
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  }, [closeMobileMenu, location.pathname, navigate]);

  const renderNavItem = (item, isMobile) => {
    if (item.type === 'route') {
      return (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) => (isActive ? 'active-nav' : '')}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          <span className="nav-link-label">{item.label}</span>
        </NavLink>
      );
    }

    const isActive = isHome && activeNav === `#${item.section}`;
    return (
      <a
        key={item.to}
        href={item.to}
        className={isActive ? 'active-nav' : ''}
        onClick={(event) => {
          event.preventDefault();
          goToSection(item.section);
        }}
      >
        <span className="nav-link-label">{item.label}</span>
      </a>
    );
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink className="brand-mark" to="/" aria-label="Nilupul Nishan home" onClick={closeMobileMenu}>
            <span>Nilupul Nishan</span>
          </NavLink>

          <div className="nav-links">
            {navItems.map((item) => renderNavItem(item, false))}
          </div>

          <div className="nav-actions">
            <a
              className="button button-secondary nav-cta"
              href="/#contact"
              onClick={(event) => {
                event.preventDefault();
                goToSection('contact');
              }}
            >
              Get in touch
            </a>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
            </button>

            <button
              className={`menu-button ${open ? 'is-open' : ''}`}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <Motion.div
            className="mobile-menu-layer"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.14 : 0.18, ease: 'easeOut' }}
            onPointerDown={closeMobileMenu}
            onClick={closeMobileMenu}
          >
            <Motion.div
              id="mobile-navigation"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : leanMotion ? { opacity: 0, y: -8 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : leanMotion ? { opacity: 0, y: -8 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.18 : 0.22, ease: 'easeOut' }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item) => renderNavItem(item, true))}
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();
  const heroImageMotion = reduceMotion
    ? false
    : leanMotion
      ? { opacity: 0, y: 14, scale: 0.99, filter: 'blur(6px)' }
      : { opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' };
  const heroImageTransition = reduceMotion
    ? { duration: 0 }
    : leanMotion
      ? {
        opacity: { duration: 0.38, ease: 'easeOut', delay: 0.08 },
        scale: { duration: 0.38, ease: 'easeOut', delay: 0.08 },
        y: { duration: 0.38, ease: 'easeOut', delay: 0.08 },
        filter: { duration: 0.38, ease: 'easeOut', delay: 0.08 },
      }
      : {
      opacity: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
      scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
      y: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
      filter: { duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
    };

  return (
    <section id="home" className="hero-section">
      <div className="page-shell">
        <div className="hero-layout">
          <Motion.div className="hero-copy" variants={leanMotion ? mobileHeroStagger : heroStagger} initial={reduceMotion ? false : 'hidden'} animate="visible">
            <Motion.p className="eyebrow" variants={leanMotion ? mobileFadeUp : fadeUp}>
              AI / ML Engineer &middot; Entrepreneur &middot; Content Creator
            </Motion.p>
            <Motion.h1 variants={leanMotion ? mobileHeroStagger : heroStagger} aria-label="Nilupul Nishan">
              {['Nilupul', 'Nishan'].map((word) => (
                <Motion.span
                  key={word}
                  className="hero-name-word"
                  variants={leanMotion ? mobileHeroWordReveal : heroWordReveal}
                  aria-hidden="true"
                >
                  {word}
                </Motion.span>
              ))}
            </Motion.h1>
            <Motion.p className="hero-description" variants={leanMotion ? mobileFadeUp : fadeUp}>
              I build intelligent, user-focused software across AI, web, mobile, and full-stack development — from Sri Lanka to wherever the work matters.
            </Motion.p>

            <Motion.div className="hero-actions" variants={leanMotion ? mobileFadeUp : fadeUp}>
              <a className="button button-primary" href="#projects">
                View Projects <FaArrowRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className="hero-portrait"
            initial={heroImageMotion}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={heroImageTransition}
          >
            <img
              src={profilePic}
              alt="Nilupul Nishan, AI/ML Engineer and entrepreneur from Sri Lanka"
              width="977"
              height="976"
              fetchPriority="high"
              decoding="async"
            />
          </Motion.div>
        </div>

        <Motion.div
          className="hero-stats"
          variants={leanMotion ? mobileFadeUp : fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          {heroStats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    {
      title: 'AI / ML Engineer',
      meta: 'Current focus',
      description: 'Building intelligent software and AI-powered products.',
    },
    {
      title: 'Entrepreneur',
      meta: 'Mindset',
      description: 'Thinking beyond code — building things with real-world impact and business sense.',
    },
    {
      title: 'Content Creator',
      meta: 'Personal brand',
      description: 'Creating short-form content while keeping the brand clean and professional.',
    },
    {
      title: 'INTJ Mindset',
      meta: 'Personality',
      description: 'A practical, planning-focused mindset for solving problems and building useful software.',
    },
  ];

  return (
    <section id="about" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="About" title="Calm, practical software thinking">
          I&apos;m an AI/ML Engineer and entrepreneur from Sri Lanka, interested in building intelligent software,
          web and mobile applications, and real-world AI solutions.
          <br />
          Online, I also use the handles mrnilupul2k and NilupulNishan across my creator and developer profiles.
        </SectionHeader>

        <StaggerContainer className="about-card">
          {highlights.map((highlight) => (
            <MotionCard key={highlight.title} className="about-highlight-card">
              <small>{highlight.meta}</small>
              <strong>{highlight.title}</strong>
              <p>{highlight.description}</p>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Experience() {
  // One entry per company. Consecutive roles at the same company are grouped
  // under `positions`; a different company is a separate entry/box.
  const experienceItems = [
    {
      company: 'Softvil Technologies',
      location: 'Sri Lanka · On-site',
      logo: '/softvil-logo.png',
      duration: '11 mos',
      positions: [
        {
          role: 'Associate AI/ML Engineer',
          meta: 'Full-time · Feb 2026 - Present · 5 mos',
          description: 'Building and shipping production AI/ML solutions — extending Retrieval-Augmented Generation (RAG) pipelines into real-time, context-aware enterprise features.',
          tags: ['Large Language Models (LLM)', 'RAG', 'PostgreSQL'],
        },
        {
          role: 'AI Engineer',
          meta: 'Internship · Aug 2025 - Jan 2026 · 6 mos',
          description: 'Architected and deployed Retrieval-Augmented Generation (RAG) pipelines, integrating structured and unstructured data to provide real-time, context-aware enterprise solutions.',
          tags: ['Large Language Models (LLM)', 'RAG', 'PostgreSQL'],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Experience" title="Current professional work" />

        <StaggerContainer className="card-grid">
          {experienceItems.map((company) => (
            <MotionCard key={company.company} className="experience-card">
              <div className="experience-card-main">
                <div className="experience-brand">
                  <div className="experience-logo">
                    <img src={company.logo} alt={`${company.company} logo`} width="389" height="258" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    {company.location ? <span>{company.location}</span> : null}
                    <h3>{company.company}</h3>
                  </div>
                </div>

                {company.positions.length > 1 && company.duration ? (
                  <span className="experience-date">{company.duration}</span>
                ) : null}
              </div>

              <div className="experience-roles">
                {company.positions.map((position) => (
                  <div className="experience-role" key={position.role}>
                    <h4>{position.role}</h4>
                    <p className="experience-role-meta">{position.meta}</p>
                    {position.description ? (
                      <p className="experience-description">{position.description}</p>
                    ) : null}
                    {position.tags?.length ? (
                      <div className="experience-tags" aria-label={`${position.role} focus areas`}>
                        {position.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Education() {
  const educationItems = [
    {
      institution: 'University of Sri Jayewardenepura, Sri Lanka',
      degree: 'Bachelor of Science in Information and Communication Technology',
      date: 'Jun 2022 - 2025',
      logo: '/education/usjp-logo.png',
      monogram: 'USJP',
    },
    {
      institution: 'Kuruwita Central College - Ambalangoda',
      degree: 'Completed secondary education, then followed the Physical Science stream for A/Ls with ICT, Combined Mathematics, and Physics.',
      date: '2015 - 2020',
      logo: '/education/kcc-logo.png',
      monogram: 'DC',
      details: [
        {
          title: 'G.C.E. Advanced Level Examination',
          meta: '2020',
          description: 'Physical Science Stream — ICT: A · Combined Mathematics: C · Physics: C',
        },
      ],
    },
  ];

  return (
    <section id="education" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Education" title="Academic background">
          My education journey in software engineering and early academic foundation.
        </SectionHeader>

        <StaggerContainer className="education-list">
          {educationItems.map((item) => (
            <MotionCard key={item.institution} className="education-card">
              <div className="education-logo" aria-label={`${item.institution} brand mark`}>
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.institution} logo`}
                    width={item.logo.includes('iit-logo') ? '450' : '225'}
                    height={item.logo.includes('iit-logo') ? '450' : '225'}
                    loading="lazy"
                    decoding="async"
                  />
                ) : <span>{item.monogram}</span>}
              </div>
              <div className="education-copy">
                <span>{item.date}</span>
                <h3>{item.institution}</h3>
                {item.affiliation ? <p className="education-affiliation">{item.affiliation}</p> : null}
                <p>{item.degree}</p>
                {item.details ? (
                  <div className="education-details">
                    {item.details.map((detail) => (
                      <div key={detail.title}>
                        <strong>{detail.title}</strong>
                        <small>{detail.meta}</small>
                        <p>{detail.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section id="tech-stack" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Tech Stack" title="A focused toolkit for modern software" />
        <StaggerContainer className="card-grid tech-grid">
          {techCategories.map((category) => (
            <MotionCard key={category.title} className="content-card">
              <h3>{category.title}</h3>
              <div className="badge-list">
                {category.items.map((item) => {
                  const Icon = techIconMap[item] || FaArrowRight;
                  return (
                    <span key={item} className="tech-badge">
                      <Icon aria-hidden="true" /> {item}
                    </span>
                  );
                })}
              </div>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Projects() {
  const width = useViewportWidth();
  const isMobile = width < 720;
  const [page, setPage] = useState(0);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(projectMobileBatchSize);
  const totalPages = Math.ceil(projects.length / projectDesktopPageSize);
  const visibleProjects = isMobile
    ? projects.slice(0, mobileVisibleCount)
    : projects.slice(page * projectDesktopPageSize, page * projectDesktopPageSize + projectDesktopPageSize);

  useEffect(() => {
    setPage(0);
    setMobileVisibleCount(projectMobileBatchSize);
  }, [isMobile]);

  const showMoreProjects = () => {
    setMobileVisibleCount((count) => Math.min(count + projectMobileBatchSize, projects.length));
  };

  const showLessProjects = () => {
    setMobileVisibleCount(projectMobileBatchSize);
  };

  return (
    <section id="projects" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Projects" title="Projects">
          A broader look at apps, coursework, and software systems I have built while learning and shipping.
        </SectionHeader>

        <AnimatePresence mode="wait">
          <StaggerContainer
            key={isMobile ? `mobile-projects-${mobileVisibleCount}` : `project-page-${page}`}
            className="card-grid project-grid"
          >
            {visibleProjects.map((project) => (
              <MotionCard key={project.title} className="content-card project-card">
                <div className="project-preview" aria-hidden="true">
                  <span>{project.title.slice(0, 2)}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="badge-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub aria-hidden="true" /> GitHub
                    </a>
                  ) : null}
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live
                    </a>
                  ) : null}
                  {!project.github && !project.live ? <small>Links unavailable</small> : null}
                </div>
              </MotionCard>
            ))}
          </StaggerContainer>
        </AnimatePresence>

        <SectionPagination
          label="Projects"
          currentPage={page}
          totalPages={totalPages}
          onPrevious={() => setPage((value) => Math.max(value - 1, 0))}
          onNext={() => setPage((value) => Math.min(value + 1, totalPages - 1))}
          onPageChange={setPage}
          isMobileShowMore={isMobile}
          visibleCount={mobileVisibleCount}
          totalItems={projects.length}
          initialVisibleCount={projectMobileBatchSize}
          onShowMore={showMoreProjects}
          onShowLess={showLessProjects}
          showMoreLabel="Show More Projects"
          showLessLabel="Show Less"
        />
      </div>
    </section>
  );
}

function getCertificateProviderIcon(provider = '') {
  if (provider.includes('AWS')) {
    return FaAws;
  }
  if (provider.includes('Coursera')) {
    return SiCoursera;
  }
  if (provider.includes('DeepLearning')) {
    return FaBrain;
  }
  if (provider.includes('LinkedIn')) {
    return FaLinkedin;
  }
  return FaGraduationCap;
}

function Certifications() {
  const width = useViewportWidth();
  const isMobile = width < 720;
  const certificatesPerPage = width < 720 ? 3 : width < 1100 ? 4 : 6;
  const [page, setPage] = useState(0);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(3);
  const totalPages = Math.ceil(certifications.length / certificatesPerPage);
  const visibleCertificates = isMobile
    ? certifications.slice(0, mobileVisibleCount)
    : certifications.slice(page * certificatesPerPage, page * certificatesPerPage + certificatesPerPage);

  useEffect(() => {
    setPage(0);
    setMobileVisibleCount(3);
  }, [certificatesPerPage, isMobile]);

  const showMoreCertificates = () => {
    setMobileVisibleCount((count) => Math.min(count + 3, certifications.length));
  };

  const showLessCertificates = () => {
    setMobileVisibleCount(3);
  };

  return (
    <section id="certificates" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Certifications" title="Learning milestones">
          From deep learning, machine learning, and agentic AI specializations to data science, Python, and web foundations.
        </SectionHeader>

        <AnimatePresence mode="wait">
          <StaggerContainer
            key={isMobile ? `mobile-${mobileVisibleCount}` : `page-${page}-${certificatesPerPage}`}
            className="card-grid certificate-grid"
          >
            {visibleCertificates.map((certificate) => (
              <MotionCard key={certificate.title} className="content-card certificate-card">
                <div className="certificate-topline">
                  <div className="certificate-meta">
                    <span className="certificate-date">{certificate.date}</span>
                    <span className="certificate-provider" aria-label={`${certificate.provider || 'Certificate'} provider`} title={certificate.provider}>
                      {(() => {
                        const ProviderIcon = getCertificateProviderIcon(certificate.provider);
                        return <ProviderIcon aria-hidden="true" />;
                      })()}
                    </span>
                  </div>
                  <a className="certificate-view" href={certificate.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.title} certificate`}>
                    View <FaArrowRight aria-hidden="true" />
                  </a>
                </div>
                <h3>{certificate.title}</h3>
                <div className="badge-list certificate-tags">
                  {certificate.skills.map((skill) => (
                    <span key={`${certificate.title}-${skill}`}>{skill}</span>
                  ))}
                  {certificate.credentialId ? (
                    <span className="certificate-credential" title="Enter this ID on the verification page">ID: {certificate.credentialId}</span>
                  ) : null}
                </div>
              </MotionCard>
            ))}
          </StaggerContainer>
        </AnimatePresence>

        <SectionPagination
          label="Certificates"
          currentPage={page}
          totalPages={totalPages}
          onPrevious={() => setPage((value) => Math.max(value - 1, 0))}
          onNext={() => setPage((value) => Math.min(value + 1, totalPages - 1))}
          onPageChange={setPage}
          isMobileShowMore={isMobile}
          visibleCount={mobileVisibleCount}
          totalItems={certifications.length}
          initialVisibleCount={3}
          onShowMore={showMoreCertificates}
          onShowLess={showLessCertificates}
          showMoreLabel="Show More Certificates"
          showLessLabel="Show Less"
        />
      </div>
    </section>
  );
}

function getContributionLevel(count, maxCount) {
  if (!count) {
    return 0;
  }

  if (maxCount <= 4) {
    return Math.min(count, 4);
  }

  return Math.min(Math.ceil((count / maxCount) * 4), 4);
}

function GitHubContributionCalendar({ calendar }) {
  const weeks = calendar?.weeks || [];
  const months = calendar?.months || [];
  const maxCount = weeks.reduce((max, week) => {
    const weekMax = (week.contributionDays || []).reduce(
      (dayMax, day) => Math.max(dayMax, day.contributionCount || 0),
      0,
    );
    return Math.max(max, weekMax);
  }, 0);

  const getMonthColumn = (firstDay) => {
    const monthStart = new Date(firstDay).getTime();
    const matchingWeekIndex = weeks.findIndex((week, index) => {
      const weekStart = new Date(week.firstDay).getTime();
      const nextWeekStart = weeks[index + 1] ? new Date(weeks[index + 1].firstDay).getTime() : Infinity;
      return monthStart >= weekStart && monthStart < nextWeekStart;
    });

    return matchingWeekIndex >= 0 ? matchingWeekIndex + 1 : 1;
  };

  if (!weeks.length) {
    return (
      <div className="github-chart-fallback" aria-hidden="true">
        {Array.from({ length: 53 * 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="github-calendar" aria-label={`${calendar.totalContributions} GitHub contributions in the last 52 weeks`}>
      <div className="github-calendar-months" aria-hidden="true">
        {months.map((month) => (
          <span
            key={`${month.name}-${month.year}-${month.firstDay}`}
            style={{ gridColumnStart: getMonthColumn(month.firstDay) }}
          >
            {month.name}
          </span>
        ))}
      </div>

      <div className="github-calendar-body">
        <div className="github-calendar-days" aria-hidden="true">
          <span />
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
        </div>

        <div className="github-calendar-weeks">
          {weeks.map((week) => (
            <div className="github-calendar-week" key={week.firstDay}>
              {(week.contributionDays || []).map((day) => {
                const level = getContributionLevel(day.contributionCount, maxCount);
                return (
                  <span
                    className={`github-calendar-day level-${level}`}
                    key={day.date}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHubActivity() {
  const [githubData, setGithubData] = useState({
    status: 'loading',
    totalContributions: null,
    lastYearContributions: null,
    contributionCalendar: null,
    totals: null,
    repositories: [],
    lastUpdated: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubContributions() {
      try {
        const response = await fetch('/api/github-contributions');
        const data = await response.json().catch(() => ({}));

        if (!response.ok || typeof data.totalContributions !== 'number') {
          throw new Error(data.error || 'Contribution data unavailable.');
        }

        if (!cancelled) {
          setGithubData({
            status: 'success',
            totalContributions: data.totalContributions,
            lastYearContributions: typeof data.lastYearContributions === 'number' ? data.lastYearContributions : null,
            contributionCalendar: data.contributionCalendar || null,
            totals: data.totals || null,
            repositories: Array.isArray(data.repositories) ? data.repositories : [],
            lastUpdated: data.lastUpdated || null,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setGithubData({
            status: 'error',
            totalContributions: null,
            lastYearContributions: null,
            contributionCalendar: null,
            totals: null,
            repositories: [],
            lastUpdated: null,
            error: error.message || 'Contribution data unavailable.',
          });
        }
      }
    }

    loadGitHubContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatCount = (value) => (typeof value === 'number' ? new Intl.NumberFormat('en-US').format(value) : '—');

  const githubStatTiles = [
    { icon: FaCode, value: githubData.totals?.commits, label: 'Commits' },
    { icon: FaCodeBranch, value: githubData.totals?.pullRequests, label: 'Pull requests' },
    { icon: FaGithub, value: githubData.lastYearContributions ?? githubData.totalContributions, label: 'GitHub contributions' },
  ];

  const contributionCount =
    githubData.status === 'loading' ? 'Loading' : 'Unavailable';

  const contributionLabel =
    githubData.status === 'loading' ? 'GitHub contributions' : 'Contribution data unavailable';

  const activeToday = (() => {
    const weeks = githubData.contributionCalendar?.weeks;
    if (!weeks?.length) {
      return false;
    }
    const today = new Date().toISOString().slice(0, 10);
    for (let weekIndex = weeks.length - 1; weekIndex >= Math.max(0, weeks.length - 2); weekIndex -= 1) {
      const day = (weeks[weekIndex].contributionDays || []).find((item) => item.date === today);
      if (day) {
        return (day.contributionCount || 0) > 0;
      }
    }
    return false;
  })();

  const lastUpdatedLabel = githubData.lastUpdated
    ? `Last updated ${new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(githubData.lastUpdated))}`
    : null;

  return (
    <section id="github" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="GitHub" title="Days I Code">
          A contribution snapshot from my public GitHub profile.
        </SectionHeader>

        <Reveal className="github-card">
          <div className="github-card-header">
            <div>
              <p>Last 52 weeks of contributions</p>
              <h3>github.com/{githubContributionSummary.username}</h3>
            </div>
            <a href={`https://github.com/${githubContributionSummary.username}`} target="_blank" rel="noopener noreferrer">
              View profile <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          {githubData.status === 'success' ? (
            <div className="github-stat-row">
              {githubStatTiles.map((tile) => {
                const TileIcon = tile.icon;
                return (
                  <div className="github-stat-card" key={tile.label}>
                    <span className="github-stat-icon" aria-hidden="true"><TileIcon /></span>
                    <div className="github-stat-copy">
                      <strong>{formatCount(tile.value)}</strong>
                      <span>{tile.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="github-count-row">
              <strong className="github-status-text">{contributionCount}</strong>
              <span>{contributionLabel}</span>
            </div>
          )}

          <div className="github-chart-wrap">
            <div className="github-chart-head">
              <div>
                <h4>Contribution graph</h4>
                <p>Daily activity intensity across the last 52 weeks.</p>
              </div>
              <div className="github-legend" aria-label="Contribution intensity legend">
                <span>Less</span>
                <i className="level-0" />
                <i className="level-1" />
                <i className="level-2" />
                <i className="level-3" />
                <i className="level-4" />
                <span>More</span>
              </div>
            </div>
            <GitHubContributionCalendar calendar={githubData.contributionCalendar} />
          </div>

          {githubData.repositories.length > 0 ? (
            <div className="github-repos">
              <div className="github-repos-head">
                <strong>Recently updated repositories</strong>
                <span>Selected public work straight from the GitHub profile.</span>
              </div>
              <div className="github-repo-grid">
                {githubData.repositories.map((repo) => (
                  <a className="github-repo-card" key={repo.nameWithOwner} href={repo.url} target="_blank" rel="noopener noreferrer">
                    <span className="github-repo-name"><FaGithub aria-hidden="true" /> {repo.name}</span>
                    <p>{repo.description || 'Public repository on GitHub.'}</p>
                    <span className="github-repo-meta">
                      {repo.language ? (
                        <span className="github-repo-lang">
                          <i style={repo.languageColor ? { background: repo.languageColor } : undefined} aria-hidden="true" />
                          {repo.language}
                        </span>
                      ) : null}
                      <span><FaStar aria-hidden="true" /> {formatCount(repo.stars)}</span>
                      <span><FaCodeBranch aria-hidden="true" /> {formatCount(repo.forks)}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="github-badge-row">
            {githubData.status === 'success' ? <small className="github-source-label">Fetched from GitHub GraphQL</small> : null}
            {githubData.status === 'success' && activeToday ? (
              <small className="github-active-label"><i aria-hidden="true" /> Active today</small>
            ) : null}
            {lastUpdatedLabel ? <small className="github-updated-label">{lastUpdatedLabel}</small> : null}
          </div>

          <p className="github-note">
            Contribution data is fetched from GitHub and may depend on repository access and private contribution visibility.
            {githubData.status === 'error' ? ` ${githubData.error}` : ''}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TikTokEmbed() {
  const embedRef = useRef(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedChecked, setEmbedChecked] = useState(false);
  const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false);

  useEffect(() => {
    if (!embedRef.current) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoadEmbed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadEmbed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px', threshold: 0.01 },
    );

    observer.observe(embedRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadEmbed) {
      return undefined;
    }

    const scriptId = 'tiktok-embed-script';
    let checkTimer;

    const checkEmbed = () => {
      window.tiktokEmbed?.load?.();
      checkTimer = window.setTimeout(() => {
        setEmbedLoaded(Boolean(embedRef.current?.querySelector('iframe')));
        setEmbedChecked(true);
      }, 2600);
    };

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      checkEmbed();
      return () => {
        if (checkTimer) {
          window.clearTimeout(checkTimer);
        }
      };
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = checkEmbed;
    script.onerror = () => setEmbedChecked(true);
    document.body.appendChild(script);

    return () => {
      if (checkTimer) {
        window.clearTimeout(checkTimer);
      }
    };
  }, [shouldLoadEmbed]);

  return (
    <div className="embed-card" ref={embedRef}>
      <div className="embed-card-header">
        <p className="embed-label">TikTok profile</p>
        <a href="https://www.tiktok.com/@mrnilupul2k" target="_blank" rel="noopener noreferrer">
          Open profile <FaArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="tiktok-official-embed">
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@mrnilupul2k"
          data-unique-id="mrnilupul2k"
          data-embed-type="creator"
          style={{ maxWidth: '100%', minWidth: 220 }}
        >
          <section>
            <a href="https://www.tiktok.com/@mrnilupul2k" target="_blank" rel="noopener noreferrer">
              @mrnilupul2k
            </a>
          </section>
        </blockquote>
      </div>

      {!embedLoaded && embedChecked ? (
        <a className="embed-profile-fallback" href="https://www.tiktok.com/@mrnilupul2k" target="_blank" rel="noopener noreferrer">
          <FaTiktok aria-hidden="true" />
          <div>
            <p>@mrnilupul2k</p>
            <span>TikTok embed may be blocked here. Open the profile to view latest videos and stats.</span>
          </div>
          <FaArrowRight aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function TikTokSection() {
  return (
    <section id="tiktok" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Creator" title="Creator Area">
          TikTok content, a personal Spotify playlist, and collaboration paths in one clean creator flow.
        </SectionHeader>

        <Reveal className="tiktok-layout">
          <div className="tiktok-copy-card">
            <div className="creator-line" />
            <p className="eyebrow">TikTok</p>
            <h2>TikTok Creator</h2>
            <p>
              I create short-form content around music, captions, lifestyle moments, and relatable thoughts.
            </p>
            <span>Open for promotions, collaborations, and music-related content.</span>
            <a className="button button-primary" href="https://www.tiktok.com/@mrnilupul2k" target="_blank" rel="noopener noreferrer">
              Follow on TikTok <FaArrowRight aria-hidden="true" />
            </a>
          </div>
          <TikTokEmbed />
        </Reveal>
      </div>
    </section>
  );
}

function Promotions() {
  const [promotionErrors, setPromotionErrors] = useState({});
  const [promotionType, setPromotionType] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get('name') || '').trim(),
      brand: String(formData.get('brand') || '').trim(),
      promotionType: String(formData.get('promotionType') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required.';
    }

    if (!values.brand) {
      errors.brand = 'Brand / Business Name is required.';
    }

    if (!values.promotionType) {
      errors.promotionType = 'Promotion Type is required.';
    }

    if (!values.message) {
      errors.message = 'Message is required.';
    } else if (values.message.length < 10) {
      errors.message = 'Message should be at least 10 characters.';
    }

    setPromotionErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const message = [
      "Hello Nilupul, I’m interested in a promotion/collaboration.",
      '',
      `Name: ${values.name}`,
      `Brand / Business: ${values.brand}`,
      `Promotion Type: ${values.promotionType}`,
      `Message: ${values.message}`,
    ].join('\n');

    window.open(`https://wa.me/94712702279?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  const hasError = (field) => Boolean(promotionErrors[field]);

  return (
    <section id="promotions" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Promotions" title="Promotions & Collaborations">
          For promotions, collaborations, sponsored content, music promotions, product promotions, shoutouts, or content partnerships,
          contact me here.
        </SectionHeader>

        <div className="promotions-form-wrap">
          <Reveal>
            <form className="contact-form promotion-form" onSubmit={handleSubmit} noValidate>
              <label>
                Name
                <input
                  className={hasError('name') ? 'field-error' : ''}
                  name="name"
                  type="text"
                  placeholder="Your name"
                  aria-invalid={hasError('name')}
                  aria-describedby={hasError('name') ? 'promotion-name-error' : undefined}
                />
                {hasError('name') ? <FormError id="promotion-name-error">{promotionErrors.name}</FormError> : null}
              </label>
              <label>
                Brand / Business Name
                <input
                  className={hasError('brand') ? 'field-error' : ''}
                  name="brand"
                  type="text"
                  placeholder="Brand or business"
                  aria-invalid={hasError('brand')}
                  aria-describedby={hasError('brand') ? 'promotion-brand-error' : undefined}
                />
                {hasError('brand') ? <FormError id="promotion-brand-error">{promotionErrors.brand}</FormError> : null}
              </label>
              <label>
                Promotion Type
                <select
                  className={`${hasError('promotionType') ? 'field-error' : ''} ${promotionType ? '' : 'select-placeholder'}`.trim()}
                  name="promotionType"
                  value={promotionType}
                  onChange={(event) => setPromotionType(event.target.value)}
                  aria-invalid={hasError('promotionType')}
                  aria-describedby={hasError('promotionType') ? 'promotion-type-error' : undefined}
                >
                  <option value="" disabled>
                    Select promotion type
                  </option>
                  {promotionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {hasError('promotionType') ? <FormError id="promotion-type-error">{promotionErrors.promotionType}</FormError> : null}
              </label>
              <label className="full">
                Message
                <textarea
                  className={hasError('message') ? 'field-error' : ''}
                  name="message"
                  rows="5"
                  placeholder="Tell me about the collaboration."
                  aria-invalid={hasError('message')}
                  aria-describedby={hasError('message') ? 'promotion-message-error' : undefined}
                />
                {hasError('message') ? <FormError id="promotion-message-error">{promotionErrors.message}</FormError> : null}
              </label>
              <p>Submitting opens WhatsApp with your inquiry details ready to send.</p>
              <button className="button button-primary full" type="submit">
                Send Promotion Inquiry
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const visibleLinks = socialLinks.filter((link) =>
    ['github', 'linkedin', 'tiktok', 'instagram', 'facebook'].includes(link.type),
  );
  const whatsAppLink = socialLinks.find((link) => link.type === 'whatsapp');
  const emailLink = socialLinks.find((link) => link.type === 'email' || link.href.startsWith('mailto:'));

  return (
    <section id="contact" className="section contact-section">
      <div className="page-shell">
        <Reveal className="contact-card">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something thoughtful.</h2>
            <span><FaMapMarkerAlt aria-hidden="true" /> Sri Lanka</span>
          </div>
          <div className="contact-panel">
            <p>Open to AI opportunities, software projects, collaborations, and promotions.</p>
            <div className="contact-ctas">
              {whatsAppLink ? (
                <a className="button button-primary" href={whatsAppLink.href} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp aria-hidden="true" /> Message on WhatsApp
                </a>
              ) : null}
              {emailLink ? (
                <a className="button button-secondary" href={emailLink.href}>
                  <FaEnvelope aria-hidden="true" /> Send Email
                </a>
              ) : null}
            </div>
            <div className="social-row">
              {visibleLinks.map((link) => {
                const Icon = socialIconMap[link.type] || FaEnvelope;
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <Icon aria-hidden="true" />
                    <span className="social-label">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-grid">
          <div className="footer-cell footer-brand">
            <strong>Nilupul Nishan</strong>
            <p>AI/ML Engineer, entrepreneur, and content creator from Sri Lanka — building intelligent, user-focused software.</p>
          </div>
          <nav className="footer-cell footer-nav" aria-label="Footer navigation">
            <p className="footer-heading">Explore</p>
            {navItems.map((item) => (
              <a key={item.to} href={item.to}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-cell footer-social">
            <p className="footer-heading">Connect</p>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
          <div className="footer-cell footer-meta">
            <p>&copy; 2026 Nilupul Nishan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.button
          className="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          initial={reduceMotion ? false : leanMotion ? { opacity: 0, y: 8 } : { opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : leanMotion ? { opacity: 0, y: 8 } : { opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.16 : 0.2, ease: 'easeOut' }}
          whileHover={leanMotion || reduceMotion ? undefined : { y: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        >
          <FaArrowUp aria-hidden="true" />
        </Motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export {
  Navbar,
  Footer,
  BackToTop,
  Reveal,
  StaggerContainer,
  MotionCard,
  SectionHeader,
  Hero,
  About,
  Education,
  TechStack,
  Experience,
  Projects,
  GitHubActivity,
  Certifications,
  TikTokSection,
  Promotions,
  Contact,
};

