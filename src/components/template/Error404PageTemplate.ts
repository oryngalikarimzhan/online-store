import ITemplate from '../model/ITemplate';
import { STORENAME } from '../utilities/Constants';

export default class Error404PageTemplate implements ITemplate {
    template;
    readonly title = '404 | ' + STORENAME;
    readonly description = 'Page not found';

    constructor() {
        this.template = document.createElement('article');
        this.template.innerHTML = `
            <section class="error-404">
                <div class="error-404__images">
                    <div class="error-404__img">
                        <img src="https://i.postimg.cc/MZnrvdxs/number0.png" alt="404">
                    </div>
                    <div class="error-404__img">
                        <img src="https://i.postimg.cc/PrZ3MJCY/number4.png" alt="404">
                    </div>
                    <div class="error-404__img">
                        <img src="https://i.postimg.cc/MZnrvdxs/number0.png" alt="404">
                    </div>
                </div>
                    <div class="error-404__text">
                        <h4>
                            Cтраница не найдена
                        </h4>
                    </div>
                <div class="error-404__button">
                    <button onclick="location.href='#shop'" class="button button_regular">
                        К покупке
                    </button>
                </div>
            </section>`;
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
