// script.js - Interactive features for CyfoSys landing page

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle initialization
  const savedTheme = localStorage.getItem('theme');
  const rootEl = document.documentElement; // <html>
  // Apply saved theme or default to light
  if (savedTheme === 'dark') {
    rootEl.dataset.theme = 'dark';
  } else {
    rootEl.dataset.theme = 'light';
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const updateIcon = () => {
      themeToggle.textContent = rootEl.dataset.theme === 'dark' ? '☀️' : '🌙';
    };
    // Initialize icon
    updateIcon();
    themeToggle.addEventListener('click', () => {
      // Toggle theme
      rootEl.dataset.theme = rootEl.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', rootEl.dataset.theme);
      updateIcon();
    });
  }

  // Accent/theme alt toggle (optional)
  const colorToggle = document.getElementById('color-toggle');
  if (colorToggle) {
    const rootEl = document.documentElement;
    const currentAlt = localStorage.getItem('accentTheme') === 'alt';
    if (currentAlt) rootEl.dataset.accent = 'alt';
    const updateAccent = () => {
      // You can style based on data-accent if needed
    };
    updateAccent();
    colorToggle.addEventListener('click', () => {
      const isAlt = rootEl.dataset.accent === 'alt';
      rootEl.dataset.accent = isAlt ? 'default' : 'alt';
      localStorage.setItem('accentTheme', rootEl.dataset.accent);
      updateAccent();
    });
  }

  // Sticky navbar effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Smooth scroll for internal links (fallback for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll‑reveal animations using IntersectionObserver
  const revealElems = document.querySelectorAll('.hero-title, .hero-subtitle, .service-card, .trust-card, .timeline-item, .step, .tech-card, .featured-item, .testimonial-card, .stat-card, .cta-title');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElems.forEach(el => observer.observe(el));

  // Animated counters (trust & statistics)
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        const duration = 2000; // ms
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        const timer = setInterval(() => {
          current += 1;
          el.textContent = current;
          if (current >= target) {
            clearInterval(timer);
          }
        }, stepTime);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // Simple testimonial carousel (auto‑play)
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    const slides = slider.children;
    let index = 0;
    const showSlide = (i) => {
      for (let j = 0; j < slides.length; j++) {
        slides[j].style.transform = `translateX(${(j - i) * 100}%)`;
      }
    };
    showSlide(index);
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 5000);
  }

  // CTA particle background (very lightweight)
  const canvas = document.getElementById('ctaCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)'];
    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          d: Math.random() * 0.05 + 0.02,
          c: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        ctx.fillStyle = p.c;
        ctx.fill();
        // move particle upward
        p.y -= p.d;
        if (p.y < 0) p.y = canvas.height;
      });
    };
    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };
    init();
    loop();
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  }
});
