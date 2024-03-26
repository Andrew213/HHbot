import { ThunkDispatch } from 'redux-thunk';
import { VacnciesStateT } from '../VacanciesStore';
import { VacanciesActionI } from './AI';
import { VacanciesType } from './AT';
import { RootState } from 'client/store';
import axios from 'axios';
import { addToResponse, receiveVacancies } from './AC';

export const addToResponseArray = (resume_id: string) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>
    ) => {
        dispatch(addToResponse(resume_id));
    };
};

export const getVacancies = (resume_id: string, page: number) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>,
        getState: () => RootState
    ) => {
        const { Vacancies } = getState();

        try {
            dispatch({
                type: VacanciesType.REQUEST_VACANCIES,
                loading: !Vacancies.items
            });

            const response = await axios.get(
                `/vacancies?resume_id=${resume_id}&page=${page}`
            );

            if (response.status === 200) {
                let items = response.data.items;
                if (Vacancies.items) {
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
