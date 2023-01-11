import IProduct from '../../data/IProduct';
import { E, CartItem } from '../../data/Types';
import { buyNowEvent, getCartItemsArrFromLS, setCartItemsArrToLS } from '../../model/utilities/Utils';
import Header from '../Header';

export default class Product {
    draw = (htmlElement: E, product?: IProduct) => {
        const contentContainer = document.querySelector('.main') as E;
        contentContainer.innerHTML = '';
        if (product) {
            this.addBreadcrumb(htmlElement, product);
            this.addImages(htmlElement, product);
            this.addInfo(htmlElement, product);
            this.checkProduct(htmlElement, product);
            this.addProductCartButtonClickHandler(htmlElement, product);
            this.addIncreaseReduceButtonsClickHandler(htmlElement, product);
            this.addBuyNowButtonClickHandler(htmlElement, product);
        } else {
            htmlElement.innerText = 'Товар не найден';
        }
        contentContainer.append(htmlElement);
    };

    private addBreadcrumb = (htmlElement: E, product: IProduct) => {
        (htmlElement.querySelector(
            '.product-item__breadcrumb'
        ) as E).innerHTML = `Кофе / ${product.sorts[0]} / ${product.roastLevel} / ${product.brand} /&nbsp;<strong>${product.name}</strong>`;
    };

    private addImages = (htmlElement: E, product: IProduct) => {
        const thumbnailTemplate = htmlElement.querySelector('#product-item-thumbnail__template') as HTMLTemplateElement;
        const thumbnailsContainer = htmlElement.querySelector('.product-item__thumbnails') as E;
        (htmlElement.querySelector('.image-main') as HTMLImageElement).src = product.images[0];

        product.images.forEach((image) => {
            const thumbnailTemplateElement = <E>thumbnailTemplate.content.cloneNode(true);
            const thumbnailElement = thumbnailTemplateElement.querySelector('.product-item__thumbnail') as E;
            (thumbnailElement.querySelector('.image-thumb') as HTMLImageElement).src = image;
            thumbnailsContainer.append(thumbnailElement);
        });

        this.addThumbsClickHandler(htmlElement);
    };
    private addThumbsClickHandler = (htmlElement: E) => {
        const mainImage = document.querySelector('.image-main') as HTMLImageElement;
        (htmlElement.querySelector('.product-item__thumbnails') as E).addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.image-thumb') as HTMLImageElement;
            mainImage.src = closest.src;
        });
    };

    private addInfo = (htmlElement: E, product: IProduct) => {
        (htmlElement.querySelector('.product-item__name-brand') as E).innerText = product.brand + ' ' + product.name;
        (htmlElement.querySelector('.product-item__description') as E).innerText = product.description;
        (htmlElement.querySelector('.product-item__brand span') as E).innerText = product.brand;
        (htmlElement.querySelector('.product-item__roast span') as E).innerText = product.roastLevel;
        (htmlElement.querySelector('.product-item__sorts span') as E).innerText = product.sorts.join(', ');
        (htmlElement.querySelector('.product-item__weight span') as E).innerText = product.weight;
        (htmlElement.querySelector('.product-item__country span') as E).innerText = product.country;
        (htmlElement.querySelector('.item-left__amount') as E).innerText = `${product.stock}`;
        (htmlElement.querySelector('.total__price') as E).innerText = `${product.price}$`;
    };

    private checkProduct = (htmlElement: E, product: IProduct) => {
        const productCartButton = htmlElement.querySelector('.button_cart') as E;
        const cart = getCartItemsArrFromLS();
        let shopItem: CartItem | null;
        if (cart.length > 0) {
            shopItem = cart.find((s: CartItem) => s.id === product.id);
        } else {
            shopItem = null;
        }
        const itemAmount = htmlElement.querySelector('.stock__amount-item') as E;
        const priceInButton = productCartButton.querySelector('.button_cart__total-price span') as E;
        if (shopItem) {
            productCartButton.classList.add('button_cart_checked');
            (productCartButton.querySelector('.button_cart__text') as E).innerHTML = 'Сумма в корзине';
            itemAmount.innerHTML = `${shopItem.amount}`;
            const totalPrice = (shopItem.amount * shopItem.productPrice).toFixed(2);
            priceInButton.innerHTML = `${totalPrice}`;
        } else {
            itemAmount.innerHTML = `1`;
            priceInButton.innerHTML = `${product.price}`;
        }
    };

    private addProductCartButtonClickHandler = (htmlElement: E, product: IProduct) => {
        const productCartButton = htmlElement.querySelector('.button_cart') as E;

        productCartButton.addEventListener('click', () => {
            const cart = getCartItemsArrFromLS();

            if (productCartButton.classList.contains('button_cart_checked')) {
                productCartButton.classList.remove('button_cart_checked');
                (productCartButton.querySelector('.button_cart__text') as E).innerHTML = 'В корзину';

                if (cart.length > 0) {
                    const index = cart.findIndex((s: CartItem) => s.id === product.id);
                    cart.splice(index, 1);
                    setCartItemsArrToLS(cart);
                }
            } else {
                productCartButton.classList.add('button_cart_checked');
                (productCartButton.querySelector('.button_cart__text') as E).innerHTML = 'Cумма в корзине';
                const itemAmount = htmlElement.querySelector('.stock__amount-item') as E;
                const newCartItem: CartItem = {
                    id: product.id,
                    amount: +itemAmount.innerHTML,
                    productPrice: product.price,
                };

                if (cart.length > 0) {
                    cart.push(newCartItem);
                    setCartItemsArrToLS(cart);
                } else {
                    setCartItemsArrToLS([newCartItem]);
                }
            }
            Header.updateHeaderCart();
        });
    };

    private addIncreaseReduceButtonsClickHandler = (htmlElement: E, product: IProduct) => {
        const productCartButton = htmlElement.querySelector('.button_cart') as E;
        const itemAmount = htmlElement.querySelector('.stock__amount-item') as E;
        const priceInButton = productCartButton.querySelector('.button_cart__total-price span') as E;

        (htmlElement.querySelector('.reduce-item__image') as E).addEventListener('click', () => {
            if (+itemAmount.innerHTML > 1) {
                if (productCartButton.classList.contains('button_cart_checked')) {
                    const cart = getCartItemsArrFromLS();
                    if (cart.length > 0) {
                        const cartItem = cart.find((s: CartItem) => s.id === product.id);
                        cartItem.amount = cartItem.amount - 1;
                        itemAmount.innerHTML = `${cartItem.amount}`;
                        const totalPrice = (cartItem.amount * cartItem.productPrice).toFixed(2);
                        priceInButton.innerHTML = `${totalPrice}`;
                        setCartItemsArrToLS(cart);
                        Header.updateHeaderCart();
                    }
                } else {
                    itemAmount.innerHTML = `${+itemAmount.innerHTML - 1}`;
                    const totalPrice = (+priceInButton.innerHTML - product.price).toFixed(2);
                    priceInButton.innerHTML = `${totalPrice}`;
                }
            }
        });

        (htmlElement.querySelector('.increase-item__image') as E).addEventListener('click', () => {
            if (+itemAmount.innerHTML < product.stock) {
                if (productCartButton.classList.contains('button_cart_checked')) {
                    const cart = getCartItemsArrFromLS();
                    if (cart.length > 0) {
                        const cartItem = cart.find((s: CartItem) => s.id === product.id);
                        cartItem.amount = cartItem.amount + 1;
                        itemAmount.innerHTML = `${cartItem.amount}`;
                        const totalPrice = (cartItem.amount * cartItem.productPrice).toFixed(2);
                        priceInButton.innerHTML = `${totalPrice}`;
                        setCartItemsArrToLS(cart);
                        Header.updateHeaderCart();
                    }
                } else {
                    itemAmount.innerHTML = `${+itemAmount.innerHTML + 1}`;
                    const totalPrice = (+priceInButton.innerHTML + product.price).toFixed(2);
                    priceInButton.innerHTML = `${totalPrice}`;
                }
            }
        });
    };

    private addBuyNowButtonClickHandler = (htmlElement: E, product: IProduct) => {
        const checkoutBtn = htmlElement.querySelector('.buy-now__button') as E;
        const itemAmount = htmlElement.querySelector('.stock__amount-item') as E;

        checkoutBtn.addEventListener('click', () => {
            const cart = getCartItemsArrFromLS();
            if (cart.length > 0) {
                const cartItem = cart.find((s: CartItem) => s.id === product.id);
                if (cartItem) {
                    cartItem.amount = +itemAmount.innerHTML;
                } else {
                    cart.push({ id: product.id, amount: +itemAmount.innerHTML, productPrice: product.price });
                }
                setCartItemsArrToLS(cart);
            } else {
                setCartItemsArrToLS([{ id: product.id, amount: +itemAmount.innerHTML, productPrice: product.price }]);
            }
            Header.updateHeaderCart();
            buyNowEvent();
            window.location.hash = '#/cart';
        });
    };
}
