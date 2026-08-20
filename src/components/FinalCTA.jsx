import { FaWhatsapp } from 'react-icons/fa6';

export default function FinalCTA({ onRequestPasses }) {
  return (
    <section className="container">
      <div className="final-cta-section">
        <h2>Your Mandli &amp; AC Dome Pass Requirement Starts Here.</h2>
        <p>Choose your event, tell us your required quantity and we'll secure the best B2B wholesale rates.</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            style={{ padding: '14px 32px' }}
            onClick={() => onRequestPasses('Final Call Order', 'General')}
          >
            <FaWhatsapp /> Request Passes on WhatsApp
          </button>
          <a
            href="#events"
            className="btn-secondary"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: '#FFFFFF' }}
          >
            Browse Events
          </a>
        </div>
      </div>
    </section>
  );
}
