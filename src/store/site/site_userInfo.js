import apiSite from '@/api/site'

export default {
	state: {
		interiorList: [],
	},
	mutations: {
		SITE_MU_USERINFO_INTERIOR_LIST(state, interiorList) {
			state.interiorList = interiorList
		},
	},
	actions: {
		// 인테리어 리스트
		async SITE_ACT_USERINFO_INTERIOR_LIST({ commit }) {
			try {
				const res = await apiSite.userInfo.InteriorListGet()
				const result = res == undefined || res == null ? [] : res
				console.log('SITE_ACT_USERINFO_INTERIOR_LIST', result)
				commit('SITE_MU_USERINFO_INTERIOR_LIST', result)
				return result
			} catch (e) {
				console.log('site.userInfo.InteriorListGet', e)
			}
		},
	},
	getters: {
		SITE_GET_USERINFO_INTERIOR_LIST: state => state.interiorList,
	},
	modules: {},
}
