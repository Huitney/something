import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { floorS, scene } from "./main-stepOnColor.js";

export class Square{
	constructor(pos, color) {
		this.pos = pos;
		this.color = color;
		this.mesh = createSquare(pos, color);
		
		scene.add(this.mesh);
	}
	
	changeColor(c){
		this.color = c;
		this.mesh.body.mesh.color = c;
	}
}

function createSquare(p, c){
	var mesh = new THREE.Group();
	
	var body = new THREE.Mesh(new THREE.BoxGeometry(9.5, 9.5, 0.5), new THREE.MeshBasicMaterial( { color: c } ));
	var fram = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial( { color: 0xfffbed } ));//frame
	
	mesh.add(body, fram);
	mesh.rotation.x = -Math.PI/2;
	mesh.position.x = p.x;
	mesh.position.y = p.y;
	mesh.position.z = p.z;
	
	return mesh;
}

export function createBasicSquares(floorS){
		
	for(var i = 0;i<10;i++){
		for(var j = 0;j<8;j++){
			if(i<1 || i>8 || j<1 || j>6)
				floorS.push(new Square(new THREE.Vector3(-50+i*10, 0, -40+j*10), 0xfffbed));
			else
				floorS.push(new Square(new THREE.Vector3(-50+i*10, 0, -40+j*10), 'black'));
			//console.log(i, j);
		}
	}
	
}
