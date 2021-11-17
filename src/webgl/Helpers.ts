import * as THREE from "three";

export function drawLine(origin: THREE.Vector3, destination: THREE.Vector3, scene: THREE.Scene) {
	const pointA = origin;
	const direction = destination;
	direction.normalize();

	const distance = 10; // at what distance to determine pointB

	const pointB = new THREE.Vector3();
	pointB.addVectors(pointA, direction.multiplyScalar(distance));
	const points = []
	points.push(pointA)
	points.push(pointB)
	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
	const line = new THREE.Line(geometry, material);
	scene.add(line);
}