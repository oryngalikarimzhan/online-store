import ITemplate from '../model/ITemplate';
import { STORENAME } from '../utilities/Constants';

export default class CartPageTemplate implements ITemplate {
    template;
    readonly title = 'Cart | ' + STORENAME;
    readonly description = 'This is a cart page';

    constructor() {
        this.template = document.createElement('article');
        this.template.className = 'cart-item';
        this.template.innerHTML = `
        <section class="cart-item__content">
                    <div class="cart-item__header">
                        <div class="cart-item__title">
                            Корзина
                        </div>
                        <div class="cart-item__page-control">
                            <div class="cart-item__limit">
                                Items per page: 
                                <input type="number" class="limit" min="1" max="5" value="3">
                            </div>
                            <div class="cart-item__pages">
                                Page: 
                                <div class="button_stock">
                                    <div class="stock__reduce-item">
                                        <div class="reduce-item__image"></div>
                                    </div>
                                    <div class="stock__amount-item">
                                        1
                                    </div>
                                    <div class="stock__add-item">
                                        <div class="add-item__image"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-item__info">
                        <div class="cart-item__images">
                            <div class="cart-item__image">
                                <img src="https://i.postimg.cc/kGmC3tc1/lavazza-1.jpg" alt="">
                            </div>
                        </div>
                        <div class="info__wrapper">
                            <div class="cart-item__name-brand">Lavazza Super Crema</div>
                            <div class="cart-item__description">Мягкий и сливочный эспрессо средней обжарки с нотками лесного ореха и коричневого сахара. 60% арабика и 40% робуста</div>
                        </div>
                        <div class="control__wrapper">
                            <div class="stock__button">
                                <div class="stock__item-left">
                                    <div class="item-left__text">
                                        Stock:
                                    </div>
                                    <div class="item-left__amount">
                                        20
                                    </div>
                                </div>
                                <div class="button_stock">
                                    <div class="stock__reduce-item">
                                        <div class="reduce-item__image"></div>
                                    </div>
                                    <div class="stock__amount-item">
                                        1
                                    </div>
                                    <div class="stock__add-item">
                                        <div class="add-item__image"></div>
                                    </div>
                                </div>
                                <div class="price-total">
                                    <div class="total__price">
                                        Цена: 20$
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item__devider"></div>
                </section>
                <section class="cart-item__summary">
                    <div class="promo">
                        <div class="promo-title">Промокод</div>
                        <input type="search" placeholder="Введите промокод" class="promocode">
                        <button class="button-promo">
                            <p class="button-promo__text">Применить</p></button>
                    </div>
                    <div class="cart-summary">
                        <div class="cart-summary__wrapper">
                            <div class="cart-summary__title">
                                <p class="cart-summary__total-price-title">Сумма к оплате</p>
                            </div>
                            <ul class="cart-summary__list">
                                <span class="">
                                    <li class="cart-summary__item">
                                        <div class="cart-summary__term">
                                            <p class="">3 товара на сумму</p>
                                        </div>
                                        <div class="cart-summary__definition">
                                            <p class="">1&nbsp;080&nbsp;470&nbsp;₸</p>
                                        </div>
                                    </li>
                                </span>
                                <span class="">
                                    <li class="cart-summary__item">
                                        <div class="cart-summary__term">
                                            <p class="">Экономия</p>
                                        </div>
                                        <div class="">
                                            <p class="">20&nbsp;000&nbsp;₸</p>
                                        </div>
                                    </li>
                                </span>
                                <span class="">
                                    <li class="cart-summary__item cart-summary__item--bordered">
                                        <div class="cart-summary__term">
                                            <p class="">К оплате</p>
                                        </div>
                                        <div class="cart-summary__definition">
                                            <p class="cart-summary__amount">1&nbsp;080&nbsp;470&nbsp;₸</p>
                                        </div>
                                    </li>
                                </span>
                            </ul>
                            <a class="cart-summary__checkout" href="/checkout">
                                <button class="cart-summary__checkout-button">
                                    <p class="">Оформить заказ</p>
                                </button>
                            </a>
                        <span class="">
                            <p class="rules">Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в интернет-магазине</p>
                        </span>
                    </div>
                    </div>
                </section>`;
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
