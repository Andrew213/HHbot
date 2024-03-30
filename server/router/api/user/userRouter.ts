import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { userApiServer } from './user';
import auth from '../../../middlewares/auth';

export function userRouter(router: Router) {
    router.get(
        '/api/user/me',
        async (request: Request, response: Response, next: NextFunction) => {
            await userApiServer
                .getUser()
                .then(({ status, data }) => {
                    response.status(status).send(data);
                })
                .catch(({ status, data }) => {
                    response.status(status).send(data);
                });
        }
    );

    router.get(
        '/api/user/resume',
        auth,
        async (request: Request, response: Response, next: NextFunction) => {
            await userApiServer
                .getResumeList()
                .then(({ status, data }) => {
                    response.status(status).send(data);
                })
                .catch(({ status, data }) => {
                    response.status(status).send(data);
                });
        }
    );
}
