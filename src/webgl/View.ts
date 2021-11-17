import Player from './Player';
import * as THREE from "three";
import Light from "./Light";
import Generator from './Generator';
import { Raycaster, Vector2 } from 'three';
import WorldCamera from './WorldCamera';

export default class View {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: WorldCamera;
	private light: Light;
	private player: Player;
	private generator: Generator;
	private raycaster: Raycaster;
	private center: Vector2;

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



		this.light = new Light(this.scene);
		this.generator = new Generator(this.scene);
		this.player = new Player(this.scene, this.renderer.domElement)
		this.camera = this.player.camera;
		this.scene.add(this.camera);

		this.raycaster = new THREE.Raycaster();
		this.raycaster.far = 100;
		const onMouseClick = () => {
			const intersects = this.raycaster.intersectObjects(this.scene.children);
			for (let i = 0; i < intersects.length; i++) {
				const block = intersects[i].object;
				if (block.name === "Block" && block.parent) {
					console.log(block.position);
					this.player.inventory.add({id:1,maxStack:64,currentStack:32})
					console.log(block);
					block.parent.remove(block);
					return;
				}
			}
		}
		this.onWindowResize(window.innerWidth, window.innerHeight);
		window.addEventListener('mousedown', onMouseClick, false);
	}

	public onWindowResize(vpW: number, vpH: number): void {
		this.recalculateCenter();
		this.renderer.setSize(vpW, vpH);
		this.camera.aspect = vpW / vpH;
		this.camera.updateProjectionMatrix();
	}

	public recalculateCenter() {
		const x = ((window.innerWidth / 2) / window.innerWidth) * 2 - 1;
		const y = -((window.innerHeight / 2) / window.innerHeight) * 2 + 1;
		this.center = new Vector2(x, y);
	}

	public update(deltaTime: number): void {
		this.raycaster.setFromCamera(this.center, this.camera);
		this.player.update(deltaTime);
		this.renderer.render(this.scene, this.camera);
	}
}
