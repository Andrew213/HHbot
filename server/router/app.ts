import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { cookieParser } from 'server/middlewares';
import { renderApp } from 'server/controllers';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [cookieParser];

export function appRoutes(router: Router) {
    router.get('/', middlewares, renderApp);
}
