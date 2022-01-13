import * as THREE from "three";

export default class Light {
    constructor(scene: THREE.Scene) {
        const hemiLight = new THREE.HemisphereLight('white', 'white', 1);
        scene.add(new THREE.HemisphereLightHelper(hemiLight, 15));
        scene.add(hemiLight);
    }
}