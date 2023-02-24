<template>
	<div
		v-if="floatMenuShow"
		class="float"
	>
		<div class="py-3 px-4">
			<!-- 최근본상품 -->
			<v-col
				class="pa-0 recent"
				cols="12"
			>
				<v-col
					cols="12"
					class="pa-0 mb-2"
				>
					<p class="tit mb-2">최근 본 상품</p>
					<div v-if="APP_GET_RECENT_PRODUCT.length">
						<v-img
							width="100%"
							height="90"
							:src="APP_GET_RECENT_PRODUCT[checkIndex].image"
							class="mb-2 clickCursor"
							@click="common_link_pusher(APP_GET_RECENT_PRODUCT[checkIndex])"
						/>
						<div class="control d-flex">
							<v-btn
								class="mr-2"
								@click="prevItem"
							>
								<v-icon>chevron_left</v-icon>
							</v-btn>
							<p>
								<span class="done">{{ checkIndex + 1 }}</span>
								<span> / </span>
								<span class="all">{{ APP_GET_RECENT_PRODUCT.length }}</span>
							</p>
							<v-btn
								class="ml-2"
								@click="nextItem"
							>
								<v-icon>chevron_right</v-icon>
							</v-btn>
						</div>
					</div>

					<!-- 최근 본 상품이 없는경우 -->
					<div
						v-else
						class="card_line"
					>
						<v-card
							width="100%"
							height="90"
							elevation="0"
							outlined
						/>
					</div>
				</v-col>

				<!-- 전체보기 -->
				<v-col
					v-if="APP_GET_RECENT_PRODUCT.length"
					class="pa-0"
				>
					<div>
						<!-- 전체보기 노출버튼 (상태:전체보기 팝업(기본) 노출) -->
						<div class="text-center">
							<v-btn
								class="all_view my-2"
								rounded
								@click="alert = !alert"
							>
								전체보기
							</v-btn>
						</div>

						<!-- 상태 1: 전체보기 팝업 (기본) -->
						<v-alert
							v-model="alert"
							close-text="Close Alert"
							class="all_view_list pa-6"
							elevation="7"
						>
							<div class="header d-flex justify-space-between mb-3">
								<p>
									최근 본 제품 <strong class="color_olive"> {{ APP_GET_RECENT_PRODUCT.length }} </strong>개
								</p>
								<v-btn @click="alert = false">
									<v-icon>close</v-icon>
								</v-btn>
							</div>
							<div
								v-if="APP_GET_RECENT_PRODUCT.length"
								class="box"
							>
								<v-col
									v-for="(item, i) in APP_GET_RECENT_PRODUCT"
									:key="i"
									class="pa-5 borderTop"
								>
									<LayoutFloatMenuMenu
										:menu="item"
										class="clickCursor"
										@submit="selectItem"
									/>
								</v-col>
							</div>
							<v-col
								v-else
								align="center"
								class="mt-10"
							>
								<p>최근 선택한 제품이 없습니다.</p>
							</v-col>
						</v-alert>
					</div>
				</v-col>
			</v-col>

			<!-- 토글 -->
			<v-col
				class="pa-0 mb-5"
				cols="12"
			>
				<div class="toggle">
					<div
						class="btn pa-0 py-3"
						align="center"
						@click="alert_estimate = !alert_estimate"
						@mouseover="handleIconMouseOver('estimateIconColor')"
						@mouseout="handleIconMouseOut('estimateIconColor')"
					>
						<!-- <v-img
							width="40"
							height="40"
							:src="require('@/assets/img/icon/icon_estimate.svg')"
						/> -->
						<CommonIconsEstimateIcon :color="estimateIconColor" />
						<p class="mt-1">빠른견적내기</p>
					</div>
					<v-alert
						v-model="alert_estimate"
						elevation="7"
						class="fast_estimate pa-6"
					>
						<v-col class="pa-0 tar">
							<v-btn
								class="tar"
								@click="alert_estimate = !alert_estimate"
							>
								<v-icon>close</v-icon>
							</v-btn>
						</v-col>
						<HomeMainEstimate floating />
					</v-alert>
				</div>
				<div class="line my-1" />
				<div class="toggle">
					<div
						class="btn pa-0 py-3"
						align="center"
						@click="naver_chatbot_on_click"
						@mouseover="handleIconMouseOver('talkIconColor')"
						@mouseout="handleIconMouseOut('talkIconColor')"
					>
						<!-- <v-img
							class="icon_talk"
							width="40"
							height="40"
							:src="require('@/assets/img/icon/icon_talk.svg')"
						/> -->
						<CommonIconsTalkIcon :color="talkIconColor" />
						<p class="mt-1">동화 톡톡</p>
						<div class="text">
							<p class="py-5">
								<span>동화 톡톡</span>을 통해 <br />
								무엇이든 물어보세요!
							</p>
						</div>
					</div>
				</div>
				<div class="line my-1" />
				<div class="toggle">
					<div
						class="btn pa-0 py-3"
						align="center"
						@click="common_phoneCall('18992837')"
						@mouseover="handleIconMouseOver('callIconColor')"
						@mouseout="handleIconMouseOut('callIconColor')"
					>
						<!-- <v-img
							class="icon_call"
							width="40"
							height="40"
							:src="require('@/assets/img/icon/icon_call.svg')"
						/> -->
						<CommonIconsCallIcon :color="callIconColor" />
						<p class="mt-1">동화콜센터</p>
						<div class="text">
							<p class="py-5">
								콜센터로 전화 걸어<br />
								궁금증을 해결하세요!<br />
								<span>1899-2837</span>
							</p>
						</div>
					</div>
				</div>
			</v-col>
			<div
				id="naverChatBot"
				class="talk_banner_div"
				data-id="22278"
				style="display: none"
			></div>
		</div>

		<!-- 견적상담 버튼 -->
		<v-col
			v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
			align="center"
			class="pa-0"
		>
			<v-btn
				class="btn_estimate"
				to="/interior/price/inquire"
				block
			>
				견적상담 의뢰
			</v-btn>
		</v-col>

		<!-- 상단으로 버튼 -->
		<v-col
			align="center"
			class="pa-0"
		>
			<v-btn
				class="btn_top"
				block
				@click="common_scrollToTop"
			>
				<v-icon>arrow_upward</v-icon>
				TOP
			</v-btn>
		</v-col>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'
import naver_chatbot from '@/mixins/naver_chatbot'

export default {
	name: 'HomeMainFloating',
	mixins: [common, naver_chatbot],
	props: ['items'],
	data: () => ({
		alert: false,
		alert_estimate: false,
		checkIndex: 0,
		callIconColor: '#000',
		talkIconColor: '#000',
		estimateIconColor: '#000',
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'APP_GET_APP_WIDTH', 'APP_GET_RECENT_PRODUCT']),
		floatMenuShow() {
			return this.APP_GET_APP_WIDTH > 1500 ? true : false
		},
		cssCall() {
			return {
				'-webkit-mask-image': require('../../../assets/img/icon/icon_call.svg') + ' no-repeat center !important',
				'mask-image': require('../../../assets/img/icon/icon_call.svg') + ' no-repeat center !important',
			}
		},
	},
	created() {},
	mounted() {},
	methods: {
		selectItem(item) {
			this.alert = false
			this.common_link_pusher(item)
		},
		prevItem() {
			if (this.checkIndex === 0) return
			this.checkIndex = this.checkIndex - 1
		},
		nextItem() {
			if (this.checkIndex + 1 === this.APP_GET_RECENT_PRODUCT.length) return
			this.checkIndex = this.checkIndex + 1
		},
		handleIconMouseOut(icon) {
			this[icon] = '#262626'
		},
		handleIconMouseOver(icon) {
			this[icon] = '#fff'
		},
	},
}
</script>
<style scoped lang="scss">
.borderTop {
	border-bottom: 1px solid #ccc;
}
.card_line {
	border-bottom: 1px solid #ccc;
	padding-bottom: 1em;
}
.float {
	max-width: 120px;
	z-index: 10;
	position: fixed;
	top: 100px;
	right: 2%;
	border: 1px solid #262626;
	background-color: #fff !important;

	// 최근 본 상품
	.recent {
		position: relative;
		margin: 0 auto;
		// 최근본상품 슬라이드
		.tit {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px !important;
			color: #262626;
		}
		.control {
			p {
				font-family: 'Roboto' !important;
				font-size: 12px !important;
			}
			.v-btn {
				border-radius: 0 !important;
				background-color: #fff !important;
				border: 1px solid #ccc !important;
				box-shadow: none !important;
			}
			.v-btn:not(.v-btn--round).v-size--default {
				min-width: 20px;
				width: 20px;
				height: 20px;
				padding: 0;
			}
		}

		// 최근본상품 전체보기
		.all_view {
			width: 100%;
			height: 25px !important;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px !important;
			background-color: #fff !important;
			border: 1px solid #ccc !important;
			box-shadow: none !important;
		}
		.all_view_list {
			width: 500px !important;
			height: 420px !important;
			position: absolute;
			left: -530px;
			top: 20px;
			border: 1px solid #ccc;
			background-color: white !important;
			.header {
				p {
					font-family: 'NotoSansKR-Regular' !important;
					font-size: 16px !important;
				}
				.v-btn {
					box-shadow: none;
					background: #fff;
				}
				.v-btn:not(.v-btn--round).v-size--default {
					min-width: 20px !important;
					width: 20px;
					height: 20px;
				}
			}
			.box {
				height: 290px;
				overflow-y: scroll;
				border: 1px solid #ccc;
				.v-card {
					box-shadow: none !important;
					border-radius: 0 !important;
					border-bottom: 1px solid #ccc;
					.type {
						font-family: 'NotoSansKR-Regular' !important;
						font-size: 14px !important;
					}
					.theme {
						font-family: 'NotoSansKR-Regular' !important;
						font-size: 18px !important;
					}
					.path {
						font-family: 'NotoSansKR-Regular' !important;
						font-size: 14px !important;
						color: #777;
					}
				}
				.v-card:last-child {
					border-bottom: none !important;
				}
				.mark.v-btn:not(.v-btn--round).v-size--x-small {
					min-width: 20px !important;
					width: 23px !important;
					height: 26px !important;
					box-shadow: none;
				}
			}
			.btn {
				width: 100px;
				font-family: 'NotoSansKR-Medium' !important;
				font-size: 14px !important;
				box-shadow: none;
				&.btn_edit {
					//편집
					color: #777;
					background-color: #fff !important;
					border: 1px solid #777;
				}
				&.btn_del {
					//삭제
					color: #fff;
					background-color: #00582c !important;
				}
				&.btn_cancel {
					//취소
					color: #262626;
					background-color: #fff !important;
					border: 1px solid #262626;
				}
			}
		}
	}

	// 빠른견적내기 , 1:1상담 , 동화콜센터 (토글효과)
	.toggle {
		height: 90px !important;
		.btn {
			position: relative;
			width: 90px !important;
			height: 90px !important;
			border-radius: 8px;
			cursor: pointer;
			.text {
				display: none;
				width: 150px;
				height: 90px;
				position: absolute;
				top: 0;
				right: 0;
				font-size: 12px;
				color: #fff;
				background-color: #229145;
				line-height: 1.5;
				border-radius: 8px;
				span {
					color: #a6eb76;
				}
			}
		}
		.btn:hover {
			color: #fff !important;
			background-color: #229145;
			// .v-image.icon_call {
			// 	border: 1px solid yellow;
			// 	// mask-image: url(../../../assets/img/icon/icon_call_w.svg);
			// 	// -webkit-mask-image: url(../../../assets/img/icon/icon_call_w.svg);
			// 	mask-size: cover;
			// 	-webkit-mask-size: cover;
			// 	background: #fff !important;
			// }
			.text {
				display: block;
				left: -140px !important;
				transition: all 5s;
			}
		}
	}

	.line {
		margin: 0 auto;
		border-radius: 0 !important;
		width: 90px !important;
		height: 1px !important;
		background-color: #ccc !important;
	}

	// 빠른견적내기 레이어
	.fast_estimate {
		width: 500px !important;
		height: 500px !important;
		position: absolute;
		left: -510px;
		top: 20px;
		border: 1px solid #ccc;
		background-color: white !important;
		.v-btn {
			box-shadow: none;
			background: #fff;
		}
		.v-btn:not(.v-btn--round).v-size--default {
			min-width: 20px !important;
			width: 20px;
			height: 20px;
		}
	}

	//  버튼(견적상담의뢰, 맨위로가기)
	.btn_estimate,
	.btn_top {
		height: 40px;
		border-radius: 0;
		font-family: 'NotoSansKR-Medium';
		font-size: 14px;
		color: #262626;
		border-top: 1px solid #ccc;
		background-color: #f1f2f3 !important;
		box-shadow: none;
		&:hover {
			color: #fff !important;
			background-color: #42883d !important;
		}
	}
}
</style>
