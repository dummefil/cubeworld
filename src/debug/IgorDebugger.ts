import { stringifyObject } from "./DebugHelpers";
import * as config from '../../config.json';
import { UIBase } from "src/UI/UIBase";

const UIIgorDebuggerBody = `
	<div class="Igor-container">
		<div class="Igor-elements">
			<div class="Igor-roll-up mini-button">⛔</div>
			<div class="Igor-maximize mini-button">⬆</div>
			<div class="Igor-minimize mini-button">⬇</div>
		</div>
		<div class="Igor-messages"></div>
		<button class="Igor-clear">clear</button>
	</div>
`

const UIIgorDebuggerStyles = {
    'position': 'absolute',
    'top': '0',
    'right': '0',
    'width': '300px',
    minHeight: '100px',
    borderRadius: '8px',
    backgroundColor: 'rgba(91, 152, 212, 0.74)',
    'display': 'flex',
    flexDirection: 'column',
    maxHeight: '50vh',
    overflowX: 'auto',
    fontSize: '12px',

    '.Igor-elements': {
        display: 'flex',
        'flexDirection': 'row-reverse',
    },

    '.Igor-clear': {
        marginTop: 'auto',
    }
}

enum CONSOLE_STATUS {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug",
}

class UIIgorDebugger extends UIBase {
    // private element: HTMLElement;
    private messageElement: HTMLElement;

    constructor() {
        super(UIIgorDebuggerBody, UIIgorDebuggerStyles);
        if (config.env !== 'development') {
            return;
        }
        console.warn('Igor Debugger is disabled rn as it\'s not fully working. Like everything in this project :)');
        return
        this.messageElement = this.element.querySelector('.Igor-messages')
        this.handleEvents();
        this.bindConsole();
        this.show()
    }

    private bindConsole() {
        const originals = {}
        Object.keys(CONSOLE_STATUS).forEach((status) => {
            const _status = status.toLowerCase();
            const original = console[_status];
            console.log(_status);
            originals[_status] = original;
            const handler = (object: string | Error | Object) => {
                if (typeof original !== 'function') {
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
        //TODO: validation, to string
        return rawMessage;
    }

    private printMessage(rawMessage: String) {
        const message = this.parse(rawMessage);
        this.messageElement.innerHTML += `${message}<br>`
        this.element.scrollTo({ left: 0, top: this.element.scrollHeight });
    }

    clear() {
        this.messageElement.innerHTML = ''
    }

    handleEvents() {
        const clearButton = this.element.querySelector('.Igor-clear');
        const clearButtonlistener = () => {
            this.clear();
        }
        clearButton.addEventListener('click', clearButtonlistener);

        const maximizedSize = {
            width: '400px',
            height: '400px'
        }

        const initialWindowSize = {
            width: this.element.style.width,
            height: this.element.style.height
        }

        const maximizeButton = this.element.querySelector('.Igor-maximize')
        const maximizeButtonListener = () => {
            this.element.style.width = maximizedSize.width
            this.element.style.height = maximizedSize.height
        }
        maximizeButton.addEventListener('click', maximizeButtonListener)


        const minimizeButton = this.element.querySelector('.Igor-minimize')
        const minimizeButtonListener = () => {
            this.element.style.width = initialWindowSize.width
            this.element.style.height = initialWindowSize.height
        }
        minimizeButton.addEventListener('click', minimizeButtonListener)
    }
}

const UIIgorDebuggerInstance = new UIIgorDebugger();
export default UIIgorDebuggerInstance;