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
						rule-name="password"
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
				</div>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'InteriorModify',
	data: () => ({
		password: null,
	}),
	computed: {
		allowCheck() {
			let check = true
			if (this.password !== null) check = false

			return check
		},
	},
	methods: {
		...mapActions(['AUTH_ACT_LOGIN']),
		async passwordCheck() {
			const params = {
				member_kind: this.tab === 0 ? 1 : 3,
				login_id: this[this.checkType].userId,
				password: this[this.checkType].password,
			}

			await this.AUTH_ACT_LOGIN(params).then(res => {
				console.log('res', res)
				return this.$router.push('/user/modifyInfo').catch(() => {})
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
