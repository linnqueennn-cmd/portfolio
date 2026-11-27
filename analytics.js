(() => {
  if (location.hostname !== 'linnqueenn.github.io') return;

  const counter = 114711155;
  window.ym = window.ym || function () {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = Date.now();

  function track(goal, parameters) {
    window.ym(counter, 'params', parameters);
    window.ym(counter, 'reachGoal', goal);
  }

  window.ym(counter, 'init', {
    clickmap: false,
    trackLinks: false,
    webvisor: false,
    disableYtm: true
  });

  const script = document.createElement('script');
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  script.async = true;
  document.head.append(script);

  if (!document.body.classList.contains('home-page')) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        track('portfolio_section', {portfolio_section: entry.target.id});
      }
    }, {rootMargin: '-25% 0px -25% 0px'});
    for (const id of ['work', 'about', 'services', 'process', 'pricing', 'contacts']) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  }

  const like = document.querySelector('.sims-like');
  const likeKey = 'portfolio-sims-like-counted';
  let counted = false;
  like?.addEventListener('click', () => {
    // The site's own click handler changes aria-pressed before this runs.
    if (counted || like.getAttribute('aria-pressed') !== 'true') return;
    counted = true;
    try {
      if (sessionStorage.getItem(likeKey)) return;
      sessionStorage.setItem(likeKey, '1');
    } catch {
      // Keep the in-page guard when storage is unavailable.
    }
    track('sims_like', {portfolio_action: 'sims_like'});
  });
})();
