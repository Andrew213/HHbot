import { Request, Response } from 'express';
import { Resp } from 'server/middlewares/render/render';

export default function renderApp(req: Request, res: Resp) {
    const resHeaders = res.getHeaders();
    console.log(`\n\n\n\nin server/controllers/app.ts\n\n\n\n`);
    // req.tld!
    const faviconLang = ['com', 'com.tr'].includes('ru') ? 'en' : 'ru';
    const { ip } = req;

    // вызываю рендер бандла - СЕРДЦЕ ССР
    res.renderBundle('desktop', {
        faviconLang,
        ip,
        resHeaders
    });
}
