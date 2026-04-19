import { useState, useEffect } from 'react';
import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowIWork from './components/HowIWork';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import AutomationSection from './components/AutomationSection';
import Testimonials from './components/Testimonials';
import FitSection from './components/FitSection';
import CredentialsBar from './components/CredentialsBar';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ContactForm from './components/ContactForm';

export default function App() {
  const [page, setPage] = useState(window.location.hash === '#contact' ? 'contact' : 'home');

  useEffect(() => {
    const handler = () => setPage(window.location.hash === '#contact' ? 'contact' : 'home');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (page === 'contact') return <ContactForm />;

  return (
    <>
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.02,
          mixBlendMode: 'overlay',
        }}
      />

      <Nav />
      <Hero />
      <Problem />
      <HowIWork />
      <Services />
      <AutomationSection />
      <Testimonials />
      {/* <CaseStudies /> */}
      <FitSection />
      <CredentialsBar />
      <CTASection />
      <Footer />
      <ChatWidget />
    </>
  );
}
