import {
  Hero,
  About,
  Education,
  TechStack,
  Experience,
  CaseStudies,
  GitHubActivity,
  Certifications,
  Testimonials,
  ExploreMore,
  ContactCta,
} from '../sections';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Nilupul Nishan - AI/ML Engineer & Content Creator');

  return (
    <>
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Experience />
      <CaseStudies />
      <GitHubActivity />
      <Certifications />
      <Testimonials />
      <ExploreMore />
      <ContactCta />
    </>
  );
}
