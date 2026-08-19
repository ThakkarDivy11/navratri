import { FaRoute } from 'react-icons/fa6';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Choose Your Event', desc: 'Browse available Navratri events in Ahmedabad and select your preferred venue.' },
    { num: '02', title: 'Tell Us Your Quantity', desc: 'Select the pass type (General/VIP/Premium) and the number of passes you need.' },
    { num: '03', title: 'Send Your Requirement', desc: 'Submit the form and continue on WhatsApp to connect directly with our team.' },
    { num: '04', title: 'Get Your Passes', desc: 'We confirm availability, wholesale pricing and delivery logistics with you.' },
  ];

  return (
    <section className="section section-warm" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaRoute /> Enquiry Process
          </div>
          <h2>How B2B Pass Booking Works</h2>
          <p>A simple, transparent 4-step enquiry process built specifically for bulk buyers.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.num}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
