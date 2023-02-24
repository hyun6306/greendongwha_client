import apiApp from '@/api/app'
import localStorage from '@/utils/localStorage'

const RemoveUserToken = () => {
	localStorage.accessToken.del()
	localStorage.refreshToken.del()
}
const RemoveAdminUserToken = () => {
	localStorage.xAccessToken.del()
	localStorage.xRefreshToken.del()
}

export default {
	state: {
		user_auth: 'GUEST',
		user: {},
		admin_auth: 'GUEST',
		admin_user: {},
		signup_snsInfo: {},
		signup_event: {
			sms: false,
			email: false,
		},
		signup_interior: {},
		find_id: null,
		find_password: null,
	},
	mutations: {
		AUTH_MU_USER(state, user) {
			state.user = user
		},
		AUTH_MU_ADMIN_USER(state, user) {
			state.admin_user = user
		},
		AUTH_MU_USER_AUTH(state, auth) {
			switch (auth) {
				case '1':
					state.user_auth = 'USER'
					break
				case '2':
					state.admin_auth = 'ADMIN'
					break
				case '3':
					state.user_auth = 'AGENCY'
					break
				default:
					state.user_auth = 'GUEST'
					state.admin_auth = 'GUEST'
					break
			}
		},
		// sns 로그인 및 회원가입
		AUTH_MU_SIGNUP_SNS_INFO(state, item) {
			state.signup_snsInfo = item
		},
		// 이벤트 수신동의 내용
		AUTH_MU_EVENT_INFO(state, item) {
			state.signup_event.sms = item.sms
			state.signup_event.email = item.email
		},
		// 회원가입 인테리어 정보
		AUTH_MU_SIGNUP_INTERIOR_INFO(state, item) {
			state.signup_interior = item
		},
		// 로그아웃
		AUTH_MU_LOGOUT(state) {
			state.user = {}
			state.user_auth = 'GUEST'
		},
		// admin 로그아웃
		AUTH_MU_ADMIN_LOGOUT(state) {
			state.admin_user = {}
			state.admin_auth = 'GUEST'
		},
		// id찾기 임시저장
		AUTH_MU_FIND_ID(state, id) {
			state.find_id = id
		},
		// 비밀번호 임시저장
		AUTH_MU_FIND_PASSWORD(state, password) {
			state.find_password = password
		},
	},
	actions: {
		// 토큰 및 user정보 가져오기
		async AUTH_ACT_GET_TOKEN({ commit, dispatch }, method) {
			try {
				let params
				let state = 'Success'

				const GetRefereshToken = async type => {
					// refresh token이 없는경우
					if (type === 'admin') {
						if (localStorage.xRefreshToken.get() === null || localStorage.xRefreshToken.get() === undefined) {
							RemoveAdminUserToken()
							return (state = 'Start')
						}
						params = { refreshToken: localStorage.xRefreshToken.get() }
					} else {
						if (localStorage.refreshToken.get() === null || localStorage.refreshToken.get() === undefined) {
							RemoveUserToken()
							return (state = 'Start')
						}
						params = { refreshToken: localStorage.refreshToken.get() }
					}

					await apiApp.login.refreshTokenComfirm(params).then(async res => {
						console.log('refreshToken_confirm', res)

						// Token Data를 가져오지 못한경우
						if (res === undefined || res === null) {
							if (type === 'admin') RemoveAdminUserToken()
							else RemoveUserToken()

							return (state = 'Fail')
						}

						if (type === 'admin') {
							// 새로운 accessToken 저장
							localStorage.xAccessToken.del()
							localStorage.xAccessToken.set(res.accessToken)
							// token 정보 가져오기
							await dispatch('AUTH_ACT_GET_TOKEN', 'getAdminInfo').then(() => {
								state = 'GetAdminUser'
							})
						} else {
							// 새로운 accessToken 저장
							localStorage.accessToken.del()
							localStorage.accessToken.set(res.accessToken)
							// token 정보 가져오기
							await dispatch('AUTH_ACT_GET_TOKEN', 'getInfo').then(() => {
								state = 'GetUser'
							})
						}
					})

					return state
				}

				switch (method) {
					// 일반회원
					case 'accessToken_confirm':
						// Access token이 없는경우
						if (localStorage.accessToken.get() === null || localStorage.accessToken.get() === undefined) {
							return GetRefereshToken()
						} else {
							params = { accessToken: localStorage.accessToken.get() }
							await apiApp.login.AccessTokenComfirm(params).then(async res => {
								console.log('accessToken_confirm', res)
								// Token Data를 가져오지 못한경우
								if (res == undefined || res == null) {
									// Refresh token으로 Access token받아오기 시도
									state = GetRefereshToken()
								} else {
									// token 정보 가져오기
									await dispatch('AUTH_ACT_GET_TOKEN', 'getInfo').then(() => {
										state = 'GetUser'
									})
								}
							})
						}
						break
					case 'getInfo':
						await apiApp.login.Token().then(res => {
							console.log('getInfo', res)
							if (res === undefined || res === null) {
								RemoveUserToken()
								state = 'Fail'
							} else {
								commit('AUTH_MU_USER', res)
								commit('AUTH_MU_USER_AUTH', res.member_kind)

								if (res.member_kind === '1') {
									// user scrap정보 호출
									dispatch('USER_ACT_SCRAP', {
										method: 'getList',
										params: {
											login_id: res.login_id,
											mypage_yn: 'Y',
										},
									})
								}
							}
						})
						break
					// 관리자
					case 'admin_accessToken_confirm':
						// Access token이 없는경우
						if (localStorage.xAccessToken.get() === null || localStorage.xAccessToken.get() === undefined) {
							return GetRefereshToken('admin')
						} else {
							params = { accessToken: localStorage.xAccessToken.get() }
							await apiApp.login.AccessTokenComfirm(params).then(async res => {
								console.log('admin_accessToken_confirm', res)
								// Token Data를 가져오지 못한경우
								if (res == undefined || res == null) {
									// Refresh token으로 Access token받아오기 시도
									state = GetRefereshToken('admin')
								} else {
									// token 정보 가져오기
									await dispatch('AUTH_ACT_GET_TOKEN', 'getAdminInfo').then(() => {
										state = 'GetAdminUser'
									})
								}
							})
						}
						break
					case 'getAdminInfo':
						await apiApp.login.Token().then(res => {
							console.log('getAdminInfo', res)
							if (res === undefined || res === null) {
								RemoveAdminUserToken()
								state = 'Fail'
							} else {
								commit('AUTH_MU_ADMIN_USER', res)
								commit('AUTH_MU_USER_AUTH', res.member_kind)
							}
						})
						break
				}
				console.log('accessToken_confirm', state)
				return state
			} catch (e) {
				console.log('app.login.token', e)
			}
		},
		// 로그인
		async AUTH_ACT_LOGIN({ dispatch }, params) {
			try {
				await apiApp.login.User(params).then(res => {
					if (res === undefined || res === null) return 'Fail'
					console.log('AUTH_ACT_LOGIN', res, params)
					if (params.member_kind === 2) {
						// 관리자 로그인
						RemoveAdminUserToken()
						if (res) {
							localStorage.xAccessToken.set(res.accessToken)
							localStorage.xRefreshToken.set(res.refreshToken)
						}
						return dispatch('AUTH_ACT_GET_TOKEN', 'getAdminInfo')
					} else {
						// 일반 로그인
						RemoveUserToken()
						if (res) {
							localStorage.accessToken.set(res.accessToken)
							localStorage.refreshToken.set(res.refreshToken)
						}
						return dispatch('AUTH_ACT_GET_TOKEN', 'getInfo')
					}
				})
			} catch (e) {
				console.log('app.login.User', e)
			}
		},
		// SNS 로그인
		async AUTH_ACT_SNS_LOGIN({ dispatch }, params) {
			try {
				await apiApp.login.Sns(params).then(res => {
					if (res === undefined || res === null) return 'Fail'
					console.log('AUTH_ACT_SNS_LOGIN', res, params)

					// 일반 로그인
					RemoveUserToken()
					if (res) {
						localStorage.accessToken.set(res.accessToken)
						localStorage.refreshToken.set(res.refreshToken)
					}
					return dispatch('AUTH_ACT_GET_TOKEN', 'getInfo')
				})
			} catch (e) {
				console.log('app.login.Sns', e)
			}
		},
		// 회원가입 체크
		async AUTH_ACT_SIGN_UP_CHECK(Null, items) {
			try {
				let result

				switch (items.method) {
					case 'user_id':
						await apiApp.signup.check.Id(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_user_id', res)
							result = res
						})
						break
					case 'user_password':
						await apiApp.signup.check.Password(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_user_password', res)
							result = res
						})
						break
					case 'sns_post':
						await apiApp.signup.check.SmsNumber(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_sns', res)
							result = res
						})
						break
					case 'sns_check':
						await apiApp.signup.check.SmsNumberCheck(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_interior_name', res)
							result = res
						})
						break
					case 'interior':
						await apiApp.signup.check.Interior(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_interior', res)
							result = res
						})
						break
					case 'interior_name':
						await apiApp.signup.check.InteriorName(items.query).then(res => {
							console.log('AUTH_ACT_SIGN_UP_CHECK_interior_name', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('app.login.GetUser', e)
			}
		},
		// 회원가입
		async AUTH_ACT_SIGN_UP(Null, items) {
			try {
				let result

				switch (items.method) {
					case 'sns':
						await apiApp.signup.sns(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP', res)
							result = res
						})
						break
					case 'user':
						await apiApp.signup.user(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP', res)
							result = res
						})
						break
					case 'interior':
						await apiApp.signup.interior(items.params).then(res => {
							console.log('AUTH_ACT_SIGN_UP', res)
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('app.login.GetUser', e)
			}
		},
		// 회원 정보 찾기
		async AUTH_ACT_FIND_INFO({ commit }, items) {
			try {
				let result

				switch (items.method) {
					case 'password':
						await apiApp.find.password(items.params).then(res => {
							console.log('AUTH_ACT_FIND_INFO_password', res)
							if (res !== undefined) {
								commit('AUTH_MU_FIND_PASSWORD', res)
								res = true
							}
							result = res
						})
						break
					case 'id':
						await apiApp.find.id(items.params).then(res => {
							console.log('AUTH_ACT_FIND_INFO_id', res)
							if (res !== undefined) {
								commit('AUTH_MU_FIND_ID', res)
								res = true
							}
							result = res
						})
						break
				}

				return result
			} catch (e) {
				console.log('app.login.GetUser', e)
			}
		},
		// 회원 로그 아웃
		AUTH_ACT_LOGOUT({ commit }) {
			RemoveUserToken()
			commit('AUTH_MU_LOGOUT')
			commit('USER_MU_SCRAP', {})
		},
		// 관리자 로그 아웃
		AUTH_ACT_ADMIN_LOGOUT({ commit }) {
			RemoveAdminUserToken()
			commit('AUTH_MU_ADMIN_LOGOUT')
		},
	},
	getters: {
		AUTH_GET_USER_AUTH: state => state.user_auth,
		AUTH_GET_USER: state => state.user,
		AUTH_GET_ADMIN_AUTH: state => state.admin_auth,
		AUTH_GET_SIGNUP_SNS_INFO: state => state.signup_snsInfo,
		AUTH_GET_ADMIN_USER: state => state.admin_user,
		AUTH_GET_EVENT_INFO: state => state.signup_event,
		AUTH_GET_SIGNUP_INTERIOR_INFO: state => state.signup_interior,
		AUTH_GET_FIND_ID: state => state.find_id,
		AUTH_GET_FIND_PASSWORD: state => state.find_password,
	},
	modules: {},
}
