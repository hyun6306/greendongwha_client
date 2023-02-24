<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-row
				v-if="loading"
				class="ma-0 loading_area"
			>
				<v-col
					class="pa-0"
					cols="12"
				>
					<CommonLoaderCircle01 />
				</v-col>
			</v-row>
			<v-col
				v-else
				class="pa-0 px-5 px-md-0 mt-7 mt-md-10 contents_table layout_align"
				cols="12"
			>
				<!-- 제목 -->
				<!-- 제목 -->
				<HomeHousewarmingHeader :items="specialItem" />

				<!-- 컨텐츠 -->
				<v-col
					class="body pa-0 pt-7 pt-md-11"
					cols="12"
					align="center"
				>
					<v-col class="pa-0 editor_content">
						<v-row class="ma-0">
							<v-col
								class="pa-0"
								cols="12"
								md="6"
							>
								<!-- 사례 정보 -->
								<HomeHousewarmingInfoBox
									class="mr-1"
									:items="specialItem"
								/>
							</v-col>

							<v-col
								class="pa-0"
								cols="12"
								md="6"
							>
								<!-- 업체 정보 -->
								<HomeHousewarmingInfoBoxStore
									class="ml-1"
									:items="specialItem"
								/>
							</v-col>
						</v-row>

						<!-- 비주얼영역 -->
						<v-img
							eager
							width="100%"
							:src="specialItem.image"
						/>

						<!-- 키워드 태그영역 -->
						<HomeProductDetailTags
							v-if="specialItem.tags"
							:items="specialItem.tags"
							class="tag_area bg_tr"
						/>

						<CommonButtonsButton02
							v-if="specialItem.corporate_no !== '1378102333'"
							name="견적상담 의뢰"
							class-name="btn_large mb-16"
							color="#42883d"
							@click="goToInquire"
						/>

						<!-- 에디터 영역 입니다 -->
						<v-card
							v-if="specialItem.description"
							width="100%"
							min-height="500"
							elevation="0"
							class="ma-0 pa-0 mb-5"
						>
							<CommonEditorQuillViewerTile
								class="py-10"
								:html="specialItem.description"
							/>
						</v-card>
						<!-- e : [확인사항] 에디터 편집영역 입니다 -->

						<!-- 전문가 집들이 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0"
						>
							<v-card class="feature_tit bc_tr mb-8">
								<p>전문가 집들이</p>
							</v-card>
							<v-col
								cols="11"
								md="12"
								class="pa-0"
							>
								<div class="card_align">
									<CommonCardMenuGroup03
										v-if="specialShortItems"
										:menu-type="'special'"
										:card-menu="specialShortItems"
										@submit="onClickPushLink"
									/>
								</div>
							</v-col>
						</v-col>
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import ad_kakao from '@/mixins/ad/kakao'
import ad_naver from '@/mixins/ad/naver'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HousewarmingSpecialDetail',
	metaInfo() {
		return {
			title: `${this.specialItem.title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					title: `${this.specialItem.title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루를 활용한 전문가 시공사례를 확인해보세요.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/housewarming/specialist/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.specialItem.image}`,
				},
			],
		}
	},
	mixins: [common, ad_kakao, ad_naver, ad_mobion],
	data: () => ({
		specialItem: {},
		house3dShortItems: [],
		specialShortItems: [],
		loading: false,
	}),
	computed: {
		...mapGetters([
			// 제품 item
			'HOME_GET_GET_PRODUCT_ITEMS',
		]),
		getQuery() {
			return this.$route.params.id
		},
	},
	watch: {
		getQuery() {
			this.getData()
		},
	},
	created() {
		this.getData()
	},
	mounted() {
		// ad_kakao page
		this.ad_kakao_pageScript('specialist_detail')
		// ad_naver
		this.ad_naver_changeScript(4, 1)
		// ad_mobion page
		this.ad_mobion_page_convertion('page_view_specialist_detail')
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_PRODUCT', 'HOME_MU_INTERIOR_SELECT_INTERIOR']),
		...mapActions([
			'HOME_ACT_GET_PRODUCT_ITEMS',
			'HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM',

			'HOME_ACT_HOUSEWARMING_SPECIAL',
			'HOME_ACT_HOUSEWARMING_HOUSE_3D',
		]),
		async getData() {
			this.loading = true
			// 3D집들이 상세 정보
			await this.HOME_ACT_HOUSEWARMING_SPECIAL({ method: 'detail', query: this.getQuery })
				.then(res => {
					this.parseData(res)
				})
				.catch(() => {
					this.loading = false
				})
			// 3D집들이 간략정보
			await this.HOME_ACT_HOUSEWARMING_HOUSE_3D({ method: '3D_pop', query: this.getQuery })
				.then(res => {
					this.house3dShortItems = res
				})
				.catch(() => {
					this.loading = false
				})
			// 전문가집들이 간략정보
			await this.HOME_ACT_HOUSEWARMING_SPECIAL({ method: 'special_pop', query: this.getQuery })
				.then(res => {
					this.specialShortItems = res
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		parseData(data) {
			console.log('HOME_ACT_HOUSEWARMING_SPECIAL', data)
			let parser = JSON.parse(JSON.stringify(data[0]))

			parser.image = parser.image_url ? parser.image_url : require('@/assets/img/etc/img_house.jpg')
			parser.is_img = parser.image_url?.length

			console.log('parser', parser)

			this.specialItem = parser
		},
		async goToInquire() {
			// 제품 정보 등록
			// 메인 제품 list에서 선택 상품 찾기
			if (this.HOME_GET_GET_PRODUCT_ITEMS.length === 0) await this.HOME_ACT_GET_PRODUCT_ITEMS({})
			let product = this.HOME_GET_GET_PRODUCT_ITEMS.find(item => item.goods_code === this.specialItem.goods_code)

			if (product) {
				// 추가입력사항
				product.type = '전문가집들이관리'
				product.contents = {
					name: this.specialItem.title,
					id: this.getQuery,
				}
				this.HOME_MU_INTERIOR_SELECT_PRODUCT(product)
			}

			// 인테리어점 정보 등록
			const interiorGetData = await this.HOME_ACT_INTERIOR_GET_INTERIOR_DETAIL_ITEM(this.specialItem.corporate_no)
			let interior = interiorGetData[0]

			if (interior) {
				// 추가입력사항
				interior.type = '전문가집들이관리'
				interior.buildItems = interior.buildtype.map(x => x.code_name)
				this.HOME_MU_INTERIOR_SELECT_INTERIOR(this.specialItem)
			}

			// console.log('goToInquire', this.specialItem)
			// console.log('product', product)
			// console.log('interior', interior)

			this.$router.push('/interior/price/inquire').catch(() => {})
		},
		onClickPushLink(menu) {
			console.log('menu', menu)
			// 기본 3d
			let link = `/housewarming/3d/detail/${menu.hw_id}`
			if (menu.link === 'special') link = `/housewarming/specialist/detail/${menu.exphw_id}`

			this.$router.push(link).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.tag_area {
	margin: 0 !important;
}
.info_box {
	min-height: 245px;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.contents_table {
		.body {
			padding: 32px 0 !important;
		}
	}
}
@media all and (max-width: 380px) {
	.contents_table {
		.body {
			padding: 20px 0 !important;
		}
	}
}
</style>
