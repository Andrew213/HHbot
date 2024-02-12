import type { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

export interface Resp extends Response {
    renderBundle: (bundleName: string, data: Record<string, unknown>) => void;
}

export default (req: Request, res: Resp, next: NextFunction) => {
    // прокидываю ф-ю рендера в объект Response\
    // далее вызываю её в server/controllers/app.ts
    res.renderBundle = (bundleName: string, data: {}) => {
        const location = req.url;

        const { html } = renderBundle({ bundleName, data, location });

        res.send(html);
    };

    next();
};
