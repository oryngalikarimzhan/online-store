import { STORENAME } from '../model/utilities/Constants';
import ITemplate from '../data/ITemplate';

export default class ProductPageTemplate implements ITemplate {
    template;
    readonly title = STORENAME;
    readonly description = 'This is a shop item page';

    constructor() {
        this.template = document.createElement('article');
        this.template.className = 'product-item';
        this.template.innerHTML = `
            <section class="product-item__breadcrumb"></section>
            <section class="product-item__content">
                <div class="product-item__images">
                    <div class="product-item__image">
                        <img class="image-main" src="#">
                    </div>
                    <div class="product-item__thumbnails">
                        <template id="product-item-thumbnail__template">
                            <div class="product-item__thumbnail">
                                <img class="image-thumb" src="#">
                            </div>
                        </template>
                    </div>
                </div>
                <div class="product-item__info">
                    <div class="info__wrapper">
                        <div class="product-item__name-brand">Lavazza Super Crema</div>
                        <div class="product-item__description">Мягкий и сливочный эспрессо средней обжарки с нотками лесного ореха и коричневого сахара. 60% арабика и 40% робуста</div>
                        <div class="product-item__brand">Бренд: <span></span></div>
                        <div class="product-item__roast">Обжарка: <span></span></div>
                        <div class="product-item__sorts">Сорт: <span></span></div>
                        <div class="product-item__weight">Вес: <span></span></div>
                        <div class="product-item__country">Страна: <span></span></div>
                    </div>

                </div>
                <div class="product-item__control">
                    <div class="control__wrapper">
                        <div class="stock__button">
                            <div class="button_stock">
                                <div class="stock__reduce-item">
                                    <div class="reduce-item__image"></div>
                                </div>
                                <div class="stock__amount-item"></div>
                                <div class="stock__add-item">
                                    <div class="increase-item__image"></div>
                                </div>
                            </div>
                            <div class="stock__item-left">
                                <div class="item-left__text">
                                    В наличии:
                                </div>
                                <div class="item-left__amount"></div>
                            </div>
                        </div>
                        <div class="price-total">
                            <div class="total__text">
                                Цена:
                            </div>
                            <div class="total__price"></div>
                        </div>

                        <div class="product-item__cart-button">
                            <button class="button button_cart">
                                <div class="button_cart__text">
                                    В корзину
                                </div>
                                <div class="button_cart__total-price"><span></span>$</div>
                            </button>
                        </div>

                        <div class="buy-now__button">
                            <div class="button_buy-now">
                                <div class="buy-now__text">Купить сейчас</div>
                                <div class="buy-now__image"></div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>`;
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
