import apiHome from '@/api/home'
import mainParse from '@/utils/parse/home'

export default {
	state: {
		// product
		product_totalItems: [],
		product_items: [],
		product_dwelling_items: [],
		product_commercial_items: [],
		product_detailsItems: {},
		product_popularItems: [],
		product_popItems: [],
		product_searchKeywords: '',
	},
	mutations: {
		// product
		HOME_MU_TOTAL_PRODUCT_ITEMS(state, items) {
			state.product_totalItems = items
		},
		HOME_MU_GET_PRODUCT_ITEMS(state, items) {
			state.product_items = items
		},
		HOME_MU_GET_PRODUCT_DWELLING_ITEMS(state, items) {
			state.product_dwelling_items = items
		},
		HOME_MU_GET_PRODUCT_COMMERCIAL_ITEMS(state, items) {
			state.product_commercial_items = items
		},
		HOME_MU_GET_PRODUCT_DETAIL_ITEMS(state, items) {
			state.product_detailsItems = items
		},
		HOME_MU_GET_PRODUCT_POPULAR_ITEMS(state, items) {
			state.product_popularItems = items
		},
		HOME_MU_GET_PRODUCT_POP_ITEMS(state, items) {
			state.product_popItems = items
		},
		HOME_MU_PRODUCT_SEARCH_KEYWORD(state, items) {
			state.product_searchKeywords = items
		},
	},
	actions: {
		// 전체 제품
		async HOME_ACT_TOTAL_PRODUCT_ITEMS({ commit }, params) {
			try {
				const res = await apiHome.product.TotalItemGet(params)
				const result = res == undefined || res == null ? [] : mainParse.product.total_parser(res)
				console.log('HOME_ACT_TOTAL_PRODUCT_ITEMS', result)

				commit('HOME_MU_TOTAL_PRODUCT_ITEMS', result)

				return result
			} catch (e) {
				console.log('home.product.TotalItemGet', e)
			}
		},
		// 제품 조회
		async HOME_ACT_GET_PRODUCT_ITEMS({ commit }, params) {
			try {
				const res = await apiHome.product.ItemGet(params)
				const result = res == undefined || res == null ? [] : mainParse.product.parser(res)
				console.log('HOME_ACT_GET_PRODUCT_ITEMS', result)

				// dwelling ( 주거용 데이터 )
				const dwellingItems = result.filter(item => item.use_kind === '1')
				// commercial ( 상업용 데이터 )
				const commercialItems = result.filter(item => item.use_kind === '2')

				commit('HOME_MU_GET_PRODUCT_ITEMS', result)
				commit('HOME_MU_GET_PRODUCT_DWELLING_ITEMS', dwellingItems)
				commit('HOME_MU_GET_PRODUCT_COMMERCIAL_ITEMS', commercialItems)

				return result
			} catch (e) {
				console.log('home.product.item', e)
			}
		},
		// 상세 제품
		async HOME_ACT_GET_PRODUCT_DETAIL_ITEMS({ commit }, query) {
			try {
				const res = await apiHome.product.DetailItemsGet(query)
				const result = res == undefined || res == null ? {} : mainParse.product.detail_parser(res[0])
				console.log('HOME_ACT_GET_PRODUCT_DETAIL_ITEMS', result)
				commit('HOME_MU_GET_PRODUCT_DETAIL_ITEMS', result)
				return result
			} catch (e) {
				console.log('home.product.detail', e)
			}
		},
		// 인기 제품 - 전체
		async HOME_ACT_GET_PRODUCT_POPULAR_ITEMS({ commit }, params) {
			try {
				const res = await apiHome.product.PopularItemGet(params)
				const result = res == undefined || res == null ? [] : mainParse.product.popular_parser(res)
				commit('HOME_MU_GET_PRODUCT_POPULAR_ITEMS', result)
				console.log('HOME_ACT_GET_PRODUCT_POPULAR_ITEMS', result)
				return result
			} catch (e) {
				console.log('home.product.PopularItemGet', e)
			}
		},
		// 인기 제품 - 제품만
		async HOME_ACT_GET_PRODUCT_POP_ITEMS({ commit }) {
			try {
				const res = await apiHome.product.PopItemsGet()
				const result = res == undefined || res == null ? [] : mainParse.product.parser(res)
				commit('HOME_MU_GET_PRODUCT_POP_ITEMS', result)
				console.log('HOME_ACT_GET_PRODUCT_POP_ITEMS', result)
				return result
			} catch (e) {
				console.log('home.product.popItem', e)
			}
		},
	},
	getters: {
		// product
		HOME_GET_TOTAL_PRODUCT_ITEMS: state => state.product_totalItems,
		HOME_GET_GET_PRODUCT_ITEMS: state => state.product_items,
		HOME_GET_GET_PRODUCT_DWELLING_ITEMS: state => state.product_dwelling_items,
		HOME_GET_GET_PRODUCT_COMMERCIAL_ITEMS: state => state.product_commercial_items,
		HOME_GET_GET_PRODUCT_DETAIL_ITEMS: state => state.product_detailsItems,
		HOME_GET_GET_PRODUCT_POPULAR_ITEMS: state => state.product_popularItems,
		HOME_GET_GET_PRODUCT_POP_ITEMS: state => state.product_popItems,
		HOME_GET_PRODUCT_SEARCH_KEYWORD: state => state.product_searchKeywords,
	},
	modules: {},
}
