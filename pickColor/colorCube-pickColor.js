import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { scene, pickables } from "./main-pickColor.js";

export class CCube {
	constructor(pos, r, g, b){
		this.mesh = new THREE.Mesh(new THREE.PlaneGeometry( 4, 4 ), new THREE.LineBasicMaterial({color: new THREE.Color( r, g, b )}));
		this.mesh.position.set(pos[0], pos[1], pos[2]);
		this.mesh.ans = false;
		
		scene.add(this.mesh);
		pickables.push(this.mesh);

	}
	
	changeColor(r, g, b){
		this.mesh.material.color = new THREE.Color( r, g, b );
	}
	
}

export{pickables};