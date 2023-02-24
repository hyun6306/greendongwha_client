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
					<h2 class="content_title">비밀번호 찾기 완료</h2>
				</v-col>

				<v-col
					cols="12"
					class="pa-0"
				>
					<v-col
						cols="12"
						class="pa-0"
					>
						<div class="msg_box mb-3">
							<strong>고객님의 핸드폰</strong> 으로<br />
							새로운 비밀번호를 전송하였습니다.<br />
							확인 후 로그인 해주시기 바랍니다.
						</div>
					</v-col>

					<v-col
						cols="12"
						class="mb-2"
					>
						<p class="notice">전송된 비밀번호는 로그인 후 마이페이지의 ‘회원정보수정’에서 변경이 가능합니다.</p>
					</v-col>

					<v-col class="px-0">
						<CommonButtonsButton01
							name="로그인 하기"
							color="#00582c"
							height="50"
							class-name="bold font_16 mb-2"
							rounded
							@click="$router.replace('/login')"
						/>
						<!--						<CommonButtonsButton01-->
						<!--							name="임시 비밀번호 발급"-->
						<!--							color="#00582c"-->
						<!--							height="50"-->
						<!--							className="bold font_16"-->
						<!--							rounded-->
						<!--							outlined-->
						<!--						/>-->
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'LoginAnswerPassword',
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_FIND_PASSWORD']),
	},
	methods: {
		...mapMutations(['AUTH_MU_FIND_PASSWORD']),
	},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
.notice {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 12px !important;
	color: #5f6061 !important;
	word-break: keep-all;
}
</style>
