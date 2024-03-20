import { userStateT, userT } from '../userState';
import { ERROR_USER, RECEIVE_USER, REQUEST_USER, UserActionI } from './AI';
import { UserActionType } from './AT';

export function requestUser(): REQUEST_USER {
    return {
        type: UserActionType.REQUEST_USER,
        loading: true
    };
}

export function receiveUser(user: userT): RECEIVE_USER {
    return {
        type: UserActionType.RECEIVE_USER,
        loading: false,
        user
    };
}

export function errorUser(errMsg: string): ERROR_USER {
    return {
        type: UserActionType.ERROR_USER,
        loading: false,
        errMsg
    };
}
