import { Request, Response } from 'express';
import { Resp } from 'server/middlewares/render/render';

export default function renderApp(req: Request, res: Resp) {
    const resHeaders = res.getHeaders();
    // req.tld!
    const faviconLang = ['com', 'com.tr'].includes('ru') ? 'en' : 'ru';
    const ip = req.socket.remoteAddress;

    console.log('\n\n\n INSIDE3 server/controllers/app.ts');

    // вызываю рендер бандла - СЕРДЦЕ ССР
    res.renderBundle('desktop', {
        faviconLang,
        ip,
        resHeaders
    });
}
