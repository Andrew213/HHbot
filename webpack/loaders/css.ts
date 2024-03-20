import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { RuleSetUseItem } from 'webpack';

import { ENVS } from '../assets/env';

const postcssLoader = {
    loader: 'postcss-loader'
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: ENVS.__DEV__,
        importLoaders: 1,
        modules: {
            localIdentName: ENVS.__DEV__
                ? '[name]__[local]--[hash:base64:5]'
                : '[hash:base64:8]'
        }
    }
};

const cssLoaders: RuleSetUseItem[] = [
    MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader
];

const sassLoader = {
    loader: 'sass-loader'
};

export default {
    client: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: cssLoaders
        },
        {
            test: /\.css$/,
            include: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader' },
                postcssLoader
            ]
        },
        {
            test: /\.scss$/,
            use: [
                ...cssLoaders,
                sassLoader,
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: ['client/styles/main.scss']
                    }
                }
            ]
        }
    ]
};
