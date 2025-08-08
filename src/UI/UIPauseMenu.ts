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
        <button class="continue button">Продолжить</button>
        <button class="settings button">Настройки</button>
        <button class="exit button">Выйти из этого</button>
    </div>
`

class UIPauseMenu extends UIBase {
    constructor() {
        super(UIPauseMenuBody, UIPauseMenuStyles);
        this.handleEvents();
    }

    handleEvents() {
        const continueButton = this.element.querySelector('.continue.button');
        continueButton.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.textContent.toLowerCase() === 'продолжить') {
                this.hide();
            } else {
                event.stopPropagation();
            }
        })

        const exitButton = this.element.querySelector('.exit.button');
        exitButton.addEventListener('click', () => {
            window?.electronAPI.quitApp();
        });
    }
}

const UIPauseMenuInstance = new UIPauseMenu();
export default UIPauseMenuInstance;

