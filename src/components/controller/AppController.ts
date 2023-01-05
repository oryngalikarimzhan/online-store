import { RequestPath } from '../model/Types';
import {
    getProductsBySorts,
    getProductsByRoastLevels,
    getProductsByBrands,
    getProductsByPrices,
    getProductsByStockAmount,
    getProductsOrderedBy,
    getProductsBySearchText,
    getAllProducts,
} from '../service/ProductsService';
import IProduct from '../model/IProduct';
import AppView from '../view/AppView';

export default class AppController {
    private readonly view: AppView;
    private readonly filtersMap = new Map([
        ['sorts', getProductsBySorts],
        ['roast', getProductsByRoastLevels],
        ['brands', getProductsByBrands],
        ['prices', getProductsByPrices],
        ['stock', getProductsByStockAmount],
        ['order', getProductsOrderedBy],
        ['search', getProductsBySearchText],
    ]);
    constructor() {
        this.view = new AppView();
    }

    getShopPage = (params: RequestPath) => {
        let filteredProducts: IProduct[] = getAllProducts();
        if (params.queries) {
            for (const queryName of Object.keys(params.queries)) {
                const method = this.filtersMap.get(queryName);

                if (method) {
                    filteredProducts = method(filteredProducts, params.queries[queryName]);
                }
            }

            console.group('Filtered products');
            console.log(filteredProducts);
            console.groupEnd();

            this.view.renderShopPage(filteredProducts, getAllProducts(), params.queries);
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
