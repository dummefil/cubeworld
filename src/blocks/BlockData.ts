import { Vector3 } from "three";

export type BlockData = {
	position: Vector3;
	// texture: THREE.Texture;
	id: number;
	isBreakable: boolean;
}
