import { combineReducers } from 'redux';
import { UserReducer, UserStateT } from './User/reducer';

export type RootState = {
    User: UserStateT;
};

export const reducers = combineReducers({
    User: UserReducer
});
