import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 관리자 관리
		// ADMIN

		// 회원관리
		async ADMIN_ACT_ADMIN_USER(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_ADMIN_USER', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.admin.AdminUserGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.admin.parser(res)
						break
					case 'create':
						await apiAdmin.admin.AdminUserPost(items.params)
						break
					case 'edit':
						await apiAdmin.admin.AdminUserPut(items.params)
						break
					case 'delete':
						await apiAdmin.admin.AdminUserDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.user.UserGet', e)
			}
		},
	},
	getters: {},
	modules: {},
}
