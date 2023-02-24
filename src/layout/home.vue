<template>
	<v-app>
		<LayoutHomeFloatMenu v-if="showFloatMenu" />
		<LayoutHomeDrawer v-model="model" />
		<LayoutHomeAppbar v-model="model" />
		<!--<LayoutHomeOverlayMenu v-model="overlay" />-->
		<v-main>
			<router-view class="home_main" />
		</v-main>
		<LayoutHomeFooter />
		<CommonLoading v-if="loading" />
		<CommonDialog
			:dialog="dialog.dialog"
			:title="dialog.title"
			:text="dialog.text"
			@close="closeDialog()"
		/>
		<CommonAlert />
		<CommonSnackbar />

		<!-- popup -->
		<div v-if="popupItems.length && checkPopup">
			<CommonDialogAppDialog
				:dialog="popupDialog"
				:items="popupItems"
				@close="popupDialog = false"
			/>
		</div>

		<v-btn
			v-show="floatingTopButton"
			color="primary"
			dark
			fixed
			bottom
			right
			fab
			class="mb-5"
			@click="common_scrollToTop"
		>
			<v-icon>mdi-chevron-up</v-icon>
		</v-btn>
	</v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import geolocation from '@/mixins/geolocation'
import localStorage from '@/utils/localStorage'

export default {
	name: 'Home',
	components: {},
	mixins: [common, geolocation],
	data: () => ({
		overlay: false,
		model: false,
		popupDialog: false,
	}),
	computed: {
		...mapGetters([
			'APP_GET_POPUP',
			'APP_GET_APP_STATE',
			'APP_GET_LOADING',
			'APP_GET_DIALOG',
			'APP_GET_PAGE_LOAD',
			'APP_GET_ISLOADPOPUP',
		]),
		loading() {
			return this.APP_GET_LOADING
		},
		dialog() {
			return !this.APP_GET_DIALOG ? { dialog: false, title: '', text: '' } : this.APP_GET_DIALOG
		},
		floatingTopButton() {
			let check = true

			if (this.APP_GET_APP_STATE === 'web') {
				// web페이지일 경우
				check = false
			} else {
				// path check _ hideList의 목록이 포함된 path인 경우
				const hideList = ['coohome', 'store', 'inquire']
				for (let i of hideList) {
					if (this.common_recentlyRouterPath.includes(i)) check = false
				}
			}

			return check
		},
		showFloatMenu() {
			return !this.common_recentlyRouterPath.includes('coohome')
		},
		popupItems() {
			console.log(this.APP_GET_POPUP, this.common_recentlyRouterPath, this.$route.path)
			return this.APP_GET_POPUP?.filter(x => x.location === this.$route.path) || []
		},
		checkPopup() {
			if (this.APP_GET_POPUP.length) {
				if (this.popupItems.length) {
					return this.$cookies.get(this.common_recentlyRouterPath) !== 'false'
				}
			}
			return false
		},
	},
	watch: {
		popupItems(val) {
			if (val.length) this.popupDialog = true
		},
	},
	async created() {
		if (localStorage.accessToken.get()) await this.AUTH_ACT_GET_TOKEN('accessToken_confirm')
		if (!this.APP_GET_ISLOADPOPUP) await this.APP_ACT_POPUP()
	},
	mounted() {
		// this.geolocation_once()
		if (this.popupItems.length) this.popupDialog = true
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AUTH_ACT_GET_TOKEN', 'APP_ACT_POPUP']),
		closeDialog() {
			this.APP_MU_DIALOG(null)
		},
	},
}
</script>
<style scoped lang="scss">
.home_main {
	padding-bottom: 50px !important;
}
</style>
