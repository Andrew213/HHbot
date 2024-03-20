import express, { Express } from 'express';
import { queryParser } from './controllers';
import { render } from './middlewares';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from 'server/router';
const server: Express = express();

server.use(cookieParser());
server.use(cors());
server.use(express.json());
server
    .use(express.urlencoded({ extended: true }))
    /**
 Это метод Express.js, который отключает заголовок "x-powered-by". 
 Этот заголовок по умолчанию предоставляет информацию о том, какой сервер обрабатывает запросы. 
 Отключение этого заголовка повышает безопасность приложения, так как скрывает информацию о сервере и используемых технологиях, 
 что может затруднить атакующим получение дополнительной информации для потенциальных атак. 
 */
    .disable('x-powered-by')
    /**
     * Этот метод Express.js включает доверенные прокси.
     * Когда сервер работает за прокси-сервером, например, когда он развернут на платформе облачных услуг, таких как Heroku или AWS,
     * включение доверенных прокси позволяет серверу доверять заголовкам прокси, указывающим реальный IP-адрес клиента.
     * Это полезно для получения правильного IP-адреса клиента, когда сервер находится за прокси.
     */
    .enable('trust proxy')
    /**
        Добавляю парсер url
     */
    .set('query parser', queryParser)
    .use(render)
    .use(router);

export default server;
