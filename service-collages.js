// Original Figma compositions, 680 × 511. Coordinates and layer order are preserved.
// Raster copies are lossless WebP with byte-identical decoded RGBA pixels.
const serviceCollageSizes = {
  d18d9:[420,420], '48a79':[1024,1024], a199c:[736,414], '1c27b':[600,600],
  f4b28:[648,648], '35773':[1122,1402], c955d:[736,736], bd3f5:[736,736],
  '47ff9':[600,450], '51723':[500,500], fe849:[736,736], '9f964':[1136,640],
  c0ea7:[211,211], '36c2c':[722,1008], '00f34':[306,266], bd4ed:[1774,887],
  '350b2':[1024,699], bdebd:[736,736]
};
// Asset, bounding box, rotation, unrotated dimensions, vertical flip, blur, crop.
const serviceCollageParts = [
  [
    ['d18d9',141,-17,254.317,254.317,.27,253.105,253.105,1,.5],
    ['48a79',167.48,110.43,344.092,344.092],
    ['a199c',48,168,238.902,193.514,24.45,208.987,117.555],
    ['1c27b',326,160,295.02,295.02,17.09,236.074,236.074,1,2.891]
  ],
  [
    ['f4b28',105,358.99,139.065,139.065],
    ['35773',163.13,62.45,350.963,438.548],
    ['c955d',375.77,86.75,295.79,295.79,0,295.79,295.79,1,.5],
    ['bd3f5',348.07,-43.36,221.672,221.672,-174.34,202.666,202.666,-1,1.75]
  ],
  [
    ['47ff9',-10,133,310.108,256.295,-11.37,274.853,206.139],
    ['51723',206,72,267,389,0,267,389,1,0,true],
    ['fe849',393,335,133.472,150.977,10.86,110.487,132.54,1,0,'phone'],
    ['9f964',363,69,268.442,196.946,16.19,240.237,135.345,1,2.5]
  ],
  [
    ['c0ea7',394,390,121.245,121.245],
    {box:[172,7,361,504], parts:[
      ['8e6c1',429,429,18.5397,8.5],
      ['36c2c',172,7,361,504],
      ['00f34',386,101,39.185,34.063,0,39.185,34.063,1,.25],
      ['bd4ed',321.14,43.14,60.385,30.192]
    ]},
    ['350b2',136,128,169.045,138.039,-163.15,146.371,99.898,-1,1.5],
    ['bdebd',402,190,167.334,167.334,-25.17,125.784,125.784,1,.5]
  ]
];

const serviceCollageBounds = serviceCollageParts.map(parts => {
  const boxes = parts.map(part => part.box || part.slice(1,5));
  const x = Math.max(0,Math.min(...boxes.map(b=>b[0]))), y = Math.max(0,Math.min(...boxes.map(b=>b[1])));
  return [x,y,Math.min(680,Math.max(...boxes.map(b=>b[0]+b[2])))-x,Math.min(511,Math.max(...boxes.map(b=>b[1]+b[3])))-y];
});
// On phones, centre the UX/UI character rather than the surrounding accessories.
{
  const [x,y,w,h] = serviceCollageBounds[1];
  const centre = 163.13 + 350.963 / 2;
  const halfWidth = Math.max(centre - x, x + w - centre);
  serviceCollageBounds[1] = [centre - halfWidth,y,halfWidth * 2,h];
}

function serviceCollageMarkup(index) {
  function render(part, i, originX=0, originY=0, animated=true) {
    const [asset,x,y,w,h,angle=0,aw=w,ah=h,flip=1,blur=0,crop=false] = part.box ? [null,...part.box] : part;
    const vector = asset === '8e6c1';
    const dimensions = vector || !asset ? '' : `width="${serviceCollageSizes[asset][0]}" height="${serviceCollageSizes[asset][1]}"`;
    const dx = ((x+w/2-340)*.12).toFixed(2), dy = ((y+h/2-255.5)*.12).toFixed(2);
    const content = part.parts ? part.parts.map((child,j)=>render(child,j,x,y,false)).join('') : `<span class="service-art${crop ? ' service-art-cropped' : ''}" style="width:${aw}px;height:${ah}px;transform:translate(-50%,-50%) rotate(${angle}deg) scaleY(${flip});filter:blur(${blur}px)"><img class="${vector ? 'service-vector' : 'service-raster'}" ${crop === 'phone' ? 'style="left:0;width:119.96%"' : ''} data-src="assets/services/${asset}.${vector ? 'svg' : 'webp'}" ${dimensions} alt="" decoding="async" draggable="false"></span>`;
    return `<span class="${animated ? 'service-piece' : 'service-part'}" style="left:${x-originX}px;top:${y-originY}px;width:${w}px;height:${h}px;--assemble-x:${dx}px;--assemble-y:${dy}px;--assemble-turn:${i%2 ? -5 : 5}deg;--part-delay:${i*30}ms">${content}</span>`;
  }
  return `<div class="service-collage${index === 0 ? ' is-active' : ''}" data-collage="${index + 1}"><div class="service-collage-layout">${serviceCollageParts[index].map((part,i)=>render(part,i)).join('')}</div></div>`;
}

function setupServiceCollages(media) {
  const groups = [...media.querySelectorAll('.service-collage')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0, visible = false, sequence = 0;
  const loads = new Map();
  function setAspect(index) {
    const [, , w, h] = serviceCollageBounds[index];
    media.style.setProperty('--collage-aspect', String(w / h / (index === 3 ? .78 : 1)));
  }
  setAspect(0);
  function load(group) {
    if (!loads.has(group)) loads.set(group, Promise.all([...group.querySelectorAll('img')].map(image => {
      image.src = image.dataset.src;
      return image.decode().catch(() => {});
    })));
    return loads.get(group);
  }
  async function select(index) {
    selected = index;
    setAspect(index);
    const token = ++sequence;
    groups.forEach(group => group.classList.remove('is-assembled'));
    if (!visible) return;
    const group = groups[index];
    await load(group);
    if (token !== sequence || !visible) return;
    // Two frames establish the starting pose without forcing synchronous layout.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token === sequence && visible) group.classList.add('is-assembled');
    }));
  }
  const resize = new ResizeObserver(() => {
    groups.forEach((group,i) => {
      const [x,y,w,h] = matchMedia('(max-width: 600px)').matches ? serviceCollageBounds[i] : [0,0,680,511];
      const scale = Math.min(media.clientWidth / w, media.clientHeight / h);
      group.style.setProperty('--collage-scale', String(scale));
      const layout = group.firstElementChild;
      layout.style.left = (media.clientWidth - w * scale) / 2 - x * scale + 'px';
      layout.style.top = (media.clientHeight - h * scale) / 2 - y * scale + 'px';
    });
  });
  resize.observe(media);
  new IntersectionObserver(([entry]) => {
    const next = entry.isIntersecting;
    if (next === visible) return;
    visible = next;
    if (visible) select(selected);
    else { sequence++; groups.forEach(group => group.classList.remove('is-assembled')); }
  }, {rootMargin: '80px 0px'}).observe(media);
  reduced.addEventListener('change', () => { if (visible) select(selected); });
  return {select};
}
