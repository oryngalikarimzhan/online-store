import { E } from '../../model/Types';

export default class Home {
    private contentElement: E | null = null;

    constructor() {
        this.contentElement = document.querySelector('.main') as E;
    }

    draw = (htmlElement: E) => {
        if (this.contentElement) {
            this.contentElement.innerHTML = '';
            this.contentElement.insertAdjacentElement('afterbegin', htmlElement);
        }
    };
}