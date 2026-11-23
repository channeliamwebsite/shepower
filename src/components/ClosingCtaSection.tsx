import { ArrowUpRight } from 'lucide-react';
import type { InquiryMode } from '../utils/summitLogic';
import { MagneticButton } from './MagneticButton';

interface ClosingCtaSectionProps {
  onOpenInquiry: (mode: InquiryMode) => void;
  savedReference?: string | null;
}

export function ClosingCtaSection({ onOpenInquiry, savedReference }: ClosingCtaSectionProps) {
  return (
    <section
      id="contact"
      className="relative bg-[#173B68] text-[#FAFCFE] py-28 md:py-40 overflow-hidden"
    >
      {/* Subtle architectural hairline atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 24%, rgba(169, 197, 223, 0.24) 0%, transparent 48%), radial-gradient(circle at 18% 82%, rgba(40, 90, 145, 0.4) 0%, transparent 52%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#A9C5DF]">
              <span>05</span>
              <span className="w-8 h-px bg-[#A9C5DF]/45" aria-hidden="true" />
              <span>Kochi · Fourth Edition · 2027</span>
            </div>

            <h2
              className="font-serif font-medium tracking-[-0.02em] leading-[1.02] text-[#FAFCFE] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 5.4vw, 5.25rem)' }}
            >
              Your Next Chapter Begins Here.
            </h2>

            <p className="max-w-xl text-base md:text-xl leading-relaxed text-[#E8F1F8]/90">
              Be part of a platform that celebrates ambition, leadership and possibilities.
            </p>

            {savedReference && (
              <p className="text-xs uppercase tracking-[0.18em] text-[#A9C5DF]">
                Active Submission Saved · Reference {savedReference}
              </p>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-4">
            <MagneticButton
              variant="light"
              onClick={() => onOpenInquiry('register')}
              className="w-full sm:w-auto lg:w-72 justify-between"
            >
              <span>Register Your Interest</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
              variant="outline-light"
              onClick={() => onOpenInquiry('partner')}
              className="w-full sm:w-auto lg:w-72 justify-between"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
