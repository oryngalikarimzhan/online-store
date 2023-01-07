import { CartItem } from '../model/Types';
import { CARTSTORAGE, SHOPLINK } from './Constants';

function parseStr(composedStr: string) {
    return composedStr
        .split(' ')
        .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
        .join(' ');
}

function addParameterToQuery(queryKey: string, queryValue: string | string[], hash = window.location.hash) {
    if (hash.includes('/?')) {
        const params = hash.split('/?');
        const searchParams = new URLSearchParams(params[1]);
        if (typeof queryValue === 'string') {
            const prevValue = searchParams.get(queryKey);
            searchParams.set(queryKey, `${prevValue !== null ? prevValue + ',' : ''}${queryValue}`);
        } else {
            searchParams.set(queryKey, `${queryValue[0]},${queryValue[1]}`);
        }
        hash = params[0] + '/?' + decodeURIComponent(searchParams.toString());
    } else {
        console.log('aaaaaaaa', queryValue);
        hash = `${hash[hash.length - 1] === '/' ? hash.slice(0, -1) : hash}/?${queryKey}=${
            typeof queryValue === 'string' ? queryValue.replace(/ /g, '+') : queryValue
        }`;
    }
    return hash;
}

function deleteParameterFromQuery(queryKey: string, queryValue: string) {
    let hash = window.location.hash;
    const params = hash.split('/?');
    const searchParams = new URLSearchParams(params[1]);
    const prevValue = searchParams.get(queryKey);
    if (prevValue) {
        if (prevValue?.includes(',')) {
            searchParams.set(
                queryKey,
                prevValue
                    .split(',')
                    .filter((value) => value !== queryValue)
                    .join(',')
            );
        } else {
            searchParams.delete(queryKey);
        }
        const searchParamsStr = decodeURIComponent(searchParams.toString());
        hash = `${params[0]}${searchParamsStr.length === 0 ? '' : '/?' + searchParamsStr}`;
    }
    return hash;
}

function getCartItemsArrFromLS() {
    return JSON.parse(window.localStorage.getItem(CARTSTORAGE) || '[]');
}

function setCartItemsArrToLS(cart: CartItem[]) {
    window.localStorage.setItem(CARTSTORAGE, JSON.stringify(cart));
}

function getShopLinkFromSessionStorage() {
    const href = window.sessionStorage.getItem(SHOPLINK);
    const currentHash = window.location.hash;
    const shopHash = '#/shop';
    if (href === null && !currentHash.includes(shopHash)) {
        window.sessionStorage.setItem(SHOPLINK, shopHash);
        return shopHash;
    } else if (href !== null && !currentHash.includes(shopHash)) {
        return href;
    }
    window.sessionStorage.setItem(SHOPLINK, currentHash);
    return currentHash;
}

export {
    parseStr,
    addParameterToQuery,
    deleteParameterFromQuery,
    getCartItemsArrFromLS,
    setCartItemsArrToLS,
    getShopLinkFromSessionStorage,
};
