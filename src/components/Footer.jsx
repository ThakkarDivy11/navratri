import Image from 'next/image';
import { FaWhatsapp, FaPhone, FaEnvelope, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand-logo">
              <Image src="/assets/rangsetu_logo.jpg" alt="RANGSETU Logo" className="brand-logo-img" width={38} height={38} />
              <div className="brand-text">
                <span className="brand-name" style={{ color: '#FFF' }}>RANG<span className="text-blaze">SETU</span></span>
                <span className="brand-sub">B2B NAVRATRI PASSES • AHMEDABAD 2026</span>
              </div>
            </a>
            <p>Connecting event organizers, suppliers & B2B pass buyers across Gujarat.</p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#b2b-benefits">B2B</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li>
                <a href="https://wa.me/919664925159" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> WhatsApp (+91 96649 25159)
                </a>
              </li>
              <li>
                <a href="tel:+919664925159">
                  <FaPhone /> Call (+91 96649 25159)
                </a>
              </li>
              <li>
                <a href="mailto:b2b@navratripasses.com">
                  <FaEnvelope /> Email Us
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <a
            href="https://www.linkedin.com/in/divy-thakkar-a89859227/"
            target="_blank"
            rel="noopener noreferrer"
            className="dev-credit"
            title="Connect with Divy Thakkar on LinkedIn"
          >
            <span className="dev-credit-code">&lt;/&gt;</span>
            <span>Developed by <strong className="dev-credit-name">Divy Thakkar</strong></span>
            <span className="dev-linkedin-icon"><FaLinkedinIn /></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
