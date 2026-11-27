function remainingText(value, animated = true) {
  return animated ? `<span class="home-scramble" data-scramble>${value}</span>` : value;
}

function remainingAction(label, url, {pricing = false, animated = true} = {}) {
  return `<a class="remaining-action home-cta${pricing ? ' pricing-cta' : ''}" href="${url}"><span class="home-cta-bracket home-cta-bracket-left" aria-hidden="true">[</span>${remainingText(label, animated)}<span class="home-cta-bracket home-cta-bracket-right" aria-hidden="true">]</span></a>`;
}

function contactFooter(t, {homePage = false} = {}) {
  const title = t(['ПИШИТЕ, СОЗДАДИМ', 'ЧТО-ТО КРУТОЕ'], ['LET’S CREATE', 'SOMETHING GREAT']);
  const email = 'linnqueenn@icloud.com';
  const actions = [
    ['Telegram', 'https://t.me/linqueenn'],
    ['WhatsApp', 'https://wa.me/79997204828'],
    ['Behance', 'https://www.behance.net/linnqueenn'],
    [email, `mailto:${email}`],
    ['Instagram', 'https://instagram.com/lin.queenn']
  ];
  return `
    <footer id="contacts" class="remaining-section" role="contentinfo" aria-labelledby="contacts-title">
      <div class="contact-top">
        <div class="contact-profile"><p><img src="assets/home/status.svg" alt="">${t('открыта к проектам','open for projects')}</p></div>
        <h2 class="remaining-heading" id="contacts-title"${homePage ? ' data-reveal' : ''}><span class="contact-title-copy"><span class="contact-title-line">${remainingText(title[0], homePage)}</span><span class="contact-title-line contact-title-line-secondary">${remainingText(title[1], homePage)}</span></span></h2>
      </div>
      <div class="remaining-actions">${actions.map(([label, url]) => remainingAction(label, url, {animated: homePage})).join('')}</div>
      ${homePage ? `<div class="remaining-footer"><p><span class="like-note-full">${joinRussianShortWords(t(...remainingContent.likeNote))}</span><span class="like-note-mobile">${t('Пока не готовы сотрудничать?<br>Тогда ставьте лайк, если тоже любите The Sims.','Not ready to work together?<br>Then leave a like if you love The Sims too.')}</span></p><button class="sims-like" type="button" aria-pressed="false" aria-label="${t('Люблю The Sims','I love The Sims')}"><svg viewBox="0 0 9 8" aria-hidden="true" shape-rendering="crispEdges"><path fill="currentColor" d="M1 0h2v1h1v1h1V1h1V0h2v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z"/></svg></button></div>` : ''}
    </footer>`;
}

function remainingSections(t) {
  const copy = remainingContent;
  const tr = pair => joinRussianShortWords(t(...pair));
  const heading = (id, index) => `<h2 class="remaining-heading" id="${id}-title" data-reveal>${remainingText(tr(copy.titles[index]))}<span class="crystal-stop" aria-hidden="true"></span></h2>`;
  const pricingNote = tr(copy.pricingNote)
    .replace(/для[  ]вас\./, '<span class="pricing-mobile-line">для вас.</span>')
    .replace(/for[  ]you\./, '<span class="pricing-mobile-line">for you.</span>');
  const rateLabel = pair => `[${tr(pair)}]`.replace(
    / (digital(?:-проект| project)\])$/i,
    ' <span class="rate-mobile-line">$1</span>'
  );
  return `
    <section id="services" class="remaining-section" aria-labelledby="services-title">
      <div class="service-pin">
      ${heading('services', 0)}
      <div class="service-story">
        <figure class="service-media" aria-hidden="true">${copy.services.map((_, i) => serviceCollageMarkup(i)).join('')}</figure>
        <div class="service-options">${copy.services.map(([name, ru, english], i) => `
          <article class="service-option${i === 0 ? ' is-active' : ''}">
            <h3><button type="button" aria-pressed="${i === 0}">${name.toLowerCase().replace(/& /g, '& ')}</button></h3>
            <p>${tr([ru, english])}</p>
          </article>`).join('')}</div>
      </div>
      </div>
    </section>
    <section id="process" class="remaining-section" aria-labelledby="process-title">
      <div class="process-pin">
      <div class="process-top">
      ${heading('process', 1)}
      <p class="process-note">${tr(copy.processNote)}</p>
      </div>
      <div class="process-rail" aria-labelledby="process-title">${copy.steps.map(([ru, english, body, translated], i) => `
        <article class="step process-step"><span class="remaining-meta">0${i + 1} / 06</span>
          <div><h3>${tr([ru, english])}</h3><p>${tr([body, translated])}</p></div>
        </article>`).join('')}</div>
      </div>
    </section>
    <section id="pricing" class="remaining-section" aria-labelledby="pricing-title">
      <div class="pricing-top">${heading('pricing', 2)}
      <p class="remaining-note">${pricingNote}</p></div>
      <dl class="rate-list">${copy.prices.map(([ru, english, amount]) => `
        <div class="rate-slot scroll-window-slot"><div class="rate-row scroll-window"><dt>${rateLabel([ru, english])}</dt><dd>${amount ? `<span class="rate-prefix">${t('от ','from ')}</span><span class="rate-amount">${amount.replace(' ', ' ')} ₽</span>` : t('по запросу','on request')}</dd></div></div>`).join('')}</dl>
      <div class="pricing-bottom">
      ${remainingAction(tr(copy.discuss), 'https://t.me/linqueenn', {pricing: true})}
      </div>
    </section>
    ${contactFooter(t, {homePage: true})}`;
}

function setupRemainingSections() {
  const rows = [...document.querySelectorAll('.service-option')];
  const images = [...document.querySelectorAll('.service-collage')];
  const collage = setupServiceCollages(document.querySelector('.service-media'));
  let measuring = false;
  const wide = matchMedia('(min-width: 900px), (min-width: 760px) and (orientation: landscape) and (pointer: coarse)');
  const mobile = matchMedia('(max-width: 540px), (max-width: 1100px) and (orientation: portrait)');
  const serviceSection = document.querySelector('#services');
  const story = serviceSection.querySelector('.service-story');
  const options = serviceSection.querySelector('.service-options');
  const servicePin = serviceSection.querySelector('.service-pin');
  let servicePinHeight = 0;
  let measuredViewportWidth = 0;
  let measuredMobile = mobile.matches;
  let serviceTarget = null;
  let serviceTargetTimer = 0;
  function measureServices() {
    measuredViewportWidth = innerWidth;
    measuredMobile = mobile.matches;
    story.style.removeProperty('min-height');
    options.style.removeProperty('min-height');
    if (!mobile.matches) { serviceSection.style.removeProperty('--service-sticky-top'); return; }
    const original = selected;
    let height = 0;
    measuring = true;
    rows.forEach((_, index) => { activate(index); height = Math.max(height, options.offsetHeight); });
    activate(original);
    measuring = false;
    options.style.minHeight = height + 'px';
    servicePinHeight = servicePin.offsetHeight;
    serviceSection.style.setProperty('--service-sticky-top', Math.min(88, innerHeight - servicePinHeight - 16) + 'px');
  }
  let selected = 0;
  let frame = 0;

  function serviceScrollMetrics() {
    const sectionStyle = getComputedStyle(serviceSection);
    const paddingTop = Number.parseFloat(sectionStyle.paddingTop);
    const paddingBottom = Number.parseFloat(sectionStyle.paddingBottom);
    const stickyTop = Math.min(88, innerHeight - servicePinHeight - 16);
    const top = scrollY + serviceSection.getBoundingClientRect().top + paddingTop - stickyTop;
    const distance = serviceSection.offsetHeight - paddingTop - paddingBottom - servicePinHeight;
    return {top, distance: Math.max(1, distance), stickyTop};
  }

  function activate(index) {
    if (selected === index) return;
    rows[selected].classList.remove('is-active');
    images[selected].classList.remove('is-active');
    rows[selected].querySelector('button').setAttribute('aria-pressed', 'false');
    selected = index;
    rows[index].classList.add('is-active');
    images[index].classList.add('is-active');
    rows[index].querySelector('button').setAttribute('aria-pressed', 'true');
    if (!measuring) collage.select(index);
  }

  function update() {
    frame = 0;
    if (mobile.matches) {
      if (serviceTarget !== null) { activate(serviceTarget); return; }
      const metrics = serviceScrollMetrics();
      const progress = Math.max(0, Math.min(1, (scrollY - metrics.top) / metrics.distance));
      activate(Math.round(progress * (rows.length - 1)));
      return;
    }
    if (!wide.matches) return;
    const line = innerHeight * .51;
    const distances = rows.map(row => Math.abs(row.getBoundingClientRect().top + row.offsetHeight / 2 - line));
    activate(distances.indexOf(Math.min(...distances)));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function stepService(direction) {
    const next = Math.max(0, Math.min(rows.length - 1, selected + direction));
    if (next === selected) return false;
    const metrics = serviceScrollMetrics();
    serviceTarget = next;
    activate(next);
    scrollTo({top: metrics.top + metrics.distance * next / (rows.length - 1), behavior: 'smooth'});
    clearTimeout(serviceTargetTimer);
    serviceTargetTimer = setTimeout(() => { serviceTarget = null; schedule(); }, 560);
    return true;
  }

  let wheelLocked = false;
  serviceSection.addEventListener('wheel', event => {
    if (!mobile.matches || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 8) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    if ((direction < 0 && selected === 0) || (direction > 0 && selected === rows.length - 1)) return;
    event.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    stepService(direction);
    setTimeout(() => { wheelLocked = false; }, 620);
  }, {passive: false});

  let serviceTouch = null;
  serviceSection.addEventListener('touchstart', event => {
    if (!mobile.matches || event.touches.length !== 1) { serviceTouch = null; return; }
    const touch = event.touches[0];
    serviceTouch = {x: touch.clientX, y: touch.clientY, direction: 0};
  }, {passive: true});
  serviceSection.addEventListener('touchmove', event => {
    if (!serviceTouch || event.touches.length !== 1) return;
    const touch = event.touches[0];
    const dx = touch.clientX - serviceTouch.x;
    const dy = touch.clientY - serviceTouch.y;
    if (Math.abs(dy) <= Math.abs(dx) || Math.abs(dy) < 8) return;
    const direction = dy < 0 ? 1 : -1;
    const canStep = direction > 0 ? selected < rows.length - 1 : selected > 0;
    serviceTouch.direction = canStep ? direction : 0;
    if (canStep) event.preventDefault();
  }, {passive: false});
  serviceSection.addEventListener('touchend', event => {
    if (!serviceTouch) return;
    const touch = event.changedTouches[0];
    const dy = touch ? touch.clientY - serviceTouch.y : 0;
    const direction = Math.abs(dy) >= 28 ? serviceTouch.direction : 0;
    serviceTouch = null;
    if (direction) stepService(direction);
  }, {passive: true});
  serviceSection.addEventListener('touchcancel', () => { serviceTouch = null; }, {passive: true});

  rows.forEach((row, i) => row.querySelector('button').addEventListener('click', () => {
    activate(i);
    if (mobile.matches) {
      const metrics = serviceScrollMetrics();
      serviceTarget = i;
      scrollTo({top: metrics.top + metrics.distance * i / (rows.length - 1), behavior: 'instant'});
      clearTimeout(serviceTargetTimer);
      serviceTargetTimer = setTimeout(() => { serviceTarget = null; schedule(); }, 120);
      return;
    }
    if (wide.matches && !mobile.matches) row.scrollIntoView({block: 'center'});
  }));
  rows.forEach((row, i) => row.querySelector('button').addEventListener('focus', () => {
    if (!wide.matches || mobile.matches) activate(i);
  }));
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', () => {
    const layoutChanged = innerWidth !== measuredViewportWidth || mobile.matches !== measuredMobile;
    if (layoutChanged) measureServices();
    else if (mobile.matches) serviceSection.style.setProperty('--service-sticky-top', Math.min(88, innerHeight - servicePin.offsetHeight - 16) + 'px');
    schedule();
  });
  document.fonts.ready.then(() => { measureServices(); schedule(); });
  measureServices();
  new ResizeObserver(() => {
    if (mobile.matches) serviceSection.style.setProperty('--service-sticky-top', Math.min(88, innerHeight - servicePin.offsetHeight - 16) + 'px');
  }).observe(servicePin);
  schedule();

  setupScrollWindows(document.querySelector('.rate-list'));
  createScrambleJobs(document.querySelector('.pricing-bottom'));

  const like = document.querySelector('.sims-like');
  like.addEventListener('click', () => {
    like.setAttribute('aria-pressed', String(like.getAttribute('aria-pressed') !== 'true'));
  });

  setupProcessStack();
}

function setupProcessStack() {
  const section = document.querySelector('#process');
  const rail = document.querySelector('.process-rail');
  const cards = [...rail.children];
  const track = document.createElement('div');
  track.className = 'process-track';
  track.append(...cards);
  rail.append(track);
  rail.tabIndex = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const portraitTablet = matchMedia('(min-width: 541px) and (max-width: 1100px) and (orientation: portrait)');
  let frame, drag, manualScroll = false;
  let lastProgress, currentProgress = 0, lastTravel = 0, step = 0, travel = 0, visualScroll = 0;

  function paintCards() {
    const cursor = visualScroll / Math.max(1, step);
    cards.forEach((card, i) => {
      const offset = i - cursor;
      // Native scrolling moves the leading cards. Only the passed cards receive
      // a compensating offset to retain the agreed overlapping stack.
      const x = i * step - visualScroll + (offset < 0 ? -offset * (step - 22) : 0);
      card.style.transform = 'translate3d(' + x + 'px,0,0)';
      card.style.opacity = '1';
      card.style.setProperty('--process-content-opacity', offset < 0 ? String(Math.max(.35, 1 + offset * 1.5)) : '1');
    });
  }

  function update() {
    frame = 0;
    if (reduced.matches) {
      cards.forEach(card => {
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
        card.style.removeProperty('--process-content-opacity');
      });
      rail.style.height = '';
      track.style.width = '';
      lastProgress = undefined;
      lastTravel = 0;
      return;
    }
    const width = innerWidth <= 540 ? rail.clientWidth * .78
      : portraitTablet.matches ? rail.clientWidth * .62
      : (rail.clientWidth - 18) / 2;
    rail.style.setProperty('--process-card-width', width + 'px');
    step = width - 12;
    travel = Math.max(0, (cards.length - 1) * step + width - rail.clientWidth);
    track.style.width = rail.clientWidth + travel + 'px';
    const pin = section.querySelector('.process-pin');
    section.style.setProperty('--process-pin-height', pin.offsetHeight + 'px');
    const pinTop = Math.max(80, (innerHeight - pin.offsetHeight) / 2);
    pin.style.top = pinTop + 'px';
    const scrollDistance = innerWidth <= 540
      ? Math.max(480, Math.min(640, travel * .5))
      : Math.max(240, Math.min(480, travel * .22));
    section.style.setProperty('--process-scroll-distance', scrollDistance + 'px');
    const distance = section.offsetHeight - pin.offsetHeight - 48;
    const progress = Math.max(0, Math.min(1, (pinTop - section.getBoundingClientRect().top) / Math.max(1, distance)));
    currentProgress = progress;
    // Add the vertical delta to the current native scroll position. A manual
    // swipe remains in place when vertical scrolling resumes; window.scrollY
    // is never written by this component.
    let target = lastProgress === undefined ? progress * travel : visualScroll + (progress - lastProgress) * travel;
    if (lastTravel && Math.abs(lastTravel - travel) > 1) target = visualScroll / lastTravel * travel;
    if (!manualScroll) visualScroll = Math.max(0, Math.min(travel, target));
    lastProgress = progress;
    lastTravel = travel;
    paintCards();
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  rail.addEventListener('pointerdown', event => {
    if (reduced.matches || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drag = {id: event.pointerId, x: event.clientX, y: event.clientY, left: visualScroll, active: false};
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = drag.x - event.clientX;
    const dy = drag.y - event.clientY;
    if (!drag.active && Math.abs(dx) < 7) return;
    if (!drag.active && Math.abs(dx) <= Math.abs(dy)) return;
    drag.active = true;
    manualScroll = true;
    rail.classList.add('is-manual-scroll');
    event.preventDefault();
    visualScroll = Math.max(0, Math.min(travel, drag.left + dx));
    paintCards();
  });
  const stopDrag = () => {
    drag = null;
    manualScroll = false;
    rail.classList.remove('is-manual-scroll');
    lastProgress = currentProgress;
    schedule();
  };
  rail.addEventListener('pointerup', stopDrag);
  rail.addEventListener('pointercancel', stopDrag);
  rail.addEventListener('lostpointercapture', stopDrag);
  rail.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    visualScroll = Math.max(0, Math.min(travel, visualScroll + step * (event.key === 'ArrowRight' ? 1 : -1)));
    paintCards();
  });
  const observer = new ResizeObserver(() => {
    if (!reduced.matches) rail.style.height = Math.max(...cards.map(card => card.offsetHeight)) + 32 + 'px';
    schedule();
  });
  cards.forEach(card => observer.observe(card));
  schedule();
}

function setupSectionTransitions() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pairs = [['about', 'services'], ['process', 'pricing']].map(([before, after]) => {
    const outgoing = document.getElementById(before);
    const incoming = document.getElementById(after);
    const hold = document.createElement('div');
    hold.className = 'section-transition-hold';
    outgoing.before(hold);
    hold.append(outgoing);
    outgoing.classList.add('section-transition-out');
    incoming.classList.add('section-transition-in');
    return {outgoing, incoming, hold};
  });
  let frame;
  function update() {
    frame = 0;
    pairs.forEach(({outgoing, incoming, hold}) => {
      hold.style.setProperty('--outgoing-height', outgoing.offsetHeight + 'px');
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, (innerHeight - incoming.getBoundingClientRect().top) / innerHeight));
      outgoing.style.setProperty('--section-cover', progress);
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  pairs.forEach(({outgoing}) => new ResizeObserver(schedule).observe(outgoing));
  schedule();
}

function setupTravelingCrystal() {
  const stops = [...document.querySelectorAll('.home-gem-slot, .work-gem, .about-gem, .crystal-stop')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sprite = document.createElement('span');
  sprite.className = 'traveling-crystal';
  sprite.setAttribute('aria-hidden', 'true');
  const image = new Image();
  image.src = 'assets/home/gem.png';
  image.alt = '';
  sprite.append(image);
  document.body.append(sprite);
  let frame = 0;
  let current;
  let position;
  let start;
  let started;

  function update(now) {
    frame = 0;
    const line = innerHeight * .64;
    const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
    const target = atBottom ? stops.at(-1) : stops.findLast(stop => {
      const anchor = stop.closest('.about-slot') || stop;
      return anchor.getBoundingClientRect().top <= line;
    }) || stops[0];
    const {left, top, width, height} = target.getBoundingClientRect();
    const end = [left, Math.max(12, top), width, height];
    if (target !== current) {
      start = position;
      started = now;
      current = target;
    }
    const fraction = start && !reduced.matches ? Math.min(1, (now - started) / 440) : 1;
    const ease = 1 - (1 - fraction) ** 3;
    position = end.map((value, i) => fraction === 1 ? value : start[i] + (value - start[i]) * ease);
    sprite.style.transform = `translate3d(${position[0]}px,${position[1]}px,0)`;
    sprite.style.width = `${position[2]}px`;
    sprite.style.height = `${position[3]}px`;
    sprite.hidden = reduced.matches;
    document.body.classList.toggle('crystal-travel-enabled', !reduced.matches);
    if (fraction < 1) schedule();
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  const tabs = document.querySelector('.work-tabs');
  const tabObserver = new MutationObserver(() => {
    current = null;
    schedule();
  });
  tabs.querySelectorAll('button').forEach(button => tabObserver.observe(button, {childList: true}));
  new ResizeObserver(schedule).observe(document.querySelector('#app'));
  schedule();
}
