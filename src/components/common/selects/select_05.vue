<template>
	<v-row justify="space-around">
		<v-menu
			v-model="menuSelectModel"
			:close-on-content-click="false"
			offset-y
			:height="height"
		>
			<template v-slot:activator="{ attrs, on }">
				<v-btn
					color="#7a9d67"
					class="mt-3 select_btn_text"
					v-bind="attrs"
					block
					:outlined="!model"
					tile
					:height="height"
					v-on="on"
				>
					<span :class="`select_btn_text_${model ? 'dark' : 'light'}`">{{ selectTitle }}</span>
					<v-icon
						:color="model ? 'white' : '#7a9d67'"
						class="ml-1 mt-1"
					>
						mdi-chevron-down
					</v-icon>
				</v-btn>
			</template>
			<v-row class="ma-0">
				<v-col
					cols="6"
					class="pa-0 select_background_area"
					:style="`height:${areaHeight}px; overflow:auto;`"
				>
					<v-list
						dense
						class="select_box_05_area"
						:height="areaHeight"
					>
						<v-list-item
							v-for="(item, i) in parentsItems"
							:key="i"
							:class="item.active ? 'select_box_05_active' : ''"
							class="py-1"
							@click="selectParents(item)"
						>
							<v-col
								cols="8"
								class="pa-0"
							>
								<CommonTooltipType02
									:title="item.text"
									:tooltip="item.tooltip"
									:is-tooltip="item.tooltip != null"
								/>
							</v-col>
							<v-col
								v-if="item.active"
								cols="4"
								class="pa-0"
							>
								<v-icon>mdi-chevron-right</v-icon>
							</v-col>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col
					cols="6"
					class="pa-0 select_background"
					:style="`height:${areaHeight}px; overflow:auto;`"
				>
					<v-list
						dense
						class="select_box_05"
						:max-height="areaHeight"
					>
						<v-list-item
							v-for="(item, i) in childItems"
							:key="i"
							class="py-1"
							@click="selectChild(item)"
						>
							<v-col class="pa-0">
								<CommonTooltipType02
									:title="item.text"
									:tooltip="item.tooltip"
									:is-tooltip="item.tooltip != null"
								/>
							</v-col>
							<v-col
								v-if="selectCheck(item)"
								cols="4"
								class="pa-0"
							>
								<v-icon color="#42883d">mdi-check</v-icon>
							</v-col>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-menu>
	</v-row>
</template>

<script>
import model from '@/mixins/model'
import { mapGetters } from 'vuex'

export default {
	name: 'Select05',
	mixins: [model],
	props: {
		parentsItems: {
			type: Array,
			default: () => [],
		},
		childItems: {
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
		selectText: {
			type: String,
			default: '',
		},
		selectId: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 50,
		},
		areaHeight: {
			type: Number,
			default: 310,
		},
		disabled: {},
		readonly: {},
	},
	data: () => ({
		menuSelectModel: false,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
		selectTitle() {
			if (this.model) return this.selectText
			return this.label
		},
	},
	watch: {
		model(val) {
			console.log('model', val)
		},
	},
	methods: {
		selectParents(item) {
			console.log(item)
			this.$emit('select-parents', item)
		},
		selectChild(item) {
			this.menuSelectModel = false
			this.$emit('select-child', item)
		},
		selectCheck(item) {
			if (this.model && this.selectId) {
				if (this.model[this.selectId] === item[this.selectId]) {
					return true
				}
			}
			return false
		},
	},
}
</script>
<style scoped lang="scss">
.select_box_05 {
	font-size: 1rem;
	&_area {
		background-color: #f8f8f8;
	}
	&_active {
		background-color: #e6ece9;
	}
}
.select_btn_text {
	font-size: 1rem;
	font-weight: 500;
	&_dark {
		color: #fff;
	}
	&_light {
		color: #7a9d67;
	}
}
.select_background {
	background-color: #fff !important;
	border-right: 1px solid #f8f8f8 !important;
	&_area {
		background-color: #f8f8f8;
	}
}
</style>
