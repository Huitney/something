import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { People, peopleJump } from "./people-stepOnColor.js";
import { createBasicSquares, Square } from "./square-stepOnColor.js";

var camera, scene, renderer;
var pickables = [], raycaster;
var mouse = new THREE.Vector2();
var peo = false;
var clock = new THREE.Clock();
var floorS = new Array();
var keyboard;


export function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor (0x888888);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(50, 50, 0);
	/*var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);*/
	let controls = new OrbitControls(camera, renderer.domElement);

	////////////////////////////////////////////////////////////
	
	var plane = new THREE.Mesh(new THREE.PlaneGeometry( 80, 100 ), new THREE.LineBasicMaterial({color: 'black'}));
	plane.rotation.x = -Math.PI/2;
	plane.visible = false;
	scene.add( plane );
	
	keyboard = new KeyboardState();
	
	createBasicSquares(floorS);
	peo = new People(new THREE.Vector3(-50, 0, 0), 'cyan');
	
	
	/*
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener ('pointerdown', onPointerDown, false);
	raycaster = new THREE.Raycaster();
	*/
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
	onWindowResize();
	keyboard.update();
	let dt = clock.getDelta();

	if(peo){//camera position update
		camera.position.copy(peo.pos.clone().sub(peo.cameraPoint.position.clone()));
		camera.lookAt(peo.pos);
	}
	
	if (keyboard.down('space') & peo.canJump) {// people jump
		setTimeout(peopleJump, 0, peo);
		peo.canJump = false;
		peo.jumpUp = true;
	}else if (keyboard.pressed('left')) {// people see left
		peo.moveSide('left', dt);
	}else if (keyboard.pressed('right')) {// people see right
		peo.moveSide('right', dt);
	}
	
	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

/*
function onPointerDown (event) {
	
	event.preventDefault();  // may not be necessary
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(pickables, true);
	
	if (intersects.length > 0) {
	}
}*/

export{scene, pickables, floorS};