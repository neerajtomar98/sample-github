import createHashHistory from 'history/createHashHistory';
import queryString from 'query-string';
const history = createHashHistory({
    hashType: 'slash'
});


export const updateRouteWithQueryParams = (params, pathname) => () => {
    let obj = {};
    for (let [key, value] of Object.entries(params)) {
        obj[key] = value;
    }
    updateRouteSearch(obj, pathname);
}


export const updateRouteSearch = (searchObj = {}, pathname = "") => {
    searchObj = {
        ...queryString.parse(history.location.search),
        ...searchObj
    };

    const search = queryString.stringify(searchObj, {
        encode: false
    });
    let pushObj = {
        search
    };
    if (pathname !== "") {
        pushObj = {
            ...pushObj,
            pathname
        };
    }
    history.push(pushObj);
}

export const getQueryParamsObjectFromQueryString = (queryString) => {
    if (queryString === undefined || queryString === "" || typeof queryString !== 'string') {
        return {};
    }
    let keys = queryString.slice(1).split('&');
    let queryParamObject = {};
    keys.forEach((key) => {
        key = key.split('=');
        queryParamObject[key[0]] = decodeURIComponent(key[1] || '');
    });
    return queryParamObject;
}
export const appendQueryParameters = (url, queryParameters = {}) => {
    let queryString = url.indexOf('?') !== -1 ? "&" : "?";

    for (const key in queryParameters) {
        if (queryParameters.hasOwnProperty(key) && queryParameters[key] !== null && queryParameters[key] !== undefined) {
            queryString += `${key}=${queryParameters[key]}&`;
        }
    }

    queryString = queryString.slice(0, -1);
    return (url + queryString);
}