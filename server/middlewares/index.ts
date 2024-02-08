// ФАЙЛ ДЛЯ УДОБНОГО ИМПОРТА МИДЛВАРОВ
import { RequestHandler } from 'express';
import cookieParserMiddleware from 'cookie-parser';
import renderMiddleware from './render';

const cookieParser: RequestHandler = cookieParserMiddleware();

const render: RequestHandler | RequestHandler[] = renderMiddleware;

export { render, cookieParser };
