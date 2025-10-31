// physics.d.ts
import type { Scene, Object3D, Vector3 } from 'three';
import type { World, RigidBody } from '@dimforge/rapier3d-compat';

export interface PhysicsController {
    /** Rapier мир (инстанс) */
    world: World;

    /** Шаг физики + (опц.) дебаг */
    update(dt: number, elapsedTime?: number): void;

    /** Добавить объект в физику: fixed (true), dynamic (false) или масса (number) */
    addPhysics(mesh: Object3D, isStatic?: boolean | number): void;

    /** Пересобрать статический тримеш-коллайдер после изменения геометрии */
    refreshTrimesh(obj: Object3D): void;

    /** Получить RigidBody по объекту three (если он был добавлен) */
    getBody(obj: Object3D): RigidBody | undefined;

    /** Настроить демпфирование вращения */
    setAngularDamping(obj: Object3D, v: number): void;

    /** Задать угловую скорость (рад/с) */
    setAngularVelocity(obj: Object3D, ang: Vector3): void;

    /** Приложить крутящий импульс */
    applyTorque(obj: Object3D, torque: Vector3): void;

    /** Приложить линейный импульс */
    applyImpulse(obj: Object3D, imp: Vector3): void;
}

/** Инициализация Rapier + контроллер */
export default function Physics(scene: Scene): Promise<PhysicsController>;


export {};
