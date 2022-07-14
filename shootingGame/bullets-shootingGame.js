import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { scene, sceneHUD, bullets, camera, gun } from "./main-shootingGame.js";
import { gunPos, gunX, gunY } from "./explo-shootingGame.js";

var shootDirection = [new THREE.Vector3(0, 0, 0),];

export function newBullet(){
	var bb = bullets[0].clone();
	bullets.push(bb);
	scene.add(bb);
	bb.position.copy(gun.clone().position);
	
	var vec = getGunAngle();
	shootDirection.push(vec);
	
	bb.position.x += vec.x * 23;
	bb.position.y += vec.y * 23;
	bb.position.z += vec.z * 23;
}

function getGunAngle(){
	var direction = new THREE.Vector3();
	camera.getWorldDirection(direction);
	var angle = Math.PI / 12;
	var vec = direction.clone();
	vec.x *= Math.sin(Math.PI/2 - angle) / Math.sin(Math.PI/2);
	vec.z *= Math.sin(Math.PI/2 - angle) / Math.sin(Math.PI/2);
	vec.x -= Math.sin(angle) / Math.sin(Math.PI/2);
	vec.z += Math.sin(angle) / Math.sin(Math.PI/2);
	return vec;
}

export function shootingAnimate(){
	var speed = 10;
	for(let i = 1;i < bullets.length;i++){
		if(bullets[i].visible){
			//moving
			bullets[i].position.x += shootDirection[i].x * speed;
			bullets[i].position.y += shootDirection[i].y * speed;
			bullets[i].position.z += shootDirection[i].z * speed;
			
			//hit
			for(let j = 0;j < boxs.length;j++){
				if(Math.abs(boxs[j].position.x - bullets[i].position.x) < 5 & Math.abs(boxs[j].position.y - bullets[i].position.y) < 5){
					explosion(boxs[j]);
				}
			}
			
			//out of range
			if(bullets[i].position.x > 200 | bullets[i].position.x < -200 | 
			bullets[i].position.z > 200 | bullets[i].position.z < -200){
				bullets[i].visible = false;
			}
			
		}
	}
	setTimeout (shootingAnimate, 50);
}