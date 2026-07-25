import CardListPage from '../components/CardListPage';
import { labItems } from '../data/portfolio';

export default function Lab() {
  return (
    <CardListPage
      id="lab"
      eyebrow="Lab"
      title="Funny & experimental"
      intro="A playground for half-baked ideas, silly demos, and experiments that exist purely for the fun of it."
      items={labItems}
      docTitle="Lab - Funny & Experimental | Nilupul Nishan"
      comingSoon
    />
  );
}
