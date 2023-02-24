<template>
	<v-select
		v-model="model"
		:items="items"
		:label="label"
		:class="className"
		:height="height"
		:disabled="disabled"
		:readonly="readonly"
		:item-value="
			item => {
				return item
			}
		"
		dense
		multiple
		outlined
		single-line
		hide-details
		@change="$emit('change', model)"
	>
	</v-select>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Select03',
	mixins: [model],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		label: {
			type: String,
			default: '',
		},
		className: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 40,
		},
		disabled: {},
		readonly: {},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {
		console.log('items', this.items)
	},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
:deep(.v-input__control) {
	max-width: 93px !important;
	border-radius: 5px !important;
}
:deep(.v-input__slot) {
	min-height: 32px !important;
	height: 32px !important;
}
:deep(.v-select__slot .v-label) {
	top: 6px;
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 13px !important;
	color: #262626;
}
:deep(.v-input__append-inner) {
	margin-top: 3px !important;
	padding-left: 5px;
}
:deep(.v-label--active) {
	transform: translateY(-20px) scale(0.7) !important;
}
.v-input {
	font-size: 0.9rem !important;
}
:deep(.v-select__selections) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 80%;
	display: contents !important;
}
</style>
