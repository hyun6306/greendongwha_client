import apiHome from '@/api/home'
import mainParse from '@/utils/parse/home'
// import userParse from '@/utils/userParse'

export default {
	state: {
		// community
		community_knowhowItems: [],
		community_knowhow_code: [],
		community_knowhow_popItems: [],
		community_eventItems: [],
		community_maruTvItems: [],
		community_maruTvMainItem: null,
		community_instagramItems: [],
	},
	mutations: {
		// community
		HOME_MU_COMMUNITY_KNOW_HOW(state, items) {
			state.community_knowhowItems = items
		},
		HOME_MU_COMMUNITY_KNOW_HOW_CODE(state, items) {
			state.community_knowhow_code = items.reduce((acc, cur) => {
				acc.push({
					value: cur.code,
					title: cur.code_name,
				})
				return acc
			}, [])
		},
		HOME_MU_COMMUNITY_KNOW_HOW_POP_ITEMS(state, items) {
			state.community_knowhow_popItems = items
		},
		HOME_MU_COMMUNITY_EVENT(state, items) {
			state.community_eventItems = items
		},
		HOME_MU_COMMUNITY_MARU_TV_ITEMS(state, items) {
			state.community_maruTvItems = items
		},
		HOME_MU_COMMUNITY_MARU_TV_MAIN_ITEM(state, items) {
			state.community_maruTvMainItem = items.find(x => x.main_yn === 'Y')
		},
		HOME_MU_COMMUNITY_INSTAGRAM_ITEMS(state, items) {
			state.community_instagramItems = items
		},
	},
	actions: {
		// community
		// 노하우
		async HOME_ACT_COMMUNITY_KNOW_HOW({ commit }, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_COMMUNITY_KNOW_HOW', items.method)
				switch (items.method) {
					case 'detail':
						result = await apiHome.community.KnowHowDetailGet(items.query)
						break
					case 'getList':
						res = await apiHome.community.KnowHowGet()
						result = res == undefined || res == null ? [] : mainParse.community.knowhow.parser(res)
						commit('HOME_MU_COMMUNITY_KNOW_HOW', result)
						break
					case 'knowhow-pop':
						res = await apiHome.community.KnowHowPopGet()
						result = res == undefined || res == null ? [] : mainParse.community.knowhow.pop(res)
						commit('HOME_MU_COMMUNITY_KNOW_HOW_POP_ITEMS', result)
						break
				}
				return result
			} catch (e) {
				console.log('main.community.knowHowGet', e)
			}
		},

		// 이벤트
		async HOME_ACT_COMMUNITY_EVENT({ commit }, items) {
			let res
			let result
			try {
				console.log('HOME_ACT_COMMUNITY_EVENT', items)
				switch (items.method) {
					case 'detail':
						result = await apiHome.community.EventDetailGet(items.query)
						break
					case 'getList':
						res = await apiHome.community.EventGet(items.params)
						result = res == undefined || res == null ? [] : mainParse.community.event.parser(res)
						commit('HOME_MU_COMMUNITY_EVENT', result)
						break
					case 'getWin':
						result = await apiHome.community.EventWinGet()
						break
					case 'post':
						result = await apiHome.community.EventPost(items.params)
						break
				}
				return result
			} catch (e) {
				console.log('main.community.eventGet', e)
			}
		},

		// 마루잘알TV
		async HOME_ACT_COMMUNITY_MARU_TV({ commit }) {
			try {
				const res = await apiHome.community.MaruTvGet()
				commit('HOME_MU_COMMUNITY_MARU_TV_ITEMS', res)
				commit('HOME_MU_COMMUNITY_MARU_TV_MAIN_ITEM', res)
			} catch (e) {
				console.log(e)
			}
		},
		// 인스타그램
		async HOME_ACT_COMMUNITY_INSTAGRAM({ commit }) {
			try {
				const res = await apiHome.community.InstagramGet()
				commit('HOME_MU_COMMUNITY_INSTAGRAM_ITEMS', res)
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		// community
		HOME_GET_COMMUNITY_KNOW_HOW: state => state.community_knowhowItems,
		HOME_GET_COMMUNITY_KNOW_HOW_CODE: state => state.community_knowhow_code,
		HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS: state => state.community_knowhow_popItems,
		HOME_GET_COMMUNITY_EVENT: state => state.community_eventItems,
		HOME_GET_COMMUNITY_MARU_TV_ITEMS: state => state.community_maruTvItems,
		HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM: state => state.community_maruTvMainItem,
		HOME_GET_COMMUNITY_INSTAGRAM_ITEMS: state => state.community_instagramItems,
	},
	modules: {},
}
