import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { userApiServer } from './user';

export function userRouter(router: Router) {
    router.get(
        '/user/me',
        async (request: Request, response: Response, next: NextFunction) => {
            await userApiServer
                .getUser()
                .then(res => {
                    response.status(200).send(res);
                })
                .catch(err => {
                    response.status(403).send(err);
                });
        }
    );
}
