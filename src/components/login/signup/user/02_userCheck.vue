<template>
	<div>
		<p class="pb-4">회원가입 방식을 선택해주세요.</p>
		<v-col
			cols="7"
			class="pa-0 pb-3"
		>
			<CommonButtonsButton01
				name="일반회원가입"
				color="#42883d"
				height="40"
				class-name="regular font_14 edge_5 mb-3"
				@click="onNext"
			/>
		</v-col>

		<v-divider class="pb-5" />

		<!-- 버튼(SNS계정 회원가입) -->
		<v-col
			cols="12"
			class="pa-0"
			align-self="center"
		>
			<p class="pb-2">SNS 연동 가입</p>
			<v-btn
				v-for="(icon, i) in common_social_icon_menu"
				:key="i"
				class="mx-1"
				icon
				large
			>
				<CommonButtonsButtonIcon
					:src="icon.src"
					size="42"
					@click="snsGetInfo(icon.type)"
				/>
			</v-btn>
			<div
				id="naverIdLogin"
				style="display: none"
			></div>
		</v-col>
		<v-col class="pa-0">
			<CommonButtonsButton02
				name="로그인 페이지로 이동 >"
				height="50"
				class-name="btn_more mt-3"
				color="#222"
				text
				@click="$router.push('/login')"
			/>
		</v-col>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import oauth_kakao from '@/mixins/oauth/kakao'
import oauth_naver from '@/mixins/oauth/naver'
import oauth_google from '@/mixins/oauth/google'

export default {
	name: 'LoginSignupUserUserCheck02',
	mixins: [model, common, oauth_kakao, oauth_naver, oauth_google],
	props: ['token'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		if (this.token) this.nextStep(this.token, 2)
	},
	methods: {
		...mapMutations(['AUTH_MU_EVENT_INFO', 'AUTH_MU_SIGNUP_SNS_INFO']),
		allowAll() {
			let val = true
			if (this.allValue) val = false

			Object.keys(this.allow).forEach(element => {
				this.allow[element] = val
			})
		},
		async snsGetInfo(type) {
			console.log('login icon', type)
			let token
			let email
			let code

			switch (type) {
				case 'kakao':
					// this.oauth_kakao_out()
					const accessToken = await new Promise(resolve => this.oauth_kakao_login(resolve))
					const userInfo = await new Promise(resolve => this.oauth_kakao_userInfo(resolve))
					token = accessToken.access_token
					email = userInfo.kakao_account.email
					code = 1
					break
				case 'naver':
					this.$cookies.set('loginNaver', 'naver')
					const btnNaver = document.getElementById('naverIdLogin').firstChild
					btnNaver.click()
					code = 2
					break
				case 'google':
					await this.oauth_google_handleClickSignIn().then(res => {
						email = res.Ju.zv
						token = res.wc.access_token
						code = 3
					})
					break
			}

			if (code !== 2) {
				if (!code && !email && !token)
					return this.$toastr.error(
						'SNS 로그인 정보가 올바르지 않습니다. 다시 시도해 주시기 바랍니다.',
						'SNS연결 오류',
						{ timeOut: 2500 },
					)
				this.nextStep(token, code)
			}
		},
		onNext() {
			this.model = 2
			this.$emit('submit')
		},
		nextStep(token, code) {
			const item = {
				token: token,
				code: code,
			}
			if (code === 2) {
				console.log(this.$cookies.get('signupAllowCookie'))
				this.AUTH_MU_EVENT_INFO(this.$cookies.get('signupAllowCookie'))
				this.$cookies.remove('signupAllowCookie')
			}

			this.AUTH_MU_SIGNUP_SNS_INFO(item)
			this.model = 2
			this.$emit('submit')
		},
	},
}
</script>

<style scoped lang="scss"></style>
