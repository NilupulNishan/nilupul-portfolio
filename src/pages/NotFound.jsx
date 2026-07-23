import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { SectionHeader } from '../sections';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found — Nilupul Nishan');

  return (
    <section className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="404" title="This page wandered off">
          The page you’re looking for doesn’t exist or has moved.
        </SectionHeader>
        <Link className="button button-primary" to="/">
          Back home <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
