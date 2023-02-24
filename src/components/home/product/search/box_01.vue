<template>
	<v-row class="ma-0 search_zone">
		<v-col
			cols="12"
			class="pa-3 search_zone_box"
		>
			<CommonButtonsToggleButton04
				v-if="filterKindItems.length"
				v-model="model"
				:items="filterKindItems"
			/>
		</v-col>
		<v-col
			cols="12"
			class="pa-0 search_zone_box_list"
			align-self="center"
			:style="`height:${height}px`"
		>
			<v-row class="ma-0 pa-2">
				<v-col
					v-for="(item, i) in selectBrandProductList"
					:key="i"
					cols="6"
					class="pa-1"
					sm="4"
					md="3"
					lg="2"
				>
					<v-card
						:class="item.active ? 'search_box_check' : 'search_box'"
						width="100%"
						height="36"
						flat
						justify="center"
						@click="$emit('select', item)"
					>
						<v-row class="ma-0 px-1">
							<v-col
								class="pa-2"
								:class="item.active ? 'search_box_check_text_active' : 'search_box_check_text'"
								align="start"
							>
								<CommonTooltipType02
									:title="item.filter_title"
									:tooltip="item.tooltip"
									:is-tooltip="item.tooltip != null"
									span-class-name="pr-2"
								/>
							</v-col>
							<!--<v-col cols="2" v-if="item.active">
                                <v-icon >check</v-icon>
                            </v-col>-->
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'HomeProductSearchBox01',
	components: {},
	mixins: [model],
	props: {
		filterKindItems: {
			type: Array,
			default: () => [],
		},
		selectBrandProductList: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
		height() {
			let value = 110
			if (this.APP_GET_APP_WIDTH < 1263) {
				value = 160
			}
			if (this.APP_GET_APP_WIDTH < 960) {
				value = 200
			}
			if (this.APP_GET_APP_WIDTH < 600) {
				value = 250
			}
			return value
		},
	},
	watch: {
		model(val) {
			console.log('selectKindModel1', val)
		},
	},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.search_zone_box {
	overflow: auto;
	flex-direction: row;
	-webkit-overflow-scrolling: touch;
	// 스크롤 보이기 제거
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	//border: 1px solid #ccc;
	&_text {
		line-height: 1.7rem;
	}
}
// 스크롤 보이기 제거
.search_zone_box::-webkit-scrollbar {
	display: none !important; /* Chrome, Safari, Opera*/
}
// 선택 후 잔상 제거
.v-card--link:before {
	background: transparent;
}
.search_zone_box_list {
	overflow: auto;
	background: #f9f9f9;
}
.search_box {
	border-radius: 100px;
	background-color: #f9f9f9;
	&_check {
		border-radius: 100px;
		background-color: #e8e8e8;

		&_text {
			color: $color_gray2;
			font-size: 1rem;

			&_active {
				font-size: 1rem;
			}
		}
	}
}
@media screen and (max-width: 380px) {
	.search_box {
		&_check {
			&_text {
				font-size: 0.9rem;

				&_active {
					font-size: 0.9rem;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
