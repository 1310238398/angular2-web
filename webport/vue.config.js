module.exports = {
    /*基础地址*/
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
            config
                .output
                .filename('[name].js')
                .end()
    }

    /*devServer: {
        port: 8989
    }*/
}
