import { resumeT, userStateT, userT } from '../userState';
import { UserActionType } from './AT';

export interface REQUEST_USER {
    type: UserActionType.REQUEST_USER;
    loading: true;
}

export interface RECEIVE_USER {
    type: UserActionType.RECEIVE_USER;
    loading: false;
    user: userT;
}

export interface ERROR_USER {
    type: UserActionType.ERROR_USER;
    loading: false;
    errMsg: string;
}

export interface REQUEST_RESUME {
    type: UserActionType.REQUEST_RESUME;
}

export interface RECEIVE_RESUME {
    type: UserActionType.RECEIVE_RESUME;
    resumeList: resumeT[];
}

export type UserActionI =
    | REQUEST_USER
    | RECEIVE_USER
    | ERROR_USER
    | REQUEST_RESUME
    | RECEIVE_RESUME;
