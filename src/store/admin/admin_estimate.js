import apiAdmin from '@/api/admin'
import adminParse from '@/utils/parse/admin'

export default {
	state: {},
	mutations: {},
	actions: {
		// 견적상담관리
		// ESTIMATE

		// 견적관리
		async ADMIN_ACT_ESTIMATE_ESTIMATE_ITEMS(Null, params) {
			try {
				const res = await apiAdmin.estimate.EstimateGet(params)
				const result = res == undefined || res == null ? [] : adminParse.estimate.estimate_list.parser(res)
				console.log('admin.estimate.EstimateGet', result)
				return result
			} catch (e) {
				console.log('admin.estimate.EstimateGet', e)
			}
		},
		// 견적상담
		async ADMIN_ACT_ESTIMATE_CONSULT_ITEMS(Null, params) {
			try {
				const res = await apiAdmin.estimate.EstimateConsultGet(params)
				const result = res == undefined || res == null ? [] : adminParse.estimate.estimate_consult_list.parser(res)
				console.log('admin.estimate.EstimateConsultGet', result)
				return result
			} catch (e) {
				console.log('admin.estimate.EstimateConsultGet', e)
			}
		},
		// 제품단가
		async ADMIN_ACT_ESTIMATE_PRODUCT_PRICE(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_ESTIMATE_PRODUCT_PRICE', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.estimate.ProductPriceGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.basic_array.parser(res)
						break
					case 'create':
						await apiAdmin.estimate.ProductPricePost(items.params)
						break
					case 'edit':
						await apiAdmin.estimate.ProductPricePut(items.params)
						break
					case 'delete':
						await apiAdmin.estimate.ProductPriceDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.estimate.ProductPriceGet', e)
			}
		},
		// 견적단가
		async ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_ESTIMATE_ESTIMATE_PRICE', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.estimate.EstimatePriceGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.basic_array.parser(res)
						break
					case 'create':
						await apiAdmin.estimate.EstimatePricePost(items.params)
						break
					case 'edit':
						await apiAdmin.estimate.EstimatePricePut(items.params)
						break
					case 'delete':
						await apiAdmin.estimate.EstimatePriceDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.estimate.EstimatePriceGet', e)
			}
		},
		// 방 면적
		async ADMIN_ACT_ESTIMATE_ROOM_AREA(Null, items) {
			let res
			let result
			try {
				console.log('ADMIN_ACT_ESTIMATE_ROOM_AREA', items)
				switch (items.method) {
					case 'search':
						res = await apiAdmin.estimate.RoomAreaGet(items.params)
						result = res == undefined || res == null ? [] : adminParse.basic_array.parser(res)
						break
					case 'create':
						await apiAdmin.estimate.RoomAreaPost(items.params)
						break
					case 'edit':
						await apiAdmin.estimate.RoomAreaPut(items.params)
						break
					case 'delete':
						await apiAdmin.estimate.RoomAreaDel(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('admin.estimate.RoomAreaGet', e)
			}
		},
	},
	getters: {},
	modules: {},
}
