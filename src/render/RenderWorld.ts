import { BLOCKS } from "src/blocks/BlocksEnum";
import { worldOptions } from 'src/World';
const { worldType, cellSize } = worldOptions;

export function renderWorld() {
    const { world } = window.game;
    const radius = 16;
    if (worldType === 'flat') {
        for (let y = 0; y < cellSize; ++y) {
            for (let z = 0; z < cellSize * radius; ++z) {
                for (let x = 0; x < cellSize * radius; ++x) {
                    // const height = (Math.sin(x / cellSize * Math.PI * Math.random()));
                    const height = cellSize;
                    if (y < height) {
                        world.setVoxel(x, y, z, BLOCKS.Dirt);
                    }
                }
            }
        }
    }

    Object.keys(world.chunks).forEach((chunkId) => {
        const [x, y, z] = chunkId.split(',').map((v) => parseInt(v))
        world.updateCellGeometry(x * cellSize, y * cellSize, z * cellSize);
    })
}