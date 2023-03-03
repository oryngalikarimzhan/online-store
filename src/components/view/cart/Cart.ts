import IProduct from '../../data/IProduct';
import { CartItem, DiscountItem, E, I } from '../../data/Types';
import { CARTLINK } from '../../model/utilities/Constants';
import {
    addParameterToQuery,
    buyNowEvent,
    deleteParameterFromQuery,
    getCartItemsArrFromLS,
    getDiscount,
    getDiscountsFromLS,
    getLinkFromSessionStorage,
    getParameterFromQuery,
    setCartItemsArrToLS,
    setDiscountsToLS,
} from '../../model/utilities/Utils';
import Header from '../Header';

export default class Cart {
    private contentElement: E | null = null;

    private page = 0;
    private limit = 0;
    private cartLength = 0;

    getContentElement = () => {
        if (
            this.contentElement &&
            ((document.querySelector('.main') as E).firstElementChild as E).className !== this.contentElement.className
        ) {
            this.contentElement = null;
        }
        return this.contentElement;
    };

    draw = (htmlElement: E, productsToView: IProduct[], page: number, limit: number) => {
        (document.querySelector('#cart-link') as HTMLLinkElement).href = getLinkFromSessionStorage(CARTLINK, '#/cart');
        const cart = getCartItemsArrFromLS();
        if (cart.length === 0) {
            (document.querySelector('.main') as E).innerHTML = '';
            const emptyCart = (htmlElement.querySelector('#empty-cart') as HTMLTemplateElement).content.cloneNode(
                true
            ) as E;
            htmlElement.innerHTML = '';
            htmlElement.append(emptyCart);
            (document.querySelector('.main') as E).append(htmlElement);
        } else {
            this.page = page;
            this.limit = limit;
            this.cartLength = cart.length;

            if (!this.contentElement) {
                this.contentElement = htmlElement;
                this.buildNewContent(productsToView, cart);
            } else {
                this.updateOldContent(productsToView, cart);
            }
            this.checkBuyNowEvent();
        }
    };

    private buildNewContent = (productsToView: IProduct[], cart: CartItem[]) => {
        this.showCartItemsList(productsToView, cart);
        this.checkPagination(false);
        this.countSummary();
        this.checkPromoDiscount();
        this.renderPopup();

        (document.querySelector('.main') as E).innerHTML = '';
        (document.querySelector('.main') as E).append(this.contentElement as E);
    };

    private updateOldContent = (productsToView: IProduct[], cart: CartItem[]) => {
        this.updateCartItemsList(productsToView, cart);
        this.checkPagination(true);
    };

    private updateCartItemsList = (productsToView: IProduct[], cart: CartItem[]) => {
        const cartItemsListContainer = (this.contentElement as E).querySelector('.cart-items__container') as E;
        cartItemsListContainer.innerHTML = '';

        const cartItemCardTemplate = (this.contentElement as E).querySelector(
            '#cart-item-template'
        ) as HTMLTemplateElement;

        for (const product of productsToView) {
            cartItemsListContainer.append(this.buildCartItemCard(cartItemCardTemplate, product, cart));
        }
    };

    private showCartItemsList(productsToView: IProduct[], cart: CartItem[]) {
        const cartItemCardTemplate = this.getTemplateElement('#cart-item-template');
        const cartItemsListContainer = (this.contentElement as E).querySelector('.cart-items__container') as E;

        for (const product of productsToView) {
            cartItemsListContainer.append(this.buildCartItemCard(cartItemCardTemplate, product, cart));
        }
    }

    private buildCartItemCard = (cartItemCardTemplate: HTMLTemplateElement, product: IProduct, cart: CartItem[]) => {
        const cartItemCard = <E>cartItemCardTemplate.content.cloneNode(true);

        const index = cart.findIndex((cartItem: CartItem) => cartItem.id === product.id);

        (cartItemCard.querySelector('.cart-item__order') as E).innerHTML = `${index + 1}`;
        (cartItemCard.querySelector('.cart-item__image img') as HTMLImageElement).src = product.images[0];
        (cartItemCard.querySelector('.cart-item__name-brand') as E).innerHTML = `${product.brand} ${product.name}`;
        (cartItemCard.querySelector('.cart-item__price span') as E).innerHTML = `${product.price}`;
        (cartItemCard.querySelector('.cart-item__stock span') as E).innerHTML = `${product.stock}`;

        const cartItemAmount = cartItemCard.querySelector('.stock__amount-item') as E;
        const cartItemTotalPrice = cartItemCard.querySelector('.item-total-price__num span') as E;
        const controlButton = cartItemCard.querySelector('.control__button') as E;

        cartItemAmount.innerHTML = `${cart[index].amount}`;
        cartItemTotalPrice.innerHTML = `${(cart[index].amount * cart[index].productPrice).toFixed(2)}`;

        const cartElement = cartItemCard.querySelector('.cart-item') as E;
        cartElement.dataset.id = `${product.id}`;

        this.addRedirectOnClickHandler(cartElement);
        this.addControlButtonClickHandler(controlButton, cartItemAmount, cartItemTotalPrice, product);
        return cartItemCard;
    };

    private addRedirectOnClickHandler = (cartElement: E) => {
        cartElement.addEventListener('click', (e) => {
            const target = e.target as E;
            if (target.closest('.cart-item__image img') || target.closest('.cart-item__name-brand')) {
                window.location.hash = `#/product/${cartElement.dataset.id}`;
            }
        });
    };

    private addControlButtonClickHandler = (
        controlButton: E,
        cartItemAmount: E,
        cartItemTotalPrice: E,
        product: IProduct
    ) => {
        controlButton.addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.reduce-increase') as E;

            const cart = getCartItemsArrFromLS();
            const index = cart.findIndex((cartItem: CartItem) => cartItem.id === product.id);

            if (closest && closest.classList.contains('reduce-item__image')) {
                if (cart[index].amount > 1) {
                    cart[index].amount = cart[index].amount - 1;
                    cartItemAmount.innerHTML = `${cart[index].amount}`;
                    const totalPrice = (cart[index].amount * cart[index].productPrice).toFixed(2);
                    cartItemTotalPrice.innerHTML = `${totalPrice}`;
                    setCartItemsArrToLS(cart);
                    Header.updateHeaderCart();
                } else {
                    cart.splice(index, 1);
                    setCartItemsArrToLS(cart);
                    Header.updateHeaderCart();

                    if (this.cartLength === 1) {
                        if (window.location.hash === '#/cart') window.location.hash = '#/cart/';
                        else window.location.hash = '#/cart';
                    } else {
                        this.cartLength--;

                        if (this.checkPagePossibility()) {
                            const pageParameter = getParameterFromQuery('page');
                            const newPageParameter = pageParameter
                                ? pageParameter.length === 1
                                    ? `${this.page} `
                                    : `${this.page}`
                                : this.page;
                            window.location.hash = addParameterToQuery(
                                'page',
                                `${newPageParameter}`,
                                deleteParameterFromQuery('page', `${pageParameter}`)
                            );
                        } else {
                            window.location.hash = addParameterToQuery(
                                'page',
                                `${this.page - 1}`,
                                deleteParameterFromQuery('page', `${this.page}`)
                            );
                        }
                    }
                }
            } else if (closest && closest.classList.contains('increase-item__image')) {
                if (cart[index].amount < product.stock) {
                    cart[index].amount = cart[index].amount + 1;
                    cartItemAmount.innerHTML = `${cart[index].amount}`;
                    const totalPrice = (cart[index].amount * cart[index].productPrice).toFixed(2);
                    cartItemTotalPrice.innerHTML = `${totalPrice}`;
                    setCartItemsArrToLS(cart);
                    Header.updateHeaderCart();
                }
            }
            this.countSummary();
        });
    };

    private checkPagination = (hasEvents: boolean) => {
        const paginationButtons = (this.contentElement as E).querySelector('.pagination-buttons') as E;
        const paginationButtonValueElement = paginationButtons.querySelector('.pagination__value') as E;
        const pageLimiterInput = (this.contentElement as E).querySelector('.limit-input') as I;

        paginationButtonValueElement.innerHTML = `${this.page}`;
        pageLimiterInput.value = `${this.limit}`;

        if (!hasEvents) {
            this.addPageLimiterInputHandler(pageLimiterInput, paginationButtonValueElement);
            this.addPaginationButtonsClickHandler(paginationButtons, paginationButtonValueElement);
        }
    };

    private addPageLimiterInputHandler = (pageLimiterInput: I, paginationButtonValueElement: E) => {
        pageLimiterInput.addEventListener('input', () => {
            if (+pageLimiterInput.value <= 0) {
                pageLimiterInput.value = `${1}`;
            }
            this.limit = +pageLimiterInput.value;

            let hash = addParameterToQuery(
                'limit',
                `${this.limit}`,
                deleteParameterFromQuery('limit', getParameterFromQuery('limit') as string)
            );

            if (!this.checkPagePossibility()) {
                paginationButtonValueElement.innerHTML = `${this.countMaxPossiblePages()}`;

                const pageParameter = getParameterFromQuery('page');
                if (pageParameter) {
                    hash = deleteParameterFromQuery('page', pageParameter, hash);
                    hash = addParameterToQuery('page', `${Math.ceil(this.cartLength / +pageLimiterInput.value)}`, hash);
                }
            }
            window.location.hash = hash;
        });
    };

    private addPaginationButtonsClickHandler = (paginationButtons: E, paginationButtonValueElement: E) => {
        paginationButtons.addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.prev-next') as E;

            if (closest && closest.classList.contains('button_next')) {
                if (this.checkPagePossibility(this.page + 1)) {
                    this.page = this.page + 1;
                    paginationButtonValueElement.innerHTML = `${this.page}`;

                    window.location.hash = addParameterToQuery(
                        'page',
                        paginationButtonValueElement.innerHTML,
                        deleteParameterFromQuery('page', getParameterFromQuery('page') as string)
                    );
                }
            } else if (closest && closest.classList.contains('button_prev')) {
                if (this.page > 1) {
                    this.page = this.page - 1;
                    paginationButtonValueElement.innerHTML = `${this.page}`;

                    window.location.hash = addParameterToQuery(
                        'page',
                        paginationButtonValueElement.innerHTML,
                        deleteParameterFromQuery('page', getParameterFromQuery('page') as string)
                    );
                }
            }
        });
    };

    private checkPagePossibility = (page = this.page) => {
        return this.countMaxPossiblePages() >= page;
    };

    private countMaxPossiblePages = () => {
        return Math.ceil(this.cartLength / this.limit);
    };

    private getTemplateElement(idSelector: string) {
        return (this.contentElement as E).querySelector(idSelector) as HTMLTemplateElement;
    }

    private countSummary = () => {
        const cart = getCartItemsArrFromLS();
        const discounts = getDiscountsFromLS();

        ((this.contentElement as E).querySelector('.total-amount__value span') as E).innerHTML = `${cart.reduce(
            (acc: number, cartItem: CartItem) => acc + cartItem.amount,
            0
        )}`;

        const totalPrice = cart
            .reduce((acc: number, cartItem: CartItem) => acc + cartItem.amount * cartItem.productPrice, 0)
            .toFixed(2);

        ((this.contentElement as E).querySelector('.total-price__value span') as E).innerHTML = `${totalPrice}`;

        let discountPrice = 0;
        if (discounts.length > 0) {
            discountPrice = +(
                (totalPrice * discounts.reduce((acc: number, discount: DiscountItem) => acc + discount.percent, 0)) /
                100
            ).toFixed(2);
        }
        ((this.contentElement as E).querySelector('.total-discount__value span') as E).innerHTML = `${discountPrice}`;
        ((this.contentElement as E).querySelector('.total-summary-price__value span') as E).innerHTML = `${(
            totalPrice - discountPrice
        ).toFixed(2)}`;
    };

    private checkPromoDiscount = () => {
        const discounts = getDiscountsFromLS();

        discounts.forEach((discount: DiscountItem) => {
            this.addDiscountCardToContainer(discount);
        });

        this.addPromoInputHandler();
    };

    private buildDiscountPromoCards = (
        discount: DiscountItem,
        discountPromoTemplate: HTMLTemplateElement,
        dataSelector: string
    ) => {
        const discountCard = discountPromoTemplate.content.cloneNode(true) as E;
        (discountCard.querySelector(dataSelector) as E).dataset.id = `${discount.key}`;
        (discountCard.querySelector('.promo__text') as E).innerHTML = `${discount.name} - ${discount.percent}%`;
        return discountCard;
    };

    private addDiscountCardToContainer = (discountPromo: DiscountItem) => {
        const discountPromoTemplate = this.getTemplateElement('#discount-template');
        const discountsContainer = (this.contentElement as E).querySelector('.total-discount__promos') as E;
        const discountCard = this.buildDiscountPromoCards(
            discountPromo,
            discountPromoTemplate,
            '.discount__promo'
        ) as E;

        (discountCard.querySelector('.promo__button') as E).addEventListener('click', () => {
            (discountsContainer.querySelector(`[data-id=${discountPromo.key}]`) as E).remove();
            const discounts = getDiscountsFromLS();
            discounts.splice(
                discounts.findIndex((d: DiscountItem) => d.key === discountPromo.key),
                1
            );
            setDiscountsToLS(discounts);
            this.countSummary();
        });

        discountsContainer.append(discountCard);
    };

    private addPromoInputHandler = () => {
        const promoInput = (this.contentElement as E).querySelector('.promocode') as I;
        const promoContainer = (this.contentElement as E).querySelector('.promo__container') as E;

        promoInput.addEventListener('input', () => {
            const inputValue = promoInput.value;
            const promoItem = getDiscount(inputValue) as DiscountItem | undefined;
            const discounts = getDiscountsFromLS();

            if (promoItem && discounts.filter((promo: DiscountItem) => promo.key === promoItem.key).length === 0) {
                const promoTemplate = this.getTemplateElement('#promo-template');
                const promoCard = this.buildDiscountPromoCards(promoItem, promoTemplate, '.promo');

                (promoCard.querySelector('.promo__button') as E).addEventListener('click', () => {
                    this.addDiscountCardToContainer(promoItem);
                    promoContainer.innerHTML = '';
                    promoInput.value = '';
                    discounts.push(promoItem);
                    setDiscountsToLS(discounts);
                    this.countSummary();
                });

                promoContainer.append(promoCard);
            } else {
                promoContainer.innerHTML = '';
            }
        });

        promoInput.addEventListener('blur', () => {
            promoInput.value = '';
        });
    };

    private renderPopup = () => {
        const checkoutButton = (this.contentElement as E).querySelector('.cart-summary__button_checkout') as E;
        const overlay = (this.contentElement as E).querySelector('.modal__overlay') as E;
        checkoutButton.addEventListener('click', () => {
            overlay.classList.toggle('modal__overlay_hidden');
        });

        overlay.addEventListener('click', (e) => {
            const target = e.target as E;
            if (target && target.classList.contains('modal__overlay')) {
                overlay.classList.toggle('modal__overlay_hidden');
            }
        });

        const modalWrapper = (this.contentElement as E).querySelector('.modal__wrapper') as E;
        const purchaseForm = (this.contentElement as E).querySelector('.purchase-form') as E;
        const nameInputContainer = (this.contentElement as E).querySelector('.purchase__name') as E;
        const phoneInputContainer = (this.contentElement as E).querySelector('.purchase__phone') as E;
        const addressInputContainer = (this.contentElement as E).querySelector('.purchase__address') as E;
        const emailInputContainer = (this.contentElement as E).querySelector('.purchase__email') as E;
        const creditCardNumberContainer = (this.contentElement as E).querySelector('.credit-card__number') as E;
        const creditCardExpirationContainer = (this.contentElement as E).querySelector('.credit-card__expiration') as E;
        const creditCardCvvContainer = (this.contentElement as E).querySelector('.credit-card__cvv') as E;
        const creditCardCompanyContainer = (this.contentElement as E).querySelector('.credit-card__company') as E;
        const formSubmitButton = (this.contentElement as E).querySelector('.form__button .button_submit') as E;

        const nameInput = nameInputContainer.querySelector('.form__input') as I;
        const nameFlag = nameInputContainer.querySelector('.form__input-flag') as E;

        nameInput.addEventListener('input', () => {
            nameInputContainer.setAttribute('warner', '');
            nameFlag.classList.remove('form__input-flag_invalid');
            const firstLast = nameInput.value.split(' ');
            if (firstLast.length > 1 && firstLast.every((s) => s.length >= 2)) {
                nameFlag.classList.add('form__input-flag_valid');
                nameFlag.classList.remove('form__input-flag_invalid');
                nameInputContainer.setAttribute('warner', '');
                nameInput.setCustomValidity('');
            } else {
                nameInputContainer.setAttribute('warner', 'Не менее 2 слов по 2 символа(буквы)');
                nameFlag.classList.add('form__input-flag_invalid');
                nameFlag.classList.remove('form__input-flag_valid');
                nameInput.setCustomValidity('Не менее 2 слов по 2 символа(буквы)');
            }
        });

        const phoneInput = phoneInputContainer.querySelector('.form__input') as I;
        const phoneFlag = phoneInputContainer.querySelector('.form__input-flag') as E;

        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value.startsWith('+')) {
                phoneInput.value = '+';
            }
        });

        phoneInput.addEventListener('input', () => {
            const value = phoneInput.value;
            const numberValue = value.slice(1);
            if (value[0] !== '+' || (numberValue.length >= 1 && !/[0-9]/.test(numberValue[numberValue.length - 1]))) {
                phoneInput.value = phoneInput.value.slice(0, -1);
                phoneInputContainer.setAttribute('warner', 'Знак + и только цифры');
            } else {
                if (/^[+][0-9]{9,}$/.test(phoneInput.value)) {
                    phoneFlag.classList.remove('form__input-flag_invalid');
                    phoneFlag.classList.add('form__input-flag_valid');
                    phoneInputContainer.setAttribute('warner', '');
                    phoneInput.setCustomValidity('');
                } else {
                    phoneFlag.classList.add('form__input-flag_invalid');
                    phoneFlag.classList.remove('form__input-flag_valid');
                    phoneInputContainer.setAttribute('warner', 'Должен иметь формат +00000000000 (мин. 9 цифр)');
                    phoneInput.setCustomValidity('Должен иметь формат +00000000000 (мин. 9 цифр)');
                }
            }
        });

        const addressInput = addressInputContainer.querySelector('.form__input') as I;
        const addressFlag = addressInputContainer.querySelector('.form__input-flag') as E;

        addressInput.addEventListener('input', () => {
            const addressArr = addressInput.value.split(' ');
            if (addressArr.length < 3 || addressArr.slice(0, 3).some((s) => s.length < 5)) {
                addressInputContainer.setAttribute('warner', 'Не менее 3 слов по 5 символов(буквы)');
                addressFlag.classList.add('form__input-flag_invalid');
                addressFlag.classList.remove('form__input-flag_valid');
                addressInput.setCustomValidity('Не менее 3 слов по 5 символов(буквы)');
            } else {
                addressInputContainer.setAttribute('warner', '');
                addressFlag.classList.remove('form__input-flag_invalid');
                addressFlag.classList.add('form__input-flag_valid');
                addressInput.setCustomValidity('');
            }
        });

        const emailInput = emailInputContainer.querySelector('.form__input') as I;
        const emailFlag = emailInputContainer.querySelector('.form__input-flag') as E;

        emailInput.addEventListener('input', () => {
            const rsl = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value);
            if (!rsl) {
                emailInputContainer.setAttribute('warner', 'Неправильный формат email адреса');
                emailFlag.classList.add('form__input-flag_invalid');
                emailFlag.classList.remove('form__input-flag_valid');
                emailInput.setCustomValidity('Неправильный формат email адреса');
            } else {
                emailInputContainer.setAttribute('warner', '');
                emailFlag.classList.remove('form__input-flag_invalid');
                emailFlag.classList.add('form__input-flag_valid');
                emailInput.setCustomValidity('');
            }
        });

        const creditCardNumberInput = creditCardNumberContainer.querySelector('.card__input') as I;

        creditCardNumberInput.addEventListener('input', () => {
            const value = creditCardNumberInput.value;
            if (value.startsWith('3')) {
                creditCardCompanyContainer.className = 'credit-card__company credit-card__company_visa';
            } else if (value.startsWith('4')) {
                creditCardCompanyContainer.className = 'credit-card__company credit-card__company_mastercard';
            } else if (value.startsWith('5')) {
                creditCardCompanyContainer.className = 'credit-card__company credit-card__company_unionpay';
            } else if (value.startsWith('6')) {
                creditCardCompanyContainer.className = 'credit-card__company credit-card__company_jcb';
            } else {
                creditCardCompanyContainer.className = 'credit-card__company credit-card__company_credit';
            }
            const dataSetValue = creditCardNumberInput.dataset.value;
            const joinedValue = value.split(' ').join('');

            if (
                joinedValue.length % 4 === 0 &&
                dataSetValue?.length === value.length - 1 &&
                joinedValue.length !== 16
            ) {
                creditCardNumberInput.value += ' ';
            } else if (
                joinedValue.length !== 1 &&
                joinedValue.length % 4 === 1 &&
                dataSetValue?.length === value.length - 1 &&
                joinedValue.length !== 16
            ) {
                creditCardNumberInput.value =
                    creditCardNumberInput.value.slice(0, -1) + ' ' + creditCardNumberInput.value.slice(-1);
            }

            creditCardNumberInput.dataset.value = value;

            if (!/^[0-9 ]{1,19}$/.test(value)) {
                creditCardNumberInput.value = creditCardNumberInput.value.slice(0, -1);
            }

            const numberValue = value.split(' ').join('');
            if (numberValue.length < 16 || Number.isNaN(+numberValue)) {
                creditCardNumberInput.style.outline = '1px solid red';
                creditCardNumberInput.setCustomValidity('Должны ввести 16-ти значный номер карты');
            } else {
                creditCardNumberInput.style.outline = 'none';
                creditCardNumberInput.setCustomValidity('');
            }
        });

        const creditCardExpirationInput = creditCardExpirationContainer.querySelector('.card__input') as I;

        creditCardExpirationInput.addEventListener('input', () => {
            const value = creditCardExpirationInput.value;
            const dataSetValue = creditCardExpirationInput.dataset.value;
            if (value.length === 2 && dataSetValue?.length === 1) creditCardExpirationInput.value += '/';
            if (!/^(0[1-9]|10|11|12)\/([2-9][3-9]|[3-9][0-9])$/.test(value)) {
                creditCardExpirationInput.style.outline = '1px solid red';
                creditCardExpirationInput.setCustomValidity('Должен иметь формат месяц/год(последние 2 цифры)');
            } else {
                creditCardExpirationInput.style.outline = 'none';
                creditCardExpirationInput.setCustomValidity('');
            }
            creditCardExpirationInput.dataset.value = value;
        });

        const creditCardCvvInput = creditCardCvvContainer.querySelector('.card__input') as I;

        creditCardCvvInput.addEventListener('input', () => {
            const value = creditCardCvvInput.value;
            if (!/^[0-9]{1,3}$/.test(value)) creditCardCvvInput.value = creditCardCvvInput.value.slice(0, -1);
            if (!/^[0-9]{3}$/.test(value)) {
                creditCardCvvInput.style.outline = '1px solid red';
                creditCardCvvInput.setCustomValidity('Должны ввести 3-х значный код на обратной стороне карточки');
            } else {
                creditCardCvvInput.style.outline = 'none';
                creditCardCvvInput.setCustomValidity('');
            }
        });

        formSubmitButton.addEventListener('click', (e) => {
            if (
                nameInput.checkValidity() &&
                phoneInput.checkValidity() &&
                addressInput.checkValidity() &&
                emailInput.checkValidity() &&
                creditCardNumberInput.checkValidity() &&
                creditCardExpirationInput.checkValidity() &&
                creditCardCvvInput.checkValidity()
            ) {
                purchaseForm.style.visibility = 'hidden';
                modalWrapper.style.height = '300px';
                modalWrapper.style.padding = '100px 30px 50px';
                modalWrapper.insertAdjacentText(
                    'afterbegin',
                    'Вы успешно оформили покупку. Спасибо за ваше доверие. Через несколько секунд страница перенесётся на страницу каталога товаров'
                );
                e.preventDefault();
                window.setTimeout(() => {
                    setCartItemsArrToLS([]);
                    setDiscountsToLS([]);
                    Header.updateHeaderCart();
                    window.location.hash = '#/shop';
                }, 3000);
            }
        });
    };

    private checkBuyNowEvent = () => {
        if (buyNowEvent(true) !== null) {
            ((this.contentElement as E).querySelector('.modal__overlay') as E).classList.toggle(
                'modal__overlay_hidden'
            );
        }
    };
}
