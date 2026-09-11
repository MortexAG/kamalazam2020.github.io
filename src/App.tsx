import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { ProcessSection } from './components/ProcessSection';
import { RockBanner } from './components/RockBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { WorkPortfolio } from './components/WorkPortfolio';
import { EquipmentSection } from './components/EquipmentSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { PORTFOLIO_PROJECTS } from './data/rockMediaData';
import { PortfolioProject, ServiceItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('TV Commercial Production');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'our-services',
        'services-grid',
        'our-work',
        'our-equipment',
        'about-us',
        'contact-us',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenShowreel = () => {
    // Open the primary showreel project
    const showreel = PORTFOLIO_PROJECTS[0];
    setActiveProject(showreel);
    setVideoModalOpen(true);
  };

  const handlePlayVideo = (project: PortfolioProject) => {
    setActiveProject(project);
    setVideoModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service.title);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08090b] text-white selection:bg-[#a855f7] selection:text-white">
      {/* Clean Modern Welcome Intro Animation */}
      <Preloader />

      {/* Glassmorphic Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setPreselectedService('Commercial Ads');
          setBookingModalOpen(true);
        }}
      />

      {/* Main Website Flow */}
      <main>
        {/* Fullscreen Video Hero with Controls */}
        <Hero
          onWatchShowreel={handleOpenShowreel}
          onExploreWork={() => handleNavigate('our-work')}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* 3-Step Process: Pre-Production, Production, Post-Production */}
        <ProcessSection onViewAllServices={() => handleNavigate('services-grid')} />

        {/* Giant Interactive Kinetic Header: R o c k  m e d i a */}
        <RockBanner />

        {/* 6 Capabilities Cards */}
        <ServicesGrid
          onSelectService={handleSelectService}
          onViewAllWork={() => handleNavigate('our-work')}
        />

        {/* Filterable Work & Video Portfolio */}
        <WorkPortfolio
          onPlayVideo={handlePlayVideo}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Media Production Services & Packages Catalog */}
        <EquipmentSection
          onOpenBooking={(serviceName) => {
            setPreselectedService(serviceName || 'TV Commercial Production');
            setBookingModalOpen(true);
          }}
        />

        {/* About, Team & FAQ */}
        <AboutSection />
      </main>

      {/* Footer with Cairo Mokattam Map */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppFloat />

      {/* Cinematic Video Player Popup */}
      <VideoModal
        isOpen={videoModalOpen}
        project={activeProject}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Project Brief & Consultation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        preselectedService={preselectedService}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
