<template>
	<v-app>
		<v-main>
			<router-view />
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
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Basic',
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE', 'APP_GET_LOADING', 'APP_GET_DIALOG']),
		loading() {
			return this.APP_GET_LOADING
		},
		dialog() {
			return !this.APP_GET_DIALOG ? { dialog: false, title: '', text: '' } : this.APP_GET_DIALOG
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		closeDialog() {
			this.APP_MU_DIALOG(null)
		},
	},
}
</script>
