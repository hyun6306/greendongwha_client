import apiHome from '@/api/home'
import mainParse from '@/utils/parse/home'

export default {
	state: {},
	mutations: {},
	actions: {
		// 3D 집들이
		async HOME_ACT_HOUSEWARMING_HOUSE_3D(Null, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_HOUSEWARMING_HOUSE_3D', items)
				switch (items.method) {
					case 'getList':
						res = await apiHome.housewarming.House3DGet(items.params)
						result = res == undefined || res == null ? [] : mainParse.housewarming.house3d.parser(res)
						break
					case 'detail':
						result = await apiHome.housewarming.House3DDetailGet(items.query)
						break
					case '3D_pop':
						res = await apiHome.housewarming.House3DPopGet()
						result = res == undefined || res == null ? [] : mainParse.housewarming.house3d.pop(res)
						break
				}
				return result
			} catch (e) {
				console.log('main.housewarming.House3D', e)
			}
		},
		// 전문가 집들이
		async HOME_ACT_HOUSEWARMING_SPECIAL(Null, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_HOUSEWARMING_SPECIAL', items)
				switch (items.method) {
					case 'getList':
						res = await apiHome.housewarming.HouseSpecialGet(items.params)
						result = res == undefined || res == null ? [] : mainParse.housewarming.special.parser(res)
						break
					case 'detail':
						result = await apiHome.housewarming.HouseSpecialDetailGet(items.query)
						break
					case 'special_pop':
						res = await apiHome.housewarming.HouseSpecialPopGet()
						result = res == undefined || res == null ? [] : mainParse.housewarming.special.pop(res)
						break
				}
				return result
			} catch (e) {
				console.log('main.housewarming.HouseSpecialGet', e)
			}
		},
	},
	getters: {},
	modules: {},
}
