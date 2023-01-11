import IProduct from '../../model/IProduct';
import { E, CartItem } from '../../model/Types';
import { getCartItemsArrFromLS, setCartItemsArrToLS } from '../../utilities/Utils';
import Cart from '../cart/Cart';
import Header from '../Header';

export default class Product {
    draw = (htmlElement: E, product?: IProduct) => {
        const contentContainer = document.querySelector('.main') as E;
        contentContainer.innerHTML = '';
        if (product) {
            this.addBreadcrumb(htmlElement, product);
            this.addImages(htmlElement, product);
            // this.changeInfo(product, this.getSortsName(product));
            // this.changePhotoOnClick();
            // this.inCartChecker(product.id);
            // this.addRemoveFromCartUsingButton(product);
            // this.buyNow(product, product.id);
            contentContainer.append(htmlElement);
        } else {
            contentContainer.insertAdjacentText('afterbegin', 'Товар не найден');
        }
    };

    buyNow = (data: IProduct, value: number) => {
        const checkoutBtn = document.querySelector('.buy-now__button') as E;
        checkoutBtn.addEventListener('click', () => {
            const cart = getCartItemsArrFromLS();
            if (cart !== null) {
                const shopItem: CartItem = cart.find((s: CartItem) => s.id === value);
                if (shopItem) {
                    window.location.hash = '#/cart';
                    window.setTimeout(() => {
                        Header.updateHeaderCart();
                        Cart.openCheckout();
                    }, 100);
                } else {
                    const newCartItem: CartItem = {
                        id: data.id,
                        amount: 1,
                        totalPrice: data.price,
                    };

                    if (cart !== null) {
                        cart.push(newCartItem);
                        setCartItemsArrToLS(cart);
                    } else {
                        setCartItemsArrToLS([newCartItem]);
                    }
                    window.location.hash = '#/cart';
                    window.setTimeout(() => {
                        Header.updateHeaderCart();
                        Cart.openCheckout();
                    }, 100);
                }
            }
        });
    };

    addBreadcrumb = (htmlElement: E, product: IProduct) => {
        (htmlElement.querySelector(
            '.shop-item__breadcrumb'
        ) as E).innerHTML = `Кофе / ${product.sorts[0]} / ${product.roastLevel} / ${product.brand} /&nbsp;<strong>${product.name}</strong>`;
    };

    addImages = (htmlElement: E, product: IProduct) => {
        // const thumbnailTemplate = htmlElement.querySelector('#shop-item-thumbnail__template') as HTMLTemplateElement;
        // const thumbnailsContainer = htmlElement.querySelector('.shop-item__thumbnails') as E;
        (htmlElement.querySelector('.image-main') as HTMLImageElement).src = product.images[0];

        // product.images.forEach((image) => {
        //     const thumbnailTemplateElement = <E>thumbnailTemplate.content.cloneNode(true);
        //     const thumbnailElement = thumbnailTemplateElement.querySelector('.shop-item__thumbnail') as E;
        //     thumbnailsContainer.append(thumbnailElement);
        // });
        // const photosThumb = document.querySelectorAll<HTMLImageElement>('.image-thumb');
        // photosThumb[0].src = link[0];
        // photosThumb[1].src = link[1];
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
        return arr.join(', ');
    };

    inCartChecker = (value: number) => {
        const addCartButton = document.querySelector('.button_cart') as E;
        const cart = getCartItemsArrFromLS();
        if (cart !== null) {
            const shopItem: CartItem = cart.find((s: CartItem) => s.id === value);
            if (shopItem) {
                addCartButton.classList.add('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзине';
            }
        }
    };

    addRemoveFromCartUsingButton = (data: IProduct) => {
        const addCartButton = document.querySelector('.button_cart') as E;
        const cart = getCartItemsArrFromLS();
        addCartButton.addEventListener('click', () => {
            if (addCartButton.classList.contains('button_price_checked')) {
                addCartButton.classList.remove('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзину';

                if (cart !== null) {
                    const index = cart.findIndex((s: CartItem) => s.id === data.id);
                    cart.splice(index, 1);
                    setCartItemsArrToLS(cart);
                }
            } else {
                addCartButton.classList.add('button_price_checked');
                (addCartButton as E).innerHTML = 'В корзине';

                const newCartItem: CartItem = {
                    id: data.id,
                    amount: 1,
                    totalPrice: data.price,
                };

                if (cart !== null) {
                    cart.push(newCartItem);
                    setCartItemsArrToLS(cart);
                } else {
                    setCartItemsArrToLS([newCartItem]);
                }
            }
            Header.updateHeaderCart();
        });
    };
}
