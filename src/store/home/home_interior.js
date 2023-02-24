import apiAdmin from '@/api/admin'
import apiHome from '@/api/home'
import adminParse from '@/utils/parse/admin'
import mainParse from '@/utils/parse/home'
import router from '@/router'

export default {
	state: {
		// 견적관리
		estimate_exclusive_area: null, // 전용면적
		estimate_room_count: null, // 방 갯수
		estimate_brand: null, // 견적 brand
		estimate_product: null, // 견적 product
		estimate_simple_price: null, // 간편 견적

		// 인테리어점 선택
		interior_list: [], // 인테리어점 리스트
		select_interior: [], // 인테리어점
		select_price: null, // 심플견적 저장
		select_product: null, // 제품 저장

		// 동화쇼룸
		showRoom_list: [], // 동화 쇼룸 리스트
	},
	mutations: {
		// 간편 견적내기
		HOME_MU_INTERIOR_ESTIMATE_EXCLUSIVE_AREA(state, exclusive_area) {
			state.estimate_exclusive_area = exclusive_area
		},
		HOME_MU_INTERIOR_ESTIMATE_ROOM_COUNT(state, room_count) {
			state.estimate_room_count = room_count
		},
		HOME_MU_INTERIOR_ESTIMATE_BRAND(state, brand) {
			state.estimate_brand = brand
		},
		HOME_MU_INTERIOR_ESTIMATE_PRODUCT(state, product) {
			state.estimate_product = product
		},
		HOME_MU_INTERIOR_ESTIMATE_SIMPLE_PRICE(state, simple_price) {
			state.estimate_simple_price = simple_price
		},
		HOME_MU_INTERIOR_GET_INTERIOR_ITEMS(state, interior) {
			state.interior_list = interior
		},
		HOME_MU_INTERIOR_SELECT_INTERIOR(state, interior) {
			// 카카오 맵 푸쉬
			// window.interiorListOne
			if (typeof interior === 'string') {
				interior = state.interior_list.find(x => x.corporate_no === interior)
			}

			if (interior === null || !interior.corporate_no) return (state.select_interior = [])
			const check = state.select_interior.findIndex(x => x.corporate_no === interior.corporate_no)

			const deleteItem = () => {
				window.toastr.error(`${interior.business_name} 삭제.`, '인테리어점 삭제', { timeOut: 1000 })
				state.select_interior.splice(check, 1)
			}

			if (state.select_interior.length >= 3 && check === -1) {
				window.toastr.warning('인테리어점은 최대 3개까지 선택 가능합니다.', '인테리어점 추가', { timeOut: 2500 })
			} else if (interior.corporate_no === '1378102333') {
				// 동화자연마루 본사 체크
				window.toastr.warning('동화 자연마루 본사는 선택 할 수 없습니다.', '인테리어점 추가', { timeOut: 2500 })
			} else if (state.select_interior.length >= 3 && check !== -1) {
				deleteItem()
			} else {
				if (check === -1) {
					window.toastr.success(`${interior.business_name} 추가.`, '인테리어점 추가', { timeOut: 1000 })
					state.select_interior.push(interior)
				} else deleteItem()
			}
		},
		HOME_MU_INTERIOR_SELECT_PRICE(state, price) {
			state.select_price = price
		},
		HOME_MU_INTERIOR_SELECT_PRODUCT(state, product) {
			state.select_product = product
		},
		// 동화 쇼룸
		HOME_MU_INTERIOR_SHOW_ROOM(state, showRoom) {
			state.showRoom_list = showRoom
		},
	},
	actions: {
		// 카카오 맵 푸쉬 Mobile open link
		// window.interiorPushLink
		HOME_ACT_INTERIOR_PUSH_LINK(Null, link) {
			if (link) router.push(link).catch(e => console.log(e))
		},
		// 견적내기 Item Get - 면적 목록 가져오기
		async HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA({ commit }) {
			try {
				let res = await apiAdmin.estimate.ExclusiveAreaGet()
				const result = res == undefined || res == null ? [] : adminParse.estimate.exclusive_area.parser(res)
				commit('HOME_MU_INTERIOR_ESTIMATE_EXCLUSIVE_AREA', result)
				return result
			} catch (e) {
				console.log('admin.estimate.ExclusiveAreaGet', e)
			}
		},
		// 견적내기 Item Get - 방 개수 목록 가져오기
		async HOME_ACT_INTERIOR_ESTIMATE_ROOM_COUNT({ commit }) {
			try {
				let res = await apiAdmin.estimate.RoomCountGet()
				const result = res == undefined || res == null ? [] : adminParse.estimate.room_count.parser(res)
				commit('HOME_MU_INTERIOR_ESTIMATE_ROOM_COUNT', result)
				return res
			} catch (e) {
				console.log('admin.estimate.RoomCountGet', e)
			}
		},
		// 견적내기 Item Get - 브랜드 목록 가져오기
		async HOME_ACT_INTERIOR_ESTIMATE_BRAND({ commit }) {
			try {
				let res = await apiAdmin.estimate.EstimateBrandGet()
				const result = res == undefined || res == null ? [] : adminParse.estimate.brand.parser(res)
				commit('HOME_MU_INTERIOR_ESTIMATE_BRAND', result)
				return result
			} catch (e) {
				console.log('admin.estimate.EstimateBrandGet', e)
			}
		},
		// 견적내기 Item Get - 제품 목록 가져오기
		async HOME_ACT_INTERIOR_ESTIMATE_PRODUCT({ commit, getters }) {
			try {
				let res = await apiAdmin.estimate.EstimateProductGet()
				console.log('HOME_ACT_INTERIOR_ESTIMATE_PRODUCT', res)
				const checkList = getters.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS
				const result = res == undefined || res == null ? [] : adminParse.estimate.product.parser(res, checkList)
				commit('HOME_MU_INTERIOR_ESTIMATE_PRODUCT', result)
				return result
			} catch (e) {
				console.log('admin.estimate.EstimateProductGet', e)
			}
		},
		// 간편 견적내기
		async HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE({ commit }, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE', items)
				switch (items.method) {
					case 'get': // 간편 견적내기
						res = await apiHome.interior.EstimateSimplePriceGet(items.params)
						result = res == undefined || res == null ? [] : mainParse.interior.simple_price_parser(res)
						commit('HOME_MU_INTERIOR_ESTIMATE_SIMPLE_PRICE', result)
						break
					case 'post': // 간편 견적저장
						result = await apiHome.interior.EstimateSimplePricePost(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('home.interior.EstimateSimplePriceGet', e)
			}
		},

		// 인테리어점 조회 - 매장찾기
		async HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS({ commit }, params) {
			try {
				const res = await apiHome.interior.InteriorGet(params)
				const result = res == undefined || res == null ? [] : mainParse.interior.parser(res)
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS', result)
				commit('HOME_MU_INTERIOR_GET_INTERIOR_ITEMS', result)
				return result
			} catch (e) {
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS', e)
			}
		},
		// 전문가 집들이 조회 - 매장찾기
		async HOME_ACT_INTERIOR_GET_EXPERT_ITEMS({ commit }, query) {
			try {
				const res = await apiHome.interior.ExpertGet(query)
				const result = res == undefined || res == null ? [] : mainParse.interior.parser(res)
				console.log('HOME_ACT_INTERIOR_GET_EXPERT_ITEMS', result)
				return result
			} catch (e) {
				console.log('HOME_ACT_INTERIOR_GET_EXPERT_ITEMS', e)
			}
		},
		// 인테리어점 상세 조회
		async HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM({ commit }, query) {
			try {
				const res = await apiHome.interior.InteriorDetailGet(query)
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM', res)
				return res
			} catch (e) {
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM', e)
			}
		},
		// 인테리어점 상세 - 하단 전문가 집들이 조회
		async HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_EXPERT_ITEMS({ commit }, params) {
			try {
				const res = await apiHome.interior.InteriorDetailExpertGet(params)
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS', res)
				return res
			} catch (e) {
				console.log('HOME_ACT_INTERIOR_GET_INTERIOR_ITEMS', e)
			}
		},

		// 전시장 조회
		async HOME_ACT_INTERIOR_SHOW_ROOM({ commit }, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_INTERIOR_SHOW_ROOM', items)
				switch (items.method) {
					case 'list':
						res = await apiHome.interior.ShowRoomListGet(items.params)
						result = res == undefined || res == null ? [] : mainParse.interior.showRoom.list(res)
						commit('HOME_MU_INTERIOR_SHOW_ROOM', result)
						break
					case 'detail':
						result = await apiHome.interior.ShowRoomDetailGet(items.query)
						break
				}
				return result
			} catch (e) {
				console.log('home.interior.ShowRoomListGet', e)
			}
		},
	},
	getters: {
		// 견적관리
		HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA: state => state.estimate_exclusive_area,
		HOME_GET_INTERIOR_ESTIMATE_ROOM_COUNT: state => state.estimate_room_count,
		HOME_GET_INTERIOR_ESTIMATE_BRAND: state => state.estimate_brand,
		HOME_GET_INTERIOR_ESTIMATE_PRODUCT: state => state.estimate_product,
		HOME_GET_INTERIOR_ESTIMATE_SIMPLE_PRICE: state => state.estimate_simple_price,

		// 인테리어점 선택
		HOME_GET_INTERIOR_GET_INTERIOR_ITEMS: state => state.interior_list,
		HOME_GET_INTERIOR_SELECT_INTERIOR: state => state.select_interior,
		HOME_GET_INTERIOR_SELECT_PRICE: state => state.select_price,
		HOME_GET_INTERIOR_SELECT_PRODUCT: state => state.select_product,

		// 동화쇼룸
		HOME_GET_INTERIOR_SHOW_ROOM: state => state.showRoom_list,
	},
	modules: {},
}
