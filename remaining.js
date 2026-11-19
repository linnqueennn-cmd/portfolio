function remainingSections(t) {
  const copy = remainingContent;
  const phrase = value => value.replace(/(^|\s)([авикосуя]|до|из|на|от|по|за|об|не|со)(?= ) /gi, '$1$2 ');
  const tr = pair => phrase(t(...pair));
  const scramble = value => `<span class="home-scramble" data-scramble>${value}</span>`;
  const heading = (id, index) => `<h2 class="remaining-heading" id="${id}-title" data-reveal>${scramble(tr(copy.titles[index]))}<span class="crystal-stop" aria-hidden="true"></span></h2>`;
  const action = (label, url) => `<a class="remaining-action home-cta" href="${url}">${scramble('[' + label + ']')}</a>`;
  const serviceImages = ['roma', 'vinyl', 'brand', 'retail'];
  return `
    <section id="services" class="remaining-section" aria-labelledby="services-title">
      ${heading('services', 0)}
      <div class="service-story">
        <figure class="service-media" aria-hidden="true">${serviceImages.map((image, i) =>
          `<img src="assets/${image}.jpg" alt="" loading="lazy"${i === 0 ? ' class="is-active"' : ''}>`).join('')}</figure>
        <div class="service-options">${copy.services.map(([name, ru, english], i) => `
          <article class="service-option${i === 0 ? ' is-active' : ''}">
            <h3><button type="button" aria-pressed="${i === 0}">${name.toLowerCase()}</button></h3>
            <img src="assets/${serviceImages[i]}.jpg" alt="" loading="lazy" class="service-inline">
            <p>${tr([ru, english])}</p>
          </article>`).join('')}</div>
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
      <p class="remaining-note">${tr(copy.pricingNote)}</p></div>
      <dl class="rate-list">${copy.prices.map(([ru, english, amount]) => `
        <div class="rate-slot scroll-window-slot"><div class="rate-row scroll-window"><dt>[${tr([ru, english])}]</dt><dd>${amount ? t('от ','from ') + amount.replace(' ', ' ') + ' ₽' : t('по запросу','on request')}</dd></div></div>`).join('')}</dl>
      <div class="pricing-bottom">
      ${action(tr(copy.discuss), '#contacts')}
      </div>
    </section>
    <section id="contacts" class="remaining-section" aria-labelledby="contacts-title">
      <div class="contact-top">
        <div class="contact-profile"><p><img src="assets/home/status.svg" alt="">${t('открыта к проектам','open for projects')}</p></div>
        <h2 class="remaining-heading" id="contacts-title" data-reveal>${scramble(tr(copy.contactTitle))}</h2>
      </div>
      <div class="remaining-actions">${action('Telegram', 'https://t.me/linqueenn')}${action('WhatsApp', 'https://wa.me/79997204828')}${action('Behance', 'https://www.behance.net/linnqueenn')}${action('linnqueenn@gmail.com', 'mailto:linnqueenn@gmail.com')}${action('Instagram', 'https://instagram.com/lin.queenn')}</div>
      <footer class="remaining-footer"><p>${tr(copy.likeNote)}</p><button class="sims-like" type="button" aria-pressed="false" aria-label="${t('Люблю The Sims','I love The Sims')}"><svg viewBox="0 0 9 8" aria-hidden="true" shape-rendering="crispEdges"><path fill="currentColor" d="M1 0h2v1h1v1h1V1h1V0h2v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z"/></svg></button></footer>
    </section>`;
}

function setupRemainingSections() {
  const rows = [...document.querySelectorAll('.service-option')];
  const images = [...document.querySelectorAll('.service-media img')];
  const wide = matchMedia('(min-width: 900px)');
  const mobile = matchMedia('(max-width: 540px)');
  const serviceSection = document.querySelector('#services');
  const story = serviceSection.querySelector('.service-story');
  const serviceHeading = serviceSection.querySelector('.remaining-heading');
  let selected = 0;
  let frame = 0;

  function activate(index) {
    if (selected === index) return;
    rows[selected].classList.remove('is-active');
    images[selected].classList.remove('is-active');
    rows[selected].querySelector('button').setAttribute('aria-pressed', 'false');
    selected = index;
    rows[index].classList.add('is-active');
    images[index].classList.add('is-active');
    rows[index].querySelector('button').setAttribute('aria-pressed', 'true');
  }

  function update() {
    frame = 0;
    if (mobile.matches) {
      const storyOffset = serviceHeading.offsetTop + serviceHeading.offsetHeight +
        Number.parseFloat(getComputedStyle(serviceHeading).marginBottom);
      const start = serviceSection.getBoundingClientRect().top + storyOffset;
      const distance = serviceSection.offsetHeight - storyOffset - story.offsetHeight - 48;
      const progress = Math.max(0, Math.min(1, (16 - start) / Math.max(1, distance)));
      activate(Math.min(rows.length - 1, Math.floor(progress * rows.length)));
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

  rows.forEach((row, i) => row.querySelector('button').addEventListener('click', () => {
    activate(i);
    if (wide.matches) row.scrollIntoView({block: 'center'});
  }));
  rows.forEach((row, i) => row.querySelector('button').addEventListener('focus', () => {
    if (!wide.matches) activate(i);
  }));
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(story);
  schedule();

  setupScrollWindows(document.querySelector('.rate-list'));

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
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame;
  function update() {
    frame = 0;
    if (reduced.matches) {
      cards.forEach(card => {
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
      });
      rail.style.height = '';
      return;
    }
    const pin = section.querySelector('.process-pin');
    section.style.setProperty('--process-pin-height', pin.offsetHeight + 'px');
    const pinTop = 24;
    const step = rail.firstElementChild.offsetWidth - 12;
    const travel = Math.max(0, (cards.length - 1) * step + cards.at(-1).offsetWidth - rail.clientWidth);
    const scrollDistance = innerWidth <= 540
      ? Math.max(480, Math.min(640, travel * .5))
      : Math.max(240, Math.min(480, travel * .22));
    section.style.setProperty('--process-scroll-distance', scrollDistance + 'px');
    const distance = section.offsetHeight - pin.offsetHeight - 48;
    const progress = Math.max(0, Math.min(1, (pinTop - section.getBoundingClientRect().top) / Math.max(1, distance)));
    cards.forEach((card, i) => {
      const offset = i - progress * travel / step;
      const x = offset < 0 ? offset * 22 : offset * step;
      card.style.transform = `translateX(${x}px)`;
      card.style.opacity = offset < 0 ? String(Math.max(.35, 1 + offset * 1.5)) : '1';
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  const observer = new ResizeObserver(() => {
    if (!reduced.matches) {
      rail.style.height = '';
      rail.style.height = Math.max(...cards.map(card => card.offsetHeight)) + 32 + 'px';
    }
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
