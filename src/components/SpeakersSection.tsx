import { useRef, useState, type PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  SPEAKERS,
  SPEAKER_CATEGORIES,
  type Speaker,
  type SpeakerCategory,
} from '../data/summitData';
import { filterSpeakersByCategory } from '../utils/summitLogic';
import { EditorialImage } from './EditorialImage';

interface SpeakersSectionProps {
  onSelectSpeaker: (speaker: Speaker) => void;
}

export function SpeakersSection({ onSelectSpeaker }: SpeakersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<SpeakerCategory>('All Voices');
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    isDown: boolean;
    startX: number;
    scrollLeft: number;
    hasMoved: boolean;
  }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const visibleSpeakers = filterSpeakersByCategory(SPEAKERS, selectedCategory);

  const handleCategoryChange = (category: SpeakerCategory) => {
    setSelectedCategory(category);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setScrollProgress(0);
    }
  };

  const handleScrollUpdate = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 0);
  };

  const scrollByStep = (direction: -1 | 1) => {
    if (!trackRef.current) return;
    const step = Math.max(320, trackRef.current.clientWidth * 0.72);
    trackRef.current.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: trackRef.current.scrollLeft,
      hasMoved: false,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDown || !trackRef.current) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 6) {
      dragState.current.hasMoved = true;
    }
    trackRef.current.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const onPointerUp = () => {
    dragState.current.isDown = false;
  };

  return (
    <section
      id="speakers"
      className="bg-[#E8F1F8] text-[#173B68] py-20 md:py-28 overflow-hidden border-t border-[#A9C5DF]/40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Heading + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#A9C5DF]/60">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#285A91]">
              <span>03</span>
              <span className="w-8 h-px bg-[#285A91]/40" aria-hidden="true" />
              <span>2027 Curated Faculty · {SPEAKERS.length} Speakers</span>
            </div>
            <h2
              className="mt-4 font-serif font-medium tracking-[-0.02em] leading-[1.04] text-[#173B68] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)' }}
            >
              Voices That Move Women Forward.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end gap-5">
            <p className="text-sm md:text-base leading-relaxed text-[#173B68]/80 lg:text-right max-w-md">
              Explore our twenty invited leaders. Drag horizontally or step through the
              gallery to read each speaker’s dossier.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Scroll speakers gallery left"
                className="w-11 h-11 flex items-center justify-center border border-[#173B68]/30 text-[#173B68] hover:bg-[#173B68] hover:text-[#FAFCFE] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Scroll speakers gallery right"
                className="w-11 h-11 flex items-center justify-center border border-[#173B68]/30 text-[#173B68] hover:bg-[#173B68] hover:text-[#FAFCFE] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Functional Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter speakers by leadership track"
          className="pt-8 pb-10 flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
          {SPEAKER_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap shrink-0 cursor-pointer transition-colors border ${
                  isSelected
                    ? 'bg-[#173B68] text-[#FAFCFE] border-[#173B68]'
                    : 'bg-transparent text-[#173B68]/75 border-[#A9C5DF]/70 hover:border-[#173B68] hover:text-[#173B68]'
                }`}
              >
                {category}
              </button>
            );
          })}
          <span className="ml-auto pl-4 text-xs uppercase tracking-[0.16em] text-[#285A91] whitespace-nowrap shrink-0 tabular-nums">
            Showing {visibleSpeakers.length} of {SPEAKERS.length}
          </span>
        </div>

        {/* Horizontal Interactive Drag Track (4-5 visible on desktop) */}
        <div
          ref={trackRef}
          data-testid="speakers-gallery-track"
          onScroll={handleScrollUpdate}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
        >
          {visibleSpeakers.map((speaker, idx) => (
            <article
              key={speaker.id}
              className="w-[78vw] sm:w-[44vw] md:w-[30vw] lg:w-[22.5%] min-w-[260px] shrink-0 snap-start flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#A9C5DF]/35">
                  <EditorialImage
                    src={speaker.image}
                    alt={`${speaker.name}, ${speaker.designation} at ${speaker.organization}`}
                    objectPosition={speaker.imagePosition || '50% 18%'}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    fallbackTitle={speaker.name}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#173B68]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-[#285A91]">
                  <span>{speaker.category}</span>
                  <span aria-hidden="true" className="text-[#668BAF]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-1.5 font-serif text-2xl font-medium tracking-tight text-[#173B68]">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#285A91]">
                  {speaker.designation}
                </p>
                <p className="text-xs text-[#668BAF] mt-0.5">
                  {speaker.organization} · {speaker.city}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#173B68]/75 line-clamp-2">
                  {speaker.background}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#A9C5DF]/60">
                <button
                  type="button"
                  onClick={() => {
                    if (!dragState.current.hasMoved) {
                      onSelectSpeaker(speaker);
                    }
                  }}
                  aria-label={`View profile for ${speaker.name}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#173B68] hover:text-[#285A91] cursor-pointer transition-colors"
                >
                  <span>Profile Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Minimal Horizontal Track Progress Rail */}
        <div className="pt-4 flex items-center gap-6">
          <div className="flex-1 h-[2px] bg-[#A9C5DF]/50 overflow-hidden">
            <div
              className="h-full bg-[#173B68] transition-all duration-150"
              style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-[#285A91] whitespace-nowrap">
            Drag or use arrows to explore all voices
          </span>
        </div>
      </div>
    </section>
  );
}
