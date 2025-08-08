import KeyBinds from "./KeyBinds";

export default class KeyboardSystem {
    private _keyPresses: Set<string>;
    private _doubleKeyPresses: Set<string>;
    private _keyBinds: KeyBinds;
    constructor() {
        this._keyPresses = new Set();
        this._doubleKeyPresses = new Set();
        this._keyBinds = new KeyBinds();

        const pressKey = (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();

            const keyBind = this._keyBinds.buildKeyBind(event);
            console.log(keyBind);
            if (this._keyBinds.has(keyBind)) {
                this._keyBinds.execute(keyBind);
            }

            const code = this.sanitizeKey(event.code);
            this.addKey(code);
        }

        const unpressKey = (event: KeyboardEvent) => {
            event.stopPropagation();
            event.preventDefault();

            const code = this.sanitizeKey(event.code);
            this.removeKey(code);
        }

        window.addEventListener('keydown', pressKey);
        window.addEventListener('keyup', unpressKey);
        //hack to prevent closing with hotkey ctrl+w, it will create prompt instead
        // window.addEventListener(
        //     'beforeunload',
        //     (e) => {
        //         e.preventDefault();
        //         //required by chrom(ium)e
        //         e.returnValue = '';
        //     },
        //     false
        // );
    }

    private addKey(key: string) {
        if (this.isKeyPressed(key)) {
            this._doubleKeyPresses.add(key);
        }
        this._keyPresses.add(key);
    }

    private removeKey(key: string) {
        this._keyPresses.delete(key);
    }

    private sanitizeKey(keyCode: string) {
        const filter = new RegExp('key|left|right|digit')
        return keyCode.toLowerCase().replace(filter, '');
    }

    public isKeyPressed(value: string): boolean {
        const key = value.toLowerCase(); //this.sanitizeKey too slow :(
        return this._keyPresses.has(key);
    }

    public isDoubleKeyPressed(value: string): boolean {
        const key = value.toLowerCase();
        return this._doubleKeyPresses.has(key);
    }
}