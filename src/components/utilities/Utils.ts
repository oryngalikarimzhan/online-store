import AppRouter from '../router/AppRouter';

function composeStr(str: string) {
    return str.replace(/ /g, '+').toLowerCase();
}

function parseStr(composedStr: string) {
    return composedStr
        .split('+')
        .map((s) => `${s[0].toUpperCase()}${s.slice(1)}`)
        .join(' ');
}

function addParameterToQuery(queryKey: string, queryValue: string | string[], hash = window.location.hash) {
    if (hash.includes('/?')) {
        const params = hash.split('/?');
        hash = params[0] + '/?';
        const queries = AppRouter.getQueries(params[1]);
        if (typeof queryValue === 'string') {
            if (queries[queryKey]) {
                queries[queryKey].push(queryValue);
            } else {
                queries[queryKey] = [queryValue];
            }
        } else {
            queries[queryKey] = [queryValue[0], queryValue[1]];
        }
        for (const key of Object.keys(queries)) {
            if (hash[hash.length - 1] !== '?') hash += '&';
            hash += `${key}=${queries[key].join('|')}`;
        }
    } else {
        hash = `${hash}/?${queryKey}=${queryValue}`;
    }
    return hash;
}

function deleteParameterFromQuery(queryKey: string, queryValue: string) {
    let hash = window.location.hash;
    if (hash.includes(queryKey)) {
        const params = hash.split('/?');
        hash = params[0] + '/?';
        const queries = AppRouter.getQueries(params[1]);
        if (queries[queryKey].length === 1) {
            for (const key of Object.keys(queries)) {
                if (queryKey !== key) {
                    if (hash[hash.length - 1] !== '?') hash += '&';
                    hash += `${key}=${queries[key].join('|')}`;
                }
            }
        } else {
            queries[queryKey].splice(queries[queryKey].indexOf(queryValue), 1);
            for (const key of Object.keys(queries)) {
                if (hash[hash.length - 1] !== '?') hash += '&';
                hash += `${key}=${queries[key].join('|')}`;
            }
        }
        if (hash === params[0] + '/?') hash = params[0];
    }
    return hash;
}

export { composeStr, parseStr, addParameterToQuery, deleteParameterFromQuery };
