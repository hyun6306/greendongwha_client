<template>
	<div>
		<v-row
			class="ma-0 contents_area"
			align="center"
		>
			<v-col
				class="pa-0 photo"
				cols="3"
				md="2"
				align="start"
			>
				<div
					class="mr-1"
					@click="pushLink(item)"
				>
					<v-img
						eager
						contain
						class="img_contents clickCursor"
						:src="item.image_url"
					/>
				</div>
			</v-col>
			<v-col
				cols="9"
				md="10"
				class="pa-0"
			>
				<v-row
					class="ma-0 fill-height"
					align="center"
				>
					<v-col
						class="pl-2 pa-0"
						cols="12"
						md="10"
						align="start"
					>
						<v-row class="ma-0">
							<v-col
								cols="12"
								class="pa-0"
							>
								<p class="contents_info_value">
									{{ item.product_kind }}
								</p>
								<p class="contents_name">
									{{ item.title }}
								</p>
								<p class="contents_info">
									{{ item.sub_title }}
								</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'UserItemEstimateContentsCard',
	mixins: [common],
	props: {
		item: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	mounted() {},
	destroyed() {},
	methods: {
		pushLink(item) {
			console.log('pushLink', item)
			let path = ''
			switch (item.product_kind) {
				case '상품마스터':
					path = `/product/detail/${item.item_id}`
					break
				case '3D집들이':
					path = `/housewarming/3d/detail/${item.item_id}`
					break
				case '전문가집들이':
					path = `/housewarming/specialist/detail/${item.item_id}`
					break
				default:
					break
			}
			if (path) this.common_newLink(path)
			// this.common_newLink(`/interior/store/detail/${this.item.corporate_no}`)
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
.contents_area {
	border-bottom: 1px solid #ccc;
	padding-bottom: 1.5rem;
}

.img_contents {
	width: 100px;
	height: 100px;
	border-top-right-radius: 8px;
	border-end-start-radius: 8px;
	.flag {
		font-size: $font_sm;
		color: $color_white;
		background-color: $color_pink;
	}
}

.contents {
	&_title {
		font-family: 'NotoSansKR-bold';
		font-size: 1rem;
		color: white;
		width: 80%;
		text-align: start;

		// ...처리
		overflow: hidden;
		text-overflow: ellipsis;

		/* 여러 줄 자르기 추가 스타일 */
		white-space: normal;
		line-height: 1.2;
		height: 2.3em;
		word-break: keep-all;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	&_name {
		@include ellipsis;
		font-size: $font_lg;
		font-weight: $fw_regular;
		color: $color_black;
	}

	&_info {
		@include ellipsis;
		font-size: $font_xs;
		font-weight: $fw_normal;
		color: $color_gray1;
		&_value {
			font-size: $font_sm;
			color: $color_black;
		}
	}
}
@media all and (max-width: 600px) {
	.contents {
		&_title {
			font-size: 0.85rem;
		}
	}
	.img_contents {
		width: 80px !important;
		height: 80px !important;
	}
}
</style>
