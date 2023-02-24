<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			class="pa-0 bg_grey"
			cols="12"
		>
			<div class="wrapper">
				<v-row class="ma-0 py-0 py-md-5">
					<!-- 메인 비주얼이미지 슬라이드 -->
					<v-col
						class="pa-0"
						cols="12"
						md="8"
					>
						<div class="pr-0 pr-md-2">
							<v-col class="pa-0 visual_banner">
								<HomeMainCarousels
									:carousel-items="HOME_GET_MAIN_BANNER"
									height="440px"
								/>
							</v-col>
						</div>
					</v-col>

					<!-- 빠른견적내기 -->
					<v-col
						class="pa-0"
						cols="12"
						md="4"
					>
						<HomeMainEstimate />
					</v-col>
				</v-row>
			</div>
		</v-col>

		<!-- housewarming -->
		<HomeMainHousewarming />

		<v-col class="pa-0 card_group">
			<div class="wrapper px-5">
				<v-row class="ma-0">
					<!-- 베스트제품 -->
					<v-col
						class="pa-0"
						cols="12"
						sm="6"
						md="4"
					>
						<div class="mr-0 mr-sm-2">
							<HomeMainBest :items="HOME_GET_MAIN_BEST_PRODUCT" />
						</div>
					</v-col>

					<!-- 나만의제품 태그 추천-->
					<v-col
						class="pa-0 mt-4 mt-sm-0"
						cols="12"
						sm="6"
						md="4"
					>
						<div class="ml-0 ml-sm-2 mr-0 mr-md-2">
							<HomeMainTag :items="HOME_GET_MAIN_SEARCH_TAGS" />
						</div>
					</v-col>

					<!-- 인테리어점 찾기 -->
					<v-col
						class="pa-0 mt-4 mt-md-0"
						cols="12"
						md="4"
					>
						<div
							class="ml-0 ml-md-2 clickCursor"
							@click="onClickInterior"
						>
							<HomeMainFindStore :items="findStoreItems" />
						</div>
					</v-col>
				</v-row>

				<v-row class="ma-0 mt-3 mt-sm-4 mt-md-6">
					<!-- 품질보증 배너 -->
					<v-col
						class="pa-0"
						cols="12"
						md="6"
					>
						<div class="mr-0 mr-md-2 circle_wrap">
							<div class="circle" />
							<v-row class="ma-0 py-6 px-3 px-sm-11 banner_quality">
								<v-col
									class="pa-0"
									cols="9"
								>
									<p class="tit">품질보증 등록</p>
									<p class="desc mb-2">최대 10년 품질보증 서비스</p>
									<v-btn @click="$router.push('/custom/quality')"> 바로가기 </v-btn>
								</v-col>
								<v-col
									class="pa-0 tawr"
									cols="3"
								>
									<v-img
										:src="require('@/assets/img/home/custom/icon_10years.png')"
										eager
									/>
								</v-col>
							</v-row>
						</div>
					</v-col>

					<!-- 카달로그배너 -->
					<v-col
						class="pa-0 mt-3 mt-md-0"
						cols="12"
						md="6"
					>
						<div class="ml-0 ml-md-2 circle_wrap">
							<div class="circle" />
							<v-row class="ma-0 py-6 px-3 px-sm-11 banner_cadalog">
								<v-col
									class="pa-0"
									cols="9"
								>
									<p class="tit">온라인 카달로그</p>
									<p class="desc mb-2">동화의 전 제품을 만나보세요</p>
									<v-btn @click="$router.push('/site/catalog')"> 바로가기 </v-btn>
								</v-col>
								<v-col
									class="pa-0 tawr"
									cols="3"
								>
									<v-img
										:src="require('@/assets/img/home/main/icon_mag.png')"
										eager
									/>
								</v-col>
							</v-row>
						</div>
					</v-col>
				</v-row>
			</div>
		</v-col>

		<!-- 어떤제품을 찾으시나요? (바닥재 or 벽재) -->
		<v-col class="pa-0 my_product">
			<div class="wrapper px-5">
				<p class="title tac mb-4 mb-md-7">어떤제품을 찾으시나요?</p>
				<v-col
					cols="10"
					sm="6"
					md="3"
					class="pa-0 mb-3 mb-sm-9 mb-md-11 layout_align"
				>
					<CommonCardMenuTypeBtn02
						v-model="popularType"
						:type-items="popularTypeItems"
						:cols="6"
					/>
				</v-col>
				<v-col
					class="pa-0"
					cols="12"
				>
					<div class="tar">
						<v-btn
							class="pa-0"
							text
							@click="pushDwelling"
						>
							더보기 >
						</v-btn>
					</div>
					<div class="card_align">
						<CommonCardMenuGroup01
							v-if="selectPopularItems"
							menu-type="product"
							:card-menu="selectPopularItems"
							@submit="onClickProduct"
						/>
					</div>
				</v-col>
			</div>
		</v-col>

		<!-- 유튜브 -->
		<v-col class="pa-0 youtube">
			<div class="wrapper px-5">
				<p class="title tac mb-4 mb-md-7">영상으로 만나보는 동화마루 꿀팁</p>
				<v-col
					class="pa-0 mb-3 mb-sm-9 mb-md-11 tac"
					cols="12"
				>
					<v-btn
						target="_blank"
						href="https://www.youtube.com/channel/UChk6tpEqFFtBm_79Pr_pFaQ"
						elevation="0"
						class="btn_youtube"
					>
						<v-img
							:src="require('@/assets/img/home/main/icon_youtube_link.png')"
							eager
						/>
						동화자연마루 <span class="point">[마루.잘.알TV]</span>
					</v-btn>
				</v-col>

				<v-col
					class="pa-0"
					cols="12"
				>
					<div class="card_align">
						<CommonCardMenuGroup01
							v-if="videoItems"
							menu-type="video"
							:card-menu="videoItems"
						/>
					</div>
				</v-col>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import google_analytic from '@/mixins/google_analytic'

export default {
	name: 'HomeMain',
	metaInfo: {
		title: 'LIVE IN PRIDE | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: 'LIVE IN PRIDE | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 바닥재, 벽재, 도어, 몰딩, 주거용, 상업용, 나투스진, 집들이, 시공 사례, 빠른견적 내기',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '1948년 설립된 동화기업은 대한민국 No.1 목질 전문기업입니다. 당신의 행복한 내일을 만들겠습니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common, google_analytic],
	data: () => ({
		search: false,
		model: null,
		findStoreItems: null,

		popularType: 0,
		popularTypeItems: [{ title: '바닥재' }, { title: '벽재' }],
		popularItems: [],
		videoItems: [
			{
				title: '동화자연마루 | 5월 특별 이벤트',
				video: 'https://www.youtube.com/embed/KY96s8Or0ZQ',
			},
			{
				title: '리모델링 후 전진♥류이서 부부의 신혼집은 어떤 모습일까?',
				video: 'https://www.youtube.com/embed/yk0YcuBYIz4',
			},
			{
				title: '전진♥류이서 부부가 선택한 신혼집 안방 벽장재는?',
				video: 'https://www.youtube.com/embed/giP3gA-UYYE',
			},
			{
				title: '전진♥류이서 부부, 3D 시공사례로 인테리어 간접 체험!',
				video: 'https://www.youtube.com/embed/GRZrwM4kKDs',
			},
		],
	}),
	computed: {
		...mapGetters([
			'HOME_GET_MAIN_BANNER',
			'HOME_GET_MAIN_HOUSEWARMING_3D',
			'HOME_GET_MAIN_HOUSEWARMING_SPECIAL',
			'HOME_GET_MAIN_BEST_PRODUCT',
			'HOME_GET_MAIN_SEARCH_TAGS',
			'HOME_GET_MAIN_POPULAR_PRODUCT',
		]),
		selectPopularItems() {
			return this.HOME_GET_MAIN_POPULAR_PRODUCT[this.popularType]
		},
	},
	watch: {},
	async created() {
		if (this.HOME_GET_MAIN_BANNER?.length === 0) await this.getBannerList()
		if (this.HOME_GET_MAIN_HOUSEWARMING_3D?.length === 0) await this.getHousewarmingList()
		if (this.HOME_GET_MAIN_BEST_PRODUCT?.length === 0) await this.getBestProductList()
		if (this.HOME_GET_MAIN_SEARCH_TAGS?.length === 0) await this.getSearchProductList()
		if (this.HOME_GET_MAIN_POPULAR_PRODUCT?.length === 0) await this.getPopularProductList()
	},
	mounted() {
		console.log('HOME_GET_MAIN_BANNER', this.HOME_GET_MAIN_BANNER)
	},
	methods: {
		...mapActions([
			'HOME_ACT_MAIN_BANNER',
			'HOME_ACT_MAIN_HOUSEWARMING',
			'HOME_ACT_MAIN_BEST_PRODUCT',
			'HOME_ACT_MAIN_SEARCH_TAGS',
			'HOME_ACT_MAIN_POPULAR_PRODUCT',
		]),
		async getBannerList() {
			// main banner
			await this.HOME_ACT_MAIN_BANNER().then(res => {
				console.log('HOME_GET_MAIN_BANNER', res)
			})
		},
		async getHousewarmingList() {
			// 집들이
			await this.HOME_ACT_MAIN_HOUSEWARMING().then(res => {
				console.log('HOME_ACT_MAIN_HOUSEWARMING', res)
			})
		},
		async getBestProductList() {
			// 베스트 제품
			await this.HOME_ACT_MAIN_BEST_PRODUCT().then(res => {
				console.log('HOME_ACT_MAIN_BEST_PRODUCT', res)
			})
		},
		async getSearchProductList() {
			// 나만의 제품찾기 ( 태그 모음 )
			await this.HOME_ACT_MAIN_SEARCH_TAGS().then(res => {
				console.log('HOME_ACT_MAIN_SEARCH_TAGS', res)
			})
		},
		async getPopularProductList() {
			// 인기 제품 ( 바닥재 / 벽재 )
			await this.HOME_ACT_MAIN_POPULAR_PRODUCT().then(res => {
				console.log('HOME_ACT_MAIN_POPULAR_PRODUCT', res)
			})
		},
		onClickProduct(val) {
			console.log(val)
			this.common_link_pusher(val)
		},
		pushDwelling() {
			let link = '/product/dwelling'
			if (this.popularType === 1) link = '/product/dwelling?type=wall'
			this.$router.push(link).catch(() => {})
		},
		onClickInterior() {
			this.google_analytic_push_event('click_main_find_interior', { button_location: 'find_interior' })
			this.$router.push('/interior/store')
		},
	},
}
</script>

<style scoped lang="scss">
.bg_grey {
	background-color: #f1f2f3;
}

// 메인 비주얼이미지 슬라이드
.visual_banner {
	width: 100%;
	height: 440px;
	border-radius: 10px;
}

// 카드그룹
.card_group {
	padding: 0 0 68px !important;
}

// 품질보증 , 카달로그배너
.circle_wrap {
	overflow: hidden;
	position: relative;
	.circle {
		position: absolute;
		right: -225px;
		top: -20px;
		width: 400px;
		height: 400px;
		background-color: #fff;
		border-radius: 50%;
		opacity: 0.5;
	}
}
.banner_quality,
.banner_cadalog {
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 20px;
		color: #262626;
	}
	.desc {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px;
		color: #262626;
	}
	.v-image {
		width: 80px;
	}
	.v-btn {
		width: 70px;
		height: 25px;
		background-color: #42883d;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px;
		color: #fff;
		border-radius: 3px;
		box-shadow: none !important;
	}
}
.banner_quality {
	background-color: #dcede2;
}
.banner_cadalog {
	background-color: #f3ead8;
}

// 나만의제품찾기
.my_product {
	padding: 60px 0 !important;
	border-top: 1px solid #ccc;
	.title {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 28px;
	}
}

// 유튜브
.youtube {
	padding: 60px 0 !important;
	border-top: 1px solid #ccc;
	.title {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 28px;
	}
	.btn_youtube {
		width: 290px !important;
		height: 44px !important;
		border: 1px solid #ccc !important;
		border-radius: 0 !important;
		background-color: #fff !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 18px !important;
		.v-image {
			:deep(.v-image__image--cover) {
				background-size: initial;
			}
			min-width: 28px !important;
			width: 28px !important;
			height: 16px !important;
		}
		span.point {
			font-family: 'NotoSansKR-Bold' !important;
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
	.visual_banner {
		border-radius: 0 !important;
	}
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.visual_banner {
		border-radius: 0 !important;
	}
	.my_product {
		padding: 50px 0 !important;
	}
	.youtube {
		padding: 50px 0 !important;
	}
}
@media all and (max-width: 600px) {
	.visual_banner {
		border-radius: 0 !important;
	}
	.my_product {
		padding: 30px 0 !important;
	}
	.youtube {
		padding: 30px 0 !important;
	}
}
</style>
