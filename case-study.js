// Shared presentation for the web / UX case studies. Content stays separate.
function caseStudyPage(data) {
  const scramble = text => `<span class="home-scramble" data-scramble>${text}</span>`;
  const nbsp = text => text.replace(/(^|\s)([авикосу]|до|из|на|от|по|за|об|не|со|для|без)(?= ) /gi, '$1$2 ');
  const paragraphs = texts => texts.map(text => `<p>${text.startsWith('Моя роль:') ? `<strong>${nbsp(text)}</strong>` : nbsp(text)}</p>`).join('');
  const picture = (name, alt, label = '', className = '') => `<figure class="case-picture ${className}" data-media="${name}">${label ? `<figcaption>${label}</figcaption>` : ''}<img src="assets/cases/${data.id}/${name}.${data.imageFormat || 'png'}" alt="${alt}" width="${data.imageSizes[name][0]}" height="${data.imageSizes[name][1]}" loading="${className === 'case-cover' ? 'eager' : 'lazy'}" fetchpriority="${className === 'case-cover' ? 'high' : 'low'}" decoding="async"></figure>`;
  const compare = items => `<div class="case-comparison${items.some(item => item[0] === '13_old_form') ? ' case-comparison-form' : ''}">${items.map(item => picture(...item)).join('')}</div>`;
  return `<article class="case-study" aria-labelledby="case-title">
    <div class="case-content">
    <section class="case-introduction">
      <a class="case-back" href="./#work">← Все проекты</a>
      <h1 id="case-title">${scramble(data.title)}</h1>
      <p class="case-subtitle">${scramble(nbsp(data.subtitle))}</p>
      <p class="case-summary">${nbsp(data.summary)}</p>
      <dl class="case-metrics">${data.metrics.map(([number, label]) => `<div><dt>${scramble(number)}</dt><dd>${nbsp(label)}</dd></div>`).join('')}</dl>
      ${picture(data.cover, 'Карьерный сайт Mama Roma на экране ноутбука', '', 'case-cover')}
      <a class="case-live" href="${data.url}" target="_blank" rel="noopener noreferrer">Смотреть сайт: rabota.mamaroma.ru ↗</a>
    </section>
    ${data.sections.map((section, index) => `<section class="case-chapter" aria-labelledby="case-chapter-${index}">
      <h2 id="case-chapter-${index}">${String(index + 1).padStart(2, '0')} / ${section.title}</h2>
      ${section.blocks.map(block => `<div class="case-block${block.kind === 'showcase' ? ' case-showcase' : ''}">
        ${block.title ? `<h3>${nbsp(block.title)}</h3>` : ''}
        ${paragraphs(block.text || [])}
        ${block.compare ? compare(block.compare) : ''}
        ${block.image ? picture(block.image[0], block.image[1], '', block.wide ? 'case-wide' : '') : ''}
        ${block.kind === 'showcase' ? `<div class="case-interface">${picture('09_final', 'Финальные экраны сайта Mama Roma на компьютере и телефонах')}<figure class="case-video"><video autoplay loop playsinline muted preload="metadata" width="3840" height="2034" poster="assets/cases/${data.id}/10_mobile.jpg" aria-label="Демонстрация мобильной версии сайта Mama Roma"><source src="assets/cases/${data.id}/10_mobile.mp4" type="video/mp4">Ваш браузер не поддерживает видео. <a href="assets/cases/${data.id}/10_mobile.mp4">Открыть видео</a></video></figure></div>` : ''}
      </div>`).join('')}
    </section>`).join('')}
    <nav class="case-next" aria-label="Другие кейсы"><h2>Следующий кейс</h2><a href="./?case=${data.next.id}" class="case-next-link">${data.next.title} →</a><a href="./#work">← Все проекты</a></nav>
    </div>
  </article>`;
}

function casePageHeader(t) {
  const scramble = text => `<span class="home-scramble" data-scramble>${text}</span>`;
  const items = [['work', t('кейсы', 'work')], ['about', t('опыт', 'about')], ['services', t('услуги', 'services')], ['pricing', t('цены', 'rates')], ['contacts', t('контакты', 'contact')]];
  return `<div class="case-header-slot"><header class="case-header home-nav">
    <a class="case-header-brand" href="./">[linqueenn]</a>
    <button type="button" class="home-menu-toggle" aria-controls="case-menu" aria-expanded="false" aria-label="${t('Меню', 'Menu')}"><img src="assets/home/mobile-menu.svg" alt=""></button>
    <div class="home-menu" id="case-menu"><a class="home-menu-handle" href="./">[linqueenn]</a>
    <nav aria-label="${t('Навигация', 'Navigation')}">${items.map(([id, label]) => `<a href="./#${id}">${scramble('[' + label + ']')}</a>`).join('')}</nav>
    <a class="home-menu-resume" href="assets/cv.pdf" download><span>${t('скачать резюме', 'download résumé')}</span><img src="assets/home/download.svg" alt=""></a>
    <button id="case-language" type="button" aria-label="${t('English version', 'Русская версия')}">${scramble(t('[en]', '[ru]'))}</button></div>
    <a class="case-header-cv" href="assets/cv.pdf" download>CV <img src="assets/home/download.svg" alt=""></a>
  </header></div>`;
}

function setupCasePage() {
  document.body.classList.add('case-page');
  document.querySelector('body > .header')?.remove();
  app.insertAdjacentHTML('afterbegin', casePageHeader(t));
  document.querySelector('#case-language').onclick = language.onclick;
  setupPortfolioMenu(document.querySelector('.case-header'), document.querySelector('.case-header-slot'));
  const jobs = createScrambleJobs(document.querySelector('.case-introduction') || app);
  document.fonts.ready.then(() => jobs.forEach((play, index) => play(index * 70)));
  const video = document.querySelector('.case-video video');
  if (video) {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) { video.autoplay = false; video.pause(); }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
  }
}

function setupBackToTop() {
  app.insertAdjacentHTML('beforeend', `<div class="page-top-row"><button class="back-to-top" type="button" aria-label="${t('Наверх', 'Back to top')}"><svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true"><path d="M14 30V3M3 14 14 3l11 11" stroke="currentColor" stroke-width="2"/></svg></button></div>`);
  document.querySelector('.back-to-top').onclick = () => window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
