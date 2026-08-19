import { FaChartLine, FaWhatsapp } from 'react-icons/fa6';

export default function PricingTiers({ onRequestPasses }) {
  const tiers = [
    { badge: 'Starter Bulk', qty: '20+ Passes', desc: 'Special B2B rate for small groups & corporate teams', featured: false },
    { badge: 'Reseller Favorite', qty: '50+ Passes', desc: 'Enhanced margin discount for agents & volume buyers', featured: true },
    { badge: 'Enterprise / Corporate', qty: '100+ Passes', desc: 'Custom wholesale quote & dedicated delivery concierge', featured: false },
  ];

  return (
    <section className="section" id="pricing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaChartLine /> Dynamic Volume Rates
          </div>
          <h2>Need More Passes? Get Better B2B Rates.</h2>
          <p>Bulk rates depend on your event, pass category, quantity, availability, and delivery format.</p>
        </div>

        <div className="pricing-tiers-grid">
          {tiers.map((tier, idx) => (
            <div className={`pricing-tier-card${tier.featured ? ' featured' : ''}`} key={idx}>
              <div className="tier-badge-label">{tier.badge}</div>
              <div className="tier-qty">{tier.qty}</div>
              <p className="tier-desc">{tier.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            className="btn-primary"
            onClick={() => onRequestPasses('Custom B2B Bulk Order', 'General')}
          >
            <FaWhatsapp /> Get My B2B Rate
          </button>
        </div>
      </div>
    </section>
  );
}
