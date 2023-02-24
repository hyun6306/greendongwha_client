<template>
	<div class="wrapper">
		<v-container
			class="pa-0 px-5"
			fluid
		>
			<v-col
				cols="12"
				align="center"
				class="login layout_align pa-0"
			>
				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<h2 class="content_title">로그인</h2>
				</v-col>

				<v-col
					cols="12"
					class="pa-0"
				>
					<!-- 일반회원 or 인테리어점회원 선택 -->
					<v-col
						cols="12"
						class="pa-0"
					>
						<CommonTabsTabLogin
							v-model="tab"
							:tab-items="tabItems"
							class="mb-6"
						/>
					</v-col>

					<v-col
						cols="12"
						class="pa-0"
						@keyup.enter="onApiCallLogin"
					>
						<v-tabs-items v-model="tab">
							<!-- 로그인(일반회원) -->
							<v-tab-item class="pt-2">
								<CommonInputsInput05
									v-model="user.userId"
									label="이메일(아이디)"
									class="mb-4"
								/>
								<CommonInputsInput05
									v-model="user.password"
									type="password"
									label="비밀번호"
									class="mb-5"
								/>
							</v-tab-item>

							<!-- 로그인(인테리어점) -->
							<v-tab-item class="pt-2">
								<CommonInputsInput05
									v-model="interior.userId"
									label="인테리어 ID"
									class="mb-4"
								/>
								<CommonInputsInput05
									v-model="interior.password"
									type="password"
									label="Password"
									class="mb-5"
								/>
							</v-tab-item>
						</v-tabs-items>
					</v-col>

					<!-- 버튼(로그인하기) -->
					<v-col class="pa-0">
						<CommonButtonsButton01
							:disabled="!allowValue"
							name="로그인"
							color="#00582c"
							height="50"
							class-name="bold font_16 font_white"
							@click="onApiCallLogin"
						/>
					</v-col>

					<!-- 체크박스(아이디저장 선택) -->
					<v-row class="ma-0">
						<v-col
							cols="6"
							class="pa-0 pt-2"
						>
							<CommonCheckboxsCheckbox02
								v-model="idSaveCheckbox"
								text="이메일(아이디) 저장"
							/>
						</v-col>
						<v-col
							cols="6"
							class="pa-0 pt-2"
							align="end"
						>
							<v-btn
								class="pa-0"
								text
								align="end"
								@click="$router.replace(`/login/find_info/${tab}`)"
							>
								아이디/비밀번호 찾기
							</v-btn>
						</v-col>
					</v-row>

					<!-- 버튼(SNS계정 로그인) -->
					<v-col
						v-if="tab === 0"
						cols="12"
						class="pa-0 pt-12 sns_join"
						align-self="center"
					>
						<p>SNS 계정으로 로그인</p>
						<v-row
							class="ma-0"
							justify="center"
						>
							<v-col
								v-for="(icon, i) in common_social_icon_menu"
								:key="i"
								cols="2"
							>
								<CommonButtonsButtonIcon
									:src="icon.src"
									size="42"
									@click="snsLogin(icon.type)"
								/>
							</v-col>
						</v-row>
					</v-col>
					<div
						id="naverIdLogin"
						style="display: none"
					></div>

					<v-col class="pa-0 pt-7 pb-5">
						<v-divider />
					</v-col>

					<v-row class="ma-0">
						<v-col
							class="pa-0"
							cols="8"
							align="start"
							align-self="center"
						>
							아직회원이 아니신가요?
						</v-col>
						<v-col
							class="pa-0"
							cols="4"
							align-self="center"
						>
							<CommonButtonsButton01
								name="회원가입"
								color="#ccc"
								class-name="btn_join regular font_14"
								height="42"
								outlined
								@click="$router.replace(`/login/signup`)"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import common from '@/mixins/common'
import oauth_kakao from '@/mixins/oauth/kakao'
import oauth_naver from '@/mixins/oauth/naver'
import oauth_google from '@/mixins/oauth/google'

const devMode = process.env.NODE_ENV === 'development'

export default {
	name: 'LoginMain',
	metaInfo: {
		title: '로그인 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '로그인 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 로그인',
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common, oauth_kakao, oauth_naver, oauth_google],
	data: () => ({
		tab: 0,
		tabItems: [
			{
				name: '일반 회원',
				icon: 'icon_join_user',
			},
			{
				name: '인테리어점 회원',
				icon: 'icon_join_interior',
			},
		],
		idSaveCheckbox: false,
		user: {
			userId: '',
			password: '',
		},
		interior: {
			userId: '',
			password: '',
		},
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
		checkType() {
			let check = 'user'
			if (this.tab === 1) check = 'interior'
			return check
		},
		allowValue() {
			return Object.keys(this[this.checkType]).every(item => this[this.checkType][item] !== '')
		},
		naver_code() {
			return this.oauth_naver_getUrlParams(this.$route.hash)
		},
	},
	watch: {
		AUTH_GET_USER_AUTH() {
			const naverLogin = this.$cookies.get('loginNaver') === 'naver'
			this.checkAuth(naverLogin)
		},
	},
	async created() {
		const tokenLogin = await this.AUTH_ACT_GET_TOKEN('accessToken_confirm')
		console.log('tokenLogin', tokenLogin)
		if (tokenLogin === 'Success') this.checkAuth()
	},
	mounted() {
		console.log('this.$router.history', this.$router)
		console.log('this.$router.history', this.naver_code)

		if (this.naver_code?.access_token) {
			this.onApiSnsLogin(this.naver_code.access_token, 2)
		}

		if (this.$cookies.get('emailCookie')) {
			this.user.userId = this.$cookies.get('emailCookie')
			this.interior.userId = this.$cookies.get('emailCookie')
		}
		if (this.$cookies.get('emailCheckValue')) {
			this.idSaveCheckbox = this.$cookies.get('emailCheckValue') === 'false' ? false : true
		}

		// if(devMode) this.devAddInfo()
	},
	methods: {
		...mapMutations(['APP_MU_LOADING']),
		...mapActions(['AUTH_ACT_GET_TOKEN', 'AUTH_ACT_SNS_LOGIN', 'AUTH_ACT_LOGIN']),
		async onApiCallLogin() {
			this.APP_MU_LOADING(true)
			const params = {
				member_kind: this.tab === 0 ? 1 : 3,
				login_id: this[this.checkType].userId.trim(),
				password: this[this.checkType].password.trim(),
			}

			await this.AUTH_ACT_LOGIN(params)
				.then(res => {
					console.log('res', res)
					if (this.idSaveCheckbox) {
						this.$cookies.set('emailCookie', this[this.checkType].userId)
					} else {
						this.$cookies.remove('emailCookie')
					}

					this.$cookies.set('emailCheckValue', this.idSaveCheckbox)

					this.APP_MU_LOADING(false)
				})
				.catch(() => {
					this.APP_MU_LOADING(false)
				})
		},
		checkAuth(naverLogin) {
			this.$cookies.remove('loginNaver')

			if (this.AUTH_GET_USER_AUTH === 'GUEST') {
				return this.$toastr.error('아이디와 비밀번호를 다시 한번 확인해주세요.', '로그인 오류', { timeOut: 2500 })
			} else {
				if (naverLogin) {
					// return this.$router.go(-2)
					return this.$router.push('/user')
				}

				// if(this.AUTH_GET_USER_AUTH === 'USER') return this.$router.replace('/user').catch(() => {})
				// if(this.AUTH_GET_USER_AUTH === 'AGENCY') return this.$router.replace('/').catch(() => {})
				this.$router.go(-1)
			}
		},
		async snsLogin(type) {
			console.log('login icon', type)
			let token
			let email
			let code
			let accessToken
			let userInfo
			let btnNaver

			switch (type) {
				case 'kakao':
					// this.oauth_kakao_out()
					accessToken = await new Promise(resolve => this.oauth_kakao_login(resolve))
					userInfo = await new Promise(resolve => this.oauth_kakao_userInfo(resolve))
					token = accessToken.access_token
					email = userInfo.kakao_account.email
					code = 1
					break
				case 'naver':
					this.$cookies.set('loginNaver', 'naver')
					btnNaver = document.getElementById('naverIdLogin').firstChild
					btnNaver.click()
					code = 2
					break
				case 'google':
					await this.oauth_google_handleClickSignIn()
						.then(res => {
							email = res.Ru.Hv
							token = res.xc.access_token
							code = 3
						})
						.catch(() => {})
					break
			}

			// console.log('token', token)
			// console.log('email', email)
			// console.log('code', code)

			if (code !== 2) {
				if (email && token) this.onApiSnsLogin(token, code)
				else this.$toastr.error('해당 사이트에서 관련정보를 받아오지 못하였습니다.', '소셜로그인 실패', { timeOut: 1000 })
			}
		},
		async onApiSnsLogin(token, code) {
			const params = {
				sns_kind: code,
				sns_token: token,
			}

			await this.AUTH_ACT_SNS_LOGIN(params)
				.then(res => {
					console.log('res', res)
					this.APP_MU_LOADING(false)
				})
				.catch(() => {
					this.APP_MU_LOADING(false)
					this.$router.push('/login')
				})
		},
		devAddInfo() {
			this.user = {
				userId: 'test4@gmail.com',
				password: 'test1234!',
			}
			this.interior = {
				userId: 'test@test.com',
				password: 'test1234!',
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
.btn_join {
	:deep(.v-btn__content span) {
		color: #262626 !important;
	}
}
</style>
