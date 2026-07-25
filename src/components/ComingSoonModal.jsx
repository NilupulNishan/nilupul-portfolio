import { useEffect } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';

// Playful "coming soon" popup shown when a work-in-progress card is clicked
// (Afterlife / Lab). Mirrors the blurred-backdrop dialog pattern used by the
// mobile navigation menu in sections.jsx.
export default function ComingSoonModal({ open, onClose, title }) {
  const reduceMotion = useReducedMotion();

  // Lock body scroll while the modal is open.
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

  // Close on Escape.
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <Motion.div
          className="coming-soon-layer"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          onPointerDown={onClose}
          onClick={onClose}
        >
          <Motion.div
            className="coming-soon-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Coming soon"
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="coming-soon-close"
              type="button"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>

            <video
              className="coming-soon-video"
              src="/cooking-gorilla.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />

            <div className="coming-soon-text">
              <h3 className="coming-soon-title">I&apos;m cooking, hang tight! &#127859;</h3>
              <p className="coming-soon-sub">
                {title ? `“${title}” is still in the works — check back soon.` : 'Still in the works — check back soon.'}
              </p>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
