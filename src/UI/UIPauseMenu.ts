import { UIBase } from "./UIBase";

const UIPauseMenuStyles = {
    'display': 'none',
    'justifyContent': 'center',
    'alignItems': 'center',
    'position': 'absolute',
    'width': '100vw',
    'height': '100vh',
    'top': 0,
    'left': 0,
    'right': 0,
    'flexDirection': 'column',
    'backgroundImage': 'url("UI/pause.png")',
    'backgroundRepeat': 'no-repeat',
    'backgroundSize': 'cover',
}

const UIPauseMenuBody = `
    <div class="pause-menu">
        <button class="button">Продолжить</button>
        <button class="button">Настройки</button>
        <button class="button">Выйти из этого</button>
    </div>
`

class UIPauseMenu extends UIBase {
    constructor() {
        super(UIPauseMenuBody, UIPauseMenuStyles);
        this.handleEvents();
    }

    handleEvents() {
        const elements: NodeListOf<HTMLElement> = this.element.querySelectorAll('.button');
        elements.forEach((element) => {
            element.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target.textContent.toLowerCase() === 'продолжить') {
                    this.hide();
                } else {
                    event.stopPropagation();
                }
            })
        })
    }
}

const UIPauseMenuInstance = new UIPauseMenu();
export default UIPauseMenuInstance;

