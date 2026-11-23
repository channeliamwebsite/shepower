import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'light' | 'outline-light';
  className?: string;
  ariaLabel?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
  strength = 0.22,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const variantClasses: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
    primary:
      'bg-[#173B68] text-[#FAFCFE] hover:bg-[#285A91] border border-[#173B68] hover:border-[#285A91]',
    secondary:
      'bg-transparent text-[#173B68] border border-[#173B68]/40 hover:border-[#173B68] hover:bg-[#E8F1F8]',
    light:
      'bg-[#FAFCFE] text-[#173B68] hover:bg-[#E8F1F8] border border-[#FAFCFE]',
    'outline-light':
      'bg-transparent text-[#FAFCFE] border border-[#A9C5DF]/60 hover:border-[#FAFCFE] hover:bg-[#FAFCFE]/10',
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 24, mass: 0.4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-3 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285A91] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
