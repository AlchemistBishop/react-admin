const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
    app.use(createProxyMiddleware([process.env.REACT_APP_API],{
        target:process.env.REACT_APP_BASE_URL,
        changeOrigin:true,
        pathRewrite:{
            [`^${process.env.REACT_APP_API}`] :""
        },

    }))



    /*
    * 匹配到devApi，开始做代理 http://www.web-jshtml.cn/api/react
    * /devApi/login/ =>/login/
    * 替换之后的地址 http://www.web-jshtml.cn/api/react/login
    * */
    // app.use(proxy("/manage/api",{
    //     target:"http://admintest.happymmall.com:7000",
    //     changeOrigin:true,
    // }))

}