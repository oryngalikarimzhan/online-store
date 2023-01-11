import IProduct from '../data/IProduct';
import { CartItem } from '../data/Types';
import data from './json-store/data.json';
import { getCartItemsArrFromLS } from './utilities/Utils';

export const getAllProducts = () => {
    return data.products.map((el) => el);
};

export const getProductById = (id: number) => {
    return getAllProducts().find((product: IProduct) => product.id === id);
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
    const [min, max] = queryValue.map(Number);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
        return products.filter((product) => min <= product.price && max >= product.price);
    }
    return products;
};

export const getProductsByStockAmount = (products: IProduct[], queryValue: string[]) => {
    const [min, max] = queryValue.map(Number);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
        return products.filter((product) => min <= product.stock && max >= product.stock);
    }
    return products;
};

export const getProductsBySearchText = (products: IProduct[], queryValue: string[]) => {
    const queryText = queryValue[0].toLowerCase();
    return products.filter(
        (product) =>
            product.brand.toLocaleLowerCase().includes(queryText) ||
            product.name.toLocaleLowerCase().includes(queryText) ||
            product.sorts.some((sort) => sort.toLocaleLowerCase().includes(queryText)) ||
            product.roastLevel.toLocaleLowerCase().includes(queryText)
    );
};

export const getProductsOrderedBy = (products: IProduct[], queryValue: string[]) => {
    type K = keyof IProduct;
    const [target, direction] = queryValue;
    if ((target === 'name' || target === 'price') && direction === 'asc') {
        return products.sort((a, b) => (a[<K>queryValue[0]] > b[<K>queryValue[0]] ? 1 : -1));
    } else if ((target === 'name' || target === 'price') && direction === 'desc') {
        return products.sort((a, b) => (a[<K>queryValue[0]] < b[<K>queryValue[0]] ? 1 : -1));
    }
    return products;
};

export const getProductsToViewByPageAndLimit = (page: number, limit: number): IProduct[] => {
    if (Number.isNaN(page) || Number.isNaN(limit)) return [];

    const cart = getCartItemsArrFromLS();
    if (cart.length === 0) return [];

    const products = cart.map((cartItem: CartItem) => getProductById(cartItem.id));

    let productsToView;
    if (products.length >= page * limit) {
        productsToView = products.slice((page - 1) * limit, page * limit);
    } else {
        productsToView = products.slice((page - 1) * limit);
    }
    return productsToView;
};
