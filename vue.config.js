module.exports = {
    devServer: {
        port: 8080,
        
        //设置代理，实习请求跨域
        proxy: {
            //设置拦截器 /api
            '/api':{
                target: 'http://localhost:8081',
                changeOrigin: true,
            }
        }
    }
}