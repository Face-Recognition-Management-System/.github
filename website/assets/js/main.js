// =============================================================
// FRM System site — interactions
// =============================================================
(() => {
  // ---- Mark current nav link
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-page]').forEach((a) => {
    if (a.dataset.page === here) a.setAttribute('aria-current', 'page');
  });

  // ---- Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Number count-up on the hero stats
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const animateNumber = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const start = performance.now();
    const dur = 1400;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(easeOut(t) * target);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ---- Intersection observer for reveals + counters
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      if (el.matches('[data-count]')) animateNumber(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, [data-count]').forEach((el) => io.observe(el));

  // ---- Subtle parallax on hero visual
  const visual = document.querySelector('.hero__visual');
  if (visual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });
  }
})();
