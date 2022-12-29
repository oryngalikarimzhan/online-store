import { RequestPath } from '../model/Types';
import ProductsService from '../service/ProductsService';
import IProduct from '../model/IProduct';
import Filters from '../model/Filters';
import AppView from '../view/AppView';

export default class AppController {
    private readonly productServices: ProductsService;
    private readonly view: AppView;
    constructor() {
        this.productServices = new ProductsService();
        this.view = new AppView();
    }

    getShopPage = (params: RequestPath) => {
        let filteredProducts: IProduct[] = this.productServices.getAllProducts();
        if (params.queries) {
            for (const queryName of Object.keys(params.queries)) {
                const index = Object.keys(Filters).indexOf(queryName);
                if (index !== -1 && Object.values(Filters)[index] in this.productServices) {
                    filteredProducts = this.productServices[Object.values(Filters)[index] as keyof ProductsService](
                        filteredProducts,
                        params.queries[queryName]
                    );
                }
            }
            console.group('Filtered products');
            console.log(filteredProducts);
            console.groupEnd();

            this.view.renderShopPage(filteredProducts, this.productServices.getAllProducts(), params.queries);
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
