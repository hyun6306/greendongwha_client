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
					<h2 class="content_title">인테리어점 회원가입</h2>
				</v-col>

				<v-col
					cols="12"
					class="pa-0"
				>
					<!-- step(회원가입) -->
					<CommonTabsTab01
						v-model="tab"
						:tab-items="tabItems"
						class="mb-3"
					/>

					<v-col class-name="pa-0">
						<v-tabs-items v-model="tab">
							<!-- step01 (약관동의) -->
							<v-tab-item>
								<LoginSignup01Allow v-model="allowTab" />
							</v-tab-item>

							<!-- step02 (가입하기) -->
							<v-tab-item>
								<LoginSignupInterior02StoreInfo v-model="allowTab" />
							</v-tab-item>

							<!-- step03 (정보입력) -->
							<v-tab-item>
								<LoginSignupInterior03UserInfo v-model="allowTab" />
							</v-tab-item>

							<!-- step04 (가입완료) -->
							<v-tab-item>
								<LoginSignup04Success
									v-model="allowTab"
									:store="true"
								/>
							</v-tab-item>
						</v-tabs-items>
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: 'LoginSignUpStore',
	metaInfo: {
		title: '인테리어 회원가입 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '인테리어 회원가입 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 인테리어 회원가입',
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	data: () => ({
		tab: 0,
		tabItems: [
			{ number: '01', text: '약관동의' },
			{ number: '02', text: '사업자 정보' },
			{ number: '03', text: '담당자 정보' },
			{ number: '04', text: '정보확인' },
		],
		allowTab: 0,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
		checkTab() {
			return this.tab === this.allowTab
		},
	},
	watch: {
		tab() {
			if (!this.checkTab) {
				this.APP_MU_SNACKBAR({
					title: '동의가 필요합니다.',
				})
				setTimeout(() => (this.tab = this.allowTab), 10)
			}
		},
		allowTab(val) {
			this.tab = val
		},
	},
	created() {
		if (this.AUTH_GET_USER_AUTH !== 'GUEST') this.$router.go(-1)
	},
	methods: {
		...mapMutations(['APP_MU_SNACKBAR']),
	},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
</style>
