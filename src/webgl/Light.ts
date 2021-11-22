import * as THREE from "three";

export default class Light {
    constructor(parentScene: THREE.Scene) {
        const hemiLight = new THREE.HemisphereLight('white', 'white', 1);
        parentScene.add(hemiLight);
    }
}