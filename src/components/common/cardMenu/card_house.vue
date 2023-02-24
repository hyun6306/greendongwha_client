<template>
	<div class="py-4 px-3 pa-md-4 house_list">
		<v-row class="ma-0">
			<v-col
				class="pa-0"
				cols="4"
				md="3"
			>
				<div class="mr-1">
					<v-img
						:src="item.image_url"
						class="store_view"
						width="100"
						height="100"
						contain
						eager
					/>
				</div>
			</v-col>
			<v-col
				class="pa-0"
				cols="8"
				md="7"
			>
				<div class="ml-1">
					<p class="type">전문가집들이</p>
					<p class="tit">{{ item.title }}</p>
					<div class="mb-2 keyword">
						<span v-if="item.addr_cut">{{ item.addr_cut }}</span>
						<span v-if="item.spacious_name">{{ item.spacious_name }}</span>
						<span v-if="item.style_name">{{ item.style_name }}</span>
					</div>
					<v-col
						class="pa-0 place"
						cols="12"
						align-self="center"
					>
						<v-icon>mdi-map-marker-outline</v-icon>
						{{ item.business_name }}
					</v-col>
				</div>
			</v-col>
			<v-col
				class="pa-0 pt-2 pt-md-0"
				cols="12"
				md="2"
				align-self="end"
			>
				<CommonButtonsButton01
					name="상세보기"
					rounded
					outlined
					color="#ccc"
					:to="`/housewarming/specialist/detail/${item.exphw_id}`"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'CommonCardMenuHouse',
	mixins: [common],
	props: ['item'],
	data: () => ({}),
	computed: {
		currentPath() {
			return this.common_recentlyRouterPath === '/interior/price/inquire' ? 'components' : 'page'
		},
	},
	watch: {},
	mounted() {
		console.log('CommonCardMenuHouse', this.item)
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		goToInquire() {
			this.HOME_MU_INTERIOR_SELECT_INTERIOR(this.item)
			if (this.currentPath === 'page') this.$router.push('/interior/price/inquire').catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
// 한줄이상 (...)처리
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.house_list {
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	border-radius: 16px;
	background-color: $color_white;
	.store_view {
		border-top-right-radius: 8px;
		border-end-start-radius: 8px;
	}
	.type {
		font-size: $font_mid;
		font-weight: $fw_regular;
		color: $color_font;
	}
	.tit {
		@include ellipsis;
		font-size: $font_lg;
		font-weight: $fw_regular;
		color: $color_font;
		word-break: keep-all;
	}
	.keyword {
		font-weight: $fw_regular;
		font-size: $font_mid;
		color: $color_gray1;
		span {
			display: inline-block;
			position: relative;
			padding-right: 10px;
			&:after {
				display: block;
				position: absolute;
				top: 5px;
				right: 4px;
				width: 1px;
				height: 10px;
				background-color: $color_gray4;
				content: '';
			}
			&:last-child:after {
				display: none;
			}
		}
	}
	.place {
		.v-icon {
			width: 20px;
			font-size: $font__sub_tit;
			color: $color_font;
		}
		font-weight: $fw_regular;
		font-size: $font_mid;
		color: $color_font;
	}
	:deep(.v-btn__content) {
		font-size: $font_normal;
		font-weight: $fw_regular;
		span {
			color: $color_gray1 !important;
		}
	}
}

.no_filter {
	.v-icon {
		color: #a0a1a5;
	}
	p {
		font-family: 'NotoSansKR-Regular';
		font-size: 16px;
		color: #777;
	}
}
@media all and (max-width: 600px) {
	.store_view {
		width: 80px !important;
		height: 80px !important;
	}
	.house_list {
		.tit {
			font-size: 14px;
		}
	}
	.no_filter {
		p {
			font-size: 12px;
		}
	}
}
</style>
