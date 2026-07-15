/* =============================================
   NEXAERP — JavaScript
   ============================================= */

// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// --- PRICING TOGGLE ---
const pricingToggle = document.getElementById('pricingToggle');
const cloudPricing = document.getElementById('cloudPricing');
const onpremPricing = document.getElementById('onpremPricing');
const cloudLabel = document.getElementById('toggle-cloud-label');
const onpremLabel = document.getElementById('toggle-onprem-label');

let isOnprem = false;

pricingToggle.addEventListener('click', () => {
  isOnprem = !isOnprem;
  pricingToggle.classList.toggle('on', isOnprem);

  if (isOnprem) {
    cloudPricing.classList.add('hidden');
    onpremPricing.classList.remove('hidden');
    cloudLabel.classList.remove('active');
    onpremLabel.classList.add('active');
  } else {
    cloudPricing.classList.remove('hidden');
    onpremPricing.classList.add('hidden');
    cloudLabel.classList.add('active');
    onpremLabel.classList.remove('active');
  }
});

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();

  if (!name || !email) {
    // Simple validation shake
    if (!name) shakeField('cf-name');
    if (!email) shakeField('cf-email');
    return;
  }

  // Simulate form submission
  const btn = document.getElementById('form-submit-btn');
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  }, 1200);
});

function shakeField(id) {
  const field = document.getElementById(id);
  field.style.animation = 'none';
  field.offsetHeight; // reflow
  field.style.borderColor = '#ef4444';
  field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
  setTimeout(() => {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  }, 2000);
}

// --- INTERSECTION OBSERVER ANIMATIONS ---
const animateEls = document.querySelectorAll(
  '.feature-card, .service-card, .why-card, .pricing-card, .deploy-card, .contact-item, .trust-badge, .security-card'
);

animateEls.forEach(el => el.classList.add('animate-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grid parents
      const delay = getStaggerDelay(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach(el => observer.observe(el));

function getStaggerDelay(el) {
  const parent = el.parentElement;
  const siblings = Array.from(parent.children).filter(c => c.classList.contains(el.classList[0]));
  const index = siblings.indexOf(el);
  return Math.min(index * 80, 400);
}

// --- SMOOTH ACTIVE NAV LINKS ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#f8fafc';
    }
  });
});

// --- HERO MOCKUP ANIMATION ---
// Animate chart bars on load
setTimeout(() => {
  const bars = document.querySelectorAll('.chart-bars .bar');
  bars.forEach((bar, i) => {
    bar.style.transition = `height 0.6s ease ${i * 80}ms`;
  });
}, 200);

// --- COUNTER ANIMATION FOR STATS ---
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

const heroSection = document.getElementById('hero');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = document.querySelectorAll('.stat-number');
      const values = [10, 2];
      statNumbers.forEach((el, i) => {
        if (i < values.length) {
          animateCounter(el, values[i], '+');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statsObserver.observe(heroSection);

// --- PARALLAX ORBS ---
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  const orb3 = document.querySelector('.hero-orb-3');

  if (orb1) orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  if (orb2) orb2.style.transform = `translate(${x * -0.3}px, ${y * -0.3}px)`;
  if (orb3) orb3.style.transform = `translate(${x * 0.2}px, ${y * 0.7}px)`;
});
