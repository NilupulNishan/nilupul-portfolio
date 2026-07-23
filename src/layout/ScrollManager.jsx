import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to a target section when a navigation carries a `#hash` or `scrollTo`
// state; otherwise scrolls to top on route change. Replaces <ScrollRestoration/>
// so the section scroll is deterministic (no race with a scroll-to-top).
export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null);

    if (target && target !== 'home') {
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [location]);

  return null;
}
