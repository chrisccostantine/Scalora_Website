import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoWhite from '../../assets/brand/logo-white-full.png';
import { fallbackContent } from '../../data';
import { Button } from '../ui';

const navItems = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Process', '/process'],
  ['Contact', '/contact']
];

export default function Header({ onAdmin, brandSettings = fallbackContent.brandSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logo = brandSettings.logoUrl || logoWhite;
  const agencyName = brandSettings.agencyName?.trim() || '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-charcoal-900/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="section flex items-center justify-between py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img className="h-8 w-auto object-contain sm:h-9" src={logo} alt={`${agencyName || 'Scalora'} logo`} />
          {agencyName && agencyName !== 'Scalora' && (
            <span className="text-lg font-black text-white">{agencyName}</span>
          )}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => (
            <NavLink
              key={label}
              to={href}
              end={href === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold transition hover:text-white ${isActive ? 'text-white' : 'text-white/60'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={onAdmin} className="focus-ring rounded-lg px-3 py-2 text-xs font-semibold text-white/40 hover:text-white/70">
            Admin
          </button>
          <Button as={Link} to="/contact" className="px-5 py-2.5 text-sm">
            Book a Strategy Call
          </Button>
        </div>
        <button
          className="focus-ring rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] min-h-dvh bg-charcoal-950 p-5 text-white md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <img className="h-8 w-auto object-contain" src={logo} alt={`${agencyName || 'Scalora'} logo`} />
            <button className="focus-ring rounded-lg p-2" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <div className="mt-8 grid gap-1">
            {navItems.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                end={href === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 text-lg font-semibold ${isActive ? 'text-white' : 'text-white/70'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Button as={Link} to="/contact" onClick={() => setOpen(false)} className="mt-6 w-full">
              Book a Strategy Call
            </Button>
            <button
              onClick={() => {
                setOpen(false);
                onAdmin();
              }}
              className="mt-3 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/60"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
