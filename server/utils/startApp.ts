import devHosts from 'configs/hosts.json';
import selfSigned from 'openssl-self-signed-certificate';
import { Express } from 'express';
import { readFileSync } from 'fs';
import https from 'https';
import { homedir } from 'os';
import { resolve } from 'path';
import { findIP } from './network';
import Loadable from 'react-loadable';
import { makeStartLogsText } from './startLogs';
interface Options {
    server: Express;
}

const { PORT = 3000, NODE_ENV } = process.env;

const isDev = NODE_ENV === 'development';

const APP_HOSTS = ['localhost'];

if (isDev) {
    const devLocalIP = findIP();
    if (devLocalIP) {
        APP_HOSTS.push(devLocalIP);
    }
}

export function startApp({ server }: Options) {
    Loadable.preloadAll().then(() => {
        server.listen(PORT, () => {
            console.log(
                console.log(makeStartLogsText(APP_HOSTS, 'http', PORT))
            );
        });

        return;
    });
}
