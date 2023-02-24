<template>
	<v-overlay :value="overlay">
		<v-progress-circular
			indeterminate
			size="64"
		></v-progress-circular>
	</v-overlay>
</template>

<script>
export default {
	name: 'Loading',
	components: {},
	props: {
		time: {
			type: Number,
			default: 0,
		},
	},
	data: () => ({
		overlay: true,
	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		if (this.time > 0) this.timeStart()
	},
	methods: {
		timeStart() {
			this.overlay &&
				setTimeout(() => {
					this.overlay = false
				}, this.time)
		},
	},
}
</script>
