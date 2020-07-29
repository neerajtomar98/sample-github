import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    repositoriesList: [],
    fetchRepositories: false,
    repositoriesError: null
});

const repositories = (state = initialState, action = {}) => {
    switch (action.type) {
        case "LOADING_REPOSITORIES": {
            return state.set('fetchRepositories', true)
                .set('repositoriesError', null)
        }
        case 'REPOSITORIES_SUCCESS': {
            let repositories = action.payload.sort((a, b) => (a.updated_at > b.updated_at) ? -1 : 1);
            return state.set(
                'repositoriesList', Immutable.fromJS(repositories))
                .set('fetchRepositories', false)
                .set('repositoriesError', null)
        }
        default:
            return state;
    }
};

export default repositories;