import THREE = require("three");
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import World from "./World";

export default class ChunkGenerator {
    chunkSize: number;
    world: World;
    constructor(parentScene: THREE.Scene, world: World) {
        this.world = world;
        this.chunkSize = 16;

        const perlin = new ImprovedNoise();
        for (let x = 0; x < this.chunkSize; x++) {
            for (let z = 0; z < this.chunkSize; z++) {
                for (let y = 0; y < this.chunkSize; y++) {
                    let height = perlin.noise(x / this.chunkSize, y / this.chunkSize, z / this.chunkSize) * this.chunkSize;
                    this.world.setVoxel(x, height, z, 1);
                }
            }
        }
    }
}