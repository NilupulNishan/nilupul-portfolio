import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import {
  FaArrowRight,
  FaArrowUp,
  FaBrain,
  FaChevronDown,
  FaCubes,
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaImage,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMicrosoft,
  FaMoon,
  FaPlug,
  FaRobot,
  FaSun,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import {
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
import { VscVscode } from 'react-icons/vsc';
import profilePic from './assets/profile/profile_pic2.jpg';
import certifications from './data/certifications.json';
import {
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

const creatorMenuItems = [
  { label: 'TikTok Creator', href: '#tiktok' },
  { label: 'My Spotify Playlist', href: '#playlist' },
  { label: 'Promotions', href: '#promotions' },
];

const githubContributionSummary = {
  username: 'gurugetnm',
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
  creator: '#playlist',
  'creator-corner': '#playlist',
  tiktok: '#playlist',
  playlist: '#playlist',
  promotions: '#playlist',
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
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Vercel: SiVercel,
  Azure: FaMicrosoft,
  Figma: SiFigma,
  Postman: SiPostman,
  'VS Code': VscVscode,
  Codex: FaRobot,
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

function NavActivePill() {
  const reduceMotion = useReducedMotion();

  return reduceMotion ? <span className="nav-active-pill" aria-hidden="true" /> : (
    <Motion.span
      className="nav-active-pill"
      layoutId="nav-active-pill"
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}

function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  return <Motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }} aria-hidden="true" />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [mobileCreatorOpen, setMobileCreatorOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [activeNav, setActiveNav] = useState('#home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const creatorRef = useRef(null);
  const leanMotion = useLeanMotion();
  const reduceMotion = useReducedMotion();
  const isCreatorActive = activeNav === '#playlist';

  const closeMobileMenu = useCallback(() => {
    setOpen(false);
    setMobileCreatorOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
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
        setCreatorOpen(false);
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleHashChange = () => {
      setCreatorOpen(false);
      closeMobileMenu();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [closeMobileMenu]);

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
    if (!creatorOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!creatorRef.current?.contains(event.target)) {
        setCreatorOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [creatorOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        closeMobileMenu();
      } else {
        setCreatorOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
      const sectionTargets = Array.from(document.querySelectorAll('section[id]'))
        .filter((section) => sectionToNavMap[section.id]);

      const documentHeight = document.documentElement.scrollHeight;
      const bottomDistance = documentHeight - (window.scrollY + window.innerHeight);

      if (bottomDistance < 24) {
        setActiveSection('#contact');
        setActiveNav('#contact');
        return;
      }

      const contactSection = document.querySelector('#contact');
      if (contactSection?.getBoundingClientRect().top <= window.innerHeight * 0.72) {
        setActiveSection('#contact');
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
      setActiveSection(`#${currentSectionId}`);

      if (mappedNav) {
        setActiveNav(mappedNav);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand-mark" href="#home" aria-label="Thevindu Guruge home" onClick={closeMobileMenu}>
            <span>Thevindu Guruge</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => {
              if (item.label === 'Creator') {
                return (
                  <div
                    key={item.href}
                    className={`nav-dropdown ${creatorOpen ? 'is-open' : ''} ${isCreatorActive ? 'active-dropdown' : ''}`}
                    ref={creatorRef}
                    onMouseEnter={() => setCreatorOpen(true)}
                    onMouseLeave={() => setCreatorOpen(false)}
                  >
                    <button
                      className="nav-dropdown-trigger"
                      type="button"
                      aria-expanded={creatorOpen}
                      aria-controls="creator-dropdown"
                      onClick={() => setCreatorOpen((value) => !value)}
                    >
                      {isCreatorActive ? <NavActivePill /> : null}
                      <span className="nav-link-label">Creator</span>
                      <FaChevronDown aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                      {creatorOpen ? (
                        <Motion.div
                          id="creator-dropdown"
                          className="creator-dropdown"
                          initial={reduceMotion ? false : leanMotion ? { opacity: 0, y: 6 } : { opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={reduceMotion ? { opacity: 0 } : leanMotion ? { opacity: 0, y: 6 } : { opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.16 : 0.18, ease: 'easeOut' }}
                        >
                          {creatorMenuItems.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className={activeSection === child.href ? 'active-nav' : ''}
                              onClick={() => setCreatorOpen(false)}
                            >
                              {child.label}
                            </a>
                          ))}
                        </Motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a key={item.href} href={item.href} className={activeNav === item.href ? 'active-nav' : ''}>
                  {activeNav === item.href ? <NavActivePill /> : null}
                  <span className="nav-link-label">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="nav-actions">
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
              onClick={() => setOpen((value) => {
                if (value) {
                  setMobileCreatorOpen(false);
                }
                return !value;
              })}
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
              {navItems.map((item) => {
                if (item.label === 'Creator') {
                  return (
                    <div key={item.href} className="mobile-creator-group">
                      <button
                        className={`mobile-creator-trigger ${isCreatorActive ? 'active-nav' : ''} ${mobileCreatorOpen ? 'is-open' : ''}`}
                        type="button"
                        aria-expanded={mobileCreatorOpen}
                        aria-controls="mobile-creator-links"
                        onClick={() => setMobileCreatorOpen((value) => !value)}
                      >
                        Creator <FaChevronDown aria-hidden="true" />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileCreatorOpen ? (
                          <Motion.div
                            id="mobile-creator-links"
                            className="mobile-creator-links"
                            initial={reduceMotion ? false : { opacity: 0, y: leanMotion ? -6 : -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: reduceMotion ? 0 : leanMotion ? 0.16 : 0.16, ease: 'easeOut' }}
                          >
                            {creatorMenuItems.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                className={activeSection === child.href ? 'active-nav' : ''}
                                onClick={closeMobileMenu}
                              >
                                {child.label}
                              </a>
                            ))}
                          </Motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={activeNav === item.href ? 'active-nav' : ''}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                );
              })}
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
      <div className="soft-blur soft-blur-one" />
      <div className="soft-blur soft-blur-two" />

      <div className="page-shell hero-grid">
        <Motion.div className="hero-copy" variants={leanMotion ? mobileHeroStagger : heroStagger} initial={reduceMotion ? false : 'hidden'} animate="visible">
          <Motion.div className="hero-meta" variants={leanMotion ? mobileFadeUp : fadeUp}>
            <span>AI Intern at Softvil Technologies</span>
            <span>Sri Lanka</span>
            <span>Software Engineering</span>
          </Motion.div>
          <Motion.h1 variants={leanMotion ? mobileHeroStagger : heroStagger} aria-label="Thevindu Guruge">
            {['Thevindu', 'Guruge'].map((word) => (
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
          <Motion.h2 variants={leanMotion ? mobileFadeUp : fadeUp}>Software Engineering Undergraduate & AI Intern at Softvil Technologies</Motion.h2>
          <Motion.p className="hero-description" variants={leanMotion ? mobileFadeUp : fadeUp}>
            I build intelligent, user-focused software across AI, web, mobile, and full-stack development.
          </Motion.p>

          <Motion.div className="hero-actions" variants={leanMotion ? mobileFadeUp : fadeUp}>
            <a className="button button-dark" href="#projects">
              View Projects <FaArrowRight aria-hidden="true" />
            </a>
            <a className="button button-light" href="#contact">
              Contact Me
            </a>
            <a className="button button-light" href="https://www.tiktok.com/@guruge_tnm" target="_blank" rel="noopener noreferrer">
              <FaTiktok aria-hidden="true" /> TikTok
            </a>
          </Motion.div>
        </Motion.div>

        <Motion.div
          className="identity-card floating-card"
          initial={heroImageMotion}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={heroImageTransition}
        >
          <div className="identity-portrait">
            <img
              src={profilePic}
              alt="Thevindu Guruge, AI Intern at Softvil Technologies and Software Engineering undergraduate from Sri Lanka"
              width="977"
              height="976"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="identity-details">
            <h3>AI, software engineering, and creator work with a practical product mindset.</h3>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    {
      title: 'AI Intern',
      meta: 'Current role',
      description: 'Working on real AI-related product tasks at Softvil Technologies.',
    },
    {
      title: 'Software Engineering',
      meta: 'Academic focus',
      description: 'Studying and building across web, mobile, backend, and databases.',
    },
    {
      title: 'Creator',
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
          I&apos;m a Software Engineering undergraduate from Sri Lanka, currently working as an AI Intern at Softvil Technologies.
          I&apos;m interested in AI, machine learning, mobile apps, web applications, and building real-world software solutions.
          <br />
          Online, I also use the handles tnmguruge and gurugetnm across my creator and developer profiles.
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
  const experience = {
    date: 'Aug 2025 - Present',
    company: 'Softvil Technologies',
    role: 'AI Intern',
    logo: '/softvil-logo.png',
    description: 'Working on AI-related solutions, software features, debugging, development tasks, and real-world product improvements.',
  };

  return (
    <section id="experience" className="section">
      <div className="page-shell">
        <div className="experience-heading">
          <p>Current professional work</p>
          <h2>Experience</h2>
        </div>

        <Reveal className="experience-card">
          <div className="experience-card-main">
            <div className="experience-brand">
              <div className="experience-logo">
                <img src={experience.logo} alt={`${experience.company} logo`} width="389" height="258" loading="lazy" decoding="async" />
              </div>
              <div>
                <span>{experience.company}</span>
                <h3>{experience.role}</h3>
              </div>
            </div>

            <span className="experience-date">{experience.date}</span>
          </div>

          <p className="experience-description">{experience.description}</p>

          <div className="experience-tags" aria-label="Experience focus areas">
            <span>AI Solutions</span>
            <span>Debugging</span>
            <span>Product Improvements</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  const educationItems = [
    {
      institution: 'Informatics Institute of Technology (IIT)',
      affiliation: 'Affiliated with University of Westminster',
      degree: 'Bachelor of Engineering - BEng, Software Engineering',
      date: 'Sep 2023 - Present',
      logo: '/education/iit-logo.png',
      monogram: 'IIT',
    },
    {
      institution: 'Dharmasoka College - Ambalangoda',
      degree: 'Completed primary and secondary education with strong O/L results and followed the Physical Science stream for A/Ls, focusing on Combined Mathematics, Chemistry, and Physics.',
      date: '2009 - 2022',
      logo: '/education/dharmasoka-college-logo.png',
      monogram: 'DC',
      details: [
        {
          title: 'G.C.E. Ordinary Level Examination',
          meta: '2019',
          description: 'Results: 8 A passes and 1 B pass',
        },
        {
          title: 'G.C.E. Advanced Level Examination',
          meta: '2022',
          description: 'Passed - Physical Science Stream: Combined Mathematics, Chemistry, Physics',
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
        <SectionHeader eyebrow="Projects" title="Projects and coursework">
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
          Courses and certificates that support my software engineering, Java, web, programming, and tooling foundation.
        </SectionHeader>

        <AnimatePresence mode="wait">
          <StaggerContainer
            key={isMobile ? `mobile-${mobileVisibleCount}` : `page-${page}-${certificatesPerPage}`}
            className="card-grid certificate-grid"
          >
            {visibleCertificates.map((certificate) => (
              <MotionCard key={certificate.link} className="content-card certificate-card">
                <div className="certificate-topline">
                  <div className="certificate-meta">
                    <span className="certificate-date">{certificate.date}</span>
                    <span className="certificate-provider" aria-label="LinkedIn Learning certificate">
                      <FaLinkedin aria-hidden="true" />
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

  const contributionCount =
    githubData.status === 'success'
      ? new Intl.NumberFormat('en-US').format(githubData.lastYearContributions ?? githubData.totalContributions)
      : githubData.status === 'loading'
        ? 'Loading'
        : 'Unavailable';

  const contributionLabel =
    githubData.status === 'success'
      ? 'contributions in the last 52 weeks'
      : githubData.status === 'loading'
        ? 'GitHub contributions'
        : 'Contribution data unavailable';

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

          <div className="github-count-row">
            <strong className={githubData.status !== 'success' ? 'github-status-text' : undefined}>{contributionCount}</strong>
            <span>{contributionLabel}</span>
            {githubData.status === 'success' ? <small className="github-source-label">Fetched from GitHub GraphQL</small> : null}
          </div>

          {lastUpdatedLabel ? <p className="github-updated">{lastUpdatedLabel}</p> : null}

          <div className="github-chart-wrap">
            <GitHubContributionCalendar calendar={githubData.contributionCalendar} />
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
        <a href="https://www.tiktok.com/@guruge_tnm" target="_blank" rel="noopener noreferrer">
          Open profile <FaArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="tiktok-official-embed">
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@guruge_tnm"
          data-unique-id="guruge_tnm"
          data-embed-type="creator"
          style={{ maxWidth: '100%', minWidth: 220 }}
        >
          <section>
            <a href="https://www.tiktok.com/@guruge_tnm" target="_blank" rel="noopener noreferrer">
              @guruge_tnm
            </a>
          </section>
        </blockquote>
      </div>

      {!embedLoaded && embedChecked ? (
        <a className="embed-profile-fallback" href="https://www.tiktok.com/@guruge_tnm" target="_blank" rel="noopener noreferrer">
          <FaTiktok aria-hidden="true" />
          <div>
            <p>@guruge_tnm</p>
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
            <a className="button button-dark" href="https://www.tiktok.com/@guruge_tnm" target="_blank" rel="noopener noreferrer">
              Follow on TikTok <FaArrowRight aria-hidden="true" />
            </a>
          </div>
          <TikTokEmbed />
        </Reveal>
      </div>
    </section>
  );
}

function SpotifyPlaylist() {
  const [playlistData, setPlaylistData] = useState({
    status: 'loading',
    followers: null,
    totalTracks: null,
    lastUpdated: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadPlaylistData() {
      try {
        const response = await fetch('/api/spotify-playlist');
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.error || 'Spotify playlist data unavailable.');
        }

        if (!cancelled) {
          setPlaylistData({
            status: 'success',
            followers: typeof data.followers === 'number' ? data.followers : null,
            totalTracks: typeof data.totalTracks === 'number' ? data.totalTracks : null,
            lastUpdated: data.lastUpdated || null,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setPlaylistData({
            status: 'error',
            followers: null,
            totalTracks: null,
            lastUpdated: null,
            error: error.message || 'Spotify playlist data unavailable.',
          });
        }
      }
    }

    loadPlaylistData();

    return () => {
      cancelled = true;
    };
  }, []);

  const playlistFollowerLabel =
    playlistData.status === 'loading'
      ? 'Loading'
      : playlistData.followers === null
        ? 'Unavailable'
        : new Intl.NumberFormat('en-US').format(playlistData.followers);
  const showPlaylistFollowerStat = playlistData.status === 'loading' || playlistData.followers !== null;

  const playlistTrackLabel =
    playlistData.status === 'loading'
      ? 'Loading'
      : playlistData.totalTracks === null
        ? 'Unavailable'
        : new Intl.NumberFormat('en-US').format(playlistData.totalTracks);
  const showPlaylistTrackStat = playlistData.status === 'loading' || playlistData.totalTracks !== null;
  const showPlaylistStats = showPlaylistFollowerStat || showPlaylistTrackStat;

  return (
    <section id="playlist" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Playlist" title="My Spotify Playlist">
          A playlist curated by me — built around sounds, moods, and lyrics that inspire my content and creative side.
        </SectionHeader>

        <Reveal className="spotify-feature-card">
          <div className="spotify-card-copy">
            <p className="eyebrow">Curated by me</p>
            <h3>Sounds, moods, and lyrics behind my creative side.</h3>
            <p>A playlist curated by me — built around the sounds, moods, and lyrics that inspire my content and creative side.</p>
            {showPlaylistStats && (
              <div className="spotify-stat-row" aria-label="Spotify playlist stats">
                {showPlaylistFollowerStat && (
                  <span>
                    <strong>{playlistFollowerLabel}</strong>
                    Playlist saves
                  </span>
                )}
                {showPlaylistTrackStat && (
                  <span>
                    <strong>{playlistTrackLabel}</strong>
                    Tracks
                  </span>
                )}
              </div>
            )}
            <small className="spotify-live-note">
              {playlistData.status === 'success' ? 'Updated from Spotify.' : 'Save count unavailable when Spotify API credentials are not configured.'}
            </small>
          </div>
          <iframe
            data-testid="embed-iframe"
            title="Spotify playlist curated by Thevindu Guruge"
            src="https://open.spotify.com/embed/playlist/7uDWHXuLF6Mi2UHoYhfA5l?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
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
      'Hello Thevindu, I’m interested in a promotion/collaboration.',
      '',
      `Name: ${values.name}`,
      `Brand / Business: ${values.brand}`,
      `Promotion Type: ${values.promotionType}`,
      `Message: ${values.message}`,
    ].join('\n');

    window.open(`https://wa.me/94758096646?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
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
              <button className="button button-dark full" type="submit">
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
                <a className="button button-dark" href={whatsAppLink.href} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp aria-hidden="true" /> Message on WhatsApp
                </a>
              ) : null}
              {emailLink ? (
                <a className="button button-light" href={emailLink.href}>
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
        <p>&copy; 2026 Thevindu Guruge. All rights reserved.</p>
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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Certifications />
        <TikTokSection />
        <SpotifyPlaylist />
        <Promotions />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </div>
  );
}

export default App;

