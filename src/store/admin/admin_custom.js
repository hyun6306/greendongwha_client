import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 고객센터
		// CUSTOM

		// 품질 보증
		async ADMIN_ACT_CUSTOM_QUALITY(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_CUSTOM_QUALITY', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.custom.QualityGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.custom.quality.parser(res)
						break
					case 'edit':
						await apiAdmin.custom.QualityPut(items.params)
						break
					case 'delete':
						await apiAdmin.custom.QualityDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.custom.Quality', e)
			}
		},
		// A/S || 1:1 문의
		async ADMIN_ACT_CUSTOM_AS(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_CUSTOM_AS', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.custom.AsGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.custom.as.parser(res)
						break
					case 'edit':
						await apiAdmin.custom.AsPut(items.params)
						break
					case 'delete':
						await apiAdmin.custom.AsDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.custom.As', e)
			}
		},
		// 동화소식
		async ADMIN_ACT_CUSTOM_NOTICE(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_CUSTOM_NOTICE', items)
				switch (items.method) {
					case 'detail':
						result = await apiAdmin.custom.NoticeDetailGet(items.query)
						break
					case 'search':
						res = await apiAdmin.custom.NoticeGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.custom.notice.parser(res)
						break
					case 'create':
						await apiAdmin.custom.NoticePost(items.params)
						break
					case 'edit':
						await apiAdmin.custom.NoticePut(items.params)
						break
					case 'delete':
						await apiAdmin.custom.NoticeDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.custom.As', e)
			}
		},
		// 인테리어점 문의
		async ADMIN_ACT_CUSTOM_INTERIOR_QUESTION(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_CUSTOM_NOTICE', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.custom.InteriorQuestionGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.custom.interiorQuestion.parser(res)
						break
					case 'edit':
						await apiAdmin.custom.InteriorQuestionPut(items.params)
						break
					case 'delete':
						await apiAdmin.custom.InteriorQuestionDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.custom.As', e)
			}
		},
	},
	getters: {},
	modules: {},
}
