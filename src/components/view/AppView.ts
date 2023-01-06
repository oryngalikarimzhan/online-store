import IProduct from '../model/IProduct';
import ITemplate from '../model/ITemplate';
import { QueryMap } from '../model/Types';
import ShopTemplate from '../template/Shop.template';
import CoffeeItemTemplate from '../template/ShopItem.template';
import Shop from './shop/Shop';
import Coffee from './details/Details';
import Error404PageTemplate from '../template/NotFound.template';
import Error from './error/Error';

export default class AppView {
    private readonly shop: Shop;
    private readonly coffee: Coffee;
    private readonly error: Error;

    constructor() {
        this.shop = new Shop();
        this.coffee = new Coffee();
        this.error = new Error();
    }

    renderShopPage = (filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        const template = new ShopTemplate();
        const htmlElement = template.getPageTemplate();
        this.shop.draw(this.shop.getContentElement() ?? htmlElement, filteredProducts, products, queries);
        this.addPageHeaders(template);
    };

    renderCoffeePage = (data: IProduct[], id: number) => {
        const template = new CoffeeItemTemplate();
        const htmlElement = template.getPageTemplate();
        this.coffee.draw(htmlElement);
        const num = data[id - 1];
        const breadCrumbText = `Кофе / ${num.sorts} / ${num.roastLevel} / ${num.brand} / ${num.name}`;
        this.coffee.changeBreadcrumb(breadCrumbText);
        this.coffee.changePhotos(num.images);
        const sorts = num.sorts.length > 1 ? num.sorts[0] + num.sorts[1] : num.sorts[0];
        this.coffee.changeInfo(num, sorts);
        this.coffee.changePhotoOnClick();
        this.coffee.inCartChecker(num.id);
        this.coffee.addRemoveFromCartUsingButton(num);
    };

    renderErrorPage = () => {
        const template = new Error404PageTemplate();
        const htmlElement = template.getPageTemplate();
        this.error.draw(htmlElement);
    };

    private addPageHeaders = (template: ITemplate) => {
        document.title = template.title as string;
        (document.querySelector('meta[name="description"]') as HTMLMetaElement).setAttribute(
            'content',
            template.description as string
        );
    };
}
