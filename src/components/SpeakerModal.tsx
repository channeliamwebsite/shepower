import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Speaker } from '../data/summitData';
import { EditorialImage } from './EditorialImage';

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
  onRegisterForSpeakerTrack: (category: string) => void;
}

export function SpeakerModal({
  speaker,
  onClose,
  onRegisterForSpeakerTrack,
}: SpeakerModalProps) {
  useEffect(() => {
    if (!speaker) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [speaker, onClose]);

  return (
    <AnimatePresence>
      {speaker && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#173B68]/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAFCFE] text-[#173B68] border border-[#A9C5DF]/70 grid grid-cols-1 md:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close speaker dossier"
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-[#FAFCFE] text-[#173B68] border border-[#A9C5DF]/60 hover:bg-[#173B68] hover:text-[#FAFCFE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-5 aspect-[3/4] md:aspect-auto bg-[#E8F1F8]">
              <EditorialImage
                src={speaker.image}
                alt={speaker.name}
                objectPosition={speaker.imagePosition || '50% 18%'}
                loading="eager"
                className="w-full h-full object-cover"
                fallbackTitle={speaker.name}
              />
            </div>

            <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="text-xs uppercase tracking-[0.2em] text-[#285A91]">
                  {speaker.category} · {speaker.city}
                </div>

                <div>
                  <h3
                    id="speaker-modal-title"
                    className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#173B68]"
                  >
                    {speaker.name}
                  </h3>
                  <p className="mt-1.5 text-base font-medium text-[#285A91]">
                    {speaker.designation}
                  </p>
                  <p className="text-sm text-[#668BAF]">{speaker.organization}</p>
                </div>

                <div className="pt-4 border-t border-[#A9C5DF]/50 space-y-2">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#668BAF]">
                    2027 Summit Session
                  </div>
                  <p className="font-serif italic text-xl text-[#173B68]">
                    “{speaker.sessionTopic}”
                  </p>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-[#173B68]/80">
                  {speaker.background}
                </p>
              </div>

              <div className="pt-6 border-t border-[#A9C5DF]/50 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const cat = speaker.category;
                    onClose();
                    onRegisterForSpeakerTrack(cat);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#173B68] text-[#FAFCFE] hover:bg-[#285A91] text-xs font-semibold uppercase tracking-[0.16em] cursor-pointer transition-colors"
                >
                  <span>Reserve Delegate Seat</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-[#668BAF] hover:text-[#173B68] cursor-pointer"
                >
                  Back to Faculty
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
