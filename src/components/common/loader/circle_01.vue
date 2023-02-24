<template>
	<v-col
		cols="12"
		align="center"
	>
		<v-progress-circular
			indeterminate
			size="64"
			:color="color"
		/>
		<v-col class="pt-5">
			<span class="title">LOADING..</span><br />
			잠시만 기다려주세요.
		</v-col>
	</v-col>
</template>

<script>
export default {
	name: 'CircleLoader01',
	components: {},
	props: {
		time: {
			type: Number,
			default: 0,
		},
		color: {
			type: String,
			default: 'primary',
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
<style scoped lang="scss">
.title {
	font-size: 1.8rem;
	font-weight: bold;
	color: $color_olive;
}
</style>
