import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {
		cityItems: [],
	},
	mutations: {
		ADMIN_MU_USER_INTERIOR_CITY_ITEMS(state, cityItems) {
			state.cityItems = cityItems
		},
	},
	actions: {
		// 회원관리
		// USER

		// 회원관리
		async ADMIN_ACT_USER_USER(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_USER_USER', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.user.UserGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.user.user.parser(res)
						break
					case 'edit':
						await apiAdmin.user.UserPut(items.params)
						break
					case 'delete':
						await apiAdmin.user.UserDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.user.UserGet', e)
			}
		},
		// 인테리어점
		async ADMIN_ACT_USER_INTERIOR({ commit }, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_USER_INTERIOR', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.user.InteriorGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.user.interior.parser(res)
						break
					case 'getCity':
						res = await apiAdmin.user.InteriorCityGet()
						result = res == undefined || res == null ? [] : res
						commit('ADMIN_MU_USER_INTERIOR_CITY_ITEMS', result)
						break
					case 'edit':
						await apiAdmin.user.InteriorPut(items.params)
						break
					case 'delete':
						await apiAdmin.user.InteriorDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.user.InteriorGet', e)
			}
		},
		// 스크랩
		async ADMIN_ACT_USER_SCRAP(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_USER_SCRAP', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.user.ScrapGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.user.scrap.parser(res)
						break
				}
				return result
			} catch (e) {
				console.log('admin.user.ScrapGet', e)
			}
		},
	},
	getters: {
		ADMIN_GET_USER_INTERIOR_CITY_ITEMS: state => state.cityItems,
	},
	modules: {},
}
