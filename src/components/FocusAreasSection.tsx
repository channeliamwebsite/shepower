import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { FOCUS_AREAS } from '../data/summitData';
import { EditorialImage } from './EditorialImage';

interface FocusAreasSectionProps {
  onSelectTrackForRegistration: (trackTitle: string) => void;
}

export function FocusAreasSection({ onSelectTrackForRegistration }: FocusAreasSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);
  const activeArea = FOCUS_AREAS[activeIndex] ?? FOCUS_AREAS[0];

  return (
    <section
      id="focus-areas"
      className="bg-[#FAFCFE] text-[#173B68] py-20 md:py-28 border-t border-[#A9C5DF]/35"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-[#A9C5DF]/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#285A91]">
              <span>02</span>
              <span className="w-8 h-px bg-[#285A91]/40" aria-hidden="true" />
              <span>Summit Tracks · Eight Domains</span>
            </div>
            <h2
              className="mt-4 font-serif font-medium tracking-[-0.02em] leading-[1.04] text-[#173B68] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)' }}
            >
              Eight Arenas of Leadership.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base leading-relaxed text-[#173B68]/75">
              Hover or select any domain to inspect its curatorial focus, session cadence,
              and visual narrative for the 2027 Kochi edition.
            </p>
          </div>
        </div>

        {/* Desktop Interactive Horizontal Editorial Directory */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-14 pt-6 items-start">
          {/* Interactive Numbered Index */}
          <div className="lg:col-span-7 divide-y divide-[#A9C5DF]/45">
            {FOCUS_AREAS.map((area, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={area.number}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className="w-full text-left py-7 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#285A91] transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-7">
                      <span
                        className={`font-serif text-xl md:text-2xl tabular-nums transition-colors duration-200 ${
                          isActive ? 'text-[#285A91] font-semibold' : 'text-[#668BAF]'
                        }`}
                      >
                        {area.number}
                      </span>
                      <div
                        className={`transition-transform duration-300 ease-out ${
                          isActive ? 'translate-x-3' : 'group-hover:translate-x-2'
                        }`}
                      >
                        <h3
                          className={`font-serif text-3xl xl:text-4xl font-medium tracking-tight transition-colors duration-200 ${
                            isActive
                              ? 'text-[#173B68]'
                              : 'text-[#173B68]/55 group-hover:text-[#285A91]'
                          }`}
                        >
                          {area.title}
                        </h3>
                        <p
                          className={`mt-1.5 text-sm transition-colors duration-200 ${
                            isActive ? 'text-[#285A91]' : 'text-[#668BAF]/80'
                          }`}
                        >
                          {area.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      aria-hidden="true"
                      className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'text-[#173B68] opacity-100 translate-x-0'
                          : 'text-[#668BAF] opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Contextual Editorial Stage */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.number}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#E8F1F8] p-6 xl:p-8 border border-[#A9C5DF]/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#A9C5DF]/30">
                  <EditorialImage
                    src={activeArea.image}
                    alt={activeArea.imageAlt}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-700"
                    fallbackTitle={activeArea.title}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-[#285A91]">
                    <span>Track {activeArea.number}</span>
                    <span>{activeArea.sessionCount}</span>
                  </div>

                  <p className="font-serif italic text-xl leading-snug text-[#173B68]">
                    “{activeArea.leadQuestion}”
                  </p>

                  <p className="text-sm leading-relaxed text-[#173B68]/80">
                    {activeArea.description}
                  </p>

                  <div className="pt-3 border-t border-[#A9C5DF]/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectTrackForRegistration(activeArea.title)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#173B68] hover:text-[#285A91] cursor-pointer transition-colors"
                    >
                      <span>Register for this track</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Vertical Editorial Experience */}
        <div className="lg:hidden divide-y divide-[#A9C5DF]/50 pt-4">
          {FOCUS_AREAS.map((area, index) => {
            const isOpen = mobileExpandedIndex === index;
            return (
              <div key={area.number} className="py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setMobileExpandedIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left py-2 cursor-pointer"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-lg tabular-nums text-[#285A91]">
                      {area.number}
                    </span>
                    <span className="font-serif text-2xl font-medium text-[#173B68]">
                      {area.title}
                    </span>
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 shrink-0 text-[#285A91] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-4">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-[#E8F1F8]">
                          <EditorialImage
                            src={area.image}
                            alt={area.imageAlt}
                            className="w-full h-full object-cover"
                            fallbackTitle={area.title}
                          />
                        </div>
                        <div className="text-xs uppercase tracking-[0.18em] text-[#285A91]">
                          {area.sessionCount}
                        </div>
                        <p className="text-sm leading-relaxed text-[#173B68]/80">
                          {area.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => onSelectTrackForRegistration(area.title)}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#173B68] underline underline-offset-4 cursor-pointer"
                        >
                          <span>Register for {area.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
