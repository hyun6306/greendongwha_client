import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 마케팅
		// DISPLAY

		// 이벤트
		async ADMIN_ACT_MARKETING_EVENT(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_MARKETING_EVENT', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.marketing.EventDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.marketing.EventGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.marketing.event.parser(res)
						break
					case 'create':
						await apiAdmin.marketing.EventPost(items.params)
						break
					case 'edit':
						await apiAdmin.marketing.EventPut(items.params)
						break
					case 'winPost':
						await apiAdmin.marketing.EventWinPost(items.params)
						break
					case 'delete':
						await apiAdmin.marketing.EventDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.display.House3D', e)
			}
		},
	},
	getters: {},
	modules: {},
}
