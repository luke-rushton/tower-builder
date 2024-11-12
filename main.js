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
const materials = [
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
    new THREE.MeshStandardMaterial({ color: 0xd4cd77 }),
];

const cube = new THREE.Mesh(geometry, materials);
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
        console.log(intersects[0].faceIndex);
        //check face
        switch (intersects[0].faceIndex) {
            case 0:
                intersects[0].object.material[0].color.set(0xff0000);
                intersects[0].object.material[0].needsUpdate = true;
                break;
            case 1:
                intersects[0].object.material[0].color.set(0xff0000);
                intersects[0].object.material[0].needsUpdate = true;
                break;
            case 2:
                intersects[0].object.material[1].color.set(0xff0000);
                intersects[0].object.material[1].needsUpdate = true;
                break;
            case 3:
                intersects[0].object.material[1].color.set(0xff0000);
                intersects[0].object.material[1].needsUpdate = true;
                break;
            case 4:
                intersects[0].object.material[2].color.set(0xff0000);
                intersects[0].object.material[2].needsUpdate = true;
                break;
            case 5:
                intersects[0].object.material[1].color.set(0xff0000);
                intersects[0].object.material[1].needsUpdate = true;
                break;
            case 6:
                intersects[0].object.material[3].color.set(0xff0000);
                intersects[0].object.material[3].needsUpdate = true;
                break;
            case 7:
                intersects[0].object.material[1].color.set(0xff0000);
                intersects[0].object.material[1].needsUpdate = true;
                break;
            case 8:
                intersects[0].object.material[4].color.set(0xff0000);
                intersects[0].object.material[4].needsUpdate = true;
                break;
            case 9:
                intersects[0].object.material[1].color.set(0xff0000);
                intersects[0].object.material[1].needsUpdate = true;
                break;
            case 10:
                intersects[0].object.material[5].color.set(0xff0000);
                intersects[0].object.material[5].needsUpdate = true;
                break;
            case 11:
                intersects[0].object.material[5].color.set(0xff0000);
                intersects[0].object.material[5].needsUpdate = true;
        }
    } else {
        cube.material[0].color.set(0xd4cd77);
        cube.material[1].color.set(0xd4cd77);
        cube.material[2].color.set(0xd4cd77);
        cube.material[3].color.set(0xd4cd77);
        cube.material[4].color.set(0xd4cd77);
        cube.material[5].color.set(0xd4cd77);
    }

    //camera controls update
    controls.update();

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
