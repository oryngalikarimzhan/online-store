import { E } from '../../model/Types';

export default class NotFound {
    draw = (htmlElement: E) => {
        const contentContainer = document.querySelector('.main') as E;
        contentContainer.innerHTML = '';
        contentContainer.append(htmlElement);
    };
}
