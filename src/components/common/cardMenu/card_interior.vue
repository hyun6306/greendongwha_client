<template>
	<div class="py-4 px-3 pa-md-4 card_interior">
		<v-row class="ma-0 mb-3">
			<v-col
				class="pa-0"
				cols="4"
				md="3"
				sm="2"
				align="center"
			>
				<div class="mr-1">
					<v-img
						class="img_store"
						eager
						contain
						width="100"
						height="100"
						:src="item.company_picurl"
					>
						<span
							v-show="item.recommand_yn === 'Y'"
							class="py-1 px-2 flag"
						>
							추천
						</span>
						<v-row
							v-if="!item.is_img"
							class="ma-0 pl-3 pl-md-4 fill-height"
							align="center"
							justify="center"
						>
							<p class="store_title">
								{{ item.business_name }}
							</p>
						</v-row>
					</v-img>
				</div>
			</v-col>
			<v-col
				class="pa-0"
				cols="8"
				md="9"
				sm="10"
			>
				<div class="ml-1">
					<v-row class="ma-0">
						<v-col
							class="pa-0"
							cols="12"
							md="9"
						>
							<div class="mr-1">
								<p
									v-if="item.business_name"
									class="pt-1 pt-md-2 store_name"
								>
									{{ item.business_name }}
								</p>
								<p
									v-if="item.company_addr1"
									class="pt-1 store_address"
								>
									<v-icon>mdi-map-marker-outline</v-icon>
									{{ item.company_addr1 }} {{ item.company_addr2 }}
								</p>
								<p
									v-if="item.company_tel"
									class="pt-1 store_phone"
								>
									<v-icon>mdi-phone-outline </v-icon>
									{{ item.company_tel }}
								</p>
								<!--<p
									v-if="item.buildItems"
									class="pt-1 store_build"
								>
									<span
										v-for="(build, i) in item.buildItems"
										:key="i"
									>
										{{ build }}
									</span>
								</p>-->
							</div>
						</v-col>
						<v-col
							class="pa-0 hidden-sm-and-down"
							cols="4"
							md="3"
							align="end"
							align-self="center"
						>
							<div class="ml-1">
								<div
									v-if="item.cnt_construct"
									class="pa-2 count tac"
								>
									<strong> {{ item.cnt_construct }} </strong>건
									<p>시공사례</p>
								</div>
							</div>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<v-row class="ma-0">
			<v-col
				class="pa-0"
				cols="6"
			>
				<div class="mr-1">
					<CommonButtonsButton01
						class="btn_detail"
						rounded
						outlined
						name="상세보기"
						color="#ccc"
						height="36"
						@click="pushLink(item.corporate_no)"
					/>
				</div>
			</v-col>
			<v-col
				v-if="originDongWhaCheck(item.corporate_no)"
				class="pa-0"
				cols="6"
			>
				<div class="ml-1">
					<v-btn
						rounded
						color="#00ce7d"
						height="36"
						width="100%"
						:outlined="!checkInterior(item).fill"
						:dark="checkInterior(item).fill"
						@click="goToInquire"
					>
						{{ checkInterior(item).name }}
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'CommonCardMenuInterior',
	mixins: [common],
	props: ['item'],
	data: () => ({}),
	computed: {
		...mapGetters(['HOME_GET_INTERIOR_SELECT_INTERIOR', 'APP_GET_APP_STATE']),
		housewarmingCheck() {
			return this.common_recentlyRouterPath.includes('housewarming')
		},
		inquireCheck() {
			return this.common_recentlyRouterPath.includes('inquire')
		},
	},
	watch: {},
	mounted() {
		console.log('check', this.item)
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		originDongWhaCheck(number) {
			return number === '1378102333' ? false : true
		},
		goToInquire() {
			this.HOME_MU_INTERIOR_SELECT_INTERIOR(this.item)
			this.$router.push('/interior/price/inquire').catch(() => {})
		},
		checkInterior(item) {
			const check = this.HOME_GET_INTERIOR_SELECT_INTERIOR.find(x => x.corporate_no === item.corporate_no)
			if (check) return { name: '선택완료', color: '#00ce7d', fill: true }
			if (this.inquireCheck) return { name: '인테리어점 선택', color: '#fff', fill: false }
			return { name: '견적상담 의뢰', color: '#fff', fill: false }
		},
		pushLink(corporate_no) {
			if (this.APP_GET_APP_STATE === 'web') this.common_newLink(`/interior/store/detail/${corporate_no}`)
			else this.$router.push(`/interior/store/detail/${corporate_no}`)
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

.card_interior {
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	border-radius: 16px;
	background-color: $color_white;
	.img_store {
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
	.store_name {
		@include ellipsis;
		font-size: $font_lg;
		font-weight: $fw_regular;
		color: $color_font;
	}
	.store_address,
	.store_phone {
		@include ellipsis_2;
		position: relative;
		padding-left: 24px;
		color: $color_gray2;
		font-size: $font_mid;
		.v-icon {
			position: absolute;
			font-size: $font__sub_tit;
			top: 5px;
			left: 0;
		}
	}
	.store_build {
		color: $color_gray2;
		font-size: $font_mid;
	}

	.count {
		display: inline-block;
		max-width: 62px;
		font-size: $font_sm;
		color: $color_gray1;
		background-color: $color_gray3;
		border-radius: 8px;
		strong {
			font-size: $font_normal;
			color: $color_font;
		}
	}

	:deep(.v-btn__content) {
		font-size: $font_normal;
		font-weight: $fw_regular;
	}
	.btn_detail {
		:deep(.v-btn__content) {
			span {
				color: $color_gray1 !important;
			}
		}
	}
}

@media all and (max-width: 600px) {
	.store_title {
		font-size: 0.85rem;
	}
	.card_interior {
		.img_store {
			width: 80px !important;
			height: 80px !important;
			.flag {
				font-size: $font_xs;
			}
		}
		.store_name {
			font-size: $font_normal !important;
		}
		.store_address,
		.store_phone {
			padding-left: 0 !important;
			font-size: $font_sm;
			.v-icon {
				display: none !important;
			}
		}
		.store_build {
			font-size: $font_sm;
		}
		.count {
			strong {
				font-size: $font_sm !important;
			}
		}
	}
}
</style>
