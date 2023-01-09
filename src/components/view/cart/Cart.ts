import IProduct from '../../model/IProduct';
import { CartItem, E, PromoItem } from '../../model/Types';
import {
    getCartItemsArrFromLS,
    getTotalDiscount,
    setAppliedPromos,
    setCartItemsArrToLS,
    setTotalDiscount,
    getAppliedPromos,
} from '../../utilities/Utils';
import promo from '../../promo/promo.json';
import { Header } from '../Header';
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
        console.dir(cartCard);
        const cartElem = cartCard.querySelector('.cart-item__info') as E;
        cartElem.dataset.id = String(productInCart.id);
        (cartCard.querySelector('.cart-item__image img') as HTMLImageElement).src = productInCart.images[0];
        (cartCard.querySelector(
            '.cart-item__name-brand'
        ) as HTMLDivElement).innerText = `${productInCart.brand} ${productInCart.name}`;
        (cartCard.querySelector('.cart-item__description') as HTMLDivElement).innerText = productInCart.description;
        (cartCard.querySelector('.order-num') as HTMLDivElement).innerText = String(order);
        const totalPriceTemp = cartCard.querySelector('.total__price span') as E;
        (cartCard.querySelector('.item-left__amount') as HTMLDivElement).innerText = String(productInCart.stock);
        totalPriceTemp.innerText = String(`${(productInCart.price * cart[index].amount).toFixed(2)}`);
        (cartCard.querySelector('.stock__amount-item') as HTMLImageElement).innerText = cart[index].amount;
        cartElem.addEventListener('click', (e) => {
            const target = e.target as E;
            if (target.closest('.stock__reduce-item')) {
                totalPriceTemp.innerText = `${(parseFloat(totalPriceTemp.innerText) - productInCart.price).toFixed(2)}`;
            }
            if (target.closest('.stock__add-item')) {
                totalPriceTemp.innerText = `${(parseFloat(totalPriceTemp.innerText) + productInCart.price).toFixed(2)}`;
            }
        });

        const reduceBtn = cartCard.querySelector('.reduce-item__image') as E;
        const currentPage = document.querySelector('.current-page') as HTMLDivElement;
        const limit = document.querySelector('.limit') as HTMLInputElement;

        reduceBtn.addEventListener('click', (e) => {
            const cart = getCartItemsArrFromLS();
            if (cart !== null) {
                if (e.target) {
                    const target = e.target as Element;
                    const id = (target.closest('.cart-item__info') as HTMLElement).dataset.id;
                    const currAmount = target.parentNode?.nextSibling?.nextSibling as HTMLElement;
                    if (id) {
                        const index = cart.findIndex((s: CartItem) => Number(s.id) === +id);
                        if (currAmount.textContent && +currAmount.textContent !== 1) {
                            cart[index].amount -= 1;
                            setCartItemsArrToLS(cart);
                            currAmount.innerHTML = `${cart[index].amount}`;
                            Header.updateHeaderCart();
                            this.updateQtySum(getTotalDiscount());
                        } else if (currAmount.textContent && +currAmount.textContent === 1) {
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
                }
            }
        });

        const increaseBtn = cartCard.querySelector('.add-item__image') as E;
        increaseBtn.addEventListener('click', (e) => {
            const cart = getCartItemsArrFromLS();
            if (e.target) {
                const target = e.target as Element;
                const id = (target.closest('.cart-item__info') as HTMLElement).dataset.id;
                const currAmount = target.parentNode?.previousSibling?.previousSibling as HTMLElement;
                if (id) {
                    const index = cart.findIndex((s: CartItem) => Number(s.id) === +id);
                    const remaining = getProductById(+id)?.stock;

                    if (remaining && cart[index].amount < remaining) {
                        cart[index].amount += 1;
                        setCartItemsArrToLS(cart);
                        currAmount.innerHTML = `${cart[index].amount}`;
                        Header.updateHeaderCart();
                        this.updateQtySum(getTotalDiscount());
                    }
                }
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
