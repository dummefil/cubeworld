import { Camera } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import UIPauseMenu from '../UI/UIPauseMenu';

export default class PlayerMovement {
    private camera: Camera;
    public movementSpeed = 10;
    private fpsControls: PointerLockControls;

    constructor(camera: Camera, domElement: HTMLCanvasElement) {
        this.fpsControls = new PointerLockControls(camera, domElement);
        this.camera = camera;


        this.fpsControls.addEventListener('lock', function () {
            console.log('locked')
            if (!window.userStateFocused) {
                UIPauseMenu.hide();
            }
        });

        this.fpsControls.addEventListener('unlock', function () {
            console.log('unlocked')
            if (window.userStateFocused) {
                UIPauseMenu.show();
            }
        });

        document.addEventListener('click', (event: MouseEvent) => {
            this.fpsControls.lock();
        })
        document.addEventListener('pointerlockchange', (event) => {
            window.userStateFocused = !window.userStateFocused
        });
    }

    update(deltaTime: number) {
        const { keyboard } = window.game;
        let movementSpeed = this.movementSpeed;
        if (keyboard.isDoubleKeyPressed('W')) {
            movementSpeed *= 2;
        }
        const step = movementSpeed * deltaTime;
        if (keyboard.isKeyPressed('W')) {
            this.fpsControls.moveForward(step);
        } else if (keyboard.isKeyPressed('S')) {
            this.fpsControls.moveForward(-step)
        }
        if (keyboard.isKeyPressed('A')) {
            this.fpsControls.moveRight(-step);
        } else if (keyboard.isKeyPressed('D')) {
            this.fpsControls.moveRight(step);
        }

        if (keyboard.isKeyPressed('Space')) {
            this.camera.position.y += step;
        } else if (keyboard.isKeyPressed('Control')) {
            this.camera.position.y -= step;
        }
    }
}

