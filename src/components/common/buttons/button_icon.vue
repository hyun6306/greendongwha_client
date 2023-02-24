<template>
	<v-btn
		text
		icon
		:size="size"
		:href="href"
		:to="to"
		:target="target"
		@click="$emit('click')"
	>
		<v-img
			eager
			:src="src"
		/>
	</v-btn>
</template>

<script>
export default {
	name: 'ButtonIcon',
	components: {},
	props: ['size', 'src', 'href', 'target', 'to'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
