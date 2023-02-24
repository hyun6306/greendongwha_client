<template>
	<div class="card_swiper">
		<v-row class="ma-0">
			<v-col
				class="pa-0"
				cols="4"
				align="start"
			>
				<div
					class="mr-1"
					@click="pushLink"
				>
					<v-img
						eager
						class="img_store clickCursor"
						:src="companyImage"
					>
						<span
							v-show="item.recommand_yn === 'Y'"
							class="py-1 px-2 flag"
						>
							추천
						</span>
						<v-row
							v-if="!companyIsImage"
							class="ma-0 pl-4 fill-height"
							align="center"
							justify="start"
						>
							<p class="store_title">
								{{ item.business_name }}
							</p>
						</v-row>
					</v-img>
				</div>
			</v-col>
			<v-col
				cols="8"
				class="pa-0"
			>
				<v-col
					cols="12"
					class="pa-0 pt-1 pr-1"
					align="end"
				>
				</v-col>
				<v-row
					class="ma-0 fill-height"
					align="start"
				>
					<v-col
						class="pl-2 pa-0"
						cols="12"
						align="start"
					>
						<v-row class="ma-0">
							<v-col
								cols="10"
								class="pa-0 pt-3 pt-md-6"
							>
								<p
									class="store_name"
									@click="pushLink"
								>
									{{ item.business_name }}
								</p>
								<p class="sore_address pb-0">{{ item.company_addr1 }} {{ item.company_addr2 }}</p>
							</v-col>
							<v-col
								cols="2"
								class="pa-0"
								align="center"
							>
								<v-btn
									class="pa-0"
									icon
									small
									@click="$emit('close', item)"
								>
									<v-icon class="pa-0">mdi-close</v-icon>
								</v-btn>
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
	name: 'CommonCardMenuCardInteriorSelect',
	mixins: [common],
	props: {
		item: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({}),
	computed: {
		companyImage() {
			return this.item.company_picurl ? this.item.company_picurl : require('@/assets/img/home/interior/img_store_empty.png')
		},
		companyIsImage() {
			return this.item.company_picurl ? !this.item.company_picurl.includes('data:image') : false
		},
	},
	watch: {},
	mounted() {},
	destroyed() {},
	methods: {
		pushLink() {
			this.common_newLink(`/interior/store/detail/${this.item.corporate_no}`)
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
.img_store {
	width: 100px;
	height: 100px;
	border-top-right-radius: 8px;
	border-end-start-radius: 8px;
	.flag {
		position: absolute;
		left: 0;
		top: 0;
		font-size: $font_sm;
		color: $color_white;
		background-color: $color_pink;
	}
}

.store_title {
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

.card_swiper {
	max-width: 320px;
	background-color: #f3f3f3;
	:deep(.v-size--default) {
		min-width: 20px !important;
	}

	.store_name {
		@include ellipsis;
		font-size: $font_lg;
		font-weight: $fw_regular;
		color: $color_font;
	}
	.sore_address {
		@include ellipsis_2;
		font-size: $font_sm;
		font-weight: $fw_normal;
		color: $color_gray1;
	}
}
.close_btn {
	display: inline-block;
	right: 10px;
	top: 10px;
}
@media all and (max-width: 600px) {
	.store_title {
		font-size: 0.85rem;
	}
	.img_store {
		width: 80px !important;
		height: 80px !important;
		.flag {
			font-size: $font_xs;
		}
	}
}
</style>
