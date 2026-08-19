'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchGlobalEvents, getStoredEvents } from '@/data/venues';
import { FaCalendarDays, FaCalendarDay, FaCircleCheck, FaLocationDot, FaTicket, FaTruckRampBox, FaChartLine } from 'react-icons/fa6';

export default function EventCatalogue({ onRequestPasses }) {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [venues, setVenues] = useState([]);

  const loadEvents = async () => {
    const data = await fetchGlobalEvents();
    if (data && Array.isArray(data)) {
      setVenues(data);
    }
  };

  useEffect(() => {
    // Initial local cache load
    setVenues(getStoredEvents());

    // Fetch live global events from server
    loadEvents();

    // Auto-poll every 15 seconds for live global updates across all devices
    const interval = setInterval(() => {
      loadEvents();
    }, 15000);

    const handleStorage = () => loadEvents();
    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const filteredVenues = venues.filter((venue) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'ahmedabad') return (venue.city || 'Ahmedabad').toLowerCase() === 'ahmedabad';
    if (currentFilter === 'vip') return (venue.passTypes || '').includes('VIP');
    return true;
  });

  return (
    <section className="section" id="events">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaCalendarDays /> Event Catalogue
          </div>
          <h2>Available Navratri Events</h2>
          <p>Choose an event and tell us how many passes you need.</p>
        </div>

        <div className="catalog-controls">
          <div className="filter-pills">
            <button
              className={`pill-btn${currentFilter === 'all' ? ' active' : ''}`}
              onClick={() => setCurrentFilter('all')}
            >
              All Events
            </button>
            <button
              className={`pill-btn${currentFilter === 'ahmedabad' ? ' active' : ''}`}
              onClick={() => setCurrentFilter('ahmedabad')}
            >
              Ahmedabad Venues
            </button>
            <button
              className={`pill-btn${currentFilter === 'vip' ? ' active' : ''}`}
              onClick={() => setCurrentFilter('vip')}
            >
              VIP Available
            </button>
          </div>
        </div>

        <div className="events-grid" id="eventsContainer">
          {filteredVenues.map((venue) => (
            <div className="event-card" key={venue.id}>
              <div className="event-image-container">
                <Image
                  src={venue.image || '/assets/venue_karnavati.jpg'}
                  alt={venue.name}
                  width={400}
                  height={225}
                  className="event-card-img"
                />
                <div className="event-date-badge">
                  <FaCalendarDay /> {venue.dates}
                </div>
                <div className="event-verified-badge">
                  <FaCircleCheck /> {venue.badge || 'Verified B2B'}
                </div>
              </div>

              <div className="event-body">
                <h3 className="event-title">{venue.name}</h3>

                <div className="event-meta-row">
                  <span>
                    <FaLocationDot /> {venue.location}
                  </span>
                </div>

                <div className="event-spec-list">
                  <div className="spec-item">
                    <FaTicket className="text-blaze" />
                    <span><strong>Pass Types:</strong> {venue.passTypes}</span>
                  </div>
                  <div className="spec-item">
                    <FaTruckRampBox className="text-purple" />
                    <span><strong>Delivery:</strong> {venue.formats}</span>
                  </div>
                  <div className="spec-item">
                    <FaChartLine className="text-success" />
                    <span><strong>Availability:</strong> {venue.availability}</span>
                  </div>
                </div>

                <div className="event-footer">
                  <div className="event-price-meta">
                    <span className="price-label">B2B Bulk Price</span>
                    <span className="price-val">{venue.b2bPrice}</span>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => onRequestPasses(venue.name, 'General')}
                  >
                    Request Passes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
