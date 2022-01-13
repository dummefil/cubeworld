import { Scene, HemisphereLight, HemisphereLightHelper } from "three";

export default class Light {
    constructor(scene: Scene) {
        const hemiLight = new HemisphereLight('white', 'white', 1);
        scene.add(new HemisphereLightHelper(hemiLight, 15));
        scene.add(hemiLight);
    }
}