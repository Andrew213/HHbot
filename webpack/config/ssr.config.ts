import { config } from 'dotenv';
import flow from 'lodash.flow';
import { join } from 'path';
import webpack from 'webpack';

import { ROOT_DIR_FROM_WEBPACK } from '../assets/dir';
import { loadStyles, loadScripts, initServerConfig } from '../settings';

config();

const cfg = require('../../lib/cfg').default;

function getConfig(lang: string): webpack.Configuration {
    console.log(
        `ENTRY PATH IN ssr.config.ts `,
        join(ROOT_DIR_FROM_WEBPACK, 'client', 'bundles', 'index.ts')
    );
    return flow([
        initServerConfig({
            entry: {
                app: join(
                    ROOT_DIR_FROM_WEBPACK,
                    'client',
                    'bundles',
                    'index.ts'
                )
            },
            lang
        }),
        loadScripts({ isSSR: true }),
        loadStyles({ isSSR: true })
    ])({});
}

export default cfg.default.langs.map(getConfig);
