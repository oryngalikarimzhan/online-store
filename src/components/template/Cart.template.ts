import ITemplate from '../data/ITemplate';
import { STORENAME } from '../model/utilities/Constants';

export default class CartPageTemplate implements ITemplate {
    template;
    readonly title = 'Cart | ' + STORENAME;
    readonly description = 'This is a cart page';

    constructor() {
        this.template = document.createElement('article');
        this.template.className = 'cart';
        this.template.innerHTML = `
            <section class="cart-items">
                <template id="empty-cart">
                    <div class="cart-empty">Корзина пуста</div>
                </template>
                <div class="cart-items__heading">
                    <div class="cart__title">
                        Корзина
                    </div>
                    <div class="cart-items__pagination-control">
                        <div class="pagination-control__limit">
                            На странице: 
                            <input type="number" class="limit-input" min="1">
                        </div>
                        <div class="pagination-control__buttons">
                            Страница: 
                            <div class="pagination-buttons">
                                <div class="pagination-button">
                                    <div class="prev-next button_prev"></div>
                                </div>
                                <div class="pagination__value">
                                    1
                                </div>
                                <div class="pagination-button">
                                    <div class="prev-next button_next"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-items__container"></div>
                <template id="cart-item-template">
                    <div class="cart-item__wrapper">
                        <div class="cart-item">
                            <div class="cart-item__order">1</div>
                            <div class="cart-item__image">
                                <img src="">
                            </div>
                            <div class="cart-item__info">
                                <div class="cart-item__name-brand"></div>
                                <div class="cart-item__description">
                                    <div class="cart-item__price">
                                        Цена:&nbsp;<span></span>$
                                    </div>
                                    <div class="cart-item__stock">
                                        В наличии:&nbsp;<span></span>шт.
                                    </div>
                                </div>
                            </div>
                            <div class="cart-item__control">
                            
                                <div class="control__button">
                                    <div class="button_stock">
                                        <div class="stock__reduce-item">
                                            <div class="reduce-increase reduce-item__image"></div>
                                        </div>
                                        <div class="stock__amount-item">2</div>
                                        <div class="stock__add-item">
                                            <div class="reduce-increase increase-item__image"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="control__item-total-price">
                                    <div class="item-total-price__text">
                                        Сумма:
                                    </div>
                                    <div class="item-total-price__num">
                                        <span></span>$ 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart-item__devider"></div>
                    </div>
                </template>
            </section>
            <section class="cart__summary">
                <div class="promos">
                    <div class="promos__title">Промокод</div>
                    <input type="search" class="promocode" placeholder="Введите промокод" title="Тестовые промокоды: 'RS', 'EPM'">
                    <div class="promo__container">
                    </div>
                    <template id="promo-template">
                        <div class="promo">
                            <div class="promo__text">Rolling Scopes School - 10%</div>
                            <div class="promo__button">Применить</div>
                        </div>
                    </template>
                </div>
                <div class="cart-summary">
                    <div class="cart-summary__title">
                        Итого
                    </div>
                    <div class="cart-summary__total-amount">
                        <div class="total-amount__text">
                            Количество товаров:
                        </div>
                        <div class="total-amount__value">
                            <span></span>шт.
                        </div>
                    </div>
                    <div class="cart-summary__total-price">
                        <div class="total-price__text">
                            На сумму:
                        </div>
                        <div class="total-price__value">
                            <span></span>$
                        </div>
                    </div>
                    <div class="cart-summary__total-discount">
                        <div class="total-discount__heading">
                            <div class="total-discount__text">
                                Промокоды:
                            </div>
                            <div class="total-discount__value">
                                -<span>0</span>$
                            </div>
                        </div>
                        <div class="total-discount__promos">
                            <template id="discount-template">
                                <div class="discount__promo">
                                    <div class="promo__text">Rolling Scopes School - 10%</div>
                                    <div class="promo__button">Не применять</div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="cart-summary__total-summary-price">
                        <div class="total-summary-price__text">
                            К оплате:
                        </div>
                        <div class="total-summary-price__value">
                            <span></span>$
                        </div>
                    </div>
                    <button class="cart-summary__button_checkout">
                        Оформить заказ
                    </button>
                    <span class="checkout__terms">
                        * Оформляя заказ, вы подтверждаете свое согласие с нашими условиями покупки в интернет-магазине
                    </span>
                </div>
            </section>
            <div class="modal__overlay modal__overlay_hidden">
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
