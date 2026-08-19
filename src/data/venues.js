export const BUSINESS_OWNER_WHATSAPP = '919664925159';
export const LOCAL_STORAGE_KEY = 'navratri_custom_events';

export const DEFAULT_VENUES = [
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
    image: '/assets/venue_karnavati.jpg',
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
    image: '/assets/venue_rajpath.jpg',
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
    image: '/assets/venue_mirchi.jpg',
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
    image: '/assets/ruda_garba.png',
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
    image: '/assets/raatledo.png',
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
    image: '/assets/venue_karnavati.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Mega Ground',
    availability: 'High Inventory',
    isDefault: true
  }
];

export const VENUES_DATA = DEFAULT_VENUES;

export function getStoredEvents() {
  if (typeof window === 'undefined') return DEFAULT_VENUES;
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

export function saveStoredEvents(events) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Error saving events', e);
  }
}

export async function fetchGlobalEvents() {
  return getStoredEvents();
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
    answer: 'Yes! You can combine pass orders for multiple Navratri venues in Ahmedabad into a single corporate enquiry.'
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
