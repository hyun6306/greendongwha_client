<template>
	<div class="pl-0 pl-md-2 ma-5 ma-md-0 click_price_button_home click_price_button_fb">
		<v-col class="py-3 px-5 estimate">
			<p class="mb-3 tit tac">빠른견적 내기</p>
			<div
				class="d-flex align-content-space-between flex-wrap"
				style="height: 90%"
			>
				<v-col
					v-if="!checkResult"
					cols="12"
					class="py-0"
				>
					<p class="tac">단 세가지 항목으로 빠르게 견적을 확인해보세요.</p>
				</v-col>
				<v-col
					cols="12"
					class="py-0"
				>
					<p class="mb-1">주거유형</p>
					<CommonCardMenuTypeBtn03
						v-model="homeTypeModel1"
						class="fast"
						:type-items="homeTypeItems1"
						:cols="4"
					/>
				</v-col>
				<v-col
					cols="12"
					class="py-0"
				>
					<p class="mb-1">전용면적</p>
					<CommonSelectsSelect01
						v-if="HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA"
						v-model="widthModel"
						class="fast"
						label="선택해주세요"
						:items="HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA"
					/>
				</v-col>
				<v-col
					cols="12"
					class="py-0"
				>
					<p class="mb-1">제품</p>
					<CommonCardMenuTypeBtn03
						v-model="homeTypeModel2"
						class="fast"
						:type-items="homeTypeItems2"
						:cols="4"
					/>
				</v-col>
				<v-col
					class="py-0 layout_align"
					cols="5"
					:class="!checkResult ? 'mb-10' : ''"
				>
					<CommonButtonsButton01
						name="예상 견적 보기"
						color="#00582c"
						class-name="edge"
						height="36"
						@click="getSimpleEstimatePost"
					/>
				</v-col>
				<CommonLoaderLine01 v-if="loading" />
				<v-col
					v-if="checkResult && !loading"
					cols="12"
					class="pa-0"
				>
					<v-row class="ma-0 py-2 px-4 cal">
						<v-col
							class="pa-0"
							cols="6"
						>
							<p class="tit">예상견적</p>
						</v-col>
						<v-col
							class="pa-0"
							cols="6"
							align="end"
						>
							<strong>{{ result.est_cost_min }}~{{ result.est_cost_max }}만원</strong>
							<p class="notice">*철거비용은 별도 입니다.</p>
						</v-col>
					</v-row>
					<v-col
						class="pa-0"
						cols="12"
						align="center"
					>
						<CommonButtonsButton02
							name="더 상세한 견적이 필요하신가요 〉"
							height="20"
							class-name="btn_more"
							color="#262626"
							to="/interior/price"
							text
						/>
					</v-col>
				</v-col>
			</div>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ad_kakao from '@/mixins/ad/kakao'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HomeMainEstimate',
	mixins: [ad_kakao, ad_mobion],
	props: ['floating'],
	data: () => ({
		homeTypeModel1: 0,
		homeTypeModel2: 0,
		widthModel: {
			exclusive_area: '33',
			py_area: '10',
			text: '10평 ( 33㎡ )',
		},
		homeTypeItems1: [
			{ title: '아파트', value: '아파트' },
			{ title: '오피스텔', value: '오피스텔' },
			{ title: '빌라/주택', value: '빌라/주택' },
		],
		homeTypeItems2: [
			{ title: '강마루', value: 'KC_00001' },
			{ title: '강화마루', value: 'KC_00002' },
			{ title: '원목마루', value: 'KC_00003' },
		],
		result: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA']),
		checkResult() {
			return Object.keys(this.result).length > 0
		},
	},
	created() {
		this.getData()
	},
	mounted() {
		if (this.floating) console.log('floating on')
		else console.log('floating off')
	},
	methods: {
		...mapActions(['HOME_ACT_SIMPLE_ESTIMATE', 'HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA']),
		async getData() {
			if (this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA === null) await this.HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA() // 평수
		},
		async getSimpleEstimatePost() {
			let gaTag = `home`
			let kakaoTag = `click_price_button_home`
			let mobionTag = `click_price_button_home`

			if (this.floating !== undefined) {
				gaTag = `floating_bar`
				kakaoTag = `click_price_button_fb`
				mobionTag = `click_price_button_fb`
			}

			// google analytics
			window.gtag('event', 'click_price_button', { button_location: gaTag })
			// ad_kakao click
			this.ad_kakao_clickScript(null, kakaoTag)
			// ad_mobion click
			this.ad_mobion_click_convertion(mobionTag)

			this.loading = true
			const params = {
				housetype: this.homeTypeItems1[this.homeTypeModel1].value,
				exclusive_area: this.widthModel.exclusive_area,
				kind_code: this.homeTypeItems2[this.homeTypeModel2].value,

				buildscope: '집전체',
				veranda_yn: 'N',
				removal_yn: 'N',
			}

			console.log(params)
			try {
				// 빠른견적
				await this.HOME_ACT_SIMPLE_ESTIMATE(params).then(res => {
					// 너무 빠른 조회로 로딩시간 보이게 수정
					setTimeout(() => {
						this.loading = false
						this.result = res
					}, 500)
					console.log('HOME_ACT_SIMPLE_ESTIMATE', res)
				})
			} catch (e) {
				this.loading = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.estimate {
	width: 100%;
	height: 440px;
	background-color: #fff;
	border-radius: 10px;
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 20px !important;
		color: #262626;
	}
	.cal {
		background-color: #f5f5f5;
		border-radius: 10px;
		color: #262626;
		.tit {
			font-family: 'NotoSansKR-Medium' !important;
			font-size: 14px !important;
		}
		strong {
			font-size: 18px !important;
		}
		.notice {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px !important;
		}
	}
}
</style>
