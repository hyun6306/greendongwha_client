<template>
	<v-app>
		<LayoutHomeAppbar
			v-model="model"
			@overlay="overlay = !overlay"
		/>
		<LayoutHomeOverlayMenu v-model="overlay" />
		<LayoutHomeDrawer v-model="model" />
		<v-main>
			<router-view />
		</v-main>
		<LayoutHomeFooter />
		<CommonDialog
			:dialog="dialog.dialog"
			:title="dialog.title"
			:text="dialog.text"
			@close="closeDialog()"
		/>
		<CommonSnackbar />
		<CommonLoading v-if="loading" />
	</v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Login',
	data: () => ({
		overlay: false,
		model: false,
	}),
	computed: {
		...mapGetters(['APP_GET_DIALOG', 'APP_GET_LOADING']),
		loading() {
			return this.APP_GET_LOADING
		},
		dialog() {
			return !this.APP_GET_DIALOG ? { dialog: false, title: '', text: '' } : this.APP_GET_DIALOG
		},
	},
	async created() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		closeDialog() {
			this.APP_MU_DIALOG(null)
		},
	},
}
</script>

<style scoped lang="scss"></style>
