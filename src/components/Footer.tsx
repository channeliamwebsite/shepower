import type { InquiryMode } from '../utils/summitLogic';

interface FooterProps {
  onOpenInquiry: (mode: InquiryMode) => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#173B68] text-[#FAFCFE] border-t border-[#285A91]/60">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#285A91]/50">
          {/* Brand Emblem + Identity */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="1" y="1" width="30" height="30" stroke="#A9C5DF" strokeWidth="1.25" />
                <path
                  d="M9 21.5C11.5 16.5 14.2 12 16 8.5C17.8 12 20.5 16.5 23 21.5"
                  stroke="#FAFCFE"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="20.5" r="2.2" fill="#A9C5DF" />
              </svg>
              <span className="font-serif text-2xl font-semibold tracking-[0.14em] uppercase text-[#FAFCFE]">
                SHE POWER
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#E8F1F8]/75">
              Women’s Leadership Summit · 2027 Edition · Kochi, South India.
              Building enduring networks of founders, technologists, creators, and public leaders.
            </p>

            <p className="text-xs uppercase tracking-[0.2em] text-[#A9C5DF]">
              Organised by Channeliam
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C5DF]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8F1F8]/85">
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#about');
                  }}
                  className="hover:text-[#FAFCFE] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#focus-areas"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#focus-areas');
                  }}
                  className="hover:text-[#FAFCFE] transition-colors"
                >
                  Summit
                </a>
              </li>
              <li>
                <a
                  href="#speakers"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#speakers');
                  }}
                  className="hover:text-[#FAFCFE] transition-colors"
                >
                  Speakers
                </a>
              </li>
              <li>
                <a
                  href="#legacy"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#legacy');
                  }}
                  className="hover:text-[#FAFCFE] transition-colors"
                >
                  Previous Editions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('partner')}
                  className="hover:text-[#FAFCFE] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Social Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C5DF]">
              Connect · Channeliam
            </h3>
            <div className="space-y-2 text-sm text-[#E8F1F8]/85">
              <p>Editorial & Summit Secretariat · Kochi, Kerala</p>
              <p>summit@channeliam.com</p>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-[#A9C5DF]">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FAFCFE] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FAFCFE] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FAFCFE] transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A9C5DF]/80">
          <span>© 2027 SHE POWER · Organised by Channeliam. All rights reserved.</span>
          <span className="uppercase tracking-[0.18em]">4th Edition · Kochi, South India</span>
        </div>
      </div>
    </footer>
  );
}
