import { Camera } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default class PlayerMovement {
    private camera: Camera;
    public movementSpeed: number = 10;
    private fpsControls: PointerLockControls;
    private keyPresses: { [key: string]: boolean };

    constructor(camera: THREE.Camera, domElement: HTMLCanvasElement) {
        this.fpsControls = new PointerLockControls(camera, domElement);
        this.camera = camera;
        const context = this;

        document.body.addEventListener('click', function () {
            context.fpsControls.lock();
        }, false);

        const keyPresses = {};
        this.keyPresses = keyPresses;

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            keyPresses[event.code] = true;
        }, false)

        window.addEventListener('keyup', keyUpListener, false);
        function keyUpListener(event: KeyboardEvent) {
            delete keyPresses[event.code]
        }
    }
    update(deltaTime: number) {
        let movementSpeed = this.movementSpeed;
        if (this.keyPresses.ShiftLeft || this.keyPresses.ShiftRight) {
            movementSpeed *= 2;
        }
        const step = movementSpeed * deltaTime;
        if (this.keyPresses.KeyW) {
            this.fpsControls.moveForward(step);
        } else if (this.keyPresses.KeyS) {
            this.fpsControls.moveForward(-step)
        }
        if (this.keyPresses.KeyA) {
            this.fpsControls.moveRight(-step);
        } else if (this.keyPresses.KeyD) {
            this.fpsControls.moveRight(step);
        }
    }
}