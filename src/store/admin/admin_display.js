import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 전시관리
		// DISPLAY

		// 3D 집들이
		async ADMIN_ACT_DISPLAY_HOUSE_3D(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_DISPLAY_HOUSE_3D', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.display.House3DDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.display.House3DGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.display.house_3D.parser(res)
						break
					case 'create':
						await apiAdmin.display.House3DPost(items.params)
						break
					case 'edit':
						await apiAdmin.display.House3DPut(items.params)
						break
					case 'delete':
						await apiAdmin.display.House3DDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.House3D', e)
			}
		},
		// 전문가 집들이
		async ADMIN_ACT_DISPLAY_HOUSE_SPECIAL(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_DISPLAY_HOUSE_SPECIAL', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.display.HouseSpecialDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.display.HouseSpecialGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.display.house_special.parser(res)
						break
					case 'create':
						await apiAdmin.display.HouseSpecialPost(items.params)
						break
					case 'edit':
						await apiAdmin.display.HouseSpecialPut(items.params)
						break
					case 'delete':
						await apiAdmin.display.HouseSpecialDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.HouseSpecial', e)
			}
		},
		// 노하우
		async ADMIN_ACT_DISPLAY_KNOW_HOW(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_DISPLAY_KNOW_HOW', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.display.KnowHowDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.display.KnowHowGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.display.konw_how.parser(res)
						break
					case 'create':
						await apiAdmin.display.KnowHowPost(items.params)
						break
					case 'edit':
						await apiAdmin.display.KnowHowPut(items.params)
						break
					case 'delete':
						await apiAdmin.display.KnowHowDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.KnowHow', e)
			}
		},
		// 동화 쇼룸
		async ADMIN_ACT_DISPLAY_SHOW_ROOM(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_DISPLAY_SHOW_ROOM', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.display.ShowRoomDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.display.ShowRoomGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.display.show_room.parser(res)
						break
					case 'create':
						await apiAdmin.display.ShowRoomPost(items.params)
						break
					case 'edit':
						await apiAdmin.display.ShowRoomPut(items.params)
						break
					case 'delete':
						await apiAdmin.display.ShowRoomDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.KnowHow', e)
			}
		},
		// 마루잘알 TV
		async ADMIN_ACT_DISPLAY_MARU_TV(context, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_DISPLAY_MARU_TV', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.display.MaruTvGet(items.params)
						result = adminParse.display.maru_tv.parser(res)
						console.log(adminParse.display.maru_tv.parser(res))
						break
					case 'create':
						await apiAdmin.display.MaruTvPost(items.params)
						break
					case 'edit':
						await apiAdmin.display.MaruTvPut(items.params)
						break
					case 'delete':
						await apiAdmin.display.MaruTvDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.KnowHow', e)
			}
		},
	},
	getters: {},
	modules: {},
}
