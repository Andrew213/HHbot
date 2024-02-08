import type { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

export interface Resp extends Response {
    renderBundle: (bundleName: string, data: Record<string, unknown>) => void;
}

export default (req: Request, res: Resp, next: NextFunction) => {
    console.log('\n\n\n\nIN SERVER/MIDDLEWARES/RENDER/RENDER.TS 1\n\n\n\n');

    // прокидываю ф-ю рендера в объект Response\
    // далее вызываю её в server/controllers/app.ts
    res.renderBundle = (bundleName: string, data: {}) => {
        console.log('\n\n\n\nIN SERVER/MIDDLEWARES/RENDER/RENDER.TS 2\n\n\n\n');

        // const location = req.url;

        // renderBundle({ bundleName, data, location });

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <base href="/">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Tail</title>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <h1 id="h1">Hello from asd</h1>
            
        </body>
        </html>`);
    };

    next();
};
