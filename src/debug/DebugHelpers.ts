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

export function stringifyObject(object: Object, depth = 0, maxDepth = 2) {
    // change max_depth to see more levels, for a touch event, 2 is good
    if (depth > maxDepth)
        return 'Object';
    const obj = {};
    for (let key in object) {
        let value = object[key];
        if (value instanceof HTMLElement)
            // specify which properties you want to see from the node
            value = { id: value.id };
        else if (value instanceof Window)
            value = 'Window';
        else if (value instanceof Object)
            value = stringifyObject(value, depth + 1, maxDepth);

        obj[key] = value;
    }

    return depth ? obj : JSON.stringify(obj);
}