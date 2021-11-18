import { BlockDirt } from './block/BlockDirt';
import THREE = require("three");
import { Block } from "./block/Block"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import World from "./World";
import { BlockWater } from "./block/BlockWater";
import { Vector3 } from 'three';

function normalizePosition({x, y, z}: Vector3) {
    const { width } = Block;
    const xOffset = x * width;
    let yOffset = y * width;
    const zOffset = z * width;
    yOffset -= 10;
    return new Vector3(xOffset, yOffset, zOffset);
}
export default class ChunkGenerator {
    chunkSize: number = 16;
    data: number[];
    world: World
    constructor(parentScene: THREE.Scene, world: World) {
        this.data = this.generateHeight(this.chunkSize, this.chunkSize)
        this.world = world;
        
        for (let x = 0; x < this.chunkSize; x++) {
            for (let z = 0; z < this.chunkSize; z++) {
                let block;
                const y = this.getY( x, z );
                const position = normalizePosition(new Vector3(x, y, z));
                console.log(position);
                if ((position.y) <= -4) {
                    position.y = -4;
                    block = new BlockWater(position)
                } else {
                    block = new BlockDirt(position)
                }
                this.world.addBlock(block);
                console.log(new Vector3(x, y, z));
                parentScene.add(block.mesh);
            }
        }
    }

    getY( x: number, z: number ) {
        return ( this.data[ x + z * this.chunkSize ] * 0.15 ) | 0;
    }

    generateHeight(width: number, height: number) {
        const data = [];
        const perlin = new ImprovedNoise();
        const size = width * height, z = Math.random() * 100;

        let quality = 2;

        for (let j = 0; j < 4; j++) {

            if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

            for (let i = 0; i < size; i++) {
                const x = i % width, y = (i / width) | 0;
                data[i] += perlin.noise(x / quality, y / quality, z) * quality;

            }
            quality *= 4;
        }

        return data;

    }
}