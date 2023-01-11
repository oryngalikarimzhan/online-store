import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';

import Header from './Header';
import Shop from './shop/Shop';
import Product from './product/Product';
import NotFound from './not-found/NotFound';
import Cart from './cart/Cart';
import Home from './home/Home';

import ShopPageTemplate from '../template/Shop.template';
import ProductPageTemplate from '../template/Product.template';
import NotFoundPageTemplate from '../template/NotFound.template';
import CartPageTemplate from '../template/Cart.template';
import HomePageTemplate from '../template/Home.template';

export default class AppView {
    private readonly header: Header;
    private readonly home: Home;
    private readonly notFound: NotFound;
    private readonly shop: Shop;
    private readonly product: Product;
    private readonly cart: Cart;

    constructor() {
        this.header = new Header();
        this.home = new Home();
        this.notFound = new NotFound();
        this.shop = new Shop();
        this.product = new Product();
        this.cart = new Cart();

        this.header.draw();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShopPageTemplate();
        const oldHtmlElement = this.shop.getContentElement();
        if (oldHtmlElement !== null) {
            this.shop.draw(oldHtmlElement, filteredProducts, products, queries);
        } else {
            this.shop.draw(template.getPageTemplate(), filteredProducts, products, queries);
            this.addPageHeaders(template);
        }
    };

    renderProductPage = (product: IProduct | undefined) => {
        const template = new ProductPageTemplate();
        this.product.draw(template.getPageTemplate(), product);
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

    renderHomePage = () => {
        const template = new HomePageTemplate();
        this.home.draw(template.getPageTemplate());
        this.addPageHeaders(template);
    };

    renderNotFoundPage = () => {
        const template = new NotFoundPageTemplate();
        this.notFound.draw(template.getPageTemplate());
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
