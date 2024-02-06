// ФАЙЛ ДЛЯ УДОБНОГО ИМПОРТА МИДЛВАРОВ
import { RequestHandler } from 'express';
import renderMiddleware from './render';

const render: RequestHandler | RequestHandler[] = renderMiddleware;

export { render };
