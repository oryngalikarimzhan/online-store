import { CartItem, E } from '../model/Types';

export class Header {
    draw = () => {
        const header = <E>document.querySelector('.header');
        (document.querySelector('.burger') as E).addEventListener('click', () => {
            if (header.classList.contains('header_burger-on')) {
                header.classList.remove('header_burger-on');
            } else {
                header.classList.add('header_burger-on');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && header.classList.contains('header_burger-on')) {
                header.classList.remove('header_burger-on');
            }
        });

        Header.updateHeaderCart();
    };

    static updateHeaderCart = () => {
        const cart = JSON.parse(window.localStorage.getItem('gb-cart') || '[]');
        if (cart.length > 0) {
            const totalAmount = cart.reduce((acc: number, cartItem: CartItem) => acc + cartItem.amount, 0);
            const totalPrice = cart.reduce((acc: number, cartItem: CartItem) => acc + cartItem.totalPrice, 0);
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
