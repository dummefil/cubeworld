import { BLOCKS } from './BlocksEnum';
import { Vector3 } from 'three';
import THREE = require('three');
import { Block } from "./Block";
import { BlockData } from './BlockData';




const dirtTexture = new THREE.TextureLoader().load('textures/dirt.png');
export class BlockDirt extends Block {
	constructor(position: Vector3) {
		super(position)
	}
	static data: BlockData = {
		isBreakable: true,
		position: new Vector3,
		id: BLOCKS.Dirt
	}
}