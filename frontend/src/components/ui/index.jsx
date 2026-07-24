import { ArrowRight } from 'lucide-react';

export function Container({ className = '', children }) {
  return <div className={`section ${className}`}>{children}</div>;
}

export function Badge({ icon: Icon, children, className = '' }) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/80 sm:tracking-[0.14em] ${className}`}
    >
      {Icon && <Icon size={14} className="shrink-0 text-brand-purple" />}
      <span className="whitespace-normal">{children}</span>
    </div>
  );
}

const buttonBase =
  'focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition active:scale-[0.98]';
const buttonVariants = {
  primary: 'bg-brand-gradient text-white shadow-glow hover:brightness-110',
  secondary: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
  ghost: 'text-white/80 hover:text-white'
};

export function Button({ as: As = 'a', variant = 'primary', className = '', children, showArrow = false, ...props }) {
  return (
    <As className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props}>
      {children}
      {showArrow && <ArrowRight size={16} />}
    </As>
  );
}

export function SectionHeader({ eyebrow, title, description, align = 'left', action }) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gradient">{eyebrow}</p>
        )}
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ className = '', children, hover = true }) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 shadow-card ${
        hover ? 'transition duration-300 hover:-translate-y-1 hover:border-white/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
