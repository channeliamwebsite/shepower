import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  objectPosition = 'center center',
  loading = 'lazy',
  fallbackTitle,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#E8F1F8] via-[#A9C5DF]/40 to-[#668BAF]/30 text-[#173B68] p-6 text-center ${className}`}
      >
        <ImageOff className="w-6 h-6 mb-2 text-[#285A91]" aria-hidden="true" />
        <span className="font-serif text-base font-medium tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
}
