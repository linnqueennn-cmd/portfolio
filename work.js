function webProjects(t) {
  return [
    ['roma', 'Mama Roma', '01 / hr / design & development', t(
      'hr-сайт для сети ресторанов. исследование, проектирование, дизайн и разработка. результат — работающий сайт с высокой конверсией.',
      'Careers site for a restaurant group. Research, planning, design and development. A live site with a high conversion rate.'
    )],
    ['zen', 'ZenSocial', '02 / mobile app / ux/ui design', t(
      'ios-приложение против бездумного скроллинга. разработка логики приложения и ux/ui-дизайн, направленный на формирование осознанных цифровых привычек.',
      'An iOS app for mindful digital habits. Product logic and UX/UI design to help users break out of mindless scrolling.'
    )],
    ['choreo', 'XoreoKids', '03 / dance studio / design & development', t(
      'сайт детской танцевальной студии. от исследования и проектирования структуры до запоминающегося дизайна и разработки.',
      'A website for a children’s dance studio, from research and site architecture to distinctive design and development.'
    )],
    ['vinyl', 'Vinyl Store', '04 / e-commerce / design', t(
      'интернет-магазин виниловых пластинок. акцент на визуальной подаче каталога, удобной навигации и поиске пластинок.',
      'An online record store concept focused on a visual catalogue, clear navigation and easy record discovery.'
    )]
  ];
}

function graphicProjects(t) {
  return [
    {id: 'dixon', name: 'Dixon Dance', meta: '01 / branding / visual identity', href: null, preview: 'assets/cases/dixon/page-01.webp', description: t(
      'айдентика современной онлайн-платформы о танце и движении. логотип, цветовая система, типографика и правила применения.',
      'A visual identity for a modern dance and movement platform: logo, colour system, typography and usage guidelines.'
    )},
    {id: 'getbrand', name: 'Get Brand', meta: '02 / social media / graphic design', href: 'https://www.behance.net/gallery/216916181/dizajn-lenty-dlja-Getbrand', external: true, description: t(
      'концепция и дизайн ленты instagram: визуальная система, композиция публикаций и единый характер коммуникации.',
      'An Instagram feed concept and design: visual system, post composition and a consistent communication style.'
    )},
    {id: 'metro', name: 'Metro Advertising', meta: '03 / advertising / graphic design', href: 'https://www.behance.net/gallery/177874527/maket-reklamy-v-metro', external: true, description: t(
      'акционный баннер в метро для магазина косметики: заметная композиция и понятная подача предложения.',
      'A promotional metro banner for a cosmetics store, with a bold composition and a clear offer.'
    )},
    {id: 'behance', name: 'More on Behance', meta: '04 / graphic design / behance', href: 'https://www.behance.net/linnqueenn', external: true, description: t(
      'больше проектов по графическому дизайну, айдентике и digital-коммуникациям в моём профиле behance.',
      'More graphic design, visual identity and digital communication projects in my Behance profile.'
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
    const marker = item.external ? '<span class="work-external-mark" aria-label="Откроется на Behance">Bē ↗</span>' : '';
    const preview = item.preview || (!item.external ? `assets/work/${item.id}.gif` : '');
    return `<div class="work-slot scroll-window-slot"><a class="work-case scroll-window" href="${href}"${external}>
      <img class="work-bracket work-bracket-left" src="assets/work/left.svg" alt="">
      <div class="work-label"><p>${item.meta}</p><h3><span class="home-scramble" data-scramble>${item.name}</span>${marker}</h3><svg class="work-case-arrow" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26 26 6M6 6h20v20" stroke="currentColor" stroke-width="2"/></svg></div>
      <span class="work-preview"${preview ? ` data-gif="${preview}"` : ''} aria-hidden="true"></span>
      <p class="work-description">${item.description}</p>
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
      <button class="work-tab" type="button" aria-pressed="false" data-work-tab="graphic"><span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span><span class="home-scramble" data-scramble>GRAPHIC DESIGN</span><span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span></button>
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
      if (!preview?.dataset.gif) continue;
      function loadPreview() {
        if (!previews.matches || preview.firstElementChild) return;
        const image = new Image(230, 230);
        image.alt = '';
        image.decoding = 'async';
        image.src = preview.dataset.gif;
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
  }, {threshold: .5});
  enter.observe(tabs);
}
