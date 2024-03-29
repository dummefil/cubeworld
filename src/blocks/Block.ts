import { BlockData } from 'src/blocks/BlockData';
import * as THREE from "three";
import { Vector3 } from "three";
import Item from "../Item";

const texture = new THREE.TextureLoader().load('textures/dirt.png');
export class Block implements BlockData {
	mesh: THREE.Mesh;
	texture: THREE.Texture
	isBreakable: boolean = true
	public static width: number = 1
	width: number = Block.width;
	material: THREE.MeshLambertMaterial;
	position: Vector3;
	id: number = 0;

	constructor({ x, y, z }: Vector3) {
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
		const itemSize = 1;
		this.mesh.scale.set(itemSize, itemSize, itemSize);
	}

	getItem() {
		return new Item(64, 1, this.id);
	}
}