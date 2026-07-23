import { useState } from 'react';
import { SectionHeader } from '../sections';
import { brands } from '../data/portfolio';
import PlatformEmbed, { isEmbeddable } from './PlatformEmbed';

// A unified "profile view" that pulls each brand's live content straight from
// the platforms via their official embeds — no API keys required. Only the
// active brand's embeds mount, keeping the page light.
export default function LiveProfileView() {
  const [active, setActive] = useState(0);
  const brand = brands[active];
  const links = brand.links.filter((link) => link.href);
  const embeddable = links.filter((link) => isEmbeddable(link.type, link.href));
  const linkOnly = links.filter((link) => !isEmbeddable(link.type, link.href));

  return (
    <section id="live-profile" className="section">
      <div className="page-shell">
        <SectionHeader eyebrow="Live profile" title="Straight from my platforms">
          Pick a brand to see its latest content pulled live from each platform — always current, because
          each platform serves its own feed.
        </SectionHeader>

        <div className="brand-tabs" role="tablist" aria-label="Brands">
          {brands.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`brand-tab${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="brand-feed">
          {embeddable.length ? (
            <div className="brand-feed-grid">
              {embeddable.map((link) => (
                <PlatformEmbed
                  key={`${brand.name}-${link.type}`}
                  type={link.type}
                  href={link.href}
                  name={brand.name}
                />
              ))}
            </div>
          ) : (
            <p className="embed-fallback">
              No embeddable feed for this brand yet — open it directly on its platforms below.
            </p>
          )}

          {linkOnly.length ? (
            <div className="brand-feed-links">
              {linkOnly.map((link) => (
                <PlatformEmbed
                  key={`${brand.name}-${link.type}`}
                  type={link.type}
                  href={link.href}
                  name={brand.name}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
