import CompressionWebpackPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import { Configuration, DllPlugin } from 'webpack';

import { STATS_OPTIONS, VENDORS } from '../assets/config';
import { DIST_DIR } from '../assets/dir';
import { ENVS } from '../assets/env';

const config: Configuration = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        vendors: VENDORS
    },
    output: {
        library: '[name]_[hash]',
        filename: '[name]_[hash].js',
        path: join(DIST_DIR, 'client', '_')
    },
    plugins: [
        new DllPlugin({
            name: '[name]_[hash]',
            path: join(DIST_DIR, 'webpack', 'vendors-manifest.json')
        }),
        new MiniCssExtractPlugin({ filename: '[name]_[hash].css' }),
        !ENVS.__DEV__ && new CompressionWebpackPlugin({ minRatio: 1 })
    ].filter(Boolean),
    stats: STATS_OPTIONS
};

export default config;
