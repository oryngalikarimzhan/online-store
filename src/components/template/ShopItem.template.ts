import { STORENAME } from '../utilities/Constants';
import ITemplate from '../model/ITemplate';

export default class ShopItemPageTemplate implements ITemplate {
    template;
    readonly title = STORENAME;
    readonly description = 'This is a shop item page';

    constructor() {
        this.template = document.createElement('article');
        this.template.className = 'shop-item';
        this.template.innerHTML = `
            <section class="shop-item__breadcrumb">
                Кофе / Арабика / Средняя обжарка / Lavazza /&nbsp;<strong>Super Crema</strong>
            </section>
            <section class="shop-item__content">
                <div class="shop-item__images">
                    <div class="shop-item__image">
                        <img class="image-main" src="https://i.postimg.cc/kGmC3tc1/lavazza-1.jpg" alt="">
                    </div>
                    <div class="shop-item__thumbnails">
                        <div class="shop-item__thumbnail">
                            <img class="image-thumb" src="https://i.postimg.cc/kGmC3tc1/lavazza-1.jpg" alt="">
                        </div>
                        <div class="shop-item__thumbnail">
                            <img class="image-thumb" src="https://i.postimg.cc/L53pH6QH/lavazza-2.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="shop-item__info">
                    <div class="info__wrapper">
                        <div class="shop-item__name-brand">Lavazza Super Crema</div>
                        <div class="shop-item__description">Мягкий и сливочный эспрессо средней обжарки с нотками лесного ореха и коричневого сахара. 60% арабика и 40% робуста</div>
                        <div class="shop-item__brand">Бренд: Lavazza</div>
                        <div class="shop-item__roast">Обжарка: Средная</div>
                        <div class="shop-item__sorts">Сорт: Арабика, Робуста</div>
                        <div class="shop-item__weight">Вес: 1000г</div>
                        <div class="shop-item__country">Страна: Италия</div>
                    </div>

                </div>
                <div class="shop-item__control">
                        <div class="control__wrapper">
                            <div class="price-total">
                            <div class="total__text">
                                Цена:
                            </div>
                            <div class="total__price">
                                20$
                            </div>
                        </div>
                        <div class="stock__button">
                            <div class="stock__item-left">
                                <div class="item-left__text">
                                    В наличии:
                                </div>
                                <div class="item-left__amount">
                                    20
                                </div>
                            </div>
                        </div>
                        <div class="cart__button">
                            <div class="button_cart">
                                В корзину
                            </div>
                        </div>
                        <div class="buy-now__button">
                            <div class="button_buy-now">
                                Купить сейчас
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
