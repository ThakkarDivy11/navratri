'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaCrown, FaCircleCheck, FaFire } from 'react-icons/fa6';

export default function Hero({ onRequestPasses }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: '/assets/ruda_garba.png', alt: 'Ruda Garba 2026 Ahmedabad B2B Passes' },
    { src: '/assets/raatledo.png', alt: 'Raatledo City of Dreams Garba 2026 Ahmedabad Bulk Passes' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="section-tag">
            <FaCrown className="text-blaze" /> B2B Pass Procurement • Ahmedabad 2026
          </div>
          <h1 className="hero-headline">
            Ahmedabad Navratri 2026. <span className="text-purple-gradient">Get Your Passes in Bulk.</span>
          </h1>
          <p className="hero-subtext">
            Genuine Navratri passes for B2B buyers, resellers, businesses and groups. Tell us your requirement and we'll get back to you.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => onRequestPasses('General Bulk Order', 'General')}>
              <FaWhatsapp /> Request B2B Passes
            </button>
            <a href="#events" className="btn-secondary">View Available Events</a>
          </div>

          <div className="hero-trust-list">
            {['Genuine Passes', 'Bulk Orders', 'Physical & Online Options', 'WhatsApp Support'].map((item) => (
              <div className="trust-badge-item" key={item}>
                <FaCircleCheck /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-slider">
            <div className="hero-popular-tag"><FaFire /> Popular</div>
            {slides.map((slide, idx) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 992px) 100vw, 520px"
                className={idx === currentSlide ? 'active' : ''}
                priority={idx === 0}
              />
            ))}
            <div className="hero-slider-indicators">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`hero-dot${idx === currentSlide ? ' active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
