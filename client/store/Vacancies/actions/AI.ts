import { VacnciesStateT } from '../VacanciesStore';
import { VacanciesType } from './AT';

export interface REQUEST_VACANCIES {
    type: VacanciesType.REQUEST_VACANCIES;
    loading: boolean;
}

export interface RECEIVE_VACANCIES {
    type: VacanciesType.RECEIVE_VACANCIES;
    payload: VacnciesStateT;
}

export interface ERROR_VACANCIES {
    type: VacanciesType.ERROR_VACANCIES;
    errMsg: string;
}

export interface BEEN_RESPONDED {
    type: VacanciesType.BEEN_RESPONDED;
    resume_id: string;
}

export type VacanciesActionI =
    | REQUEST_VACANCIES
    | RECEIVE_VACANCIES
    | BEEN_RESPONDED
    | ERROR_VACANCIES;
