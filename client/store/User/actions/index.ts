import { ThunkDispatch } from 'redux-thunk';
import { UserActionI } from './AI';
import { RootState } from 'client/store/RootReducers';
import { userStateT } from '../userState';
import { errorUser, receiveUser, requestUser } from './AC';
import axios from 'axios';

export const getUser = () => {
    return async (
        dispatch: ThunkDispatch<userStateT, void, UserActionI>,
        getState: () => RootState
    ) => {
        try {
            dispatch(requestUser());
            const response = await axios.get('/user/me');
            if (response.status === 200) {
                dispatch(receiveUser(response.data));
            }
        } catch (error) {
            dispatch(errorUser(error.message));

            console.log(`error in store`, error);
        }
    };
};
