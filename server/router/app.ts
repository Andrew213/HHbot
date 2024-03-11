import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { cookieParser, helmet, logger } from 'server/middlewares';
import { renderApp } from 'server/controllers';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    cookieParser,
    helmet,
    logger
];

export function appRoutes(router: Router) {
    router.get('/', middlewares, renderApp);
}
