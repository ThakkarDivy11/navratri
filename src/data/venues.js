export const BUSINESS_OWNER_WHATSAPP = '919664925159';
export const LOCAL_STORAGE_KEY = 'navratri_custom_events';

export const DEFAULT_VENUES = [
  {
    id: 'rudaah',
    name: 'Rudaah Mandli Garba 2026',
    location: 'S.G. Highway, Bodakdev',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Traditional Mandli Folk Troupe',
    type: 'ahmedabad',
    category: 'mandli',
    passTypes: 'General / VIP Mandli Pass',
    formats: 'Physical & Online Available',
    image: '/assets/ruda_garba.png',
    b2bPrice: 'Get B2B Rate',
    badge: 'Authentic Mandli Garba',
    availability: 'High Inventory',
    isDefault: true
  },
  {
    id: 'raataldi',
    name: 'Raataldi Mandli Garba 2026',
    location: 'Sindhu Bhavan Road (SBR)',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Raataldi Live Dhol & Folk Band',
    type: 'ahmedabad',
    category: 'mandli',
    passTypes: 'General / VIP / Premium Lounge',
    formats: 'Physical Pass & Online',
    image: '/assets/raatledo.png',
    b2bPrice: 'Get B2B Rate',
    badge: 'Exclusive Mandli Garba',
    availability: 'Selling Fast',
    isDefault: true
  },
  {
    id: 'suvarn_ac_dome',
    name: 'Suvarn AC Dome Garba 2026',
    location: 'S.G. Highway, Gota',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Aishwarya Majmudar & Live Symphony',
    type: 'ahmedabad',
    category: 'ac_dome',
    passTypes: 'General / VIP AC Dome Pass',
    formats: 'Physical Pass & Online',
    image: '/assets/ruda_garba.png',
    b2bPrice: 'Get B2B Rate',
    badge: '100% AC Dome Arena',
    availability: 'High Inventory',
    isDefault: true
  },
  {
    id: 'shankus_ac_dome',
    name: 'Shankus AC Mega Dome Arena 2026',
    location: 'S.G. Highway North',
    city: 'Ahmedabad',
    dates: 'Oct 11 – Oct 19, 2026',
    artist: 'Arvind Vegda & Live Folk Troupe',
    type: 'ahmedabad',
    category: 'ac_dome',
    passTypes: 'General / VIP / Premium Lounge',
    formats: 'Physical & Online Available',
    image: '/assets/raatledo.png',
    b2bPrice: 'Get B2B Rate',
    badge: 'Grand AC Dome Arena',
    availability: 'Selling Fast',
    isDefault: true
  }
];

export const VENUES_DATA = DEFAULT_VENUES;

const DEPRECATED_EVENT_IDS = new Set(['karnavati', 'rajpath', 'mirchi']);

export function getStoredEvents() {
  if (typeof window === 'undefined') return DEFAULT_VENUES;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out deprecated non-mandli events
        const sanitized = parsed.filter((ev) => !DEPRECATED_EVENT_IDS.has(ev.id));
        if (sanitized.length > 0) {
          return sanitized;
        }
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_VENUES));
    return DEFAULT_VENUES;
  } catch (e) {
    return DEFAULT_VENUES;
  }
}

export const EVENTS_CHANNEL = 'rangsetu_events_sync';

export function broadcastEventsUpdate(events) {
  if (typeof window === 'undefined') return;
  try {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(EVENTS_CHANNEL);
      channel.postMessage({ type: 'SYNC_EVENTS', events });
      channel.close();
    }
  } catch (e) {}
}

export function saveStoredEvents(events, shouldBroadcast = true) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    memoryCache = events;
    lastFetchTime = Date.now();
    if (shouldBroadcast) {
      broadcastEventsUpdate(events);
    }
  } catch (e) {
    console.error('Error saving events', e);
  }
}

let inFlightPromise = null;
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 1000; // 10s in-memory cache

export async function fetchGlobalEvents(force = false) {
  const now = Date.now();
  if (!force && memoryCache && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      const url = force ? `/api/events?_t=${Date.now()}` : '/api/events';
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          memoryCache = data;
          lastFetchTime = Date.now();
          saveStoredEvents(data, false);
          return data;
        }
      }
    } catch (e) {
      console.error('fetchGlobalEvents error:', e);
    } finally {
      inFlightPromise = null;
    }
    const stored = getStoredEvents();
    memoryCache = stored;
    return stored;
  })();

  return inFlightPromise;
}

export const FAQ_DATA = [
  {
    question: 'Is this a B2B-only service?',
    answer: 'Yes. We specialize in bulk pass requirements for B2B buyers, corporate companies, event resellers, and large family or group bookings.'
  },
  {
    question: 'What is the minimum quantity?',
    answer: 'Our minimum order requirement generally starts from 10 to 20 passes to qualify for B2B pricing.'
  },
  {
    question: 'Can I request 100+ passes?',
    answer: 'Yes, absolutely. For orders of 100+ passes, we provide custom wholesale quotes and dedicated fulfillment assistance.'
  },
  {
    question: 'Are the passes physical or online?',
    answer: 'Both options may be available depending on the specific event. You can specify whether you prefer physical RFID wristbands/passes or digital/online delivery.'
  },
  {
    question: 'Do you generate the online passes?',
    answer: 'No, our platform does not generate passes. We strictly facilitate pass supply and procurement from official event sources.'
  },
  {
    question: 'How do I get the B2B price?',
    answer: 'Click "Request Passes", fill out your required event and quantity, and submit. You will receive live availability and wholesale rate options directly on WhatsApp.'
  },
  {
    question: 'How quickly will you respond to my enquiry?',
    answer: 'Our team responds promptly on WhatsApp—typically within a few minutes during business hours.'
  },
  {
    question: 'Can I order passes for multiple events?',
    answer: 'Yes! You can combine bulk pass orders across premier Mandli Garbas (Rudaah, Raataldi) and top AC Dome Garbas in Ahmedabad into a single corporate enquiry.'
  },
  {
    question: 'Do you deliver outside Ahmedabad?',
    answer: 'We cover all areas in Ahmedabad and Gandhinagar with direct delivery. Outstation courier can also be organized for verified bulk orders.'
  },
  {
    question: 'How do I contact your team?',
    answer: 'You can reach us directly via WhatsApp at +91 96649 25159, call us, or submit an enquiry form anywhere on this site.'
  }
];
