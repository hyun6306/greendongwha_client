<template>
	<v-col
		cols="12"
		class="pa-0 click_signupUser_button"
	>
		<div class="welcome_text">
			<span class="pb-2 color_olive">WELCOME</span>
			<h3 class="pb-8">환영합니다!</h3>

			<p
				v-if="!store"
				class="pb-12"
			>
				동화자연마루에 오신 것을 환영합니다.<br />
				로그인 페이지로 이동하시어<br />
				로그인 진행 부탁 드립니다.
			</p>
			<div v-else>
				<p class="pb-12">
					동화자연마루에 오신 것을 환영합니다.<br />
					가입 승인 절차가 진행 중입니다.<br />
					가입완료 후 고객님이 작성주신 이메일과 휴대폰번호로<br />
					승인안내 결과가 공지됩니다.<br />
					<span>(영업일 기준 약 1~3일이 소요될 수 있습니다.)</span>
				</p>
			</div>
		</div>
		<CommonButtonsButton01
			name="로그인 페이지로 이동"
			color="#42883d"
			height="50"
			class-name="font_16 bold"
			rounded
			@click="goLogin"
		/>
	</v-col>
</template>

<script>
import common from '@/mixins/common'
import ad_kakao from '@/mixins/ad/kakao'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'LoginSignupSuccess04',
	mixins: [common, ad_kakao, ad_mobion],
	props: ['store'],
	data: () => ({
		type: 'user',
	}),
	computed: {},
	watch: {
		common_recentlyRouterPath(val) {
			if (val.includes('signupStore')) this.type = 'store'
		},
	},
	mounted() {},
	destroyed() {
		if (this.$cookies.get('loginNaver')) this.$cookies.remove('loginNaver')
	},
	methods: {
		goLogin() {
			if (this.store) {
				// 인테리어 회원
				// google analytics
				window.gtag('event', 'click_signupStore_button', { button_location: 'login_signupStore' })
			} else {
				// 일반 회원
				// google analytics
				window.gtag('event', 'click_signupUser_button', { button_location: 'login_signupUser' })
				// ad_kakao click
				this.ad_kakao_clickScript(null, 'click_signupUser_button')
				// ad_mobion click
				this.ad_mobion_click_convertion('click_signupUser_button')
			}

			const naverLogin = this.$cookies.get('loginNaver') === 'naver'

			if (naverLogin) {
				this.$router.push('/login')
			} else {
				this.$router.go(-1)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.welcome_text {
	span {
		font-family: 'Roboto-Bold' !important;
		font-size: 14px !important;
		color: #42883d;
	}
	h3 {
		font-family: 'NotoSansKR-Light' !important;
		font-size: 30px !important;
		font-weight: 100 !important;
		color: #262626;
	}
	p {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		color: #262626;
	}
}
</style>
