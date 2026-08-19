import { FaHeadset, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa6';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaHeadset /> Direct Assistance
          </div>
          <h2>Talk to Our B2B Team</h2>
          <p>Have a bulk requirement or need a specific event? Contact us directly.</p>
        </div>

        <div className="contact-options-grid">
          <div className="contact-option-card">
            <div className="contact-option-icon"><FaWhatsapp /></div>
            <h3>WhatsApp</h3>
            <p>Quickest way to send your requirement.</p>
            <div className="contact-option-val">+91 96649 25159</div>
          </div>

          <div className="contact-option-card">
            <div className="contact-option-icon"><FaPhone /></div>
            <h3>Call</h3>
            <p>Speak directly with our team.</p>
            <div className="contact-option-val">+91 96649 25159</div>
          </div>

          <div className="contact-option-card">
            <div className="contact-option-icon"><FaEnvelope /></div>
            <h3>Email</h3>
            <p>For business and large-volume enquiries.</p>
            <div className="contact-option-val">b2b@navratripasses.com</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://wa.me/919664925159"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '14px 32px' }}
            aria-label="Chat directly with RangSetu B2B Team on WhatsApp"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
