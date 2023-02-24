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
				cols="12"
				class="pa-0 px-5 px-md-0 mt-7 mt-md-10 contents_table layout_align"
			>
				<!-- 제목 -->
				<HomeHousewarmingHeader :items="house3dItem" />

				<!-- 컨텐츠 -->
				<v-col
					cols="12"
					class="body pa-0 pt-7 pt-md-11"
					align="center"
				>
					<v-col class="pa-0 editor_content">
						<!-- 사례 정보 -->
						<HomeHousewarmingInfoBox :items="house3dItem" />

						<!-- 비주얼영역 -->
						<!--<v-img
							eager
							width="100%"
							:src="house3dItem.image"
						/>-->

						<!-- 3D집들이 지원 -->
						<HomeProductDetail3D
							:image="house3dItem.image"
							:link="house3dItem.image_3durl"
						/>

						<!-- 키워드 태그영역 -->
						<HomeProductDetailTags
							:items="house3dItem.tags"
							class="tag_area bg_tr"
						/>

						<CommonButtonsButton02
							name="견적상담 의뢰"
							class-name="btn_large"
							color="#42883d"
							@click="goToInquire"
						/>

						<!-- 에디터 영역 입니다 -->
						<v-card
							v-if="house3dItem.description"
							width="100%"
							min-height="500"
							elevation="0"
							class="ma-0 pa-0 mb-5"
						>
							<CommonEditorQuillViewerTile
								class="py-10"
								:html="house3dItem.description"
							/>
						</v-card>

						<!-- 3D 집들이 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0 pt-5"
						>
							<v-card class="feature_tit bc_tr mb-8">
								<p>3D 집들이</p>
							</v-card>
							<v-col
								cols="11"
								md="12"
								class="pa-0"
							>
								<div class="card_align">
									<CommonCardMenuGroup03
										:menu-type="'3d'"
										:card-menu="house3dShortItems"
										@submit="onClickPushLink"
									/>
								</div>
							</v-col>
						</v-col>

						<!-- 전문가 집들이 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0 pt-5 mt-5"
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
	name: 'Housewarming3DDetail',
	metaInfo() {
		return {
			title: `${this.house3dItem.title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.house3dItem.title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '진짜 집에 온것 처럼 720˚ VR 3D집들이를 떠나보세요.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/housewarming/3d`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.house3dItem.image}`,
				},
			],
		}
	},
	mixins: [common, ad_kakao, ad_naver, ad_mobion],
	data: () => ({
		house3dItem: {},
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
		this.ad_kakao_pageScript('3d_detail')
		// ad_naver page
		this.ad_naver_changeScript(3, 1)
		// ad_mobion page
		this.ad_mobion_page_convertion('page_view_3d_detail')
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_PRODUCT']),
		...mapActions(['HOME_ACT_GET_PRODUCT_ITEMS', 'HOME_ACT_HOUSEWARMING_HOUSE_3D', 'HOME_ACT_HOUSEWARMING_SPECIAL']),
		async getData() {
			this.loading = true
			// 3D집들이 상세 정보
			await this.HOME_ACT_HOUSEWARMING_HOUSE_3D({ method: 'detail', query: this.getQuery })
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
			let parser = JSON.parse(JSON.stringify(data[0]))

			parser.image = parser.image_url ? parser.image_url : require('@/assets/img/product/img_3d.jpg')
			parser.store = parser.business_name

			console.log('parser', parser)

			this.house3dItem = parser
		},
		async goToInquire() {
			// 메인 제품 list에서 선택 상품 찾기
			if (this.HOME_GET_GET_PRODUCT_ITEMS.length === 0) await this.HOME_ACT_GET_PRODUCT_ITEMS({})
			let item = this.HOME_GET_GET_PRODUCT_ITEMS.find(item => item.goods_code === this.house3dItem.goods_code)

			// 추가입력사항
			item.type = '3D집들이관리'
			item.contents = {
				name: this.house3dItem.title,
				id: this.getQuery,
			}

			this.HOME_MU_INTERIOR_SELECT_PRODUCT(item)
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
</style>
