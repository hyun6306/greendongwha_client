import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {
		// category
		category_partItems: [],
		category_typeItems: [],
		category_brandItems: [],
		category_productItems: [],
		category_patternItems: [],
		// publicCode
		publicCode_groupItems: [],
		publicCode_items: [],
		// tag
		tag_groupItems: [],
		tag_items: [],
		// master
		master_items: [],
	},
	mutations: {
		// category
		ADMIN_MU_PRODUCT_CATEGORY_PART_ITEMS(state, items) {
			state.category_partItems = items
		},
		ADMIN_MU_PRODUCT_CATEGORY_TYPE_ITEMS(state, items) {
			state.category_typeItems = items
		},
		ADMIN_MU_PRODUCT_CATEGORY_BRAND_ITEMS(state, items) {
			state.category_brandItems = items
		},
		ADMIN_MU_PRODUCT_CATEGORY_PRODUCT_ITEMS(state, items) {
			state.category_productItems = items
		},
		ADMIN_MU_PRODUCT_CATEGORY_PATTERN_ITEMS(state, items) {
			state.category_patternItems = items
		},
		// puplicCode
		ADMIN_MU_PRODUCT_PUBLIC_CODE_GROUP_ITEMS(state, items) {
			state.publicCode_groupItems = items
		},
		ADMIN_MU_PRODUCT_PUBLIC_CODE_ITEMS(state, items) {
			state.publicCode_items = items
		},
		// tag
		ADMIN_MU_PRODUCT_TAG_GROUP_ITEMS(state, items) {
			state.tag_groupItems = items
		},
		ADMIN_MU_PRODUCT_TAG_ITEMS(state, items) {
			state.tag_items = items
		},
		// master
		ADMIN_MU_PRODUCT_GET_MASTER_ITEMS(state, items) {
			state.master_items = items
		},
	},
	actions: {
		// PRODUCT
		// PRODUCT

		// 카테고리
		ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL({ dispatch }) {
			dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '1')
			dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '2')
			dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '3')
			dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '4')
			dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '5')
		},
		async ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS({ commit }, query = '1') {
			try {
				const res = await apiAdmin.product.CategoryGet(query)
				const result = res == undefined || res == null ? [] : adminParse.product.category_data.parser(query, res)
				switch (query.substring(0, 1)) {
					// 품목
					case '1':
						commit('ADMIN_MU_PRODUCT_CATEGORY_PART_ITEMS', result)
						break
					// 종류
					case '2':
						commit('ADMIN_MU_PRODUCT_CATEGORY_TYPE_ITEMS', result)
						break
					// 브랜드
					case '3':
						commit('ADMIN_MU_PRODUCT_CATEGORY_BRAND_ITEMS', result)
						break
					// 제품
					case '4':
						commit('ADMIN_MU_PRODUCT_CATEGORY_PRODUCT_ITEMS', result)
						break
					// 패턴
					case '5':
						commit('ADMIN_MU_PRODUCT_CATEGORY_PATTERN_ITEMS', result)
						break
				}
			} catch (e) {
				console.log('admin.product.CategoryGet', e)
			}
		},
		async ADMIN_ACT_PRODUCT_CATEGORY_ITEMS({ commit, dispatch }, items) {
			console.log('category', items.params, items.query, items.method)
			try {
				let res
				let title
				let text
				let mode

				switch (items.method) {
					case 'create':
						mode = '등록'
						res = await apiAdmin.product.CategoryPost(items.params, items.query)
						break
					case 'edit':
						mode = '수정'
						res = await apiAdmin.product.CategoryPut(items.params, items.query)
						break
					case 'delete':
						mode = '삭제'
						res = await apiAdmin.product.CategoryDel(items.params, items.query)
						break
				}

				if (res === undefined) return

				switch (items.query) {
					// 품목
					case '1':
						title = `품목 ${mode}`
						text = `품목이 ${mode}되었습니다.`
						dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '1')
						break
					// 종류
					case '2':
						title = `종류 ${mode}`
						text = `종류가 ${mode}되었습니다.`
						dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '2')
						break
					// 브랜드
					case '3':
						title = `브랜드 ${mode}`
						text = `브랜드가 ${mode}되었습니다.`
						dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '3')
						break
					// 제품
					case '4':
						title = `제품 ${mode}`
						text = `제품이 ${mode}되었습니다.`
						dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '4')
						break
					// 패턴
					case '5':
						title = `패턴 ${mode}`
						text = `패턴이 ${mode}되었습니다.`
						dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', '5')
						break
				}
				commit('APP_MU_DIALOG', {
					dialog: true,
					title: title,
					text: text,
				})
			} catch (e) {
				console.log('admin.product.CategoryPost', e)
			}
		},
		async ADMIN_ACT_PRODUCT_GET_CATEGORY_PRODUCT_GOODS_ITEMS(Null, items) {
			console.log('category get product', items.type_code, items.goods_code)
			try {
				let res = await apiAdmin.product.CategoryProductGoodsItemsGet(`${items.goods_code}/${items.type_code}`)
				return res == undefined || res == null
					? []
					: adminParse.product.category_data.product_parser(items.type_code, res)
			} catch (e) {
				console.log('admin.product.CategoryProductGet', e)
			}
		},
		async ADMIN_ACT_PRODUCT_CATEGORY_PRODUCT_GOODS_ITEMS({ dispatch }, items) {
			console.log('category product', items.params, items.type_code, items.goods_code, items.method)
			try {
				switch (items.method) {
					case 'create':
						await apiAdmin.product.CategoryProductGoodsItemsPost(items.params)
						break
					case 'edit':
						await apiAdmin.product.CategoryProductGoodsItemsPut(items.params)
						break
					case 'delete':
						await apiAdmin.product.CategoryProductGoodsItemsDel(items.params)
						break
				}
				dispatch('ADMIN_ACT_PRODUCT_GET_CATEGORY_PRODUCT_GOODS_ITEMS', items)
			} catch (e) {
				console.log('admin.product.CategoryProductGet', e)
			}
		},

		// 공통코드
		async ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS({ commit }) {
			try {
				const res = await apiAdmin.product.PublicCodeGroupGet()
				const result = res == undefined || res == null ? [] : adminParse.product.public_code_data.group_parser(res)
				console.log('ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_GROUP_ITEMS', result)
				commit('ADMIN_MU_PRODUCT_PUBLIC_CODE_GROUP_ITEMS', result)
				return result
			} catch (e) {
				console.log('admin.product.PublicCodeGroupGet', e)
			}
		},
		async ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ commit }, params) {
			try {
				const res = await apiAdmin.product.PublicCodeGet(params)

				// 101 group_code 검색시 예외처리
				if (params.group_code === '101') return res

				const result = res == undefined || res == null ? [] : adminParse.product.public_code_data.parser(res)
				commit('ADMIN_MU_PRODUCT_PUBLIC_CODE_ITEMS', result)
				console.log('admin.product.PublicCodeGet', result)
				return result
			} catch (e) {
				console.log('admin.product.PublicCodeGet', e)
			}
		},
		async ADMIN_ACT_PRODUCT_PUBLIC_CODE_ITEMS({ dispatch }, items) {
			try {
				// console.log('items', items)
				switch (items.method) {
					case 'create':
						await apiAdmin.product.PublicCodePost(items.params)
						break
					case 'edit':
						await apiAdmin.product.PublicCodePut(items.params)
						break
					case 'delete':
						await apiAdmin.product.PublicCodeDel(items.params)
						break
				}
				dispatch('ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', {})
			} catch (e) {
				console.log('admin.product.PublicCodePost/Put', e)
			}
		},

		// 태그
		async ADMIN_ACT_PRODUCT_TAG_ITEMS({ commit }, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_PRODUCT_TAG_ITEMS', items)
				switch (items.method) {
					case 'search':
						result = await apiAdmin.product.TagGroupGet(items.params)
						break
					case 'getGroupItems':
						// 공통코드 tags 가져오기
						res = await apiAdmin.product.PublicCodeGet({ group_code: '201' })
						result = res == undefined || res == null ? [] : adminParse.product.public_code_data.parser(res)
						commit('ADMIN_MU_PRODUCT_TAG_GROUP_ITEMS', result)
						break
					case 'getItems':
						res = await apiAdmin.product.TagGet(null)
						result = res == undefined || res == null ? [] : adminParse.product.tag_data.parser(res)
						commit('ADMIN_MU_PRODUCT_TAG_ITEMS', result)
						break
					case 'create':
						await apiAdmin.product.TagPost(items.params)
						break
					case 'edit':
						await apiAdmin.product.TagPut(items.params)
						break
					case 'delete':
						await apiAdmin.product.TagDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.product.Tag', e)
			}
		},

		// 상품마스터
		async ADMIN_ACT_PRODUCT_GET_MASTER_ITEMS({ commit }, params) {
			try {
				console.log('params', params)
				const res = await apiAdmin.product.MasterGet(params)
				const result = res == undefined || res == null ? [] : adminParse.product.master_data.parser(res)
				commit('ADMIN_MU_PRODUCT_GET_MASTER_ITEMS', result)
				console.log('admin.product.MasterGet', result)
				return result
			} catch (e) {
				console.log('admin.product.MasterGet', e)
			}
		},
		async ADMIN_ACT_PRODUCT_PUT_MASTER_ITEMS({ dispatch }, params) {
			try {
				await apiAdmin.product.MasterPut(params)
				dispatch('ADMIN_ACT_PRODUCT_GET_MASTER_ITEMS', {})
			} catch (e) {
				console.log('admin.product.MasterPut', e)
			}
		},
	},
	getters: {
		// category
		ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS: state => state.category_partItems,
		ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS: state => state.category_typeItems,
		ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS: state => state.category_brandItems,
		ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS: state => state.category_productItems,
		ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS: state => state.category_patternItems,
		// publicCode
		ADMIN_GET_PRODUCT_PUBLIC_CODE_GROUP_ITEMS: state => state.publicCode_groupItems,
		ADMIN_GET_PRODUCT_PUBLIC_CODE_ITEMS: state => state.publicCode_items,
		// tag
		ADMIN_GET_PRODUCT_TAG_GROUP_ITEMS: state => state.tag_groupItems,
		ADMIN_GET_PRODUCT_TAG_ITEMS: state => state.tag_items,
		// master
		ADMIN_GET_PRODUCT_GET_MASTER_ITEMS: state => state.master_items,
	},
	modules: {},
}
