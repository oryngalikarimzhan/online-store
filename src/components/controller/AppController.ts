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

    constructor() {
        this.view = new AppView();
    }

    getShopPage = (params: RequestParams) => {
        const filtersMap = new Map([
            ['sorts', getProductsBySorts],
            ['roast', getProductsByRoastLevels],
            ['brands', getProductsByBrands],
            ['prices', getProductsByPrices],
            ['stock', getProductsByStockAmount],
            ['order', getProductsOrderedBy],
            ['search', getProductsBySearchText],
        ]);
        let filteredProducts: IProduct[] = getAllProducts();
        if (params.queries) {
            for (const queryName of Object.keys(params.queries)) {
                const method = filtersMap.get(queryName);

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

    getProductPage = (params: RequestParams) => {
        if (params.queries) {
            const [id] = Object.keys(params.queries);
            this.view.renderProductPage(getProductById(+id));
        }
    };

    getCartPage = () => {
        this.view.renderCartPage();
    };

    getNotFoundPage = () => {
        this.view.renderNotFoundPage();
    };

    getHomePage = () => {
        this.view.renderHomePage();
    };
}
