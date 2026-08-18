/* ==========================================================================
   NAVRATRI B2B — ADMIN PANEL JAVASCRIPT LOGIC
   PIN Auth, LocalStorage CRUD, Image Upload, Export/Import
   PIN Code: navratri2026
   ========================================================================== */

const ADMIN_PIN = 'navratri2026';
const LOCAL_STORAGE_KEY = 'navratri_custom_events';

// Default hardcoded venues to show in admin dashboard
const DEFAULT_VENUES = [
  {
    id: 'karnavati',
    name: 'Karnavati Club Garba 2026',
    location: 'S.G. Highway, Bodakdev',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Kinjal Dave & Live Band',
    type: 'ahmedabad',
    passTypes: 'General / VIP / Premium',
    formats: 'Physical & Online Available',
    image: 'assets/venue_karnavati.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Verified B2B Venue',
    availability: 'High Inventory',
    isDefault: true
  },
  {
    id: 'rajpath',
    name: 'Rajpath Club Garba 2026',
    location: 'S.G. Highway, Bodakdev',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Aditya Gadhvi & Troupe',
    type: 'ahmedabad',
    passTypes: 'General / VIP / Premium',
    formats: 'Physical Pass',
    image: 'assets/venue_rajpath.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Verified B2B Venue',
    availability: 'Selling Fast',
    isDefault: true
  },
  {
    id: 'mirchi',
    name: 'Mirchi Rock N Dhol 2026',
    location: 'Sindhu Bhavan Road (SBR)',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Parthiv Gohil & Darshan Raval',
    type: 'ahmedabad',
    passTypes: 'General / VIP',
    formats: 'Physical & Online Available',
    image: 'assets/venue_mirchi.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Youth Choice',
    availability: 'High Inventory',
    isDefault: true
  },
  {
    id: 'suvarn',
    name: 'Suvarn Navratri Garba 2026',
    location: 'S.G. Highway, Gota',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Aishwarya Majmudar',
    type: 'ahmedabad',
    passTypes: 'General / VIP / Premium',
    formats: 'Physical Pass',
    image: 'assets/ruda_garba.png',
    b2bPrice: 'Get B2B Rate',
    badge: 'Grand Arena',
    availability: 'High Inventory',
    isDefault: true
  },
  {
    id: 'redraas',
    name: 'Red Raas VIP Garba 2026',
    location: 'Prahlad Nagar Extension',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Bhoomi Trivedi',
    type: 'ahmedabad',
    passTypes: 'VIP / Premium Lounge',
    formats: 'Physical Pass',
    image: 'assets/raatledo.png',
    b2bPrice: 'Get B2B Rate',
    badge: 'Ultra VIP',
    availability: 'Limited Seats',
    isDefault: true
  },
  {
    id: 'shankus',
    name: 'Shankus Mega Garba Arena',
    location: 'S.G. Highway North',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Arvind Vegda & Folk Band',
    type: 'ahmedabad',
    passTypes: 'General / Premium',
    formats: 'Physical & Online Available',
    image: 'assets/venue_karnavati.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Mega Ground',
    availability: 'High Inventory',
    isDefault: true
  }
];

// ── Auth Check ──
document.addEventListener('DOMContentLoaded', () => {
  const isAuth = sessionStorage.getItem('admin_authenticated');
  if (isAuth === 'true') {
    showDashboard();
  }

  // PIN Input Enter Key
  const pinInput = document.getElementById('pinInput');
  if (pinInput) {
    pinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') verifyPin();
    });
  }

  initPassTypePills();
});

function verifyPin() {
  const pinInput = document.getElementById('pinInput');
  const pinError = document.getElementById('pinError');
  const val = pinInput.value.trim();

  if (val === ADMIN_PIN) {
    sessionStorage.setItem('admin_authenticated', 'true');
    pinError.style.display = 'none';
    showDashboard();
    showToast('Login Successful!', 'success');
  } else {
    pinError.style.display = 'block';
    pinInput.value = '';
    pinInput.focus();
  }
}

function logout() {
  sessionStorage.removeItem('admin_authenticated');
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('pinScreen').style.display = 'flex';
  document.getElementById('pinInput').value = '';
}

function showDashboard() {
  document.getElementById('pinScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  renderEventsTable();
}

// ── LocalStorage & Server API Helpers ──
async function getStoredEvents() {
  try {
    const res = await fetch('/api/events');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.warn('API connection unavailable, fallback to local cache', e);
  }

  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      return JSON.parse(data);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_VENUES));
    return DEFAULT_VENUES;
  } catch (e) {
    return DEFAULT_VENUES;
  }
}

function saveStoredEvents(events) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving events', e);
    showToast('Failed to save to localStorage!', 'error');
  }
}

async function getAllEvents() {
  return await getStoredEvents();
}

// ── Render Table & Stats ──
async function renderEventsTable() {
  const tbody = document.getElementById('eventsTableBody');
  const allEvents = await getStoredEvents();
  const customCount = allEvents.filter(e => !e.isDefault).length;
  const defaultCount = allEvents.filter(e => e.isDefault).length;

  // Update Stats
  document.getElementById('statTotal').textContent = allEvents.length;
  document.getElementById('statAdmin').textContent = customCount;
  document.getElementById('statDefault').textContent = defaultCount;

  if (allEvents.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <i class="fa-solid fa-calendar-xmark"></i>
            <p>No events found. Click "+ Add Event" to create one.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = allEvents.map((event, index) => {
    const isCustom = !event.isDefault;
    const availClass = event.availability === 'High Inventory' ? 'high' :
                       event.availability === 'Selling Fast' ? 'selling-fast' : 'limited';

    return `
      <tr draggable="true" data-index="${index}" data-id="${event.id}">
        <td class="drag-handle-cell" title="Click & Drag to reorder">
          <i class="fa-solid fa-grip-vertical drag-btn"></i>
        </td>
        <td>
          <div class="event-name-cell">
            <img src="${event.image || 'assets/venue_karnavati.jpg'}" alt="${event.name}" class="event-thumb">
            <div>
              <div class="name">${event.name}</div>
              <div class="location"><i class="fa-solid fa-location-dot"></i> ${event.location || event.city}</div>
            </div>
          </div>
        </td>
        <td>${event.dates}</td>
        <td>${event.passTypes}</td>
        <td><span class="badge-pill ${availClass}">${event.availability}</span></td>
        <td>
          <span class="badge-pill ${isCustom ? 'source-admin' : 'source-default'}">
            ${isCustom ? 'Admin Added' : 'System Default'}
          </span>
        </td>
        <td style="text-align:right;">
          <div class="table-actions" style="justify-content:flex-end;">
            <button class="table-btn edit" onclick="editEvent('${event.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="table-btn delete" onclick="deleteEvent('${event.id}')">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  initTableDragAndDrop();
}

// ── Form Toggle & Actions ──
function toggleForm() {
  const panel = document.getElementById('eventFormPanel');
  const btn = document.getElementById('toggleFormBtn');

  if (panel.classList.contains('open')) {
    cancelForm();
  } else {
    resetForm();
    panel.classList.add('open');
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Form';
  }
}

function cancelForm() {
  const panel = document.getElementById('eventFormPanel');
  const btn = document.getElementById('toggleFormBtn');
  panel.classList.remove('open');
  btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Event';
  resetForm();
}

function resetForm() {
  document.getElementById('eventForm').reset();
  document.getElementById('editEventId').value = '';
  document.getElementById('eventImageData').value = '';
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('formSubmitBtn').innerHTML = '<i class="fa-solid fa-check"></i> Save Event';
}

// ── Image Upload (Base64) ──
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast('Image size should be less than 2MB', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const base64 = event.target.result;
    document.getElementById('eventImageData').value = base64;
    const preview = document.getElementById('imagePreview');
    preview.src = base64;
    preview.style.display = 'inline-block';
  };
  reader.readAsDataURL(file);
}

// ── Save Event (Create / Update via Global Server API) ──
async function saveEvent(e) {
  e.preventDefault();

  const editId = document.getElementById('editEventId').value;
  const eventPayload = {
    name: document.getElementById('eventName').value.trim(),
    location: document.getElementById('eventLocation').value.trim(),
    city: document.getElementById('eventCity').value.trim() || 'Ahmedabad',
    dates: document.getElementById('eventDates').value.trim(),
    artist: document.getElementById('eventArtist').value.trim(),
    type: document.getElementById('eventType').value,
    passTypes: document.getElementById('eventPassTypes').value.trim(),
    formats: document.getElementById('eventFormats').value,
    badge: document.getElementById('eventBadge').value.trim(),
    availability: document.getElementById('eventAvailability').value,
    b2bPrice: document.getElementById('eventPrice').value.trim() || 'Get B2B Rate',
    image: document.getElementById('eventImageData').value || 'assets/venue_karnavati.jpg'
  };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/events/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload)
      });
    } else {
      res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload)
      });
    }

    if (res.ok) {
      const data = await res.json();
      if (data.events) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.events));
      }
      showToast(editId ? 'Event updated globally for all users!' : 'New event added globally for all users!', 'success');
      cancelForm();
      await renderEventsTable();
      return;
    }
  } catch (err) {
    console.error('API Error:', err);
  }

  // Fallback
  const events = await getStoredEvents();
  if (editId) {
    const idx = events.findIndex(ev => ev.id === editId);
    if (idx !== -1) {
      events[idx] = { ...events[idx], ...eventPayload };
    }
  } else {
    events.unshift({ id: 'custom_' + Date.now(), ...eventPayload, isDefault: false });
  }
  saveStoredEvents(events);
  showToast('Saved locally!', 'success');
  cancelForm();
  await renderEventsTable();
}

// ── Edit Event ──
async function editEvent(id) {
  const events = await getStoredEvents();
  const event = events.find(ev => ev.id === id);
  if (!event) return;

  document.getElementById('editEventId').value = event.id;
  document.getElementById('eventName').value = event.name;
  document.getElementById('eventLocation').value = event.location;
  document.getElementById('eventCity').value = event.city;
  document.getElementById('eventDates').value = event.dates;
  document.getElementById('eventArtist').value = event.artist || '';
  document.getElementById('eventType').value = event.type;
  document.getElementById('eventPassTypes').value = event.passTypes;
  document.getElementById('eventFormats').value = event.formats;
  document.getElementById('eventBadge').value = event.badge;
  document.getElementById('eventAvailability').value = event.availability;
  document.getElementById('eventPrice').value = event.b2bPrice;
  document.getElementById('eventImageData').value = event.image || '';

  // Update pass type pills selection state
  const pills = document.querySelectorAll('.pass-pill-btn');
  pills.forEach(pill => {
    const type = pill.getAttribute('data-type');
    const isSelected = (event.passTypes || '').includes(type);
    pill.classList.toggle('selected', isSelected);
    const icon = pill.querySelector('i');
    if (icon) icon.className = isSelected ? 'fa-solid fa-check' : 'fa-solid fa-plus';
  });

  if (event.image) {
    const preview = document.getElementById('imagePreview');
    preview.src = event.image;
    preview.style.display = 'inline-block';
  }

  const panel = document.getElementById('eventFormPanel');
  const btn = document.getElementById('toggleFormBtn');
  panel.classList.add('open');
  btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Form';
  document.getElementById('formSubmitBtn').innerHTML = '<i class="fa-solid fa-check"></i> Update Event';

  window.scrollTo({ top: panel.offsetTop - 100, behavior: 'smooth' });
}

// ── Delete Event globally for ALL users ──
async function deleteEvent(id) {
  if (!confirm('Super Admin Warning: Delete this event permanently for ALL users across all devices?')) return;

  try {
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) {
      const data = await res.json();
      if (data.events) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.events));
      }
      showToast('Event deleted globally for all users!', 'success');
      await renderEventsTable();
      return;
    }
  } catch (err) {
    console.error('Delete API Error:', err);
  }

  // Fallback
  let events = await getStoredEvents();
  events = events.filter(ev => ev.id !== id);
  saveStoredEvents(events);
  showToast('Event deleted!', 'success');
  await renderEventsTable();
}

// ── Reset Defaults globally ──
async function resetDefaultEvents() {
  if (!confirm('Are you sure you want to reset all events to system defaults for ALL users?')) return;

  try {
    const res = await fetch('/api/events/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.events) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.events));
      }
      showToast('Reset to default events globally!', 'success');
      await renderEventsTable();
      return;
    }
  } catch (err) {
    console.error('Reset API Error:', err);
  }

  saveStoredEvents(DEFAULT_VENUES);
  showToast('Reset to default events!', 'success');
  await renderEventsTable();
}

// ── Export / Import JSON ──
function exportEvents() {
  const customEvents = getCustomEvents();
  const blob = new Blob([JSON.stringify(customEvents, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `navratri_events_backup_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup downloaded!', 'success');
}

function importEvents(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        saveCustomEvents(imported);
        renderEventsTable();
        showToast('Events imported successfully!', 'success');
      } else {
        showToast('Invalid JSON file format', 'error');
      }
    } catch (err) {
      showToast('Error reading JSON file', 'error');
    }
  };
  reader.readAsText(file);
}

// ── Pass Types Pill Buttons Handler ──
function initPassTypePills() {
  const container = document.getElementById('passTypePills');
  const input = document.getElementById('eventPassTypes');
  if (!container || !input) return;

  const buttons = container.querySelectorAll('.pass-pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('selected');

      // Update icon
      const icon = btn.querySelector('i');
      if (btn.classList.contains('selected')) {
        if (icon) icon.className = 'fa-solid fa-check';
      } else {
        if (icon) icon.className = 'fa-solid fa-plus';
      }

      // Collect selected types
      const selected = Array.from(buttons)
        .filter(b => b.classList.contains('selected'))
        .map(b => b.getAttribute('data-type'));

      input.value = selected.join(' / ');
    });
  });
}

// ── Drag & Drop Table Reordering ──
let dragSrcIndex = null;

function initTableDragAndDrop() {
  const rows = document.querySelectorAll('#eventsTableBody tr[draggable="true"]');

  rows.forEach(row => {
    row.addEventListener('dragstart', (e) => {
      dragSrcIndex = parseInt(row.getAttribute('data-index'), 10);
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragSrcIndex);
    });

    row.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      row.classList.add('drag-over');
    });

    row.addEventListener('dragleave', () => {
      row.classList.remove('drag-over');
    });

    row.addEventListener('drop', (e) => {
      e.preventDefault();
      row.classList.remove('drag-over');
      const targetIndex = parseInt(row.getAttribute('data-index'), 10);

      if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
        let events = getStoredEvents();
        const movedItem = events.splice(dragSrcIndex, 1)[0];
        events.splice(targetIndex, 0, movedItem);

        saveStoredEvents(events);
        renderEventsTable();
        showToast('Event order updated!', 'success');
      }
    });

    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      rows.forEach(r => r.classList.remove('drag-over'));
    });
  });
}

// ── Toast Notification ──
function showToast(msg, type = 'success') {
  const toast = document.getElementById('adminToast');
  const toastMsg = document.getElementById('toastMsg');

  toast.className = `admin-toast ${type} show`;
  toastMsg.textContent = msg;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
