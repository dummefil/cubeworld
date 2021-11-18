export default class Item {
    maxStack: number;
    currentStack: number;
    id: string;
    constructor(maxStack: number = 64, currentStack: number = 1, id: string = 'none') {
        this.maxStack = maxStack;
        this.currentStack = currentStack;
        this.id = id;
    }
}