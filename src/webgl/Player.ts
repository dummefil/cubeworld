import Inventory from "./Inventory"
import PlayerMovement from "./PlayerMovement"
import WorldCamera from './WorldCamera';
export default class Player {
    inventory: Inventory
    movement: PlayerMovement
    camera: WorldCamera

    constructor(scene: THREE.Scene, domElement: HTMLCanvasElement){
        this.inventory = new Inventory()
        this.camera = new WorldCamera(scene);
		this.camera.position.y = 10
		this.camera.rotateY(180);
        this.movement = new PlayerMovement(this.camera, domElement)
    }
    
    update(deltaTime: number) {
        this.movement.update(deltaTime);
    }
}