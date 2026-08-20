'use client';

import Image from 'next/image';
import { FaWhatsapp, FaPhone, FaCrown, FaStar, FaTicket, FaSnowflake } from 'react-icons/fa6';
import { BUSINESS_OWNER_WHATSAPP } from '@/data/venues';

export default function ComingSoonOverlay() {
  const whatsappUrl = `https://wa.me/${BUSINESS_OWNER_WHATSAPP}?text=${encodeURIComponent(
    '🎉 *RANGSETU B2B NAVRATRI 2026 EARLY ENQUIRY*\n---------------------------------------\nHi RangSetu Team, I want to book/enquire about bulk passes for Mandli Garba & AC Dome events in Ahmedabad.\n\n👤 *My Name:*\n🎟️ *Expected Quantity:*\n📍 *Preferred Venue (Rudaah / Raataldi / AC Dome):*'
  )}`;

  return (
    <div className="coming-soon-backdrop" aria-modal="true" role="dialog">
      <div className="coming-soon-glow glow-1"></div>
      <div className="coming-soon-glow glow-2"></div>
      <div className="coming-soon-glow glow-3"></div>

      <div className="coming-soon-container">
        <div className="coming-soon-card">
          {/* Brand Header */}
          <div className="coming-soon-brand">
            <Image
              src="/assets/rangsetu_logo.jpg"
              alt="RangSetu Logo"
              width={48}
              height={48}
              className="coming-soon-logo"
              priority
            />
            <div className="coming-soon-brand-text">
              <span className="cs-brand-title">RANG<span className="text-blaze">SETU</span></span>
              <span className="cs-brand-sub">B2B NAVRATRI PASSES • AHMEDABAD 2026</span>
            </div>
          </div>

          {/* Launching Soon Pill */}
          <div className="coming-soon-pill">
            <span className="cs-pulse-dot"></span>
            <FaStar className="cs-sparkle-icon" />
            <span>PORTAL LAUNCHING SOON</span>
          </div>

          {/* Main Headline */}
          <h1 className="coming-soon-title">
            Ahmedabad Mandli &amp; AC Dome{' '}
            <span className="text-gradient-festive">Bulk Passes Portal</span>
          </h1>

          <p className="coming-soon-desc">
            We are curating verified source inventory &amp; wholesale B2B quotas for 
            <strong> Rudaah Mandli Garba</strong>, <strong>Raataldi Mandli Garba</strong> &amp; 
            <strong> Premium AC Dome Arenas</strong>. Official online booking goes live shortly!
          </p>

          {/* Feature Highlights Strip */}
          <div className="coming-soon-highlights">
            <div className="cs-chip">
              <FaCrown className="text-gold" />
              <span>Rudaah &amp; Raataldi Mandli</span>
            </div>
            <div className="cs-chip">
              <FaSnowflake className="text-blue" />
              <span>100% AC Dome Arenas</span>
            </div>
            <div className="cs-chip">
              <FaTicket className="text-blaze" />
              <span>Direct Wholesale B2B Rates</span>
            </div>
          </div>

          {/* Urgent Early Booking Action Box */}
          <div className="coming-soon-action-box">
            <div className="cs-action-heading">
              <strong>Need 20+ Passes for Corporate, Group or Resale?</strong>
              <p>Early B2B pass allocations are currently active directly on WhatsApp.</p>
            </div>

            <div className="coming-soon-buttons">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn cs-btn-whatsapp"
                aria-label="Enquire on WhatsApp +91 96649 25159"
              >
                <FaWhatsapp className="cs-btn-icon" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href="tel:+919664925159"
                className="cs-btn cs-btn-call"
                aria-label="Call +91 96649 25159"
              >
                <FaPhone className="cs-btn-icon" />
                <span>+91 96649 25159</span>
              </a>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="coming-soon-footer">
            <span>🛡️ Verified B2B Pass Procurement • Ahmedabad &amp; Gandhinagar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
