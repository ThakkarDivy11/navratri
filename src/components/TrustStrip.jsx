import { FaShieldHalved, FaTag, FaTicket, FaBolt } from 'react-icons/fa6';

export default function TrustStrip() {
  const items = [
    { icon: <FaShieldHalved />, title: 'Genuine Passes', desc: '100% verified source inventory' },
    { icon: <FaTag />, title: 'B2B Bulk Rates', desc: 'Margin savings on 20+ passes' },
    { icon: <FaTicket />, title: 'Physical & Online', desc: 'Flexible pass format options' },
    { icon: <FaBolt />, title: 'Fast Response', desc: 'Direct WhatsApp assistance' },
  ];

  return (
    <div className="trust-strip">
      <div className="container trust-strip-grid">
        {items.map((item, index) => (
          <div className="trust-strip-card" key={index}>
            <div className="trust-strip-icon">{item.icon}</div>
            <div className="trust-strip-text">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
