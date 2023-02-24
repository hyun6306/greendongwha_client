import apiHome from '@/api/home'
import mainParse from '@/utils/parse/home'

export default {
	state: {
		custom_notice: [],
		custom_interior_notice: [],
	},
	mutations: {
		HOME_MU_CUSTOM_NOTICE(state, custom_notice) {
			state.custom_notice = custom_notice
		},
		HOME_MU_CUSTOM_INTERIOR_NOTICE(state, custom_interior_notice) {
			state.custom_interior_notice = custom_interior_notice
		},
	},
	actions: {
		// 동화소식
		async HOME_ACT_CUSTOM_NOTICE({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiHome.custom.NoticeDetailGet(items.query).then(res => {
							console.log('HOME_ACT_CUSTOM_NOTICE_detail', res)
							result = res == undefined || res == null ? [] : res
						})
						break
					case 'get':
						await apiHome.custom.NoticeGet(items.params).then(res => {
							console.log('HOME_ACT_CUSTOM_NOTICE_get', res)
							// 일반 공지사항
							if (items.params.notice_kind === '0') {
								result = res == undefined || res == null ? [] : mainParse.custom.notice.parser(res)
								commit('HOME_MU_CUSTOM_NOTICE', result)
							}
							// 인테리어 공지
							else if (items.params.notice_kind === '3') {
								result = res == undefined || res == null ? [] : mainParse.custom.interiorNotice.parser(res)
								commit('HOME_MU_CUSTOM_INTERIOR_NOTICE', result)
							}
						})
						break
				}

				return result
			} catch (e) {
				console.log('home.custom.Notice', e)
			}
		},
	},
	getters: {
		// notice
		HOME_GET_CUSTOM_NOTICE: state => state.custom_notice,
		HOME_GET_CUSTOM_INTERIOR_NOTICE: state => state.custom_interior_notice,
	},
	modules: {},
}
