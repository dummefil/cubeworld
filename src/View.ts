import Player from './player/Player';
import * as THREE from "three";
import Light from "./Light";
import World from './World';
import AudioService from '../AudioService';
import Physics from './Physics';
import Pig from './mobs/Pig';
import { BLOCKS } from './BlocksEnum';

export default class View {
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private player: Player;
	private audioService: AudioService;

	constructor(canvasElem: HTMLCanvasElement) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasElem,
			antialias: true,
		});

		const UIBar = new THREE.ImageLoader().load('UI/bar.png');
		UIBar.classList.add('UI-bar')
		canvasElem.parentElement.append(UIBar);

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
		const light = new Light(this.scene);

		const tileSize = 16;
		const tileTextureWidth = 256;
		const tileTextureHeight = 64;
		const cellSize = 16;

		const worldOptions = {
			tileSize,
			tileTextureWidth,
			tileTextureHeight,
			cellSize
		}


		Physics(this.scene)
		const world = new World(worldOptions, this.scene);
		const waterTexture = new THREE.TextureLoader().load('textures/dirt.png');

		const radius = 16
		const worldType = 'flat';
		if (worldType === 'flat') {
			for (let y = 0; y < cellSize; ++y) {
				for (let z = 0; z < cellSize * radius; ++z) {
					for (let x = 0; x < cellSize * radius; ++x) {
						// const height = (Math.sin(x / cellSize * Math.PI * Math.random()));
						const height = cellSize;
						if (y < height) {
							world.setVoxel(x, y, z, BLOCKS.Dirt);
						}
					}
				}
			}
		}

		Object.keys(world.chunks).forEach((chunkId) => {
			const [x, y, z] = chunkId.split(',').map((v) => parseInt(v))
			world.updateCellGeometry(x * cellSize, y * cellSize, z * cellSize);
		})
		const pig = new Pig(this.scene)

		this.player = new Player(this.scene, this.renderer.domElement, world)
		this.scene.add(this.player.camera);
		this.audioService = new AudioService(this.player.camera)
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
