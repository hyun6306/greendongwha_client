<template>
	<v-select
		v-model="model"
		:items="items"
		:label="label"
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
		single-line
		hide-details
		outlined
		:class="model.length ? 'on_select' : ''"
		@change="$emit('change', model)"
	>
		<template v-slot:selection="{ item, index }">
			<span
				v-if="index === 0"
				class="white--text"
			>
				{{ label }} +{{ model.length }}
			</span>
		</template>
		<template v-slot:item="{ item, attrs, on }">
			<v-list-item
				#default="{ active }"
				v-bind="attrs"
				v-on="on"
			>
				<v-list-item-content>
					<v-list-item-title>
						<v-row
							cols="ma-0"
							no-gutters
							align="center"
						>
							<v-col
								cols="10"
								class="pa-0"
							>
								<span :class="active ? 'active_text' : ''">
									{{ item.text }}
								</span>
							</v-col>
							<v-col
								cols="2"
								class="pa-0"
							>
								<v-icon
									v-if="active"
									color="olive"
								>
									mdi-check
								</v-icon>
							</v-col>
						</v-row>
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</template>
	</v-select>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Select04',
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
.active_text {
	color: $color_olive;
}
.on_select {
	:deep(.v-input__control) {
		font-size: $font_mid !important;
		background-color: $color_green1 !important;
	}
	:deep(.mdi:before, .mdi-set) {
		color: white !important;
	}
}
:deep(.v-input__control) {
	max-width: 120px !important;
	min-height: 36px !important;
	height: 36px !important;
	border-radius: 5px !important;
}
:deep(.v-input__slot) {
	min-height: 36px !important;
	height: 36px !important;
}

:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}

// :deep(.v-text-field--outlined) {
// 	fieldset {
// 		height: 36px !important;
// 		top: 0;
// 		border: 1px solid #ccc;
// 	}
// }
:deep(.v-label) {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px;
	color: #262626;
	top: 7px !important;
}
:deep(.v-input__append-inner) {
	.v-input__icon {
		min-width: 0 !important;
		width: 10px !important;
	}
	margin-top: 6px !important;
}
:deep(.v-list-item__action) {
	margin-left: 0 !important;
	margin-right: 5px !important;
	margin-top: 15px !important;
}
</style>
