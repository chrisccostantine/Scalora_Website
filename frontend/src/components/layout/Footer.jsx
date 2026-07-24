import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import logoWhite from '../../assets/brand/logo-white-full.png';
import { whatsappLink } from '../../lib/whatsapp';

const columns = [
  {
    title: 'Services',
    links: [
      ['Meta Ads Management', '/services/meta-ads-management'],
      ['Social Media Management', '/services/social-media-management'],
      ['Reels Production', '/services/reels-production'],
      ['Shopify Websites', '/services/shopify-website-development'],
      ['Custom Websites', '/services/custom-website-development'],
      ['Web Applications', '/services/web-application-development'],
      ['Mobile Apps', '/services/mobile-app-development']
    ]
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Process', '/process'],
      ['Work', '/work'],
      ['Contact', '/contact']
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-950 py-16 text-white">
      <div className="section grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <img className="h-8 w-auto object-contain" src={logoWhite} alt="Scalora logo" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
            A growth and technology agency combining performance advertising, creative content, e-commerce, and
            software development under one team.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com/scalora.agency"
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-lg border border-white/10 p-2.5 text-white/70 hover:text-white"
              aria-label="Scalora on Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{column.title}</p>
            <ul className="mt-4 grid gap-3">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-white/60 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Contact</p>
          <ul className="mt-4 grid gap-3 text-sm text-white/60">
            <li>
              <a className="hover:text-white" href="https://www.scalora-agency.com">
                www.scalora-agency.com
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="https://instagram.com/scalora.agency" target="_blank" rel="noreferrer">
                @scalora.agency
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="section mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Scalora. All rights reserved.</p>
        <p>Lebanon · Gulf Region · International</p>
      </div>
    </footer>
  );
}
