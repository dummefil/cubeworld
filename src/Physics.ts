import { World, Vec3, Body, Box, Plane } from 'cannon-es'
import * as THREE from 'three';
import { Object3D } from 'three';
import { threeToCannon, ShapeType } from 'three-to-cannon';

export default class Physics {
    physicsWorld: World
    constructor() {
        const { scene } = window.game;
        const physicsWorld = new World({
            gravity: new Vec3(0, -9.82, 0), // m/s²
        })
        this.physicsWorld = physicsWorld;

        // // Create a sphere body
        // const radius = 1 // m
        // const sphereBody = new Body({
        //     mass: 1, // kg
        //     shape: new Box(new Vec3(radius, radius, radius)),
        // })
        // sphereBody.position.set(50, 50, 50) // m
        // physicsWorld.addBody(sphereBody)

        // Create a static plane for the ground
        // const groundBody = new Body({
        //     type: Body.STATIC, // can also be achieved by setting the mass to 0
        //     shape: new Plane(),
        //     position: new Vec3(50, 16, 50)
        // })
        // groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
        // physicsWorld.addBody(groundBody)

        // // Start the simulation loop
        // const geometry = new THREE.BoxGeometry(radius, radius, radius);
        // const material = new THREE.MeshNormalMaterial();
        // const sphereMesh = new THREE.Mesh(geometry, material);
        // scene.add(sphereMesh)

        // sphereMesh.quaternion.copy(<unknown>sphereBody.quaternion as THREE.Quaternion)
    }

    addPhysics(object3D: Object3D) {
        //todo create physics mesh, add to physics world
        // const physicsMesh = threeToCannon(object3D, { type: ShapeType.MESH });
        // this.physicsWorld.addBody(physicsMesh)
        //todo remove from wolrd(how?)
    }

    update(time: number) {
        const timeStep = 1 / 60;
        this.physicsWorld.step(timeStep, time)

    }
}