import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { explosion, buildSprite, readModel, setUpOffsetArray } from "./explo-shootingGame.js";
import { gunPos, gunX, gunY } from "./explo-shootingGame.js";
import { newBullet, shootingAnimate } from "./bullets-shootingGame.js";

var camera, scene, renderer;
var sceneHUD, cameraHUD;
var boxs, gun;
var shootDirection = [new THREE.Vector3(0, 0, 0),], bullets = [];


export function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor (0x888888);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 200;
	cameraHUD = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	cameraHUD.position.z = 200;
	
	let controls = new OrbitControls(camera, renderer.domElement);
	
	var light = new THREE.PointLight(0xffffff);
	light.position.set(100, 300, 200);
	scene.add(light);
	
	
	var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
	var axes = new THREE.AxesHelper(10);
	scene.add(axes);

	////////////////////////////////////////////////////////////
	window.addEventListener("keydown", keyboardEvent);
	
	renderer.autoClear = false;
	sceneHUD = new THREE.Scene();
	var light2 = light.clone();
	sceneHUD.add(light2);
	
	//target
	var box = new THREE.Mesh(new THREE.BoxGeometry( 10, 10, 10 ),
	new THREE.MeshLambertMaterial({
	color: 0xff1234
    }));
	boxs = [];
	for (let i = 0; i < 5; i++) {
		let bb = box.clone();
		bb.position.set ((-1+Math.random()*2)*100, (-1+Math.random()*2)*100, (-1+Math.random()*2)*100);
		boxs.push (bb);
		scene.add (bb);
	}
	
	//gun
	gun = readModel('SS 55 Gun 3d modelsModelsSS 55 GUN');
	
	//bullet
	var bulletGeometry = new THREE.SphereGeometry( 1, 32, 32 );
	var bulletMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
	var bullet = new THREE.Mesh( bulletGeometry, bulletMaterial );
	bullets.push(bullet);
	
	//explosion
	var loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	setUpOffsetArray();
	loader.load(
		'img/eknrr9t.png',

		function(texture) {
			var texMat = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true, // cutout texture: set transparent: true
				side: THREE.DoubleSide
			});
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			
			var sprite = buildSprite(texMat);
		},
		function(xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function(xhr) {
			console.log('An error happened');
		}
	);
	
	shootingAnimate();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
	
	onWindowResize();
	renderer.clear(true);
	requestAnimationFrame(animate);
	render();
	
}

function render() {
	renderer.render(scene, camera);
	renderer.render(sceneHUD, cameraHUD);
}

function keyboardEvent(event){
	
	var step = 0.01;
	var distance = camera.clone().position.sub(new THREE.Vector3(0, 0, 0));
	if(event.keyCode === 37){//left
		camera.rotation.y += Math.PI * step;
	}
	else if(event.keyCode === 38){//forward
		camera.rotation.x += Math.PI * step;
	}
	else if(event.keyCode === 39){//right
		camera.rotation.y -= Math.PI * step;
	}
	else if(event.keyCode === 40){//backward
		camera.rotation.x -= Math.PI * step;		
	}
	else if(event.keyCode === 32){//space to shoot
		newBullet();
	}
}



export{scene, sceneHUD, bullets, camera, gun};