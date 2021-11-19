import { Camera } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default class PlayerMovement {
    private camera: Camera;
    public movementSpeed: number = 10;
    private fpsControls: PointerLockControls;
    private keyPresses: { [key: string]: boolean };
    private sprintIsActive: boolean = false;

    constructor(camera: THREE.Camera, domElement: HTMLCanvasElement) {
        this.fpsControls = new PointerLockControls(camera, domElement);
        this.camera = camera;
        const context = this;

        document.body.addEventListener('click', function () {
            context.fpsControls.lock();
        }, false);

        const keyPresses = {};
        this.keyPresses = keyPresses;

        let doubleWPress = 0;
        let timeout: NodeJS.Timeout;
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            keyPresses[event.code] = true;

            if (event.code === 'KeyW') {
                doubleWPress++
                if (doubleWPress === 2) {
                    timeout = setTimeout(() => {
                        this.sprintIsActive = true;
                        clearTimeout(timeout);
                    }, 150)
                } else if (doubleWPress > 2) {
                    doubleWPress = 0;
                    this.sprintIsActive = false;
                }
                
            }
            console.log(event);
        }, false)

        window.addEventListener('keyup', keyUpListener, false);
        function keyUpListener(event: KeyboardEvent) {
            delete keyPresses[event.code]
        }
    }


    update(deltaTime: number) {
        let movementSpeed = this.movementSpeed;
        if (this.sprintIsActive) {
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

        if (this.keyPresses.Space) {
            this.camera.position.y += step;
        } else if (this.keyPresses.ControlLeft) {
            this.camera.position.y -= step;
        }
    }
}

