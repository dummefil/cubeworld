import * as THREE from "three";

export default class Light {
    constructor(parentScene: THREE.Scene) {
        // const light = new THREE.DirectionalLight( 0xffffff, 30);
        // light.position.set( 0, 1, 0 ); //default; light shining from top
        // light.castShadow = true; // default false
        // parentScene.add(light)
        // const dddd = new THREE.AmbientLight( 'grey' );
        // parentScene.add(dddd)
        var hemiLight = new THREE.HemisphereLight('#ccebe5', 'white', 5);
        parentScene.add(hemiLight);

    }
}