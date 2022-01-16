import { Block } from 'src/blocks/Block';
import { BlockData } from 'src/blocks/BlockData';
import { BlockDirt } from 'src/blocks/BlockDirt';
import { BlockWater } from 'src/blocks/BlockWater';
import { BLOCKS } from 'src/blocks/BlocksEnum';
import { Vector3, Scene } from 'three';
import World from 'src/World';

type Intersect = {
    position: number[];
    normal: number[];
    voxel: any;
}

export function BlockBreak(world: World, scene: Scene, intersect: Intersect) {
    const [x, y, z] = intersect.position;
    const blockId = world.getVoxel(x, y, z);
    let blockData: BlockData;

    if (blockId === BLOCKS.Water) {
        blockData = BlockWater.data;
    }
    if (blockId === BLOCKS.Dirt) {
        blockData = BlockDirt.data;
    }
    if (blockData && blockData.isBreakable) {
        world.deleteVoxel(x, y, z);
        world.updateVoxelGeometry(x, y, z);
        console.log('block destroyed :( ');
        const { mesh } = new Block(new Vector3(x, y, z))
        scene.add(mesh);
        window.game.physics.addPhysics(mesh, false);
    }

}