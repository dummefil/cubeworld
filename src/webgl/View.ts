import Player from './player/Player';
import * as THREE from "three";
import Light from "./Light";
import ChunkGenerator from './Generator';
import World from './World';

export default class View {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private player: Player;

	constructor(canvasElem: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElem,
			antialias: true,
		});

		this.scene = new THREE.Scene();
		const loader = new THREE.CubeTextureLoader();
		const texture = loader.load([
			'skybox/skybox_px.jpg',
			'skybox/skybox_nx.jpg',
			'skybox/skybox_py.jpg',
			'skybox/skybox_ny.jpg',
			'skybox/skybox_pz.jpg',
			'skybox/skybox_nz.jpg',
		]);
		this.scene.background = texture;

		const world = new World();
		const light = new Light(this.scene);
		const generator = new ChunkGenerator(this.scene, world);

		this.player = new Player(this.scene, this.renderer.domElement, world)
		this.scene.add(this.player.camera);
		this.onWindowResize(window.innerWidth, window.innerHeight);
	}

	public onWindowResize(vpW: number, vpH: number): void {
		this.player.camera.recalculateCenter();
		this.renderer.setSize(vpW, vpH);
		this.player.camera.aspect = vpW / vpH;
		this.player.camera.updateProjectionMatrix();
	}

	public update(deltaTime: number): void {
		this.player.update(deltaTime);
		this.renderer.render(this.scene, this.player.camera);
	}
}
