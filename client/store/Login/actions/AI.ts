import { LoginActionType } from './AT';

export interface REQUEST_TOKEN {
    type: LoginActionType.REQUEST_TOKEN;
    loading: boolean;
}

export interface RECEIVE_TOKEN {
    type: LoginActionType.RECEIVE_TOKEN;
    loading: boolean;
    isAuth: true;
}

export interface ERR_TOKEN {
    type: LoginActionType.FETCH_LOGIN_ERROR;
    errMsg: string;
}

export interface LOGOUT_TOKEN {
    type: LoginActionType.LOGOUT_TOKEN;
    isAuth: false;
}

export type LoginActionI =
    | REQUEST_TOKEN
    | RECEIVE_TOKEN
    | ERR_TOKEN
    | LOGOUT_TOKEN;
