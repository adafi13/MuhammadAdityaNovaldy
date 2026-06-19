import { useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Beranda' },
  { href: '#about', label: 'Profil' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#experience', label: 'Pengalaman' },
  { href: '#certificates', label: 'Prestasi' },
  { href: '#projects', label: 'Proyek' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#contact', label: 'Kontak' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <button
          className="icon-btn nav__toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className={`menu${open ? ' show' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
