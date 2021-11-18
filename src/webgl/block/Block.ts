import * as THREE from "three";
import { Vector3 } from "three";
import Item from "../Item";

export class Block {
	mesh: THREE.Mesh;
	public static width: number = 3;
	width: number = Block.width;
	material: THREE.MeshLambertMaterial;
	position: Vector3;
	id: string = 'none';

	constructor(texture: THREE.Texture, { x, y, z }: Vector3) {
		const geometry = new THREE.BoxGeometry(this.width, this.width, this.width);
		const material = new THREE.MeshLambertMaterial({
			map: texture, side: THREE.DoubleSide
		});

		material.color = new THREE.Color('#645452');

		this.material = material;
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = 'Block';
		this.mesh.position.set(x, y, z);
		this.position = this.mesh.position;
	}

	getItem() {
		return new Item(64, 1, this.id);
	}
}