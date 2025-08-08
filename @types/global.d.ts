import Physics from "src/Physics"
import AudioSystem from "src/system/AudioSystem"
import KeyboardSystem from "src/system/KeyboardSystem"
import World from "src/World"
import { Renderer, Scene } from "three"
import Player from "src/player/Player";



type Game = {
    world: World,
    scene: Scene,
    scenes: Scene[],
    audio: AudioSystem,
    keyboard: KeyboardSystem,
    renderer: Renderer,
    physics: Physics,
    player: Player
}

declare global {
    interface Window {
        userStateFocused: boolean,
        game: Game
        electronAPI: {
            quitApp: () => {}
        }
    }
}


// Definitions to let TS understand .vs, .fs, .glsl shader files
declare module '*.fs' {
    const value: string
    export default value
}
declare module '*.vs' {
    const value: string
    export default value
}
declare module '*.glsl' {
    const value: string
    export default value
}

