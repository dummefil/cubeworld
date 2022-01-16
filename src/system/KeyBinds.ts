import { isFunction } from "src/utils";

//todo where to save, where to load
type KeyBindActions = {
    [key: string]: Function
}

const metaKeys = [
    'Shift',
    'Control',
    ' '
]

export default class KeyBinds {
    private _binds: KeyBindActions = {};
    constructor() {

    }
    buildKeyBind(event: KeyboardEvent): string {
        let bindKey = '';
        if (event.ctrlKey) {
            bindKey += 'ctrl+'
        }
        if (event.shiftKey) {
            bindKey += 'shift+'
        }
        if (metaKeys.indexOf(event.key) === -1) {
            bindKey += event.key;
        }

        return bindKey
    }

    has(keyBind: string): boolean {
        return isFunction(this._binds[keyBind]);
    }

    execute<T>(keyBind: string): T {
        return this._binds[keyBind]();
    }
}