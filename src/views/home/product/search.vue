<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<!-- 동화자연마루 인기있는 제품 소개 -->
			<div class="my_product">
				<div class="dim" />
				<div class="wrapper">
					<p class="product_tit mb-5 mb-sm-6">동화자연마루의 가장 인기 있는 제품을 소개합니다</p>
					<v-col
						cols="12"
						md="6"
						lg="5"
						align="center"
						class="pa-0 mb-9 mb-md-6"
					>
						<CommonCardMenuTypeBtn04
							v-model="toggleProductPopType"
							:type-items="productTypePopItems"
						/>
					</v-col>
					<v-col
						cols="12"
						class="pa-0 px-5 px-lg-0"
					>
						<div class="card_align">
							<CommonCardMenuGroup01
								:menu-type="'product'"
								:card-menu="filterProductPopItems"
								@submit="onClickProduct"
							/>
						</div>
					</v-col>
				</div>
			</div>

			<div
				id="searchArea"
				class="wrapper px-5 px-lg-0"
			>
				<!-- 추천태그 검색하기 -->
				<p class="product_tit mb-5 mb-sm-6">간편하게 제품을 찾아보세요</p>
				<v-col
					class="pa-0"
					cols="12"
					sm="8"
					md="6"
				>
					<v-row
						class="ma-0"
						justify="end"
						align="center"
					>
						<v-text-field
							v-model="searchInput"
							label="검색어를 입력해주세요."
							clearable
							@keyup.enter="onSearchKeyboard"
						/>
						<v-btn
							icon
							class="mb-2"
							@click="onSearchKeyboard"
						>
							<v-icon>search</v-icon>
						</v-btn>
					</v-row>
				</v-col>
				<div class="search_tag">
					<HomeProductSearchBox01
						v-model="selectKindModel"
						:filter-kind-items="filterKindItems"
						:select-brand-product-list="selectBrandProductList"
						@select="activeProduct"
					/>
				</div>
				<v-row class="ma-0 py-3">
					<v-col
						class="pa-0 select_box_area"
						:cols="APP_GET_APP_WIDTH >= 600 ? 10 : 12"
					>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="toneCodeItems"
								v-model="models.toneModel"
								label="톤"
								:items="toneCodeItems"
							/>
						</div>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="styleCodeItems"
								v-model="models.styleModel"
								label="스타일"
								:items="styleCodeItems"
							/>
						</div>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="spaciousCodeItems"
								v-model="models.spaciousModel"
								label="평형"
								:items="spaciousCodeItems"
							/>
						</div>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="featureCodeItems"
								v-model="models.featureModel"
								label="제품특성"
								:items="featureCodeItems"
							/>
						</div>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="tagItems"
								v-model="models.tagModel"
								label="추천태그"
								:items="tagItems"
							/>
						</div>
					</v-col>

					<v-col
						v-if="APP_GET_APP_WIDTH >= 600"
						class="pa-0"
						:cols="APP_GET_APP_WIDTH >= 600 ? 2 : 0"
					>
						<v-col
							class="pa-0 mt-2 mt-sm-0 text-center text-sm-end"
							cols="auto"
						>
							<v-btn
								text
								@click="initialize"
							>
								<v-icon small>autorenew</v-icon>초기화
							</v-btn>
						</v-col>
					</v-col>
				</v-row>

				<v-row class="ma-0 pb-3">
					<CommonTagChipType01
						:items="filterItems"
						:cols="APP_GET_APP_WIDTH < 600 ? 10 : 12"
						@delete="removeModel"
					/>
					<v-col
						v-if="APP_GET_APP_WIDTH < 600"
						cols="2"
						class="pa-0"
					>
						<v-btn
							text
							@click="initialize"
						>
							<v-icon small>autorenew</v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<!-- 제품리스트 -->
				<v-col
					cols="12"
					align="center"
					class="pa-0 pt-3"
				>
					<v-col
						cols="12"
						class="pa-0"
					>
						<CommonTabsTab04
							id="searchList"
							v-model="tab"
							:class-name="'full_border'"
							:tab-items="tabItems"
						/>
					</v-col>

					<div class="card_align">
						<HomeProductSearchList
							v-model="tab"
							:items="filterShowItems"
						/>
					</div>
				</v-col>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeProductSearch',
	metaInfo: {
		title: '제품 찾기ㅣ동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '제품 찾기ㅣ동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 바닥재, 벽재, 도어, 몰딩, 주거용, 상세, 나만의 제품 찾기, 3D 집들이, 전문가 집들이',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 나만의 제품 찾기입니다. 추천 태그로 간편하게 원하는 제품을 찾아보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/product/search`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common],
	data: () => ({
		tab: 0,
		tabItems: [
			{ title: '전체', value: 0 },
			{ title: '제품', value: 1 },
			{ title: '3D 집들이', value: 2 },
			{ title: '전문가 집들이', value: 3 },
		],
		preSelectKindModel: 0,
		selectKindModel: 0,
		selectBrandModel: null,
		toggleProductPopType: 0,
		productTypePopItems: [
			{ title: '제품', value: 'master' },
			{ title: '3D집들이', value: 'housewarming' },
			{ title: '전문가 집들이', value: 'exphousewarming' },
		],
		toggleProductType: 0,
		productItems: [],

		searchInput: '',
		searchModel: '',
		models: {
			subjectModel: [],
			kindModel: [],
			brandModel: [],
			productModel: [],

			spaciousModel: [],
			familyModel: [],
			styleModel: [],
			toneModel: [],
			featureModel: [],
			formModel: [],
			tagModel: [],
		},

		spaciousCodeItems: [],
		familyCodeItems: [],
		styleCodeItems: [],
		toneCodeItems: [],
		featureCodeItems: [],
		formCodeItems: [],

		tagItems: [],
	}),
	computed: {
		...mapGetters([
			'APP_GET_PAGE_LOAD',
			'APP_GET_APP_STATE',
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT

			'HOME_GET_PRODUCT_SEARCH_KEYWORD', // 제품 검색 키워드

			'HOME_GET_TOTAL_PRODUCT_ITEMS', // 전체 제품 item
			'HOME_GET_GET_PRODUCT_POPULAR_ITEMS', // 인기 제품 item

			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS', // 종류 카테고리
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS', // 브랜드 카테고리
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS', // 제품 카테고리

			'ADMIN_GET_PRODUCT_TAG_ITEMS', // 태그
		]),
		selectBrandProductList() {
			let list = []
			if (this.selectKindModel === undefined) this.calSelectKindModel(this.preSelectKindModel)
			if (this.selectKindModel !== null) {
				if (!this.filterKindItems[this.selectKindModel]) this.calSelectKindModel(0)
				const brandItems = this.filterBrandItems.filter(
					x => x.kind_code === this.filterKindItems[this.selectKindModel].kind_code,
				)
				for (let i of brandItems) {
					const item = this.filterProductItems.filter(x => x.brand_code === i.brand_code)
					for (let n of item) {
						n.filter_title = `${n.brand_name} ${n.goods_name}`
						n.text = `${n.brand_name} ${n.goods_name}`
						n.active = this.models.productModel.filter(x => x.goods_code === n.goods_code).length > 0
						list.push(n)
					}
				}
			}
			return list
		},
		filterKindItems() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(x => x.use_yn === 'Y')
		},
		filterBrandItems() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(x => x.use_yn === 'Y')
		},
		filterProductItems() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(x => x.use_yn === 'Y')
		},
		filterProductPopItems() {
			const popType = this.productTypePopItems[this.toggleProductPopType].value
			return this.HOME_GET_GET_PRODUCT_POPULAR_ITEMS.filter(item => item.con_gubun === popType)
		},
        
		filterShowItems() {
			let searchItems,
				items = []

			// 검색어가 있을경우 검색어 검색 | 필터검색과 검색어 검색은 다르게 결과값 가져오기
			if (this.searchModel.trim().length) {
				// searchModel // 검색어와 함께 필터링
				searchItems = this.HOME_GET_TOTAL_PRODUCT_ITEMS.filter(item =>
					item.con_line2.replace(/ /g, '').toLowerCase().includes(this.searchModel.replace(/ /g, '').toLowerCase()),
				)
			} else {
				// 필터 검색
				// models 분류
				const kindItems = this.models.kindModel?.length
					? this.common_product_filter_code(
							this.models.kindModel,
							'kind_code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'kind_code',
					  )
					: []
				const brandItems = this.models.brandModel?.length
					? this.common_product_filter_code(
							this.models.brandModel,
							'brand_code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'brand_code',
					  )
					: []
				const productItems = this.models.productModel?.length
					? this.common_product_filter_code(
							this.models.productModel,
							'goods_code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'goods_code',
					  )
					: []
				// 공통코드
				const toneItems = this.models.toneModel?.length
					? this.common_product_filter_code(
							this.models.toneModel,
							'code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'tone_code',
					  )
					: []
				const styleItems = this.models.styleModel?.length
					? this.common_product_filter_code(
							this.models.styleModel,
							'code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'style_code',
					  )
					: []
				const spaciousItems = this.models.spaciousModel?.length
					? this.common_product_filter_code(
							this.models.spaciousModel,
							'code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'spacious_code',
					  )
					: []
				const featureItems = this.models.featureModel?.length
					? this.common_product_filter_code(
							this.models.featureModel,
							'code',
							this.HOME_GET_TOTAL_PRODUCT_ITEMS,
							'feature_code',
					  )
					: []
				// 태그
				const tagItems = this.models.tagModel?.length
					? this.common_product_filter_tag(this.models.tagModel, this.HOME_GET_TOTAL_PRODUCT_ITEMS)
					: []

				// item 병합
				const totalItems = [
					...kindItems,
					...brandItems,
					...productItems,
					...toneItems,
					...styleItems,
					...spaciousItems,
					...featureItems,
					...tagItems,
				]
				let set = new Set(totalItems)
				items = [...set]

				// filter 선택이 없는 경우 전체 item
				if (this.filterItems.length === 0) items = this.HOME_GET_TOTAL_PRODUCT_ITEMS
			}

			// result
			const resultItems = this.searchModel?.length ? searchItems : items

			return this.common_product_filter_items(resultItems)
		},
		filterItems() {
			const kind = this.models.kindModel?.length
				? this.models.kindModel.map(x => {
						return { text: x.text, type: 'kind', value: x.kind_code }
				  })
				: []
			const brand = this.models.brandModel?.length
				? this.models.brandModel.map(x => {
						return { text: x.text, type: 'brand', value: x.brand_code }
				  })
				: []
			const goods = this.models.productModel?.length
				? this.models.productModel.map(x => {
						return { text: x.text, type: 'goods', value: x.goods_code }
				  })
				: []
			const tone = this.models.toneModel?.length
				? this.models.toneModel.map(x => {
						return { text: x.text, type: 'tone', value: x.code }
				  })
				: []
			const style = this.models.styleModel?.length
				? this.models.styleModel.map(x => {
						return { text: x.text, type: 'style', value: x.code }
				  })
				: []
			const spacious = this.models.spaciousModel?.length
				? this.models.spaciousModel.map(x => {
						return { text: x.text, type: 'spacious', value: x.code }
				  })
				: []
			const feature = this.models.featureModel?.length
				? this.models.featureModel.map(x => {
						return { text: x.text, type: 'feature', value: x.code }
				  })
				: []
			const tag = this.models.tagModel?.length
				? this.models.tagModel.map(x => {
						return { text: x.text, type: 'tag', value: x.tag_id }
				  })
				: []

			return [...kind, ...brand, ...goods, ...tone, ...style, ...spacious, ...feature, ...tag]
		},
		getQuery() {
			return this.$route.query.type
				? {
						type: this.$route.query.type,
						id: this.$route.query.id,
				  }
				: null
		},
		getKeywords() {
			return this.$route.query.keyword || null
		},
		checkModels() {
			// models에 들어간 키워드 확인
			const checkValue = Object.keys(this.models)
			return checkValue.every(x => this.models[x].length === 0)
		},
	},
	watch: {
		tab() {
			this.common_moveScroll('#searchList')
		},
		getKeywords() {
			this.searchKeywordCheck()
		},
		getQuery(val) {
			if (val) {
				console.log('getSearchListItems_val', val)
				this.getSearchListItems(val)
				// 제품 종류 선택
				if (this.$route.query.kind) {
					this.selectKindModel = this.filterKindItems.findIndex(x => x.kind_code === this.$route.query.kind)
					console.log('selectKindModel', this.selectKindModel)
					// this.getSearchListItems({
					// 	type: 'kind',
					// 	id: this.$route.query.kind,
					// })
				}
			}
		},
		selectKindModel(val) {
			if (val) this.preSelectKindModel = val
		},
		searchModel(val) {
			// 검색어가 존재 | models 체크 요소가 있을경우 > models 초기화
			if (val.trim().length && !this.checkModels) this.resetData()
		},
		checkModels(val) {
			console.log('checkModels', val)
			// models 체크 요소가 있을경우 > 검색어 초기화
			if (!val) {
				this.searchModel = ''
				this.searchInput = ''
			}
		},
		filterItems(val) {
			if (val.length && this.APP_GET_APP_WIDTH < 960) this.common_scrollToRight('#tagArea')
		},
		APP_GET_PAGE_LOAD(val) {
			if (val && this.getKeywords) this.searchKeywordCheck()
		},
	},
	async created() {
		this.resetData()

		// 제품 List GET
		if (this.HOME_GET_GET_PRODUCT_POPULAR_ITEMS.length === 0) await this.HOME_ACT_GET_PRODUCT_POPULAR_ITEMS({ con_gubun: '' }) // 인기제품 item get
		if (this.HOME_GET_TOTAL_PRODUCT_ITEMS.length === 0) await this.HOME_ACT_TOTAL_PRODUCT_ITEMS({}) // 제품 list get

		// 필터 Item 가져오기
		// 종류 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length === 0) {
			await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2').then(() => {
				if (this.$route.query.kind) this.activeKind(this.$route.query.kind)
			})
		} else {
			if (this.$route.query.kind) this.activeKind(this.$route.query.kind)
		}
		// 브랜드 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3')
		// 제품 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.length === 0) {
			await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('4').then(() => {
				if (this.getQuery) this.getSearchListItems(this.getQuery)
			})
		} else {
			if (this.getQuery) this.getSearchListItems(this.getQuery)
		}

		// 평형코드 가져오기
		this.spaciousCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '902' })
		// 가족형태코드 가져오기
		this.familyCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '903' })
		// 스타일코드 가져오기
		this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
		// 톤코드 가져오기
		this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
		// 제품특성코드 가져오기
		this.featureCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '907' })
		// 형태코드 가져오기
		this.formCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '908' })

		// 태그 가져오기
		if (this.ADMIN_GET_PRODUCT_TAG_ITEMS.length === 0) {
			await this.ADMIN_ACT_PRODUCT_TAG_ITEMS({ method: 'getItems' }).then(() => {
				this.getTagSearchListItems()
			})
		} else {
			this.getTagSearchListItems()
		}
	},
	mounted() {
		// topbar 검색어 확인
		if (this.APP_GET_PAGE_LOAD) this.searchKeywordCheck()
		// query 정보 확인
		if (this.getQuery) this.common_moveScroll('#searchArea')
	},
	destroyed() {
		this.resetData()
		this.HOME_MU_PRODUCT_SEARCH_KEYWORD('')
	},
	methods: {
		...mapMutations(['HOME_MU_PRODUCT_SEARCH_KEYWORD']),
		...mapActions([
			'HOME_ACT_GET_PRODUCT_POPULAR_ITEMS',
			'HOME_ACT_TOTAL_PRODUCT_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			'ADMIN_ACT_PRODUCT_TAG_ITEMS',
		]),
		calSelectKindModel(val) {
			this.selectKindModel = val
		},
		activeKind(item) {
			this.selectKindModel = this.filterKindItems.findIndex(x => x.kind_code === item)
			console.log('calSelectKindModel', this.selectKindModel, item)
		},
		activeProduct(item) {
			// this.models.brandModel
			// console.log('item', item)
			const check = this.models.productModel.findIndex(x => x.goods_code === item.goods_code)
			// console.log('check', check)
			if (check > -1) this.models.productModel.splice(check, 1)
			else this.models.productModel.push(item)
		},
		searchKeywordCheck() {
			if (this.getKeywords) {
				// 키워드가 있다면 store에 검색키워드 저장 > URL keyword삭제
				this.HOME_MU_PRODUCT_SEARCH_KEYWORD(this.getKeywords)
				this.$toastr.info('키워드 검색', `${this.HOME_GET_PRODUCT_SEARCH_KEYWORD}를 검색하였습니다.`, { timeOut: 1000 })
				this.$router.replace('/product/search')
				this.keywordCheck()
				this.common_moveScroll('#searchArea')
			}
		},
		keywordCheck() {
			// 저장된 키워드 확인
			if (this.HOME_GET_PRODUCT_SEARCH_KEYWORD.trim().length) {
				this.searchInput = this.HOME_GET_PRODUCT_SEARCH_KEYWORD.trim()
				this.searchModel = this.HOME_GET_PRODUCT_SEARCH_KEYWORD.trim()
			} else {
				this.searchInput = ''
				this.searchModel = ''
			}
		},
		getSearchListItems(query) {
			console.log('getSearchListItems', query)
			// 검색코드 확인 >  검색태그 추가
			if (query && query.type !== 'tag') {
				let items
				let item_code
				let item_model

				switch (query.type) {
					case 'kind':
						items = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS
						item_code = 'kind_code'
						item_model = 'kindModel'
						break
					case 'brand':
						items = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS
						item_code = 'brand_code'
						item_model = 'brandModel'
						break
					case 'goods':
						items = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS
						item_code = 'goods_code'
						item_model = 'productModel'
						break
					case 'tone':
						items = this.toneCodeItems
						item_code = 'code'
						item_model = 'toneModel'
						break
					case 'style':
						items = this.styleCodeItems
						item_code = 'code'
						item_model = 'styleModel'
						break
					case 'spacious':
						items = this.spaciousCodeItems
						item_code = 'code'
						item_model = 'spaciousModel'
						break
					case 'feature':
						items = this.featureCodeItems
						item_code = 'code'
						item_model = 'featureModel'
						break
				}

				this.models[item_model] = []

				if (items.length) {
					const selectItem = items.find(x => x[item_code] === query.id)
					this.models[item_model].push(selectItem)
				}
			}
		},
		onClickProduct(val) {
			// console.log('onClickProduct',val)
			let link = ''
			switch (val.con_gubun) {
				case 'master':
					link = `/product/detail/${val.id}`
					break
				case 'housewarming':
					link = `/housewarming/3d/detail/${val.id}`
					break
				case 'exphousewarming':
					link = `/housewarming/specialist/detail/${val.id}`
					break
			}
			this.$router.push(link)
		},
		getTagSearchListItems() {
			this.tagItems = this.ADMIN_GET_PRODUCT_TAG_ITEMS.map(x => {
				return { text: x.tag_value, tag_id: x.tag_id }
			})

			if (this.getQuery && this.getQuery.type === 'tag') {
				// 태그 검색이 있는 경우
				this.models.tagModel = []
				if (this.ADMIN_GET_PRODUCT_TAG_ITEMS.length) {
					const selectTag = this.ADMIN_GET_PRODUCT_TAG_ITEMS.find(x => x.tag_id === this.getQuery.id)
					this.models.tagModel.push({
						text: selectTag.tag_value,
						tag_id: selectTag.tag_id,
					})
				}
			}
			console.log('this.tagItems', this.tagItems)
		},
		removeItem(masterItems, value, code) {
			const remove = this.models[masterItems].find(x => x[code] === value)
			this.models[masterItems].splice(this.models[masterItems].indexOf(remove), 1)
		},
		removeModel(item) {
			console.log('item', item)
			const removeValue = item.value

			switch (item.type) {
				case 'kind':
					this.removeItem('kindModel', removeValue, 'kind_code')
					break
				case 'brand':
					this.removeItem('brandModel', removeValue, 'brand_code')
					break
				case 'goods':
					this.removeItem('productModel', removeValue, 'goods_code')
					break
				case 'tone':
					this.removeItem('toneModel', removeValue, 'code')
					break
				case 'style':
					this.removeItem('styleModel', removeValue, 'code')
					break
				case 'spacious':
					this.removeItem('spaciousModel', removeValue, 'code')
					break
				case 'feature':
					this.removeItem('featureModel', removeValue, 'code')
					break
				case 'tag':
					this.removeItem('tagModel', removeValue, 'tag_id')
					break
			}
		},
		onSearchKeyboard() {
			this.resetData()
			if (this.searchInput === null) this.searchInput = ''
			this.searchModel = this.searchInput.trim()
			this.searchInput = this.searchModel
			const message = this.searchInput.length
				? `전체 리스트에서 해당 키워드로 검색하였습니다.`
				: '전체 리스트를 불러왔습니다.'
			const title = this.searchInput.length ? `${this.searchInput} 검색` : `전체 리스트 확인`
			this.$toastr.info(message, title)
			this.common_moveScroll('#searchArea')
		},
		resetData() {
			this.models = {
				subjectModel: [],
				kindModel: [],
				brandModel: [],
				productModel: [],

				spaciousModel: [],
				familyModel: [],
				styleModel: [],
				toneModel: [],
				featureModel: [],
				formModel: [],
				tagModel: [],
			}
		},
		initialize() {
			this.searchInput = ''
			this.onSearchKeyboard()
		},
	},
}
</script>

<style scoped lang="scss">
.my_product {
	height: 694px;
	padding: 70px 0 30px;
	margin-bottom: 48px;
	position: relative;
	background: url('../../../assets/img/product/img_TERA-PEACH_JE5009.jpg') no-repeat;
	background-size: cover;
	background-position: center;
	.dim {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #000;
		content: '';
		opacity: 0.3;
	}
	.product_tit {
		position: sticky;
		color: #dddddc !important;
	}
}

.product_tit {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 24px !important;
	color: #262626 !important;
	word-break: keep-all;
}
@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.my_product {
		height: 585px;
		padding: 40px 0 20px;
		margin-bottom: 40px;
	}
	.product_tit {
		font-size: 22px !important;
	}
}
@media all and (max-width: 600px) {
	.my_product {
		height: 498px;
		padding: 30px 0 18px;
		margin-bottom: 30px;
	}
	.product_tit {
		font-size: 16px !important;
	}
}
</style>
