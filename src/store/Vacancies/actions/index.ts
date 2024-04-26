import { ThunkDispatch } from 'redux-thunk';
import { VacnciesStateT } from '../VacanciesStore';
import { VacanciesActionI } from './AI';
import { VacanciesType } from './AT';
import { RootState } from '@/store';
import { addToResponse, receiveVacancies } from './AC';
import { api } from '@/api';

export const addToResponseArray = (resume_id: string) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>
    ) => {
        dispatch(addToResponse(resume_id));
    };
};

export const searchAllVacancies = (text: string, page: number) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>,
        getState: () => RootState
    ) => {
        try {
            const { Vacancies } = getState();
            dispatch({
                type: VacanciesType.REQUEST_VACANCIES,
                loading: !page ? true : !Vacancies.items
            });

            const response = await api.get(
                `/api/vacancies/search?text=${text}&page=${page}`
            );

            if (response.status === 200) {
                let items = response.data.items;
                if (Vacancies.items && page > 0) {
                    const oldVacancies = Vacancies.items;
                    items = [...oldVacancies, ...items];
                }
                dispatch(receiveVacancies({ ...response.data, items }));
            }
        } catch (error) {
            dispatch({
                type: VacanciesType.ERROR_VACANCIES,
                errMsg: error
            });
            console.log(`error in searchVacancies state`, error);
        }
    };
};

export const getSimilarVacancies = (resume_id: string, page: number) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>,
        getState: () => RootState
    ) => {
        const { Vacancies } = getState();

        try {
            dispatch({
                type: VacanciesType.REQUEST_VACANCIES,
                loading: !page ? true : !Vacancies.items
            });

            const response = await api.get(
                `/api/vacancies?resume_id=${resume_id}&page=${page}`
            );

            if (response.status === 200) {
                let items = response.data.items;
                if (Vacancies.items && page > 0) {
                    const oldVacancies = Vacancies.items;
                    items = [...oldVacancies, ...items];
                }

                dispatch(receiveVacancies({ ...response.data, items }));
            }
        } catch (err) {
            dispatch({
                type: VacanciesType.ERROR_VACANCIES,
                errMsg: err
            });
            console.log(`error in getVacancies state`, err);
        }
    };
};
