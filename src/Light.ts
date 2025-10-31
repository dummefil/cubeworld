import { HemisphereLight, HemisphereLightHelper, Scene, ColorRepresentation } from 'three';

export class GameLight extends HemisphereLight {
    helper: HemisphereLightHelper;

    constructor(
        skyColor: ColorRepresentation = 'white',
        groundColor: ColorRepresentation = 'white',
        intensity = 1,
        helperSize = 15
    ) {
        super(skyColor, groundColor, intensity);
        this.helper = new HemisphereLightHelper(this, helperSize);
    }

    addTo(scene: Scene) {
        scene.add(this);
        scene.add(this.helper);
    }

    dispose() {
        this.helper.dispose();
    }
}