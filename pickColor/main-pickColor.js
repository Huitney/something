import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { CCube } from "./colorCube-pickColor.js";

var camera, scene, renderer;
var pickables = [], raycaster;
var mouse = new THREE.Vector2();
var colors = [];
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
	
	var plane = new THREE.Mesh(new THREE.PlaneGeometry( 10, 10 ), new THREE.LineBasicMaterial({color: 'white'}));
	//plane.rotation.x = Math.PI/2;
	scene.add( plane );
	
	var r = Math.random(), g = Math.random(), b = Math.random();
	var cd = Math.floor(Math.random() * 4); // the different color
	
	var c1 = new CCube([-2.5, -2.5, 1], r, g, b);
	var c2 = new CCube([2.5, -2.5, 1], r, g, b);
	var c3 = new CCube([-2.5, 2.5, 1], r, g, b);
	var c4 = new CCube([2.5, 2.5, 1], r, g, b);
	
	colors.push(c1, c2, c3, c4);
	colors[cd].changeColor( r, g, Math.abs(b-0.1) ); // the different color
	colors[cd].mesh.ans = true; // the different color
	
	//c.material.color = new THREE.Color( r, g, Math.abs(b-0.08) );
	//scene.add(colors);
	
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
		if(intersects[0].object.ans){
			console.log(d);
			var r = Math.random(), g = Math.random(), b = Math.random();
			var cd = Math.floor(Math.random() * 4); // the different color
			for(var i = 0;i < 4;i++){
				if(i != cd){
					colors[i].changeColor( r, g, b );
					colors[i].mesh.ans = false;
					colors[i].redframe.visible = false;
				}
			}
			
			if(r >= d)                                 // the different color
				colors[cd].changeColor( r-d, g, b );
			else if(g >= d)
				colors[cd].changeColor( r, g-d, b );
			else if(b >= d)
				colors[cd].changeColor( r, g, b-d );
			else 
				colors[cd].changeColor( r, g, b+d );
			colors[cd].mesh.ans = true;
			colors[cd].redframe.visible = false;
			
			d -= (0.002 * d);
			s += 1;
			document.getElementById("score").innerHTML = "Score = " + s.toString();
		}
		else{
			intersects[0].object.ans
			i = 0;
			while(colors[i].mesh.ans != true){ i++; }// show the answer
			colors[i].redframe.visible = true;
			document.getElementById("score").innerHTML = "Your final score = " + s.toString() + "<br>pick the answer to restart";
			d = 0.2;
			s = -1;
		}
	}
}

export{scene, pickables};