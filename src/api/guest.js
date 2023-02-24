import { caller } from '@/api/caller'

export default {
	// 견적상담
	estimate: {
		EstimateDetailGet(query) {
			return caller.Call('GET', 'web/mypage/estimate/nomember/get', null, query)
		},
		EstimateGet(params) {
			return caller.Call('POST', 'web/mypage/estimate/nomember/get', params, null)
		},
	},
}
