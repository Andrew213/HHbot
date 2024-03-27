import { ThunkDispatch } from 'redux-thunk';
import { UserActionI } from './AI';
import { userStateT } from '../userState';
import { errorUser, receiveUser, requestUser } from './AC';
import axios from 'axios';
import { UserActionType } from './AT';

export const getUser = () => {
    return async (dispatch: ThunkDispatch<userStateT, void, UserActionI>) => {
        try {
            dispatch(requestUser());
            const response = await axios.get('/user/me');
            if (response.status === 200) {
                dispatch(receiveUser(response.data));
            }
        } catch (error) {
            dispatch(errorUser(error.message));

            console.log(`error in user store`, error);
        }
    };
};

export const getResume = () => {
    return async (dispatch: ThunkDispatch<userStateT, void, UserActionI>) => {
        try {
            dispatch({
                type: UserActionType.REQUEST_RESUME
            });
            const response = await axios.get('/user/resume');

            if (response.status === 200) {
                dispatch({
                    type: UserActionType.RECEIVE_RESUME,
                    resumeList: response.data.items
                });
            }
        } catch (error) {
            dispatch(errorUser(error.message));
            console.log(`error in user store`, error);
        }
    };
};
