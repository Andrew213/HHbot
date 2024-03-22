import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { vacanciesApiServer } from './vacancies';

export function vacanciesRouter(router: Router) {
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
