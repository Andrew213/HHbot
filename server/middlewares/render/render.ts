import type { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';
import { OutgoingHttpHeaders } from 'http';

export type DataFromServerSide = {
    ip?: string;
    location?: string;
    faviconLang?: string;
    resHeaders: OutgoingHttpHeaders;
};

export interface Resp extends Response {
    renderBundle: (bundleName: string, data: DataFromServerSide) => void;
}

export default (req: Request, res: Resp, next: NextFunction) => {
    console.log('\n\n\n\nIN SERVER/MIDDLEWARES/RENDER/RENDER.TS 1\n\n\n\n');

    // прокидываю ф-ю рендера в объект Response\
    // далее вызываю её в server/controllers/app.ts
    res.renderBundle = (bundleName: string, data: DataFromServerSide) => {
        console.log('\n\n\n\nIN SERVER/MIDDLEWARES/RENDER/RENDER.TS 2\n\n\n\n');

        const location = req.url;

        console.log(`location `, location);

        const { html } = renderBundle({ bundleName, data, location });

        res.send(html);
    };

    next();
};
