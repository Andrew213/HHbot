import { Request, Response } from 'express';
import { Resp } from 'server/middlewares/render/render';
import checkMobile from 'is-mobile';

export default function renderApp(req: Request, res: Resp) {
    const resHeaders = res.getHeaders();
    // req.tld!
    const faviconLang = ['com', 'com.tr'].includes('ru') ? 'en' : 'ru';
    const { ip } = req;
    const isMobile = checkMobile({ ua: req });
    // вызываю рендер бандла - СЕРДЦЕ ССР
    res.renderBundle('desktop', {
        faviconLang,
        ip,
        resHeaders,
        userAgent: req.get('user-agent'),
        isMobile
    });
}