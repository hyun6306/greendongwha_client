const path = require('path')
const webpack = require('webpack')
const ansiRegex = require('ansi-regex')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
// prerender
const prerenderRoutes = require('./src/prerender/basic.json')
// 전체 페이지
// const prerenderRoutes = require('./src/prerender/routes_make.json')
// const prerenderRoutes = require('./src/prerender/routes.json')
// const prerenderRoutes_housewarming_3d = require('./src/prerender/housewarming_3d.json')
// const prerenderRoutes_housewarming_specialist = require('./src/prerender/housewarming_specialist.json')
// const prerenderRoutes_product = require('./src/prerender/product.json')
// const prerenderRoutes_community_knowHow = require('./src/prerender/community_knowHow.json')
// const prerenderRoutes_community_event = require('./src/prerender/community_event.json')

// 주의 !! routes 마지막 배열에 ,(콤마) 붙일경우 build에 error발생
const productionPlugins = [
	new PrerenderSpaPlugin({
		staticDir: path.join(__dirname, 'dist'),
		routes: prerenderRoutes,
		// 전체 페이지 preRender
		// routes: [
		// 	...prerenderRoutes,
		// 	...prerenderRoutes_housewarming_3d,
		// 	// ...prerenderRoutes_housewarming_specialist,
		// 	// ...prerenderRoutes_product,
		// 	// ...prerenderRoutes_community_knowHow,
		// 	// ...prerenderRoutes_community_event,
		// ],
		renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
			renderAfterElementExists: '#app',
			deviceScaleFactor: 2,
			// isMobile: true,
			maxConcurrentRoutes: 1,
			headless: false,
			renderAfterTime: 5000,
		}),
	}),
]

module.exports = {
	devServer: {
		host: 'localhost',
	},
	assetsDir: 'assets/',
	publicPath: '/',
	lintOnSave: false,
	transpileDependencies: [ansiRegex, 'vuetify', 'axios'],
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
                    @import "@/assets/styles/_fonts.scss";
                    @import "@/assets/styles/_colors.scss";
                `,
			},
		},
	},
	// webpack 옵션 추가
	configureWebpack: config => {
		// prerender
		if (process.env.NODE_ENV === 'production') {
			config.plugins.push(...productionPlugins)
		}
		return {
			resolve: {
				alias: {
					'@': path.join(__dirname, 'src/'),
				},
			},
			plugins: [
				new webpack.ProvidePlugin({
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'assets/fonts/[name].[ext]',
					},
				}),
			],
		}
	},
}
