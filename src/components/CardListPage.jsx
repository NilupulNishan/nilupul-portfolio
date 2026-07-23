import { SectionHeader, StaggerContainer, MotionCard } from '../sections';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Shared layout for simple "header + card grid" pages (Afterlife, Lab).
export default function CardListPage({ id, eyebrow, title, intro, items, docTitle }) {
  useDocumentTitle(docTitle);

  return (
    <section id={id} className="section">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} title={title}>
          {intro}
        </SectionHeader>

        <StaggerContainer className="card-grid project-grid">
          {items.map((item) => (
            <MotionCard key={item.title} className="content-card">
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
    </section>
  );
}
