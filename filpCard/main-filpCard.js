import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Card, buildCard } from "./card-flipCard.js";

var camera, scene, renderer;
var pickables = [], raycaster;
var mouse = new THREE.Vector2();
var cards = [];
var d = 0.2; // difficulty
var s = 0; // score

export function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor (0x888888);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera(-window.innerWidth/100, window.innerWidth/100, window.innerHeight/100, -window.innerHeight/100, -10, 50);
	camera.position.z = 10;
	//let controls = new OrbitControls(camera, renderer.domElement);

	////////////////////////////////////////////////////////////
	
	var plane = buildCard();
	//plane.rotation.x = Math.PI/2;
	scene.add( plane );
	
	var cd = Math.floor(Math.random() * 4); // the different color
	
	var c1 = new Card([2.5, 2.5, 1], 1, plane[0], plane[4]);
	var c2 = new Card([-2.5, 2.5, 1], 2, plane[1], plane[5]);
	var c3 = new Card([-2.5, -2.5, 1], 3, plane[2], plane[6]);
	var c4 = new Card([2.5, -2.5, 1], 4, plane[3], plane[7]);
	
	cards.push(c1, c2, c3, c4);
	cards[cd].flip(); // the different card
	
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener ('pointerdown', onPointerDown, false);
	raycaster = new THREE.Raycaster();

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
	onWindowResize();
	requestAnimationFrame(animate);
	render();
}

function render() {
  renderer.render(scene, camera);
}

function onPointerDown (event) {
	
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	
	if (intersects.length > 0) {
		switch(intersects[0].object.n){
			case 1:
				cards[2].flip();
				cards[4].flip();
				break;
			case 2:
				cards[1].flip();
				cards[3].flip();
				break;
			case 3:
				cards[2].flip();
				cards[4].flip();
				break;
			case 4:
				cards[1].flip();
				cards[3].flip();
				break;
		}
		
	}
}

export{scene, pickables};