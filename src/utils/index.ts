// Random integer from <low, high> interval
export function randInt(low: number, high: number): number {
    return low + Math.floor(Math.random() * (high - low + 1));
}

// Javascript mod fix
export function mod(n: number, m: number): number {
    return (n % m + m) % m;
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