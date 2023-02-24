import apiApp from '@/api/app.js'

export default {
	state: {
		loading: false,
		pageLoad: false,
		pageName: null,
		dialog: null,
		alert: null,
		snackbar: null,
		recentRoute: null,
		appState: 'web',
		appWidth: null,
		recentProduct: [],
		appPopup: [
			// {
			// 	image_url: require('@/assets/img/etc/special_popup.jpg'),
			// 	image_link: '/product/special/detail',
			// 	path: '/product/special',
			// },
		],
		scrollBottom: 0,
		isLoadPopup: false,
	},
	mutations: {
		APP_MU_LOADING(state, loading) {
			state.loading = loading
		},
		APP_MU_PAGE_LOAD(state, load) {
			state.pageLoad = load
		},
		APP_MU_PAGE_NAME(state, pageName) {
			state.pageName = pageName
		},
		APP_MU_DIALOG(state, dialog) {
			state.dialog = dialog
			// 				dialog = {
			// 					dialog: true,
			// 					title: title,
			// 					text: text
			// 				}
		},
		APP_MU_ALERT(state, alert) {
			if (alert == null) return (state.alert = null)
			if (alert.action !== undefined) {
				state.alert = {
					title: alert.title,
					action: {
						name: alert.action.name,
						link: alert.action.link,
					},
				}
			} else {
				state.alert = {
					title: alert.title,
					action: null,
				}
			}
		},
		APP_MU_SNACKBAR(state, snackbar) {
			if (snackbar == null) return (state.snackbar = null)
			if (snackbar.action !== undefined) {
				state.snackbar = {
					title: snackbar.title,
					action: {
						name: snackbar.action.name,
						link: snackbar.action.link,
					},
				}
			} else {
				state.snackbar = {
					title: snackbar.title,
					action: null,
				}
			}
		},
		APP_MU_RECENT_ROUTE(state, route) {
			state.recentRoute = route
		},
		APP_MU_APP_STATE(state, appState) {
			state.appState = appState
		},
		APP_MU_APP_WIDTH(state, width) {
			state.appWidth = width
		},
		APP_MU_RECENT_PRODUCT(state, item) {
			const findCheck = state.recentProduct.includes(item)
			if (!findCheck) state.recentProduct.unshift(item)
		},
		APP_MU_POPUP(state, items) {
			state.appPopup = items
		},
		APP_MU_SCROLL_BOTTOM(state, items) {
			if (items > 0) state.scrollBottom += items
			else state.scrollBottom = 0
		},
		APP_MU_ISLOADPOPUP(state, payload) {
			state.isLoadPopup = payload
		},
	},
	actions: {
		async APP_ACT_POPUP({ commit }) {
			const res = await apiApp.popup.list()
			console.log('act_popup', res)
			commit('APP_MU_POPUP', res)
			commit('APP_MU_ISLOADPOPUP', true)
		},
	},
	getters: {
		APP_GET_LOADING: state => state.loading,
		APP_GET_PAGE_LOAD: state => state.pageLoad,
		APP_GET_PAGE_NAME: state => state.pageName,
		APP_GET_DIALOG: state => (state.dialog == null ? false : state.dialog),
		APP_GET_ALERT: state => (state.alert == null ? false : state.alert),
		APP_GET_SNACKBAR: state => (state.snackbar == null ? false : state.snackbar),
		APP_GET_RECENT_ROUTE: state => (state.recentRoute == null ? false : state.recentRoute),
		APP_GET_APP_STATE: state => state.appState,
		APP_GET_APP_WIDTH: state => state.appWidth,
		APP_GET_RECENT_PRODUCT: state => state.recentProduct,
		APP_GET_POPUP: state => state.appPopup,
		APP_GET_SCROLL_BOTTOM: state => state.scrollBottom,
		APP_GET_ISLOADPOPUP: state => state.isLoadPopup,
	},
	modules: {},
}
