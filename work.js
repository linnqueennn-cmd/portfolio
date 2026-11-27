function webProjects(t) {
  return [
    ['roma', 'Mama Roma', 'hr / design & development', t(
      'hr-сайт для сети ресторанов. исследование, проектирование, дизайн и разработка. после редизайна — 937 заявок за год.',
      'A careers site for a restaurant group. I led the research, planning, design and build. The site received 937 applications in a year after the redesign.'
    )],
    ['zen', 'ZenSocial', 'mobile app / ux/ui design', t(
      'ios-приложение против бездумного скроллинга. разработка логики приложения и ux/ui-дизайн, направленный на формирование осознанных цифровых привычек.',
      'An iOS app that helps people scroll less without losing access to the parts of Instagram they use. I designed the product flows and interface.'
    )],
    ['choreo', 'XoreoKids', 'dance studio / design & development', t(
      'сайт детской танцевальной студии. от исследования и проектирования структуры до запоминающегося дизайна и разработки.',
      'A website for a children’s dance studio. I researched, planned, designed and built the site.'
    )],
    ['vinyl', 'Vinyl Store', 'e-commerce / design', t(
      'интернет-магазин виниловых пластинок. акцент на визуальной подаче каталога, удобной навигации и поиске пластинок.',
      'An online record shop with a visually led catalogue, clear navigation and an easy way to find records.'
    )]
  ];
}

function graphicProjects(t) {
  return [
    {id: 'dixon', name: 'Dixon Dance', meta: 'branding / visual identity', href: null, preview: 'assets/work/dixon.gif', description: t(
      'айдентика танцевальной онлайн-платформы: логотип, цветовая палитра, типографика и фирменная графика.',
      'A visual identity for a modern dance and movement platform: logo, colour system, typography and usage guidelines.'
    )},
    {id: 'getbrand', name: 'Getbrand', meta: 'social media / graphic design', href: 'https://www.behance.net/gallery/216916181/dizajn-lenty-dlja-Getbrand', external: true, preview: 'assets/work/getbrand.webp', description: t(
      'визуальная концепция instagram-ленты: оформление публикаций, композиция и единый стиль контента.',
      'An Instagram feed concept and design: visual system, post composition and a consistent communication style.'
    )},
    {id: 'metro', name: 'Metro Advertising', meta: 'advertising / graphic design', href: 'https://www.behance.net/gallery/177874527/maket-reklamy-v-metro', external: true, preview: 'assets/work/metro.gif', description: t(
      'рекламный макет для магазина косметики: акцент на предложении, контрастная композиция и читаемость.',
      'A promotional metro banner for a cosmetics store, with a bold composition and a clear offer.'
    )},
    {id: 'behance', name: 'BEHANCE', meta: '', href: 'https://www.behance.net/linnqueenn', external: true, special: true, description: t(
      'больше проектов можно посмотреть на BEHANCE.',
      'More projects are available on BEHANCE.'
    )}
  ];
}

function workProjectsMarkup(projects, caseUrl) {
  return projects.map(project => {
    const item = Array.isArray(project)
      ? {id: project[0], name: project[1], meta: project[2], description: project[3]}
      : project;
    const href = item.href || caseUrl(item.id);
    const external = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    const preview = item.preview || (!item.external ? `assets/work/${item.id}.${item.id === 'roma' ? 'webp' : 'gif'}` : '');
    return `<div class="work-slot scroll-window-slot" data-project="${item.id}"><a class="work-case scroll-window${item.special ? ' work-case-more' : ''}" href="${href}"${external}>
      <img class="work-bracket work-bracket-left" src="assets/work/left.svg" alt="">
      <div class="work-label">${item.meta ? `<p>${joinRussianShortWords(item.meta)}</p>` : ''}<h3><span class="home-scramble" data-scramble>${item.name}</span></h3><svg class="work-case-arrow" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26 26 6M6 6h20v20" stroke="currentColor" stroke-width="2"/></svg>${item.special ? '<img class="work-behance-icon" src="assets/work/behance.png" width="512" height="512" loading="lazy" decoding="async" alt="">' : ''}</div>
      <span class="work-preview"${preview ? ` data-preview="${preview}"` : ''} aria-hidden="true"></span>
      <p class="work-description">${joinRussianShortWords(item.description)}</p>
      <img class="work-bracket work-bracket-right" src="assets/work/right.svg" alt="">
    </a></div>`;
  }).join('');
}

function projectsScreen(t, caseUrl) {
  return `<section id="work" class="work-screen" aria-label="${t('Кейсы','Selected work')}">
    <div class="work-tabs">
      <button type="button" class="work-tab work-tab-active" aria-pressed="true" data-work-tab="web">
        <span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span><span class="home-scramble" data-scramble>WEB &amp; UX/UI</span><span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span>
        <span class="work-gem" aria-hidden="true"></span>
      </button>
      <button class="work-tab" type="button" aria-pressed="false" data-work-tab="graphic"><span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span><span class="home-scramble" data-scramble>GRAPHIC</span><span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span></button>
    </div>
    <div class="work-list">${workProjectsMarkup(webProjects(t), caseUrl)}</div>
  </section>`;
}

function setupProjectsScreen(t, caseUrl) {
  const screen = document.querySelector('.work-screen');
  const tabs = screen.querySelector('.work-tabs');
  const jobs = createScrambleJobs(tabs);
  const buttons = [...tabs.querySelectorAll('button')];
  const gem = tabs.querySelector('.work-gem');
  const list = screen.querySelector('.work-list');
  function setupPreviews() {
    const previews = matchMedia('(min-width: 960px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    for (const row of screen.querySelectorAll('.work-case')) {
      const preview = row.querySelector('.work-preview');
      if (!preview?.dataset.preview) continue;
      function loadPreview() {
        if (!previews.matches || preview.firstElementChild) return;
        const image = new Image(230, 230);
        image.alt = '';
        image.decoding = 'async';
        image.src = preview.dataset.preview;
        preview.append(image);
      }
      row.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') loadPreview(); });
      row.addEventListener('focus', () => { if (row.matches(':focus-visible')) loadPreview(); });
    }
  }
  function select(button, updateUrl = false) {
    buttons.forEach(tab => {
      if (tab !== button) tab.classList.remove('home-cta-closing');
      tab.classList.toggle('work-tab-active', tab === button);
      tab.setAttribute('aria-pressed', tab === button);
    });
    button.append(gem);
    const graphic = button.dataset.workTab === 'graphic';
    list.innerHTML = workProjectsMarkup(graphic ? graphicProjects(t) : webProjects(t), caseUrl);
    setupScrollWindows(list);
    setupPreviews();
    if (updateUrl) {
      const url = new URL(location.href);
      if (graphic) url.searchParams.set('work', 'graphic'); else url.searchParams.delete('work');
      history.replaceState(null, '', url);
    }
  }
  if (new URLSearchParams(location.search).get('work') === 'graphic') select(buttons[1]);
  else { setupScrollWindows(list); setupPreviews(); }
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    select(button, true);
    jobs[i]?.();
  }));
  const enter = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    jobs.forEach((play, i) => play(i * 70));
    enter.unobserve(tabs);
  }, {threshold: .5});
  enter.observe(tabs);
}
