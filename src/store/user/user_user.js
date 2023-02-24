import apiUser from '@/api/user'
import userParse from '@/utils/parse/user'

export default {
	state: {
		scrapItems: [],
		estimateItems: [],
		estimateSelectItem: {},
		qualityItems: [],
		qualitySelectItem: {},
		asItems: [],
		asSelectItem: {},
		questionItems: [],
		questionSelectItem: {},
	},
	mutations: {
		USER_MU_SCRAP(state, scrapItems) {
			state.scrapItems = scrapItems
		},
		USER_MU_ESTIMATE(state, estimateItems) {
			state.estimateItems = estimateItems
		},
		USER_MU_ESTIMATE_SELECT(state, estimateItem) {
			state.estimateSelectItem = estimateItem
		},
		USER_MU_QUALITY(state, qualityItems) {
			state.qualityItems = qualityItems
		},
		USER_MU_QUALITY_SELECT(state, qualitySelectItem) {
			state.qualitySelectItem = qualitySelectItem
		},
		USER_MU_AS(state, asItems) {
			state.asItems = asItems
		},
		USER_MU_AS_SELECT(state, asSelectItem) {
			state.asSelectItem = asSelectItem
		},
		USER_MU_QUESTION(state, questionItems) {
			state.questionItems = questionItems
		},
		USER_MU_QUESTION_SELECT(state, questionSelectItem) {
			state.questionSelectItem = questionSelectItem
		},
	},
	actions: {
		// 스크랩
		async USER_ACT_SCRAP({ commit, dispatch, getters }, items) {
			try {
				let result
				const reCallGetListItems = {
					method: 'getList',
					params: {
						login_id: getters.AUTH_GET_USER.login_id,
						mypage_yn: 'Y',
					},
				}

				switch (items.method) {
					case 'getList':
						await apiUser.user.scrap.ScrapListGet(items.params).then(res => {
							result = res == undefined || res == null ? [] : userParse.scrap.parser(res)
							console.log('USER_ACT_SCRAP_get', result)
							commit('USER_MU_SCRAP', result)
						})
						break
					case 'getCount':
						await apiUser.user.scrap.ScrapCountGet(items.params).then(res => {
							console.log('USER_ACT_SCRAP_getCount', res)
							result = res
						})
						break
					case 'post':
						await apiUser.user.scrap.ScrapPost(items.params).then(res => {
							console.log('USER_ACT_SCRAP_post', res)
							if (res !== undefined) {
								dispatch('USER_ACT_SCRAP', reCallGetListItems)
							}
							result = res
						})
						break
					case 'del':
						await apiUser.user.scrap.ScrapDel(items.params).then(res => {
							console.log('USER_ACT_SCRAP_del', res)
							if (res !== undefined) {
								dispatch('USER_ACT_SCRAP', reCallGetListItems)
							}
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('user.scrap.Scrap', e)
			}
		},
		// 견적상담
		async USER_ACT_ESTIMATE({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.user.estimate.EstimateDetailGet(items.query).then(res => {
							console.log('USER_ACT_ESTIMATE_detail', res)
							result = res
						})
						break
					case 'get':
						await apiUser.user.estimate.EstimateGet(items.params).then(res => {
							console.log('USER_ACT_ESTIMATE_get', res)
							result = res == undefined || res == null ? [] : userParse.estimate.parser(res)
							commit('USER_MU_ESTIMATE', result)
						})
						break
					case 'del':
						await apiUser.user.estimate.EstimateDel(items.params).then(res => {
							console.log('USER_ACT_ESTIMATE_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('user.estimate.Estimate', e)
			}
		},
		// 품질등록
		async USER_ACT_QUALITY({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.user.quality.QualityDetailGet(items.query).then(res => {
							console.log('USER_ACT_QUALITY_detail', res)
							result = res
						})
						break
					case 'get':
						await apiUser.user.quality.QualityGet(items.params).then(res => {
							console.log('USER_ACT_QUALITY_get', res)
							result = res == undefined || res == null ? [] : userParse.quality.parser(res)
							commit('USER_MU_QUALITY', result)
						})
						break
					case 'post':
						await apiUser.user.quality.QualityPost(items.params).then(res => {
							console.log('USER_ACT_QUALITY_post', res)
							result = res
						})
						break
					case 'put':
						await apiUser.user.quality.QualityPut(items.params).then(res => {
							console.log('USER_ACT_QUALITY_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.user.quality.QualityDel(items.params).then(res => {
							console.log('USER_ACT_QUALITY_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('user.quality.Quality', e)
			}
		},
		// A/S
		async USER_ACT_AS({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.user.as.AsDetailGet(items.query).then(res => {
							console.log('USER_ACT_AS_detail', res)
							result = res
						})
						break
					case 'get':
						await apiUser.user.as.AsGet(items.params).then(res => {
							console.log('USER_ACT_AS_get', res)
							result = res == undefined || res == null ? [] : userParse.as.parser(res)
							commit('USER_MU_AS', result)
						})
						break
					case 'post':
						await apiUser.user.as.AsPost(items.params).then(res => {
							console.log('USER_ACT_AS_post', res)
							result = res
						})
						break
					case 'put':
						await apiUser.user.as.AsPut(items.params).then(res => {
							console.log('USER_ACT_AS_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.user.as.AsDel(items.params).then(res => {
							console.log('USER_ACT_AS_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('user.quality.Quality', e)
			}
		},
		// 1:1 문의
		async USER_ACT_QUESTION({ commit }, items) {
			try {
				let result
				switch (items.method) {
					case 'detail':
						await apiUser.user.question.QuestionDetailGet(items.query).then(res => {
							console.log('USER_ACT_QUESTION_detail', res)
							result = res
						})
						break
					case 'get':
						await apiUser.user.question.QuestionGet(items.params).then(res => {
							console.log('USER_ACT_QUESTION_get', res)
							result = res == undefined || res == null ? [] : userParse.as.parser(res)
							commit('USER_MU_QUESTION', result)
						})
						break
					case 'post':
						await apiUser.user.question.QuestionPost(items.params).then(res => {
							console.log('USER_ACT_QUESTION_post', res)
							result = res
						})
						break
					case 'put':
						await apiUser.user.question.QuestionPut(items.params).then(res => {
							console.log('USER_ACT_QUESTION_put', res)
							result = res
						})
						break
					case 'del':
						await apiUser.user.question.QuestionDel(items.params).then(res => {
							console.log('USER_ACT_QUESTION_del', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('user.quality.Quality', e)
			}
		},
		// 회원 정보 수정
		async USER_ACT_USER_INFO_MODIFY({ dispatch }, items) {
			try {
				let result

				switch (items.method) {
					case 'user':
						await apiUser.user.modify.user(items.params).then(res => {
							console.log('USER_ACT_USER_INFO_MODIFY_user', res)
							if (res !== undefined) {
								dispatch('AUTH_ACT_GET_TOKEN', 'getInfo')
							}
							result = res
						})
						break
					case 'interior':
						await apiUser.user.modify.interior(items.params).then(res => {
							console.log('USER_ACT_USER_INFO_MODIFY_interior', res)
							if (res !== undefined) {
								dispatch('AUTH_ACT_GET_TOKEN', 'getInfo')
							}
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('app.user.modify.user', e)
			}
		},
		// 회원 탈퇴
		async USER_ACT_USER_SECESSTION(Null, items) {
			try {
				let result

				switch (items.method) {
					case 'user':
						await apiUser.user.secession.user(items.params).then(res => {
							console.log('USER_ACT_USER_SECESSTION_user', res)
							result = res
						})
						break
					case 'interior':
						await apiUser.user.secession.interior(items.params).then(res => {
							console.log('USER_ACT_USER_SECESSTION_interior', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('app.user.modify.user', e)
			}
		},
	},
	getters: {
		USER_GET_SCRAP: state => state.scrapItems,
		USER_GET_ESTIMATE: state => state.estimateItems,
		USER_GET_ESTIMATE_SELECT: state => state.estimateSelectItem,
		USER_GET_QUALITY: state => state.qualityItems,
		USER_GET_QUALITY_SELECT: state => state.qualitySelectItem,
		USER_GET_AS: state => state.asItems,
		USER_GET_AS_SELECT: state => state.asSelectItem,
		USER_GET_QUESTION: state => state.questionItems,
		USER_GET_QUESTION_SELECT: state => state.questionSelectItem,
	},
	modules: {},
}
