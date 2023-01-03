import { RequestPath } from '../model/Types';
import ProductsService from '../service/ProductsService';
import IProduct from '../model/IProduct';
import AppView from '../view/AppView';

export default class AppController {
    private readonly view: AppView;
    private readonly filtersMap = new Map([
        ['sorts', ProductsService.getProductsBySorts],
        ['roast', ProductsService.getProductsByRoastLevels],
        ['brands', ProductsService.getProductsByBrands],
        ['prices', ProductsService.getProductsByPrices],
        ['stock', ProductsService.getProductsByStockAmount],
        ['order', ProductsService.getAndOrderProductsBy],
        ['search', ProductsService.getProductsBySearchText],
    ]);
    constructor() {
        this.view = new AppView();
    }

    getShopPage = (params: RequestPath) => {
        let filteredProducts: IProduct[] = ProductsService.getAllProducts();
        if (params.queries) {
            for (const queryName of Object.keys(params.queries)) {
                const method = this.filtersMap.get(queryName);
                if (method !== undefined) {
                    filteredProducts = method(filteredProducts, params.queries[queryName]);
                }
            }

            console.group('Filtered products');
            console.log(filteredProducts);
            console.groupEnd();

            this.view.renderShopPage(filteredProducts, ProductsService.getAllProducts(), params.queries);
        }
    };

    // getErrorPage = (params: RequestPath) => {
    //     this.renderPage(params.endpoint);
    // };

    // getHomePage = (params: RequestPath) => {
    //     this.renderPage(params.endpoint);
    // };

    // getCartPage = (params: RequestPath) => {
    //     this.renderPage(params.endpoint);
    // };
}
