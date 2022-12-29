import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';
import ShoppingPageTemplate from '../template/ShoppingPageTemplate';
import Shop from './Shop';

export default class AppView {
    private readonly shop: Shop;

    constructor() {
        this.shop = new Shop();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShoppingPageTemplate();
        const contentElement = template.getPageTemplate();
        this.shop.draw(this.shop.getContentElement() ?? contentElement, filteredProducts, products, queries);
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
