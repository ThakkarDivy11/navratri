'use client';

import { useState, useEffect } from 'react';
import { VENUES_DATA, BUSINESS_OWNER_WHATSAPP } from '@/data/venues';
import { FaWhatsapp, FaXmark, FaLock } from 'react-icons/fa6';

export default function EnquiryModal({ isOpen, onClose, initialVenue, initialPass, initialFormat }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    venue: initialVenue || 'Karnavati Club Garba 2026',
    passType: initialPass || 'General',
    quantity: 20,
    format: initialFormat || 'Physical Pass',
    fullName: '',
    city: 'Ahmedabad',
    reqDate: '2026-10-10',
    notes: '',
  });

  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        venue: initialVenue || 'Karnavati Club Garba 2026',
        passType: initialPass || 'General',
        format: initialFormat || 'Physical Pass',
      }));
    }
  }, [isOpen, initialVenue, initialPass, initialFormat]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMsg =
`🎉 *RANGSETU B2B NAVRATRI 2026 PASS REQUIREMENT*
---------------------------------------
📍 *Event:* ${formData.venue}
🎟️ *Pass Type:* ${formData.passType}
🔢 *Quantity Required:* ${formData.quantity} Passes
🏷️ *Pass Format:* ${formData.format}
📅 *Required Date:* ${formData.reqDate}
---------------------------------------
👤 *Buyer Name:* ${formData.fullName}
🏙️ *City:* ${formData.city}
${formData.notes ? `📝 *Additional Req:* ${formData.notes}\n` : ''}---------------------------------------
*Sent via RangSetu B2B Platform*`;

    const url = `https://wa.me/${BUSINESS_OWNER_WHATSAPP}?text=${encodeURIComponent(formattedMsg)}`;
    setWhatsappUrl(url);
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop active" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaXmark />
        </button>

        {!submitted ? (
          <div id="modalFormState">
            <div className="modal-header">
              <div className="section-tag" style={{ marginBottom: '8px' }}>
                <FaWhatsapp /> WhatsApp Enquiry
              </div>
              <h3>Tell Us Your Requirement</h3>
              <p>Fill in your requirement and our team will contact you on WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="venue">Event</label>
                <select
                  id="venue"
                  className="form-select"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                >
                  {VENUES_DATA.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                  <option value="Custom B2B Multiple Events">Custom B2B Multiple Events</option>
                  <option value="General Bulk Order">General Bulk Order</option>
                  <option value="Custom B2B Bulk Order">Custom B2B Bulk Order</option>
                  <option value="Physical Pass Enquiry">Physical Pass Enquiry</option>
                  <option value="Online Pass Enquiry">Online Pass Enquiry</option>
                  <option value="100+ Bulk Quote">100+ Bulk Quote</option>
                  <option value="Final Call Order">Final Call Order</option>
                </select>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="passType">Pass Type</label>
                  <select
                    id="passType"
                    className="form-select"
                    value={formData.passType}
                    onChange={handleChange}
                    required
                  >
                    <option value="General">General</option>
                    <option value="VIP">VIP</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="quantity">Quantity Required</label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    min="5"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="format">Pass Format</label>
                <select
                  id="format"
                  className="form-select"
                  value={formData.format}
                  onChange={handleChange}
                  required
                >
                  <option value="Physical Pass">Physical Pass</option>
                  <option value="Online Pass">Online Pass</option>
                  <option value="Either / Depends on Availability">Either / Depends on Availability</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reqDate">Required Date (Navratri 2026)</label>
                  <input
                    type="date"
                    id="reqDate"
                    className="form-control"
                    min="2026-10-10"
                    max="2026-10-19"
                    value={formData.reqDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="notes">Additional Requirement</label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={2}
                  placeholder="e.g. Need physical delivery by Oct 5th..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
                <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Send Requirement on WhatsApp
              </button>

              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                <FaLock /> Your details are used only to process your pass enquiry.
              </p>
            </form>
          </div>
        ) : (
          <div id="modalSuccessState">
            <div className="confirmation-box">
              <div className="success-icon-badge">
                <FaWhatsapp />
              </div>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--dark-purple)' }}>Your enquiry is ready!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                WhatsApp will open with your requirement already filled in. Send the message to our team to continue.
              </p>

              <div className="summary-card-box">
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--blaze-600)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Enquiry Summary
                </div>
                <div className="summary-card-row">
                  <span className="label">Event:</span>
                  <span className="val">{formData.venue}</span>
                </div>
                <div className="summary-card-row">
                  <span className="label">Pass Type:</span>
                  <span className="val">{formData.passType}</span>
                </div>
                <div className="summary-card-row">
                  <span className="label">Quantity:</span>
                  <span className="val">{formData.quantity} Passes</span>
                </div>
                <div className="summary-card-row">
                  <span className="label">Pass Format:</span>
                  <span className="val">{formData.format}</span>
                </div>
                <div className="summary-card-row">
                  <span className="label">Buyer Name:</span>
                  <span className="val">{formData.fullName}</span>
                </div>
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Open WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
