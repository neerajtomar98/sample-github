import { combineReducers } from 'redux-immutable';
import repositories from './repositories';
import profile from './profile';

const app = combineReducers({
    repositories,
    profile
});

export default app;
