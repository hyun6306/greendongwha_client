import { caller } from '@/api/caller'

export default {
	// 메인관리
	// main
	main: {
		// 메인 베너
		BannerGet(query) {
			return caller.Call('GET', 'backoffice/main/banners/get', null, query)
		},
		BannerPost(params) {
			return caller.Call('POST', 'backoffice/main/banners/post', params, null, 'form')
		},
		BannerPut(params) {
			return caller.Call('POST', 'backoffice/main/banners/put', params, null, 'form')
		},
		BannerDel(params) {
			return caller.Call('POST', 'backoffice/main/banners/delete', params, null)
		},
		BannerPriorityPost(params) {
			return caller.Call('POST', 'backoffice/main/banners/postsort', params, null)
		},
		// 베스트 제품
		BestProductGet(query) {
			return caller.Call('GET', 'backoffice/main/best-items/getbest', null, query)
		},
		BestProductHisGet(query) {
			return caller.Call('GET', 'backoffice/main/best-items/getitem', null, query)
		},
		BestProductSortPost(params) {
			return caller.Call('POST', 'backoffice/main/best-items/postsort', params, null)
		},
		BestProductPost(params) {
			return caller.Call('POST', 'backoffice/main/best-items/post', params, null, 'form')
		},
		BestProductPut(params) {
			return caller.Call('POST', 'backoffice/main/best-items/put', params, null, 'form')
		},
		BestProductDel(params) {
			return caller.Call('POST', 'backoffice/main/best-items/delete', params, null)
		},
		// 추천 제품
		RecommendProductGet(query) {
			return caller.Call('GET', 'backoffice/main/recommend-items/get', null, query)
		},
		RecommendProductSortPost(params) {
			return caller.Call('POST', 'backoffice/main/recommend-items/postsort', params, null)
		},
		RecommendProductPost(params) {
			return caller.Call('POST', 'backoffice/main/recommend-items/post', params, null, 'form')
		},
		RecommendProductPut(params) {
			return caller.Call('POST', 'backoffice/main/recommend-items/put', params, null, 'form')
		},
		RecommendProductDel(params) {
			return caller.Call('POST', 'backoffice/main/recommend-items/delete', params, null)
		},
		// 추천 검색어
		RecommendSearchGet(query) {
			return caller.Call('GET', 'backoffice/main/recommend-search/get', null, query)
		},
		RecommendSearchSortPost(params) {
			return caller.Call('POST', 'backoffice/main/recommend-search/postsort', params, null)
		},
		RecommendSearchPost(params) {
			return caller.Call('POST', 'backoffice/main/recommend-search/post', params, null, 'form')
		},
		RecommendSearchPut(params) {
			return caller.Call('POST', 'backoffice/main/recommend-search/put', params, null, 'form')
		},
		RecommendSearchDel(params) {
			return caller.Call('POST', 'backoffice/main/recommend-search/delete', params, null)
		},
		// 팝업
		PopupGet(params) {
			return caller.Call('POST', 'backoffice/main/popup/get', params, null)
		},
		PopupDetail(query) {
			return caller.Call('GET', 'backoffice/main/popup/get', null, query)
		},
		PopupPost(params) {
			return caller.Call('POST', 'backoffice/main/popup/post', params, null, 'form')
		},
		PopupPut(params) {
			return caller.Call('POST', 'backoffice/main/popup/put', params, null, 'form')
		},
		PopupDel(params) {
			return caller.Call('POST', 'backoffice/main/popup/delete', params, null)
		},
	},
	// 제품관리
	// product
	product: {
		// 카테고리
		// category - with home
		CategoryGet(query) {
			// 전체 조회  // part > query = 1 // type > query = 2 // brand > query = 3 // product > query = 4 // pattern > query = 5
			// 상세 조회 > query = '/part/goods_code'
			return caller.Call('GET', 'backoffice/items/category/get', null, query)
		},
		CategoryPost(params, query) {
			return caller.Call('POST', 'backoffice/items/category/post', params, query, 'form')
		},
		CategoryPut(params, query) {
			return caller.Call('POST', 'backoffice/items/category/put', params, query, 'form')
		},
		CategoryDel(params, query) {
			return caller.Call('POST', 'backoffice/items/category/delete', params, query)
		},
		// category product details
		CategoryProductGoodsItemsGet(query) {
			// 조회  // goos_code/type_code
			return caller.Call('GET', 'backoffice/items/goodsdetails/get', null, query)
		},
		CategoryProductGoodsItemsPost(params) {
			return caller.Call('POST', 'backoffice/items/goodsdetails/post', params, null, 'form')
		},
		CategoryProductGoodsItemsPut(params) {
			return caller.Call('POST', 'backoffice/items/goodsdetails/put', params, null, 'form')
		},
		CategoryProductGoodsItemsDel(params) {
			return caller.Call('POST', 'backoffice/items/goodsdetails/delete', params, null)
		},
		CategoryProductGoodsStructureImagePost(params) {
			return caller.Call('POST', 'backoffice/items/goodsdetails/put/image', params, null, 'form')
		},
		// 공통코드
		// publicCode
		PublicCodeGroupGet() {
			return caller.Call('GET', 'backoffice/items/common-code/get', null, null)
		},
		// - with home
		PublicCodeGet(params) {
			return caller.Call('POST', 'backoffice/items/common-code/get', params, null)
		},
		PublicCodePost(params) {
			return caller.Call('POST', 'backoffice/items/common-code/post', params, null, 'form')
		},
		PublicCodePut(params) {
			return caller.Call('POST', 'backoffice/items/common-code/put', params, null, 'form')
		},
		PublicCodeDel(params) {
			return caller.Call('POST', 'backoffice/items/common-code/delete', params, null)
		},
		// 태그
		// tag
		TagGroupGet(params) {
			return caller.Call('POST', 'backoffice/items/tag/get', params, null)
		},
		TagGet(query) {
			return caller.Call('GET', 'backoffice/items/tag/get', null, query)
		},
		TagPost(params) {
			return caller.Call('POST', 'backoffice/items/tag/post', params, null, 'form')
		},
		TagPut(params) {
			return caller.Call('POST', 'backoffice/items/tag/put', params, null, 'form')
		},
		TagDel(params) {
			return caller.Call('POST', 'backoffice/items/tag/delete', params, null)
		},
		// 마스터
		// master
		MasterGet(params) {
			return caller.Call('POST', 'backoffice/items/item-master/get', params, null)
		},
		MasterPut(params) {
			return caller.Call('POST', 'backoffice/items/item-master/put', params, null, 'form')
		},
	},
	// 자료관리
	// reference
	reference: {
		// 인증서/ 시험성적서
		CertificationDetailGet(query) {
			return caller.Call('GET', 'backoffice/data-admin/credential/get', null, query)
		},
		CertificationGet(params) {
			return caller.Call('POST', 'backoffice/data-admin/credential/get', params, null)
		},
		CertificationPost(params) {
			return caller.Call('POST', 'backoffice/data-admin/credential/post', params, null, 'form')
		},
		CertificationPut(params) {
			return caller.Call('POST', 'backoffice/data-admin/credential/put', params, null, 'form')
		},
		CertificationDel(params) {
			return caller.Call('POST', 'backoffice/data-admin/credential/delete', params, null)
		},
		// 카탈로그
		CatalogDetailGet(query) {
			return caller.Call('GET', 'backoffice/data-admin/catalog/get', null, query)
		},
		CatalogGet(params) {
			return caller.Call('POST', 'backoffice/data-admin/catalog/get', params, null)
		},
		CatalogPost(params) {
			return caller.Call('POST', 'backoffice/data-admin/catalog/post', params, null, 'form')
		},
		CatalogMappingPost(params) {
			return caller.Call('POST', 'backoffice/data-admin/catalog/postmapping', params, null)
		},
		CatalogPut(params) {
			return caller.Call('POST', 'backoffice/data-admin/catalog/put', params, null, 'form')
		},
		CatalogDel(params) {
			return caller.Call('POST', 'backoffice/data-admin/catalog/delete', params, null)
		},
	},
	// 전시관리
	// display
	display: {
		// 3D집들이
		// house3D
		House3DDetailGet(query) {
			return caller.Call('GET', 'backoffice/display/housewarming3d/contents/get', null, query)
		},
		House3DGet(params) {
			return caller.Call('POST', 'backoffice/display/housewarming3d/get', params, null)
		},
		House3DPost(params) {
			return caller.Call('POST', 'backoffice/display/housewarming3d/post', params, null, 'form')
		},
		House3DPut(params) {
			return caller.Call('POST', 'backoffice/display/housewarming3d/put', params, null, 'form')
		},
		House3DDel(params) {
			return caller.Call('POST', 'backoffice/display/housewarming3d/delete', params, null)
		},
		// 전문가집들이
		// houseSpecial
		HouseSpecialDetailGet(query) {
			return caller.Call('GET', 'backoffice/display/exphousewarming/contents/get', null, query)
		},
		HouseSpecialGet(params) {
			return caller.Call('POST', 'backoffice/display/exphousewarming/get', params, null)
		},
		HouseSpecialPost(params) {
			return caller.Call('POST', 'web/housewarming/expert/post', params, null, 'form')
		},
		HouseSpecialPut(params) {
			return caller.Call('POST', 'backoffice/display/exphousewarming/put', params, null, 'form')
		},
		HouseSpecialDel(params) {
			return caller.Call('POST', 'backoffice/display/exphousewarming/delete', params, null, 'form')
		},
		// 노하우
		// knowHow
		KnowHowDetailGet(query) {
			return caller.Call('GET', 'backoffice/display/knowhow/contents/get', null, query)
		},
		KnowHowGet(params) {
			return caller.Call('POST', 'backoffice/display/knowhow/get', params, null)
		},
		KnowHowPost(params) {
			return caller.Call('POST', 'backoffice/display/knowhow/post', params, null, 'form')
		},
		KnowHowPut(params) {
			return caller.Call('POST', 'backoffice/display/knowhow/put', params, null, 'form')
		},
		KnowHowDel(params) {
			return caller.Call('POST', 'backoffice/display/knowhow/delete', params, null)
		},
		// 동화쇼룸
		// showRoom
		ShowRoomDetailGet(query) {
			return caller.Call('GET', 'backoffice/display/showroom/contents/get', null, query)
		},
		ShowRoomGet(params) {
			return caller.Call('POST', 'backoffice/display/showroom/get', params, null)
		},
		ShowRoomPost(params) {
			return caller.Call('POST', 'backoffice/display/showroom/post', params, null, 'form')
		},
		ShowRoomPut(params) {
			return caller.Call('POST', 'backoffice/display/showroom/put', params, null, 'form')
		},
		ShowRoomDel(params) {
			return caller.Call('POST', 'backoffice/display/showroom/delete', params, null)
		},
		// 마루잘알TV
		// maruTv
		MaruTvGet(params) {
			return caller.Call('POST', 'backoffice/display/video/get', params, null)
		},
		MaruTvPost(params) {
			return caller.Call('POST', 'backoffice/display/video/post', params, null, 'form')
		},
		MaruTvPut(params) {
			return caller.Call('POST', 'backoffice/display/video/put', params, null, 'form')
		},
		MaruTvDel(params) {
			return caller.Call('POST', 'backoffice/display/video/delete', params, null)
		},
	},
	// 견적상담관리
	// estimate
	estimate: {
		// 견적관리_조회
		EstimateGet(params) {
			return caller.Call('POST', 'backoffice/estimate/estimate/get', params, null)
		},
		// 견적상담관리_조회
		EstimateConsultGet(params) {
			return caller.Call('POST', 'backoffice/estimate/estconsult/get', params, null)
		},
		// 제품단가관리
		ProductPriceGet(params) {
			return caller.Call('POST', 'backoffice/estimate/pdunitprice/get', params, null)
		},
		ProductPricePost(params) {
			return caller.Call('POST', 'backoffice/estimate/pdunitprice/post', params, null, 'form')
		},
		ProductPricePut(params) {
			return caller.Call('POST', 'backoffice/estimate/pdunitprice/put', params, null, 'form')
		},
		ProductPriceDel(params) {
			return caller.Call('POST', 'backoffice/estimate/pdunitprice/delete', params, null)
		},
		// 견적단가관리
		EstimatePriceGet(params) {
			return caller.Call('POST', 'backoffice/estimate/estunitprice/get', params, null)
		},
		EstimatePricePost(params) {
			return caller.Call('POST', 'backoffice/estimate/estunitprice/post', params, null, 'form')
		},
		EstimatePricePut(params) {
			return caller.Call('POST', 'backoffice/estimate/estunitprice/put', params, null, 'form')
		},
		EstimatePriceDel(params) {
			return caller.Call('POST', 'backoffice/estimate/estunitprice/delete', params, null)
		},
		// 전용면적_조회 - with home
		ExclusiveAreaGet() {
			return caller.Call('GET', 'backoffice/estimate/estunitprice/area/get', null, null)
		},
		// 방면적관리
		RoomAreaGet(params) {
			return caller.Call('POST', 'backoffice/estimate/roomarea/get', params, null)
		},
		RoomAreaPost(params) {
			return caller.Call('POST', 'backoffice/estimate/roomarea/post', params, null, 'form')
		},
		RoomAreaPut(params) {
			return caller.Call('POST', 'backoffice/estimate/roomarea/put', params, null, 'form')
		},
		RoomAreaDel(params) {
			return caller.Call('POST', 'backoffice/estimate/roomarea/delete', params, null)
		},
		// 방 갯수_조회 - with home
		RoomCountGet() {
			return caller.Call('GET', 'backoffice/estimate/roomarea/roomcount/get', null, null)
		},
		// 견적 브랜드 list - with home
		EstimateBrandGet() {
			return caller.Call('GET', 'backoffice/estimate/pdunitprice/brand/get', null, null)
		},
		// 견적 제품 list - with home
		EstimateProductGet() {
			return caller.Call('GET', 'backoffice/estimate/pdunitprice/goods/get', null, null)
		},
	},
	// 마케팅
	// marketing
	marketing: {
		// 이벤트
		// event
		EventDetailGet(query) {
			return caller.Call('GET', 'backoffice/marketing/event/contents/get', null, query)
		},
		EventGet(params) {
			return caller.Call('POST', 'backoffice/marketing/event/get', params, null)
		},
		EventPost(params) {
			return caller.Call('POST', 'backoffice/marketing/event/post', params, null, 'form')
		},
		EventPut(params) {
			return caller.Call('POST', 'backoffice/marketing/event/put', params, null, 'form')
		},
		EventDel(params) {
			return caller.Call('POST', 'backoffice/marketing/event/delete', params, null)
		},
		EventWinPost(params) {
			return caller.Call('POST', 'backoffice/marketing/participating/put', params, null, 'form')
		},
	},
	// 고객센터
	// custom
	custom: {
		// 특판문의
		// Special
		SpecialListGet(params) {
			return caller.Call('POST', 'backoffice/customers/specialsale/get', params, null)
		},
		// 품질보증
		// Quality
		QualityGet(params) {
			return caller.Call('POST', 'backoffice/customers/qa/get', params, null)
		},
		QualityPut(params) {
			return caller.Call('POST', 'backoffice/customers/qa/put', params, null, 'form')
		},
		QualityDel(params) {
			return caller.Call('POST', 'backoffice/customers/qa/delete', params, null)
		},
		// A/S || 1:1 문의
		// as
		AsGet(params) {
			return caller.Call('POST', 'backoffice/customers/as/get', params, null)
		},
		AsPut(params) {
			return caller.Call('POST', 'backoffice/customers/as/put', params, null, 'form')
		},
		AsDel(params) {
			return caller.Call('POST', 'backoffice/customers/as/delete', params, null)
		},
		// 동화소식
		// notice
		NoticeDetailGet(query) {
			return caller.Call('GET', 'backoffice/customers/notice/contents/get', null, query)
		},
		NoticeGet(params) {
			return caller.Call('POST', 'backoffice/customers/notice/get', params, null)
		},
		NoticePost(params) {
			return caller.Call('POST', 'backoffice/customers/notice/post', params, null, 'form')
		},
		NoticePut(params) {
			return caller.Call('POST', 'backoffice/customers/notice/put', params, null, 'form')
		},
		NoticeDel(params) {
			return caller.Call('POST', 'backoffice/customers/notice/delete', params, null)
		},
		// 인테리어점 문의
		// interior question
		InteriorQuestionGet(params) {
			return caller.Call('POST', 'backoffice/customers/interior/get', params, null)
		},
		InteriorQuestionPut(params) {
			return caller.Call('POST', 'backoffice/customers/interior/put', params, null, 'form')
		},
		InteriorQuestionDel(params) {
			return caller.Call('POST', 'backoffice/customers/interior/delete', params, null)
		},
	},
	// 회원관리
	// user
	user: {
		// 회원관리
		// user
		UserGet(params) {
			return caller.Call('POST', 'backoffice/members/member/get', params, null)
		},
		UserPut(params) {
			return caller.Call('POST', 'backoffice/members/member/put', params, null, 'form')
		},
		UserDel(params) {
			return caller.Call('POST', 'backoffice/members/member/delete', params, null)
		},
		// 인테리어 회원관리
		// interior
		InteriorGet(params) {
			return caller.Call('POST', 'backoffice/members/corporation/get', params, null)
		},
		InteriorCityGet() {
			return caller.Call('GET', 'backoffice/members/corporation/city/get', null, null)
		},
		InteriorPut(params) {
			return caller.Call('POST', 'backoffice/members/corporation/put', params, null, 'form')
		},
		InteriorDel(params) {
			return caller.Call('POST', 'backoffice/members/corporation/delete', params, null)
		},
		// 스크랩
		// scrap
		ScrapGet(params) {
			return caller.Call('POST', 'backoffice/members/scrap/get', params, null)
		},
	},
	// 관리자 관리
	// admin
	admin: {
		AdminUserGet(params) {
			return caller.Call('POST', 'backoffice/admin/get', params, null)
		},
		AdminUserPost(params) {
			return caller.Call('POST', 'backoffice/admin/post', params, null, 'form')
		},
		AdminUserPut(params) {
			return caller.Call('POST', 'backoffice/admin/put', params, null, 'form')
		},
		AdminUserDel(params) {
			return caller.Call('POST', 'backoffice/admin/delete', params, null)
		},
	},
}
