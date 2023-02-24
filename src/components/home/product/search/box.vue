<template>
	<v-row class="ma-0 py-3 search_zone">
		<v-col
			cols="6"
			sm="4"
			md="3"
			class="pa-0 search_zone_box"
			align-self="center"
			:style="`height:${height}px`"
		>
			<v-card
				class="mx-auto pa-0"
				tile
				flat
			>
				<v-list
					dense
					shaped
				>
					<v-list-item-group
						v-model="model"
						color="primary"
					>
						<v-list-item
							v-for="(item, i) in filterKindItems"
							:key="i"
						>
							<v-list-item-content
								class="mx-sm-4 mx-1"
								align="start"
								justify="center"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0 search_zone_box_text"
										cols="12"
										md="9"
									>
										<CommonTooltipType02
											:title="item.text"
											:tooltip="item.tooltip"
											:is-tooltip="item.tooltip != null"
											span-class-name="pr-2 toggle_group_btn_txt"
										/>
									</v-col>
									<v-col
										class="pa-0 hidden-sm-and-down"
										cols="2"
										align="end"
									>
										<v-icon v-show="model === i">mdi-chevron-right</v-icon>
									</v-col>
								</v-row>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card>
		</v-col>
		<v-col
			cols="6"
			sm="8"
			md="9"
			class="pa-0 search_zone_box_list"
			align-self="center"
			:style="`height:${height}px`"
		>
			<v-row class="ma-0">
				<v-col
					v-for="(item, i) in selectBrandProductList"
					:key="i"
					cols="12"
					class="pa-1"
					sm="6"
					md="3"
				>
					<v-card
						:class="item.active ? 'search_box_check' : ''"
						width="100%"
						height="38"
						flat
						outlined
						hover
						ripple
						justify="center"
						@click="$emit('select', item)"
					>
						<v-row class="ma-0">
							<v-col
								class="pa-2"
								:class="item.active ? 'search_box_check_text_active' : 'search_box_check_text'"
								justify="center"
							>
								<CommonTooltipType02
									:title="item.filter_title"
									:tooltip="item.tooltip"
									:is-tooltip="item.tooltip != null"
									span-class-name="pr-2 toggle_group_btn_txt"
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
	name: 'HomeProductSearchBox',
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
		height: {
			type: Number,
			default: 270,
		},
	},
	data: () => ({}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.search_zone_box {
	overflow: auto;
	border: 1px solid #ccc;
	&_text {
		line-height: 1.7rem;
	}
}
.search_zone_box_list {
	overflow: auto;
}
.search_box_check {
	background-color: $color_green1;
	&_text {
		font-size: 1rem;
		&_active {
			font-size: 1rem;
			color: white;
			font-weight: bold;
		}
	}
}
@media screen and (max-width: 380px) {
	.search_box_check {
		&_text {
			font-size: 0.85rem;
			&_active {
				font-size: 0.85rem;
			}
		}
	}
}
</style>
