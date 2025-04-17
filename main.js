import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Color is hex code, Radius for number
const createPlanet = (color = 0x3498db, radius = 1) => {
  const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const planetMaterial = new THREE.MeshBasicMaterial({ color: color });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  return planet;
};

// Initializing Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize Scene Creation
const scene = new THREE.Scene();

// Initialize Camera and set position
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Adding Controls
const controls = new OrbitControls(camera, renderer.domElement);

const sun = createPlanet(0xfdb813, 4);
scene.add(sun);

// Light from the Sun
const pointLight = new THREE.PointLight(0xffffff, 1000, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Planet
const planet = createPlanet(0x3498db, 1);

// Planet orbit group
const planetOrbit = new THREE.Object3D();
planetOrbit.add(planet);
scene.add(planetOrbit);

// Position the planet away from the Sun
planet.position.x = 10;

// Moon
const moon = createPlanet(0xffffff, 0.3);

// Moon orbit group (around the planet)
const moonOrbit = new THREE.Object3D();
moonOrbit.add(moon);
planet.add(moonOrbit);

// Position moon relative to the planet
moon.position.x = 2;

function animate() {
  renderer.render(scene, camera);

  // Rotate planet around the sun
  planetOrbit.rotation.y += 0.01;

  // Rotate moon around the planet
  moonOrbit.rotation.y += 0.05;

  // Optional: rotate the planets themselves
  planet.rotation.y += 0.02;
  moon.rotation.y += 0.05;
}
renderer.setAnimationLoop(animate);
