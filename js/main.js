/* EnglishNest — main.js (SPA) */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Core navigate function ── */
  function navigate(pageId, scrollTarget) {
    const currentActive = document.querySelector('.page.active');
    const currentId = currentActive ? currentActive.id.replace('page-', '') : null;

    if (currentId !== pageId) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const page = document.getElementById('page-' + pageId);
      if (page) page.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });

      /* Reset quiz when navigating to it */
      if (pageId === 'quiz' && typeof window.resetQuiz === 'function') window.resetQuiz();

      /* Re-run scroll-reveal for newly shown page */
      initReveal();
    }

    /* Update active nav link */
    document.querySelectorAll('.nav-links a[data-page], .nav-mobile a[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId && !link.dataset.scroll);
    });

    /* Scroll to section if requested */
    if (scrollTarget) {
      requestAnimationFrame(() => {
        const target = document.getElementById(scrollTarget);
        if (target) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
          window.scrollTo({ top: target.offsetTop - navH - 20, behavior: 'smooth' });
        }
      });
    }
  }

  /* Expose globally so inline handlers can use it */
  window.navigate = navigate;

  /* ── Click delegation for all data-page links ── */
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (!link) return;
    e.preventDefault();
    const pageId    = link.dataset.page;
    const scrollTarget = link.dataset.scroll || null;
    navigate(pageId, scrollTarget);
    hamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
  });

  /* ── Hamburger menu ── */
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
  }

  /* ── Scroll-reveal animation ── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const revealEls = document.querySelectorAll(
      '.page.active .step-card, .page.active .track-card, .page.active .teacher-card, ' +
      '.page.active .pricing-card, .page.active .testimonial-card, .page.active .roadmap-stage, ' +
      '.page.active .level-card, .page.active .teacher-review-card'
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      if (el.style.opacity === '1') return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      observer.observe(el);
    });
  }
  initReveal();

  /* ── Track tab navigation (tracks page) ── */
  document.querySelectorAll('.track-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const trackNavH = document.querySelector('.track-nav')?.offsetHeight || 0;
        window.scrollTo({ top: targetSection.offsetTop - navH - trackNavH - 10, behavior: 'smooth' });
      }
    });
  });

  /* Highlight active track tab on scroll */
  const trackSections = ['general', 'business', 'conversational'].map(id => document.getElementById(id)).filter(Boolean);
  const trackNavBtns  = document.querySelectorAll('.track-nav-btn');
  if (trackSections.length) {
    const updateActiveTab = () => {
      if (!document.getElementById('page-tracks')?.classList.contains('active')) return;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const scroll = window.scrollY + navH + 80;
      let active = trackSections[0];
      trackSections.forEach(s => { if (s.offsetTop <= scroll) active = s; });
      trackNavBtns.forEach(btn => {
        btn.classList.remove('active-teal', 'active-amber', 'active-blue');
        if (btn.dataset.target === active.id) {
          if (active.id === 'general')        btn.classList.add('active-teal');
          if (active.id === 'business')       btn.classList.add('active-amber');
          if (active.id === 'conversational') btn.classList.add('active-blue');
        }
      });
    };
    window.addEventListener('scroll', updateActiveTab, { passive: true });
  }

});
