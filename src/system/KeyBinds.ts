import { isFunction } from "src/utils";

type KeyBindActions = {
    [key: string]: Function;
};

export default class KeyBinds {
    private _binds: KeyBindActions = {};

    buildKeyBind(event: KeyboardEvent): string {
        const parts: string[] = [];
        if (event.ctrlKey) parts.push('ctrl');
        if (event.shiftKey) parts.push('shift');
        if (event.altKey) parts.push('alt');
        if (event.metaKey) parts.push('meta');

        const skipCodes = [
            'ControlLeft', 'ControlRight',
            'ShiftLeft', 'ShiftRight',
            'AltLeft', 'AltRight',
            'MetaLeft', 'MetaRight'
        ];

        if (!skipCodes.includes(event.code)) {
            parts.push(event.code);
        }

        return parts.join('+').toLowerCase();
    }

    has(keyBind: string): boolean {
        return isFunction(this._binds[keyBind.toLowerCase()]);
    }

    execute<T = void>(keyBind: string): T {
        const action = this._binds[keyBind.toLowerCase()];
        if (!isFunction(action)) {
            throw new Error(`KeyBind "${keyBind}" not registered`);
        }
        return action();
    }

    bind(keyBind: string, callback: Function) {
        this._binds[keyBind.toLowerCase()] = callback;
    }

    unbind(keyBind: string) {
        delete this._binds[keyBind.toLowerCase()];
    }

    clear() {
        this._binds = {};
    }

    getAll(): KeyBindActions {
        return { ...this._binds };
    }
}
