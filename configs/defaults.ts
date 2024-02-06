import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { AppConfig } from 'cfg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
