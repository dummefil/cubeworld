
import * as THREE from "three";

export default class CubeData {
	position: THREE.Vector3;
	texture: THREE.Texture;
	type: string;
	constructor(position: THREE.Vector3) {
		this.position = position;
		this.type = 'dirt';
	}
}