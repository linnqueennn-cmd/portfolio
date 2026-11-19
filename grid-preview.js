// Always available locally. The overlay never affects page layout.
{
  const style = document.createElement('style');
  style.textContent = `
    .grid-preview {
      position: fixed; inset: 0; z-index: 9998; pointer-events: none;
      --grid-unit: min(1px, calc((100vw - 72px) / 1276));
    }
    .grid-preview-columns {
      position: absolute; inset-block: 0; left: 50%; transform: translateX(-50%);
      width: calc(1276 * var(--grid-unit)); display: grid;
      grid-template-columns: repeat(10, minmax(0, 1fr)); gap: calc(64 * var(--grid-unit));
    }
    .grid-preview-columns span { background: #ff00001a; }
    .grid-preview-margins { position: absolute; inset: 0 36px; border-inline: 1px solid #f04a4a; }
    .grid-preview-control {
      position: fixed; z-index: 9999; left: 16px; bottom: 16px;
      border: 1px solid #777; border-radius: 4px; padding: 10px 14px;
      background: #efefef; color: #282828; font: 14px/1.3 "Ubuntu Sans Mono", monospace;
    }
    @media (max-width: 600px) {
      .grid-preview-columns { display: none; }
      .grid-preview-margins { inset-inline: 16px; }
    }
  `;
  const overlay = document.createElement('div');
  overlay.className = 'grid-preview';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<div class="grid-preview-margins"></div><div class="grid-preview-columns">' +
    '<span></span>'.repeat(10) + '</div>';
  let showGrid = new URLSearchParams(location.search).get('grid') === '1';
  try {
    if (!new URLSearchParams(location.search).has('grid')) showGrid = localStorage.getItem('portfolio-grid') === '1';
  } catch {}
  overlay.hidden = !showGrid;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'grid-preview-control';
  button.textContent = showGrid ? 'скрыть сетку' : 'показать сетку';
  button.setAttribute('aria-pressed', String(showGrid));
  button.onclick = () => {
    overlay.hidden = !overlay.hidden;
    button.textContent = overlay.hidden ? 'показать сетку' : 'скрыть сетку';
    button.setAttribute('aria-pressed', String(!overlay.hidden));
    try { localStorage.setItem('portfolio-grid', overlay.hidden ? '0' : '1'); } catch {}
  };
  document.head.append(style);
  document.body.append(overlay, button);
}
