'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchGlobalEvents, getStoredEvents } from '@/data/venues';
import { FaCalendarDays, FaCalendarDay, FaCircleCheck, FaLocationDot, FaTicket, FaTruckRampBox, FaChartLine } from 'react-icons/fa6';

export default function EventCatalogue({ onRequestPasses }) {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const updateVenues = (data) => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setVenues(data);
      }
    };

    // 1. Initial load from localStorage/defaults
    const initial = getStoredEvents();
    if (initial && initial.length > 0) {
      setVenues(initial);
    }

    // 2. Fetch fresh events once from server on mount
    fetchGlobalEvents(true).then(updateVenues);

    // 3. Instant Real-Time Cross-Tab / Window Broadcast Listener
    let channel = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel('rangsetu_events_sync');
        channel.onmessage = (event) => {
          if (event.data && event.data.type === 'SYNC_EVENTS' && Array.isArray(event.data.events)) {
            updateVenues(event.data.events);
          }
        };
      } catch (e) {}
    }

    // 4. Smart Focus / Visibility Refresh (When user switches back to tab)
    const handleFocus = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchGlobalEvents(true).then(updateVenues);
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    // 5. Lightweight background sync every 15s only when tab is actively visible
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchGlobalEvents(true).then(updateVenues);
      }
    }, 15000);

    return () => {
      isMounted = false;
      if (channel) channel.close();
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(timer);
    };
  }, []);

  const filteredVenues = venues.filter((venue) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'mandli') {
      return (
        venue.category === 'mandli' ||
        (venue.name || '').toLowerCase().includes('mandli') ||
        (venue.badge || '').toLowerCase().includes('mandli')
      );
    }
    if (currentFilter === 'ac_dome') {
      return (
        venue.category === 'ac_dome' ||
        (venue.name || '').toLowerCase().includes('dome') ||
        (venue.badge || '').toLowerCase().includes('dome')
      );
    }
    if (currentFilter === 'vip') return (venue.passTypes || '').includes('VIP');
    return true;
  });

  return (
    <section className="section" id="events">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FaCalendarDays /> Mandli &amp; AC Dome Catalogue
          </div>
          <h2>Available Mandli &amp; AC Dome Passes</h2>
          <p>Source authentic Mandli Garba &amp; premium AC Dome passes in Ahmedabad at direct B2B rates.</p>
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
              className={`pill-btn${currentFilter === 'mandli' ? ' active' : ''}`}
              onClick={() => setCurrentFilter('mandli')}
            >
              Mandli Garba
            </button>
            <button
              className={`pill-btn${currentFilter === 'ac_dome' ? ' active' : ''}`}
              onClick={() => setCurrentFilter('ac_dome')}
            >
              AC Dome Garba
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
                  src={venue.image || '/assets/ruda_garba.png'}
                  alt={`${venue.name} — Ahmedabad Mandli Garba 2026 Venue`}
                  width={400}
                  height={225}
                  className="event-card-img"
                />
                <div className="event-date-badge">
                  <FaCalendarDay /> {venue.dates}
                </div>
                <div className="event-verified-badge">
                  <FaCircleCheck /> {venue.badge || 'Authentic Mandli Garba'}
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
                    aria-label={`Request B2B passes for ${venue.name}`}
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
