
export function createHTMLElementFromString(string: string): HTMLElement {
    const element = new DOMParser().parseFromString(string, 'text/html');
    return element.documentElement.querySelector('body').firstChild as HTMLElement;
}