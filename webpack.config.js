const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './index.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // output 디렉토리 경로 (절대경로 입력) (node - path 모듈 호출)
        filename: 'main.js',
        // [name] = entry에서 설정한 키값으로 치환된다. -> entry가 여러개인 경우, 여러개의 output 이름을 동적으로 만들 수 있음.
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './numberBox.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
}
