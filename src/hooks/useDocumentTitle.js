import { useEffect } from 'react';

/**
 * Sets the document <title> (and optional meta description) per page.
 * Client-side only — see the SEO caveat in the plan if crawler-perfect meta is needed.
 */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
