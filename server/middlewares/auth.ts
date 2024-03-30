import { NextFunction, Request, Response } from 'express';
import { api } from '../router/api';
const auth = (request: Request, response: Response, next: NextFunction) => {
    const cookies = request.cookies;

    if (cookies && cookies['token_expiration_ms'] && cookies['access_token']) {
        const currentTimestamp = Date.now();

        const isTokenExpired =
            currentTimestamp > cookies['token_expiration_ms'];

        if (isTokenExpired) {
            return response.status(401).send('Token expired');
            // Токен истек, нужно обновить
            // Тут можно добавить логику обновления токена
        } else {
            api.setAuthHeader(cookies['access_token']);
            // Токен валиден и может быть использован
        }
    }

    next();
};

export default auth;
