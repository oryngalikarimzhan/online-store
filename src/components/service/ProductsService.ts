import IProduct from '../model/IProduct';
import data from '../store/data.json';
import { composeStr } from '../utilities/Utils';

export default class ProductsService {
    static getAllProducts = () => {
        return data.products.map((el) => el);
    };

    static getProductsByRoastLevels = (products: IProduct[], queryValue: string[]) => {
        return products.filter((product) => queryValue.includes(product.roastLevel.toLowerCase()));
    };

    static getProductsBySorts = (products: IProduct[], queryValue: string[]) => {
        return products.filter((product) => product.sorts.some((sort) => queryValue.includes(sort.toLowerCase())));
    };

    static getProductsByBrands = (products: IProduct[], queryValue: string[]) => {
        return products.filter((product) => queryValue.includes(composeStr(product.brand)));
    };

    static getProductsByPrices = (products: IProduct[], queryValue: string[]) => {
        return products.filter((product) => +queryValue[0] <= product.price && +queryValue[1] >= product.price);
    };

    static getProductsByStockAmount = (products: IProduct[], queryValue: string[]) => {
        return products.filter((product) => +queryValue[0] <= product.stock && +queryValue[1] >= product.stock);
    };

    static getProductsBySearchText = (products: IProduct[], queryValue: string[]) => {
        const queryText = queryValue[0].toLocaleLowerCase();
        return products.filter(
            (product) =>
                product.brand.toLocaleLowerCase().includes(queryText) ||
                product.name.toLocaleLowerCase().includes(queryText) ||
                product.sorts.some((sort) => sort.toLocaleLowerCase().includes(queryText)) ||
                product.roastLevel.toLocaleLowerCase().includes(queryText)
        );
    };

    static getAndOrderProductsBy = (products: IProduct[], queryValue: string[]) => {
        if (queryValue[0] === 'price-asc' || queryValue[0] === 'price-desc') {
            return this.orderBy(products, 'price', queryValue[0] === 'price-asc' ? 'asc' : 'desc');
        }
        return this.orderBy(products, 'name', queryValue[0] === 'name-asc' ? 'asc' : 'desc');
    };

    private static orderBy = (products: IProduct[], propertyName: string, arrange: string) => {
        type K = keyof IProduct;
        if (arrange === 'asc') {
            return products.sort((a, b) => (a[propertyName as K] > b[propertyName as K] ? 1 : -1));
        }
        return products.sort((a, b) => (a[propertyName as K] < b[propertyName as K] ? 1 : -1));
    };
}
