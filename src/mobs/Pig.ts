import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Pig {
    constructor(scene: THREE.Scene) {
        const loader = new GLTFLoader();
        loader.load("./models/piggy-boy.glb", function (gltf) {
            gltf.scene.position.set(54, 18, 54);
            scene.add(gltf.scene)
        })
    }
}
