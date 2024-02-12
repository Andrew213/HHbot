import { Router, static as staticRoute } from 'express';
import cfg from 'lib/cfg';

// РАЗДАЧА СТАТИКИ

export const staticRoutes = (router: Router) => {
    console.log(`cfg in static route `, cfg);
    router
        .use('/', staticRoute(cfg.default.static.staticDir))
        .use('/static', staticRoute(cfg.default.static.dir))
        .use('/fonts', staticRoute('dist/fonts'))
        .use('/favicons', staticRoute('dist/favicons'))
        .use('/robots.txt', staticRoute('dist/robots.txt'));
};
