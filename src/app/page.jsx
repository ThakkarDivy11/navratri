'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import EventCatalogue from '@/components/EventCatalogue';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import PricingTiers from '@/components/PricingTiers';
import PassFormats from '@/components/PassFormats';
import BulkBanner from '@/components/BulkBanner';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVenue, setModalVenue] = useState('Karnavati Club Garba 2026');
  const [modalPass, setModalPass] = useState('General');
  const [modalFormat, setModalFormat] = useState('Physical Pass');

  const handleRequestPasses = (venue = 'Karnavati Club Garba 2026', pass = 'General', format = 'Physical Pass') => {
    setModalVenue(venue);
    setModalPass(pass);
    setModalFormat(format);
    setModalOpen(true);
  };

  return (
    <main>
      <Header onRequestPasses={handleRequestPasses} />
      <Hero onRequestPasses={handleRequestPasses} />
      <TrustStrip />
      <EventCatalogue onRequestPasses={handleRequestPasses} />
      <HowItWorks />
      <WhyChooseUs />
      <PricingTiers onRequestPasses={handleRequestPasses} />
      <PassFormats onRequestPasses={handleRequestPasses} />
      <BulkBanner onRequestPasses={handleRequestPasses} />
      <FAQ />
      <Contact />
      <FinalCTA onRequestPasses={handleRequestPasses} />
      <Footer />
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialVenue={modalVenue}
        initialPass={modalPass}
        initialFormat={modalFormat}
      />
    </main>
  );
}
