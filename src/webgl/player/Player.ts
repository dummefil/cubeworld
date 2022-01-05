import Inventory from "../Inventory"
import PlayerMovement from "./PlayerMovement"
import PlayerCamera from './PlayerCamera';
import World from "../World";
import { Vector3 } from "three";
export default class Player {
    inventory: Inventory
    movement: PlayerMovement
    camera: PlayerCamera

    constructor(scene: THREE.Scene, domElement: HTMLCanvasElement, world: World) {
        this.inventory = new Inventory(64);
        this.camera = new PlayerCamera(scene, this, world);
        this.camera.position.set(50, 18, 50);
        this.camera.rotateY(0);
        this.movement = new PlayerMovement(this.camera, domElement)
    }

    update(deltaTime: number) {
        this.movement.update(deltaTime);
        this.camera.update();
    }
}