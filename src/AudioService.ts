import PlayerCamera from './webgl/player/PlayerCamera'
import * as THREE from 'three'
export default class AudioService extends THREE.AudioListener {
    constructor(camera: PlayerCamera) {
        super()
        const listener = new THREE.AudioListener();
        camera.add(listener);

        // create a global audio source
        const sound = new THREE.Audio(listener);
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('sounds/inecraft_excuse.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.1);
            sound.play();
        });
    }
}
