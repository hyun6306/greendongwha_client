<template>
	<v-checkbox
		v-model="model"
		:color="color"
		:label="label"
		:class="className"
	></v-checkbox>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Checkbox01',
	components: {},
	mixins: [model],
	props: {
		label: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: '',
		},
		className: {
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
<style scoped lang="scss">
:deep(.v-label) {
	font-family: 'NotoSansKR-Regular';
	font-size: 13px;
}
</style>
