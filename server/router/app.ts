import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { cookieParser, helmet } from 'server/middlewares';
import { renderApp } from 'server/controllers';
import logger from 'server/middlewares/logger';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    cookieParser,
    helmet,
    logger
];

export function appRoutes(router: Router) {
    router.get('/', middlewares, renderApp);
}
