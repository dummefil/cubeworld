export default class KeyboardService {
    private _keyPresses: Set<string>;
    private _doubleKeyPresses: Set<string>;

    constructor() {
        this._keyPresses = new Set();
        this._doubleKeyPresses = new Set();

        const pressKey = (event: KeyboardEvent) => {
            const code = this.sanitizeKey(event.code);
            this.addKey(code);
        }

        const unpressKey = (event: KeyboardEvent) => {
            const code = this.sanitizeKey(event.code);
            this.removeKey(code);
        }

        window.addEventListener('keydown', pressKey);
        window.addEventListener('keyup', unpressKey);
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