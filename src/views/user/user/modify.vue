<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<div class="modify_wrapper">
				<p class="title mb-1">회원정보 수정</p>
				<p class="desc mb-8">고객님의 정보보호를 위해 비밀번호를 다시 한번 입력해주세요.</p>

				<div class="px-3">
					<CommonInputsInput04
						v-model="password"
						type="password"
						placeholder="비밀번호를 입력해주세요."
						class="mb-3"
					/>

					<CommonButtonsButton02
						:disabled="allowCheck"
						name="확인"
						color="#44883d"
						class-name="btn_basic"
						rounded
						@click="passwordCheck"
					/>

					<!--<v-divider class="mt-8 mb-4"/>

					<p class="notice mb-4">
						카카오톡으로 로그인하신 고객님께서는<br>
						다시 한번 로그인 인증 해주시기 바랍니다.
					</p>

					<div class="btn_login">
						<v-col class="pa-0 mb-1">
							<v-btn class="kakao">
								<v-img
									eager
									width="42"
									height="42"
									:src="require('@/assets/img/login/icon_kakao.png')"/>
								카카오로 인증
							</v-btn>
						</v-col>
						<v-col class="pa-0 mb-1">
							<v-btn class="naver">
								<v-img
									eager
									width="42"
									height="42"
									:src="require('@/assets/img/login/icon_naver.png')"/>
								네이버로 인증
							</v-btn>
						</v-col>
						<v-col class="pa-0">
							<v-btn class="google">
								<v-img
									eager
									width="42"
									height="42"
									:src="require('@/assets/img/login/icon_google.png')"/>
								구글로 인증
							</v-btn>
						</v-col>
					</div>-->
				</div>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'UserModify',
	data: () => ({
		password: null,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		allowCheck() {
			let check = true
			if (this.password !== null) check = false

			return check
		},
	},
	created() {
		if (this.AUTH_GET_USER.sns_kind !== '0') {
			this.$router.push('/user/modifyInfo').catch(() => {})
		}
	},
	methods: {
		...mapActions(['AUTH_ACT_SIGN_UP_CHECK']),
		async passwordCheck() {
			const params = {
				password: this.password,
			}

			const items = { method: 'user_password', params: params }

			await this.AUTH_ACT_SIGN_UP_CHECK(items).then(res => {
				console.log('res', res)
				if (res) this.$router.push('/user/modifyInfo').catch(() => {})
				else this.$toastr.error('회원님의 비밀번호와 일치하지 않습니다.', '비밀번호 오류', { timeOut: 2500 })
			})
		},
	},
}
</script>

<style scoped lang="scss">
.modify_wrapper {
	max-width: 370px !important;
	margin-top: 140px !important;

	.title {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 20px !important;
		color: #262626;
	}
	.desc {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		color: #5f6062;
	}
	.notice {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 13px !important;
		color: #262626;
	}

	.btn_basic {
		width: 100% !important;
	}
	.btn_login {
		.v-btn {
			width: 100%;
			height: 50px;
			box-shadow: none;
			border-radius: 0;
			:deep(.v-image__image--cover) {
				background-size: inherit;
			}
			:deep(.v-btn__content) {
				width: 133px;
				flex: initial;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 16px !important;
				text-align: left;
			}
		}
		.kakao {
			background-color: #ffdc00 !important;
		}
		.naver {
			background-color: #31b249 !important;
			color: #fff !important;
		}
		.google {
			background-color: #dd4931 !important;
			color: #fff !important;
		}
	}
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
}
@media all and (max-width: 380px) {
}
</style>
