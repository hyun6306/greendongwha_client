<template>
	<v-app>
		<LayoutHomeDrawer v-model="model" />
		<LayoutHomeAppbar v-model="model" />
		<v-main class="user_layout">
			<router-view />
		</v-main>
		<CommonDialog
			:dialog="dialog.dialog"
			:title="dialog.title"
			:text="dialog.text"
			@close="closeDialog()"
		/>
		<CommonLoading v-if="loading" />
	</v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import localStorage from '@/utils/localStorage'

export default {
	name: 'User',
	data: () => ({
		model: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'APP_GET_DIALOG', 'APP_GET_LOADING']),
		loading() {
			return this.APP_GET_LOADING
		},
		dialog() {
			return !this.APP_GET_DIALOG ? { dialog: false, title: '', text: '' } : this.APP_GET_DIALOG
		},
	},
	async mounted() {
		if (this.AUTH_GET_USER_AUTH === 'GUEST') {
			if (localStorage.accessToken.get()) {
				await this.AUTH_ACT_GET_TOKEN('accessToken_confirm')
			} else {
				if (this.AUTH_GET_USER_AUTH === 'GUEST') {
					this.APP_MU_DIALOG({
						dialog: true,
						title: '마이페이지',
						text: '회원전용 페이지 입니다. 로그인 후 이용해 주세요.',
					})
					return this.$router.push('/login')
				}
			}
		}
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AUTH_ACT_GET_TOKEN']),
		closeDialog() {
			this.APP_MU_DIALOG(null)
		},
	},
}
</script>

<style scoped lang="scss">
.user_layout {
	margin-bottom: 5rem;
}
</style>
