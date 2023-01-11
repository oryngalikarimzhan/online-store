import { E } from '../../model/Types';

export default class Home {
    draw = (htmlElement: E) => {
        const contentContainer = document.querySelector('.main') as E;
        contentContainer.innerHTML = '';
        contentContainer.append(htmlElement);
    };
}
