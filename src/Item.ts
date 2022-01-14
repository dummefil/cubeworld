export default class Item {
    maxStack: number;
    currentStack: number;
    id: number;
    constructor(maxStack: number = 64, currentStack: number = 1, id: number) {
        this.maxStack = maxStack;
        this.currentStack = currentStack;
        this.id = id;
    }
}