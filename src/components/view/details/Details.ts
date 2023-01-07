import IProduct from '../../model/IProduct';
import { E, CartItem } from '../../model/Types';

export default class Coffee {
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

    changeBreadcrumb = (link: string) => {
        const breadCrumb = document.querySelector('.shop-item__breadcrumb') as E;
        breadCrumb.innerText = link;
    };

    changePhotos = (link: string[]) => {
        (document.querySelector('.image-main') as HTMLImageElement).src = link[0];
        const photosThumb = document.querySelectorAll<HTMLImageElement>('.image-thumb');
        photosThumb[0].src = link[0];
        photosThumb[1].src = link[1];
    };
    changeInfo = (data: IProduct, sorts: string) => {
        (document.querySelector('.shop-item__name-brand') as HTMLElement).innerText = data.brand + ' ' + data.name;
        (document.querySelector('.shop-item__description') as HTMLElement).innerText = data.description;
        (document.querySelector('.shop-item__brand') as HTMLElement).innerText = 'Бренд: ' + data.brand;
        (document.querySelector('.shop-item__roast') as HTMLElement).innerText = 'Обжарка: ' + data.roastLevel;
        (document.querySelector('.shop-item__sorts') as HTMLElement).innerText = 'Сорт: ' + sorts;
        (document.querySelector('.shop-item__weight') as HTMLElement).innerText = 'Вес: ' + data.weight;
        (document.querySelector('.shop-item__country') as HTMLElement).innerText = 'Страна: ' + data.country;
        (document.querySelector('.item-left__amount') as HTMLElement).innerText = String(data.stock);
        (document.querySelector('.total__price') as HTMLElement).innerText = String(data.price) + '$';
    };
    changePhotoOnClick = () => {
        const photosThumb = document.querySelectorAll<HTMLImageElement>('.image-thumb');
        const mainPhoto = document.querySelector('.image-main') as HTMLImageElement;
        photosThumb.forEach((photo) => {
            photo.addEventListener('click', (e) => {
                const target = e.target as HTMLImageElement;
                mainPhoto.src = target.src;
            });
        });
    };

    getSortsName = (data: IProduct) => {
        const arr: Array<string> = [];
        data.sorts.forEach((sort) => {
            arr.push(sort);
        });
        return arr.length > 1 ? arr.join(', ') : arr[0];
    };

    inCartChecker = (value: number) => {
        const addCartButton = document.querySelector('.button_cart') as E;
        if (window.localStorage.getItem('gb-cart') !== null) {
            const cart = JSON.parse(window.localStorage.getItem('gb-cart') || '[]');
            const shopItem: { id: number; amount: number; totalPrice: number } = cart.find(
                (s: CartItem) => s.id === value
            );
            if (shopItem) {
                addCartButton.classList.add('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзине';
            }
        }
    };

    addRemoveFromCartUsingButton = (data: IProduct) => {
        const addCartButton = document.querySelector('.button_cart') as E;
        addCartButton.addEventListener('click', () => {
            if (addCartButton.classList.contains('button_price_checked')) {
                addCartButton.classList.remove('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзину';

                if (window.localStorage.getItem('gb-cart') !== null) {
                    const cart = JSON.parse(window.localStorage.getItem('gb-cart') || '[]');
                    const index = cart.findIndex((s: CartItem) => s.id === data.id);
                    cart.splice(index, 1);
                    window.localStorage.setItem('gb-cart', JSON.stringify(cart));
                }
            } else {
                addCartButton.classList.add('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзине';

                const newCartItem: CartItem = {
                    id: data.id,
                    amount: 1,
                    totalPrice: data.price,
                };

                if (window.localStorage.getItem('gb-cart') !== null) {
                    const cart = JSON.parse(window.localStorage.getItem('gb-cart') || '[]');
                    cart.push(newCartItem);
                    window.localStorage.setItem('gb-cart', JSON.stringify(cart));
                } else {
                    window.localStorage.setItem('gb-cart', JSON.stringify([newCartItem]));
                }
            }
        });
    };
}