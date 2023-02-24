<template>
	<v-container
		fill-height
		class="pa-0"
	>
		<v-row
			align="start"
			justify="center"
			class="ma-0"
		>
			<v-col
				cols="12"
				align="center"
			>
				<v-card
					elevation="0"
					class="pa-0"
					@keyup.enter="onApiCallLogin"
				>
					<v-col
						cols="12"
						sm="8"
						md="6"
						lg="4"
						xl="3"
						class="pa-0 mx-0 mx-sm-5"
					>
						<h2 class="content_title mt-10 mb-3">Green Dongwha</h2>
						<h2 class="content_text mt-3 mb-5">Administer</h2>
						<v-col
							cols="11"
							sm="8"
							md="11"
							class="pa-0 pb-5 px-sm-3"
						>
							<CommonInputsInput01
								v-model="form.userId"
								label="아이디"
							/>
							<CommonInputsInput01
								v-model="form.password"
								type="password"
								label="비밀번호"
							/>
						</v-col>
						<v-col
							cols="11"
							sm="8"
							md="11"
							class="pa-0"
						>
							<CommonButtonsButton01
								name="로그인"
								color="olive"
								height="50"
								class-name="fw_bold font_16"
								rounded
								:disabled="!allowValue"
								@click="onApiCallLogin"
							/>
						</v-col>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import localStorage from '@/utils/localStorage'

const devMode = process.env.NODE_ENV === 'development'

export default {
	name: 'AdminLogin',
	data: () => ({
		form: {
			userId: '',
			password: '',
		},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_AUTH']),
		allowValue() {
			return Object.keys(this.form).every(item => this.form[item] !== '')
		},
	},
	async created() {
		// if(localStorage.xAccessToken.get()) {
		//     await this.AUTH_ACT_GET_TOKEN('admin_accessToken_confirm').then((res) => {
		//         if(res === 'GetAdminUser') this.$router.push('/admin').catch(() => {})
		//     })
		// }
	},
	mounted() {
		if (devMode) this.devAddInfo()
	},
	methods: {
		...mapMutations(['APP_MU_LOADING']),
		...mapActions(['AUTH_ACT_LOGIN', 'AUTH_ACT_GET_TOKEN']),
		async onApiCallLogin() {
			this.APP_MU_LOADING(true)
			await this.AUTH_ACT_LOGIN({
				member_kind: 2,
				login_id: this.form.userId,
				password: this.form.password,
			})
				.then(() => {
					this.APP_MU_LOADING(false)
					console.log('onApiCallLogin', this.AUTH_GET_ADMIN_AUTH)
					if (this.AUTH_GET_ADMIN_AUTH === 'ADMIN') return this.$router.push('/admin').catch(() => {})
					this.$toastr.error('아이디와 비밀번호를 다시 한번 확인해주세요.', '로그인 오류', { timeOut: 2500 })
				})
				.catch(() => {
					this.APP_MU_LOADING(false)
				})
		},
		devAddInfo() {
			this.form = {
				userId: 'online',
				password: 'test1234',
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	&_title {
		font-family: 'NotoSansKR-Bold';
		font-size: 3rem;
		color: $color-primary;
	}
	&_text {
		font-family: 'NotoSansKR-light';
		font-size: 1.5rem;
	}
}
</style>
