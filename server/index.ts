import express, { Express } from 'express';
import { parse } from 'qs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';
dotenv.config();

const server: Express = express();
server.use(
    cors({
        origin: 'https://test2--hhbot.netlify.app',
        credentials: true
    })
);
server.use(cookieParser());

export const queryParser = (query: string) => {
    return parse(query, {
        decoder: str => {
            return decodeURIComponent(str);
        }
    });
};
const PORT = process.env.SERVER_PORT || 5000;

server.use(express.json());
server
    .use(express.urlencoded({ extended: true }))
    .disable('x-powered-by')
    .enable('trust proxy')
    .set('query parser', queryParser)
    .use(router);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;
