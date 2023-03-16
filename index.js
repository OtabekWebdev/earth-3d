import * as THREE from "three";
import { OrbitControls } from "orbit";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(
  -27.283126032873493,
  11.750491786542591,
  -0.12108546460577012
);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: c });
renderer.setSize(window.innerWidth, window.innerHeight);
bg.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const cloud = new THREE.Mesh(
  new THREE.SphereGeometry(10.01, 500, 500),
  new THREE.MeshPhysicalMaterial({
    alphaMap: new THREE.TextureLoader().load("./img/cloud.jpg"),
    displacementMap: new THREE.TextureLoader().load(
      "./img/cloud.jpg"
    ),
    displacementBias: 0,
    displacementScale: 1,
    transparent: true,
  })
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 500, 500),
  new THREE.MeshPhysicalMaterial({
    bumpMap: new THREE.TextureLoader().load("./img/8k_earth_normal_map2.png"),
    bumpScale: 0.05,
    displacementMap: new THREE.TextureLoader().load(
      "./img/8k_earth_specular_map.png"
    ),
    displacementBias: 0,
    displacementScale: -0.05,
    map: new THREE.TextureLoader().load("./img/day.jpg"),
  })
);
earth.rotation.y = Math.PI / 1.5;
earth.add(cloud);
scene.add(earth);

let light = new THREE.PointLight(0xffffff, 1.3);
light.position.set(0, 50, 200);
scene.add(light);
// let amolight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(amolight);

// camera.position.z = 50;
function animate() {
  earth.rotation.y += 0.0001;
  cloud.rotation.y += 0.0002;
  console.log(camera.position.x, camera.position.y, camera.position.z);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
