import { PerspectiveCamera } from "three";
import THREE = require("three");

enum HandEnum {
    mainHand,
    offHand
}

export default class WorldCamera extends PerspectiveCamera {
    scene: THREE.Scene;
    group: THREE.Group;
    hand: HandEnum = HandEnum.mainHand;

    constructor(scene: THREE.Scene) {
        super(90, 1, 0.1, 1000);
        this.scene = scene;
        this.addCrosshair();
        this.addHand();
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
}