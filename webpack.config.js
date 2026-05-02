const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, './');

module.exports = {
    entry: path.resolve(appDirectory, 'src/index.js'),
    output: {
        filename: 'bundle.web.js',
        path: path.resolve(appDirectory, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [
                    path.resolve(appDirectory, 'src'),
                    path.resolve(appDirectory, 'node_modules/@d11/react-native-fast-image'),
                    path.resolve(appDirectory, 'node_modules/react-native-config'),
                    path.resolve(appDirectory, 'node_modules/react-native-linear-gradient'),
                    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler'),
                    path.resolve(appDirectory, 'node_modules/react-native-safe-area-context'),
                    path.resolve(appDirectory, 'node_modules/react-native-screens'),
                    path.resolve(appDirectory, 'node_modules/@react-navigation'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        sourceType: 'unambiguous',
                        presets: [
                            [
                                'module:@react-native/babel-preset',
                                { disableImportExportTransform: true }
                            ]
                        ],
                        plugins: ['react-native-web'],
                    },
                },// Add this right here to fix the React Navigation errors!
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
            'react-native-reanimated': false,
            '@d11/react-native-fast-image': 'react-native-web/dist/exports/Image',
            'react-native-linear-gradient': 'react-native-web-linear-gradient',

            'react-native-config': path.resolve(appDirectory, 'react-native-config.web.js'),

            '@': path.resolve(appDirectory, 'src'),
            '@assets': path.resolve(appDirectory, 'src/assets'),
            '@components': path.resolve(appDirectory, 'src/components')
        },
        extensions: ['.web.js', '.js', '.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(appDirectory, 'public/index.html'),
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        }),
    ],
};
