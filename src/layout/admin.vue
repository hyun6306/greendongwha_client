<template>
	<v-app>
		<LayoutAdminDrawer v-model="model" />
		<LayoutAdminAppbar v-model="model" />
		<v-main class="contents_bg">
			<div class="wrap_contents">
				<router-view />
			</div>
		</v-main>
		<CommonLoading v-if="loading" />
		<CommonDialog
			:dialog="dialog.dialog"
			:title="dialog.title"
			:text="dialog.text"
			@close="closeDialog()"
		/>
		<CommonAlert />
		<CommonSnackbar />
	</v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import localStorage from '@/utils/localStorage'

export default {
	name: 'Admin',
	data: () => ({
		model: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_AUTH', 'APP_GET_LOADING', 'APP_GET_DIALOG']),
		loading() {
			return this.APP_GET_LOADING
		},
		dialog() {
			return !this.APP_GET_DIALOG ? { dialog: false, title: '', text: '' } : this.APP_GET_DIALOG
		},
	},
	async created() {
		if (localStorage.xAccessToken.get()) {
			this.APP_MU_LOADING(true)
			await this.AUTH_ACT_GET_TOKEN('admin_accessToken_confirm').then(() => {
				// console.log('AUTH_GET_ADMIN_AUTH', this.AUTH_GET_ADMIN_AUTH)
				this.APP_MU_LOADING(false)
				if (this.AUTH_GET_ADMIN_AUTH === 'GUEST') {
					this.loginFail()
				}
			})
		}
		this.ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL()
	},
	mounted() {
		if (this.AUTH_GET_ADMIN_AUTH === 'GUEST') {
			this.loginFail()
		}
	},
	methods: {
		...mapMutations(['APP_MU_LOADING', 'APP_MU_DIALOG']),
		...mapActions(['AUTH_ACT_GET_TOKEN', 'ADMIN_ACT_PRODUCT_CATEGORY_ITEMS_ALL']),
		closeDialog() {
			this.APP_MU_DIALOG(null)
		},
		loginFail() {
			this.$router.push('/master/login').catch(() => {})
			return this.$toastr.error('로그인이 필요합니다.', '로그인 오류', { timeOut: 2500 })
		},
	},
}
</script>
<style scoped lang="scss">
.contents_bg {
	background-color: #f8f8f8 !important;
	width: 100% !important;
	float: left !important;
}
.wrap_contents {
	margin: 0 auto;
	max-width: 1800px;
}
</style>
