import { VacnciesStateT } from './VacanciesStore';
import { VacanciesActionI } from './actions/AI';
import { VacanciesType } from './actions/AT';

const VacanciesState: Partial<VacnciesStateT> = {};

export const VacanciesReducer = (
    state: Partial<VacnciesStateT> = VacanciesState,
    action: VacanciesActionI
) => {
    switch (action.type) {
        case VacanciesType.REQUEST_VACANCIES:
            return { ...state, loading: true };
        case VacanciesType.RECEIVE_VACANCIES:
            return { ...state, ...action.payload, loading: false };
        case VacanciesType.ERROR_VACANCIES:
            return { ...state, loading: false, errMsg: action.errMsg };
        default:
            return state;
    }
};
