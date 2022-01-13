import { BlockDirt } from './../block/BlockDirt';
import { BlockWater } from './../block/BlockWater';
import { BlockData } from './../block/BlockData';
import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";
import THREE = require("three");
import { Block } from "../block/Block";
import World from "../World";
import Player from "./Player";
import { BLOCKS } from '../BlocksEnum';
enum HandEnum {
    mainHand,
    offHand
}

enum ClickType {
    LeftClick = 1,
    RightClick = 2,
    MiddleClick = 3
}

function deleteOnTimer({ x, y, z }: THREE.Vector3, scene: THREE.Scene, timeInSec: number) {
    const geometry = new THREE.SphereGeometry(1, 12);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.position.set(x, y, z);
    scene.add(line);
    // scene.add(sphere)
    setTimeout(() => {
        // scene.remove(sphere);
        scene.remove(line);
    }, timeInSec * 1000)
}

export default class PlayerCamera extends PerspectiveCamera {
    scene: THREE.Scene;
    group: THREE.Group;
    hand: HandEnum = HandEnum.mainHand;
    player: Player;
    private center: Vector2;
    private raycaster: Raycaster;
    private world: World;

    constructor(scene: THREE.Scene, player: Player, world: World) {
        super(90, 1, 0.1, 1000);
        this.scene = scene;
        this.player = player;
        this.world = world;
        this.addCrosshair();
        this.addEvents();
    }

    addCrosshair() {
        const rect1 = new THREE.PlaneGeometry(0.5, 8);
        const rect2 = new THREE.PlaneGeometry(8, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 'white' });
        const mesh1 = new THREE.Mesh(rect1, material);
        const mesh2 = new THREE.Mesh(rect2, material);
        this.group = new THREE.Group();
        this.group.position.z = -1;
        this.group.add(mesh1, mesh2);
        this.add(this.group)
        this.group.scale.set(0.01, 0.01, 0.01)
    }
    addHand() {
        const rect = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshLambertMaterial({ color: 'brown' });
        const mesh = new THREE.Mesh(rect, material);
        this.add(mesh)

        if (this.hand === HandEnum.mainHand) {
            const mainHand = {
                position: new THREE.Vector3(0.530, -0.500, -0.520),
                rotation: new THREE.Euler(0.000, 0.000, 1.000),
            }
            mesh.position.set(mainHand.position.x, mainHand.position.y, mainHand.position.z)
            mesh.rotation.set(mainHand.rotation.x, mainHand.rotation.y, mainHand.rotation.z)
        }

        if (this.hand === HandEnum.offHand) {
            const offHand = {
                position: new THREE.Vector3(-0.530, -0.500, -0.520),
                rotation: new THREE.Euler(0.000, 0.000, 1.000),
            }
            mesh.position.set(offHand.position.x, offHand.position.y, offHand.position.z)
            mesh.rotation.set(offHand.rotation.x, offHand.rotation.y, offHand.rotation.z)
        }
        mesh.scale.set(0.200, 0.200, 0.440)
    }

    addEvents() {
        const onMouseClick = (event: MouseEvent) => {
            const { which } = event;
            console.log(event);
            if (which === ClickType.LeftClick && window.userStateFocused) {
                const len = 3;
                const from = this.position.clone();
                const direction = new Vector3(0, 0, -len).applyQuaternion(this.quaternion);
                const to = from.add(direction);
                const intersect = this.world.intersectRay(from, new Vector3(0, 0, len).applyQuaternion(this.quaternion));
                // deleteOnTimer(to, this.scene, 10)
                if (intersect) {
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
                // const blockData = this.world.getVoxel(x, y, z);

                // console.log(blockData);
                // for (let i = 0; i < intersects.length; i++) {


                // if (block.name === "Block" && block.parent) {
                //     const { x, y, z } = block.position
                //     const blockData = this.world.getVoxel(x, y, z);
                //     console.log(blockData);
                //     if (blockData.isBreakable) {
                //         const item = blockData.getItem();
                //         this.player.inventory.add(item)
                //         console.log(block.parent);
                //         block.parent.remove(block);
                //         return;
                //     }
                // }
                // }
            }
            if (which === ClickType.RightClick) {
                console.log('Right click mouse')
            }
            if (which === ClickType.MiddleClick) {
                console.log('Middle click mouse')
            }
        }
        window.addEventListener('mousedown', onMouseClick, false);
    }

    public recalculateCenter() {
        const x = ((window.innerWidth / 2) / window.innerWidth) * 2 - 1;
        const y = -((window.innerHeight / 2) / window.innerHeight) * 2 + 1;
        this.center = new Vector2(x, y);
    }
    update() {
        // this.raycaster.setFromCamera(this.center, this);
    }

}
