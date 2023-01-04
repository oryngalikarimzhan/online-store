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
        hash = `${hash[hash.length - 1] === '/' ? hash.slice(0, -1) : hash}/?${queryKey}=${queryValue}`;
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

export { parseStr, addParameterToQuery, deleteParameterFromQuery };
