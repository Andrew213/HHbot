import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { cookieParser, helmet } from 'server/middlewares';
import { renderApp } from 'server/controllers';
import logger from 'server/middlewares/logger';

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    cookieParser,
    helmet,
    logger
];

const allRoutes = function flatRoutes(routesMap: object): string[] {
    return Object.values(routesMap).reduce<string[]>(
        (routes, path) =>
            routes.concat(typeof path === 'object' ? flatRoutes(path) : path),
        []
    );
};

export function appRoutes(router: Router) {
    router.get('/', middlewares, renderApp);
}
