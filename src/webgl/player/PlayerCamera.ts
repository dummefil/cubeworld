import { PerspectiveCamera, Raycaster, Vector2 } from "three";
import THREE = require("three");
import World from "../World";
import Player from "./Player";

enum HandEnum {
    mainHand,
    offHand
}

enum ClickType {
    LeftClick = 1,
    RightClick = 2,
    MiddleClick = 3
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
        this.addHand();
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
        const material = new THREE.MeshBasicMaterial({ color: 'brown' });
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
        this.raycaster = new THREE.Raycaster();
        this.raycaster.far = 100;
        const onMouseClick = (event: MouseEvent) => {
            const { which } = event;
            console.log(event);
            if (which === ClickType.LeftClick) {
                const intersects = this.raycaster.intersectObjects(this.scene.children);
                for (let i = 0; i < intersects.length; i++) {
                    const block = intersects[i].object;
                    if (block.name === "Block" && block.parent) {
                        const blockData = this.world.getBlock(block.position);
                        const item = blockData.getItem();
                        this.player.inventory.add(item)
                        console.log(block.parent);
                        block.parent.remove(block);
                        return;
                    }
                }
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
        this.raycaster.setFromCamera(this.center, this);
    }

}
