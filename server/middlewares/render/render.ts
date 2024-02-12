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

        const location = req.url;

        console.log(`location `, location);

        const { html } = renderBundle({ bundleName, data, location });

        res.send(html);
    };

    next();
};
