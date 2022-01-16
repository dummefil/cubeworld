import { World, Vec3, Body } from 'cannon-es'
import { Object3D, Quaternion, Vector3 } from 'three';
import { threeToCannon, ShapeType } from 'three-to-cannon';

export default class Physics {
    private _physicsWorld: World;
    private _bodies: [Body, Object3D][] = [];
    private _maxNegativeHeight = -256;
    constructor() {
        const physicsWorld = new World({
            gravity: new Vec3(0, -9.82, 0), // m/s²
        })
        this._physicsWorld = physicsWorld;
    }

    //TODO: MAKE ME OVERLOAD DADDY
    addPhysics(mesh: Object3D, isStatic?: boolean | number): void {
        console.warn('Object added')
        let mass;
        if (typeof isStatic === 'number') {
            mass = isStatic;
        } else {
            mass = isStatic ? 0 : 1;
        }
        //TODO: FIX ME
        //@ts-ignore
        const result = threeToCannon(mesh, { type: ShapeType.MESH });
        const { shape } = result;
        const { x, y, z } = mesh.position;
        const body = new Body({
            mass,
            shape,
            position: new Vec3(x, y, z),
        })
        body.linearDamping = 0;
        this._physicsWorld.addBody(body)
        if (mass !== 0) {
            body.collisionResponse = true;
            this._bodies.push([body, mesh]);
        }
    }

    private remove(index: number, [body, mesh]: [Body, Object3D]) {
        console.warn('Object removed')
        this._bodies.splice(index, 1);
        this._physicsWorld.removeBody(body);
        window.game.scene.remove(mesh);
    }

    update(dt: number, elapsedTime: number) {
        const step = 1 / 60;
        this._physicsWorld.step(step, elapsedTime);

        for (let i = 0; i < this._bodies.length; i++) {
            const [body, mesh] = this._bodies[i];
            if (body.position.y < this._maxNegativeHeight) {
                this.remove(i, [body, mesh]);
                i--;
            } else {
                mesh.quaternion.copy(<unknown>body.quaternion as Quaternion)
                mesh.position.copy(<unknown>body.position as Vector3)
            }
        }
    }
}