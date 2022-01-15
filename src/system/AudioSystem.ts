import { AudioListener, Audio, AudioLoader } from 'three'

export default class AudioSystem extends AudioListener {
    constructor() {
        super()
        const listener = new AudioListener();
        // camera.add(listener);

        // create a global audio source
        const sound = new Audio(listener);
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new AudioLoader();
        // audioLoader.load('sounds/inecraft_excuse.mp3', function (buffer) {
        //     sound.setBuffer(buffer);
        //     sound.setLoop(false);
        //     sound.setVolume(0.1);
        //     sound.play();
        // });
    }
}
