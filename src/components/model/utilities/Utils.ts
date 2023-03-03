import { CartItem, DiscountItem } from '../../data/Types';
import { BUYNOW, CARTSTORAGE, DISCOUNTSTORAGE } from './Constants';
import promo from '../json-store/promo.json';

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
        hash = `${hash[hash.length - 1] === '/' ? hash.slice(0, -1) : hash}/?${queryKey}=${
            typeof queryValue === 'string' ? queryValue.replace(/ /g, '+') : queryValue
        }`;
    }
    return hash;
}

function deleteParameterFromQuery(queryKey: string, queryValue: string, hash = window.location.hash) {
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

function getParameterFromQuery(queryKey: string) {
    const hash = window.location.hash;
    const params = hash.split('/?');
    const searchParams = new URLSearchParams(params[1]);
    return searchParams.get(queryKey);
}

function getCartItemsArrFromLS() {
    return JSON.parse(window.localStorage.getItem(CARTSTORAGE) || '[]');
}

function setCartItemsArrToLS(cart: CartItem[]) {
    window.localStorage.setItem(CARTSTORAGE, JSON.stringify(cart));
}

function getLinkFromSessionStorage(linkName: string, defaultHash: string) {
    const href = window.sessionStorage.getItem(linkName);
    const currentHash = window.location.hash;
    const shopHash = defaultHash;
    if (href === null && !currentHash.includes(shopHash)) {
        window.sessionStorage.setItem(linkName, shopHash);
        return shopHash;
    } else if (href !== null && !currentHash.includes(shopHash)) {
        return href;
    }
    window.sessionStorage.setItem(linkName, currentHash);
    return currentHash;
}

function getDiscountsFromLS() {
    return JSON.parse(window.localStorage.getItem(DISCOUNTSTORAGE) || '[]');
}

function setDiscountsToLS(discounts: DiscountItem[]) {
    window.localStorage.setItem(DISCOUNTSTORAGE, JSON.stringify(discounts));
}

function getDiscount(inputValue: string) {
    return promo.promocodes.find((promo) => promo.key === inputValue.toLowerCase());
}

function buyNowEvent(isTriggered = false) {
    if (isTriggered) {
        const buyNow = window.sessionStorage.getItem(BUYNOW);
        window.sessionStorage.removeItem(BUYNOW);
        return buyNow;
    }
    return window.sessionStorage.setItem(BUYNOW, BUYNOW);
}

export {
    parseStr,
    addParameterToQuery,
    deleteParameterFromQuery,
    getCartItemsArrFromLS,
    setCartItemsArrToLS,
    getDiscountsFromLS,
    setDiscountsToLS,
    getDiscount,
    getLinkFromSessionStorage,
    getParameterFromQuery,
    buyNowEvent,
};
