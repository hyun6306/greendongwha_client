import apiAdmin from '@/api/admin'
import siteParse from '@/utils/parse/site'

export default {
	state: {
		certificationItems: [],
		catalogItems: [],
		brand_certItems: [],
	},
	mutations: {
		SITE_MU_REFERENCE_CERTIFICATION(state, certificationItems) {
			state.certificationItems = certificationItems
		},
		SITE_MU_REFERENCE_CATALOG(state, catalogItems) {
			state.catalogItems = catalogItems
		},
		SITE_MU_BRAND_CERTIFICATION(state, items) {
			state.brand_certItems = items
		},
	},
	actions: {
		// 인증서 / 시험성적서
		async SITE_ACT_REFERENCE_CERTIFICATION({ commit }, items) {
			try {
				let res
				let result
				switch (items.method) {
					case 'detail':
						res = await apiAdmin.reference.CertificationDetailGet(items.query)
						result = res == undefined || res == null ? [] : res
						break
					case 'get':
						res = await apiAdmin.reference.CertificationGet(items.params)
						result = res == undefined || res == null ? [] : res
						console.log('apiAdmin.reference.CertificationGet', result)
						commit('SITE_MU_REFERENCE_CERTIFICATION', result)
						break
				}

				return result
			} catch (e) {
				console.log('admin.reference.CertificationDetail', e)
			}
		},
		// 카탈로그
		async SITE_ACT_REFERENCE_CATALOG({ commit }, items) {
			try {
				let res
				let result
				switch (items.method) {
					case 'detail':
						res = await apiAdmin.reference.CatalogDetailGet(items.query)
						result = res == undefined || res == null ? [] : res
						break
					case 'get':
						res = await apiAdmin.reference.CatalogGet(items.params)
						result = res == undefined || res == null ? [] : siteParse.reference.catalog.parser(res)
						commit('SITE_MU_REFERENCE_CATALOG', result)
						break
				}

				return result
			} catch (e) {
				console.log('admin.reference.Catalog', e)
			}
		},
		// 인증서 / 시험성적서
		async SITE_ACT_BRAND_CERTIFICATION({ commit }, items) {
			try {
				let res
				let result
				switch (items.method) {
					case 'get':
						res = await apiAdmin.reference.CertificationGet(items.params)
						result = res == undefined || res == null ? [] : res
						console.log('SITE_ACT_BRAND_CERTIFICATION', result)
						commit('SITE_MU_BRAND_CERTIFICATION', result)
						break
				}

				return result
			} catch (e) {
				console.log('admin.reference.CertificationDetail', e)
			}
		},
	},
	getters: {
		SITE_GET_REFERENCE_CERTIFICATION: state => state.certificationItems,
		SITE_GET_REFERENCE_CATALOG: state => state.catalogItems,
		SITE_GET_BRAND_CERTIFICATION: state => state.brand_certItems,
	},
	modules: {},
}
