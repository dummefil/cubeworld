import Inventory from "../Inventory"
import PlayerMovement from "./PlayerMovement"
import PlayerCamera from './PlayerCamera';

export default class Player {
    inventory: Inventory
    movement: PlayerMovement
    camera: PlayerCamera

    constructor(scene: THREE.Scene, domElement: HTMLCanvasElement) {
        this.inventory = new Inventory(64);
        this.camera = new PlayerCamera(scene, this);
        this.movement = new PlayerMovement(this.camera, domElement)
    }

    update(deltaTime: number) {
        this.movement.update(deltaTime);
    }
}