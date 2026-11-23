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

function projectsScreen(t, caseUrl) {
  return `<section id="work" class="work-screen" aria-label="${t('Кейсы','Selected work')}">
    <div class="work-tabs">
      <button type="button" class="work-tab work-tab-active" aria-pressed="true" data-work-tab="web">
        <span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span><span class="home-scramble" data-scramble>WEB &amp; UX/UI</span><span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span>
        <span class="work-gem" aria-hidden="true"><img src="assets/home/gem.png" alt=""></span>
      </button>
      <button class="work-tab" type="button" aria-pressed="false" data-work-tab="graphic"><span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span><span class="home-scramble" data-scramble>GRAPHI</span><span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span></button>
    </div>
    <div class="work-list">${webProjects(t).map(([id, name, meta, description]) => `
      <div class="work-slot scroll-window-slot"><a class="work-case scroll-window" href="${caseUrl(id)}">
        <img class="work-bracket work-bracket-left" src="assets/work/left.svg" alt="">
        <div class="work-label"><p>${meta}</p><h3><span class="home-scramble" data-scramble>${name}</span></h3><svg class="work-case-arrow" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26 26 6M6 6h20v20" stroke="currentColor" stroke-width="2"/></svg></div>
        <span class="work-preview" data-gif="assets/work/${id}.gif" aria-hidden="true"></span>
        <p class="work-description">${description}</p>
        <img class="work-bracket work-bracket-right" src="assets/work/right.svg" alt="">
      </a></div>`).join('')}</div>
  </section>`;
}

function setupProjectsScreen() {
  const screen = document.querySelector('.work-screen');
  const tabs = screen.querySelector('.work-tabs');
  const jobs = createScrambleJobs(tabs);
  const buttons = [...tabs.querySelectorAll('button')];
  const gem = tabs.querySelector('.work-gem');
  function select(button) {
    buttons.forEach(tab => {
      tab.classList.remove('home-cta-closing');
      tab.classList.toggle('work-tab-active', tab === button);
      tab.setAttribute('aria-pressed', tab === button);
    });
    button.append(gem);
  }
  if (new URLSearchParams(location.search).get('work') === 'graphic') select(buttons[1]);
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    select(button);
    jobs[i]?.();
  }));
  const enter = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    jobs.forEach((play, i) => play(i * 70));
  }, {threshold: .5});
  enter.observe(tabs);
  setupScrollWindows(screen.querySelector('.work-list'));

  const previews = matchMedia('(min-width: 960px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  for (const row of screen.querySelectorAll('.work-case')) {
    const preview = row.querySelector('.work-preview');
    function loadPreview() {
      if (!previews.matches || preview.firstElementChild) return;
      const image = new Image(230, 230);
      image.alt = '';
      image.decoding = 'async';
      image.src = preview.dataset.gif;
      preview.append(image);
    }
    row.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') loadPreview();
    });
    row.addEventListener('focus', () => {
      if (row.matches(':focus-visible')) loadPreview();
    });
  }
}
