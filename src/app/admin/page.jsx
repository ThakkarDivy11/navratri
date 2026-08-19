'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredEvents, saveStoredEvents, DEFAULT_VENUES } from '@/data/venues';
import {
  FaLock, FaPlus, FaXmark, FaCheck, FaPenToSquare,
  FaTrashCan, FaRotateLeft, FaFileExport, FaFileImport,
  FaRightFromBracket, FaGlobe, FaLocationDot, FaGripVertical
} from 'react-icons/fa6';

const ADMIN_PIN = 'navratri2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: '',
    type: 'ahmedabad',
    passTypes: 'General / VIP',
    formats: 'Physical & Online Available',
    badge: 'Verified B2B Venue',
    availability: 'High Inventory',
    b2bPrice: 'Get B2B Rate',
    image: '/assets/venue_karnavati.jpg'
  });

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const loadAdminEvents = async () => {
    try {
      const res = await fetch(`/api/events?admin=true&_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
          saveStoredEvents(data);
          return;
        }
      }
    } catch (e) {
      console.error('loadAdminEvents error:', e);
    }
    setEvents(getStoredEvents());
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      loadAdminEvents();
    }
  }, []);

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      loadAdminEvents();
      setPinError(false);
      showToast('Login Successful!', 'success');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      location: '',
      city: 'Ahmedabad',
      dates: 'Oct 11 – Oct 19, 2026',
      artist: '',
      type: 'ahmedabad',
      passTypes: 'General / VIP',
      formats: 'Physical & Online Available',
      badge: 'Verified B2B Venue',
      availability: 'High Inventory',
      b2bPrice: 'Get B2B Rate',
      image: '/assets/venue_karnavati.jpg'
    });
  };

  const handleToggleForm = () => {
    if (showForm) {
      setShowForm(false);
      handleResetForm();
    } else {
      handleResetForm();
      setShowForm(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size should be less than 2MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setFormData((prev) => ({ ...prev, image: evt.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/events/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data.events) {
          setEvents(data.events);
          saveStoredEvents(data.events);
        }
        showToast(editingId ? 'Event updated!' : 'New event added!', 'success');
        setShowForm(false);
        handleResetForm();
        return;
      }
    } catch (err) {
      console.error('API Save Error:', err);
    }

    let current = [...events];
    if (editingId) {
      const idx = current.findIndex((ev) => ev.id === editingId);
      if (idx !== -1) current[idx] = { ...current[idx], ...formData };
    } else {
      current.unshift({ id: 'custom_' + Date.now(), ...formData, isDefault: false });
    }
    setEvents(current);
    saveStoredEvents(current);
    showToast('Saved!', 'success');
    setShowForm(false);
    handleResetForm();
  };

  const handleEditEvent = (ev) => {
    setEditingId(ev.id);
    setFormData({
      name: ev.name || '',
      location: ev.location || '',
      city: ev.city || 'Ahmedabad',
      dates: ev.dates || 'Oct 11 – Oct 19, 2026',
      artist: ev.artist || '',
      type: ev.type || 'ahmedabad',
      passTypes: ev.passTypes || 'General',
      formats: ev.formats || 'Physical Pass',
      badge: ev.badge || 'Verified B2B',
      availability: ev.availability || 'High Inventory',
      b2bPrice: ev.b2bPrice || 'Get B2B Rate',
      image: ev.image || '/assets/venue_karnavati.jpg'
    });
    setShowForm(true);
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Delete this event?')) return;
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    saveStoredEvents(updated);

    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
          saveStoredEvents(data.events);
        }
        showToast('Event deleted permanently!', 'success');
        return;
      }
    } catch (err) {
      console.error('API Delete Error:', err);
    }
    showToast('Event deleted!', 'success');
  };

  const handleResetDefaults = async () => {
    if (!confirm('Reset all events to default system venues?')) return;
    try {
      const res = await fetch('/api/events/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.events) {
          setEvents(data.events);
          saveStoredEvents(data.events);
        }
        showToast('Reset to default events!', 'success');
        return;
      }
    } catch (err) {
      console.error('API Reset Error:', err);
    }

    setEvents(DEFAULT_VENUES);
    saveStoredEvents(DEFAULT_VENUES);
    showToast('Reset to default events!', 'success');
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `navratri_events_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup downloaded!', 'success');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          setEvents(imported);
          saveStoredEvents(imported);
          showToast('Events imported successfully!', 'success');
        } else {
          showToast('Invalid JSON file format', 'error');
        }
      } catch (err) {
        showToast('Error reading JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-pin-screen">
        <div className="admin-pin-card">
          <div className="admin-pin-logo">N</div>
          <h1>Admin Access</h1>
          <p>Enter PIN to access the event management dashboard</p>
          <form onSubmit={handleVerifyPin}>
            <input
              type="password"
              className="admin-pin-input"
              placeholder="Enter PIN (navratri2026)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              autoFocus
            />
            {pinError && <div className="admin-pin-error">Incorrect PIN. Try again.</div>}
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              <FaLock /> Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const customCount = events.filter((e) => !e.isDefault).length;
  const defaultCount = events.filter((e) => e.isDefault).length;

  return (
    <div className="admin-body">
      <header className="admin-header">
        <div className="admin-brand">
          <span style={{ color: 'var(--blaze-500)' }}>RANGSETU</span> Admin
        </div>
        <div className="admin-nav-actions">
          <Link href="/" className="admin-btn-sm" target="_blank">
            <FaGlobe /> View Site
          </Link>
          <button className="admin-btn-sm" onClick={handleResetDefaults}>
            <FaRotateLeft /> Reset Defaults
          </button>
          <button className="admin-btn-sm" onClick={handleExportJSON}>
            <FaFileExport /> Export
          </button>
          <label className="admin-btn-sm" style={{ cursor: 'pointer' }}>
            <FaFileImport /> Import
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>
          <button className="admin-btn-sm admin-btn-danger" onClick={handleLogout}>
            <FaRightFromBracket /> Logout
          </button>
        </div>
      </header>

      <div className="admin-container">
        {/* Stats */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Events</div>
            <div className="admin-stat-val">{events.length}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Admin Added</div>
            <div className="admin-stat-val" style={{ color: '#C084FC' }}>{customCount}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-label">Default Events</div>
            <div className="admin-stat-val" style={{ color: 'var(--blaze-500)' }}>{defaultCount}</div>
          </div>
        </div>

        {/* Add/Edit Form Panel */}
        {showForm && (
          <div className="admin-form-panel">
            <div className="admin-panel-header" style={{ padding: 0, marginBottom: '20px', border: 'none' }}>
              <div className="admin-panel-title">
                {editingId ? 'Edit Event' : 'Add New Event'}
              </div>
              <button className="admin-btn-sm" onClick={handleToggleForm}>
                <FaXmark /> Cancel
              </button>
            </div>

            <form onSubmit={handleSaveEvent}>
              <div className="admin-form-grid">
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Event Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Karnavati Club Garba 2026"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Location</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. S.G. Highway, Bodakdev"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Dates</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Oct 11 – Oct 19, 2026"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Artist / Performer</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Kinjal Dave & Live Band"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Pass Types</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="General / VIP / Premium"
                    value={formData.passTypes}
                    onChange={(e) => setFormData({ ...formData, passTypes: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Availability</label>
                  <select
                    className="admin-form-control"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="High Inventory">High Inventory</option>
                    <option value="Selling Fast">Selling Fast</option>
                    <option value="Limited Seats">Limited Seats</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Pass Formats</label>
                  <select
                    className="admin-form-control"
                    value={formData.formats}
                    onChange={(e) => setFormData({ ...formData, formats: e.target.value })}
                  >
                    <option value="Physical Pass">Physical Pass</option>
                    <option value="Online Pass">Online Pass</option>
                    <option value="Physical & Online Available">Physical & Online Available</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Badge Label</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Verified B2B Venue"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>Image Upload (Max 2MB)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-form-control"
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: 'var(--admin-muted)' }}>B2B Price Label</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Get B2B Rate"
                    value={formData.b2bPrice}
                    onChange={(e) => setFormData({ ...formData, b2bPrice: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="admin-btn-sm" onClick={handleToggleForm}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-sm admin-btn-primary">
                  <FaCheck /> {editingId ? 'Update Event' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table Panel */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <div className="admin-panel-title">Event Management</div>
            <button className="admin-btn-sm admin-btn-primary" onClick={handleToggleForm}>
              <FaPlus /> Add Event
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Event Name & Location</th>
                <th>Dates</th>
                <th>Pass Types</th>
                <th>Availability</th>
                <th>Source</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px' }}>
                    No events found. Click "+ Add Event" to create one.
                  </td>
                </tr>
              ) : (
                events.map((ev) => {
                  const isCustom = !ev.isDefault;
                  const availClass = ev.availability === 'High Inventory' ? 'high' :
                                     ev.availability === 'Selling Fast' ? 'selling-fast' : 'limited';
                  return (
                    <tr key={ev.id}>
                      <td>
                        <FaGripVertical style={{ color: 'var(--admin-muted)' }} />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={ev.image || '/assets/venue_karnavati.jpg'} alt={ev.name} className="admin-event-thumb" />
                          <div>
                            <div style={{ fontWeight: 700, color: '#FFF' }}>{ev.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>
                              <FaLocationDot style={{ color: 'var(--blaze-500)' }} /> {ev.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{ev.dates}</td>
                      <td>{ev.passTypes}</td>
                      <td><span className={`admin-badge ${availClass}`}>{ev.availability}</span></td>
                      <td>
                        <span className={`admin-badge ${isCustom ? 'source-admin' : 'source-default'}`}>
                          {isCustom ? 'Admin Added' : 'System Default'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="admin-btn-sm" onClick={() => handleEditEvent(ev)}>
                            <FaPenToSquare /> Edit
                          </button>
                          <button className="admin-btn-sm admin-btn-danger" onClick={() => handleDeleteEvent(ev.id)}>
                            <FaTrashCan /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {toastMsg && (
        <div className="admin-toast">
          <FaCheck /> {toastMsg}
        </div>
      )}
    </div>
  );
}
