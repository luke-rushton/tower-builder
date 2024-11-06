import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//setting scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

//adding a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xd4cd77 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//adding lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

//controls
const controls = new OrbitControls(camera, renderer.domElement);

//mouse effects
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
//calculate mouse position
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("pointermove", onPointerMove);

//rendering
function animate() {
    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.set(0xff0000);
            intersects[i].object.material.needsUpdate = true;
        }
    } else {
        cube.material.color.set(0xd4cd77);
    }

    //camera controls update
    controls.update();

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
