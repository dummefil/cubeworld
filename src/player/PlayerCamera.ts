import {
    PerspectiveCamera,
    Vector3,
    Scene,
    Group,
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    BoxGeometry,
    Euler
} from "three";
import Player from "./Player";
import Events from '../events/Events';
import { deleteOnTimer } from "../debug/DebugHelpers";
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
    scene: Scene;
    group: Group;
    hand: HandEnum = HandEnum.mainHand;
    player: Player;

    constructor(scene: Scene, player: Player) {
        super(90, 1, 0.1, 1000);
        this.scene = scene;
        this.player = player;
        this.position.set(50, 18, 50);
        this.rotateY(0);
        this.renderCrosshair();
        this.renderHand();
        this.addEvents();
    }

    renderCrosshair() {
        const rect1 = new PlaneGeometry(0.5, 8);
        const rect2 = new PlaneGeometry(8, 0.5);
        const material = new MeshBasicMaterial({ color: 'white' });
        const mesh1 = new Mesh(rect1, material);
        const mesh2 = new Mesh(rect2, material);
        this.group = new Group();
        this.group.position.z = -1;
        this.group.add(mesh1, mesh2);
        this.add(this.group)
        this.group.scale.set(0.01, 0.01, 0.01)
    }
    renderHand() {
        const rect = new BoxGeometry(1, 1, 1)
        const material = new MeshLambertMaterial({ color: 'brown' });
        const mesh = new Mesh(rect, material);
        this.add(mesh)

        if (this.hand === HandEnum.mainHand) {
            const mainHand = {
                position: new Vector3(0.530, -0.500, -0.520),
                rotation: new Euler(0.000, 0.000, 1.000),
            }
            mesh.position.set(mainHand.position.x, mainHand.position.y, mainHand.position.z)
            mesh.rotation.set(mainHand.rotation.x, mainHand.rotation.y, mainHand.rotation.z)
        }

        if (this.hand === HandEnum.offHand) {
            const offHand = {
                position: new Vector3(-0.530, -0.500, -0.520),
                rotation: new Euler(0.000, 0.000, 1.000),
            }
            mesh.position.set(offHand.position.x, offHand.position.y, offHand.position.z)
            mesh.rotation.set(offHand.rotation.x, offHand.rotation.y, offHand.rotation.z)
        }
        mesh.scale.set(0.200, 0.200, 0.440)
    }

    addEvents() {
        const onMouseClick = (event: MouseEvent) => {
            const { world, scene } = window.game;
            const { which } = event;
            console.log(event);
            if (which === ClickType.LeftClick && window.userStateFocused) {
                const len = 3;
                const from = this.position.clone();
                // const direction = new Vector3(0, 0, -len).applyQuaternion(this.quaternion);
                const intersect = world.intersectRay(from, new Vector3(0, 0, len).applyQuaternion(this.quaternion));
                // const to = from.add(direction);
                // deleteOnTimer(to, this.scene, 10)
                if (intersect) {
                    Events.BlockBreak(world, scene, intersect);
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
}
