import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { scene } from "./main-stepOnColor.js";

export class People{
	constructor(pos, color) {
		this.pos = pos;
		this.mesh = createPeople(pos, color);
		this.dir = new THREE.Vector3(50, 50, 0);
		this.angle = Math.PI;
		this.canJump = true;
		this.jumpUp = true;
		
		this.cameraPoint = new THREE.Mesh(new THREE.SphereGeometry(1, 32), new THREE.MeshBasicMaterial());
		this.cameraPoint.position.set(50, -50, 0);
		
		scene.add(this.mesh);
	}
		
	moveSide(side, dt){
		
		if(side === 'left'){//turn left
			this.angle += dt*2;
		}else if(side === 'right'){//turn right
			this.angle -= dt*2;
		}
		this.cameraPoint.position.x = -Math.cos(this.angle)*50;
		this.cameraPoint.position.z = Math.sin(this.angle)*50;
	}
}

export function peopleJump(peo){
	
	let jumpT = 0.2;//time between two jump function
	let jDis = 10, jHigh = 5;//jump distance & high
	
	let y = Math.sin(Math.PI*jumpT)*5;
	//let forw = Math.cos(Math.PI/jumpT)*5;//forward distance
	let x = (peo.pos.clone().x - peo.cameraPoint.position.clone().x)*jumpT/5;
	let z = (peo.pos.clone().z - peo.cameraPoint.position.clone().z)*jumpT/5;
	//console.log(x, y, z);
	
	if(peo.pos.y < 5 & peo.jumpUp){
		peo.pos.y += y;
		peo.cameraPoint.position.y += y;
	}else if(peo.pos.y >= 5 & peo.jumpUp){
		peo.pos.y -= y;
		peo.cameraPoint.position.y -= y;
		peo.jumpUp = false;
	}else{
		peo.pos.y -= y;
		peo.cameraPoint.position.y -= y;
	}
	
	peo.pos.x -= x;
	peo.pos.z -= z;
	peo.mesh.position.copy(peo.pos);
	
	//break the loop
	if(peo.pos.y <= 0){
		peo.pos.y = 0;
		peo.mesh.position.y = 0;
		peo.cameraPoint.position.y = -50;
		peo.canJump = true;
	}else{
		setTimeout(peopleJump, jumpT*200, peo);
	}
}

function createPeople(p, c){
	var mesh = new THREE.Group();
	
	var body = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 5, 32), new THREE.MeshBasicMaterial( { color: c } ));
	var head = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial( { color: c } ));
	body.position.y = 2.5;
	head.position.y = 6.5;
	
	mesh.add(body, head);
	mesh.position.x = p.x;
	mesh.position.y = p.y;
	mesh.position.z = p.z;
	
	return mesh;
}