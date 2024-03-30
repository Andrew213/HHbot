import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import { ROUTES } from '../../client/src/routes';
import auth from '../middlewares/auth';

const cookieParser: RequestHandler = cookieParserMiddleware();

const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    cookieParser,
    auth
];

const allRoutes = (function flatRoutes(routesMap: object): string[] {
    return Object.values(routesMap).reduce<string[]>(
        (routes, path) =>
            routes.concat(typeof path === 'object' ? flatRoutes(path) : path),
        []
    );
})(ROUTES);

export function appRoutes(router: Router) {
    router.get(allRoutes, middlewares);
}
