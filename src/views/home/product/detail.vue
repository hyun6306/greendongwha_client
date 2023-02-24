<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<div align="center">
				<v-row class="ma-0 mt-0 mt-md-10">
					<v-col
						cols="12"
						md="6"
						align="start"
						class="pa-0 pr-0 pr-md-5"
					>
						<!-- detailImageItems -->
						<!-- detailImageItems -->
						<CommonCarousels
							:items="detailImageItems"
							class="detail"
						/>
						<p class="notice fl_half px-5 px-md-0 mt-2">* 실제 제품과 다소 차이가 있을 수 있습니다.</p>
					</v-col>
					<v-col
						cols="12"
						md="6"
						class="pa-5 pa-md-0 pl-md-5"
					>
						<!-- flagItems -->
						<!-- flagItems -->
						<CommonFlag :items="flagItems" />

						<p class="product_name mt-2 mt-sm-4">{{ productDetailTitle }}</p>

						<div class="breadcrumbs pa-3 mt-4 mb-4 mt-md-5 mb-md-8">
							<v-row
								class="ma-0"
								align="center"
							>
								<v-col
									cols="8"
									md="10"
									class="pa-0"
									align="start"
								>
									<v-row class="ma-0">
										<v-col
											v-for="(item, i) in productPathItems"
											:key="i"
											class="pa-0 pr-1 path"
											cols="auto"
										>
											<span v-if="item.trim().length"> {{ item }} ></span>
										</v-col>
										<v-col
											class="pa-0 path"
											cols="auto"
										>
											<strong>{{ productPattern }}</strong>
										</v-col>
									</v-row>
								</v-col>
								<v-col
									cols="4"
									md="2"
									class="pa-0 btn_area"
									align="end"
								>
									<CommonMenuMenu01
										:icon="'mdi-share-variant-outline'"
										:items="share_shareItems"
										@submit="onShare"
									/>
									<v-btn
										v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
										class="pa-0"
										@click="scrap_call"
									>
										<v-icon v-if="scrap_check === 'post'">mdi-bookmark-outline</v-icon>
										<v-icon v-else>mdi-bookmark</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</div>

						<!-- detail info -->
						<!-- detail info -->
						<HomeProductDetailInfo :items="productInfoItems" />

						<v-row class="ma-0 button_group justify-center">
							<v-col
								v-if="specialModel"
								cols="5"
								md="4"
								class="pa-0"
							>
								<div class="pa-0 mr-1">
									<CommonButtonsButton01
										name="특판문의"
										class-name="font_18 edge_8 olive fw_bold fl_half"
										height="58"
										to="/product/special"
									/>
								</div>
							</v-col>
							<v-col
								v-else
								cols="5"
								md="4"
								class="pa-0"
							>
								<div class="pa-0 mr-1">
									<CommonButtonsButton01
										name="견적상담 의뢰"
										class-name="font_18 edge_8 olive fw_bold fl_half"
										height="58"
										@click="pushInquire"
									/>
								</div>
							</v-col>

							<v-col
								v-if="catalogItem"
								cols="5"
								md="4"
								class="pa-0"
							>
								<div class="pa-0 ml-1">
									<CommonButtonsButton01
										outlined
										color="#000"
										name="카달로그"
										class-name="font_18 edge_8 fw_bold fl_half"
										height="58"
										@click="openCatalog(catalogItem.catalogue_url)"
									/>
								</div>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<!-- detail tags -->
				<!-- detail tags -->
				<HomeProductDetailTags :items="tagsItems" />

				<!-- quick tab -->
				<!-- quick tab -->
				<v-col class="mt-10 pa-0 fixed-tabs-bar">
					<CommonTabsTab02
						v-model="tab"
						:tab-items="tabItems"
						:cols="tabCols"
						@submit="moveScroll"
					/>
				</v-col>

				<!-- 3D 집들이 -->
				<!-- 3D 집들이 -->
				<HomeProductDetail3D
					v-if="main3DModel"
					id="house3d"
				/>

				<div id="detail">
					<!-- 제품 베너 -->
					<!-- 제품 베너 -->
					<HomeProductDetailBanner
						v-if="bannerItems"
						:items="bannerItems"
					/>

					<!-- 특장점 추가 이미지 -->
					<!-- 특장점 추가 이미지 -->
					<v-col
						v-show="bannerItems.image !== ''"
						cols="12"
						class="px-0"
					>
						<v-img
							:src="bannerItems.image"
							width="100%"
						/>
					</v-col>

					<!-- 10년 보장 -->
					<!-- 10년 보장 -->
					<HomeProductDetailGuarantee v-if="guaranteeModel" />

					<!-- 특장점 -->
					<!-- 특장점 -->
					<HomeProductDetailFeature
						v-if="featureItems.length"
						:items="featureItems"
					/>

					<!-- 제품구조 -->
					<!-- 제품구조 -->
					<HomeProductDetailStructure
						v-if="structureItems.length"
						:main-image="structureMainImage"
						:items="structureItems"
					/>

					<!-- 패턴정보 -->
					<!-- 패턴정보 -->
					<!-- subject_code != 'SC_00003' 도어몰딩일 경우 보여지지 않게 처리 -->
					<HomeProductDetailPattern
						v-if="patternItems.length && subject_code != 'SC_00003'"
						id="pattern"
						:items="patternItems"
					/>

					<!-- 인증 및 수상정보 -->
					<!-- 인증 및 수상정보 -->
					<HomeProductDetailCert
						v-if="certItems.length"
						:items="certItems"
					/>

					<!-- 그외 다른 정보들 -->
					<!-- door -->
					<div v-if="otherDoorItems.length">
						<div
							v-for="(item, i) in otherDoorItems"
							:key="i"
						>
							<HomeProductDetailOtherDoor
								v-if="item.items.length"
								:title="item.title"
								:items="item.items"
							/>
						</div>
					</div>
					<!-- etc -->
					<div v-if="otherItems.length">
						<div
							v-for="(item, i) in otherItems"
							:key="i"
						>
							<HomeProductDetailOther
								v-if="item.items.length"
								:title="item.title"
								:items="item.items"
							/>
						</div>
					</div>
					<!-- circle -->
					<div v-if="otherCircleItems.length">
						<div
							v-for="(item, i) in otherCircleItems"
							:key="i"
						>
							<HomeProductDetailOtherCircle
								v-if="item.items.length"
								:title="item.title"
								:items="item.items"
							/>
						</div>
					</div>
					<!-- hand -->
					<div v-if="otherHandItems.length">
						<div
							v-for="(item, i) in otherHandItems"
							:key="i"
						>
							<HomeProductDetailOtherHand
								v-if="item.items.length"
								:title="item.title"
								:items="item.items"
							/>
						</div>
					</div>
					<!-- rect -->
					<div v-if="otherRectItems.length">
						<div
							v-for="(item, i) in otherRectItems"
							:key="i"
						>
							<HomeProductDetailOtherRect
								v-if="item.items.length"
								:title="item.title"
								:items="item.items"
							/>
						</div>
					</div>

					<!-- 특판문의 -->
					<!-- 특판문의 -->
					<HomeProductDetailSpecial v-if="specialModel" />
				</div>

				<div id="product">
					<!-- 다른패턴 -->
					<!-- 다른패턴 -->
					<v-col
						v-if="recommendPatternItems.length"
						cols="12"
						align="center"
						class="mt-15"
					>
						<v-card class="feature_tit pb-3 mb-8">
							<p>다른패턴</p>
						</v-card>
						<v-col
							cols="11"
							md="12"
							class="pa-0"
						>
							<div class="card_align">
								<CommonCardMenuGroup03
									v-if="recommendPatternItems"
									:menu-type="'pattern'"
									:card-menu="recommendPatternItems"
									@submit="onClickSortItem"
								/>
							</div>
						</v-col>
					</v-col>

					<!-- 전문가 집들이 -->
					<!-- 전문가 집들이 -->
					<v-col
						v-if="recommendHouseItems.length"
						cols="12"
						align="center"
						class="mt-15"
					>
						<v-card class="feature_tit pb-3 mb-8">
							<p>전문가 집들이</p>
						</v-card>
						<v-col
							cols="11"
							md="12"
							class="pa-0"
						>
							<div class="card_align">
								<CommonCardMenuGroup03
									v-if="recommendHouseItems"
									:menu-type="'special'"
									:card-menu="recommendHouseItems"
									@submit="onClickSortItem"
								/>
							</div>
						</v-col>
					</v-col>

					<!-- 3D 집들이 -->
					<v-col
						v-if="recommend3DItems.length"
						cols="12"
						align="center"
						class="mt-15"
					>
						<v-card class="feature_tit pb-3 mb-8">
							<p>3D 집들이</p>
						</v-card>
						<v-col
							cols="11"
							md="12"
							class="pa-0"
						>
							<div class="card_align">
								<CommonCardMenuGroup03
									v-if="recommend3DItems"
									:menu-type="'3d'"
									:card-menu="recommend3DItems"
									@submit="onClickSortItem"
								/>
							</div>
						</v-col>
					</v-col>
				</div>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'
import share from '@/mixins/share'

export default {
	name: 'ProductDetail',
	metaInfo() {
		return {
			title: `${this.og_title}`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.og_title}`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: this.og_description,
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/product/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: this.og_image,
				},
				{
					vmid: 'keywords',
					property: 'keywords',
					content: `${this.productPathItems?.join(', ') || ''}`,
				},
			],
		}
	},
	mixins: [common, scrap, share],
	data: () => ({
		tooltipShow: false,
		shareBoxModel: false,
		productDetailTitle: '',
		productPattern: '',
		flagItems: [],
		productPathItems: [],
		productInfoItems: [],
		bannerItems: [],
		catalogItem: null,

		otherItems: [],
		otherDoorItems: [],
		otherCircleItems: [],
		otherHandItems: [],
		otherRectItems: [],

		patternItems: [],

		guaranteeModel: false,
		specialModel: false,
		main3DModel: false,
		recommendModel: false,
		recommendPatternItems: [],
		recommendHouseItems: [],
		recommend3DItems: [],
		detailImageItems: [],

		featureItems: [],
		structureMainImage: null,
		structureItems: [],
		certItems: [],

		tagsItems: [],
		tab: null,
		shortItems: [],
		originItem: null,

		og_title: '',
		og_image: '',
		og_description: '',

		share_title: null,
		subject_code: null,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE', 'HOME_GET_GET_PRODUCT_DETAIL_ITEMS']),
		getQuery() {
			return this.$route.params.id
		},
		tabItems() {
			let items = [{ title: '상세정보', value: 1 }]
			// 3D집들이가 있는 경우
			if (this.main3DModel) items.unshift({ title: '3D 집들이사례', value: 0 })

			// 제품 더 보기가 있는 경우
			if (this.recommendModel) items.push({ title: '제품 더 보기', value: 2 })

			return items
		},
		tabCols() {
			if (this.tabItems.length === 2) return 6
			else if (this.tabItems.length === 4) return 3
			else return 4
		},
	},
	watch: {
		getQuery() {
			this.getData()
		},
	},
	activated() {
		this.resetData()
	},
	created() {
		this.getData()
		console.log('getQuery', this.getQuery.id)
		window.addEventListener('scroll', this.handleScroll)
		console.log('HOME_GET_GET_PRODUCT_DETAIL_ITEMS', this.HOME_GET_GET_PRODUCT_DETAIL_ITEMS)
	},
	deactivated() {
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_PRODUCT']),
		...mapActions(['HOME_ACT_GET_PRODUCT_DETAIL_ITEMS']),
		handleScroll() {
			if (this.main3DModel) {
				const house3d = document.querySelector('#house3d')
				if (house3d.getBoundingClientRect().top - 120 < 0 && house3d.getBoundingClientRect().bottom > 0) {
					this.checkSection('house3d')
				}
			}

			const detail = document.querySelector('#detail')
			if (detail.getBoundingClientRect().top - 120 < 0 && detail.getBoundingClientRect().bottom > 0) {
				this.checkSection('detail')
			}

			if (this.recommendModel) {
				const product = document.querySelector('#product')
				if (product.getBoundingClientRect().top - 120 < 0 && product.getBoundingClientRect().bottom > 0) {
					this.checkSection('product')
				}
			}
		},
		checkSection(val) {
			let section
			switch (val) {
				case 'house3d':
					section = '3D 집들이사례'
					break
				case 'detail':
					section = '상세정보'
					break
				case 'product':
					section = '제품 더 보기'
					break
			}
			this.tab = this.tabItems.findIndex(item => item.title === section)
		},
		moveScroll(val) {
			let target
			// console.log('val', val)
			switch (val.title) {
				case '3D 집들이사례':
					// target = this.$refs.house3d
					target = '#house3d'
					break
				case '상세정보':
					// target = this.$refs.detail
					target = '#detail'
					break
				case '제품 더 보기':
					// target = this.$refs.pattern
					target = '#product'
					break
			}
			this.$vuetify.goTo(target, {
				duration: 1200,
				offset: 50,
			})
		},
		async getData() {
			await this.HOME_ACT_GET_PRODUCT_DETAIL_ITEMS(this.getQuery).then(res => {
				this.originItem = res
				console.log('originItem', this.originItem)
				this.parseData(res)
			})
		},
		parseData(res) {
			console.log('res', res)
			if (res == null) return

			// 품목 코드 확인
			this.subject_code = res.subject_code

			// 메인 이미지
			if (res.images_url.length > 0) {
				this.detailImageItems = []
				res.images_url.forEach(element => {
					this.detailImageItems.push({ src: element })
				})
			} else {
				this.detailImageItems = [{ src: require('@/assets/img/etc/no_image.jpg') }]
			}

			// catalog
			this.catalogItem = res.catalogue?.length ? res.catalogue[0] : null

			// tagsItems
			if (res.tags.length > 0) {
				this.tagsItems = []
				this.tagsItems = res.tags
				// res.tags.forEach(element => {
				//     this.tagsItems.push(`#${element}`)
				// })
			}

			// 제품 title
			this.productDetailTitle = `${res.brand_name} ${res.goods_name} ${res.pattern_name}`

			// flagItems
			this.flagItems = {
				popitem_yn: res.popitem_yn,
				new_yn: res.new_yn,
			}

			// 제품 path
			this.productPathItems =
				res.goods_name === ''
					? [`${res.subject_name}`, `${res.kind_name}`, `${res.brand_name}`]
					: [`${res.subject_name}`, `${res.kind_name}`, `${res.brand_name}`, `${res.goods_name}`]

			// 제품 패턴
			this.productPattern = `${res.pattern_name}`

			// productInfoItems
			this.productInfoItems = [
				{
					title: '종류',
					text: res.kind_name,
					tooltip: res.tooltip,
				},
				{
					title: '브랜드',
					text: res.brand_name,
				},
				{
					title: '패턴',
					text: res.pattern_name,
				},
				{
					title: '규격',
					text: res.code_name,
				},
				{
					title: '제품설명',
					text: res.description,
				},
			]

			// ogtag
			this.og_title = `${res.brand_name} ${res.goods_name} ${res.pattern_name}ㅣ동화자연마루`
			this.og_description = res.description
			this.og_image = this.detailImageItems[0].src

			this.share_title = `${res.brand_name} ${res.goods_name}`

			// 제품 베너
			this.bannerItems = {
				mainImage: require('@/assets/img/product/banner_01.png'),
				slogan: res.title,
				title: `${res.brand_name} ${res.goods_name}`,
				description: res.description,
				image: res.banner_url,
			}

			// 특장점 / 구조 / 인증데이터 확인
			if (res.common_codes?.length > 0) {
				let common_code = [...res.common_codes]
				console.log('common_code', common_code)

				// 특장점
				const feature = common_code.find(item => item.code === 'CC_101_001') || null
				if (feature !== null) {
					this.featureItems = []
					res.goods_detail
						.filter(items => items.type_code === feature.code)
						.forEach(element => {
							this.featureItems.push({
								mainImage: element.thumbnail_url,
								title: element.title,
								text: element.description,
								subImage: element.image_url,
							})
						})
					// 짝수개 맞춤 ( UI 통일성을 위해 )
					if (this.featureItems.length % 2 > 0)
						this.featureItems.push({
							mainImage: null,
							title: null,
							text: null,
							subImage: null,
						})
					common_code.splice(common_code.indexOf(feature), 1)
				}
				// 구조
				const structure = common_code.find(item => item.code === 'CC_101_002') || null
				if (structure !== null) {
					this.structureItems = []
					res.goods_detail
						.filter(items => items.type_code === structure.code)
						.forEach(element => {
							this.structureItems.push({
								title: element.title,
								text: element.description,
							})
							if (element.image_url !== null) this.structureMainImage = element.image_url
						})
					// 짝수개 맞춤 ( UI 통일성을 위해 )
					if (this.structureItems.length % 2 > 0)
						this.structureItems.push({
							title: null,
							text: null,
						})
					common_code.splice(common_code.indexOf(structure), 1)
				}
				console.log('common_code', common_code)

				// 인증
				const cert = common_code.find(item => item.code === 'CC_101_003') || null
				if (cert !== null) {
					this.certItems = []
					res.goods_detail
						.filter(items => items.type_code === cert.code)
						.forEach(element => {
							this.certItems.push({
								image: element.thumbnail_url,
								text: element.description,
							})
						})
					common_code.splice(common_code.indexOf(cert), 1)
				}
				console.log('common_code', common_code)

				// 그외 다른 items
				if (common_code.length > 0) {
					this.otherItems = []
					this.otherDoorItems = []
					this.otherCircleItems = []
					this.otherHandItems = []
					this.otherRectItems = []
					common_code.forEach(element => {
						let item = {
							title: element.code_name,
							items: [],
						}
						res.goods_detail
							.filter(items => items.type_code === element.code)
							.forEach(element => {
								let goods_item = {
									image: element.thumbnail_url,
									title: element.title,
									text: element.description,
								}
								item.items.push(goods_item)
							})
						// 도어종류
						if (element.code === 'CC_101_004') this.otherDoorItems.push(item)
						// 유리
						else if (element.code === 'CC_101_007') this.otherCircleItems.push(item)
						// 손잡이
						else if (element.code === 'CC_101_008') this.otherHandItems.push(item)
						// PVC  // 운영타입
						else if (element.code === 'CC_101_009' || element.code === 'CC_101_010') this.otherRectItems.push(item)
						// 그외
						else this.otherItems.push(item)
					})
				}
			}

			// 패턴 종류
			if (res.otherPatterns?.length > 0) {
				this.patternItems = []
				res.otherPatterns.forEach(element => {
					this.patternItems.push({
						image: element.pattern_url,
						text: `${element.pattern_name}`,
						// text: `${element.pattern_name} (${element.pattern_engname})` 영문과 함께 표시
					})
				})

				// 다른제품
				this.recommendPatternItems = []
				res.otherPatterns.forEach(element => {
					this.recommendPatternItems.push({
						id: element.product_id,
						image: element.pattern_url,
						features: `${res.kind_name}`,
						title: `${res.brand_name} ${res.goods_name} ${element.pattern_name}`,
					})
				})
			}

			// 10년 보증서비스 on off
			this.guaranteeModel = res.guarantee_year === '10'

			// 특판 노출 on off
			this.specialModel = res.specialadd_yn === 'Y'

			// 3D 노출 on off
			this.main3DModel = res.d3d_Image_url?.length > 0

			// 제품 더 보기
			if (res.otherPatterns.length !== 0 || res.otherHousewarming.length !== 0 || res.otherExphousewarming.length !== 0) {
				this.recommendModel = true
				console.log('this.recommendPatternItems', this.recommendPatternItems)
			}

			// 전문가 집들이
			if (res.otherExphousewarming.length > 0) {
				this.recommendHouseItems = []
				res.otherExphousewarming.forEach(element => {
					this.recommendHouseItems.push({
						id: element.exphw_id,
						image: element.image_url,
						features: `전문가 집들이`,
						title: `${element.title}`,
						text: `${element.address1} ${element.address2}`,
						path: `${element.business_name}`,
					})
				})
			}

			// 3D 집들이
			if (res.otherHousewarming.length > 0) {
				this.recommend3DItems = []
				res.otherHousewarming.forEach(element => {
					this.recommend3DItems.push({
						id: element.hw_id,
						image: element.image_url,
						features: `3D 집들이`,
						title: `${element.title}`,
						path: `${element.spacious}`,
					})
				})
			}
		},
		pushInquire() {
			// 추가입력사항
			let item = this.originItem
			item.type = '상품마스터'
			item.contents = {
				id: this.getQuery,
				name: `${this.originItem.brand_name} ${this.originItem.goods_name} ${this.originItem.pattern_name}`,
			}
			item.image = this.originItem.images_url[0]

			this.HOME_MU_INTERIOR_SELECT_PRODUCT(item)
			this.$router.push('/interior/price/inquire').catch(() => {})
		},
		onClickSortItem(item) {
			switch (item.features) {
				case '전문가 집들이':
					this.$router.push(`/housewarming/specialist/detail/${item.id}`).catch(() => {})
					break
				case '3D 집들이':
					this.$router.push(`/housewarming/3d/detail/${item.id}`).catch(() => {})
					break
				default:
					// 다른 제품
					this.$router.push(`/product/detail/${item.id}`).catch(() => {})
					break
			}
		},
		onShare(item) {
			const productItem = {
				title: this.share_title,
				description: this.og_description,
				image: this.og_image,
			}
			this.share_operator(item, productItem)
		},
		openCatalog(url) {
			window.open(url, '_blank')
		},
		resetData() {
			this.tooltipShow = false
			this.shareBoxModel = false
			this.productDetailTitle = ''
			this.productPattern = ''
			this.flagItems = []
			this.productPathItems = []
			this.productInfoItems = []
			this.bannerItems = []
			this.catalogItem = null
			this.otherItems = []
			this.otherDoorItems = []
			this.otherCircleItems = []
			this.otherHandItems = []
			this.otherRectItems = []
			this.patternItems = []
			this.guaranteeModel = false
			this.specialModel = false
			this.main3DModel = false
			this.recommendModel = false
			this.recommendPatternItems = []
			this.recommendHouseItems = []
			this.recommend3DItems = []
			this.detailImageItems = []
			this.featureItems = []
			this.structureMainImage = null
			this.structureItems = []
			this.certItems = []
			this.tagsItems = []
			this.tab = null
			this.shortItems = []
			this.originItem = null
			this.og_title = null
			this.og_image = null
			this.og_description = null
			this.share_title = null
			this.subject_code = null
		},
	},
}
</script>

<style scoped lang="scss">
.fixed-tabs-bar {
	position: -webkit-sticky;
	position: sticky;
	top: 56px;
	z-index: 2;
	background-color: #fff;
}
.mo_only {
	display: none !important;
}

.notice {
	color: #000 !important;
	font-family: 'NotoSansKR-Light' !important;
	font-size: 12px !important;
}
.product_name {
	text-align: start;
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 26px !important;
}
.breadcrumbs {
	position: relative;
	border: 1px solid #ccc;
	border-radius: 10px;
	.path {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 16px;
	}
	.btn_area {
		position: relative;
		.share_box {
			width: 92px;
			position: absolute;
			right: 0px;
			bottom: -110px;
			background-color: #fff;
			border: 1px solid #42883d;
			padding: 5px 0;
			border-radius: 10px;
			p {
				font-family: 'NotoSansKR-Light' !important;
				font-size: 13px;
				padding: 0 10px;
				&:hover {
					color: #fff !important;
					background-color: #42883d !important;
				}
			}
		}
	}

	.v-btn {
		box-shadow: none !important;
		min-width: 40px !important;
		height: 40px !important;
		padding: 0 !important;
		background-color: #fff !important;
		.v-icon {
			color: #414141 !important;
		}
		&:hover {
			color: #fff !important;
			background-color: #42883d !important;
			.v-icon {
				color: #fff !important;
			}
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.notice {
		text-align: right;
	}
	.product_name {
		font-size: 18px !important;
	}
	.breadcrumbs {
		.path {
			font-size: 12px;
		}
		.v-btn {
			min-width: 30px !important;
			height: 30px !important;
		}
	}
	.button_group {
		.v-btn {
			:deep(.v-btn__content) {
				font-size: 14px !important;
			}
			padding: 0 !important;
			height: 40px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.pc_only {
		display: none !important;
	}
	.mo_only {
		display: block !important;
	}

	.notice {
		text-align: right;
	}
	.product_name {
		font-size: 18px !important;
	}
	.breadcrumbs {
		border: none !important;
		border-radius: 0 !important;
		padding: 0 !important;
		padding-top: 10px !important;
		border-top: 1px solid #ccc !important;

		.path {
			font-size: 12px;
		}
		.v-btn {
			min-width: 30px !important;
			height: 30px !important;
		}
	}
	.button_group {
		.v-btn {
			:deep(.v-btn__content) {
				font-size: 12px !important;
			}
			padding: 0 !important;
			height: 40px !important;
		}
	}
}
</style>
