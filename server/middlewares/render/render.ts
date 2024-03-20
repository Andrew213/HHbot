import type { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';
import { OutgoingHttpHeaders } from 'http';
import { initStore } from 'client/store';

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
    // прокидываю ф-ю рендера в объект Response\
    // далее вызываю её в server/controllers/app.ts
    res.renderBundle = (bundleName: string, data: DataFromServerSide) => {
        const location = req.url;

        const store = initStore({
            Login: { isAuth: !!req.cookies.access_token }
        });

        const { html } = renderBundle({ bundleName, data, location, store });

        res.send(html);
    };

    next();
};
