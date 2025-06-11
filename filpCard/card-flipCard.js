import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { scene, pickables } from "./main-pickColor.js";

export class Card {
	constructor(pos, num, planeW, planeG){
		this.mesh = new THREE.Mesh(new THREE.PlaneGeometry( 5, 5 ), new THREE.LineBasicMaterial());
		this.mesh.position.set(pos[0], pos[1], pos[2]);
		this.mesh.n = num;
		this.mesh.color = 'w';
		this.planeW = planeW;
		this.planeW.position.copy(this.mesh);
		this.planeG = planeG;
		this.planeG.position.copy(this.mesh);
		this.planeG.visible = false;
		
		pickables.push(this.mesh);
	}
	
	flip(){
		if(this.mesh.color == 'w'){
			this.mesh.color = 'g';
			this.planeW.visible = false;
			this.planeG.visible = true;
		}else{
			this.mesh.color = 'w';
			this.planeW.visible = true;
			this.planeG.visible = false;
		}
	}
	
}

export function buildCard(){
	let loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	
	//white
	let texture = loader.load('./flipCardW.png');
	texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
	texture.repeat.set(0.5, 0.5);  

	// 左上角（0, 0.5）
	let texMat1 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat1.map.offset.set(0.0, 0.5);

	// 右上角（0.5, 0.5）
	let texMat2 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat2.map.offset.set(0.5, 0.5);

	// 左下角（0, 0.0）
	let texMat3 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat3.map.offset.set(0.0, 0.0);

	// 右下角（0.5, 0.0）
	let texMat4 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat4.map.offset.set(0.5, 0.0);

	let planeW1 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat1);
	let planeW2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat2);
	let planeW3 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat3);
	let planeW4 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat4);

	//gray
	let texture = loader.load('./flipCardG.png');
	texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
	texture.repeat.set(0.5, 0.5);  

	// 左上角（0, 0.5）
	let texMat1 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat1.map.offset.set(0.0, 0.5);

	// 右上角（0.5, 0.5）
	let texMat2 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat2.map.offset.set(0.5, 0.5);

	// 左下角（0, 0.0）
	let texMat3 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat3.map.offset.set(0.0, 0.0);

	// 右下角（0.5, 0.0）
	let texMat4 = new THREE.MeshBasicMaterial({
		map: texture.clone(),
		alphaTest: 0.5,
	});
	texMat4.map.offset.set(0.5, 0.0);

	let planeG1 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat1);
	let planeG2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat2);
	let planeG3 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat3);
	let planeG4 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), texMat4);

	return [planeW1, planeW2, planeW3, planeW4, planeG1, planeG2, planeG3, planeG4];
}

export{pickables};