// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class for styling
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===== SCROLL TO TOP BUTTON (Optional) =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--primary-green);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.visibility = 'visible';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== ANIMATION ON SCROLL (Fade In Elements) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.stat-card, .service-card, .feature-item, .client-logo-card');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ===== FORM VALIDATION (for future contact form) =====
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'red';
        
        // Remove error styling after user starts typing
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        });
      }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = 'red';
      }
    }

    // Phone validation (10 digits)
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneInput.value.replace(/[\s-]/g, ''))) {
        isValid = false;
        phoneInput.style.borderColor = 'red';
      }
    }

    if (isValid) {
      // Show success message
      alert('Form submitted successfully! We will contact you soon.');
      form.reset();
    } else {
      alert('Please fill all required fields correctly.');
    }
  });
}

// Initialize form validation if contact form exists
document.addEventListener('DOMContentLoaded', () => {
  validateForm('contactForm');
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== PREVENT RIGHT CLICK ON IMAGES (Optional Security) =====
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});
*/

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== CONSOLE MESSAGE (Optional Branding) =====
console.log('%c🌱 Prabodhan Agro Pvt. Ltd.', 'color: #2E7D32; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'color: #FDD835; font-size: 14px;');
