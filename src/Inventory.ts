import Item from "./Item";

interface IInventory {
    add(item: Item): Item | void
    remove(index: number): void;
}

export default class Inventory implements IInventory {
    private maxSize: number
    private array: Item[]

    private el: HTMLElement;
    // private addBtn: HTMLButtonElement;
    // private deleteBtn: HTMLButtonElement;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.array = [];
        this.el = document.querySelector('.inventory')
    }
    add(item: Item) {
        for (let i = 0; i < this.array.length; i++) {
            const currentItem = this.array[i];
            if (currentItem.id === item.id) {
                if (currentItem.maxStack === currentItem.currentStack) {
                    continue;
                }
                if (this.array.length <= this.maxSize) {
                    if (currentItem.currentStack + item.currentStack < currentItem.maxStack) {
                        this.array[i].currentStack += item.currentStack
                    } else {
                        item.currentStack = currentItem.currentStack + item.currentStack - currentItem.maxStack
                        this.array[i].currentStack = currentItem.maxStack;
                        if (item.currentStack > 0) {
                            this.array.push(item)
                        }
                    }
                    return;
                }
            }
        }
        if (this.array.length < this.maxSize) {
            this.array.push(item)
        }
    }
    remove(index: number) {
        delete this.array[index]
    }
}
