function aboutScreen(t, person, cv) {
  const cards = [
    [t('Обо мне', 'About me'), t(
      'меня зовут <span class="about-proper-name">Лина</span>, более семи лет занимаюсь дизайном. специализируюсь на ux/ui, создаю сайты, интерфейсы и визуальные решения для бизнеса. от первых идей до реализации —<br class="about-desktop-break"> умею работать на каждом этапе проекта.',
      'I’m <span class="about-proper-name">Lina</span>, and I’ve been designing for over seven years. I specialise in UX/UI and create websites, interfaces and visual systems for businesses. I work across every stage, from the first idea to implementation.'
    )],
    [t('Не просто красиво', 'More than looks'), t(
      'Я люблю задавать вопросы. Для кого мы это делаем? Зачем? Какую задачу решаем? Поэтому погружаюсь в продукт, изучаю аудиторию, продумываю структуру и пользовательские сценарии. Мне важно, чтобы дизайн не только классно выглядел, но и приносил бизнесу реальную пользу.',
      'I like asking questions. Who are we designing for? Why? What problem are we solving? I get to know the product and audience, then work through its structure and user journeys. I want the design to look good and help the business.'
    )],
    [t('И ещё кое-что', 'One more thing'), t(
      'У меня есть бэкграунд в маркетинге, поэтому я смотрю на дизайн не только с визуальной, но и с коммерческой стороны. С 2025 года преподаю UX/UI и помогаю будущим дизайнерам развиваться. Экспериментирую с ИИ и вайбкодингом, считаю, что новые технологии помогают воплощать даже самые смелые идеи.',
      'My marketing background shapes how I think about design, both visually and commercially. I’ve taught UX/UI since 2025 and help aspiring designers develop their skills. I also experiment with AI and vibe coding to bring more ambitious ideas to life.'
    )]
  ];

  return `<section id="about" class="about-screen" aria-label="${t('Обо мне', 'About me')}">
    <div class="about-scene"><a class="about-resume" href="${cv}" download><span class="about-resume-label"><span class="home-scramble" data-scramble>CV</span><img src="assets/home/download.svg" alt=""></span><span class="about-resume-note"><span class="about-resume-desktop-note">${t('подробнее тут', 'more details here')}</span><span class="about-resume-mobile-note">${t('скачать резюме', 'download résumé')}</span></span></a>${cards.map(([heading, body], i) => `
      <div class="about-slot scroll-window-slot">
        <article class="about-panel scroll-window">
          <h2><span class="home-scramble" data-scramble>0${i + 1} / ${joinRussianShortWords(heading)}</span><span class="about-gem" aria-hidden="true"></span></h2>
          <p>${body}</p>
          ${i === 0 ? `<img class="about-photo" src="assets/about/portrait.png" alt="${person}" loading="lazy">` : ''}
        </article>
      </div>`).join('')}</div>
  </section>`;
}

function setupAboutScreen() {
  createScrambleJobs(document.querySelector('.about-resume'));
  setupScrollWindows(document.querySelector('.about-scene'), {layered: true});
}

const playedScrollWindowKeys = new Set();
function setupScrollWindows(scene, {layered = false} = {}) {
  const slots = [...scene.querySelectorAll('.scroll-window-slot')];
  const panels = slots.map(slot => slot.firstElementChild);
  const titles = panels.map(createScrambleJobs);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const progress = panels.map(() => 0);
  const keys = slots.map(slot => slot.dataset.project ? `project:${slot.dataset.project}` : null);
  const didScramble = keys.map(key => key ? playedScrollWindowKeys.has(key) : false);
  let pending;
  let previousTime;

  function update(now) {
    pending = 0;
    const height = document.documentElement.clientHeight;
    const travel = Math.min(182, height * .26);
    const elapsed = Math.min(40, now - (previousTime ?? now - 16));
    const easing = 1 - Math.exp(-elapsed / 84);
    previousTime = now;
    let moving = false;

    slots.forEach((slot, i) => {
      const box = slot.getBoundingClientRect();
      const visible = box.bottom > 0 && box.top < height * .88;
      const target = Math.max(0, Math.min(1, (height * .82 - box.top) / travel));
      const focused = slot.matches(':focus-within');
      const ready = i === 0 || progress[i - 1] >= .75 || target <= progress[i];
      const next = reduced.matches || focused ? 1 : ready ? target : 0;
      const difference = next - progress[i];
      progress[i] = Math.abs(difference) < .008 || reduced.matches || focused ? next : progress[i] + difference * easing;
      moving ||= !reduced.matches && Math.abs(next - progress[i]) >= .008;
      panels[i].style.setProperty('--window-progress', progress[i]);
      if (visible && progress[i] >= .68 && !didScramble[i] && !reduced.matches) {
        didScramble[i] = true;
        if (keys[i]) playedScrollWindowKeys.add(keys[i]);
        titles[i].forEach(play => play());
      }
    });
    if (layered) panels.forEach((panel, i) => panel.style.setProperty('--window-behind', progress[i + 1] ?? 0));
    if (moving) schedule();
    else previousTime = undefined;
  }

  function schedule() {
    if (!pending) pending = requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  scene.addEventListener('focusin', schedule);
  scene.addEventListener('focusout', schedule);
  reduced.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(scene);
  if (!reduced.matches) panels.forEach(panel => panel.style.setProperty('--window-progress', 0));
  schedule();
}
