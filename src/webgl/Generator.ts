import THREE = require("three");
import Cube from "./Cube"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";

export default class Generator {
    // cubes: Cube[][] = [];
    worldWidth: number = 16;
    worldDepth: number = 16;
    data: number[];

    constructor(parentScene: THREE.Scene) {
        const texture = new THREE.TextureLoader().load('textures/dirt.png');
        this.data = this.generateHeight(this.worldWidth, this.worldWidth)
        for (let x = 0; x < this.worldWidth; x++) {
            // this.cubes[i] = [];
            for (let z = 0; z < this.worldWidth; z++) {
                const cube = new Cube(parentScene, texture)
                // this.cubes[i][j] = cube;
                const y = this.getY( x, z );
                
                const xOffset = x * cube.width;
                let yOffset = y * cube.width;
                const zOffset = z * cube.width;
                yOffset -= 10;
                if ((yOffset) <= -4) {
                    cube.material.color = new THREE.Color('aqua');
                    cube.material.transparent = true;
                    cube.material.opacity = 0.6;
                    yOffset = -4;
                }
                cube.mesh.position.set(xOffset, yOffset, zOffset);
            }
        }
    }

    getY( x: number, z: number ) {
        return ( this.data[ x + z * this.worldWidth ] * 0.15 ) | 0;
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