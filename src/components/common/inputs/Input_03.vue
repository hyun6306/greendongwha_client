<template>
	<v-text-field
		v-model="model"
		:label="label"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readonly"
		:class="className"
		:height="height"
		:type="type"
		:append-icon="inputCheck ? 'check' : ''"
		inner
		dense
		outlined
		hide-details
		@keydown.enter="$emit('update')"
	></v-text-field>
</template>

<script>
import model from '@/mixins/model'
// import { debounce } from 'debounce'

export default {
	name: 'Input03',
	components: {},
	mixins: [model],
	props: {
		label: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		disabled: {},
		readonly: {},
		inputCheck: {},
		className: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 40,
		},
		type: {
			type: String,
			default: '',
		},
	},
	data: () => ({}),
	computed: {},
	watch: {
		// model: debounce(function (val) {
		// 	console.log(val)
		// 	if (val) this.$emit('update')
		// }, 1000),
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}
:deep(.v-text-field__slot) {
	input {
		font-size: 15px !important;
		line-height: 2rem !important;
	}
}
:deep(.v-label) {
	top: 12px !important;
	color: $color_gray2;
}
:deep(.v-label--active) {
	transform: translateY(-20px) scale(0.7) !important;
}

// 인테리어점 찾기
.v-text-field.map {
	border: none !important;
	height: 40px !important;
	font-size: $font_normal !important;
	background-color: #fff !important;
	:deep(.v-input__slot) {
		min-height: 40px !important;
		height: 40px !important;
	}
	:deep(.v-input__slot fieldset) {
		border: none !important;
	}
	:deep(.v-text-field__slot input) {
		&::placeholder {
			color: #b1b1b1 !important;
			font-size: $font_normal !important;
		}
		color: $color_primary !important;
		font-size: $font_normal !important;
	}
}
</style>
