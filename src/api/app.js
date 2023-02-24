import { caller } from '@/api/caller'

export default {
	login: {
		// access token 확인
		AccessTokenComfirm(params) {
			return caller.Call('POST', 'common/auth/login/access/get', params, null)
		},
		// refresh token 확인
		refreshTokenComfirm(params) {
			return caller.Call('POST', 'common/auth/login/refresh/get', params, null)
		},
		// token 정보 확인
		Token() {
			return caller.Call('GET', 'common/auth/login/info/get', null, null)
		},
		// ld/password login
		User(params) {
			return caller.Call('POST', 'common/auth/login/get', params, null)
		},
		// sns login
		Sns(params) {
			return caller.Call('POST', 'common/auth/login/sns/get', params, null)
		},
	},
	signup: {
		// sns 회원가입
		sns(params) {
			return caller.Call('POST', 'common/auth/signup/member/sns/post', params, null, 'form')
		},
		// 일반회원 회원가입
		user(params) {
			return caller.Call('POST', 'common/auth/signup/member/post', params, null, 'form')
		},
		// 인테리어 회원 회원가입
		interior(params) {
			return caller.Call('POST', 'common/auth/signup/corporation/post', params, null, 'form')
		},
		check: {
			// id 중복 체크
			Id(params) {
				return caller.Call('POST', 'common/auth/signup/duplication/get', params, null)
			},
			// password 확인
			Password(params) {
				return caller.Call('POST', 'common/auth/login/checkpass/get', params, null)
			},
			// sms 본인확인 체크
			SmsNumber(params) {
				return caller.Call('POST', 'common/auth/signup/checksms/get', params, null)
			},
			// sms key 확인
			SmsNumberCheck(params) {
				return caller.Call('POST', 'common/auth/signup/authsms/get', params, null)
			},
			// 사업자번호 확인
			Interior(params) {
				return caller.Call('POST', 'common/auth/signup/checkcorp/get', params, null)
			},
			// 인테리어 상호명 중복 확인
			InteriorName(query) {
				return caller.Call('GET', 'common/auth/signup/corporation/get', null, query)
			},
		},
	},
	find: {
		// 비밀번호 초기화
		password(params) {
			return caller.Call('POST', 'common/auth/login/find/put', params, null)
		},
		// 아이디 찾기
		id(params) {
			return caller.Call('POST', 'common/auth/login/find/get', params, null)
		},
	},
	popup: {
		// 팝업 리스트
		list() {
			return caller.Call('GET', 'web/main/popup/get', null, null)
		},
	},
}
