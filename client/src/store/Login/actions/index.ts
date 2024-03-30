import { ThunkDispatch } from 'redux-thunk';
import { LoginStateT } from '../LoginState';
import { LoginActionI } from './AI';
import { errorToken, logoutToken, receiveToken, requestToken } from './AC';
import { LoginActionType } from './AT';
import { api } from '../../../api';

export const checkAuth = () => {
    return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_CLIENT_HOST}/api/session/check`
            );

            console.log(`response `, response);

            dispatch({
                type: LoginActionType.CHECK_AUTH,
                isAuth: response.data
            });
            return response.data;
        } catch (err) {}
    };
};

export const getTokens = (authCode: string) => {
    return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
        try {
            dispatch(requestToken());
            const response = await api.post(
                `${import.meta.env.VITE_CLIENT_HOST}/api/session/token`,
                { code: authCode }
            );

            if (response.status === 200) {
                dispatch(receiveToken());
            }
        } catch (error) {
            dispatch(errorToken(error));
            console.log(`error in LOGIN TOKEN store`, error);
        }
    };
};

export const logout = () => {
    return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
        try {
            const response = await api.delete(
                `${import.meta.env.VITE_CLIENT_HOST}/api/session/logout`
            );

            if (response.status === 204) {
                dispatch(logoutToken());
            }
        } catch (error) {
            console.log(`error in store logout`, error);
        }
    };
};
