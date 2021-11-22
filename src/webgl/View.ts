import Player from './player/Player';
import * as THREE from "three";
import Light from "./Light";
import ChunkGenerator from './Generator';
import World from './World';

export default class View {
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private player: Player;

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
		const voxelTexture = new THREE.TextureLoader().load('textures/texture-atlas.png');
		voxelTexture.magFilter = THREE.NearestFilter;
		voxelTexture.minFilter = THREE.NearestFilter;

		const tileSize = 16;
		const tileTextureWidth =  256;
		const tileTextureHeight =  64;
		const cellSize =  16;

		const world = new World({
			tileSize,
			tileTextureWidth,
			tileTextureHeight,
			cellSize
		});

		const material = new THREE.MeshLambertMaterial({
			map: voxelTexture,
			side: THREE.DoubleSide,
			alphaTest: 0.1,
			transparent: false,
		});

		const cellIdToMesh = {};
		const updateCellGeometry = (x: number, y: number, z:number) => {
			const cellX = Math.floor(x / cellSize);
			const cellY = Math.floor(y / cellSize);
			const cellZ = Math.floor(z / cellSize);
			const cellId = world.computeCellId(x, y, z);
			let mesh = cellIdToMesh[cellId];
			const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

			const {positions, normals, uvs, indices} = world.generateGeometryDataForCell(cellX, cellY, cellZ);
			const positionNumComponents = 3;
			geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
			const normalNumComponents = 3;
			geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
			const uvNumComponents = 2;
			geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
			geometry.setIndex(indices);
			geometry.computeBoundingSphere();

			if (!mesh) {
				mesh = new THREE.Mesh(geometry, material);
				mesh.name = cellId;
				cellIdToMesh[cellId] = mesh;
				this.scene.add(mesh);
				mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
			}
		}

		const neighborOffsets = [
			[ 0,  0,  0], // self
			[-1,  0,  0], // left
			[ 1,  0,  0], // right
			[ 0, -1,  0], // down
			[ 0,  1,  0], // up
			[ 0,  0, -1], // back
			[ 0,  0,  1], // front
		];
		function updateVoxelGeometry(x: number, y: number, z:number) {
			const updatedCellIds = {};
			for (const offset of neighborOffsets) {
				const ox = x + offset[0];
				const oy = y + offset[1];
				const oz = z + offset[2];
				const cellId = world.computeCellId(ox, oy, oz);
				if (!updatedCellIds[cellId]) {
					updatedCellIds[cellId] = true;
					updateCellGeometry(ox, oy, oz);
				}
			}
		}

		// for (let y = 0; y < cellSize; ++y) {
		// 	for (let z = 0; z < cellSize; ++z) {
		// 		for (let x = 0; x < cellSize; ++x) {
		// 			const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
		// 			if (y < height) {
		// 				world.setVoxel(x, y, z, randInt(1, 17));
		// 			}
		// 		}
		// 	}
		// }
		const generator = new ChunkGenerator(this.scene, world);
		updateVoxelGeometry(1, 1, 1);  // 0,0,0 will generate


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
