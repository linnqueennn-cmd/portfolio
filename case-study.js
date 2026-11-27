// Shared presentation for the web / UX case studies. Content stays separate.
function caseStudyPage(data) {
  const scramble = text => `<span class="home-scramble" data-scramble>${text}</span>`;
  const nbsp = joinRussianShortWords;
  const inline = text => {
    const formatted = nbsp(text);
    if (formatted.startsWith('**')) return formatted.replace(/^\*\*(.+?)\*\*/, '<strong>$1</strong>');
    return text.startsWith('Моя роль:') ? `<strong>${formatted}</strong>` : formatted;
  };
  const paragraphs = texts => texts.map(text => `<p>${inline(text)}</p>`).join('');
  const picture = (name, alt, label = '', className = '') => {
    const format = data.imageFormats?.[name] || data.imageFormat || 'png';
    const src = `assets/cases/${data.id}/${name}.${format}`;
    const [width, height] = data.imageSizes[name];
    const previewWidth = data.imagePreviews?.[name];
    const sizes = data.imagePreviewSizes?.[name] || '(max-width: 600px) calc(100vw - 32px), (max-width: 1348px) calc(100vw - 72px), 1276px';
    const preview = previewWidth
      ? ` srcset="assets/cases/${data.id}/${name}-preview.webp ${previewWidth}w, ${src} ${width}w" sizes="${sizes}"`
      : '';
    const img = `<img src="${src}"${preview} alt="${alt}" width="${width}" height="${height}" loading="${className === 'case-cover' ? 'eager' : 'lazy'}" fetchpriority="${className === 'case-cover' ? 'high' : 'low'}" decoding="async">`;
    return `<figure class="case-picture ${className}" data-media="${name}">${label ? `<figcaption>${nbsp(label)}</figcaption>` : ''}${data.zoom ? `<a href="${src}" target="_blank" rel="noopener" aria-label="${t("Открыть изображение в полном размере: ", "Open full-size image: ")}${alt}">${img}</a>` : img}</figure>`;
  };
  const compare = (items, className = '') => `<div class="case-comparison${items.some(item => item[0] === '13_old_form') ? ' case-comparison-form' : ''}${className ? ` ${className}` : ''}">${items.map(item => picture(...item)).join('')}</div>`;
  const visualSteps = ({id, steps}) => `<div class="case-visual-steps" id="${id}">
    <div class="case-visual-versions" role="group" aria-label="${t("Версия экранов", "Screen version")}">
      <label><input type="radio" name="${id}-view" value="phone" checked>${t("Телефон", "Mobile")}</label>
      <label><input type="radio" name="${id}-view" value="desktop">${t("Десктоп", "Desktop")}</label>
    </div>
    <ol class="case-visual-step-list" role="list">${steps.map(([title, desktop, phone]) => `<li>
      <h4>${nbsp(title)}</h4>
      <div class="case-visual-step-pair">
        ${picture(...desktop, '', 'case-visual-desktop')}
        ${picture(...phone, '', 'case-visual-phone')}
      </div>
    </li>`).join('')}</ol>
  </div>`;
  const visual = ([name, alt, label, device]) => {
    const size = data.videoSizes?.[name];
    if (!size) return picture(name, alt, label);
    const src = `assets/cases/${data.id}/${name}`;
    const poster = `assets/cases/${data.id}/${data.videoPosters?.[name] || name}.webp`;
    const video = `<video loop playsinline muted preload="none" width="${size[0]}" height="${size[1]}"
        data-case-poster="${poster}" aria-label="${alt}"><source src="${src}.mp4" type="video/mp4">
        <a href="${src}.mp4">${t("Открыть видео", "Open video")}</a>
      </video>`;
    const frame = data.deviceFrames?.[device];
    return `<figure class="case-inline-video">${label ? `<figcaption>${nbsp(label)}</figcaption>` : ''}
      ${frame ? `<div class="case-device case-device-${device}">${video}<img
        src="assets/cases/${data.id}/${device}-frame.webp" width="${frame[0]}" height="${frame[1]}"
        loading="${label ? 'lazy' : 'eager'}" decoding="async" alt=""></div>` : video}</figure>`;
  };
  const imageRails = ({id, rows}) => `<div class="case-image-rails" id="${id}">
    ${rows.map(([device, label, images, scrollable = true]) => `<div class="case-image-rail-row" data-rail-row="${device}">
      <div class="case-image-rail-header">
        <h4 id="${id}-${device}">${nbsp(label)}</h4>
        ${scrollable ? `<div class="case-image-rail-nav" role="group" aria-label="${t("Листать экраны: ", "Browse screens: ")}${label}">
          <button type="button" data-rail-step="-1" aria-label="${t("Предыдущий экран", "Previous screen")}" aria-controls="${id}-${device}-track" disabled>←</button>
          <button type="button" data-rail-step="1" aria-label="${t("Следующий экран", "Next screen")}" aria-controls="${id}-${device}-track">→</button>
        </div>` : ''}
      </div>
      <div class="${scrollable ? 'case-image-rail' : 'case-image-grid'}" id="${id}-${device}-track" data-rail-device="${device}"
        role="region"${scrollable ? ' tabindex="0"' : ''} aria-labelledby="${id}-${device}">
        ${images.map(item => picture(...item)).join('')}
      </div>
    </div>`).join('')}
  </div>`;
  return `<article class="case-study" data-case="${data.id}" aria-labelledby="case-title">
    <div class="case-content">
    <section class="case-introduction">
      <a class="case-back" href="${workIndexUrl(data.id)}">← ${t("Все проекты", "All projects")}</a>
      ${data.eyebrow ? `<p class="case-eyebrow">${nbsp(data.eyebrow)}</p>` : ''}
      <h1 id="case-title">${scramble(data.title)}</h1>
      ${data.subtitle ? `<p class="case-subtitle">${scramble(nbsp(data.subtitle))}</p>` : ''}
      ${data.summary ? `<p class="case-summary">${nbsp(data.summary)}</p>` : ''}
      ${data.metrics?.length ? `<dl class="case-metrics">${data.metrics.map(([number, label]) => `<div><dt>${scramble(number)}</dt><dd>${nbsp(label)}</dd></div>`).join('')}</dl>` : ''}
      ${data.cover ? picture(data.cover, data.coverAlt || t("Обложка проекта", "Project cover"), '', 'case-cover') : ''}
      ${data.coverDevices ? `<div class="case-device-cover">${data.coverDevices.map(visual).join('')}</div>` : ''}
      ${data.url ? `<a class="case-live" href="${data.url}" target="_blank" rel="noopener noreferrer">${nbsp(data.urlLabel || t("Смотреть сайт: rabota.mamaroma.ru ↗", "Visit the site: rabota.mamaroma.ru ↗"))}</a>` : ''}
    </section>
    ${data.sections.map((section, index) => `<section class="case-chapter" aria-labelledby="case-chapter-${index}">
      <h2 id="case-chapter-${index}">${String(index + 1).padStart(2, '0')} / ${nbsp(section.title)}</h2>
      ${section.blocks.map(block => {
        const copy = `${block.title ? `<h3>${nbsp(block.title)}</h3>` : ''}${paragraphs(block.text || [])}`;
        return `<div class="case-block${block.kind === 'showcase' ? ' case-showcase' : ''}${block.sideMedia ? ' case-block-side-media' : ''}">
        ${block.sideMedia ? `<div class="case-block-copy">${copy}</div>` : copy}
        ${block.note ? `<p class="case-visual-note"><em>${nbsp(block.note)}</em></p>` : ''}
        ${block.list ? `<ul class="case-list">${block.list.map(item => `<li>${nbsp(item)}</li>`).join('')}</ul>` : ''}
        ${block.compare ? compare(block.compare, block.compareClass) : ''}
        ${block.image ? picture(block.image[0], block.image[1], '', block.wide ? 'case-wide' : '') : ''}
        ${block.images ? `<div class="case-gallery">${block.images.map(item => picture(...item)).join('')}</div>` : ''}
        ${block.visualSteps ? visualSteps(block.visualSteps) : ''}
        ${block.palette ? `<ul class="case-palette" aria-label="${t("Палитра проекта", "Project palette")}">${block.palette.map(([hex, label]) => `<li><span style="--swatch:${hex}" aria-hidden="true"></span>${label} · ${hex}</li>`).join('')}</ul>` : ''}
        ${block.visuals ? `<div class="case-media-group ${block.visualLayout || ''}">${block.visuals.map(visual).join('')}</div>` : ''}
        ${block.imageRails ? imageRails(block.imageRails) : ''}
        ${block.kind === 'showcase' ? `<div class="case-interface">${picture('09_final', t("Финальные экраны сайта Mama Roma на компьютере и телефонах", "Final Mama Roma screens on desktop and mobile"))}<figure class="case-video"><video loop playsinline muted preload="none" width="3840" height="2034" poster="assets/cases/${data.id}/10_mobile.jpg" aria-label="${t("Демонстрация мобильной версии сайта Mama Roma", "Walkthrough of the Mama Roma mobile site")}"><source src="assets/cases/${data.id}/10_mobile.mp4" type="video/mp4">${t("Ваш браузер не поддерживает видео.", "Your browser does not support this video.")} <a href="assets/cases/${data.id}/10_mobile.mp4">${t("Открыть видео", "Open video")}</a></video></figure></div>` : ''}
      </div>`; }).join('')}
    </section>`).join('')}
    <nav class="case-next" aria-label="${t("Другие кейсы", "More case studies")}"><h2>${t("Следующий кейс", "Next case study")}</h2><a href="${caseUrl(data.next.id)}" class="case-next-link"><span class="case-next-arrow" aria-hidden="true">→</span><span>${data.next.title}</span></a><a href="${workIndexUrl(data.id)}">← ${t("Все проекты", "All projects")}</a></nav>
    </div>
  </article>`;
}

function casePageHeader(t, cv) {
  const scramble = text => `<span class="home-scramble" data-scramble>${text}</span>`;
  const items = [['work', t('кейсы', 'work')], ['about', t('опыт', 'about')], ['services', t('услуги', 'services')], ['pricing', t('цены', 'rates')], ['contacts', t('контакты', 'contact')]];
  return `<div class="case-header-slot"><header class="case-header home-nav">
    <a class="case-header-brand" href="${home}">[linqueenn]</a>
    <button type="button" class="home-menu-toggle" aria-controls="case-menu" aria-expanded="false" aria-label="${t('Меню', 'Menu')}"><img src="assets/home/mobile-menu.svg" alt=""></button>
    <div class="home-menu" id="case-menu"><a class="home-menu-handle" href="${home}">[linqueenn]</a>
    <nav aria-label="${t('Навигация', 'Navigation')}">${items.map(([id, label]) => `<a href="${home}#${id}">${scramble('[' + label + ']')}</a>`).join('')}</nav>
    <a class="home-menu-resume" href="${cv}" download><span>${t('скачать резюме', 'download résumé')}</span><img src="assets/home/download.svg" alt=""></a>
    <button id="case-language" type="button" aria-label="${t('English version', 'Русская версия')}">${scramble(t('[en]', '[ru]'))}</button></div>
    ${cvControls(t, cv, 'case-header-cv')}
  </header></div>`;
}

function setupCasePage() {
  document.body.classList.add('case-page');
  document.querySelector('body > .header')?.remove();
  app.insertAdjacentHTML('afterbegin', casePageHeader(t, cv));
  document.querySelector('#case-language').onclick = language.onclick;
  setupPortfolioMenu(document.querySelector('.case-header'), document.querySelector('.case-header-slot'));
  const jobs = createScrambleJobs(document.querySelector('.case-introduction') || app);
  document.fonts.ready.then(() => jobs.forEach((play, index) => play(index * 70)));
  app.querySelectorAll('.case-image-rail-row:has(.case-image-rail)').forEach(setupCaseImageRail);
  const videosWithPosters = app.querySelectorAll('video[data-case-poster]');
  if (videosWithPosters.length) {
    const showPoster = video => { video.poster = video.dataset.casePoster; };
    if ('IntersectionObserver' in window) {
      const posterObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          showPoster(entry.target);
          posterObserver.unobserve(entry.target);
        }
      }, {rootMargin: '400px 0px'});
      videosWithPosters.forEach(video => posterObserver.observe(video));
    } else {
      videosWithPosters.forEach(showPoster);
    }
  }
  const videos = [...app.querySelectorAll('.case-study video')];
  if (videos.length) {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set();
    const sync = () => videos.forEach(video => {
      if (visible.has(video) && !motion.matches && !document.hidden) video.play().catch(() => {});
      else video.pause();
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => isIntersecting ? visible.add(target) : visible.delete(target));
      sync();
    }, {threshold: .12});
    videos.forEach(video => observer.observe(video));
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
  }
}

function setupCaseImageRail(row) {
  const rail = row.querySelector('.case-image-rail');
  const [previous, next] = row.querySelectorAll('[data-rail-step]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const end = () => rail.scrollWidth - rail.clientWidth;
  const sync = () => {
    previous.disabled = rail.scrollLeft <= 1;
    next.disabled = rail.scrollLeft >= end() - 1;
  };
  for (const button of [previous, next]) {
    button.addEventListener('click', () => {
      const start = rail.firstElementChild.offsetLeft;
      const stops = Array.from(rail.children, card => Math.min(card.offsetLeft - start, end()));
      const left = button === next
        ? stops.find(stop => stop > rail.scrollLeft + 1)
        : stops.findLast(stop => stop < rail.scrollLeft - 1);
      if (left !== undefined) rail.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    });
  }
  rail.addEventListener('scroll', sync, {passive: true});
  new ResizeObserver(sync).observe(rail);
  sync();
}

function setupBackToTop() {
  const contacts = app.querySelector('#contacts');
  const likeNote = contacts?.querySelector('.remaining-footer');
  const position = likeNote ? 'beforebegin' : 'beforeend';
  (likeNote || contacts || app).insertAdjacentHTML(position, `<div class="page-top-row"><button class="back-to-top" type="button" aria-label="${t('Наверх', 'Back to top')}"><svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true"><path d="M14 30V3M3 14 14 3l11 11" stroke="currentColor" stroke-width="2"/></svg></button></div>`);
  document.querySelector('.back-to-top').onclick = () => window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
