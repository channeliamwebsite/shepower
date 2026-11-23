import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { InquiryMode } from '../utils/summitLogic';

interface NavbarProps {
  onOpenInquiry: (mode: InquiryMode) => void;
  hasRegistered?: boolean;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Focus Areas', href: '#focus-areas' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Legacy', href: '#legacy' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenInquiry, hasRegistered = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAFCFE]/95 backdrop-blur-md border-b border-[#A9C5DF]/40 text-[#173B68]'
            : 'bg-gradient-to-b from-[#173B68]/65 to-transparent text-[#FAFCFE]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="font-serif text-xl md:text-2xl font-semibold tracking-[0.12em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9C5DF]"
          >
            SHE POWER
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.16em]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${
                  scrolled
                    ? 'text-[#173B68]/80 hover:text-[#173B68] after:bg-[#173B68]'
                    : 'text-[#FAFCFE]/90 hover:text-[#FAFCFE] after:bg-[#FAFCFE]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary action + Mobile trigger */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenInquiry('register')}
              className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285A91] ${
                scrolled
                  ? 'bg-[#173B68] text-[#FAFCFE] hover:bg-[#285A91]'
                  : 'bg-[#FAFCFE] text-[#173B68] hover:bg-[#E8F1F8]'
              }`}
            >
              {hasRegistered ? 'Registration Saved' : 'Register Interest'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9C5DF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#173B68] text-[#FAFCFE] pt-24 pb-10 px-6 flex flex-col justify-between md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#285A91]/60">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="py-5 flex items-baseline justify-between font-serif text-3xl font-medium tracking-wide text-[#FAFCFE] hover:text-[#A9C5DF] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs tracking-[0.2em] text-[#A9C5DF]">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="space-y-4 pt-6 border-t border-[#285A91]/60">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry('register');
                }}
                className="w-full py-4 bg-[#FAFCFE] text-[#173B68] text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer"
              >
                {hasRegistered ? 'View Saved Registration' : 'Register Your Interest'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry('partner');
                }}
                className="w-full py-4 border border-[#A9C5DF]/60 text-[#FAFCFE] text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer"
              >
                Become a Partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
