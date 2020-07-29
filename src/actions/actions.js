import { updateRoute, updateRouteWithQueryParams, getQueryParamsObjectFromQueryString, appendQueryParameters } from '../utils/utils';

export function fetchRepositories(queryparams = "") {
    let routeQueryParamObject = getQueryParamsObjectFromQueryString(queryparams);

    let url = `https://api.github.com/users/supreetsingh247/repos`;
    if (queryparams) {
        url = appendQueryParameters(url, routeQueryParamObject)
    }

    return (dispatch, getState) => {
        dispatch({ type: "LOADING_REPOSITORIES" });
        const request = fetch(url);
        request
            .then(data => data.json())
            .then(data => {
                dispatch({ type: "REPOSITORIES_SUCCESS", payload: data });
            })
    };
}

export function fetchUserProfile() {
    return (dispatch, getState) => {
        dispatch({ type: "LOADING_PROFILE" });

        const request = fetch(
            `https://api.github.com/users/supreetsingh247`
        );
        request
            .then(data => data.json())
            .then(data => {
                dispatch({ type: "PROFILE_SUCCESS", payload: data });
            });
    };
}

export function searchFilterRepository(pathname, searchText = "", type = "", language = "") {
    return (dispatch, getState) => {
        dispatch(updateRouteWithQueryParams({
            'tab': 'repositories',
            'q': searchText.toLowerCase(),
            'type': type.toLowerCase() == 'all' ? "" : type.toLowerCase(),
            'language': language.toLowerCase() == 'all' ? "" : language.toLowerCase()
        }, pathname));
    }
}




