import { Action, Dispatch, combineReducers } from 'redux';
import { UserReducer } from './User/reducer';
import { LoginStateT } from './Login/LoginState';
import { LoginReducer } from './Login/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { userStateT } from './User/userState';
import { VacanciesReducer } from './Vacancies/reducer';
import { VacnciesStateT } from './Vacancies/VacanciesStore';

export type RootState = {
    User: userStateT;
    Login: LoginStateT;
    Vacancies: VacnciesStateT;
};

export const reducers = combineReducers({
    User: UserReducer,
    Login: LoginReducer,
    Vacancies: VacanciesReducer
});

export type RootStore = ReturnType<typeof reducers>;
export type DispatchType = Dispatch<Action> &
    ThunkDispatch<RootStore, any, Action>;
