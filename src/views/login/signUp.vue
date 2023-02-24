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
					<h2 class="content_title">
						회원가입 유형
						<p class="sub_title">고객님께 해당하는 유형을 선택해 주세요.</p>
					</h2>
				</v-col>

				<v-col
					class="pa-0 pt-11"
					cols="12"
				>
					<v-row class="ma-0">
						<v-col
							cols="6"
							class="pa-0"
						>
							<div class="mr-3">
								<v-col
									class="pa-0 btn_join join_user"
									@click="$router.replace('/login/signupUser')"
								>
									<v-img
										width="56"
										:src="require('@/assets/img/icon/icon_join_user.svg')"
										eager
										class="my-10"
									/>
									<p class="tit mb-2">일반회원</p>
									<p class="notice mb-6">14세 이상 개인</p>
								</v-col>
							</div>
						</v-col>

						<v-col
							cols="6"
							class="pa-0"
						>
							<div class="ml-3">
								<v-col
									class="pa-0 btn_join join_interior"
									@click="$router.replace('/login/signupStore')"
								>
									<v-img
										width="56"
										:src="require('@/assets/img/icon/icon_join_interior.svg')"
										eager
										class="my-10 join_interior"
									/>
									<p class="tit mb-2">인테리어점 회원</p>
									<p class="notice mb-6">사업자</p>
								</v-col>
							</div>
						</v-col>
					</v-row>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'LoginSignUp',
	metaInfo: {
		title: '회원가입 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '회원가입 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 회원가입',
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	data: () => ({}),
	watch: {},
	methods: {},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
.btn_join {
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 10px;

	.tit {
		font-family: 'NotoSansKR-Bold';
		font-size: 16px;
		color: #262626;
	}
	.notice {
		font-family: 'NotoSansKR-Regular';
		font-size: 14px;
		color: #9d9d9d;
	}
}

.btn_join:hover {
	border: 1px solid #42883d;
	.v-image {
		color: #42883d;
	}
	.tit {
		color: #42883d;
	}
}
</style>
