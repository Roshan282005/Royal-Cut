import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { RoyalCutCrest } from './RoyalCutCrest';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, barberId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracking for active state
      const sections = [
        'hero',
        'experience',
        'services',
        'packages',
        'masters',
        'gallery',
        'membership',
        'contact',
      ];

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'PACKAGES', href: '#packages', id: 'packages' },
    { label: 'MASTERS', href: '#masters', id: 'masters' },
    { label: 'GALLERY', href: '#gallery', id: 'gallery' },
    { label: 'MEMBERSHIP', href: '#membership', id: 'membership' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(element as HTMLElement, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#070709]/95 backdrop-blur-xl border-b border-[#c5a059]/20 shadow-[0_12px_36px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
            : 'bg-gradient-to-b from-[#070709]/90 via-[#070709]/40 to-transparent border-b border-transparent py-5 sm:py-6'
        }`}
      >
        {/* Subtle Top Metallic Hairline Accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/35 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <a
            href="#hero"
            id="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="relative">
              <RoyalCutCrest className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_2px_10px_rgba(197,160,89,0.35)] group-hover:drop-shadow-[0_2px_16px_rgba(222,184,106,0.5)] transition-all duration-300 transform group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-serif-didot text-[15px] sm:text-[17px] font-bold tracking-[0.22em] text-[#f5f0e6] group-hover:text-white transition-colors uppercase">
                  ROYAL
                </span>
                <span className="font-serif-didot text-[15px] sm:text-[17px] font-bold tracking-[0.22em] text-[#c5a059] group-hover:text-[#deb86a] transition-colors uppercase">
                  CUT
                </span>
              </div>
              <span className="text-[8.5px] sm:text-[9px] font-mono tracking-[0.32em] text-[#c5a059]/80 group-hover:text-[#c5a059] font-medium mt-1 uppercase">
                SALOON • NY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-[11px] xl:text-xs tracking-[0.2em] font-medium transition-all duration-300 relative py-1 group ${
                    isActive
                      ? 'text-[#deb86a] drop-shadow-[0_0_8px_rgba(197,160,89,0.25)]'
                      : 'text-zinc-300 hover:text-[#deb86a]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Underline expanding from center on hover or permanent if active */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-[#deb86a] via-[#f7e7c4] to-[#deb86a] transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action: Concierge Phone & Book Appointment CTA */}
          <div className="hidden sm:flex items-center gap-4 xl:gap-5">
            {/* Contact Phone */}
            <div className="hidden xl:flex items-center gap-5">
              <div className="h-4 w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/35 to-transparent" />
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                id="nav-phone-contact"
                className="group/phone flex items-center gap-2 text-zinc-400 hover:text-[#f5f0e6] transition-colors duration-300 py-1"
                title="Call Royal Cut Concierge"
              >
                <div className="w-6 h-6 rounded-full border border-[#c5a059]/30 group-hover/phone:border-[#c5a059]/70 flex items-center justify-center bg-[#c5a059]/5 transition-colors">
                  <Phone className="w-3 h-3 text-[#c5a059] group-hover/phone:text-[#deb86a] transition-colors" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[7.5px] font-mono tracking-[0.25em] text-[#c5a059] uppercase leading-none">
                    CONCIERGE
                  </span>
                  <span className="text-[11.5px] font-mono tracking-wider text-zinc-300 group-hover/phone:text-[#f5f0e6] mt-0.5 leading-none">
                    {SALON_INFO.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Luxury Concierge CTA */}
            <button
              id="nav-book-btn"
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden rounded px-4 sm:px-5 py-2.5 bg-[#0c0c10] border border-[#c5a059]/60 hover:border-[#deb86a] text-[#f5f0e6] font-serif-didot text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_4px_16px_-4px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_24px_-6px_rgba(197,160,89,0.25)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              {/* Specular Sheen Reflection moving on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent transition-transform duration-700 pointer-events-none" />

              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#deb86a] transition-colors" />
                <span className="group-hover:text-white transition-colors">BOOK APPOINTMENT</span>
              </span>

              {/* Bottom fine gold edge line */}
              <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />
            </button>
          </div>

          {/* Mobile Actions: Compact Book Button & Menu Toggle */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              id="mobile-book-header-btn"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded bg-[#0c0c10] border border-[#c5a059]/70 text-[#f5f0e6] font-serif-didot font-bold text-[10px] tracking-[0.16em] uppercase sm:hidden active:scale-95 transition-transform"
            >
              BOOK
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-[#c5a059] rounded bg-[#0e0e12] border border-[#c5a059]/30 hover:border-[#c5a059]/60 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#c5a059]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#070709]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3 mb-2">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059] font-medium">
                  DIRECTORY
                </span>
                <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                  MANHATTAN, NY
                </span>
              </div>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`font-serif-didot text-2xl transition-colors py-2 border-b border-zinc-900 flex items-center justify-between ${
                      isActive ? 'text-[#deb86a]' : 'text-zinc-200 hover:text-[#deb86a]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-[#c5a059]/60">0{idx + 1}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#c5a059]/20 space-y-4">
              <button
                id="mobile-menu-book-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-[#0c0c10] border border-[#c5a059] text-[#f5f0e6] font-serif-didot font-bold text-xs tracking-[0.22em] uppercase rounded shadow-xl flex items-center justify-center gap-2 hover:bg-[#c5a059]/10 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                BOOK APPOINTMENT
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 font-mono">
                <span className="text-[11px] text-zinc-500">{SALON_INFO.hours}</span>
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#deb86a] font-medium text-[11px] tracking-wider">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

