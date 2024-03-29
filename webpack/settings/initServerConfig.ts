import { config as envConfig } from 'dotenv';
import merge from 'lodash.merge';
import { join, resolve } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

import { ROOT_DIR_FROM_WEBPACK } from '../assets/dir';
import { ENVS, GLOBAL_ARGS } from '../assets/env';

envConfig();

const { __DEV__ } = ENVS;

export default ({ entry, lang }) =>
    (webpackConfig: Configuration): Configuration => {
        Object.assign(webpackConfig, {
            name: `ssr_bundles_${lang}`,
            target: 'node',
            devtool: 'source-map',
            entry: entry.app,
            node: { __dirname: false },
            mode: __DEV__ ? 'development' : 'production',
            externals: [
                webpackNodeExternals({
                    allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
                })
            ],
            resolve: {
                alias: { '@mui/styled-engine': '@mui/styled-engine-sc' },
                extensions: ['.js', '.ts', '.tsx', '.json'],
                plugins: [new TsconfigPathsPlugin()],
                fallback: {
                    url: require.resolve('url/')
                }
            },
            output: {
                filename: `ssr.bundles.${lang}.js`,
                libraryTarget: 'commonjs2',
                path: join(ROOT_DIR_FROM_WEBPACK, 'dist'),
                publicPath: '/static/'
            },
            module: { rules: [] },
            stats: {
                all: undefined,
                builtAt: !__DEV__,
                chunks: !__DEV__,
                assets: !__DEV__,
                errors: true,
                warnings: true,
                outputPath: true,
                timings: true
            },
            performance: {
                hints: false
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': JSON.stringify(process.env)
                }),
                new webpack.ProvidePlugin({
                    window: resolve(join(__dirname, '../mock/window.mock.ts')),
                    localStorage: resolve(
                        join(__dirname, '../mock/localStorage.mock')
                    ),
                    document: 'global/document'
                })
            ]
        });
        return webpackConfig;
    };
