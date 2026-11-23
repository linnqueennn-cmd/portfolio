import * as THREE from 'three';
import {GLTFLoader} from './assets/vendor/three/GLTFLoader.js';
import {HDRLoader} from './assets/vendor/three/HDRLoader.js';

// One small renderer for the hero crystal.
const host = document.querySelector('.home-gem-slot');
if (host) setupCrystal(host).catch(error => console.warn('Crystal PNG fallback', error));

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
  for (let i = 0; i < pixels.length; i += 4) {
    const blue = environment.type === THREE.HalfFloatType ? THREE.DataUtils.fromHalfFloat(pixels[i + 2]) : pixels[i + 2];
    pixels[i + 2] = environment.type === THREE.HalfFloatType ? THREE.DataUtils.toHalfFloat(blue * .65) : blue * .65;
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
      material.roughness = .19;
      material.clearcoat = .2;
      material.clearcoatRoughness = .24;
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
  let pointer;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let previousTime;
  renderer.setAnimationLoop(now => {
    const elapsed = previousTime === undefined ? 0 : Math.min((now - previousTime) / 1000, .05);
    previousTime = now;
    if (document.hidden || reduced.matches || pointer) return;
    const bounds = host.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    pivot.rotation.y += elapsed * Math.PI * 2 / 3;
    renderer.render(scene, camera);
  });
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = {id: event.pointerId, x: event.clientX, y: event.clientY};
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    pivot.rotation.y += (event.clientX - pointer.x) * .015;
    pivot.rotation.x += (event.clientY - pointer.y) * .015;
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
