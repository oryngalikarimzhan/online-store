import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';
import ShopTemplate from '../template/Shop.template';
import { Header } from './Header';
import CoffeeItemTemplate from '../template/ShopItem.template';
import Shop from './shop/Shop';
import Coffee from './details/Details';
import Error404PageTemplate from '../template/NotFound.template';
import Error from './error/Error';
import CartPageTemplate from '../template/Cart.template';
import Cart from './cart/Cart';

export default class AppView {
    private readonly shop: Shop;
    private readonly header: Header;
    private readonly coffee: Coffee;
    private readonly error: Error;
    private readonly cart: Cart;

    constructor() {
        this.shop = new Shop();
        this.coffee = new Coffee();
        this.error = new Error();
        this.cart = new Cart();
        this.header = new Header();
        this.header.draw();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShopTemplate();
        const htmlElement = template.getPageTemplate();
        const oldHtmlElement = this.shop.getContentElement();
        if (oldHtmlElement) {
            this.shop.draw(oldHtmlElement, filteredProducts, products, queries);
        } else {
            this.shop.draw(htmlElement, filteredProducts, products, queries);
            this.addPageHeaders(template);
        }
    };

    renderCoffeePage = (num: IProduct) => {
        const template = new CoffeeItemTemplate();
        const htmlElement = template.getPageTemplate();
        this.coffee.draw(htmlElement);
        // const num = data[id - 1];
        const breadCrumbText = `Кофе / ${num.sorts} / ${num.roastLevel} / ${num.brand} / ${num.name}`;
        this.coffee.changeBreadcrumb(breadCrumbText);
        this.coffee.changePhotos(num.images);
        this.coffee.changeInfo(num, this.coffee.getSortsName(num));
        this.coffee.changePhotoOnClick();
        this.coffee.inCartChecker(num.id);
        this.coffee.addRemoveFromCartUsingButton(num);
        this.addPageHeaders(template);
    };

    renderCartPage = () => {
        const template = new CartPageTemplate();
        const htmlElement = template.getPageTemplate();
        this.cart.draw(htmlElement);
        this.cart.init();
        this.cart.updateCartByPages();
        this.addPageHeaders(template);
    };

    renderErrorPage = () => {
        const template = new Error404PageTemplate();
        const htmlElement = template.getPageTemplate();
        this.error.draw(htmlElement);
        this.addPageHeaders(template);
    };

    private addPageHeaders = (template: ITemplate) => {
        document.title = template.title as string;
        (document.querySelector('meta[name="description"]') as HTMLMetaElement).setAttribute(
            'content',
            template.description as string
        );
    };
}
