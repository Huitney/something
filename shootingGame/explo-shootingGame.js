import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { MTLLoader } from 'https://unpkg.com/three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';
import { scene, sceneHUD } from "./main-shootingGame.js";

var uvOffsetArray = [], sprite, explo = [];
var gunPos = new THREE.Vector3(6, -9, 180), gunX = Math.PI/16, gunY = -Math.PI/2.4;

export function explosion(target){
	if(target.visible){
		var ex = sprite.clone();
		explo.push(ex);
		scene.add(ex);
		
		ex.position.copy(target.clone().position);
		target.visible = false;
		ex.material.map.offset.copy (uvOffsetArray[0][0]);  
		setTimeout (explosionAnimate(ex, 0, 1), 200);
	}
}

function explosionAnimate(ex, baseS, baseT){
	
	ex.material.map.offset.copy (uvOffsetArray[baseS][baseT]);  
	if (baseT === 0) {
		if(baseS === 3){
			ex.visible = false;
		}
		baseS++;
		baseS %= 4;
	}
	if(ex.visible)
		setTimeout (explosionAnimate(ex, baseS, (baseT + 1) % 8), 200);
	
}

export function setUpOffsetArray() {
	var rowCount = 4; // 4x8 sprites
	var colCount = 8;
	for (var i = 0; i < rowCount; i++) {
		var row = [];
		for (var j = 0; j < colCount; j++)
		row.push(new THREE.Vector2(j * 0.125, - 0.25 * i));
		uvOffsetArray.push(row);
	}
}

export function readModel (modelName, targetSize=40) {
	var onProgress = function(xhr) {
	if (xhr.lengthComputable) {
		var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	var onError = function(xhr) {};

	var mtlLoader =  new MTLLoader();
	mtlLoader.setPath('models/');
	mtlLoader.load(modelName+'.mtl', function(materials) {
		materials.preload();

		var objLoader =  new OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/');
		objLoader.load(modelName+'.obj', function(object) {

			let theObject =  unitize (object, targetSize);
			var helper = new THREE.BoxHelper(theObject);
			helper.visible = false;
			theObject.add(helper);
			theObject.name = 'OBJ'
			
			var gun = new THREE.Object3D();
			gun.add(theObject);
			gun.rotation.x = gunX;
			gun.rotation.y = gunY;
			gun.position.copy(gunPos);
			
			sceneHUD.add (gun);
			
			return gun;

		}, onProgress, onError);

	});

}

function unitize (object, targetSize) {  

	// find bounding box of 'object'
	var box3 = new THREE.Box3();
	box3.setFromObject (object);
	var size = new THREE.Vector3();
	size.subVectors (box3.max, box3.min);
	var center = new THREE.Vector3();
	center.addVectors(box3.max, box3.min).multiplyScalar (0.5);

	console.log ('center: ' + center.x + ', '+center.y + ', '+center.z );
	console.log ('size: ' + size.x + ', ' +  size.y + ', '+size.z );

	// uniform scaling according to objSize
	var objSize = Math.max (size.x, size.y, size.z);
	var scaleSet = targetSize/objSize;

	var theObject =  new THREE.Object3D();
	theObject.add (object);
	object.scale.set (scaleSet, scaleSet, scaleSet);
	object.position.set (-center.x*scaleSet, center.y*scaleSet/6, -center.z*scaleSet);
	object.traverse(
		function (mesh){
			if(mesh instanceof THREE.Mesh){
				mesh.material.side = THREE.DoubleSide;
			}
		}
	);
	return theObject;
}

export function buildSprite(texMat) {

	var geometry = new THREE.BufferGeometry();
	let vertices = [];
	let uvs = [];
	let indices = [0,1,2, 0,2,3];
	vertices.push(-15,-15,0, 15,-15,0, 15,15,0, -15,15,0);
	uvs.push (0,0.75, 0.125,0.75, 0.125,1.0, 0.0,1.0);

	geometry.setIndex(indices);
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

	geometry.computeBoundingSphere();
	//geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	
	sprite = new THREE.Mesh(geometry, texMat);
	return sprite;
}

export{gunPos, gunX, gunY};