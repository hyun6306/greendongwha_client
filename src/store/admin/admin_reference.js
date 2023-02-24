import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 자료관리
		// REFERENCE

		// 인증서 / 시험성적서
		async ADMIN_ACT_REFERENCE_CERTIFICATION(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_REFERENCE_CERTIFICATION', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.reference.CertificationGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.reference.certification.parser(res)
						break
					case 'create':
						await apiAdmin.reference.CertificationPost(items.params)
						break
					case 'edit':
						await apiAdmin.reference.CertificationPut(items.params)
						break
					case 'delete':
						await apiAdmin.reference.CertificationDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.reference.Certification', e)
			}
		},
		// 카탈로그
		async ADMIN_ACT_REFERENCE_CATALOG(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_REFERENCE_CATALOG', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.reference.CatalogGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.reference.catalog.parser(res)
						break
					case 'create':
						result = await apiAdmin.reference.CatalogPost(items.params)
						break
					case 'mapping':
						await apiAdmin.reference.CatalogMappingPost(items.params)
						break
					case 'edit':
						result = await apiAdmin.reference.CatalogPut(items.params)
						break
					case 'delete':
						await apiAdmin.reference.CatalogDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.reference.Catalog', e)
			}
		},
	},
	getters: {},
	modules: {},
}
