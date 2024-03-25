import { UserActionI } from './actions/AI';
import { UserActionType } from './actions/AT';
import { userStateT } from './userState';

const UserState: userStateT = {
    loading: true,
    user: {},
    errMsg: ''
};
export const UserReducer = (
    state: userStateT = UserState,
    action: UserActionI
): userStateT => {
    switch (action.type) {
        case UserActionType.REQUEST_USER:
            return { ...state, loading: true };
        case UserActionType.RECEIVE_USER:
            return {
                ...state,
                loading: false,
                user: { ...state.user, ...action.user }
            };
        case UserActionType.ERROR_USER:
            return { ...state, loading: false, errMsg: action.errMsg };
        case UserActionType.REQUEST_RESUME:
            return { ...state, loading: true };
        case UserActionType.RECEIVE_RESUME:
            return {
                ...state,
                loading: false,
                user: { ...state.user, resumeList: action.resumeList }
            };
        default:
            return state;
    }
};
