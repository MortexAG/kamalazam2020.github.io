import React from 'react';
import { HERO_DATA } from '../data/rockMediaData';
import { ArrowUpRight, Mail, Phone, Youtube, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer id="contact-us" className="bg-[#0c0c0c] text-neutral-300 border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Banner: "Ready to get started? Book Now!" */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1c1c1c] via-[#222] to-[#1a1a1a] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center flex-shrink-0">
              <img
                src="/kamal-azam-logo.png"
                alt="Kamal Azam"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
              />
            </div>
            <div className="hidden lg:block w-[1px] h-10 bg-white/10" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-display">
                Ready to get started?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Let's produce cinema-grade commercials and stories that captivate your audience.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Book Now!</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-white/10">
          {/* Column 1: About */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#a855f7] mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Creative Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Our Mission & Values
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Navigation & Help */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#c084fc] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('our-services')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-equipment')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Production Services Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-work')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Portfolio & Showreel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <a
                href={`mailto:${HERO_DATA.email}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <span>{HERO_DATA.email}</span>
              </a>
              <a
                href={`tel:${HERO_DATA.phone}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#a855f7] flex-shrink-0" />
                <span>{HERO_DATA.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex items-center space-x-6">
            <span>© 2025 Kamal Azam Media Production. All rights reserved.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/rock.media.production"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333ea] text-neutral-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@rmpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333ea] text-neutral-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/rock_media_production"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#9333ea] text-neutral-300 hover:text-white flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
