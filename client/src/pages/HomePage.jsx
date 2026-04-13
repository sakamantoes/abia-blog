import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import TourAbia from '../components/TourAbia';
import AbiaMap from '../components/AbiaMap';
import ContactUs from '../components/ContactUs';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <TourAbia />
      <AbiaMap />
      <ContactUs />
    </>
  );
};

export default HomePage;