import { RequestParams } from '../model/Types';
import {
    getProductsBySorts,
    getProductsByRoastLevels,
    getProductsByBrands,
    getProductsByPrices,
    getProductsByStockAmount,
    getProductsOrderedBy,
    getProductsBySearchText,
    getAllProducts,
    getProductById,
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

    getShopPage = (params: RequestParams) => {
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

    getCoffeePage = (params: RequestParams) => {
        let id: string;
        if (params.queries) {
            id = Object.keys(params.queries)[0];
            if (typeof +id === 'number' && id !== undefined) {
                const product = getProductById(+id);
                if (product) {
                    this.view.renderCoffeePage(product);
                } else {
                    this.getErrorPage();
                }
            } else {
                this.getErrorPage();
            }
        }
    };

    getErrorPage = () => {
        this.view.renderErrorPage();
    };

    getHomePage = () => {
        this.view.renderHomePage();
    };

    getCartPage = () => {
        this.view.renderCartPage();
    };
}
