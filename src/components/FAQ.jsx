'use client';

import { useState } from 'react';
import { FAQ_DATA } from '@/data/venues';
import { FaCircleQuestion, FaChevronDown } from 'react-icons/fa6';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="section" id="faq" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaCircleQuestion /> Answers to Common Questions
          </div>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our B2B enquiry service.</p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div className={`faq-item${isActive ? ' active' : ''}`} key={index}>
                <button
                  className="faq-question"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                >
                  {item.question}
                  <FaChevronDown />
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-label={item.question}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
