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
		<template v-slot:selection="{ item, index }">
			<div v-if="index === 0">
				<span class="pr-1">{{ item.text }}</span>
			</div>
			<span
				v-if="index === 1"
				class="grey--text text-caption pt-1"
			>
				(+{{ model.length - 1 }})
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
	name: 'Select02',
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
:deep(.v-input__control) {
	//border-radius:0 !important;
}
:deep(.v-label) {
	font-size: 15px !important;
	// top: 14px !important;
}
:deep(.v-input__slot) {
	fieldset {
		border: 1px solid #ddd !important;
	}
}
:deep(.v-input__append-inner) {
	margin-top: 6px !important;
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

// 인테리어점 찾기
.v-input.interior {
	height: 40px !important;
	font-size: $font_normal !important;
	background-color: #fff !important;

	:deep(.v-input__slot fieldset) {
		border: none !important;
	}
	:deep(.v-input__slot) {
		min-height: 40px !important;
		height: 40px !important;
	}
	:deep(.v-label) {
		top: 10px;
		font-size: $font_normal !important;
		color: #b1b1b1 !important;
	}
}
</style>
