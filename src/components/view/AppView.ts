import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';
import ShopTemplate from '../template/Shop.template';
import { Header } from './Header';
import Shop from './shop/Shop';

export default class AppView {
    private readonly shop: Shop;
    private readonly header: Header;

    constructor() {
        this.shop = new Shop();
        this.header = new Header();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShopTemplate();
        const htmlElement = template.getPageTemplate();
        const oldHtmlElement = this.shop.getContentElement();
        if (oldHtmlElement) {
            this.shop.draw(oldHtmlElement, filteredProducts, products, queries);
        } else {
            this.shop.draw(htmlElement, filteredProducts, products, queries);
            this.header.draw();
            this.addPageHeaders(template);
        }
    };

    private addPageHeaders = (template: ITemplate) => {
        document.title = template.title as string;
        (document.querySelector('meta[name="description"]') as HTMLMetaElement).setAttribute(
            'content',
            template.description as string
        );
    };
}
