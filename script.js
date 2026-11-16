import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const view = document.getElementById('view');

// Renderer: canvas goes inside #view
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
view.appendChild(renderer.domElement);

// Scene + camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
camera.position.set(3, 2, 4);

// Torus (MeshNormalMaterial needs no lights)
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 32, 64),
  new THREE.MeshNormalMaterial()
);
scene.add(torus);

// Orbit / zoom / pan
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Match the canvas to its grid cell. Fires on load and whenever the window resizes.
// The cell's size comes from the grid, never from the canvas, so there is no feedback loop.
new ResizeObserver(() => {
  const { clientWidth: w, clientHeight: h } = view;
  renderer.setSize(w, h, false); // false = don't touch CSS size, the stylesheet owns it
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}).observe(view);

// Render loop
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});