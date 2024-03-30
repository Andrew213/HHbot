import { VacnciesStateT } from '../VacanciesStore';
import { BEEN_RESPONDED, RECEIVE_VACANCIES } from './AI';
import { VacanciesType } from './AT';

export function receiveVacancies(data: VacnciesStateT): RECEIVE_VACANCIES {
    return {
        payload: data,
        type: VacanciesType.RECEIVE_VACANCIES
    };
}

export function addToResponse(resume_id: string): BEEN_RESPONDED {
    return {
        resume_id,
        type: VacanciesType.BEEN_RESPONDED
    };
}
