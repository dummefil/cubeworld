import * as THREE from "three";

export type BlockData = {
	position: THREE.Vector3;
	// texture: THREE.Texture;
	id: number;
	isBreakable: boolean;
}