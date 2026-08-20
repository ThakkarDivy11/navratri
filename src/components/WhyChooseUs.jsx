import { FaStar, FaCubes, FaPercent, FaLayerGroup, FaBoxOpen, FaWhatsapp, FaBolt } from 'react-icons/fa6';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <FaCubes />, title: 'Bulk Orders', desc: 'Order the exact quantity your business or group needs without retail limits.' },
    { icon: <FaPercent />, title: 'B2B Wholesale Rates', desc: 'Get competitive wholesale rates tailored for larger pass quantities.' },
    { icon: <FaLayerGroup />, title: 'Mandli & AC Dome Venues', desc: 'Direct procurement for Ahmedabad’s premier Mandli Garbas and luxury AC Dome arenas.' },
    { icon: <FaBoxOpen />, title: 'Physical & Online', desc: 'Choose the available delivery format based on source inventory and venue rules.' },
    { icon: <FaWhatsapp />, title: 'Quick WhatsApp Support', desc: 'Talk directly with our dedicated B2B team for immediate answers.' },
    { icon: <FaBolt />, title: 'Simple Process', desc: 'No complicated account creation, seller registration, or checkout barriers.' },
  ];

  return (
    <section className="section" id="b2b-benefits">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaStar /> Value Proposition
          </div>
          <h2>Built for Mandli &amp; AC Dome Bulk Buyers</h2>
          <p>Why corporate buyers, resellers, and group organizers source passes with us every season.</p>
        </div>

        <div className="reasons-grid">
          {reasons.map((item, index) => (
            <div className="reason-card" key={index}>
              <div className="reason-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
