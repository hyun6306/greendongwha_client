<template>
	<div class="wrapper">
		<v-container fluid>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<h2 class="content_title">{{ common_title }}</h2>
			</v-col>

			<v-col class="pa-0">
				<!-- 견적안내 배너 -->
				<!-- 견적안내 배너 -->
				<div
					class="price_banner"
					align="center"
				>
					<div class="text">
						<v-icon>done</v-icon>
						<p>몇 가지 항목만 체크하고<br />바닥재 시공 상세 견적을 받아보세요</p>
					</div>
				</div>

				<v-col
					cols="12"
					lg="10"
					xl="9"
					class="pa-0 layout_align"
					align="center"
				>
					<!-- 견적입력 -->
					<!-- 견적입력 -->
					<HomeInteriorPriceInputs
						:reset="dataReset"
						@submit="submit"
					/>
				</v-col>

				<!-- 영수증 -->
				<!-- 영수증 -->
				<HomeInteriorPriceReceipt
					v-if="callBill"
					@reset="priceDataReset"
				/>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import common from '@/mixins/common'
import ad_naver from '@/mixins/ad/naver'

export default {
	name: 'HomeInteriorPrice',
	metaInfo: {
		title: '견적 내기 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '견적 내기 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '견적내기, 바닥재 시공, 바닥재 견적, 바닥재 시공 상세 견적, 인테리어 시공, 인테리어 시세, 인테리어 견적',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '몇 가지 항목만 체크하고 바닥재 시공 상세 견적을 받아보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/interior/price`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common, ad_naver],
	data: () => ({
		callBill: false,
		dataReset: false,
	}),
	computed: {},
	mounted() {
		// ad_naver page
		this.ad_naver_changeScript(2, 1)
	},
	destroyed() {},
	methods: {
		priceDataReset() {
			this.common_scrollToTop()
			this.callBill = false
			this.dataReset = true
		},
		submit() {
			this.callBill = true
			this.dataReset = false
		},
	},
}
</script>

<style scoped lang="scss">
.price_banner {
	position: relative;
	width: 100%;
	height: 140px;
	background: url('../../../assets/img/home/interior/img_banner_interior.jpg') no-repeat;
	background-position: center;
	.text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.v-icon {
			margin-bottom: 5px;
			color: #000;
		}
		p {
			min-width: 220px;
			font-family: 'NotoSansKR-Regular';
			font-size: 18px;
			color: #333;
			word-break: keep-all;
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.price_banner {
		height: 100px !important;
		.text {
			p {
				font-size: 15px !important;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.price_banner {
		height: 100px !important;
		.text {
			p {
				font-size: 15px !important;
			}
		}
	}
}
</style>
