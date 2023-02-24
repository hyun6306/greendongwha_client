import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 메인관리
		// MAIN

		// 메인베너
		async ADMIN_ACT_MAIN_BANNER(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MAIN_BANNER', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.main.BannerGet(items.query)
						result = res == undefined || res == null ? [] : adminParse.main.banner.parser(res)
						break
					case 'create':
						await apiAdmin.main.BannerPost(items.params)
						break
					case 'edit':
						await apiAdmin.main.BannerPut(items.params)
						break
					case 'delete':
						await apiAdmin.main.BannerDel(items.params)
						break
					case 'priority':
						await apiAdmin.main.BannerPriorityPost(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.main.banner', e)
			}
		},

		// 베스트제품
		async ADMIN_ACT_MAIN_BEST_PRODUCT(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MAIN_BEST_PRODUCT', items)
				switch (items.method) {
					case 'bestItems':
						res = await apiAdmin.main.BestProductGet(items.query)
						result = res == undefined || res == null ? [] : adminParse.main.bestProduct.best.parser(res)
						break
					case 'hitItems':
						res = await apiAdmin.main.BestProductHisGet(items.query)
						result = res == undefined || res == null ? [] : adminParse.main.bestProduct.hit.parser(res)
						break
					case 'sort':
						await apiAdmin.main.BestProductSortPost(items.params)
						break
					case 'create':
						await apiAdmin.main.BestProductPost(items.params)
						break
					case 'edit':
						await apiAdmin.main.BestProductPut(items.params)
						break
					case 'delete':
						await apiAdmin.main.BestProductDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.main.Best', e)
			}
		},

		// 추천제품
		async ADMIN_ACT_MAIN_RECOMMEND_PRODUCT(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MAIN_RECOMMEND_PRODUCT', items)
				switch (items.method) {
					case 'get':
						res = await apiAdmin.main.RecommendProductGet(items.query)
						result = res == undefined || res == null ? [] : adminParse.main.recommendProduct.parser(res)
						break
					case 'sort':
						await apiAdmin.main.RecommendProductSortPost(items.params)
						break
					case 'create':
						await apiAdmin.main.RecommendProductPost(items.params)
						break
					case 'edit':
						await apiAdmin.main.RecommendProductPut(items.params)
						break
					case 'delete':
						await apiAdmin.main.RecommendProductDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.main.RecommendProduct', e)
			}
		},

		// 추천 검색어
		async ADMIN_ACT_MAIN_RECOMMEND_SEARCH(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MAIN_RECOMMEND_SEARCH', items)
				switch (items.method) {
					case 'get':
						res = await apiAdmin.main.RecommendSearchGet(items.query)
						result = res == undefined || res == null ? [] : adminParse.main.recommendSearch.parser(res)
						break
					case 'sort':
						await apiAdmin.main.RecommendSearchSortPost(items.params)
						break
					case 'create':
						await apiAdmin.main.RecommendSearchPost(items.params)
						break
					case 'edit':
						await apiAdmin.main.RecommendSearchPut(items.params)
						break
					case 'delete':
						await apiAdmin.main.RecommendSearchDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.main.RecommendSearch', e)
			}
		},

		// 팝업
		async ADMIN_ACT_MAIN_POPUP(_, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MAIN_POPUP', items)
				switch (items.method) {
					case 'get':
						res = await apiAdmin.main.PopupGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.main.popup.parser(res)
						break
					case 'detail':
						res = await apiAdmin.main.PopupDetail(items.query)
						result = res.description
						break
					case 'create':
						await apiAdmin.main.PopupPost(items.params)
						break
					case 'edit':
						await apiAdmin.main.PopupPut(items.params)
						break
					case 'delete':
						await apiAdmin.main.PopupDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.main.RecommendSearch', e)
			}
		},
	},
	getters: {},
	modules: {},
}
