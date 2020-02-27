module.exports = {
    /*基础地址*/
    baseUrl: './',
    transpileDependencies: ['ansi-regex'],
    productionSourceMap: false,
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config
                .output
                .filename('[name].dev.js')
                .end()
        }
        if (process.env.NODE_ENV != 'production') {
            config
                .output
                .filename('[name].js')
                .end()
        }

    }

    /*devServer: {
        port: 8989
    }*/
}
