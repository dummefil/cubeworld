import { SphereGeometry, WireframeGeometry, LineSegments, Vector3, Scene } from 'three';

export function deleteOnTimer({ x, y, z }: Vector3, scene: Scene, timeInSec: number) {
    const geometry = new SphereGeometry(1, 12);
    const wireframe = new WireframeGeometry(geometry);
    const line = new LineSegments(wireframe);
    line.position.set(x, y, z);
    scene.add(line);
    // scene.add(sphere)
    setTimeout(() => {
        // scene.remove(sphere);
        scene.remove(line);
    }, timeInSec * 1000)
}
