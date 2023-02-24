export default {
	computed: {
		model: {
			set(value) {
				this.$emit('input', value)
			},
			get() {
				return this.$attrs.value
			},
		},
	},
}
