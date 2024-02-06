import type { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

interface Resp extends Response {
    renderBundle: (bundleName: string, data: Record<string, unknown>) => void;
}

export default (req: Request, res: Resp, next: NextFunction) => {
    console.log('AAAAAAA HY 2I');

    res.renderBundle = (bundleName: string, data: {}) => {
        console.log('AAAAAAA HYI');
        // const location = req.url;

        // renderBundle({ bundleName, data, location });
    };

    next();
};
