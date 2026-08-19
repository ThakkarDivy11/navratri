import { FaWhatsapp } from 'react-icons/fa6';

export default function BulkBanner({ onRequestPasses }) {
  return (
    <section className="section">
      <div className="container">
        <div className="bulk-banner">
          <div className="bulk-banner-content">
            <h2>Need 100+ Passes?</h2>
            <p>Tell us your quantity, event and preferred pass type. We'll check availability and share the best available B2B rate.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <button
              className="btn-primary"
              style={{ padding: '16px 32px', fontSize: '1rem' }}
              onClick={() => onRequestPasses('100+ Bulk Quote', 'General')}
            >
              <FaWhatsapp /> Request Bulk Quote
            </button>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
              <FaWhatsapp /> Direct B2B assistance on WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
