import { ThunkDispatch } from 'redux-thunk';
import { VacnciesStateT } from '../VacanciesStore';
import { VacanciesActionI } from './AI';
import { VacanciesType } from './AT';
import axios from 'axios';
import { receiveVacancies } from './AC';

export const getVacancies = (resume_id: string) => {
    return async (
        dispatch: ThunkDispatch<VacnciesStateT, void, VacanciesActionI>
    ) => {
        try {
            dispatch({
                type: VacanciesType.REQUEST_VACANCIES,
                loading: true
            });

            const response = await axios.get(
                `/vacancies?resume_id=${resume_id}`
            );

            if (response.status === 200) {
                dispatch(receiveVacancies(response.data));
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
