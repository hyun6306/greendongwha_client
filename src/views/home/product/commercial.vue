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
			<div class="wrapper">
				<v-col
					cols="12"
					class="pa-0"
					align="center"
				>
					<h2 class="content_title">
						<span> {{ common_title }} </span>
					</h2>
				</v-col>
				<v-col
					cols="12"
					class="pa-0"
					:style="`margin-bottom: -1px;`"
				>
					<CommonTabsTab05
						v-model="toggleProductType"
						:tab-items="commercialProductPart"
						:grow="APP_GET_APP_WIDTH < 960"
					/>
				</v-col>
				<div class="search_tag">
					<!--<HomeProductSearchBox
						v-model="selectKindModel"
						:filter-kind-items="filterKindItems"
						:select-brand-product-list="selectBrandProductList"
						:height="200"
						@select="activeProduct"
					/>-->
					<HomeProductSearchBox01
						v-model="selectKindModel"
						:filter-kind-items="filterKindItems"
						:select-brand-product-list="selectBrandProductList"
						@select="activeProduct"
					/>
				</div>
				<v-row class="ma-0 py-3">
					<CommonTagChipType01
						:items="filterItems"
						:cols="APP_GET_APP_WIDTH < 960 ? 10 : 11"
						@delete="removeModel"
					/>
					<v-col
						cols="2"
						md="1"
						class="pa-0"
					>
						<v-btn
							text
							@click="resetData"
						>
							<v-icon small>autorenew</v-icon>
							<span
								v-if="APP_GET_APP_WIDTH > 960"
								class="ml-2"
							>
								초기화
							</span>
						</v-btn>
					</v-col>
				</v-row>

				<v-col
					cols="12"
					align="center"
					class="pa-0 px-5 px-lg-0"
				>
					<v-row
						class="ma-0 mt-10 mb-3"
						align="center"
					>
						<v-col
							cols="6"
							class="pa-0"
							align="start"
						>
							전체 <strong>{{ filterCount }}</strong
							>개
						</v-col>
						<v-col
							cols="6"
							class="pa-0 tawr"
							align="end"
						>
							<v-select
								v-model="selectModel"
								:items="searchItems"
								label="Solo field"
								dense
								prepend-inner-icon="list"
								solo
								class="sm_select"
							></v-select>
						</v-col>
					</v-row>
					<div class="card_align">
						<CommonCardMenuGroup02
							:menu-type="'product'"
							:card-menu="filterShowItems"
							@submit="onClickProduct"
						/>
					</div>
				</v-col>
				<div
					class="mt-3"
					align="center"
				>
					<CommonButtonsButton02
						v-if="filterCount > showItemsCount"
						:name="`더보기 (${showItemsCount}/${filterCount})`"
						class-name="btn_more"
						color="#70b341"
						outlined
						@click="showItemsCount += 16"
					/>
				</div>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeProductCommercial',
	metaInfo: {
		title: '상업용 제품 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '상업용 제품 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 바닥재, 벽재, 외장재, 상업용, 상업용',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 상업용 제품입니다. 간편하게 추천 태그로 간편하게 원하는 제품을 찾아보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/product/commercial`,
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
		selectKindModel: 0,
		showItemsCount: 16,
		toggleProductType: 0,
		selectModel: '최신순',
		searchItems: ['최신순', '인기순', '스크랩'],
		models: {
			kindModel: [],
			brandModel: [],
			productModel: [],
		},
		filterCount: 0,
	}),
	computed: {
		...mapGetters([
			'APP_GET_APP_WIDTH',
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
			'HOME_GET_GET_PRODUCT_COMMERCIAL_ITEMS',
		]),
		commercialProductItems() {
			if (this.HOME_GET_GET_PRODUCT_COMMERCIAL_ITEMS.length === 0 || this.commercialProductPart.length === 0) return []
			let copyData = JSON.parse(JSON.stringify(this.HOME_GET_GET_PRODUCT_COMMERCIAL_ITEMS))
			copyData = copyData.filter(
				item => item.subject_code === this.commercialProductPart[this.toggleProductType].subject_code,
			)
			return copyData
		},
		filterShowItems() {
			// 분류
			const kindItems = this.models.kindModel?.length
				? this.common_product_filter_code(this.models.kindModel, 'kind_code', this.commercialProductItems, 'kind_code')
				: []
			const brandItems = this.models.brandModel?.length
				? this.common_product_filter_code(this.models.brandModel, 'brand_code', this.commercialProductItems, 'brand_code')
				: []
			const productItems = this.models.productModel?.length
				? this.common_product_filter_code(
						this.models.productModel,
						'goods_code',
						this.commercialProductItems,
						'goods_code',
				  )
				: []

			// item 병합
			const totalItems = [...kindItems, ...brandItems, ...productItems]
			const set = new Set(totalItems)
			const setArr = [...set]
			let items = setArr

			// filter 선택이 없는 경우 전체 item
			if (this.filterItems.length === 0) items = this.commercialProductItems

			// total count 수정
			this.calFilterCount(items.length)

			return this.common_product_filter_items(items, this.selectModel).slice(0, this.showItemsCount)
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
			const product = this.models.productModel?.length
				? this.models.productModel.map(x => {
						return { text: x.text, type: 'goods', value: x.goods_code }
				  })
				: []

			return [...kind, ...brand, ...product]
		},
		filterKindItems() {
			return (
				this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(
					x => x.subject_code === this.commercialProductPart[this.toggleProductType].subject_code,
				).filter(x => x.use_yn === 'Y') || []
			)
		},
		filterBrandItems() {
			let items = []
			this.filterKindItems.forEach(element => {
				const item = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(x => x.kind_code === element.kind_code).filter(
					x => x.use_yn === 'Y',
				)
				if (item?.length) item.forEach(y => items.push(y))
			})
			return items
		},
		filterProductItems() {
			let items = []
			if (this.filterBrandItems) {
				this.filterBrandItems.forEach(element => {
					const item = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(
						x => x.brand_code === element.brand_code,
					).filter(x => x.use_yn === 'Y')
					if (item?.length) item.forEach(y => items.push(y))
				})
			}
			return items
		},
		selectBrandProductList() {
			let list = []
			if (this.selectKindModel === undefined) this.calSelectKindModel(0)
			if (this.selectKindModel !== null) {
				if (!this.filterKindItems[this.selectKindModel]) this.calSelectKindModel(0)
				const brandItems = this.filterBrandItems.filter(
					x => x.kind_code === this.filterKindItems[this.selectKindModel].kind_code,
				)
				for (let i of brandItems) {
					if (this.filterProductItems) {
						const item = this.filterProductItems.filter(x => x.brand_code === i.brand_code)
						for (let n of item) {
							n.filter_title = `${n.brand_name} ${n.goods_name}`
							n.text = `${n.brand_name} ${n.goods_name}`
							n.active = this.models.productModel.filter(x => x.goods_code === n.goods_code).length > 0
							list.push(n)
						}
					}
				}
			}
			return list
		},
		// 품목 필터 tab
		commercialProductPart() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.filter(item => item.use_kind === '2' && item.use_yn === 'Y')
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.filterCount) this.showItemsCount += 16
		},
		toggleProductType() {
			this.resetData()
		},
		filterItems(val) {
			if (val.length && this.APP_GET_APP_WIDTH < 960) this.common_scrollToRight('#tagArea')
		},
	},
	// keep alive reload
	async created() {
		// 품목 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('1')
		// 종류 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2')
		// 브랜드 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3')
		// 제품 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('4')
		// 제품 List GET
		if (this.HOME_GET_GET_PRODUCT_COMMERCIAL_ITEMS.length === 0) await this.getProductList()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', 'HOME_ACT_GET_PRODUCT_POP_ITEMS', 'HOME_ACT_GET_PRODUCT_ITEMS']),
		activeProduct(item) {
			const check = this.models.productModel.findIndex(x => x.goods_code === item.goods_code)
			if (check > -1) this.models.productModel.splice(check, 1)
			else this.models.productModel.push(item)
		},
		calFilterCount(count) {
			this.filterCount = count
		},
		calSelectKindModel(val) {
			this.selectKindModel = val
		},
		async getProductList(val = 0) {
			const params = {
				// code_usekind : 2,
				// code_subject : this.commercialProductPart[val].subject_code,
				// code_kind : "",
				// code_brand : ""
			}
			await this.HOME_ACT_GET_PRODUCT_ITEMS(params)
		},
		onClickProduct(val) {
			// console.log('onClickProduct',val)

			// let route = this.$router.resolve({path: `/product/detail/${val.id}`})
			// window.open(route.href, '_blank')
			this.$router.push(`/product/detail/${val.id}`)
		},
		removeItem(masterItems, value, code) {
			const remove = this.models[masterItems].find(x => x[code] === value)
			this.models[masterItems].splice(this.models[masterItems].indexOf(remove), 1)
		},
		removeModel(item) {
			// console.log('item', item)
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
			}
		},
		resetData() {
			this.selectKindModel = 0
			this.models = {
				kindModel: [],
				brandModel: [],
				productModel: [],
			}
		},
	},
}
</script>

<style scoped lang="scss">
.sm_select {
	border: 1px solid #ccc;
	max-width: 80px !important;
	:deep(.v-text-field__details) {
		display: none !important;
	}
	:deep(.v-input__control) {
		min-height: 25px !important;
	}
	:deep(.v-input__append-inner) {
		display: none !important;
	}
	:deep(.v-input__slot) {
		padding: 0 5px !important;
		margin-bottom: 0 !important;
		box-shadow: none !important;
	}
	:deep(.v-select__selection) {
		text-align: center;
		font-size: 13px !important;
	}
	:deep(.v-select__selections) input {
		display: none !important;
	}
}
</style>
