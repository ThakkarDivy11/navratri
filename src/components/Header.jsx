'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaBars, FaXmark } from 'react-icons/fa6';

export default function Header({ onRequestPasses }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Available Passes', href: '#events' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'B2B', href: '#b2b-benefits' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="header" id="home">
      <div className="container nav-wrapper">
        <a href="#home" className="brand-logo" aria-label="RangSetu Homepage">
          <Image
            src="/assets/rangsetu_logo.jpg"
            alt="RangSetu — B2B Navratri Passes Ahmedabad Logo"
            className="brand-logo-img"
            width={38}
            height={38}
            priority
          />
          <div className="brand-text">
            <span className="brand-name">RANG<span className="text-blaze">SETU</span></span>
            <span className="brand-sub">B2B NAVRATRI PASSES</span>
          </div>
        </a>

        <nav aria-label="Main Navigation">
          <ul className={`nav-links${mobileOpen ? ' active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" onClick={closeMenu}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`nav-actions${mobileOpen ? ' active' : ''}`}>
          <a
            href="https://wa.me/919664925159"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-direct-link"
            title="Direct WhatsApp Line: +91 96649 25159"
            aria-label="Contact RangSetu on WhatsApp +91 96649 25159"
          >
            <FaWhatsapp />
          </a>
          <button
            className="btn-primary"
            onClick={() => { onRequestPasses('Karnavati Club Garba 2026', 'General'); closeMenu(); }}
            aria-label="Request Navratri Passes"
          >
            <FaWhatsapp /> Request Passes
          </button>
        </div>

        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && <div className="mobile-nav-backdrop active" onClick={closeMenu}></div>}
    </header>
  );
}
