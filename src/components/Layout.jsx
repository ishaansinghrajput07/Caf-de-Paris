import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import { cafe } from '../config';
import { img } from '../images';

export const links = [
  { name: 'Home', href: '/' }, { name: 'About', href: '/about' }, { name: 'Menu', href: '/menu' },
  { name: "Let's Party", href: '/events' }, { name: 'Order Now', href: '/order-now' },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <header className={`topbar ${solid ? 'solid' : ''}`}>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild><button className="icon-btn" aria-label="Open menu"><Menu size={24} strokeWidth={1.5} /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="sheet-overlay" />
            <Dialog.Content className="sheet" aria-describedby={undefined}>
              <Dialog.Title className="sr">Navigation</Dialog.Title>
              <img src={img.interior} alt="" className="sheet-bg" />
              <Dialog.Close className="icon-btn sheet-close" aria-label="Close"><X size={26} strokeWidth={1.5} /></Dialog.Close>
              <nav className="sheet-nav">
                <span className="script">Bienvenue</span>
                {links.map((l) => <NavLink key={l.href} to={l.href} end className="sheet-link">{l.name}</NavLink>)}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Link to="/" className="brand">Café <em>de</em> Paris</Link>
        <Link to="/order-now" className="pill">Order Now</Link>
      </header>
      <main className="page">{children}</main>
      <footer className="footer">
        <div className="container foot-grid">
          <div><Link to="/" className="brand big">Café <em>de</em> Paris</Link><p>{cafe.tagline}</p></div>
          <div><h4>Visit</h4><p>{cafe.address}</p><p>{cafe.hours}</p></div>
          <div><h4>Explore</h4>{links.map((l) => <Link key={l.href} to={l.href}>{l.name}</Link>)}</div>
          <div className="socials">
            <a href={cafe.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
            <a href={cafe.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
            <a href={cafe.maps} target="_blank" rel="noreferrer" aria-label="Map"><MapPin size={20} /></a>
            <a href={`tel:${cafe.phone.replace(/\s/g, '')}`} aria-label="Call"><Phone size={20} /></a>
          </div>
        </div>
        <p className="copy">© {new Date().getFullYear()} Café de Paris. All rights reserved.</p>
      </footer>
    </>
  );
}
