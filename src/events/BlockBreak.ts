import { Block } from 'src/blocks/Block';
import { BlockData } from 'src/blocks/BlockData';
import { BlockDirt } from 'src/blocks/BlockDirt';
import { BlockWater } from 'src/blocks/BlockWater';
import { BLOCKS } from 'src/blocks/BlocksEnum';
import { Vector3 } from 'three';

type Intersect = {
    position: number[];
    normal: number[];
    voxel: any;
}

export function BlockBreak(intersect: Intersect) {
    const [x, y, z] = intersect.position;
    const blockId = this.world.getVoxel(x, y, z);
    let blockData: BlockData;

    if (blockId === BLOCKS.Water) {
        blockData = BlockWater.data;
    }
    if (blockId === BLOCKS.Dirt) {
        blockData = BlockDirt.data;
    }
    if (blockData.isBreakable) {
        this.world.deleteVoxel(x, y, z);
        this.world.updateVoxelGeometry(x, y, z);
        console.log('block destroyed :( ');
        const block = new Block(new Vector3(x, y, z))
        this.scene.add(block.mesh);
    }

}