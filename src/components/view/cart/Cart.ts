import IProduct from '../../model/IProduct';
import { CartItem, E, PromoItem, I } from '../../model/Types';
import {
    getCartItemsArrFromLS,
    getTotalDiscount,
    setAppliedPromos,
    setCartItemsArrToLS,
    setTotalDiscount,
    getAppliedPromos,
} from '../../utilities/Utils';
import promo from '../../promo/promo.json';
import Header from '../Header';
import { getProductById } from '../../service/ProductsService';

export default class Cart {
    private contentElement: E;
    constructor() {
        this.contentElement = document.querySelector('.main') as E;
    }

    draw = (htmlElement: E) => {
        if (this.contentElement) {
            this.contentElement.innerHTML = '';
            this.contentElement.insertAdjacentElement('afterbegin', htmlElement);
        }
    };

    createCartList = (productInCart: IProduct, order: number) => {
        const cart = getCartItemsArrFromLS();
        const index = cart.findIndex((s: CartItem) => Number(s.id) === productInCart.id);
        const productInCartCardTemplate = document.querySelector('#cart-item-template') as HTMLTemplateElement;
        const cartCard = productInCartCardTemplate.content.cloneNode(true) as E;
        const cartElem = cartCard.querySelector('.cart-item__info') as E;

        cartElem.dataset.id = String(productInCart.id);
        (cartCard.querySelector('.cart-item__image img') as HTMLImageElement).src = productInCart.images[0];
        (cartCard.querySelector('.cart-item__description') as HTMLDivElement).innerText = productInCart.description;
        (cartCard.querySelector('.order-num') as HTMLDivElement).innerText = String(order);
        (cartCard.querySelector('.item-left__amount') as HTMLDivElement).innerText = String(productInCart.stock);
        (cartCard.querySelector('.stock__amount-item') as HTMLImageElement).innerText = cart[index].amount;
        (cartCard.querySelector(
            '.cart-item__name-brand'
        ) as HTMLDivElement).innerText = `${productInCart.brand} ${productInCart.name}`;

        const totalPriceTemp = cartCard.querySelector('.total__price span') as E;
        totalPriceTemp.innerText = String(`${(productInCart.price * cart[index].amount).toFixed(2)}`);

        const reduceBtn = cartCard.querySelector('.reduce-item__image') as E;
        const currentPage = document.querySelector('.current-page') as HTMLDivElement;
        const limit = document.querySelector('.limit') as HTMLInputElement;
        const currAmount = cartCard.querySelector('.stock__amount-item') as E;

        reduceBtn.addEventListener('click', () => {
            const cart = getCartItemsArrFromLS();
            if (cart !== null) {
                const id = productInCart.id;
                const index = cart.findIndex((s: CartItem) => Number(s.id) === +id);
                if (cart[index].amount !== 1) {
                    cart[index].amount -= 1;
                    setCartItemsArrToLS(cart);
                    currAmount.innerHTML = `${cart[index].amount}`;
                    Header.updateHeaderCart();
                    this.updateQtySum(getTotalDiscount());
                    totalPriceTemp.innerText = `${(cart[index].amount * productInCart.price).toFixed(2)}`;
                } else {
                    cart.splice(index, 1);
                    setCartItemsArrToLS(cart);
                    this.emptyCart();
                    Header.updateHeaderCart();
                    const numOfPages = Math.ceil(cart.length / +limit.value);
                    if (currentPage.textContent) {
                        if (+currentPage.textContent >= numOfPages) {
                            this.updateCart(numOfPages, Number(limit.value));
                            currentPage.innerText = String(numOfPages);
                        } else {
                            this.updateCart(Number(currentPage.textContent), Number(limit.value));
                        }
                    }
                    this.updateQtySum(getTotalDiscount());
                }
            }
        });

        const increaseBtn = cartCard.querySelector('.add-item__image') as E;
        increaseBtn.addEventListener('click', () => {
            const cart = getCartItemsArrFromLS();
            const id = productInCart.id;
            const index = cart.findIndex((s: CartItem) => Number(s.id) === id);

            if (cart[index].amount < productInCart.stock) {
                cart[index].amount += 1;
                setCartItemsArrToLS(cart);
                currAmount.innerHTML = `${cart[index].amount}`;
                Header.updateHeaderCart();
                totalPriceTemp.innerText = `${(cart[index].amount * productInCart.price).toFixed(2)}`;
            }
        });

        cartElem.addEventListener('click', (e) => {
            const target = e.target as E;
            if (target.closest('.cart-item__image') || target.closest('.cart-item__name-brand')) {
                window.location.hash = `#/coffee/${cartElem.dataset.id}`;
            }
        });

        return cartCard;
    };

    init = () => {
        this.updateCart(1, 3);
        this.updateQtySum();
        this.emptyCart();
        this.promoCheck(promo);
        this.initPromoDraw(promo);
        this.renderPopup();
        this.checkoutOperations();
    };

    static openCheckout = () => {
        const popupContainer = document.querySelector('.modal__overlay') as E;
        popupContainer.classList.remove('modal__overlay--hidden');
    };

    checkoutOperations = () => {
        const checkoutBtn = document.querySelector('.cart-summary__checkout-button') as E;
        const popupContainer = document.querySelector('.modal__overlay') as E;
        checkoutBtn.addEventListener('click', () => {
            popupContainer.classList.remove('modal__overlay--hidden');
        });

        popupContainer.addEventListener('click', (e) => {
            const target = e.target as E;
            if (!target.closest('.modal__wrapper')) {
                popupContainer.classList.add('modal__overlay--hidden');
            }
        });
    };

    renderPopup = () => {
        const modalWrapper = document.querySelector('.modal__wrapper') as E;
        const purchaseForm = document.querySelector('.purchase-form') as E;
        const nameInputContainer = document.querySelector('.purchase__name') as E;
        const phoneInputContainer = document.querySelector('.purchase__phone') as E;
        const addressInputContainer = document.querySelector('.purchase__address') as E;
        const emailInputContainer = document.querySelector('.purchase__email') as E;
        const creditCardNumberContainer = document.querySelector('.credit-card__number') as E;
        const creditCardExpirationContainer = document.querySelector('.credit-card__expiration') as E;
        const creditCardCvvContainer = document.querySelector('.credit-card__cvv') as E;
        const creditCardCompanyContainer = document.querySelector('.credit-card__company') as E;
        const formSubmitButton = document.querySelector('.form__button .button_submit') as E;

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
                    Header.updateHeaderCart();
                    setAppliedPromos([]);
                    setTotalDiscount(0);
                    window.location.hash = '#/shop';
                }, 5000);
            }
        });
    };

    updateCartByPages = () => {
        let page = 1;

        const cart = getCartItemsArrFromLS();
        const limit = document.querySelector('.limit') as HTMLInputElement;
        let limitPerPage: number;
        let numOfPages: number;

        const nextBtn = document.querySelector('.next-page') as HTMLDivElement;
        const prevBtn = document.querySelector('.prev-page') as HTMLDivElement;
        const currentPage = document.querySelector('.current-page') as HTMLDivElement;

        nextBtn.addEventListener('click', () => {
            limitPerPage = Number(limit.value);
            numOfPages = Math.ceil(cart.length / limitPerPage);
            if (page < numOfPages) {
                page += 1;
                currentPage.innerText = String(page);
                this.updateCart(page, limitPerPage);
            }
        });

        prevBtn.addEventListener('click', () => {
            limitPerPage = Number(limit.value);
            numOfPages = Math.ceil(cart.length / limitPerPage);
            if (page > 1) {
                page -= 1;
                currentPage.innerText = String(page);
                this.updateCart(page, limitPerPage);
            }
        });

        limit.addEventListener('input', () => {
            limitPerPage = Number(limit.value);
            numOfPages = Math.ceil(cart.length / limitPerPage);
            if (page > numOfPages) {
                page = numOfPages;
                this.updateCart(numOfPages, limitPerPage);
                currentPage.innerText = String(page);
            } else {
                this.updateCart(page, limitPerPage);
            }
        });
    };

    updateCart = (page: number, limitPerPage: number) => {
        const cart = getCartItemsArrFromLS();
        const container = document.querySelector('.cart-item__container') as E;
        container.innerHTML = '';
        for (let i = limitPerPage * (page - 1); i < limitPerPage * page; i += 1) {
            if (i < cart.length) {
                const element = getProductById(cart[i].id);
                if (container && element) {
                    container.append(this.createCartList(element, i + 1));
                }
            }
        }
    };

    private updateQtySum = (discountVal = 0) => {
        let qty = 0;
        let sum = 0;

        const qtyElem = document.querySelector('.cart-summary__term p') as E;
        const sumElem = document.querySelector('.cart-summary__definition p') as E;
        const totalElem = document.querySelector('.cart-summary__amount') as E;
        const discountElem = document.querySelector('.discount-amount') as E;
        const oldPriceElem = document.querySelector('.cart-summary__old') as E;
        const cart = getCartItemsArrFromLS();

        cart.forEach((product: CartItem) => {
            qty += product.amount;
            sum += product.totalPrice * product.amount;
        });

        const total = sum * ((100 - discountVal) / 100);
        const discount = (sum * discountVal) / 100;

        qtyElem.innerText = `Товары (${qty}шт) на сумму`;
        sumElem.innerText = `${sum.toFixed(2)}$`;
        totalElem.innerText = `${total.toFixed(2)}$`;
        discountElem.innerText = `- ${discount.toFixed(2)}$`;
        oldPriceElem.innerText = `${sum.toFixed(2)}$`;
    };

    private updateQtySumPromoAdd = (promo: PromoItem) => {
        let totalDiscount = 0;
        const discountElems = document.querySelectorAll<E>('.discount-line-container');
        discountElems.forEach((elem) => {
            const discountAmount = Number(promo[String(elem.dataset.code)].slice(-3, -1));
            totalDiscount += discountAmount;
        });
        setTotalDiscount(totalDiscount);
    };

    private emptyCart = () => {
        const cart = getCartItemsArrFromLS();
        if (cart.length === 0) {
            const container = document.querySelector('.cart-item') as E;
            container.innerHTML = '<div class="cart-empty">Cart is Empty</div>';
        }
    };

    private promoCheck = (promo: PromoItem) => {
        const promoInput = document.querySelector('.promocode') as HTMLInputElement;
        const promoContainer = document.querySelector('.promo-outside-container') as E;

        promoInput.addEventListener('input', (e) => {
            if (e.target) {
                const inputValue = (e.target as HTMLInputElement).value;
                const keys = Object.keys(promo);
                if (keys.includes(inputValue)) {
                    promoContainer.append(this.addPromoLine(promo, promo[inputValue.toLowerCase()]));
                } else {
                    promoContainer.innerHTML = '';
                }
            }
        });
    };

    private initPromoDraw = (promoData: PromoItem) => {
        const appliedPromos = getAppliedPromos();
        const discountContainer = document.querySelector('.discount-container') as E;
        appliedPromos.forEach((appliedPromo: string) => {
            if (appliedPromos.length > 0) {
                this.addDiscountVisibility();
                const newContainer = this.createDiscountLine(promoData, appliedPromo);
                const promoCode = Object.keys(promoData).find((key) => promoData[key] === appliedPromo);
                (newContainer.querySelector('.discount-line-container') as E).id = `${promoCode}`;
                (newContainer.querySelector('.discount-line-container') as E).dataset.code = `${promoCode}`;
                discountContainer.append(newContainer);
                this.updateQtySumPromoAdd(promoData);
                this.updateQtySum(getTotalDiscount());
            }
        });
    };

    private addPromoLine = (promoData: PromoItem, promo: string) => {
        const promoTemplate = document.querySelector('#promo-template') as HTMLTemplateElement;
        const promoLine = promoTemplate.content.cloneNode(true) as E;
        const promoText = promoLine.querySelector('.promo-text') as E;
        const discountContainer = document.querySelector('.discount-container') as E;
        promoText.innerText = promo;
        const addPromoBtn = promoLine.querySelector('.promo-apply-btn') as E;
        const promoCode = Object.keys(promoData).find((key) => promoData[key] === promo);
        addPromoBtn.addEventListener('click', () => {
            const promoAlreadyApplied = document.getElementById(`${promoCode}`);
            if (!promoAlreadyApplied) {
                this.addDiscountVisibility();
                const newContainer = this.createDiscountLine(promoData, promo);
                (newContainer.querySelector('.discount-line-container') as E).id = `${promoCode}`;
                (newContainer.querySelector('.discount-line-container') as E).dataset.code = `${promoCode}`;
                if (getAppliedPromos().length < 1) {
                    const promoArr: string[] = [];
                    promoArr.push(promo);
                    setAppliedPromos(promoArr);
                } else {
                    const alreadyApplied: string[] = getAppliedPromos();
                    alreadyApplied.push(promo);
                    setAppliedPromos(alreadyApplied);
                }
                discountContainer.append(newContainer);
                this.updateQtySumPromoAdd(promoData);
                this.updateQtySum(getTotalDiscount());
            }
        });
        return promoLine;
    };

    private createDiscountLine = (promoData: PromoItem, promo: string) => {
        const discountTemplate = document.querySelector('#discount-template') as HTMLTemplateElement;
        const discountLine = discountTemplate.content.cloneNode(true) as E;
        const discountText = discountLine.querySelector('.discount-text') as E;
        const removeDiscountBtn = discountLine.querySelector('.discount-remove-btn') as E;

        removeDiscountBtn.addEventListener('click', () => {
            removeDiscountBtn.closest('.discount-line-container')?.remove();
            const discountContainer = document.querySelectorAll<E>('.discount-line-container');
            this.updateQtySumPromoAdd(promoData);
            this.updateQtySum(getTotalDiscount());
            console.log(discountContainer.length);
            if (discountContainer.length === 0) {
                this.removeDiscountVisibility();
            }
            if (getAppliedPromos().length > 1) {
                let alreadyApplied: string[] = getAppliedPromos();
                const index = alreadyApplied.findIndex((el) => el === promo);
                alreadyApplied = alreadyApplied.slice(index, 1);
                setAppliedPromos(alreadyApplied);
            } else {
                setAppliedPromos([]);
            }
        });
        discountText.innerText = promo;
        return discountLine;
    };

    private addDiscountVisibility = () => {
        const discountTitles = document.querySelectorAll('.discount-title');
        discountTitles.forEach((title) => {
            if (!title.classList.contains('discount-title__visible')) {
                title.classList.add('discount-title__visible');
            }
        });
        const oldPriceElem = document.querySelector('.cart-summary__old') as E;
        oldPriceElem.classList.add('cart-summary__old--visible');
    };

    private removeDiscountVisibility = () => {
        const discountTitles = document.querySelectorAll('.discount-title');
        discountTitles.forEach((title) => {
            title.classList.remove('discount-title__visible');
        });
        const oldPriceElem = document.querySelector('.cart-summary__old') as E;
        oldPriceElem.classList.remove('cart-summary__old--visible');
    };
}
