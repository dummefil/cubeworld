import { BLOCKS } from './blocks/BlocksEnum';
import Item from "./items/Item";

interface IInventory {
    add(item: Item): void | Item
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
        // this.addBtn = document.querySelector('.inventory-add')
        // this.deleteBtn = document.querySelector('.inventory-delete')

        // this.addBtn.addEventListener('click', () => {
        //     this.add(new Item(64, 1, BLOCKS.Water))
        // })
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
                    this.el.innerHTML = JSON.stringify(this.array, null, 2);
                    return;
                }
            }
        }
        if (this.array.length < this.maxSize) {
            this.array.push(item)
        }
        this.el.innerHTML = JSON.stringify(this.array, null, 2);
    }
    remove(index: number) {
        delete this.array[index]
        this.el.innerHTML = JSON.stringify(this.array, null, 2);
    }
}
