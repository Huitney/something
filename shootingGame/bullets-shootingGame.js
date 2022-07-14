import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { scene, sceneHUD, bullets, camera } from "./main-shootingGame.js";
import { gunPos, gunX, gunY } from "./explo-shootingGame.js";

export function newBullet(){
	var rot = [camera.rotation.x + gunX, camera.rotation.y + gunY, camera.rotation.z];
	
}