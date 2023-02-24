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
					<h2 class="content_title">아이디 찾기 완료</h2>
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
							회원님의 이메일(아이디)는<br />
							<strong>{{ AUTH_GET_FIND_ID }}</strong> 입니다
						</div>
					</v-col>
					<v-col class="px-0">
						<CommonButtonsButton01
							name="로그인 하기"
							color="#00582c"
							height="50"
							class-name="bold font_16"
							rounded
							@click="$router.replace('/login')"
						/>
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'LoginAnswerId',
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_FIND_ID']),
	},
	destroyed() {
		this.AUTH_MU_FIND_ID(null)
	},
	methods: {
		...mapMutations(['AUTH_MU_FIND_ID']),
	},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
</style>
