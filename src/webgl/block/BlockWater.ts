import { Block } from './Block';
import { Vector3, Color } from 'three';
import THREE = require('three');

const waterTexture = new THREE.TextureLoader().load('textures/dirt.png');
export class BlockWater extends Block {
	constructor(position: Vector3) {
		super(waterTexture, position);
		this.id = 'water';
		this.material.color = new Color('aqua');
		this.material.transparent = true;
		this.material.opacity = 0.6;
	}

}