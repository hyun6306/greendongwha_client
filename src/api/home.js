import { caller } from '@/api/caller'

export default {
	main: {
		// home
		BannerGet() {
			return caller.Call('GET', 'backoffice/main/banners/getweb', null, null)
		},
		SimpleEstimatePost(params) {
			return caller.Call('POST', 'web/interior/estimate/get', params, null)
		},
		Housewarming3DGet() {
			return caller.Call('GET', 'web/housewarming/expert/get3dPop', null, null)
		},
		HousewarmingSpecialGet() {
			return caller.Call('GET', 'web/housewarming/expert/getExpertPop', null, null)
		},
		BestProductGet() {
			return caller.Call('GET', 'backoffice/main/best-items/getbestmain', null, null)
		},
		SearchTagsGet() {
			return caller.Call('GET', 'web/main/poptag/get', null, null)
		},
		PopularProductGet() {
			return caller.Call('GET', 'web/itemsearch/itemlist/getmain', null, null)
		},
		// appbar
		SearchKeywordGet() {
			return caller.Call('GET', 'backoffice/main/recommend-search/get', null, null)
		},
		RecommendProductGet() {
			return caller.Call('GET', 'backoffice/main/recommend-items/get', null, null)
		},
	},
	// 집들이
	housewarming: {
		// 3D 집들이
		House3DGet(params) {
			return caller.Call('POST', 'web/housewarming/expert/get3d', params, null)
		},
		House3DDetailGet(query) {
			return caller.Call('GET', 'web/housewarming/expert/get3d', null, query)
		},
		House3DPopGet(query = null) {
			return caller.Call('GET', 'web/housewarming/expert/get3dPop', null, query)
		},
		// 전문가 집들이
		HouseSpecialGet(params) {
			return caller.Call('POST', 'web/housewarming/expert/getExpert', params, null)
		},
		HouseSpecialDetailGet(query) {
			return caller.Call('GET', 'web/housewarming/expert/getExpert', null, query)
		},
		HouseSpecialPopGet(query = null) {
			return caller.Call('GET', 'web/housewarming/expert/getExpertPop', null, query)
		},
	},
	// 인테리어
	interior: {
		// 인테리어점 List
		InteriorGet(params) {
			return caller.Call('POST', 'web/interior/searchstore/get', params, null)
		},
		// 인테리어점 상세정보
		InteriorDetailGet(query) {
			return caller.Call('GET', 'web/interior/searchstore/get', null, query)
		},
		// 전문가 집들이 List
		ExpertGet(params) {
			return caller.Call('POST', 'web/interior/searchexpert/get', params, null)
		},
		// 전문가 집들이 상세정보
		InteriorDetailExpertGet(params) {
			return caller.Call('POST', 'web/housewarming/expert/get', params, null)
		},
		// 간편 견적내기
		EstimateSimplePriceGet(params) {
			return caller.Call('POST', 'web/interior/estimate/get', params, null)
		},
		// 간편 견적저장
		EstimateSimplePricePost(params) {
			return caller.Call('POST', 'web/interior/estimate/post', params, null, 'form')
		},
		// 전시장 List
		ShowRoomListGet(params) {
			return caller.Call('POST', 'web/interior/showroom/get', params, null)
		},
		// 전시장 상세정보
		ShowRoomDetailGet(query) {
			return caller.Call('GET', 'web/interior/showroom/get', null, query)
		},
	},
	// 제품
	product: {
		// 제품 - 전체
		TotalItemGet(params) {
			return caller.Call('POST', 'web/itemsearch/itemlist/getlist', params, null)
		},
		// 제품 - ( 제품만 )
		ItemGet(params) {
			return caller.Call('POST', 'web/itemsearch/itemlist/get', params, null)
		},
		// 상세 제품
		DetailItemsGet(query) {
			return caller.Call('GET', 'web/itemsearch/itemlist/get', null, query)
		},
		// 인기제품 - 전체
		PopularItemGet(params) {
			return caller.Call('POST', 'web/itemsearch/itemlist/getlistpop', params, null)
		},
		// 인기제품 - ( 제품만 )
		PopItemsGet() {
			return caller.Call('GET', 'web/itemsearch/itempop/get', null, null)
		},
		// 특판문의 등록
		SpacialPost(params) {
			return caller.Call('POST', 'web/itemsearch/special-sale/post', params, null, 'form')
		},
	},
	// 커뮤니티
	community: {
		// 노하우
		KnowHowDetailGet(query) {
			return caller.Call('GET', 'web/community/knowhow/get', null, query)
		},
		KnowHowGet() {
			return caller.Call('GET', 'web/community/knowhow/get', null, null)
		},
		KnowHowPopGet() {
			return caller.Call('GET', 'web/community/knowhow-pop/get', null, null)
		},
		// 이벤트
		EventDetailGet(query) {
			return caller.Call('GET', 'web/community/event/get', null, query)
		},
		EventGet(params) {
			return caller.Call('POST', 'web/community/event/get', params, null)
		},
		EventWinGet() {
			return caller.Call('GET', 'web/community/event/get', null, null)
		},
		EventPost(params) {
			return caller.Call('POST', 'web/community/event/post', params, null, 'form')
		},
		MaruTvGet() {
			return caller.Call('GET', 'web/community/video/get', null, null)
		},
		InstagramGet() {
			return caller.Call('GET', 'web/community/insta/get', null, null)
		},
	},
	// 고객센터
	custom: {
		// 동화소식
		NoticeDetailGet(query) {
			return caller.Call('GET', 'web/customer/notice/get', null, query)
		},
		NoticeGet(params) {
			return caller.Call('POST', 'web/customer/notice/get', params, null)
		},
	},
}
