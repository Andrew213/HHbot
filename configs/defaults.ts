import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { AppConfig } from 'cfg';

const config: AppConfig = {
    langs: ['ru'],

    static: {
        dir: join(__dirname, '..', 'client'),
        staticDir: join(__dirname, '..', 'static')
    },

    render: {
        isHot: false
    }
};

export default config;
