<template>
	<v-col
		cols="12"
		align="center"
		class="pa-0 pt-5 pb-8 pt-sm-8 pb-sm-12 receipt click_inquire_button_ip"
	>
		<v-col
			cols="11"
			sm="9"
			md="7"
			align="center"
			class="pa-0"
		>
			<v-img
				width="28"
				:src="require('@/assets/img/home/interior/icon_note.png')"
			/>
			<p class="tit">예상 시공 견적가를 알려드립니다.</p>
			<v-row
				v-if="HOME_GET_INTERIOR_ESTIMATE_SIMPLE_PRICE"
				class="ma-0"
			>
				<v-col
					cols="3"
					class="pa-0 type"
					align="start"
					>바닥재예상</v-col
				>
				<v-col
					cols="9"
					class="pa-0 price"
					align="end"
				>
					<div class="total">
						<strong>
							{{ (Number(simplePrices.est_cost_min) + Number(simplePrices.removal_cost)).toLocaleString('ko-KR') }}
							~
							{{ (Number(simplePrices.est_cost_max) + Number(simplePrices.removal_cost)).toLocaleString('ko-KR') }}
						</strong>
						<span>만원 (부가세 포함)</span>
					</div>
					<div class="etc">
						<span>
							제품견적 {{ simplePrices.est_cost_min }} ~ {{ simplePrices.est_cost_max }}만원 + 철거비
							{{ simplePrices.removal_cost }}만원
						</span>
					</div>
				</v-col>
			</v-row>

			<v-col
				cols="12"
				class="pa-4 pa-sm-5 notice"
				align="start"
			>
				<ul>
					<li>시공 환경에 따라 시공 비용 및 철거비가 변경될 수 있습니다.</li>
					<li>본 견적 금액은 참고용입니다. 시공지 상황, 인건비, 시공방법 등에 따라 금액이 달라질 수 있습니다.</li>
					<li>인테리어점에서 정확한 견적을 확인하고 시공할 수 있습니다.</li>
				</ul>
			</v-col>

			<v-row
				class="ma-0"
				justify="center"
			>
				<v-col
					cols="4"
					class="pa-0"
				>
					<div class="ma-0 ma-sm-1">
						<CommonButtonsButton01
							name="견적 초기화"
							color="#5f6062"
							class-name="font_14 edge btn_option"
							height="50"
							@click="$emit('reset')"
						/>
					</div>
				</v-col>
				<v-col
					cols="4"
					class="pa-0"
				>
					<div class="ma-0 ma-sm-1">
						<CommonButtonsButton01
							name="견적상담 의뢰"
							color="#42883d"
							class-name="font_14 edge btn_option"
							height="50"
							@click="goToInquire"
						/>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import ad_kakao from '@/mixins/ad/kakao'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HomeInteriorPriceReceipt',
	mixins: [common, ad_kakao, ad_mobion],
	data: () => ({}),
	computed: {
		...mapGetters(['HOME_GET_INTERIOR_ESTIMATE_SIMPLE_PRICE']),
		currentPath() {
			return this.common_recentlyRouterPath === '/interior/price/inquire' ? 'components' : 'page'
		},
		simplePrices() {
			return this.HOME_GET_INTERIOR_ESTIMATE_SIMPLE_PRICE
		},
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_ESTIMATE_SIMPLE_PRICE', 'HOME_MU_INTERIOR_SELECT_PRICE']),
		goToInquire() {
			this.HOME_MU_INTERIOR_SELECT_PRICE(this.simplePrices)
			if (this.currentPath === 'page') {
				// google analytics
				window.gtag('event', 'click_inquire_button', { button_location: 'interior_price' })
				// ad_kakao addToCart
				this.ad_kakao_addToCart(null, 'click_inquire_button_ip')
				// ad_mobion click
				this.ad_mobion_click_convertion('click_inquire_button_ip')

				this.$router.push('/interior/price/inquire').catch(() => {})
			}
		},
	},
}
</script>

<style scoped lang="scss">
.receipt {
	background-color: #f1f2f3;
	.v-image {
		margin-bottom: 10px;
	}
	.tit {
		margin-bottom: 40px !important;
		font-family: 'NotoSansKR-Bold';
		font-size: 20px;
	}
	.type {
		font-family: 'NotoSansKR-Bold';
		font-size: 16px;
	}
	.price {
		font-family: 'NotoSansKR-Regular';
		font-size: 26px;
		span {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px;
		}
	}
	.etc {
		margin-top: -10px;
		span {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px;
		}
	}
	.notice {
		margin: 32px 0;
		background-color: #fff;
		ul {
			padding: 0;
			li {
				position: relative;
				padding-left: 10px;
				margin-bottom: 3px;
				font-family: 'NotoSansKR-Regular';
				font-size: 13px;
				color: #333;
				list-style: none;
				&:last-child {
					margin-bottom: 0;
				}
				&::before {
					display: block;
					position: absolute;
					top: 2px;
					left: 0;
					content: '*';
				}
			}
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.receipt {
		.v-image {
			width: 24px !important;
		}
		.tit {
			margin-bottom: 32px !important;
			font-size: 16px !important;
		}
		.type {
			font-size: 14px;
		}
		.price {
			font-size: 20px !important;
			span {
				font-size: 16px !important;
			}
		}
		.etc {
			margin-top: -10px;
			span {
				font-size: 12px !important;
			}
		}
		.notice {
			margin: 30px 0 20px !important;
			ul {
				li {
					padding-left: 8px !important;
					font-size: 12px !important;
				}
			}
		}
		.btn_option {
			height: 40px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.receipt {
		.v-image {
			width: 24px !important;
		}
		.tit {
			margin-bottom: 32px !important;
			font-size: 16px !important;
		}
		.type {
			font-size: 14px;
		}
		.price {
			font-size: 20px !important;
			span {
				font-size: 16px !important;
			}
		}
		.etc {
			margin-top: -10px;
			span {
				font-size: 12px !important;
			}
		}
		.notice {
			margin: 30px 0 20px !important;
			ul {
				li {
					padding-left: 8px !important;
					font-size: 12px !important;
				}
			}
		}
		.btn_option {
			height: 40px !important;
		}
	}
}
</style>
