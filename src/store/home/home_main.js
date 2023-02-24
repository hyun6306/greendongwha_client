import apiHome from '@/api/home'
import mainParse from '@/utils/parse/home'

export default {
	state: {
		// home
		home_mainBanner: [],
		home_housewarming3d: [],
		home_housewarmingSpecial: [],
		home_bestProduct: [],
		home_searchTags: [],
		home_popularProduct: [],
		// appbar
		appbar_searchKeywords: [],
		appbar_recommendProduct: [],
	},
	mutations: {
		// home
		HOME_MU_MAIN_BANNER(state, items) {
			state.home_mainBanner = items
		},
		HOME_MU_MAIN_HOUSEWARMING_3D(state, items) {
			state.home_housewarming3d = items
		},
		HOME_MU_MAIN_HOUSEWARMING_SPECIAL(state, items) {
			state.home_housewarmingSpecial = items
		},
		HOME_MU_MAIN_BEST_PRODUCT(state, items) {
			state.home_bestProduct = items
		},
		HOME_MU_MAIN_SEARCH_TAGS(state, items) {
			state.home_searchTags = items
		},
		HOME_MU_MAIN_POPULAR_PRODUCT(state, items) {
			state.home_popularProduct = items
		},
		// appbar
		APPBAR_MU_SEARCH_KEYWORDS(state, items) {
			state.appbar_searchKeywords = items
		},
		APPBAR_MU_RECOMMEND_PRODUCT(state, items) {
			state.appbar_recommendProduct = items
		},
	},
	actions: {
		// home
		// 메인베너
		async HOME_ACT_MAIN_BANNER({ commit }) {
			try {
				let res = await apiHome.main.BannerGet()
				const result = res == undefined || res == null ? [] : mainParse.main.banner.parser(res)
				commit('HOME_MU_MAIN_BANNER', result)
				return result
			} catch (e) {
				console.log('home.main.BannerGet', e)
			}
		},
		// 빠른견적내기
		async HOME_ACT_SIMPLE_ESTIMATE({ commit }, params) {
			try {
				let res = await apiHome.main.SimpleEstimatePost(params)
				let result = res == undefined || res == null ? [] : mainParse.main.simpleEstimate.parser(res)
				return result
			} catch (e) {
				console.log('home.main.SimpleEstimatePost', e)
			}
		},
		// housewarming
		async HOME_ACT_MAIN_HOUSEWARMING({ commit }) {
			let items = []
			try {
				// 3d
				let res = await apiHome.main.Housewarming3DGet()
				let result = res == undefined || res == null ? [] : mainParse.main.housewarming.house3d.parser(res)
				items.house = result
				commit('HOME_MU_MAIN_HOUSEWARMING_3D', result)

				// special
				res = await apiHome.main.HousewarmingSpecialGet()
				result = res == undefined || res == null ? [] : mainParse.main.housewarming.special.parser(res)
				items.special = result
				commit('HOME_MU_MAIN_HOUSEWARMING_SPECIAL', result)
				return items
			} catch (e) {
				console.log('home.main.Housewarming', e)
			}
		},
		// 베스트 제품
		async HOME_ACT_MAIN_BEST_PRODUCT({ commit }) {
			try {
				let res = await apiHome.main.BestProductGet()
				const result = res == undefined || res == null ? [] : mainParse.main.bestProduct.parser(res)
				commit('HOME_MU_MAIN_BEST_PRODUCT', result)
				return result
			} catch (e) {
				console.log('home.main.BestProductGet', e)
			}
		},
		// 나만의 제품찾기 ( 태그 )
		async HOME_ACT_MAIN_SEARCH_TAGS({ commit }) {
			try {
				let res = await apiHome.main.SearchTagsGet()
				const result = res == undefined || res == null ? [] : mainParse.main.searchTags.parser(res)
				commit('HOME_MU_MAIN_SEARCH_TAGS', result)
				return result
			} catch (e) {
				console.log('home.main.SearchTagsGet', e)
			}
		},
		// 바닥재 벽재 인기 제품
		async HOME_ACT_MAIN_POPULAR_PRODUCT({ commit }) {
			try {
				let res = await apiHome.main.PopularProductGet()
				const result = res == undefined || res == null ? [] : mainParse.main.popularProduct.parser(res)
				commit('HOME_MU_MAIN_POPULAR_PRODUCT', result)
				return result
			} catch (e) {
				console.log('home.main.PopularProductGet', e)
			}
		},

		// appbar - 추천검색
		async APPBAR_ACT_SEARCH_KEYWORDS({ commit }) {
			try {
				let res = await apiHome.main.SearchKeywordGet()
				commit('APPBAR_MU_SEARCH_KEYWORDS', res)
				return res
			} catch (e) {
				console.log('home.main.SearchKeywordGet', e)
			}
		},
		async APPBAR_ACT_RECOMMEND_PRODUCT({ commit }) {
			try {
				let res = await apiHome.main.RecommendProductGet()
				const result = res == undefined || res == null ? [] : mainParse.main.recommendProduct.parser(res)
				commit('APPBAR_MU_RECOMMEND_PRODUCT', result)
				return result
			} catch (e) {
				console.log('home.main.RecommendProductGet', e)
			}
		},
	},
	getters: {
		// home
		HOME_GET_MAIN_BANNER: state => state.home_mainBanner,
		HOME_GET_MAIN_HOUSEWARMING_3D: state => state.home_housewarming3d,
		HOME_GET_MAIN_HOUSEWARMING_SPECIAL: state => state.home_housewarmingSpecial,
		HOME_GET_MAIN_BEST_PRODUCT: state => state.home_bestProduct,
		HOME_GET_MAIN_SEARCH_TAGS: state => state.home_searchTags,
		HOME_GET_MAIN_POPULAR_PRODUCT: state => state.home_popularProduct,
		// appbar
		APPBAR_GET_SEARCH_KEYWORDS: state => state.appbar_searchKeywords,
		APPBAR_GET_RECOMMEND_PRODUCT: state => state.appbar_recommendProduct,
	},
	modules: {},
}
