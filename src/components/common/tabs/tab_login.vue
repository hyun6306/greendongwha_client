<template>
	<v-tabs
		v-model="model"
		background-color="#f7f7f7"
		active-class="tab_active"
		grow
		show-arrows
		:class="className"
	>
		<v-tab
			v-for="(item, i) in tabItems"
			:key="i"
			class="pa-0"
		>
			<v-row class="ma-0 justify-center">
				<v-row
					class="ma-0 item_text"
					align="center"
					justify="center"
				>
					<embed
						v-if="item.icon"
						:src="require(`@/assets/img/icon/${item.icon}.svg`)"
						class="icon"
						:class="model === i ? 'icon_select_filter' : ''"
					/>
					<span class="pl-2">{{ item.name }}</span>
				</v-row>
			</v-row>
		</v-tab>
	</v-tabs>
</template>

<script>
import model from '@/mixins/model'
export default {
	name: 'TypeTab01',
	components: {},
	mixins: [model],
	props: ['tabItems', 'className'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.icon {
	display: inline-block;
	width: 30px;
	height: 30px;
	background-size: cover;
}
.icon_select_filter {
	filter: invert(100%);
}
.v-tabs {
	.v-tab {
		width: 170px !important;
		.item_text {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 15px;
			color: #262626 !important;
			word-break: keep-all;
		}
		border-bottom: 3px solid #262626;
	}
	:deep(.v-slide-group.v-item-group > .v-slide-group__next),
	:deep(.v-slide-group.v-item-group > .v-slide-group__prev) {
		display: none;
	}

	.tab_active.v-tab {
		background-color: #262626 !important;
		.item_text {
			font-family: 'NotoSansKR-Bold' !important;
			color: #fff !important;
		}
		.item_icon {
			:deep(.v-image__image) {
				fill: #fff !important;
			}
		}
	}
}

.margin_0 {
	margin: 0 !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.v-tabs {
		.v-tab {
			p {
				font-size: 13px;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.v-tabs {
		.v-tab {
			p {
				font-size: 13px;
			}
		}
	}
}
</style>
