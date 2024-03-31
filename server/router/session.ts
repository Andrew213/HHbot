import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import { api } from './api';

export function sessionRouter(router: Router) {
    router.get(
        '/api/session/check',
        async (request: Request, response: Response) => {
            response.status(200).send(!!request.cookies.access_token);
        }
    );

    router.post(
        '/api/session/token',
        async (request: Request, response: Response) => {
            const urlData = new URLSearchParams();

            urlData.append('client_id', process.env.CLIENT_ID as string);
            urlData.append(
                'client_secret',
                process.env.CLIENT_SECRET as string
            );
            urlData.append('code', request.body.code);
            urlData.append('grant_type', 'authorization_code');

            await axios
                .post('https://api.hh.ru/token', urlData, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(async res => {
                    if (res.data.access_token) {
                        const tokenCreationTimestamp = Date.now();
                        const tokenExpirationTimeInMs =
                            res.data.expires_in * 1000;

                        // время когда токен истечет
                        response.cookie(
                            'token_expiration_ms',
                            tokenExpirationTimeInMs + tokenCreationTimestamp,
                            {
                                httpOnly: true,
                                secure: true,
                                sameSite: 'none'
                            }
                        );
                        response.cookie('access_token', res.data.access_token, {
                            maxAge: res.data.expires_in * 1000, // Время жизни в миллисекундах
                            httpOnly: true,
                            secure: true,
                            sameSite: 'none'
                        });

                        response.cookie(
                            'refresh_token',
                            res.data.refresh_token,
                            {
                                httpOnly: true,
                                secure: true,
                                sameSite: 'none'
                            }
                        );
                        api.setAuthHeader(res.data.access_token);
                    }
                    response.status(200).send(res.data);
                })
                .catch(err => {
                    console.log(`err in server session.ts`, err);
                    response.status(404).send(err);
                });
        }
    );

    router.delete(
        '/api/session/logout',
        async (request: Request, response: Response, next: NextFunction) => {
            await axios
                .delete('https://api.hh.ru/oauth/token', {
                    headers: {
                        Authorization: `Bearer ${request.cookies.access_token}`
                    }
                })
                .then(res => {
                    response.clearCookie('access_token', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none'
                    });
                    response.clearCookie('refresh_token', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none'
                    });
                    response.clearCookie('token_expiration_ms', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none'
                    });
                    response.status(204).send('OK');
                    response.end();
                })
                .catch(err => {
                    response.status(403).send('not auth');
                    response.end();
                });
        }
    );
}
