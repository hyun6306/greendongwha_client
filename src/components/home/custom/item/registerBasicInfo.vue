<template>
	<v-row
		class="ma-0"
		align="center"
	>
		<v-col
			class="pa-0 py-2 th"
			cols="3"
			sm="2"
			align="start"
			>{{ title }}</v-col
		>
		<v-col
			class="pa-0 py-2 td"
			cols="9"
			sm="10"
			align="start"
			align-self="center"
		>
			<p
				v-if="text"
				v-html="text"
			></p>
			<span v-else>정보가 없습니다.</span>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'CustomRegisterBasicInfo',
	components: {},
	props: ['title', 'text'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
