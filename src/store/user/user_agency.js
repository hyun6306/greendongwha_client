import apiAdmin from '@/api/admin'
import apiUser from '@/api/user'
import agencyParse from '@/utils/parse/agency'

export default {
	state: {
		housewarmingItems: [],
		housewarmingSelectItem: {},
		estimateItems: [],
		estimateSelectItem: {},
		askItems: [],
		askSelectItem: {},
	},
	mutations: {
		AGENCY_MU_HOUSEWARMING(state, housewarmingItems) {
			state.housewarmingItems = housewarmingItems
		},
		AGENCY_MU_HOUSEWARMING_SELECT(state, housewarmingSelectItem) {
			state.housewarmingSelectItem = housewarmingSelectItem
		},
		AGENCY_MU_ESTIMATE(state, estimateItems) {
			state.estimateItems = estimateItems
		},
		AGENCY_MU_ESTIMATE_SELECT(state, estimateSelectItem) {
			state.estimateSelectItem = estimateSelectItem
		},
		AGENCY_MU_ASK(state, askItems) {
			state.askItems = askItems
		},
		AGENCY_MU_ASK_SELECT(state, askSelectItem) {
			state.askSelectItem = askSelectItem
		},
	},
	actions: {
		// 전문가 집들이
		async AGENCY_ACT_HOUSEWARMING({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.agency.housewarming.HousewarmingDetailGet(items.query).then(res => {
							console.log('AGENCY_ACT_HOUSEWARMING_detail', res)
							commit('AGENCY_MU_HOUSEWARMING_SELECT', res[0])
							result = res
						})
						break
					case 'get':
						await apiUser.agency.housewarming.HousewarmingGet(items.params).then(res => {
							console.log('AGENCY_ACT_HOUSEWARMING_get', res)
							result = res == undefined || res == null ? [] : agencyParse.housewarming.parser(res)
							commit('AGENCY_MU_HOUSEWARMING', result)
						})
						break
					case 'post':
						await apiAdmin.display.HouseSpecialPost(items.params).then(res => {
							console.log('AGENCY_ACT_HOUSEWARMING_post', res)
							result = res
						})
						break
					case 'put':
						await apiUser.agency.housewarming.HousewarmingPut(items.params).then(res => {
							console.log('AGENCY_ACT_HOUSEWARMING_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.agency.housewarming.HousewarmingDel(items.params).then(res => {
							console.log('AGENCY_ACT_HOUSEWARMING_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('agency.housewarming.Housewarming', e)
			}
		},
		// 견적상담 관리
		async AGENCY_ACT_ESTIMATE({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.user.estimate.EstimateDetailGet(items.query).then(res => {
							console.log('AGENCY_ACT_ESTIMATE_detail', res)
							result = res
						})
						break
					case 'get':
						await apiUser.user.estimate.EstimateGet(items.params).then(res => {
							console.log('AGENCY_ACT_ESTIMATE_get', res)
							result = res == undefined || res == null ? [] : agencyParse.estimate.parser(res)
							commit('AGENCY_MU_ESTIMATE', result)
						})
						break
					case 'put':
						await apiUser.agency.estimate.EstimatePut(items.params).then(res => {
							console.log('AGENCY_ACT_ESTIMATE_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.agency.estimate.EstimateDel(items.params).then(res => {
							console.log('AGENCY_ACT_ESTIMATE_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('agency.estimate.Estimate', e)
			}
		},
		// 문의내역
		async AGENCY_ACT_ASK({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'get':
						await apiUser.agency.ask.AskGet(items.params).then(res => {
							console.log('AGENCY_ACT_ASK_get', res)
							result = res == undefined || res == null ? [] : agencyParse.ask.parser(res)
							commit('AGENCY_MU_ASK', result)
						})
						break
					case 'post':
						await apiUser.agency.ask.AskPost(items.params).then(res => {
							console.log('AGENCY_ACT_ASK_post', res)
							result = res
						})
						break
					case 'put':
						await apiUser.agency.ask.AskPut(items.params).then(res => {
							console.log('AGENCY_ACT_ASK_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.agency.ask.AskDel(items.params).then(res => {
							console.log('AGENCY_ACT_ASK_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('agency.ask.ask', e)
			}
		},
	},
	getters: {
		AGENCY_GET_HOUSEWARMING: state => state.housewarmingItems,
		AGENCY_GET_HOUSEWARMING_SELECT: state => state.housewarmingSelectItem,
		AGENCY_GET_ESTIMATE: state => state.estimateItems,
		AGENCY_GET_ESTIMATE_SELECT: state => state.estimateSelectItem,
		AGENCY_GET_ASK: state => state.askItems,
		AGENCY_GET_ASK_SELECT: state => state.askSelectItem,
	},
	modules: {},
}
