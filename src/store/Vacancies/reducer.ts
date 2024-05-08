import { VacnciesStateT } from './VacanciesStore';
import { VacanciesActionI } from './actions/AI';
import { VacanciesType } from './actions/AT';

const VacanciesState: Partial<VacnciesStateT> = { responseIds: new Set() };

export const VacanciesReducer = (
    state: Partial<VacnciesStateT> = VacanciesState,
    action: VacanciesActionI
) => {
    switch (action.type) {
        case VacanciesType.REQUEST_VACANCIES:
            return { ...state, loading: action.loading };
        case VacanciesType.RECEIVE_VACANCIES:
            return { ...state, ...action.payload, loading: false };
        case VacanciesType.ERROR_VACANCIES:
            return { ...state, errMsg: action.errMsg };
        case VacanciesType.GET_SAVED_SEARCH:
            return { ...state, savedSearch: action.savedSearch };
        case VacanciesType.BEEN_RESPONDED:
            const copy = new Set(state.responseIds);
            copy.add(action.resume_id);
            return {
                ...state,
                responseIds: copy
            };
        default:
            return state;
    }
};
