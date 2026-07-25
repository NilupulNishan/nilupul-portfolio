import { useState } from 'react';
import { SectionHeader, StaggerContainer, MotionCard } from '../sections';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ComingSoonModal from './ComingSoonModal';

// Shared layout for simple "header + card grid" pages (Afterlife, Lab).
// When `comingSoon` is true, cards are clickable and open a playful
// "still cooking" popup instead of doing nothing.
export default function CardListPage({ id, eyebrow, title, intro, items, docTitle, comingSoon = false }) {
  useDocumentTitle(docTitle);

  const [activeItem, setActiveItem] = useState(null);

  const cardProps = (item) =>
    comingSoon
      ? {
          className: 'content-card content-card--clickable',
          role: 'button',
          tabIndex: 0,
          onClick: () => setActiveItem(item),
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveItem(item);
            }
          },
        }
      : { className: 'content-card' };

  return (
    <section id={id} className="section">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} title={title}>
          {intro}
        </SectionHeader>

        <StaggerContainer className="card-grid project-grid">
          {items.map((item) => (
            <MotionCard key={item.title} {...cardProps(item)}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.tags?.length ? (
                <div className="badge-list">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>

      {comingSoon ? (
        <ComingSoonModal
          open={!!activeItem}
          title={activeItem?.title}
          onClose={() => setActiveItem(null)}
        />
      ) : null}
    </section>
  );
}
