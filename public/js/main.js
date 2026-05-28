/* ============================================
   ALLEYCATS SOCCER CLUB — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  const hero   = document.querySelector('.hero');
  const scrollThreshold = hero ? hero.offsetHeight * 0.55 : 80;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > scrollThreshold);
  }, { passive: true });

  // ── Hamburger menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Mobile accordion dropdowns ──
  mobileNav?.querySelectorAll('.mobile-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.mobile-group');
      const isOpen = group.classList.contains('open');
      // close all others
      mobileNav.querySelectorAll('.mobile-group.open').forEach(g => g.classList.remove('open'));
      if (!isOpen) group.classList.add('open');
    });
  });

  // ── Fade-up on scroll ──
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));

  // ── Animated stat counters ──
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statsObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ── Active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(a => a.classList.remove('active'));
        document.querySelector(`.nav-links a[href="#${section.id}"]`)?.classList.add('active');
      }
    });
  }, { passive: true });

  // ── Testimonial Slider ──
  (function () {
    const slider   = document.querySelector('.ts-slider');
    if (!slider) return;

    const slides   = slider.querySelectorAll('.ts-slide');
    const dots     = slider.querySelectorAll('.ts-dot');
    const prevBtn  = slider.querySelector('.ts-prev');
    const nextBtn  = slider.querySelector('.ts-next');
    let current    = 0;
    let autoTimer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      // Toggle dark-dots attr for gray slide
      if (slides[current].classList.contains('ts-slide--dark')) {
        slider.setAttribute('data-dark-dots', '');
      } else {
        slider.removeAttribute('data-dark-dots');
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() { autoTimer = setInterval(next, 6000); }
    function stopAuto()  { clearInterval(autoTimer); }

    nextBtn?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
    prevBtn?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        goTo(+dot.dataset.slide);
        startAuto();
      });
    });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Initialise
    goTo(0);
    startAuto();
  })();

  // ── News card hover tilt ──
  document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      card.style.transition = 'transform .1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .3s ease';
    });
  });

});
