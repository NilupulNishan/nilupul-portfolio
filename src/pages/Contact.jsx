import { Contact as ContactSection } from '../sections';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Contact() {
  useDocumentTitle('Contact - Nilupul Nishan');

  return <ContactSection />;
}
