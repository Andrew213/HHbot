import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { vacanciesApiServer } from './vacancies';

export function vacanciesRouter(router: Router) {
    //отправить отклик
    router.post(
        '/negotiations',
        async (request: Request, response: Response, next: NextFunction) => {
            const { vacancy_id, resume_id } = request.body;

            const formData = new FormData();
            formData.append('vacancy_id', `${vacancy_id}`);
            formData.append('resume_id', resume_id);

            if (request.body.message) {
                formData.append('message', request.body.message);
            }

            await vacanciesApiServer
                .sendNegotiations(formData)
                .then(res => {
                    response.status(200).send(res);
                })
                .catch(err => {
                    response.status(403).send(err);
                });
        }
    );

    // получаю список вакансий
    router.get(
        '/vacancies',
        async (request: Request, response: Response, next: NextFunction) => {
            const { resume_id, page } = request.query;
            await vacanciesApiServer
                .getSimilarVacancies(
                    resume_id as string,
                    page as unknown as number
                )
                .then(res => {
                    response.status(200).send(res);
                })
                .catch(err => {
                    response.status(403).send(err);
                });
        }
    );
}
