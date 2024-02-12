// ФАЙЛ ДЛЯ УДОБНОГО ИМПОРТА МИДЛВАРОВ
import { RequestHandler } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import renderMiddleware from './render';
import rateLimitMiddleware from 'express-rate-limit';
import helmetMiddleware from 'helmet';
import cfg from 'lib/cfg';

const cookieParser: RequestHandler = cookieParserMiddleware();

const render: RequestHandler | RequestHandler[] = renderMiddleware;

const helmet = helmetMiddleware(cfg.helmet);

const rateLimit: RequestHandler = rateLimitMiddleware({
    windowMs: 15 * 60 * 10000,
    max: 20000
});

export { render, cookieParser, rateLimit, helmet };
