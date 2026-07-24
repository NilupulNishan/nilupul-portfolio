import {
  FaArrowRight,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Promotions, SectionHeader, StaggerContainer, MotionCard } from '../sections';
import { brands } from '../data/portfolio';
import useDocumentTitle from '../hooks/useDocumentTitle';
import LiveProfileView from '../components/LiveProfileView';

// Pixieset has no brand icon in react-icons - use its serif "P" wordmark.
function PixiesetMark(props) {
  return (
    <span className="brand-letter-mark" {...props}>P</span>
  );
}

const brandLinkIconMap = {
  facebook: FaFacebookSquare,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  x: FaXTwitter,
  portfolio: PixiesetMark,
};

const platformLabel = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  x: 'X',
  portfolio: 'Portfolio',
};

export default function Channels() {
  useDocumentTitle('Channels - Nilupul Nishan');

  return (
    <>
      <section id="channels" className="section">
        <div className="page-shell">
          <SectionHeader eyebrow="Channels" title="My brands & content">
            The brands and content series I create under - each with its own home across platforms.
          </SectionHeader>

          <StaggerContainer className="card-grid tech-grid">
            {brands.map((brand) => {
              const activeLinks = brand.links.filter((link) => link.href);
              return (
                <MotionCard key={brand.name} className="content-card brand-card">
                  {brand.logo ? (
                    <div className="brand-logo">
                      <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" decoding="async" />
                    </div>
                  ) : null}
                  <small className="brand-category">{brand.category}</small>
                  <h3>{brand.name}</h3>
                  <p>{brand.description}</p>

                  <div className="brand-links">
                    {activeLinks.length ? (
                      activeLinks.map((link) => {
                        const Icon = brandLinkIconMap[link.type] || FaArrowRight;
                        const label = platformLabel[link.type] || link.type;
                        return (
                          <a
                            key={link.type}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${brand.name} on ${label}`}
                          >
                            <Icon aria-hidden="true" />
                          </a>
                        );
                      })
                    ) : (
                      <span className="brand-soon">Links coming soon</span>
                    )}
                  </div>
                </MotionCard>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <LiveProfileView />
      <Promotions />
    </>
  );
}
