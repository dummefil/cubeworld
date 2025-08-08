import { isObject } from "src/utils";
import { createHTMLElementFromString } from "src/utils/DOMUtils";

export type UIStyles = {
    [key: string]: UIStyles | string | number
}

export abstract class UIBase {
    public element: HTMLElement
    constructor(body: string, styles?: UIStyles) {
        this.element = createHTMLElementFromString(body);
        if (styles) {
            this.handleStyles(this.element, styles);
        }
    }
    abstract handleEvents(): void;

    handleStyles(element: HTMLElement, styles: UIStyles) {
        for (const key in styles) {
            const value = styles[key];
            if (isObject(value)) {
                //TODO:: querySelector all and iterate
                const element = this.element.querySelector(key) as HTMLElement;
                this.handleStyles(element, value as UIStyles);
            } else {
                (element.style as any)[key] = value;
            }
        }
    }

    show() {
        this.element.style.display = 'flex';
        document.body.appendChild(this.element);
    }

    hide() {
        this.element.style.display = 'none';
        document.body.appendChild(this.element);
    }
}