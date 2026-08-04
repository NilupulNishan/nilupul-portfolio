import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaAws,
  FaBrain,
  FaChartBar,
  FaChartLine,
  FaCode,
  FaCodeBranch,
  FaCubes,
  FaDatabase,
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaGraduationCap,
  FaInstagram,
  FaLayerGroup,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMicrosoft,
  FaMoon,
  FaPalette,
  FaRobot,
  FaStar,
  FaSun,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  SiAndroidstudio,
  SiArduino,
  SiClaude,
  SiCloudera,
  SiCoursera,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHuggingface,
  SiJavascript,
  SiJira,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNumpy,
  SiOpenai,
  SiOpenapiinitiative,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPytorch,
  SiRaspberrypi,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiVercel,
} from 'react-icons/si';
import { DiPython } from 'react-icons/di';
import { VscAzure } from 'react-icons/vsc';
import heroBackdrop from './assets/profile/profile_pic3.jpg';
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

// Light mode is hidden for now - flip to true to restore the theme toggle.
// All light-mode CSS ([data-theme='light']) and logic is left intact.
const LIGHT_MODE_ENABLED = false;

const sectionToNavMap = {
  home: '#home',
  about: '#about',
  education: '#about',
  experience: '#experience',
  'tech-stack': '#about',
  'case-studies': '#experience',
  'featured-project': '#experience',
  github: '#experience',
  certificates: '#experience',
  certifications: '#experience',
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
  'Agentic Workflows': FaRobot,
  'RAG Systems': FaLayerGroup,
  LangChain: SiLangchain,
  LangGraph: SiGraphql,
  LlamaIndex: FaBrain,
  'Hugging Face': SiHuggingface,
  'OpenAI APIs': SiOpenai,
  Claude: SiClaude,
  Python: DiPython,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  OpenCV: SiOpencv,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Matplotlib: FaChartLine,
  'Power BI': FaChartBar,
  React: SiReact,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  FastAPI: SiFastapi,
  'REST APIs': SiOpenapiinitiative,
  Postman: SiPostman,
  'UI/UX': FaPalette,
  Figma: SiFigma,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  'Cosmos DB': VscAzure,
  ChromaDB: FaDatabase,
  Azure: FaMicrosoft,
  AWS: FaAws,
  Cloudera: SiCloudera,
  Docker: SiDocker,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  Jira: SiJira,
  'Android Studio': SiAndroidstudio,
  Arduino: SiArduino,
  'Raspberry Pi': SiRaspberrypi,
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

function MotionCard({ children, className = '', ...rest }) {
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
      {...rest}
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
  const [theme, setTheme] = useState(() => (
    LIGHT_MODE_ENABLED ? localStorage.getItem('theme-v2') || 'dark' : 'dark'
  ));
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
    if (LIGHT_MODE_ENABLED) {
      localStorage.setItem('theme-v2', theme);
    }
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
            {/* Contact lives in navItems as a text link, so this slot points at the
                testimonials section instead of duplicating the same /contact URL.
                Testimonials is a Home section, not a route, so it goes through
                goToSection like the anchor nav items rather than a NavLink. */}
            <a
              className="button button-secondary nav-cta"
              href="/#testimonials"
              onClick={(event) => {
                event.preventDefault();
                goToSection('testimonials');
              }}
            >
              What they said
            </a>
            {LIGHT_MODE_ENABLED ? (
              <button
                className="theme-toggle"
                type="button"
                onClick={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
              </button>
            ) : null}

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

  return (
    <section id="home" className="hero-section">
      <Motion.div
        className="hero-backdrop"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: leanMotion ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: leanMotion ? 0.5 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroBackdrop}
          alt=""
          width="1024"
          height="1536"
          fetchPriority="high"
          decoding="async"
        />
      </Motion.div>
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
              I build intelligent, user-focused software across AI, web, mobile, and full-stack development - from Sri Lanka to wherever the work matters.
            </Motion.p>

            <Motion.div className="hero-actions" variants={leanMotion ? mobileFadeUp : fadeUp}>
              <a className="button button-primary" href="#case-studies">
                View My Work <FaArrowRight aria-hidden="true" />
              </a>
              <NavLink className="button button-secondary" to="/contact">
                Contact Me
              </NavLink>
            </Motion.div>
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

// Keep in sync with the `gap` on `.about-rail` in index.css - the arrow buttons
// advance the rail by exactly one card plus one gap.
const ABOUT_CARD_GAP = 20;

function About() {
  // `image` is served from `public/about/`. Cards render fine without one, so a
  // photo can be dropped in later without touching this file beyond the path.
  const highlights = [
    {
      title: 'AI / ML Engineer',
      description: 'Building intelligent software and AI-powered products.',
      image: '/about/ai-ml-eng.jpg',
    },
    {
      title: 'Entrepreneur',
      description: 'Thinking beyond code, with real-world impact.',
      image: '/about/entrepreneur.jpg',
    },
    {
      title: 'Content Creator',
      description: 'Short-form content, kept clean and professional.',
      image: '/about/content-creator.jpg',
    },
    {
      title: 'INTJ Mindset',
      description: 'A practical, planning-focused way of solving things.',
      image: '/about/intj-mindset.jpg',
    },
    {
      title: 'Emograph Capturer',
      description: 'Capturing the emotions of people and places through photography.',
      image: '/about/emograph-capturer.jpg',
    },
    {
      title: 'Blood Donor',
      description: 'A regular blood donor — showing up for people in need',
      image: '/about/blood-donor.jpg',
    },
  ];

  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // 1px of slack absorbs the sub-pixel scrollLeft values browsers report at the
  // extremes, which would otherwise leave a button stuck enabled at the end.
  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 1);
    setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  const scrollByCard = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.about-highlight-card');
    const step = card ? card.offsetWidth + ABOUT_CARD_GAP : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="about" className="section about-section">
      <div className="page-shell">
        <div className="about-head">
          <SectionHeader eyebrow="About" title="Calm engineering in a hyped field">
            I build retrieval-augmented AI that turns messy data into plain answers - and explain how it
            works, in English and Sinhala, for people who assume it isn&apos;t for them.
            <br />
            Online, I also use the handles mrnilupul2k and NilupulNishan across my creator and developer profiles.
          </SectionHeader>

          <div className="about-rail-nav">
            <button
              type="button"
              className="about-rail-button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Show previous highlights"
            >
              <FaArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="about-rail-button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Show next highlights"
            >
              <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Outside `.page-shell` on purpose: as a direct child of `.section` the
          rail spans the full page width, so cards run off the screen edges
          rather than stopping at the shell frame. */}
      <div className="about-bleed">
        <div className="about-rail" ref={railRef} onScroll={syncEdges}>
          {highlights.map((highlight) => (
            <div className="about-highlight-card" key={highlight.title}>
              {highlight.image ? (
                <img
                  className="about-card-media"
                  src={highlight.image}
                  alt=""
                  width="640"
                  height="960"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div className="about-card-body">
                <strong>{highlight.title}</strong>
                <p>{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
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
          description: 'Building and shipping production AI/ML solutions - extending Retrieval-Augmented Generation (RAG) pipelines into real-time, context-aware enterprise features.',
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
      institution: 'Kuruwita Central College - Ratnapura',
      degree: 'Completed secondary education, then followed the Physical Science stream for A/Ls with ICT, Combined Mathematics, and Physics.',
      date: '2015 - 2020',
      logo: '/education/kcc-logo.png',
      monogram: 'DC',
      details: [
        {
          title: 'G.C.E. Advanced Level Examination',
          meta: '2020',
          description: 'Physical Science Stream - ICT · Combined Mathematics · Physics',
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

function CaseStudies() {
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
    <section id="case-studies" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Case Studies" title="Selected case studies">
          A closer look at the apps, coursework, and software systems I have built while learning and shipping.
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
          label="Case studies"
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
          showMoreLabel="Show More Case Studies"
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
  if (provider.includes('DeepLearning')) {
    return FaBrain;
  }
  if (provider.includes('Coursera')) {
    return SiCoursera;
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

  const formatCount = (value) => (typeof value === 'number' ? new Intl.NumberFormat('en-US').format(value) : ' -');

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

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_SCRIPT_ID = 'google-identity-script';
const TESTIMONIAL_MIN_LENGTH = 10;
const TESTIMONIAL_MAX_LENGTH = 1000;
const TESTIMONIAL_ROLE_MAX_LENGTH = 120;

// Display only - the same token is re-verified server-side before anything is
// stored, so nothing here is trusted for identity.
function decodeGoogleCredential(credential) {
  try {
    const segment = String(credential).split('.')[1];
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(window.atob(base64), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

// Google avatar URLs are not stable - they 404 once someone changes their photo -
// so the fallback is required, not decorative.
function TestimonialAvatar({ name, picture }) {
  const [failed, setFailed] = useState(false);

  const initials = String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || '?';

  if (!picture || failed) {
    return (
      <span className="testimonial-avatar testimonial-avatar-fallback" aria-hidden="true">
        {initials}
      </span>
    );
  }

  return (
    <img
      className="testimonial-avatar"
      src={picture}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

// Abstract only - empty panels, grid fragments and light bars. Deliberately no
// names, faces or text: filling the distance with lookalike testimonial cards
// would imply recommendations that do not exist.
const depthPanels = [
  { left: '2%', top: '10%', width: 150, height: 92, z: -620, opacity: 0.3 },
  { left: '15%', top: '72%', width: 122, height: 76, z: -760, opacity: 0.26 },
  { left: '27%', top: '4%', width: 178, height: 108, z: -520, opacity: 0.34 },
  { left: '40%', top: '86%', width: 138, height: 84, z: -680, opacity: 0.24 },
  { left: '55%', top: '80%', width: 116, height: 72, z: -900, opacity: 0.22 },
  { left: '70%', top: '12%', width: 160, height: 96, z: -580, opacity: 0.32 },
  { left: '88%', top: '62%', width: 146, height: 88, z: -700, opacity: 0.28 },
  { left: '95%', top: '22%', width: 104, height: 64, z: -1020, opacity: 0.2 },
  { left: '8%', top: '38%', width: 88, height: 54, z: -1180, opacity: 0.17 },
  { left: '33%', top: '52%', width: 74, height: 46, z: -1460, opacity: 0.14 },
  { left: '48%', top: '22%', width: 66, height: 42, z: -1620, opacity: 0.12 },
  { left: '62%', top: '58%', width: 82, height: 50, z: -1340, opacity: 0.15 },
  { left: '78%', top: '40%', width: 70, height: 44, z: -1540, opacity: 0.13 },
  { left: '20%', top: '26%', width: 58, height: 36, z: -1800, opacity: 0.1 },
  { left: '85%', top: '84%', width: 62, height: 38, z: -1720, opacity: 0.11 },
  { left: '45%', top: '68%', width: 54, height: 34, z: -1900, opacity: 0.09 },
];

function TestimonialCardBody({ item }) {
  return (
    <>
      <blockquote>{item.quote}</blockquote>
      <div className="testimonial-attribution">
        <TestimonialAvatar name={item.name} picture={item.picture} />
        <div>
          <p className="testimonial-name">{item.name}</p>
          {item.role ? <p className="testimonial-role">{item.role}</p> : null}
        </div>
      </div>
    </>
  );
}

// Depth is tied to scroll *position*, not scroll direction: the card approaches on
// the way down and recedes on the way up for free, and a half-finished scroll rests
// half-way instead of snapping. Direction-linking would need state and would jump
// whenever you reversed mid-gesture.
// Dev-only harness for eyeballing the depth field without waiting for real
// recommendations - visit /?preview=24 while running `npm run dev`.
//
// These are NEVER written to Redis. The datastore is shared with production, so
// seeding it would put invented people on the live portfolio. Everything below is
// gated on `import.meta.env.DEV`, which Vite resolves to `false` at build time, so
// the minifier strips this array and the branch that reads it out of the production
// bundle entirely - the same dead-code elimination that hid the sign-in block when
// VITE_GOOGLE_CLIENT_ID was missing, used deliberately this time.
const previewQuotes = [
  'Shipped the whole pipeline in a week and it still has not fallen over.',
  'Explains hard things simply. Rare.',
  'He rewrote our retrieval layer and cut latency by more than half. Careful, well-tested work, and he documented every decision so the rest of us could follow it afterwards.',
  'Reliable under deadline pressure.',
  'Took an ambiguous brief and came back with something better than what we asked for.',
  'Genuinely good to work alongside. Asks the right questions early instead of guessing.',
  'Fixed a bug three of us had stared at for two days.',
  'Strong instincts for what to build and, more usefully, what not to build.',
  'Fast, but never careless. The tests were there before I asked.',
  'He mentored two juniors on my team while delivering his own scope. Both of them are noticeably better engineers now.',
  'Clear communicator across time zones.',
  'The kind of person who leaves the codebase tidier than he found it.',
];

const previewNames = [
  ['Amara Silva', 'Product Lead'],
  ['Ravi Fernando', 'Backend Engineer'],
  ['Chen Wei', 'ML Engineer'],
  ['Dilini Perera', 'UX Designer'],
  ['Marcus Hall', 'CTO'],
  ['Sanduni Jayawardena', 'Data Analyst'],
  ['Tomas Novak', 'Founder'],
  ['Priya Nair', 'Engineering Manager'],
  ['Kasun Bandara', 'DevOps Engineer'],
  ['Elena Rossi', 'Design Lead'],
  ['Ahmed Hassan', 'Solutions Architect'],
  ['Nadia Karim', 'QA Lead'],
];

function buildPreviewItems(count) {
  return Array.from({ length: count }, (_, index) => {
    const [name, role] = previewNames[index % previewNames.length];
    return {
      id: `preview-${index}`,
      name: index < previewNames.length ? name : `${name} ${Math.floor(index / previewNames.length) + 1}`,
      role,
      quote: previewQuotes[index % previewQuotes.length],
      picture: '',
      createdAt: new Date().toISOString(),
    };
  });
}

// Only used by the grid fallback (more cards than scatter slots), where cards flow
// in columns and need a vertical nudge to avoid sitting in a dead-straight row.
// Deterministic by index so a card never jumps between renders.
const restOffsets = [0, 38, -24, 54, -14, 28];

// Hand-placed scatter, mirroring the reference: cards at genuinely different sizes
// spread across the field instead of sitting in a row. Size comes from a real width
// plus a rest depth, so perspective does the scaling - and nothing is rotated, which
// is the one thing about the reference Nilupul did not want.
// Depth is no longer per-slot - every card now travels the same Z range on a
// staggered schedule - so these carry placement and width only.
// Smaller than the first pass. Bigger cards filled the field and left little void
// between them, which flattened the sense of space; these leave air around each one.
// Widths bottom out around 230px because below that the quote starts wrapping every
// three or four words and stops being comfortably readable.
const cardSlots = [
  { left: '3%', top: '5%', width: 272 },
  { left: '43%', top: '32%', width: 228 },
  { left: '71%', top: '3%', width: 252 },
  { left: '12%', top: '62%', width: 236 },
  { left: '47%', top: '67%', width: 264 },
  { left: '74%', top: '50%', width: 214 },
];

function TestimonialDepthCard({ item, index, progress, slot }) {
  // Continuous travel rather than "arrive and rest". Each card rises out of the deep
  // field, crosses the readable band, then keeps coming until it passes the viewer.
  // Staggering the window by index means something is always emerging from behind
  // whatever is currently on its way out.
  // The stagger has to stay small. At 0.075 per card the first card finished its
  // whole flight by 62% of the track while the last had barely started, so early
  // cards had already flown past before the section was properly settled on screen.
  // Small offsets plus a window covering most of the track means every card spends
  // the bulk of the pin inside the readable band.
  const phase = Math.min(0.12, index * 0.03);
  // Shorter travel than before (1450px, was 1820px). The longer the flight, the more
  // of it is spent fading, so cards were arriving and leaving almost immediately.
  const z = useTransform(progress, [phase, phase + 0.86], [-1150, 300]);

  // Opacity keyed to the card's own depth, not to global scroll progress - that is
  // what makes the near ones fade as they close on the viewer while the ones still
  // deep in the field fade up. Driving it from progress made every card fade in
  // unison regardless of where it actually was.
  //
  // Solid across ~72% of the flight, up from ~53%. A card that spends half its
  // journey fading looks like it is leaving the moment it arrives - which is exactly
  // how it read. Fade-in is kept short and fade-out starts only once the card is
  // genuinely past the viewer.
  const opacity = useTransform(z, [-1300, -700, 90, 300], [0, 1, 1, 0]);

  const style = slot
    ? { z, opacity, left: slot.left, top: slot.top, width: slot.width }
    : { z, opacity, marginTop: restOffsets[index % restOffsets.length] };

  return (
    <Motion.div
      className={`content-card testimonial-card${slot ? ' testimonial-card--placed' : ''}`}
      style={style}
    >
      <TestimonialCardBody item={item} />
    </Motion.div>
  );
}

function Testimonials() {
  const [feed, setFeed] = useState({ status: 'loading', items: [], error: null });
  const [googleReady, setGoogleReady] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [credential, setCredential] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  // A callback ref held in state, not a plain useRef. The sign-in block moves between
  // two slots (beside the heading when pinned, under the grid when not), and the feed
  // arriving flips `pinned` after mount - which unmounts the div Google rendered its
  // button into and mounts a fresh one. With a plain ref the effect below never re-ran,
  // so the button silently vanished. State makes the remount a dependency change.
  const [signInNode, setSignInNode] = useState(null);
  const stageRef = useRef(null);
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();

  // Phones get the flat fade-up instead: a dozen composited 3D layers is exactly
  // where touch devices stutter, and the effect is barely legible on a small screen.
  const depthEnabled = !leanMotion && !reduceMotion;

  // Measured against the tall pin track, not the visible panel: progress 0 is the
  // moment the panel locks to the viewport and 1 is the moment it releases, so the
  // whole animation maps onto exactly the stretch where the page appears frozen.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  // Tuned for a fast, tight response. Most of the "sluggish" feel came from spring
  // lag rather than travel distance, so stiffness does more work here than the track
  // height does. Damping stays high enough to avoid overshoot, which at this speed
  // would read as wobble.
  const depthProgress = useSpring(scrollYProgress, {
    stiffness: 210,
    damping: 30,
    mass: 0.22,
  });

  // The backdrop drifts as one layer on a single MotionValue rather than a hook per
  // panel - eight subscriptions for a purely decorative parallax is not worth it.
  //
  // Driven by y/scale, not z: the layer's own translateZ would need a perspective on
  // .testimonial-stage, and adding one there would nest inside the grid's own
  // perspective and compound it. The panels still get real depth because the layer
  // itself establishes the perspective for its children.
  const voidY = useTransform(depthProgress, [0, 1], [-70, 80]);
  const voidScale = useTransform(depthProgress, [0, 1], [0.92, 1.1]);

  const loadTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json().catch(() => ({}));

      // 503 means the datastore is not provisioned yet. There genuinely are no
      // testimonials in that case, so show the neutral empty state rather than an
      // error banner on a live portfolio.
      if (response.status === 503) {
        setFeed({ status: 'success', items: [], error: null });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Recommendations are unavailable.');
      }

      setFeed({
        status: 'success',
        items: Array.isArray(data.testimonials) ? data.testimonials : [],
        error: null,
      });
    } catch (error) {
      setFeed({ status: 'error', items: [], error: error.message || 'Recommendations are unavailable.' });
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  // Same script-injection idiom as the TikTok embed loader above.
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return undefined;
    }

    const markReady = () => setGoogleReady(true);
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      if (window.google?.accounts?.id) {
        markReady();
      } else {
        existingScript.addEventListener('load', markReady, { once: true });
      }
      return () => existingScript.removeEventListener('load', markReady);
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = markReady;
    document.body.appendChild(script);

    return undefined;
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleReady || identity || !signInNode) {
      return;
    }

    const googleId = window.google?.accounts?.id;
    if (!googleId) {
      return;
    }

    googleId.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        const profile = decodeGoogleCredential(response?.credential);
        if (!profile) {
          setFormError('Google sign-in failed. Please try again.');
          return;
        }
        setCredential(response.credential);
        setIdentity({ name: profile.name || profile.email || 'You', picture: profile.picture || '' });
        setFormError('');
      },
    });

    // Google's official dark pill. The button is an iframe and cannot be restyled,
    // so these four options are the entire design surface - filled_black is the
    // darkest variant Google ships, and it sits closest to the site's near-black
    // panels. Kept as Google's real button rather than driving One Tap from a custom
    // one, which browsers can silently suppress.
    // Google appends its iframe rather than replacing what is already there, so a
    // node that has been rendered into before ends up holding a stale button from
    // the previous options. Clearing first guarantees exactly one iframe.
    signInNode.replaceChildren();

    googleId.renderButton(signInNode, {
      // Back to the original full button - it is the one that actually rendered
      // correctly. This is an <iframe> served by accounts.google.com, so these options
      // are the *only* control we have over its appearance; no CSS on our side reaches
      // inside it.
      //
      // Note: with an active Google session the standard button may render Google's
      // personalised variant ("Sign in as <name>" plus the account email). That is
      // Google's behaviour and cannot be disabled.
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      shape: 'pill',
      text: 'signin_with',
    });
    // signInNode is a dependency on purpose: when the block moves between the pinned
    // and unpinned slots the old node is destroyed, and the button has to be drawn
    // into the new one.
  }, [googleReady, identity, signInNode]);

  useEffect(() => {
    if (!submitOpen) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSubmitOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [submitOpen]);

  function handleSignOut() {
    window.google?.accounts?.id?.disableAutoSelect?.();
    setIdentity(null);
    setCredential('');
    setPublished(false);
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuote = quote.trim();

    if (trimmedQuote.length < TESTIMONIAL_MIN_LENGTH) {
      setFormError(`Please write at least ${TESTIMONIAL_MIN_LENGTH} characters.`);
      return;
    }

    if (trimmedQuote.length > TESTIMONIAL_MAX_LENGTH) {
      setFormError(`Please keep it under ${TESTIMONIAL_MAX_LENGTH} characters.`);
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, quote: trimmedQuote, role: role.trim() }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Could not publish your recommendation.');
      }

      setQuote('');
      setRole('');
      setPublished(true);
      await loadTestimonials();
    } catch (error) {
      setFormError(error.message || 'Could not publish your recommendation.');
    } finally {
      setSubmitting(false);
    }
  }

  const items = useMemo(() => {
    if (!import.meta.env.DEV) {
      return feed.items;
    }
    const requested = Number(new URLSearchParams(window.location.search).get('preview'));
    if (!Number.isFinite(requested) || requested < 1) {
      return feed.items;
    }
    return [...feed.items, ...buildPreviewItems(Math.min(requested, 60))];
  }, [feed.items]);

  const emptyMessage =
    feed.status === 'loading'
      ? 'Loading recommendations...'
      : feed.status === 'error'
        ? 'Recommendations are unavailable right now.'
        : 'No recommendations yet - be the first to leave one.';

  const pinned = items.length > 0 && depthEnabled;

  // Defined once and placed in two different slots: beside the heading when pinned,
  // below the grid otherwise. Duplicating this JSX would mean two forms with two
  // sets of state bugs waiting to happen.
  const submitBlock = GOOGLE_CLIENT_ID ? (
    <Reveal className="testimonial-form-wrap">
      {identity ? (
        <form className="contact-form testimonial-form" onSubmit={handleSubmit} noValidate>
          <div className="testimonial-signed-in full">
            <TestimonialAvatar name={identity.name} picture={identity.picture} />
            <p>
              Posting as <strong>{identity.name}</strong>
            </p>
            <button className="testimonial-signout" type="button" onClick={handleSignOut}>
              Not you?
            </button>
          </div>

          <label className="full">
            Role or company <span className="testimonial-optional">(optional)</span>
            <input
              type="text"
              name="role"
              value={role}
              maxLength={TESTIMONIAL_ROLE_MAX_LENGTH}
              placeholder="Software Engineer at Acme"
              onChange={(event) => setRole(event.target.value)}
              disabled={submitting}
            />
          </label>

          <label className="full">
            Your recommendation
            <textarea
              className={formError ? 'field-error' : ''}
              name="quote"
              rows="4"
              value={quote}
              maxLength={TESTIMONIAL_MAX_LENGTH}
              placeholder="What was it like working with me?"
              aria-invalid={Boolean(formError)}
              aria-describedby={formError ? 'testimonial-quote-error' : undefined}
              onChange={(event) => setQuote(event.target.value)}
              disabled={submitting}
            />
            {formError ? <FormError id="testimonial-quote-error">{formError}</FormError> : null}
          </label>

          <p>Your Google name and photo are shown with it. Your email is never published.</p>

          {published ? <p className="testimonial-published">Published - thank you.</p> : null}

          <button className="button button-primary full" type="submit" disabled={submitting}>
            {submitting ? 'Publishing...' : 'Publish recommendation'}
          </button>
        </form>
      ) : (
        <div className="testimonial-signin">
          <p className="testimonial-signin-label">
            Sign in with Google so your name can be shown with your words.
          </p>
          <div className="testimonial-signin-button" ref={setSignInNode} />
          {formError ? <FormError id="testimonial-signin-error">{formError}</FormError> : null}
        </div>
      )}
    </Reveal>
  ) : null;

  return (
    <section id="testimonials" className="section testimonial-space">
      {pinned ? (
        // Pinned run: a tall scroll track whose inner panel sticks to the viewport.
        // The page keeps scrolling normally - wheel events are never intercepted -
        // but because the panel is stuck, the only thing that appears to move is the
        // cards travelling toward the viewer. Scrolling back reverses it, since the
        // depth is bound to scroll position rather than direction.
        <div className="testimonial-track" ref={stageRef}>
          <div className="testimonial-pin">
            <div className="page-shell">
              {/* The action rides beside the heading rather than below the grid: the
                  pin fills the viewport, so anything under the cards is literally on
                  the next screen and never seen while the section is on show. */}
              <div className="testimonial-head">
                <SectionHeader eyebrow="Testimonials" title="What they said" />
                {submitBlock ? (
                  <div className="testimonial-head-action">
                    {/* Our own button, so it can say "Add yours" - Google's rendered
                        button cannot carry those words, and squeezing their iframe
                        into this slot is what kept producing a control that looked
                        like a broken toggle. Their official button now lives in the
                        panel this opens, where it has room and its branding is not
                        fighting the heading. */}
                    <button
                      type="button"
                      className="button button-primary testimonial-add"
                      onClick={() => setSubmitOpen(true)}
                    >
                      Add yours
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="testimonial-stage">
                <Motion.div
                  className="testimonial-void"
                  aria-hidden="true"
                  style={{ y: voidY, scale: voidScale }}
                >
                  {depthPanels.map((panel) => (
                    <span
                      key={`${panel.left}-${panel.top}`}
                      className="testimonial-void-panel"
                      style={{
                        left: panel.left,
                        top: panel.top,
                        width: panel.width,
                        height: panel.height,
                        opacity: panel.opacity,
                        transform: `translateZ(${panel.z}px)`,
                      }}
                    />
                  ))}
                </Motion.div>

                {/* Scatter while the cards still fit the hand-placed slots - that is
                    the realistic case and the one that matches the reference. Past
                    that a grid is the only thing that stays legible, so the dev
                    preview at ?preview=24 falls back to it. */}
                {items.length <= cardSlots.length ? (
                  <div className="testimonial-scatter">
                    {items.map((item, index) => (
                      <TestimonialDepthCard
                        key={item.id}
                        item={item}
                        index={index}
                        progress={depthProgress}
                        slot={cardSlots[index]}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="card-grid testimonial-grid testimonial-grid-3d">
                    {items.map((item, index) => (
                      <TestimonialDepthCard
                        key={item.id}
                        item={item}
                        index={index}
                        progress={depthProgress}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Scoped to the pin rather than the viewport: .testimonial-space is an
                isolated stacking context, so a fixed overlay could not rise above the
                navbar anyway. Covering the pinned panel is the same area in practice. */}
            <AnimatePresence>
              {submitOpen && submitBlock ? (
                <Motion.div
                  className="testimonial-submit-layer"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Add your recommendation"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                >
                  <button
                    type="button"
                    className="testimonial-submit-scrim"
                    aria-label="Close"
                    onClick={() => setSubmitOpen(false)}
                  />
                  <div className="testimonial-submit-panel">
                    <button
                      type="button"
                      className="testimonial-submit-close"
                      onClick={() => setSubmitOpen(false)}
                    >
                      Close
                    </button>
                    {submitBlock}
                  </div>
                </Motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      ) : null}

      <div className="page-shell">
        {/* Header lives inside the pin when pinned, so it stays with the cards. */}
        {pinned ? null : (
          <SectionHeader eyebrow="Testimonials" title="What they said" />
        )}

        {items.length > 0 && !pinned ? (
          <StaggerContainer className="card-grid testimonial-grid">
            {items.map((item) => (
              <MotionCard key={item.id} className="content-card testimonial-card">
                <TestimonialCardBody item={item} />
              </MotionCard>
            ))}
          </StaggerContainer>
        ) : null}

        {items.length === 0 ? (
          <Reveal className="testimonial-empty">
            <p>{emptyMessage}</p>
          </Reveal>
        ) : null}

        {/* Not pinned (mobile, reduced motion, or an empty list): the action goes
            back under the grid where there is normal page flow to sit in. */}
        {pinned ? null : submitBlock}
      </div>
    </section>
  );
}

// The three route pages are invisible to anyone who never looks at the navbar -
// they are not part of the Home scroll at all. This row surfaces them inline.
const exploreDestinations = [
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'The brands and content series I build and run across platforms.',
    Icon: FaCubes,
  },
  {
    to: '/afterlife',
    label: 'Afterlife',
    blurb: 'Philanthropy and the legacy work I want to outlast me.',
    Icon: FaStar,
  },
  {
    to: '/lab',
    label: 'Lab',
    blurb: 'Experiments, half-built ideas, and things I am still cooking.',
    Icon: FaCode,
  },
];

function ExploreMore() {
  return (
    <section id="explore" className="section explore-section">
      <div className="page-shell">
        <SectionHeader eyebrow="Explore" title="More of what I'm building">
          Beyond this page - the brands, the giving, and the experiments.
        </SectionHeader>

        <StaggerContainer className="card-grid explore-grid">
          {exploreDestinations.map((destination) => {
            const Icon = destination.Icon;
            return (
              <MotionCard key={destination.to} className="content-card explore-card">
                <NavLink to={destination.to} className="explore-link">
                  <span className="explore-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{destination.label}</h3>
                  <p>{destination.blurb}</p>
                  <span className="explore-cue">
                    Visit {destination.label} <FaArrowRight aria-hidden="true" />
                  </span>
                </NavLink>
              </MotionCard>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

// Slim band closing the Home scroll. The full contact card lives on /contact -
// this keeps the "I just read everything, now what" moment from dead-ending.
function ContactCta() {
  return (
    <section className="section contact-cta-section">
      <div className="page-shell">
        <Reveal className="contact-cta">
          <div className="contact-cta-copy">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something thoughtful.</h2>
            <p>Open to AI opportunities, software projects, collaborations, and promotions.</p>
          </div>
          <NavLink className="button button-primary" to="/contact">
            Get in touch <FaArrowRight aria-hidden="true" />
          </NavLink>
        </Reveal>
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
            <p>AI/ML Engineer, entrepreneur, and content creator from Sri Lanka - building intelligent, user-focused software.</p>
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
  CaseStudies,
  GitHubActivity,
  Certifications,
  TikTokSection,
  Promotions,
  Testimonials,
  ExploreMore,
  ContactCta,
  Contact,
};

