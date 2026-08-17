/* ==========================================================================
   AHMEDABAD NAVRATRI 2026 - B2B BULK PASS PORTAL
   Application Logic & WhatsApp B2B Integration
   Owner Phone Number: +91 96649 25159
   ========================================================================== */

const BUSINESS_OWNER_WHATSAPP = '919664925159';

// Featured Ahmedabad Garba Venues Dataset
const VENUES_DATA = [
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
    availability: 'High Inventory'
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
    availability: 'Selling Fast'
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
    availability: 'High Inventory'
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
    image: 'assets/hero_garba.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Grand Arena',
    availability: 'High Inventory'
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
    image: 'assets/venue_rajpath.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Ultra VIP',
    availability: 'Limited Seats'
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
    image: 'assets/hero_garba.jpg',
    b2bPrice: 'Get B2B Rate',
    badge: 'Mega Ground',
    availability: 'High Inventory'
  }
];

// State
let currentFilter = 'all';
let pendingWhatsappUrl = '';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  initFilterControls();
  initModalEvents();
  initFaqAccordion();
  initHeroSlideshow();
});

// Get merged list of default venues and admin-added custom venues
function getCombinedVenues() {
  try {
    const data = localStorage.getItem('navratri_custom_events');
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.length > 0 ? parsed : VENUES_DATA;
    }
    return VENUES_DATA;
  } catch (e) {
    return VENUES_DATA;
  }
}

// Render Event Catalogue Cards
function renderEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  const allVenues = getCombinedVenues();
  const filtered = allVenues.filter(venue => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'ahmedabad') return (venue.city || 'Ahmedabad').toLowerCase() === 'ahmedabad';
    if (currentFilter === 'vip') return (venue.passTypes || '').includes('VIP');
    return true;
  });

  container.innerHTML = filtered.map(venue => `
    <div class="event-card">
      <div class="event-image-container">
        <img src="${venue.image}" alt="${venue.name}" class="event-card-img" loading="lazy">
        <div class="event-date-badge"><i class="fa-solid fa-calendar-day"></i> ${venue.dates}</div>
        <div class="event-verified-badge"><i class="fa-solid fa-circle-check"></i> ${venue.badge}</div>
      </div>

      <div class="event-body">
        <h3 class="event-title">${venue.name}</h3>
        
        <div class="event-meta-row">
          <span><i class="fa-solid fa-location-dot"></i> ${venue.location}</span>
        </div>

        <div class="event-spec-list">
          <div class="spec-item">
            <i class="fa-solid fa-ticket text-blaze"></i>
            <span><strong>Pass Types:</strong> ${venue.passTypes}</span>
          </div>
          <div class="spec-item">
            <i class="fa-solid fa-truck-ramp-box text-purple"></i>
            <span><strong>Delivery:</strong> ${venue.formats}</span>
          </div>
          <div class="spec-item">
            <i class="fa-solid fa-chart-line text-success"></i>
            <span><strong>Availability:</strong> ${venue.availability}</span>
          </div>
        </div>

        <div class="event-footer">
          <div class="event-price-meta">
            <span class="price-label">B2B Bulk Price</span>
            <span class="price-val">${venue.b2bPrice}</span>
          </div>
          <button class="btn-primary trigger-enquiry-modal" 
                  data-venue="${venue.name}" 
                  data-pass="General">
            Request Passes
          </button>
        </div>
      </div>
    </div>
  `).join('');

  attachModalTriggers();
}

// Filter Controls
function initFilterControls() {
  const pillBtns = document.querySelectorAll('.pill-btn');
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderEvents();
    });
  });
}

// Modal & Confirmation Flow
function initModalEvents() {
  const modal = document.getElementById('enquiryModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('modalEnquiryForm');
  const openWaBtn = document.getElementById('openWaDirectBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmitAndShowConfirmation();
    });
  }

  if (openWaBtn) {
    openWaBtn.addEventListener('click', () => {
      if (pendingWhatsappUrl) {
        window.open(pendingWhatsappUrl, '_blank');
      }
    });
  }

  attachModalTriggers();
}

function attachModalTriggers() {
  const triggers = document.querySelectorAll('.trigger-enquiry-modal');
  triggers.forEach(btn => {
    btn.removeEventListener('click', handleTriggerClick);
    btn.addEventListener('click', handleTriggerClick);
  });
}

function handleTriggerClick(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  const venue = btn.getAttribute('data-venue') || 'Karnavati Club Garba 2026';
  const pass = btn.getAttribute('data-pass') || 'General';
  const format = btn.getAttribute('data-format') || 'Physical Pass';

  openModal(venue, pass, 20, format);
}

function openModal(venue = 'Karnavati Club Garba 2026', pass = 'General', qty = 20, format = 'Physical Pass') {
  const modal = document.getElementById('enquiryModal');
  const modalFormState = document.getElementById('modalFormState');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const modalVenueSelect = document.getElementById('modalVenueSelect');
  const modalPassSelect = document.getElementById('modalPassSelect');
  const modalFormatSelect = document.getElementById('modalFormatSelect');
  const modalQuantity = document.getElementById('modalQuantity');

  if (!modal) return;

  // Reset view state to Form
  if (modalFormState) modalFormState.style.display = 'block';
  if (modalSuccessState) modalSuccessState.style.display = 'none';

  // Populate modalVenueSelect with all events (including admin added ones)
  if (modalVenueSelect) {
    const allVenues = getCombinedVenues();
    modalVenueSelect.innerHTML = allVenues.map(v => `<option value="${v.name}">${v.name}</option>`).join('');
    
    let matchedOption = Array.from(modalVenueSelect.options).find(opt => 
      opt.value.toLowerCase().includes(venue.toLowerCase())
    );
    if (matchedOption) modalVenueSelect.value = matchedOption.value;
  }

  if (modalPassSelect) {
    let matchedPass = Array.from(modalPassSelect.options).find(opt => opt.value === pass);
    if (matchedPass) modalPassSelect.value = pass;
  }

  if (modalFormatSelect) {
    let matchedFormat = Array.from(modalFormatSelect.options).find(opt => opt.value === format);
    if (matchedFormat) modalFormatSelect.value = format;
  }

  if (modalQuantity) {
    modalQuantity.value = qty;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('enquiryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Generate Pre-Filled WhatsApp Text & Show Post-Submit Confirmation
function handleFormSubmitAndShowConfirmation() {
  const eventName = document.getElementById('modalVenueSelect').value;
  const passType = document.getElementById('modalPassSelect').value;
  const quantity = document.getElementById('modalQuantity').value;
  const passFormat = document.getElementById('modalFormatSelect').value;
  const fullName = document.getElementById('modalFullName').value.trim();
  const city = document.getElementById('modalCity').value.trim() || 'Ahmedabad';
  const reqDate = document.getElementById('modalRequiredDate').value || 'Flexible';
  const notes = document.getElementById('modalAdditionalReq') ? document.getElementById('modalAdditionalReq').value.trim() : '';

  const formattedMsg = 
`🎉 *RANGSETU B2B NAVRATRI 2026 PASS REQUIREMENT*
---------------------------------------
📍 *Event:* ${eventName}
🎟️ *Pass Type:* ${passType}
🔢 *Quantity Required:* ${quantity} Passes
🏷️ *Pass Format:* ${passFormat}
📅 *Required Date:* ${reqDate}
---------------------------------------
👤 *Buyer Name:* ${fullName}
🏙️ *City:* ${city}
${notes ? `📝 *Additional Req:* ${notes}\n` : ''}---------------------------------------
*Sent via RangSetu B2B Platform*`;

  pendingWhatsappUrl = `https://wa.me/${BUSINESS_OWNER_WHATSAPP}?text=${encodeURIComponent(formattedMsg)}`;

  // Populate Summary box in Success State
  document.getElementById('sumSuccessEvent').textContent = eventName;
  document.getElementById('sumSuccessPass').textContent = passType;
  document.getElementById('sumSuccessQty').textContent = `${quantity} Passes`;
  document.getElementById('sumSuccessFormat').textContent = passFormat;
  document.getElementById('sumSuccessBuyer').textContent = fullName;

  // Toggle modal states to Success State
  document.getElementById('modalFormState').style.display = 'none';
  document.getElementById('modalSuccessState').style.display = 'block';
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// 5-Second Automatic Hero Image Slideshow
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Auto-play every 5000ms (5 seconds)
  slideInterval = setInterval(nextSlide, 5000);

  // Manual click on indicator dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIdx = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
      if (!isNaN(slideIdx)) {
        clearInterval(slideInterval);
        showSlide(slideIdx);
        slideInterval = setInterval(nextSlide, 5000);
      }
    });
  });
}
