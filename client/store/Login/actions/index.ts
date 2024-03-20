import { ThunkDispatch } from 'redux-thunk';
import { LoginStateT } from '../LoginState';
import { LoginActionI } from './AI';
import { RootState } from 'client/store/RootReducers';
import axios from 'axios';
import { errorToken, logoutToken, receiveToken, requestToken } from './AC';

// export const checkSession = () => {
//     return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
//         try {
//             dispatch(requestToken());

//             const response = await axios.get('/session');

//             if (response.status === 200) {
//                 dispatch(receiveToken());
//                 return true;
//             }

//             return false;
//         } catch (error) {
//             dispatch(errorToken(error.message));
//             return false;
//         }
//     };
// };

export const getTokens = (authCode: string) => {
    return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
        try {
            dispatch(requestToken());
            const response = await axios.post('/token', { code: authCode });

            if (response.status === 200) {
                dispatch(receiveToken());
            }
        } catch (error) {
            dispatch(errorToken(error));
            console.log(`error in store`, error);
        }
    };
};

export const logout = () => {
    return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
        try {
            const response = await axios.delete('/logout');

            if (response.status === 204) {
                dispatch(logoutToken());
            }
        } catch (error) {
            console.log(`error in store logout`, error);
        }
    };
};
