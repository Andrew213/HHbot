import { VacnciesStateT } from '../VacanciesStore';
import { RECEIVE_VACANCIES } from './AI';
import { VacanciesType } from './AT';

export function receiveVacancies(data: VacnciesStateT): RECEIVE_VACANCIES {
    return {
        payload: data,
        type: VacanciesType.RECEIVE_VACANCIES
    };
}
