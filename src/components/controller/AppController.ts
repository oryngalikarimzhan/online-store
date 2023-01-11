import { RequestParams } from '../data/Types';
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
    getProductsToViewByPageAndLimit,
} from '../model/ProductsService';
import IProduct from '../data/IProduct';
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

            // console.group('Filtered products');
            // console.log(filteredProducts);
            // console.groupEnd();

            this.view.renderShopPage(filteredProducts, getAllProducts(), params.queries);
        }
    };

    getProductPage = (params: RequestParams) => {
        if (params.queries) {
            const [id] = Object.keys(params.queries);
            this.view.renderProductPage(getProductById(+id));
        }
    };

    getCartPage = (params: RequestParams) => {
        const queriesMap = new Map([
            ['limit', 3],
            ['page', 1],
        ]);
        let limit = queriesMap.get('limit') as number;
        let page = queriesMap.get('page') as number;
        if (params.queries) {
            if ('limit' in params.queries) {
                limit = +params.queries['limit'];
            }
            if ('page' in params.queries) {
                page = +params.queries['page'];
            }
        }
        this.view.renderCartPage(getProductsToViewByPageAndLimit(page, limit), page, limit);
    };

    getNotFoundPage = () => {
        this.view.renderNotFoundPage();
    };

    getHomePage = () => {
        this.view.renderHomePage();
    };
}
