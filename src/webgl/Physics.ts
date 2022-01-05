import * as CANNON from 'cannon-es'
import * as THREE from 'three';
import { Vector3 } from 'three';

export default function Physics(scene: THREE.Scene) {
    // Setup our physics world
    const world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    })

    // Create a sphere body
    const radius = 1 // m
    const sphereBody = new CANNON.Body({
        mass: 1, // kg
        shape: new CANNON.Box(new CANNON.Vec3(radius, radius, radius)),
    })
    sphereBody.position.set(50, 50, 50) // m
    world.addBody(sphereBody)

    // Create a static plane for the ground
    const groundBody = new CANNON.Body({
        type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
        shape: new CANNON.Plane(),
        position: new CANNON.Vec3(50, 16, 50)
    })
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
    world.addBody(groundBody)

    // Start the simulation loop
    const timeStep = 1 / 60 // seconds
    let lastCallTime: number;
    const geometry = new THREE.BoxGeometry(radius, radius, radius);
    const material = new THREE.MeshNormalMaterial();
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh)

    sphereMesh.quaternion.copy(<unknown>sphereBody.quaternion as THREE.Quaternion)
    function animate() {
        requestAnimationFrame(animate)

        const time = performance.now() / 1000 // seconds
        const dt = time - lastCallTime

        if (!lastCallTime) {
            world.step(timeStep)
        } else {
            world.step(timeStep, dt)
        }
        lastCallTime = time;
        sphereMesh.rotation.y += 0.01
        sphereMesh.position.copy(<unknown>sphereBody.position as THREE.Vector3)

    }
    animate()
}