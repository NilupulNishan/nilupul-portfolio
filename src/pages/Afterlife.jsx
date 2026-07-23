import CardListPage from '../components/CardListPage';
import { afterlifeItems } from '../data/portfolio';

export default function Afterlife() {
  return (
    <CardListPage
      id="afterlife"
      eyebrow="Afterlife"
      title="Philanthropy & legacy"
      intro="Giving back, the causes I support, and the legacy I want to build beyond the screen."
      items={afterlifeItems}
      docTitle="Afterlife — Philanthropy & Legacy | Nilupul Nishan"
    />
  );
}
