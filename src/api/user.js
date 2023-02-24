import { caller } from '@/api/caller'

export default {
	user: {
		// 스크랩
		scrap: {
			ScrapCountGet(params) {
				return caller.Call('POST', 'web/scrap/count/get', params, null)
			},
			ScrapListGet(params) {
				return caller.Call('POST', 'web/scrap/get', params, null)
			},
			ScrapPost(params) {
				return caller.Call('POST', 'web/scrap/post', params, null, 'form')
			},
			ScrapDel(params) {
				return caller.Call('POST', 'web/scrap/delete', params, null)
			},
		},
		// 견적상담
		estimate: {
			EstimateDetailGet(query) {
				return caller.Call('GET', 'web/mypage/estimate/get', null, query)
			},
			EstimateGet(params) {
				return caller.Call('POST', 'web/mypage/estimate/get', params, null)
			},
			EstimateDel(params) {
				return caller.Call('POST', 'web/mypage/estimate/delete', params, null)
			},
		},
		// 품질보증
		quality: {
			QualityDetailGet(query) {
				return caller.Call('GET', 'web/mypage/quality-assurance/get', null, query)
			},
			QualityGet(params) {
				return caller.Call('POST', 'web/mypage/quality-assurance/get', params, null)
			},
			QualityPost(params) {
				return caller.Call('POST', 'web/customer/quality/post', params, null, 'form')
			},
			QualityPut(params) {
				return caller.Call('POST', 'web/mypage/quality-assurance/put', params, null, 'form')
			},
			QualityDel(params) {
				return caller.Call('POST', 'web/mypage/quality-assurance/delete', params, null)
			},
		},
		// as신청
		as: {
			AsDetailGet(query) {
				return caller.Call('GET', 'web/mypage/after-service/get', null, query)
			},
			AsGet(params) {
				return caller.Call('POST', 'web/mypage/after-service/get', params, null)
			},
			AsPost(params) {
				return caller.Call('POST', 'web/customer/afterservice/post', params, null, 'form')
			},
			AsPut(params) {
				return caller.Call('POST', 'web/mypage/after-service/put', params, null, 'form')
			},
			AsDel(params) {
				return caller.Call('POST', 'web/mypage/after-service/delete', params, null)
			},
		},
		// 1:1문의
		question: {
			QuestionDetailGet(query) {
				return caller.Call('GET', 'web/mypage/after-service/get', null, query)
			},
			QuestionGet(params) {
				return caller.Call('POST', 'web/mypage/after-service/get', params, null)
			},
			QuestionPost(params) {
				return caller.Call('POST', 'web/customer/afterservice/post', params, null, 'form')
			},
			QuestionPut(params) {
				return caller.Call('POST', 'web/mypage/after-service/put', params, null, 'form')
			},
			QuestionDel(params) {
				return caller.Call('POST', 'web/mypage/after-service/delete', params, null)
			},
		},
		// 회원정보 수정
		modify: {
			// 일반회원정보 수정
			user(params) {
				return caller.Call('POST', 'mypage/usermodify/member/put', params, null, 'form')
			},
			// 인테리어회원 수정
			interior(params) {
				return caller.Call('POST', 'mypage/usermodify/corporate/put', params, null, 'form')
			},
		},
		// 회원탈퇴
		secession: {
			// 일반회원
			user(params) {
				return caller.Call('POST', 'mypage/usermodify/member/out/delete', params, null, 'form')
			},
			// 인테리어회원
			interior(params) {
				return caller.Call('POST', 'mypage/usermodify/corporate/out/delete', params, null, 'form')
			},
		},
	},
	agency: {
		// 전문가 집들이 관리
		housewarming: {
			HousewarmingDetailGet(query) {
				return caller.Call('GET', 'web/housewarming/expert/getCard', null, query)
			},
			HousewarmingGet(params) {
				return caller.Call('POST', 'web/housewarming/expert/getCard', params, null)
			},
			HousewarmingPut(params) {
				return caller.Call('POST', 'web/housewarming/expert/put', params, null, 'form')
			},
			HousewarmingDel(params) {
				return caller.Call('POST', 'web/housewarming/expert/delete', params, null)
			},
		},
		// 견적상담관리
		estimate: {
			EstimateDetailGet(params) {
				return caller.Call('POST', 'web/mypage/estimate/getinterior', params, null)
			},
			EstimateGet(params) {
				return caller.Call('POST', 'web/mypage/estimate/getinterior', params, null)
			},
			EstimatePut(params) {
				return caller.Call('POST', 'web/mypage/estimate/putinterior', params, null, 'form')
			},
			EstimateDel(params) {
				return caller.Call('POST', 'web/mypage/estimate/deleteinterior', params, null)
			},
		},
		// 인테리어점 문의내역
		ask: {
			AskGet(params) {
				return caller.Call('POST', 'web/customer/interior-inquiry/get', params, null)
			},
			AskPost(params) {
				return caller.Call('POST', 'web/customer/interior-inquiry/post', params, null, 'form')
			},
			AskPut(params) {
				return caller.Call('POST', 'web/customer/interior-inquiry/put', params, null, 'form')
			},
			AskDel(params) {
				return caller.Call('POST', 'web/customer/interior-inquiry/delete', params, null)
			},
		},
	},
}
