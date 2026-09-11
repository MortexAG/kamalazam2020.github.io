import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_DATA } from '../data/rockMediaData';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about-us', label: 'About Us' },
    { id: 'our-services', label: 'Our Services' },
    { id: 'our-equipment', label: 'Services Shop' },
    { id: 'our-work', label: 'Our Work' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#101010]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo: Uploaded Kamal Azam Signature Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center group cursor-pointer focus:outline-none py-1"
            aria-label="Kamal Azam Media Production Home"
          >
            <img
              src="/kamal-azam-logo.png"
              alt="Kamal Azam"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain brightness-110 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_18px_rgba(192,132,252,0.6)] transition-all duration-300"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium rounded-full transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBadge"
                      className="absolute inset-0 bg-[#9333ea] rounded-full -z-10 shadow-[0_0_18px_rgba(168,85,247,0.55)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Phone Button & Book Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              id="nav-phone-cta"
              href={`tel:${HERO_DATA.phone}`}
              className="flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-300 group"
              title="Call Kamal Azam Media Production"
            >
              <span className="w-5 h-5 rounded-full bg-[#a855f7] flex items-center justify-center text-white text-[10px] group-hover:scale-110 transition-transform">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-mono text-[13px] tracking-wide">{HERO_DATA.phone}</span>
            </a>

            <button
              id="nav-book-cta"
              onClick={onOpenBooking}
              className="flex items-center space-x-1.5 px-4 py-1.5 text-xs uppercase font-semibold tracking-wider bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white rounded-full hover:brightness-110 transition-all shadow-[0_0_22px_rgba(168,85,247,0.45)] cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href={`tel:${HERO_DATA.phone}`}
              className="p-2 rounded-full bg-white/5 text-neutral-200 border border-white/10"
              aria-label="Call Kamal Azam"
            >
              <Phone className="w-4 h-4 text-[#a855f7]" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-[#121212]/95 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 text-sm uppercase tracking-wider font-medium rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#9333ea] text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={`tel:${HERO_DATA.phone}`}
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
                >
                  <Phone className="w-4 h-4 text-[#a855f7]" />
                  <span>Call: {HERO_DATA.phoneDisplay}</span>
                </a>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white text-sm font-semibold uppercase tracking-wider text-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  Book Production Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
