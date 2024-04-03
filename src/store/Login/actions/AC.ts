import { LoginActionType } from './AT';
import type {
    ERR_TOKEN,
    LOGOUT_TOKEN,
    RECEIVE_TOKEN,
    REQUEST_TOKEN
} from './AI';

export const requestToken = (): REQUEST_TOKEN => ({
    type: LoginActionType.REQUEST_TOKEN,
    loading: true
});

export const receiveToken = (): RECEIVE_TOKEN => ({
    type: LoginActionType.RECEIVE_TOKEN,
    loading: false,
    isAuth: true
});

export const errorToken = (errMsg: string): ERR_TOKEN => ({
    type: LoginActionType.FETCH_LOGIN_ERROR,
    errMsg
});

export const logoutToken = (): LOGOUT_TOKEN => ({
    type: LoginActionType.LOGOUT_TOKEN,
    isAuth: false
});
