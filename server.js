import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;
const EVENTS_FILE = path.join(__dirname, 'events.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper: Read events.json
function readEvents() {
  try {
    if (!fs.existsSync(EVENTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

// Helper: Write events.json
function writeEvents(events) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
}

const defaultVenues = [
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

// ── Super Admin REST API Routes ──

// 1. GET /api/events
app.get('/api/events', (req, res) => {
  const events = readEvents();
  res.json(events);
});

// 2. POST /api/events/reset (Must be before /:id)
app.post('/api/events/reset', (req, res) => {
  writeEvents(defaultVenues);
  res.json({ success: true, events: defaultVenues, message: 'Reset to default events globally' });
});

// 3. POST /api/events
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  if (!newEvent || !newEvent.name) return res.status(400).json({ error: 'Invalid event data' });
  const events = readEvents();
  if (!newEvent.id) newEvent.id = 'custom_' + Date.now();
  newEvent.isDefault = false;
  events.unshift(newEvent);
  writeEvents(events);
  res.json({ success: true, events, message: 'Event added globally for all users' });
});

// 4. PUT /api/events/:id
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const events = readEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Event not found' });
  events[index] = { ...events[index], ...req.body };
  writeEvents(events);
  res.json({ success: true, events, message: 'Event updated globally for all users' });
});

// 5. DELETE /api/events/:id (Global Delete for ALL users)
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  let events = readEvents();
  const initialLength = events.length;
  events = events.filter(e => e.id !== id);
  if (events.length === initialLength) return res.status(404).json({ error: 'Event not found' });
  writeEvents(events);
  res.json({ success: true, events, message: 'Event deleted globally for all users' });
});

// ── Static Assets (Served AFTER API Routes) ──
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`🚀 Super Admin Navratri Backend Server running on http://localhost:${PORT}`);
});
