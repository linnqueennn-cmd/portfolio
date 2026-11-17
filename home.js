function homeScreen(t, person, cv) {
  const art = 'assets/home/';
  const scramble = text => `<span class="home-scramble" data-scramble>${text}</span>`;
  const items = [
    ['work', t('кейсы', 'work')], ['about', t('опыт', 'about')],
    ['services', t('услуги', 'services')], ['pricing', t('цены', 'rates')],
    ['contacts', t('контакты', 'contact')]
  ];
  return `<section class="home-screen" aria-labelledby="home-title">
    <div class="home-stage">
      <header class="home-nav">
        <button type="button" class="home-menu-toggle" aria-controls="home-menu" aria-expanded="false" aria-label="${t('Меню', 'Menu')}"><img src="${art}mobile-menu.svg" alt=""></button>
        <div class="home-menu" id="home-menu">
        <button type="button" id="home-language" aria-label="${t('English version', 'Русская версия')}">${scramble(t('[en]', '[ru]'))}</button>
        <nav aria-label="${t('Навигация', 'Navigation')}">${items.map(([id, label]) =>
          `<a href="#${id}">${scramble('[' + label + ']')}</a>`).join('')}</nav>
        <a class="home-menu-handle" href="https://t.me/linqueenn">${scramble('@linqueenn')}</a>
        </div>
      </header>
      <h1 class="home-title" id="home-title">
        <span class="home-line home-line-digital">${scramble('Digital design,')}</span>
        <span class="home-line home-line-web">${scramble('Web &amp;')}
          <span class="home-gem-slot" data-crystal-anchor="home" aria-hidden="true"><img src="${art}gem.png" alt=""></span>
        </span>
        <span class="home-line home-line-visual">${scramble('Visual')} ${scramble('systems')}</span>
      </h1>
      <div class="home-portrait home-portrait-pending">
        <img class="home-shadow-left" src="${art}left-shadow.svg" alt="">
        <img class="home-shadow-right" src="${art}right-shadow.svg" alt="">
        <img class="home-person" src="${art}portrait.png" alt="${person}">
      </div>
      <div class="home-profile">
        <a href="https://t.me/linqueenn">${scramble('@linqueenn')}</a>
        <p><img src="${art}status.svg" alt="">${t('открыта к проектам', 'open for projects')}</p>
      </div>
      <a class="home-cv" href="${cv}" download>${scramble('CV')}<img src="${art}download.svg" alt=""></a>
      <div class="home-resume-note"><span>${t('моё резюме тут', 'my résumé is here')}</span><img src="${art}resume.svg" alt=""></div>
      <a class="home-cta" href="#contacts">${scramble(t('[Обсудить проект]', '[Discuss a project]'))}</a>
      <div class="home-intro">
        <h2>${scramble(t('привет, я Лина', 'hi, I’m Lina'))}</h2>
        <p>${t('создаю сайты, цифровые интерфейсы и&nbsp;визуальные решения для&nbsp;брендов.', 'I design websites, digital interfaces and visual systems for brands.')}</p>
        <div class="home-philosophy">
          <span>${t('обожаю дизайн и&nbsp;приносить людям деньги', 'I love design and helping people make money')}</span>
        </div>
      </div>
    </div>
  </section>`;
}

function setupPortraitArrival(startText) {
  const portrait = document.querySelector('.home-portrait');
  const image = portrait.querySelector('.home-person');
  const mode = new URLSearchParams(location.search).get('portrait');
  const useNewArrival = !mode || mode === '6221';
  if (useNewArrival) portrait.classList.add('home-portrait-6221');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let stopVideo = () => {};
  const showPortrait = () => {
    startText();
    stopVideo();
    portrait.classList.remove('home-portrait-pending', 'home-portrait-materializing',
      'home-portrait-playing', 'home-portrait-blending');
    reduced.removeEventListener('change', onMotionChange);
  };
  const onMotionChange = () => { if (reduced.matches) showPortrait(); };
  if (reduced.matches) return showPortrait();
  reduced.addEventListener('change', onMotionChange);
  image.decode().then(() => {
    if (!portrait.classList.contains('home-portrait-pending')) return;
    const classic = () => {
      startText();
      stopVideo();
      portrait.classList.remove('home-portrait-playing', 'home-portrait-blending', 'home-portrait-video-mode');
      portrait.addEventListener('animationend', event => {
        if (event.target === portrait && event.animationName === 'home-portrait-load') showPortrait();
      });
      portrait.classList.replace('home-portrait-pending', 'home-portrait-materializing');
    };
    if (useNewArrival) stopVideo = playPortraitArrival(portrait, image, showPortrait, startText);
    else if (mode === 'classic') classic();
    else stopVideo = playPortraitVideo(portrait, showPortrait, classic, mode, startText);
  }, showPortrait);
}

function playPortraitArrival(portrait, image, finish, startText) {
  const video = document.createElement('video');
  video.className = 'home-portrait-arrival';
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  let stopped = false;
  let frame;
  let shineIn;
  let shine;
  let entryOffset, left;
  const timeout = setTimeout(finish, 2200);

  function measure() {
    const rect = image.getBoundingClientRect();
    const scale = rect.height / 1024;
    const videoScale = scale * 1.001;
    const width = 1920 * videoScale;
    // Align the same point on the last video frame and the static PNG.
    left = 381 * rect.width / 768 - 1200 * videoScale;
    video.style.width = `${width}px`;
    video.style.top = `${-8 * scale}px`;
    entryOffset = Math.max(0, document.documentElement.clientWidth - rect.left - left - width);
    position(video.currentTime);
  }

  function position(time) {
    // Keep the cut edge against the viewport until the full silhouette clears it.
    const progress = Math.max(0, Math.min(1, (time - .400) / (1.383333 - .400)));
    const remaining = 1 - progress * progress * (3 - 2 * progress);
    video.style.left = `${left + entryOffset * remaining}px`;
  }

  function updateFrame(_now, {mediaTime}) {
    position(mediaTime);
    frame = video.requestVideoFrameCallback(updateFrame);
  }

  function updateTime() { position(video.currentTime); }

  video.addEventListener('playing', () => {
    if (stopped) return;
    clearTimeout(timeout);
    // Some decoders play the color plane but ignore WebM's alpha channel.
    const probe = document.createElement('canvas');
    probe.width = probe.height = 1;
    const context = probe.getContext('2d', {willReadFrequently: true});
    context.drawImage(video, 8, 8, 1, 1, 0, 0, 1, 1);
    if (context.getImageData(0, 0, 1, 1).data[3] !== 0) return finish();
    measure();
    video.classList.add('home-portrait-arrival-ready');
    startText();
    window.addEventListener('resize', measure);
    if (video.requestVideoFrameCallback) frame = video.requestVideoFrameCallback(updateFrame);
    else video.addEventListener('timeupdate', updateTime);
  }, {once: true});
  video.addEventListener('ended', () => {
    const silhouette = document.createElement('canvas');
    silhouette.width = video.videoWidth;
    silhouette.height = video.videoHeight;
    const context = silhouette.getContext('2d');
    if (!context || !CSS.supports('mask-composite', 'intersect')) return finish();

    context.drawImage(video, 0, 0);
    const still = image.getBoundingClientRect();
    const lastFrame = video.getBoundingClientRect();
    shine = document.createElement('span');
    shine.className = 'home-portrait-shine home-portrait-shine-video';
    shine.setAttribute('aria-hidden', 'true');
    shine.style.setProperty('--shine-video-mask', `url("${silhouette.toDataURL()}")`);
    shine.style.setProperty('--shine-video-left', `${(lastFrame.left - still.left) / (still.width - lastFrame.width) * 100}%`);
    shine.style.setProperty('--shine-video-top', `${(lastFrame.top - still.top) / (still.height - lastFrame.height) * 100}%`);
    shine.style.setProperty('--shine-video-width', `${lastFrame.width / still.width * 100}%`);
    shine.style.setProperty('--shine-video-height', `${lastFrame.height / still.height * 100}%`);
    portrait.append(shine);

    // Swap as the light crosses the upper body, where the two poses differ most.
    const handoff = {backgroundPosition: '50% 58.33%'};
    shineIn = shine.animate([{backgroundPosition: '50% 100%'}, handoff], {duration: 125, fill: 'forwards'});
    shineIn.finished.then(() => {
      const highlight = shine;
      shine = null;
      highlight.classList.remove('home-portrait-shine-video');
      highlight.animate([handoff, {backgroundPosition: '50% 0%'}], {duration: 175, fill: 'forwards'})
        .onfinish = () => highlight.remove();
      finish();
    }, () => {});
  }, {once: true});
  video.addEventListener('error', () => { if (!stopped) finish(); }, {once: true});
  video.src = 'assets/home/portrait-6221.webm';
  portrait.append(video);
  video.play().catch(() => { if (!stopped) finish(); });

  return () => {
    stopped = true;
    clearTimeout(timeout);
    shineIn?.cancel();
    shine?.remove();
    if (frame !== undefined) video.cancelVideoFrameCallback(frame);
    window.removeEventListener('resize', measure);
    video.pause();
    video.remove();
  };
}

function playPortraitVideo(portrait, finish, fallback, mode, startText) {
  const previous = mode === 'previous';
  const latest = ['6211', '6215', 'transparent'].includes(mode);
  const restored = !latest && !previous && mode !== '6209';
  const version = restored ? 'detail' : latest ? '6211' : previous ? '6207' : '6209';
  const video = document.createElement('video');
  video.className = `home-portrait-video home-portrait-video-${version}`;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  let timeout = setTimeout(fallback, 2200);
  let stopped = false;
  const mobileEntry = previous && matchMedia('(max-width: 540px)').matches;

  function blend() {
    if (stopped || portrait.classList.contains('home-portrait-blending')) return;
    portrait.classList.add('home-portrait-blending');
    timeout = setTimeout(finish, restored ? 300 : latest ? 200 : 145);
  }

  function positionRestoredVideo(time) {
    const currentOffset = parseFloat(video.style.translate) || 0;
    const frameRight = video.getBoundingClientRect().right - currentOffset;
    const edgeOffset = Math.max(0, document.documentElement.clientWidth - frameRight);
    const progress = Math.max(0, Math.min(1, (time - .56) / 1.10));
    const eased = progress * progress * (3 - 2 * progress);
    video.style.translate = `${edgeOffset * (1 - eased)}px 0`;
  }

  function trackRestoredFrame(_now, frame) {
    if (stopped || video.ended) return;
    positionRestoredVideo(frame.mediaTime);
    video.requestVideoFrameCallback(trackRestoredFrame);
  }

  video.addEventListener('playing', () => {
    if (stopped || portrait.classList.contains('home-portrait-playing')) return;
    clearTimeout(timeout);
    // A decoder without VP9 alpha presents the transparent corner as opaque.
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 8, 8, 1, 1, 0, 0, 1, 1);
      if (context.getImageData(0, 0, 1, 1).data[3] > 24) return fallback();
    }
    portrait.classList.add('home-portrait-playing', 'home-portrait-video-mode');
    if (restored) {
      positionRestoredVideo(video.currentTime);
      if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(trackRestoredFrame);
      else video.addEventListener('timeupdate', () => positionRestoredVideo(video.currentTime));
    }
    startText(restored ? 0 : Math.max(0, (previous ? 1560 : 920) - video.currentTime * 1000));
  });
  video.addEventListener('ended', () => {
    // Keep the last planted pose before replacing the entire silhouette.
    if (restored || latest || previous) blend();
    else timeout = setTimeout(blend, 95);
  }, {once: true});
  if (mobileEntry) {
    video.addEventListener('loadedmetadata', () => { video.currentTime = .44; }, {once: true});
  }
  video.addEventListener('error', () => {
    if (!stopped) fallback();
  }, {once: true});
  const source = restored ? 'detail' : mode === 'transparent' ? '6211-transparent'
    : mode === '6211' ? '6211'
    : latest ? '6215' : previous ? '6207-clean' : '6209-soft';
  video.src = `assets/home/portrait-walk-${source}.webm`;
  portrait.append(video);
  video.play().catch(() => { if (!stopped) fallback(); });
  return () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timeout);
    video.pause();
    video.remove();
  };
}

const homeScrambleStagger = 34;

function setupHomeScramble() {
  const menu = document.querySelector('.home-menu');
  const toggle = document.querySelector('.home-menu-toggle');
  const closeMenu = () => toggle.setAttribute('aria-expanded', 'false');
  toggle.onclick = () => toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') === 'false'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  toggle.closest('header').addEventListener('keydown', event => {
    if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    toggle.focus();
  });
  const jobs = createScrambleJobs(document.querySelector('.home-screen'));
  let started = false;
  return (remaining = 0) => {
    if (started) return;
    started = true;
    const delay = Math.max(0, remaining - (jobs.length - 1) * homeScrambleStagger - 760);
    const start = () => jobs.forEach((play, index) => play(delay + index * homeScrambleStagger));
    document.fonts.load('22px "Ubuntu Sans Mono"').then(start, start);
  };
}

function createScrambleJobs(root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  return [...root.querySelectorAll('[data-scramble]')].map(element => {
    const glyphs = [...element.textContent];
    const menuItem = element.closest('.home-nav a, .home-nav button');
    const letters = glyphs.filter(glyph => /[\p{L}\p{N}]/u.test(glyph)).length;
    let duration = menuItem || letters <= 4 ? Math.min(550, 200 + letters * 38) : 760;
    if (element.closest('.home-title')) duration = 1800 - 3 * homeScrambleStagger;
    const alphabet = /[а-я]/i.test(element.textContent)
      ? 'БЖКЛМНСФШЯ0123456789#%?' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%?';
    const overlay = document.createElement('span');
    overlay.className = 'home-scramble-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    element.append(overlay);
    let animation;

    function play(delay = 0) {
      if (reduced.matches) return;
      cancelAnimationFrame(animation);
      const start = performance.now() + delay;
      let lastTick = -1;
      function frame(now) {
        const elapsed = now - start;
        if (reduced.matches || elapsed >= duration) {
          element.classList.remove('home-scrambling');
          overlay.textContent = '';
          return;
        }
        const tick = Math.floor(elapsed / 42);
        if (elapsed >= 0 && tick !== lastTick) {
          lastTick = tick;
          const progress = elapsed / duration;
          const locked = Math.floor(glyphs.length * Math.max(0, (progress - .17) / .83));
          const visible = Math.ceil(glyphs.length * Math.min(1, .28 + progress * 2));
          overlay.textContent = glyphs.map((glyph, i) => {
            if (i < locked || /[\s\[\]]/.test(glyph)) return glyph;
            if (i >= visible) return ' ';
            return alphabet[Math.floor(Math.random() * alphabet.length)];
          }).join('');
          element.classList.add('home-scrambling');
        }
        animation = requestAnimationFrame(frame);
      }
      animation = requestAnimationFrame(frame);
    }

    if (menuItem) {
      menuItem.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'touch') play();
      });
      menuItem.addEventListener('focus', () => {
        if (menuItem.matches(':focus-visible')) play();
      });
    }
    return play;
  });
}
