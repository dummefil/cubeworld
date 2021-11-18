import { Block } from './Block/Block';
import { Vector3 } from "three";

export default class World {
    private cubes: Block[][][]
    private chunks: number[];
    constructor() {
        this.chunks = [];
        this.cubes = [];
    }
    addChunk(number: number) {
        this.chunks.push(number);
    }
    addBlock(cube: Block) {
        const {x, y, z} = cube.position;
        if (!this.cubes[x]) {
            this.cubes[x] = [];
        }
        if (!this.cubes[x][y]) {
            this.cubes[x][y] = [];
        }
        
        this.cubes[x][y][z] = cube;
    }
    getBlock({ x, y, z }: Vector3) {
        return this.cubes[x][y][z];
    }
}