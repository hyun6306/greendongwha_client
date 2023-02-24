<template>
	<v-tooltip
		v-if="tooltip"
		top
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				icon
				v-bind="attrs"
				x-small
				v-on="on"
			>
				<v-icon color="grey">mdi-help-circle-outline</v-icon>
			</v-btn>
		</template>
		<span align="center">{{ tooltip }}</span>
	</v-tooltip>
</template>

<script>
export default {
	name: 'Tooltip',
	props: {
		tooltip: {
			type: String,
			default: '',
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
