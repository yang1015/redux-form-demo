var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

module.exports={
    entry: __dirname + "/web/public/entry.jsx",
    output: {
        path: __dirname +  "/web/dist", //发布地址 path.resolve方法用于将相对路径转为绝对路径。
        filename: "index.js"
    },
    devtool: 'eval-source-map',
    module:{
        loaders:[
            
            {
                test: /\.css$/,
                 loader: 'style-loader!css-loader' 
            },
             {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],                                                
                }
            },

        ]
    },
    devServer: {
        contentBase: "./web",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins:[
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            //filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
            filename: '../dist/index.html', //生成的html存放路径，相对于 path
            template: './web/template/index.html', //html模板路径 相对于webpack config js的位置来写的
            inject: 'body',
            hash: true,
        }),
        new webpack.BannerPlugin('created by SKYLAR'),
    ],
    resolve: {
        extensions: ['.web.js', '.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
}
