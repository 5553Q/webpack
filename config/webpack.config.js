const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
var website = {
  //配置静态文件路径：这里的ip和端口，是你本机的ip或者是你devServer配置的ip和端口
  publicPath: "http://localhost:8888/"
};
module.exports = {
  mode: "development",
  //入口文件配置
  entry: {
    //这里作为入口文件的路径
    main: "./src/main.js"
  },
  //出口文件的配置项
  output: {
    //打包的路径
    path: path.resolve(__dirname, "../dist"),
    //打包的文件名称
    filename: "[name].js",
    publicPath: website.publicPath //publicPath主要作用是处理静态文件路径
  },
  //模块，例如解析css,图片，以及压缩等
  module: {
    rules: [
      //css loader
      {
        test: /\.(css|less)$/,
        // use: [
        //   {
        //     loader: "style-loader"
        //   },
        //   {
        //     loader: "css-loader"
        //   },
        // {
        //   loader:'less-loader'
        // }
        // ]
        use: extractTextPlugin.extract({
          //分离css:这里主要把css从js文件中分离出来，并解决一个如何处理分离出来后css中的图片路径不对的问题
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名称
        use: [
          // url-loader工作分两种情况：
          // 1.文件大小小于limit参数，url-loader将会把文件转为DataURL（Base64格式）；
          // 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
          {
            loader: "url-loader", //是指定使用的loader和loader的配置参数
            options: {
              limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use: ["html-withimg-loader"] //解决html文件中引入标签的问题
      },
      {
        //babel es6转es5
        test: /\.(jsx|js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  //插件，用于生产模块和各项功能
  plugins: [
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true //removeAttributeQuotes是去掉属性的双引号。
      },
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: "./src/index.html" //是要打包的html模板路径和文件名称。
    }),
    new extractTextPlugin("css/index.css") //分离css:这里的/css/index.css是分离后的路径
  ],
  //配置webpack开发服务功能
  devServer: {
    //设置基本目录 结构
    contentBase: path.resolve(__dirname, "../dist"),
    //服务器的IP地址，可以使用IP，也可以使用localhost
    host: "localhost",
    //服务端压缩是否开启
    compress: true,
    //配置端口号
    port: 8888
  }
};
