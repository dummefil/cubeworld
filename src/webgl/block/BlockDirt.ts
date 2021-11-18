import { Vector3 } from 'three';
import THREE = require('three');
import { Block } from "./Block";

const dirtTexture = new THREE.TextureLoader().load('textures/dirt.png');
export class BlockDirt extends Block {
	constructor(position: Vector3) {
		super(dirtTexture, position)
		this.id = 'dirt'
	}
}