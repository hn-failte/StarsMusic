const path = require('path')
const { override, fixBabelImports,addWebpackAlias } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		style: 'css',
	}),
	//别名配置
    addWebpackAlias({
        "@": path.resolve(__dirname, "./src"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@common": path.resolve(__dirname, "./src/common"),
        "@action": path.resolve(__dirname, "./src/action"),
        "@routers": path.resolve(__dirname, "./src/routers"),
        "@layout": path.resolve(__dirname, "./src/layout"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@static": path.resolve(__dirname, "./src/static"),
        "@api": path.resolve(__dirname, "./src/api")
    })
);