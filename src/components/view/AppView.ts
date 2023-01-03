import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';
import ShopTemplate from '../template/Shop.template';
import Shop from './Shop';

export default class AppView {
    private readonly shop: Shop;

    constructor() {
        this.shop = new Shop();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShopTemplate();
        const htmlElement = template.getPageTemplate();
        this.shop.draw(this.shop.getContentElement() ?? htmlElement, filteredProducts, products, queries);
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
