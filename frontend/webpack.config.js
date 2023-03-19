const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src')
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    mode: NODE_ENV,
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle[contenthash].js',
        assetModuleFilename: 'images/[name].[contenthash][ext]',
        clean: true,
        publicPath: '/'
    },
    devtool: NODE_ENV === 'development' ? 'inline-source-map' : null,
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'htmlTemplate.html'),
            filename: 'index.html',
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        compress: true,
        port: 9000,
        open: true,
        historyApiFallback: true
    },
}
