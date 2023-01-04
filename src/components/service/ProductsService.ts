import IProduct from '../model/IProduct';
import data from '../store/data.json';

export const getAllProducts = () => {
    return data.products.map((el) => el);
};

export const getProductsByRoastLevels = (products: IProduct[], queryValue: string[]) => {
    return products.filter((product) => queryValue.includes(product.roastLevel.toLowerCase()));
};

export const getProductsBySorts = (products: IProduct[], queryValue: string[]) => {
    return products.filter((product) => product.sorts.some((sort) => queryValue.includes(sort.toLowerCase())));
};

export const getProductsByBrands = (products: IProduct[], queryValue: string[]) => {
    return products.filter((product) => queryValue.includes(product.brand.toLowerCase()));
};

export const getProductsByPrices = (products: IProduct[], queryValue: string[]) => {
    return products.filter((product) => +queryValue[0] <= product.price && +queryValue[1] >= product.price);
};

export const getProductsByStockAmount = (products: IProduct[], queryValue: string[]) => {
    return products.filter((product) => +queryValue[0] <= product.stock && +queryValue[1] >= product.stock);
};

export const getProductsBySearchText = (products: IProduct[], queryValue: string[]) => {
    const queryText = queryValue[0].toLocaleLowerCase();
    return products.filter(
        (product) =>
            product.brand.toLocaleLowerCase().includes(queryText) ||
            product.name.toLocaleLowerCase().includes(queryText) ||
            product.sorts.some((sort) => sort.toLocaleLowerCase().includes(queryText)) ||
            product.roastLevel.toLocaleLowerCase().includes(queryText)
    );
};

export const getAndOrderProductsBy = (products: IProduct[], queryValue: string[]) => {
    type K = keyof IProduct;
    if (queryValue[1] === 'asc') {
        return products.sort((a, b) => (a[<K>queryValue[0]] > b[<K>queryValue[0]] ? 1 : -1));
    }
    return products.sort((a, b) => (a[<K>queryValue[0]] < b[<K>queryValue[0]] ? 1 : -1));
};
