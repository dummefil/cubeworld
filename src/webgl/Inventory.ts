type Item = {
    maxStack: number
    currentStack: number
    id: number
}

export default class Inventory {
    private maxSize: number
    private array: Item[]
    constructor() {
        this.maxSize = 8
        this.array = [];
    }
    add(item: Item) {
        for (let i = 0; i < this.array.length; i++) {
            const currentItem = this.array[i];
            if (currentItem.id === item.id) {
                if (currentItem.maxStack === currentItem.currentStack){
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
                    console.log(this.array)
                    return;
                }
            }
        }
        if (this.array.length < this.maxSize) {
            this.array.push(item)
        }
        console.log(this.array)
    }
    remove(index : number) {
        delete this.array[index]
    }
}
