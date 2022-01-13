import { Clock, CubeTextureLoader, ImageLoader, Scene, WebGLRenderer } from "three";
import Player from './player/Player';
import Light from "./Light";
import { worldOptions } from './World';
import World from './World';
import AudioService from './system/AudioSystem';
import KeyboardSystem from './system/KeyboardSystem';
import { IgorDebugger } from "./debug/IgorDebugger";
// import Physics from './Physics';

const canvas = <HTMLCanvasElement>document.getElementById("webgl-canvas");
const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
});
const timer = new Clock();

const loader = new CubeTextureLoader();
const skyBoxTexture = loader.load([
    'skybox/skybox_px.jpg',
    'skybox/skybox_nx.jpg',
    'skybox/skybox_py.jpg',
    'skybox/skybox_ny.jpg',
    'skybox/skybox_pz.jpg',
    'skybox/skybox_nz.jpg',
]);

const scene = new Scene();
scene.background = skyBoxTexture;
const UIBar = new ImageLoader().load('UI/bar.png');
UIBar.classList.add('UI-bar')
canvas.parentElement.append(UIBar);

const light = new Light(scene);
const audio = new AudioService();
const keyboard = new KeyboardSystem();

const world = new World(worldOptions, scene);
const player = new Player(scene, renderer.domElement);

const gameInstance = {
    scene,
    scenes: [scene],
    world,
    player,
    light, //todo do we need it here?
    audio,
    keyboard,
    renderer,
    timer
}

window.game = gameInstance;

function render(time: number) {
    const deltaTime = timer.getDelta();
    player.update(deltaTime);
    renderer.render(scene, player.camera);
    requestAnimationFrame(render);
}
render(0);

function resizeWindow() {
    const { innerHeight, innerWidth } = window
    this.renderer.setSize(innerWidth, innerHeight);
    this.player.camera.aspect = innerWidth / innerHeight;
    this.player.camera.updateProjectionMatrix();
}

resizeWindow();
// const igorDebugger = new IgorDebugger(document.querySelector('.Igor-container'))
window.addEventListener("resize", resizeWindow);