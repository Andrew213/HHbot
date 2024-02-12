import { NextFunction, Request, Response } from 'express';

export default function () {
    return (req: any, _res: Response, next: NextFunction) => {
        req.logger = () => {
            // eslint-disable-next-line
            console.log(req);
        };
        next();
    };
}
