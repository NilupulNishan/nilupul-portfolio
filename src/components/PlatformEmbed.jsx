import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaFacebookSquare, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Which platforms render a real, key-free official embed. Everything else
// falls back to an "open profile" card until an API is wired up later.
const EMBEDDABLE = new Set(['tiktok', 'facebook']);

const iconMap = {
  tiktok: FaTiktok,
  facebook: FaFacebookSquare,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  portfolio: FaArrowRight,
};

const labelMap = {
  tiktok: 'TikTok',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  portfolio: 'Portfolio',
};

// TikTok creator embeds key off the username, e.g. .../@mrnilupul2k → mrnilupul2k.
function tiktokUsername(href) {
  const match = /tiktok\.com\/@([^/?#]+)/i.exec(href || '');
  return match ? match[1] : '';
}

function facebookPluginSrc(href) {
  const params = new URLSearchParams({
    href,
    tabs: 'timeline',
    width: '360',
    height: '520',
    small_header: 'true',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'true',
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

export function isEmbeddable(type, href) {
  if (!href || !EMBEDDABLE.has(type)) return false;
  if (type === 'tiktok') return Boolean(tiktokUsername(href));
  return true;
}

function FallbackLink({ type, href, name }) {
  const Icon = iconMap[type] || FaArrowRight;
  const label = labelMap[type] || type;
  return (
    <a className="embed-profile-fallback" href={href} target="_blank" rel="noopener noreferrer">
      <Icon aria-hidden="true" />
      <div>
        <p>{label}</p>
        <span>Open {name} on {label}</span>
      </div>
    </a>
  );
}

function TikTokEmbed({ href, name }) {
  const username = tiktokUsername(href);
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const scriptId = 'tiktok-embed-script';
    let timer;

    const check = () => {
      window.tiktokEmbed?.load?.();
      timer = window.setTimeout(() => {
        setLoaded(Boolean(ref.current?.querySelector('iframe')));
        setChecked(true);
      }, 2600);
    };

    const existing = document.getElementById(scriptId);
    if (existing) {
      check();
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      script.onload = check;
      script.onerror = () => setChecked(true);
      document.body.appendChild(script);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [username]);

  return (
    <div ref={ref}>
      <div className="tiktok-official-embed">
        <blockquote
          className="tiktok-embed"
          cite={href}
          data-unique-id={username}
          data-embed-type="creator"
          style={{ maxWidth: '100%', minWidth: 220 }}
        >
          <section>
            <a href={href} target="_blank" rel="noopener noreferrer">@{username}</a>
          </section>
        </blockquote>
      </div>
      {!loaded && checked ? <FallbackLink type="tiktok" href={href} name={name} /> : null}
    </div>
  );
}

function FacebookEmbed({ href, name }) {
  return (
    <div className="facebook-official-embed">
      <iframe
        title={`${name} on Facebook`}
        src={facebookPluginSrc(href)}
        style={{ border: 'none', overflow: 'hidden', width: '100%', height: 520 }}
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
        loading="lazy"
      />
      <FallbackLink type="facebook" href={href} name={name} />
    </div>
  );
}

// Renders an official, key-free platform embed once scrolled into view.
// Falls back to an "open profile" link for platforms that don't embed.
export default function PlatformEmbed({ type, href, name, label }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px', threshold: 0.01 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const platformLabel = label || labelMap[type] || type;

  return (
    <div className="embed-card platform-embed" ref={ref}>
      <div className="embed-card-header">
        <p className="embed-label">{platformLabel}</p>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Open profile <FaArrowRight aria-hidden="true" />
        </a>
      </div>

      {!inView ? (
        <div className="embed-placeholder" aria-hidden="true" />
      ) : isEmbeddable(type, href) ? (
        type === 'tiktok' ? (
          <TikTokEmbed href={href} name={name} />
        ) : (
          <FacebookEmbed href={href} name={name} />
        )
      ) : (
        <FallbackLink type={type} href={href} name={name} />
      )}
    </div>
  );
}
