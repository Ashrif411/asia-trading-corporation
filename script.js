/*
  Asia Trading Corporation Website JavaScript
  --------------------------------------------------
  Handles mobile navigation, dark/light mode, counters,
  FAQ accordion, preloader, scroll-to-top, and basic form feedback.
*/

// Wait until the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTop = document.getElementById('scrollTop');
  const preloader = document.getElementById('preloader');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const currentYear = document.getElementById('currentYear');

  // Initialize AOS scroll animation library if the CDN is loaded.
  if (window.AOS) {
    AOS.init({
      duration: 850,
      once: true,
      offset: 90,
      easing: 'ease-out-cubic'
    });
  }

  // Hide loading animation after page assets finish loading.
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('hidden');
    }
  });

  // Set dynamic copyright year.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile hamburger menu.
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked.
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky header background and scroll-to-top visibility.
  const handleScrollState = () => {
    const scrolled = window.scrollY > 40;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 500);
  };

  handleScrollState();
  window.addEventListener('scroll', handleScrollState, { passive: true });

  // Scroll-to-top button.
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dark/light mode toggle with localStorage persistence.
  const savedTheme = localStorage.getItem('atc-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('atc-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // Highlight active navigation link while scrolling.
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const setActiveLink = () => {
    let activeId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 130;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Animated counters triggered only once when visible.
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  const runCounters = () => {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const duration = 1600;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * easedProgress).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounters();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) counterObserver.observe(statsSection);

  // FAQ accordion.
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const currentlyActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((faq) => faq.classList.remove('active'));
      if (!currentlyActive) item.classList.add('active');
    });
  });

  // Contact form behavior.
  // GitHub Pages is static, so use Formspree/EmailJS or another form service for real delivery.
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const action = contactForm.getAttribute('action') || '';

      if (action.includes('YOUR_FORM_ID')) {
        event.preventDefault();
        showToast('Form placeholder detected. Replace YOUR_FORM_ID with a real Formspree/EmailJS endpoint before publishing.');
      }
    });
  }

  // Newsletter demo behavior.
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast('Subscription saved locally as a demo. Connect a real newsletter service before launch.');
        newsletterForm.reset();
      }
    });
  }

  // Lightweight toast notification.
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.bottom = '28px';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = 'min(520px, calc(100% - 28px))';
    toast.style.padding = '14px 18px';
    toast.style.borderRadius = '999px';
    toast.style.background = 'rgba(5, 7, 11, 0.92)';
    toast.style.color = '#ffffff';
    toast.style.boxShadow = '0 18px 40px rgba(0,0,0,0.24)';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 260);
    }, 3800);
  }
});
