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
                                        <div class="prev-page"></div>
                                    </div>
                                    <div class="current-page">
                                        1
                                    </div>
                                    <div class="stock__add-item">
                                        <div class="next-page"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item__container"></div>

                    <template id="cart-item-template">
                        <div class="cart-outer-container">
                            <div class="cart-item__info">
                                <div class="cart-item__images">
                                    <div class="order-num"></div>
                                    <div class="cart-item__image">
                                        <img src="#" alt="">
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
                                                Цена: 
                                                <span>20</span>$ 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-item__devider"></div>
                        </div>
                    </template>
                </section>
                <section class="cart-item__summary">
                    <div class="promo">
                        <div class="promo-title">Промокод</div>
                        <input type="search" placeholder="Введите промокод" class="promocode">
                        <div class="promo-outside-container"></div>
                        <div class="promo-examples">Promo for test: 'RS', 'EPM'</div>
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
                                            <p class="discount-title">Экономия</p>
                                            <div class="discount-container"></div>
                                        </div>
                                        <div class="discount-title">
                                            <div class="discount-amount">20&nbsp;000&nbsp;₸</div>
                                        </div>
                                    </li>
                                </span>
                                <span class="">
                                    <li class="cart-summary__item cart-summary__item--bordered">
                                        <div class="cart-summary__term">
                                            <p class="">К оплате</p>
                                        </div>
                                        <div class="cart-summary__definition">
                                            <p class="cart-summary__old">1&nbsp;080&nbsp;470&nbsp;₸</p>
                                            <p class="cart-summary__amount">1&nbsp;080&nbsp;470&nbsp;₸</p>
                                        </div>
                                    </li>
                                </span>
                            </ul>
                            <button class="cart-summary__checkout-button">
                                <p class="">Оформить заказ</p>
                            </button>
                        <span class="">
                            <p class="rules">Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в интернет-магазине</p>
                        </span>
                    </div>
                    </div>
                    <template id="promo-template">
                        <div class="promo-line-container">
                            <div class="promo-text">Rolling Scopes School - 10%</div>
                            <div class="promo-apply-btn">Add</div>
                        </div>
                    </template>
                    <template id="discount-template">
                    <div class="discount-line-container">
                        <div class="discount-text">Rolling Scopes School - 10%</div>
                        <div class="discount-remove-btn">Remove</div>
                    </div>
                </template>
                </section>
                <div class="modal__overlay modal__overlay--hidden">
                <div class="modal__wrapper">
                    <form class="purchase-form">
                        <div class="form__input-field purchase__name" warner="">
                            <input type="text" class="form__input" placeholder="Имя и фамилия" required>
                            <div class="form__input-flag"></div>
                        </div>
                        <div class="form__input-field purchase__phone" warner="">
                            <input type="tel" class="form__input" placeholder="Телефон" required>
                            <div class="form__input-flag"></div>
                        </div>
                        <div class="form__input-field purchase__address" warner="">
                            <input type="text" class="form__input" placeholder="Адрес" required>
                            <div class="form__input-flag"></div>
                        </div>
                        <div class="form__input-field purchase__email" warner="">
                            <input type="email" class="form__input" placeholder="Электронная почта" required>
                            <div class="form__input-flag"></div>
                        </div>

                        <div class="form__credit-card purchase__credit-card">
                            <div class="credit-card">
                                <div class="credit-card__company"></div>
                                <div class="credit-card__number">
                                    Номер карты 
                                    <input type="text" class="credit-number-input card__input" maxlength="19" placeholder="0000 0000 0000 0000" title="16-ти значный номер карты" required>
                                </div>
                                <div class="credit-card__bottom">
                                    <div class="credit-card__expiration">
                                        Действителен до
                                        <input type="text" class="expiration-input card__input" placeholder="00/00" maxlength="5" title="месяц/год(последние 2 цифры)" required>
                                    </div>
                                    <div class="credit-card__cvv">
                                        CVV код
                                        <input type="text" class="cvv-input card__input" placeholder="000" maxlength="3" title="на обратной стороне карточки 3-х значный код" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__button">
                            <input type="submit" class="button button_submit">
                        </div>
                    </form>
                </div>
            </div>`;
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
