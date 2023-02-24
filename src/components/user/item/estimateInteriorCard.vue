<template>
	<div>
		<v-row
			class="ma-0 pt-4 store_area"
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
					@click="pushLink"
				>
					<v-img
						eager
						contain
						class="img_store clickCursor"
						:src="companyImage"
					>
						<v-row
							v-if="!companyIsImage"
							class="ma-0 pl-4 fill-height"
							align="center"
							justify="start"
						>
							<p class="store_title">{{ item.business_name }}</p>
						</v-row>
					</v-img>
				</div>
			</v-col>
			<v-col
				cols="9"
				md="7"
				class="pa-0 pb-3 pb-md-0"
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
								<p
									class="store_name"
									@click="pushLink"
								>
									{{ item.business_name }}
								</p>
								<p class="store_address pb-0">{{ item.company_addr1 }} {{ item.company_addr2 }}</p>
								<p class="store_info pt-2">
									전화번호 | <span class="store_info_value">{{ item.company_tel }}</span>
								</p>
								<p class="store_info pb-0 hidden-sm-and-down">
									시공사례 | <span class="store_info_value">{{ item.cnt_construct }}</span>
								</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="12"
				md="3"
				class="pa-0 pr-2 pr-md-5"
				align="end"
			>
				<span class="mr-1">상태 | </span>
				<span
					v-if="item.consult_state === '1'"
					class="require_text"
				>
					상담 요청
				</span>
				<span
					v-else
					class="complete_text"
				>
					상담 완료
				</span>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'UserItemEstimateInteriorCard',
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
.complete_text {
	color: $color_olive;
	font-weight: bold;
	font-size: 1.1rem;
}
.require_text {
	color: $color_black;
	font-weight: bold;
	font-size: 1.1rem;
}
.store_area {
	border-bottom: 1px solid #ccc;
	padding-bottom: 1.5rem;
}

.img_store {
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

.store {
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

	&_address {
		@include ellipsis_2;
		font-size: $font_sm;
		font-weight: $fw_normal;
		color: $color_font;
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
	.store {
		&_title {
			font-size: 0.8rem;
		}
	}
	.img_store {
		width: 80px !important;
		height: 80px !important;
	}
}
</style>
