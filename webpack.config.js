const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./config/files");
const PAGE_DIR = path.join("src", path.sep);

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map( filePath => {
    const fileName = filePath.replace(PAGE_DIR, "");

    return new HtmlWebPackPlugin({
        favicon: './src/assets/images/favicon.png',
        chunks:[fileName.replace(path.extname(fileName), ""), "vendor"],
        template: filePath,
        filename: fileName
    });
});

const entry = getFilesFromDir(PAGE_DIR, [".js", ".css"]).reduce((obj, filePath) => {
    const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
    path.extname(filePath) === '.js' ?
        obj[entryChunkName] = ['@babel/polyfill', `./${filePath}`] :
        obj[entryChunkName] = `./${filePath}`;
    return obj;
}, {});

module.exports = {
    entry: entry,
    output: {
        publicPath: '/',
        path: __dirname + '/build',
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images'
                    }  
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
            {
                test: /\.css$/,
                use: ["style-loader", {loader: "css-loader", options: {modules: true}}],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        host: '192.168.0.25',
        port: 8080,
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://211.192.165.100:6061',
                secure: false,
                changeOrigin : true
            },
        }
    },
    plugins: [
        ...htmlPlugins,
    ]
}