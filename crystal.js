import * as THREE from 'three';
import {GLTFLoader} from './assets/vendor/three/GLTFLoader.js';
import {HDRLoader} from './assets/vendor/three/HDRLoader.js';

// One small renderer for the hero crystal.
const host = document.querySelector('.home-gem-slot');
if (host) setupCrystal(host).catch(error => console.warn('Crystal could not load', error));

async function setupCrystal(host) {
  const [gltf, environment] = await Promise.all([
    new GLTFLoader().loadAsync('assets/home/plumbob-reflective.glb'),
    new HDRLoader().loadAsync('assets/home/plumbob-reflections.hdr')
  ]);
  const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, powerPreference: 'low-power'});
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  // Tint the existing HDR reflections; preserve their soft spatial distribution.
  const pixels = environment.image.data;
  const halfFloat = environment.type === THREE.HalfFloatType;
  const decode = value => halfFloat ? THREE.DataUtils.fromHalfFloat(value) : value;
  const encode = value => halfFloat ? THREE.DataUtils.toHalfFloat(value) : value;
  for (let i = 0; i < pixels.length; i += 4) {
    const red = decode(pixels[i]), green = decode(pixels[i + 1]), blue = decode(pixels[i + 2]);
    // Compress HDR peaks without changing the reflection layout or relative hue.
    const peak = Math.max(red, green, blue);
    const gain = peak > 3 ? (3 + Math.log1p(peak - 3) * .8) / peak : 1;
    pixels[i] = encode(red * gain);
    pixels[i + 1] = encode(green * gain);
    pixels[i + 2] = encode(blue * gain * .65);
  }
  environment.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflections = pmrem.fromEquirectangular(environment);
  scene.environment = reflections.texture;
  environment.dispose();
  pmrem.dispose();

  const model = gltf.scene;
  model.traverse(object => {
    if (!object.isMesh) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach(material => {
      material.color.set('#51b820');
      material.envMapIntensity = .8;
      material.metalness = 0;
      material.transmission = .86;
      material.roughness = .23;
      material.clearcoat = .12;
      material.clearcoatRoughness = .34;
    });
  });
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  // Transform the scene node, preserving every original vertex and index.
  model.scale.setScalar(2 / size.y);
  model.position.copy(center).multiplyScalar(-2 / size.y);
  const pivot = new THREE.Group();
  pivot.add(model);
  // A fixed, slight front tilt exposes depth while the long axis stays upright.
  pivot.rotation.x = .1;
  pivot.rotation.y = .35;
  scene.add(pivot);

  // Equal, soft reflections around the vertical axis avoid isolated white flashes.
  for (let index = 0; index < 4; index++) {
    const angle = index * Math.PI / 2;
    const light = new THREE.DirectionalLight(0xe1ef89, .35);
    light.position.set(Math.cos(angle) * 4, 3, Math.sin(angle) * 4);
    scene.add(light);
    const lower = new THREE.DirectionalLight(0xaed90d, .18);
    lower.position.set(Math.cos(angle) * 4, -3, Math.sin(angle) * 4);
    scene.add(lower);
  }
  const camera = new THREE.OrthographicCamera(-.6, .6, 1.1, -1.1, .1, 20);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);
  function render() {
    const {width, height} = host.getBoundingClientRect();
    if (!width || !height || host.hidden) return;
    const halfHeight = Math.max(1.02, (size.x / size.y) * height / width * 1.02);
    camera.left = -halfHeight * width / height;
    camera.right = halfHeight * width / height;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(Math.min(width, 128), Math.min(height, 256), false);
    renderer.render(scene, camera);
    host.classList.add('crystal-3d-ready');
  }
  const observer = new ResizeObserver(render);
  observer.observe(host);
  const canvas = renderer.domElement;
  const journey = setupCrystalJourney(host, canvas);
  let pointer;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let previousTime;
  renderer.setAnimationLoop(now => {
    const elapsed = previousTime === undefined ? 0 : Math.min((now - previousTime) / 1000, .05);
    previousTime = now;
    const motion = journey.update(now, elapsed);
    if (document.hidden || reduced.matches || pointer) return;
    if (motion.visible === false) return;
    if (!motion.active) {
      const bounds = host.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    }
    if (motion.active && !motion.spinning && !motion.moving) {
      // Settle on a readable faceted view, rather than stopping edge-on.
      const rest = Math.round((pivot.rotation.y - .35) / (Math.PI * 2)) * Math.PI * 2 + .35;
      if (Math.abs(rest - pivot.rotation.y) < .0001) return;
      pivot.rotation.y += (rest - pivot.rotation.y) * (1 - Math.exp(-elapsed * 9));
    } else pivot.rotation.y += elapsed * Math.PI * 2 / 3 * motion.speed;
    renderer.render(scene, camera);
    motion.afterRender?.();
  });
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = {id: event.pointerId, x: event.clientX, y: event.clientY};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    pivot.rotation.y += (event.clientX - pointer.x) * .015;
    pivot.rotation.x = THREE.MathUtils.clamp(pivot.rotation.x + (event.clientY - pointer.y) * .006, -.18, .18);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    render();
  });
  canvas.addEventListener('lostpointercapture', () => { pointer = null; });
  canvas.addEventListener('pointerup', event => {
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  });
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    host.classList.remove('crystal-3d-ready');
  });
  renderer.domElement.addEventListener('webglcontextrestored', render);
  render();
}

// Keep the original slot in the layout and move just its canvas.
// One renderer, original lighting/material, no scroll interception or new library.
function setupCrystalJourney(host, canvas) {
  const desktop = matchMedia('(min-width: 1101px), (min-width: 601px) and (orientation: landscape)');
  const compact = matchMedia('(max-width: 600px), (max-width: 1100px) and (orientation: portrait)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.createElement('span');
  layer.className = 'crystal-journey';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  const tabs = document.querySelector('.work-tabs');
  const about = [...document.querySelectorAll('.about-slot')];
  const services = [...document.querySelectorAll('.service-option')];
  const serviceSection = document.querySelector('#services');
  const serviceStop = document.querySelector('#services-title .crystal-stop');
  const process = document.querySelector('#process');
  const pricing = document.querySelector('#pricing');
  const contacts = document.querySelector('#contacts');
  const processStop = document.querySelector('#process-title .crystal-stop');
  const pricingStop = document.querySelector('#pricing-title .crystal-stop');
  const footer = document.querySelector('#contacts-title .contact-title-copy');
  const footerRange = document.createRange();
  footerRange.selectNodeContents(footer);
  const tabGem = document.querySelector('.work-gem');
  const local = setupLocalCrystals(canvas, about, services, contacts);
  let compactMode = false;
  let active = false, current, position, from, started = 0, lastScroll = scrollY;
  let restoreWork = location.hash === '#work';
  let workPinned = false;
  let settled = false;
  let attachedTo = null;
  let aboutIndex = 0, appearing = false;
  let dirtyUntil = 0, previousMotion = {active: false, speed: 1};
  const invalidate = () => { dirtyUntil = performance.now() + 900; };
  addEventListener('scroll', invalidate, {passive: true});
  addEventListener('resize', invalidate);
  tabs?.addEventListener('click', () => { workPinned = true; restoreWork = false; invalidate(); });
  const serviceObserver = new MutationObserver(invalidate);
  services.forEach(row => serviceObserver.observe(row, {attributes: true, attributeFilter: ['class']}));
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => value * value * (3 - 2 * value);
  const box = element => element.getBoundingClientRect();
  const point = (element, height, side = 'left') => {
    const r = box(element);
    return {x: side === 'inside' ? r.left + r.width / 2 : side === 'right' ? r.right + height * .32 + 8 : r.left - height * .32 - 8,
      y: r.top + r.height / 2, height};
  };
  const passed = element => box(element).top <= innerHeight * (current === element ? .66 : .58);
  function update(now, elapsed) {
    const mobile = compact.matches;
    const enabled = (desktop.matches || mobile) && !reduced.matches && !!contacts;
    if (enabled !== active || mobile !== compactMode) {
      active = enabled;
      compactMode = mobile;
      document.body.classList.toggle('crystal-journey-enabled', active);
      document.body.classList.toggle('crystal-local-enabled', active && mobile);
      (active ? layer : host).append(canvas);
      if (attachedTo) { document.body.append(layer); layer.style.cssText = ''; attachedTo = null; }
      layer.hidden = !active;
      local.reset();
      current = null;
      position = null;
      settled = false;
      aboutIndex = 0;
      if (restoreWork) layer.hidden = true;
      invalidate();
    }
    if (!active) return {active: false, speed: 1};
    // Layout is read only while scrolling, resizing or settling a transition.
    if (now > dirtyUntil && position && settled) return {...previousMotion, moving: false, speed: previousMotion.spinning ? 1 : 0};
    const scrollDelta = scrollY - lastScroll;
    lastScroll = scrollY;
    const hero = box(host);
    let target = {x: hero.left + hero.width / 2, y: hero.top + hero.height / 2, height: hero.height};
    let key = host, spinning = true, continuous = false;
    const tabRect = box(tabGem);
    const tabEnd = Math.max(1, box(tabs).top + scrollY - innerHeight * .56);
    if (scrollY <= 1) workPinned = false;
    if (workPinned) {
      target = point(tabGem, tabRect.height, 'inside');
      key = mobile ? tabs : tabGem.parentElement;
    } else if (scrollY > 0 && scrollY < tabEnd) {
      // A soft right-hand bend connects the hero to the selected work tab.
      const t = ease(clamp(scrollY / tabEnd));
      target.x += (tabRect.left + tabRect.width / 2 - target.x) * t + Math.sin(Math.PI * t) * (mobile ? innerWidth <= 600 ? 0 : 24 : 150);
      target.y += (tabRect.top + tabRect.height / 2 - target.y) * t;
      target.height += (tabRect.height - target.height) * t;
      continuous = true;
    } else if (scrollY >= tabEnd) {
      target = point(tabGem, tabRect.height, 'inside'); key = mobile ? tabs : tabGem.parentElement;
      if (!mobile) {
      if (passed(about[0])) {
        // Scroll selects a stop. Different forward/back thresholds prevent
        // retriggering a hop on every small change of scroll direction.
        const centre = index => { const r = box(about[index].querySelector('.about-panel')); return r.top + r.height / 2; };
        while (aboutIndex < about.length - 1 && centre(aboutIndex + 1) < innerHeight * .60) aboutIndex++;
        while (aboutIndex > 0 && centre(aboutIndex) > innerHeight * .68) aboutIndex--;
        const gem = about[aboutIndex].querySelector('.about-gem');
        target = point(gem, Math.min(32, box(gem).height), 'inside'); key = about[aboutIndex]; spinning = false;
      }
      if (passed(serviceSection)) {
        target = point(serviceStop, 36, 'inside'); key = serviceSection; spinning = true;
      }
      if (passed(process)) {
        target = point(processStop, 36, 'inside');
        key = process; spinning = true;
      }
      if (passed(pricing)) {
        target = point(pricingStop, 36, 'inside');
        key = pricing; spinning = true;
      }
      if (passed(contacts)) {
        const text = footerRange.getBoundingClientRect();
        target = {x: text.right + 34, y: text.top + text.height / 2, height: 56};
        key = contacts; spinning = true;
      }
      }
    }
    if (restoreWork) {
      if (key === host) {
        layer.hidden = true;
        previousMotion = {active, spinning: false, moving: false, speed: 0, visible: false};
        return previousMotion;
      }
      if (key === tabs || key === tabGem.parentElement) {
        current = key;
        position = {...target};
        from = null;
        started = now - (mobile ? 620 : 400);
        settled = true;
        appearing = false;
        restoreWork = false;
      }
    }
    target.x = Math.max(18, Math.min(innerWidth - 24, target.x));
    if (continuous && attachedTo) {
      document.body.append(layer);
      layer.style.cssText = '';
      attachedTo = null;
    }
    if (scrollY <= 1) {
      current = host;
      position = {...target};
      from = null;
      started = now - (mobile ? 620 : 400);
      settled = true;
      appearing = false;
    } else if (workPinned) {
      current = key;
      position = {...target};
      from = null;
      started = now - (mobile ? 620 : 400);
      settled = true;
      appearing = false;
    } else if (key !== current) {
      const wasVisible = position && !layer.hidden;
      const old = wasVisible ? box(layer) : null;
      from = old ? {x: old.left + old.width / 2, y: old.top + old.height / 2 + scrollDelta, height: old.height} : position ? {...position} : null;
      if (attachedTo) {
        document.body.append(layer);
        layer.style.cssText = '';
        attachedTo = null;
      }
      const enteringAbout = about.includes(key) && !about.includes(current) && current !== serviceSection;
      const separateEntry = enteringAbout || key === process || key === pricing || key === contacts;
      appearing = !mobile && separateEntry && !wasVisible;
      if (appearing) from = {x: target.x, y: target.y - 72 + scrollDelta, height: target.height};
      started = now;
      current = key;
      settled = false;
    }
    const t = clamp((now - started) / (mobile ? 620 : 400));
    settled = t === 1 || continuous;
    if (continuous || !from || t === 1) position = {...target};
    else {
      from.y -= scrollDelta;
      const blend = ease(t);
      position = {x: from.x + (target.x - from.x) * blend,
        y: from.y + (target.y - from.y) * blend - Math.sin(Math.PI * t) * (mobile ? innerWidth <= 600 ? 0 : 8 : 6),
        height: from.height + (target.height - from.height) * blend};
    }
    // Scale the same canvas instead of reallocating the WebGL drawing buffer.
    const scale = position.height / Math.max(1, hero.height);
    layer.style.width = hero.width + 'px';
    layer.style.height = hero.height + 'px';
    layer.style.transform = `translate3d(${position.x - hero.width * scale / 2}px,${position.y - position.height / 2}px,0) scale(${scale})`;
    layer.style.opacity = appearing && !continuous ? String(ease(t)) : '1';
    if (settled && !continuous) {
      const anchor = key === host ? host : key === tabs || key === tabGem.parentElement ? tabGem :
        about.includes(key) ? key.querySelector('.about-gem') : key === serviceSection ? serviceStop :
        key === process ? processStop : key === pricing ? pricingStop : footer;
      anchor.classList.add('crystal-anchor');
      if (attachedTo !== anchor) { anchor.append(layer); attachedTo = anchor; }
      const insideSlot = anchor !== footer;
      const height = insideSlot ? anchor.clientHeight : target.height;
      const width = height * hero.width / hero.height;
      layer.style.position = 'absolute';
      layer.style.width = width + 'px';
      layer.style.height = height + 'px';
      const text = insideSlot ? null : footerRange.getBoundingClientRect();
      const anchorBox = insideSlot ? null : box(anchor);
      layer.style.left = (insideSlot ? (anchor.clientWidth - width) / 2 : text.right - anchorBox.left + 20) + 'px';
      layer.style.top = (insideSlot ? (anchor.clientHeight - height) / 2 : text.top + text.height / 2 - anchorBox.top - height / 2) + 'px';
      layer.style.transform = 'none';
    }
    layer.dataset.stop = key.id || (key === host ? 'home' : key === tabs || key === tabGem.parentElement ? 'work-tabs' : key.className.split(' ')[0]);
    const moving = continuous || t < 1;
    previousMotion = {active, spinning, moving, speed: moving ? 1.35 + Math.min(1, Math.abs(scrollDelta) / Math.max(1, elapsed * 1600)) : spinning ? 1 : 0};
    if (!mobile) previousMotion.speed = moving ? 1.15 : spinning ? 1 : 0;
    if (mobile && innerWidth <= 600) previousMotion.speed = 1;
    if (mobile) {
      const mainVisible = position.y + position.height / 2 > 0 && position.y - position.height / 2 < innerHeight;
      layer.hidden = !mainVisible;
      const localsVisible = local.update(now, scrollDelta, hero);
      previousMotion.visible = mainVisible || localsVisible;
      previousMotion.afterRender = local.draw;
    } else {
      previousMotion.visible = position.y + position.height / 2 > 0 && position.y - position.height / 2 < innerHeight;
      layer.hidden = !previousMotion.visible;
    }
    return previousMotion;
  }
  return {update};
}

// Local mobile/tablet accents share the same rendered frame and WebGL context.
// Only visible 2D copies are painted: no extra model, HDR or rendering scenes.
function setupLocalCrystals(source, about, services, contacts) {
  const footerSlot = document.createElement('span');
  footerSlot.className = 'compact-crystal-slot';
  footerSlot.setAttribute('aria-hidden', 'true');
  (contacts?.querySelector('.contact-title-copy') || contacts?.querySelector('h2'))?.append(footerSlot);
  // Measure the actual text, not a button's enlarged touch target or flex column.
  const serviceRanges = new Map(services.map(row => {
    const range = document.createRange();
    range.selectNodeContents(row.querySelector('button'));
    return [row, range];
  }));
  const groups = ['about', 'services', 'contacts'].map(name => {
    const layer = document.createElement('span');
    layer.className = 'crystal-journey crystal-local';
    layer.dataset.block = name;
    layer.hidden = true;
    layer.setAttribute('aria-hidden', 'true');
    const canvas = document.createElement('canvas');
    layer.append(canvas);
    document.body.append(layer);
    return {layer, canvas, context: canvas.getContext('2d'), current: null, pose: null, from: null, started: 0, visible: false};
  });
  const rect = element => element.getBoundingClientRect();
  const pose = (element, height) => {
    const r = rect(element);
    return {x: r.left + r.width / 2, y: r.top + r.height / 2, height};
  };
  function update(now, scrollDelta, hero) {
    const phone = innerWidth <= 600;
    let card = about[0];
    about.forEach(slot => { if (rect(slot).top < innerHeight * .6) card = slot; });
    const row = services.find(item => item.classList.contains('is-active')) || services[0];
    const targets = [card?.querySelector('.about-gem'), row?.querySelector('h3'), footerSlot];
    groups.forEach((group, index) => {
      const target = targets[index];
      if (!target) return;
      const r = rect(target);
      const height = index === 0 ? Math.min(30, r.height) : index === 1 && innerWidth <= 600 ? 26 : index === 2 ? Math.min(48, r.height) : 32;
      const end = pose(target, height);
      if (index === 1) { end.x = r.left - 13; end.y = r.top + Math.min(r.height, 44) / 2; }
      if (phone && index === 1) {
        const text = serviceRanges.get(row).getClientRects()[0] || serviceRanges.get(row).getBoundingClientRect();
        end.y = text.top + text.height / 2;
      }
      if (index < 3) {
        // Attach to the actual card/title: ordinary scrolling must never become
        // a second animation of a fixed overlay following its animated parent.
        const anchor = index === 2 ? footerSlot : target;
        const changed = anchor !== group.current;
        const old = changed && group.current && !group.layer.hidden ? rect(group.layer) : null;
        if (changed) {
          group.layer.getAnimations().forEach(animation => animation.cancel());
          anchor.append(group.layer);
          group.current = anchor;
        }
        const localHeight = index === 0 ? target.clientHeight : height;
        const width = localHeight * hero.width / hero.height;
        const anchorRect = rect(anchor);
        group.anchored = true;
        group.layer.style.position = 'absolute';
        group.layer.style.width = width + 'px';
        group.layer.style.height = localHeight + 'px';
        group.layer.style.left = (index === 0 || index === 2 ? (target.clientWidth - width) / 2 : -13 - width / 2) + 'px';
        group.layer.style.top = (index === 0 || index === 2 ? (target.clientHeight - localHeight) / 2 : end.y - anchorRect.top - height / 2) + 'px';
        group.layer.style.transform = 'none';
        group.visible = anchorRect.bottom > 0 && anchorRect.top < innerHeight && anchorRect.width > 0;
        group.layer.hidden = !group.visible;
        if (changed && old && group.visible) {
          const next = rect(group.layer);
          const dx = old.left - next.left, dy = old.top - next.top;
          const frames = [{transform: `translate(${dx}px,${dy}px)`}];
          if (!phone) frames.push({transform: `translate(${dx / 2}px,${dy / 2 - 12}px)`});
          frames.push({transform: 'translate(0,0)'});
          group.layer.animate(frames, {duration: phone ? 220 : 620, easing: 'ease-out'});
        }
        group.pose = end;
        return;
      }
      if (group.anchored) {
        document.body.append(group.layer);
        group.layer.style.cssText = '';
        group.layer.getAnimations().forEach(animation => animation.cancel());
        group.anchored = false;
        group.current = null;
        group.pose = null;
      }
      if (target !== group.current) {
        group.from = group.pose ? {...group.pose} : null;
        group.started = now;
        group.current = target;
      }
      const t = Math.min(1, (now - group.started) / (phone ? 220 : 620));
      if (!group.from || t === 1) group.pose = end;
      else {
        group.from.y -= scrollDelta;
        const blend = t * t * (3 - 2 * t);
        group.pose = {x: group.from.x + (end.x - group.from.x) * blend,
          y: group.from.y + (end.y - group.from.y) * blend - Math.sin(Math.PI * t) * (phone ? 0 : 12),
          height: group.from.height + (end.height - group.from.height) * blend};
      }
      const p = group.pose;
      group.visible = p.y + p.height > 0 && p.y - p.height < innerHeight && (r.width > 0 || (phone && index === 2));
      group.layer.hidden = !group.visible;
      if (!group.visible) return;
      const scale = p.height / hero.height;
      group.layer.style.width = hero.width + 'px';
      group.layer.style.height = hero.height + 'px';
      group.layer.style.transform = `translate3d(${p.x - hero.width * scale / 2}px,${p.y - p.height / 2}px,0) scale(${scale})`;
    });
    return groups.some(group => group.visible);
  }
  function draw() {
    groups.forEach(group => {
      if (!group.visible) return;
      if (group.canvas.width !== source.width || group.canvas.height !== source.height) {
        group.canvas.width = source.width;
        group.canvas.height = source.height;
      }
      group.context.clearRect(0, 0, source.width, source.height);
      group.context.drawImage(source, 0, 0);
    });
  }
  function reset() {
    groups.forEach(group => {
      if (group.anchored) { document.body.append(group.layer); group.layer.style.cssText = ''; group.anchored = false; }
      group.layer.getAnimations().forEach(animation => animation.cancel());
      group.layer.hidden = true; group.visible = false; group.pose = null; group.current = null;
    });
  }
  return {update, draw, reset};
}
