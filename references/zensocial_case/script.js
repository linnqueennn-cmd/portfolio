(() => {
  const byId = (id) => document.getElementById(id);
  const before = byId('before-grid');
  const after = byId('after-grid');
  const steps = [
    'Знакомство с ZenSocial',
    'Осознание времени',
    'Выбор фильтров',
    'Отображение контента',
    'Подтверждение настроек'
  ];
  const addScreen = (holder, src, name, label, type) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = type === 'before' ? 'before-thumb' : 'after-thumb';
    btn.setAttribute('aria-label', 'Увеличить: ' + name);
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.loading = 'eager';
    const span = document.createElement('span');
    span.textContent = label;
    btn.append(img, span);
    btn.addEventListener('click', () => openLightbox(src, name));
    holder.appendChild(btn);
  };
  for (let i = 1; i <= 15; i++) {
    addScreen(before, `assets/before_${String(i).padStart(2,'0')}.webp`, `Исходный онбординг, экран ${i}`, `${String(i).padStart(2,'0')}`, 'before');
  }
  for (let i = 1; i <= 5; i++) {
    addScreen(after, `assets/after_${String(i).padStart(2,'0')}.webp`, `Предложенная версия: ${steps[i-1]}`, `${String(i).padStart(2,'0')} / ${steps[i-1]}`, 'after');
  }
  const dialog = byId('lightbox');
  const pic = byId('lightbox-image');
  const label = byId('lightbox-label');
  const close = () => { dialog.hidden = true; document.body.style.overflow=''; };
  function openLightbox(src, txt) {
    pic.src = src;
    pic.alt = txt;
    label.textContent = txt.toUpperCase();
    dialog.hidden = false;
    document.body.style.overflow = 'hidden';
    byId('lightbox-close').focus();
  }
  byId('lightbox-close').addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !dialog.hidden) close(); });
  const scrollTrack = byId('scroll-line');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollTrack.style.width = (max ? window.scrollY / max * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
