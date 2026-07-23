import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar, Footer, BackToTop } from '../sections';
import ScrollManager from './ScrollManager';

export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <ScrollManager />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </div>
  );
}
