// Physics.ts
import RAPIER, { World as RapierWorld, RigidBody, Collider } from '@dimforge/rapier3d-compat';
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments, Mesh, Object3D, Scene, Vector3 } from 'three';
import { PhysicsController } from '../@types/physics';

type Link = { body: RigidBody; collider: Collider; kind: 'fixed-trimesh' | 'dynamic-aabb' };
const links = new Map<Object3D, Link>();


function getBody(obj: Object3D) {
    return links.get(obj)?.body;
}

function setAngularDamping(obj: Object3D, v: number) {
    const b = getBody(obj); if (!b) return;
    b.setAngularDamping(v);
}

function applyTorque(obj: Object3D, torque: Vector3) {
    const b = getBody(obj); if (!b) return;
    b.applyTorqueImpulse({ x: torque.x, y: torque.y, z: torque.z }, true);
}

function setAngularVelocity(obj: Object3D, ang: Vector3) {
    const b = getBody(obj); if (!b) return;
    b.setAngvel({ x: ang.x, y: ang.y, z: ang.z }, true);
}

function applyImpulse(obj: Object3D, imp: Vector3) {
    const b = getBody(obj); if (!b) return;
    b.applyImpulse({ x: imp.x, y: imp.y, z: imp.z }, true);
}

function buildTrimeshCollider(geom: BufferGeometry, world: RapierWorld, body: RigidBody) {
    const pos = geom.getAttribute('position');
    if (!pos) throw new Error('Geometry has no position attribute');
    const index = geom.getIndex();

    const vertices = new Float32Array(pos.array as ArrayLike<number>);
    const indices =
        index
            ? new Uint32Array(index.array as ArrayLike<number>)
            : new Uint32Array(Array.from({ length: vertices.length / 3 }, (_, i) => i));

    const desc = RAPIER.ColliderDesc.trimesh(vertices, indices);
    return world.createCollider(desc, body);
}

function buildAabbBoxCollider(mesh: Mesh, world: RapierWorld, body: RigidBody) {
    // гарантируем, что есть bounding box
    mesh.geometry.computeBoundingBox();
    const bb = mesh.geometry.boundingBox!;
    const size = new Vector3();
    bb.getSize(size);
    size.multiply(mesh.scale);

    const hx = size.x * 0.5;
    const hy = size.y * 0.5;
    const hz = size.z * 0.5;

    // создаём коллайдер
    const desc = RAPIER.ColliderDesc
        .cuboid(hx, hy, hz)
        .setFriction(0.8)       // трение, чтобы куб не скользил
        .setRestitution(0.05);  // упругость (отскок)

    // создаём коллайдер в мире
    const collider = world.createCollider(desc, body);

    // включаем CCD (continuous collision detection)
    // защищает от пролёта через узкие объекты при больших скоростях
    body.enableCcd(true);

    return collider;
}


export default async function Physics(scene: Scene): Promise<PhysicsController> {
    await RAPIER.init();

    const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

    // debug
    const debugGeom = new BufferGeometry();
    const debugMat = new LineBasicMaterial();
    const debugLines = new LineSegments(debugGeom, debugMat);
    scene.add(debugLines);

    const controller: PhysicsController = {
        world,
        getBody,
        setAngularDamping,
        setAngularVelocity,
        applyTorque,
        applyImpulse,

        addPhysics(obj: Object3D, isStatic?: boolean | number) {
            // находим первый Mesh в поддереве
            let mesh: Mesh | null = null;
            obj.traverse(o => {
                if (!mesh && (o as Mesh).isMesh && (o as Mesh).geometry) mesh = o as Mesh;
            });
            if (!mesh) return;

            obj.updateWorldMatrix(true, false);
            const p = new Vector3();
            const q = obj.quaternion.clone();
            obj.getWorldPosition(p);

            // режим
            let mode: 'fixed' | 'dynamic' = 'fixed';
            let mass: number | undefined;
            if (typeof isStatic === 'number') { mode = 'dynamic'; mass = isStatic; }
            else if (isStatic === false) { mode = 'dynamic'; }

            const desc = mode === 'fixed'
                ? RAPIER.RigidBodyDesc.fixed()
                : RAPIER.RigidBodyDesc.dynamic();

            desc.setTranslation(p.x, p.y, p.z).setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

            const body = world.createRigidBody(desc);
            if (mass != null && mode === 'dynamic') body.setAdditionalMass(mass, true);

            // collider: для fixed — точный trimesh; для dynamic — aabb box (Rapier не поддерживает динамический trimesh)
            let collider: Collider;
            if (mode === 'fixed') {
                collider = buildTrimeshCollider(mesh.geometry as BufferGeometry, world, body);
                links.set(obj, { body, collider, kind: 'fixed-trimesh' });
            } else {
                collider = buildAabbBoxCollider(mesh, world, body);
                links.set(obj, { body, collider, kind: 'dynamic-aabb' });
            }
        },

        // пересоздать статический тримеш (когда обновил геометрию чанка)
        refreshTrimesh(obj: Object3D) {
            const link = links.get(obj);
            if (!link || link.kind !== 'fixed-trimesh') return;
            world.removeCollider(link.collider, /*wakeUp=*/true);
            const mesh = obj as Mesh;
            link.collider = buildTrimeshCollider(mesh.geometry as BufferGeometry, world, link.body);
            links.set(obj, link);
        },

        update(dt: number) {
            world.timestep = dt;
            world.step();

            // синк позиций динамики в three
            for (const [obj, { body, kind }] of links) {
                if (kind !== 'dynamic-aabb') continue;
                const t = body.translation();
                const r = body.rotation();
                obj.position.set(t.x, t.y, t.z);
                obj.quaternion.set(r.x, r.y, r.z, r.w);
            }

            // debug lines
            const verts = world.debugRender(); // Float32Array
            debugGeom.setAttribute('position', new Float32BufferAttribute(verts as unknown as ArrayBuffer, 3));
            debugGeom.computeBoundingSphere();
        },
    } as PhysicsController;

    return controller;
}
