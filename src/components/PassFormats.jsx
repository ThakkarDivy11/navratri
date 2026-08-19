import { FaArrowsSplitUpAndLeft, FaBoxArchive, FaMobileScreenButton } from 'react-icons/fa6';

export default function PassFormats({ onRequestPasses }) {
  return (
    <section className="section" id="pass-formats">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaArrowsSplitUpAndLeft /> Delivery Options
          </div>
          <h2>Choose the Pass Format You Need</h2>
          <p>We facilitate requirements for both physical printed passes and online passes depending on source availability.</p>
        </div>

        <div className="format-compare-grid">
          <div className="format-card">
            <h3><FaBoxArchive className="text-blaze" /> Physical Pass</h3>
            <ul className="format-features">
              <li>📦 Printed physical pass / RFID wristband</li>
              <li>🚚 Hand delivery or courier in Ahmedabad</li>
              <li>🎟️ Suitable for resellers, corporate gifts & groups</li>
            </ul>
            <button
              className="btn-secondary"
              onClick={() => onRequestPasses('Physical Pass Enquiry', 'General', 'Physical Pass')}
            >
              Request Physical Passes
            </button>
          </div>

          <div className="format-card">
            <h3><FaMobileScreenButton className="text-purple" /> Online Pass</h3>
            <ul className="format-features">
              <li>📱 Digital / online pass option</li>
              <li>⚡ Faster delivery depending on source availability</li>
              <li>📩 Sent through agreed digital delivery method</li>
            </ul>
            <button
              className="btn-secondary"
              onClick={() => onRequestPasses('Online Pass Enquiry', 'General', 'Online Pass')}
            >
              Request Online Passes
            </button>
          </div>
        </div>

        <p className="inventory-note">* Note: Availability depends on the specific event and source inventory.</p>
      </div>
    </section>
  );
}
