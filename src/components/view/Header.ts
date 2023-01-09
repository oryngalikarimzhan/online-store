import { CartItem, E } from '../model/Types';
import { getCartItemsArrFromLS, getShopLinkFromSessionStorage } from '../utilities/Utils';

export default class Header {
    draw = () => {
        const header = document.querySelector('.header') as E;
        (document.querySelector('.burger') as E).addEventListener('click', () => {
            header.classList.toggle('header_burger-on');
        });

        const mediaPoint = window.matchMedia('(max-width: 1023px)');
        mediaPoint.addEventListener('change', () => {
            header.classList.remove('header_burger-on');
        });
        (document.querySelector('#shop-link') as HTMLLinkElement).href = getShopLinkFromSessionStorage();
        Header.updateHeaderCart();
    };

    static updateHeaderCart = () => {
        const cart = getCartItemsArrFromLS();
        if (cart.length > 0) {
            const totalAmount = cart.reduce((acc: number, cartItem: CartItem) => acc + cartItem.amount, 0);
            const totalPrice = cart.reduce(
                (acc: number, cartItem: CartItem) => acc + cartItem.totalPrice * cartItem.amount,
                0
            );
            (document.querySelector('.cart__total-amount') as E).innerHTML = `${totalAmount}`;
            (document.querySelector('.cart__total-price span') as E).innerHTML = `${totalPrice.toFixed(2)}$`;
            (document.querySelector('.cart__logo') as E).classList.add('cart__logo_full');
        } else {
            (document.querySelector('.cart__total-amount') as E).innerHTML = `${0}`;
            (document.querySelector('.cart__total-price span') as E).innerHTML = `${0}$`;
            (document.querySelector('.cart__logo') as E).classList.remove('cart__logo_full');
        }
    };
}
