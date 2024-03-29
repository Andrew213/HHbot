import { LoginStateT } from './LoginState';
import { LoginActionI } from './actions/AI';
import { LoginActionType } from './actions/AT';

const LoginState: LoginStateT = {
    errMsg: '',
    loading: true,
    isAuth: true
};

export const LoginReducer = (
    state: LoginStateT = LoginState,
    action: LoginActionI
): LoginStateT => {
    switch (action.type) {
        case LoginActionType.REQUEST_TOKEN:
            return { ...state, loading: true, isAuth: true };
        case LoginActionType.RECEIVE_TOKEN:
            return { ...state, loading: false, isAuth: true };
        case LoginActionType.FETCH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg,
                isAuth: false
            };
        case LoginActionType.LOGOUT_TOKEN:
            return { ...state, isAuth: false, loading: false };
        default:
            return state;
    }
};
