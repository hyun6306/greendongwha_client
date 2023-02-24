import apiUser from '@/api/user'
import apiGuest from '@/api/guest'

export default {
	state: {
		estimateItems: [],
		estimateDetailItem: {},
	},
	mutations: {
		GUEST_MU_ESTIMATE(state, estimateItems) {
			state.estimateItems = estimateItems
		},
		GUEST_MU_ESTIMATE_DETAIL(state, estimateSelectItem) {
			state.estimateDetailItem = estimateSelectItem
		},
	},
	actions: {
		// 견적상담 관리
		async GUEST_ACT_ESTIMATE({ commit, dispatch }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiGuest.estimate.EstimateDetailGet(items.query).then(res => {
							console.log('GUEST_ACT_ESTIMATE_detail', res)
							commit('GUEST_MU_ESTIMATE_DETAIL', res[0])
							result = res[0]
						})
						break
					case 'get':
						await apiGuest.estimate.EstimateGet(items.params).then(res => {
							console.log('GUEST_ACT_ESTIMATE_get', res)
							result = res == undefined || res == null ? [] : res.reverse()
							commit('GUEST_MU_ESTIMATE', result)
							// 최신 견적 상세 리스트 가져오기
							dispatch('GUEST_ACT_ESTIMATE', {
								method: 'detail',
								query: `${result[0].consult_id}/${items.params.login_name}`,
							})
						})
						break
					case 'del':
						await apiUser.user.estimate.EstimateDel(items.params).then(res => {
							console.log('GUEST_ACT_ESTIMATE_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('agency.estimate.Estimate', e)
			}
		},
	},
	getters: {
		GUEST_GET_ESTIMATE: state => state.estimateItems,
		GUEST_GET_ESTIMATE_DETAIL: state => state.estimateDetailItem,
	},
	modules: {},
}
