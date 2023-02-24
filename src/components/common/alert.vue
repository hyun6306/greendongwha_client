<template>
	<div
		v-if="APP_GET_ALERT"
		class="app_alert"
	>
		<v-col
			cols="12"
			md="6"
			class="app_alert_item"
		>
			<v-alert
				v-model="alertValue"
				color="grey darken-2"
				class="app_alert_item"
				transition="slide-x-transition"
			>
				<v-row align="center">
					<v-col class="grow">
						<p class="alert_title">{{ APP_GET_ALERT.title }}</p>
					</v-col>
					<v-col
						v-if="APP_GET_ALERT.action"
						class="shrink"
					>
						<v-btn
							text
							color="white"
							:to="APP_GET_ALERT.action.link"
						>
							{{ APP_GET_ALERT.action.name }}
						</v-btn>
					</v-col>
				</v-row>
			</v-alert>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'Alert',
	components: {},
	props: {},
	data: () => ({
		onAlert: false,
	}),
	computed: {
		...mapGetters(['APP_GET_ALERT']),
		alertValue() {
			return !this.APP_GET_ALERT ? false : true
		},
	},
	watch: {
		APP_GET_ALERT(value) {
			if (value != null && !this.onAlert) {
				console.log(value, 'test')
				this.resetAlert()
			}
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_ALERT']),
		resetAlert() {
			this.onAlert = true
			setTimeout(() => {
				this.onAlert = false
				this.APP_MU_ALERT(null)
			}, 3000)
		},
	},
}
</script>
<style scoped lang="scss">
.app_alert {
	width: 100%;
	position: fixed;
	bottom: 50px;
	&_item {
		margin: 0 auto;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
}
.alert_title {
	color: white;
	font-size: 1.3rem;
}
</style>
