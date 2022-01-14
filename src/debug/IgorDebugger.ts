import { stringifyObject } from "./DebugHelpers";

enum CONSOLE_STATUS {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug",
}

export class IgorDebugger {
    private container: HTMLElement
    private messageContainer: HTMLElement
    private filter: CONSOLE_STATUS[] = [CONSOLE_STATUS.INFO, CONSOLE_STATUS.WARN, CONSOLE_STATUS.ERROR, CONSOLE_STATUS.DEBUG]
    constructor(container: HTMLElement, filter?: CONSOLE_STATUS[]) {
        if (filter) {
            this.filter = filter;
        }
        this.container = container;
        this.messageContainer = container.querySelector('.Igor-messages')
        this.bindConsole();
        this.bindEvents();
    }

    private bindConsole() {
        const originals = {}
        Object.keys(CONSOLE_STATUS).forEach((status) => {
            const _status = status.toLowerCase();
            const original = console[_status];
            console.log(_status);
            originals[_status] = original;
            const handler = (object: string | Error | Object) => {
                if (this.filter.indexOf[_status] > -1 && typeof original !== 'function') {
                    original.call(original, object);
                    if (object instanceof Object) {
                        this.printMessage(`[${status}] ${stringifyObject(object, 0, 1)}`,);
                    } else {
                        this.printMessage(`[${status}] ${object.toString()}`,);
                    }
                }
            }
            if (_status === CONSOLE_STATUS.INFO) {
                originals['log'] = console.log;
                console.log = handler;
            }

            console[_status] = handler;
        })
    }

    private parse(rawMessage: String) {
        //todo validation, to string
        return rawMessage;
    }

    private printMessage(rawMessage: String) {
        const message = this.parse(rawMessage);
        this.messageContainer.innerHTML += `${message}<br>`
        this.container.scrollTo({ left: 0, top: this.container.scrollHeight });
    }

    clear() {
        this.messageContainer.innerHTML = ''
    }

    bindEvents() {
        const clearButton = this.container.querySelector('.Igor-clear');
        const clearButtonlistener = () => {
            this.clear();
        }
        clearButton.addEventListener('click', clearButtonlistener);

        const maximizedSize = {
            width: '400px',
            height: '400px'
        }

        const initialWindowSize = {
            width: this.container.style.width,
            height: this.container.style.height
        }

        const maximizeButton = this.container.querySelector('.Igor-maximize')
        const maximizeButtonListener = () => {
            this.container.style.width = maximizedSize.width
            this.container.style.height = maximizedSize.height
        }
        maximizeButton.addEventListener('click', maximizeButtonListener)


        const minimizeButton = this.container.querySelector('.Igor-minimize')
        const minimizeButtonListener = () => {
            this.container.style.width = initialWindowSize.width
            this.container.style.height = initialWindowSize.height
        }
        minimizeButton.addEventListener('click', minimizeButtonListener)
    }
}