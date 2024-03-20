import { Action, Dispatch, combineReducers } from 'redux';
import { UserReducer } from './User/reducer';
import { LoginStateT } from './Login/LoginState';
import { LoginReducer } from './Login/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { userStateT } from './User/userState';

export type RootState = {
    User: userStateT;
    Login: LoginStateT;
};

export const reducers = combineReducers({
    User: UserReducer,
    Login: LoginReducer
});

export type RootStore = ReturnType<typeof reducers>;
export type DispatchType = Dispatch<Action> &
    ThunkDispatch<RootStore, any, Action>;
