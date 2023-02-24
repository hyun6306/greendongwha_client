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
		append-icon="mdi-chevron-down "
		dense
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
	name: 'Select01',
	components: {},
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
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
:deep(.v-input) {
	font-size: 15px;
}
:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}
:deep(.v-input__control) {
	border-radius: 5px;
	background-color: #fff;
}
:deep(.v-select__selection) {
	font-size: 15px;
	color: #262626;
}
:deep(.v-select-list) {
	margin-top: 40px !important;
}
:deep(.v-label) {
	font-size: 15px !important;
}
:deep(.v-input__append-inner) {
	.v-input__icon {
		min-width: 0 !important;
		width: 10px !important;
	}
	.v-icon {
		color: #262626;
	}
}
:deep(.v-label--active) {
	transform: translateY(-20px) scale(0.7) !important;
}

// 인테리어하기 > 견적내기
.option.v-text-field--outlined {
	border-radius: 0 !important;
	border: 1px solid #ccc !important;
	height: 50px !important;
	:deep(.v-input__slot) {
		height: 50px !important;
	}
	:deep(.v-input__control) {
		background-color: transparent !important;
	}
	:deep(fieldset) {
		border-width: 0 !important;
	}
	:deep(.v-label) {
		font-size: 16px !important;
		top: 14px !important;
	}
	:deep(.v-input__append-inner) {
		margin-top: 14px !important;
	}
}

// 빠른견적내기
.v-input.fast {
	height: 36px !important;
	:deep(.v-input__control) {
		min-height: 36px !important;
		height: 36px !important;
	}
	:deep(.v-input__slot) {
		min-height: 36px !important;
		height: 36px !important;
	}
	:deep(.v-label) {
		top: 8px;
		font-size: 13px !important;
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	:deep(.v-input) {
		font-size: 13px;
	}
	:deep(.v-select__selection) {
		font-size: 13px;
	}

	// 인테리어하기 > 견적내기
	.option.v-text-field--outlined {
		:deep(.v-label) {
			font-size: 13px !important;
		}
	}
}
</style>
