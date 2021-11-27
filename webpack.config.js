const path = require('path')
const HhtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'bundle.js',
        publicPath: ''
    },
    mode: 'development',
    devtool: "source-map",

    // настройки локального сервера
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 3000,
        open: true
    },

    module: {
        rules: [
            // правила для babel
            {
                test: /\.js$/, // ищем все .js файлы
                use: 'babel-loader',
                exclude: '/node_modules/' // исключаем папку node_modules для транспиляции


            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                    'postcss-loader']
            }
        ]
    },

    plugins: [
        new HhtmlWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
};