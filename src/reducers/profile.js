import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    profile: {},
    fetchProfile: false,
    fetchProfileError: null

});

const profile = (state = initialState, action = {}) => {
    switch (action.type) {
        case "LOADING_PROFILE": {
            return state.set('fetchProfile', true)
        }
        case 'PROFILE_SUCCESS':
            return state.set(
                'profile',
                Immutable.fromJS(action.payload)
            ).set('fetchProfile', false)
        default:
            return state;
    }
};

export default profile;