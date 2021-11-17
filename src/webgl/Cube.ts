
import * as THREE from "three";

export default class Cube {
	mesh: THREE.Mesh;
	public static width: number = 3;
	width: number = Cube.width;
	public material: THREE.MeshLambertMaterial;
	constructor(parentScene: THREE.Scene, texture: THREE.Texture) {
		const geometry = new THREE.BoxGeometry(this.width, this.width, this.width);
		const material = new THREE.MeshLambertMaterial({
			map: texture, side: THREE.DoubleSide
		});
		
		material.color = new THREE.Color('#645452');

		this.material = material;
		this.mesh = new THREE.Mesh(geometry, material);
		console.log(this.mesh.geometry.attributes);
		this.mesh.name = 'Block';
		parentScene.add(this.mesh);
	}
}