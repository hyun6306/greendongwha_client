<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<h2 class="content_title">{{ common_title }}</h2>
			</v-col>

			<v-col
				cols="12"
				align="center"
				class="pa-0 px-5 px-lg-0"
			>
				<div class="search_tag">
					<!--<HomeProductSearchBox
						v-model="selectKindModel"
						:filter-kind-items="filterKindItems"
						:select-brand-product-list="selectBrandProductList"
						:height="150"
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
					<v-col
						class="pa-0 select_box_area"
						:cols="APP_GET_APP_WIDTH >= 600 ? 10 : 12"
					>
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
								v-if="toneCodeItems"
								v-model="models.toneModel"
								label="톤"
								:items="toneCodeItems"
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
						<!--<div class="mr-2 mb-1 select_box_area_items">
								<CommonSelectsSelect04
									v-if="featureCodeItems"
									v-model="models.featureModel"
									label="제품특성"
									:items="featureCodeItems"
								/>
							</div>-->
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="familyCodeItems"
								v-model="models.familyModel"
								label="가족형태"
								:items="familyCodeItems"
							/>
						</div>
						<div class="mr-2 mb-1 select_box_area_items">
							<CommonSelectsSelect04
								v-if="formCodeItems"
								v-model="models.formModel"
								label="형태"
								:items="formCodeItems"
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
								@click="resetData"
							>
								<v-icon small>autorenew</v-icon>초기화
							</v-btn>
						</v-col>
					</v-col>
				</v-row>
				<v-row class="ma-0 pt-6 tag_zone">
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
							@click="resetData"
						>
							<v-icon small>autorenew</v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<v-row
					class="ma-0 my-3"
					align="center"
				>
					<v-col
						cols="6"
						class="pa-0"
						align="start"
					>
						전체 <strong>{{ filterCount }}</strong>
						개
					</v-col>
					<v-col
						cols="6"
						class="pa-0 tawr"
						align="end"
					>
						<v-select
							v-model="selectModel"
							:items="searchItems"
							dense
							solo
							prepend-inner-icon="list"
							class="sm_select"
						></v-select>
					</v-col>
				</v-row>

				<div class="card_align">
					<CommonLoaderCircle01
						v-if="loading"
						color="primary"
						class="mt-5"
					/>
					<CommonCardMenuGroup02
						v-else
						:menu-type="'house'"
						:card-menu="filterShowItems"
						@submit="onClickProduct"
					/>
				</div>
			</v-col>

			<div
				class="pt-3"
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
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeHousewarmingSpecialist',
	metaInfo: {
		title: '전문가 집들이 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '전문가 집들이 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '전문가 집들이, 전문가 시공 사례, 인테리어 사례, 인테리어 예시, 전문가 인테리어, 인테리어 시공 사례',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루를 활용한 전문가 시공사례를 확인해보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/housewarming/specialist`,
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
		showItemsCount: 16,
		selectModel: '랜덤순',
		searchItems: ['랜덤순', '최신순', '인기순', '스크랩'],
		houseItems: [],

		models: {
			brandModel: [],
			productModel: [],
			spaciousModel: [],
			familyModel: [],
			styleModel: [],
			toneModel: [],
			featureModel: [],
			formModel: [],
		},

		spaciousCodeItems: [],
		familyCodeItems: [],
		styleCodeItems: [],
		toneCodeItems: [],
		featureCodeItems: [],
		formCodeItems: [],

		filterCount: 0,
		loading: false,

		selectKindModel: 0,
		preSelectKindModel: 0,
	}),
	computed: {
		...mapGetters([
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS', // 품목
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS', // 종류
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS', // 브랜드
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS', // 제품
		]),
		selectBrandProductList() {
			let list = []
			if (this.selectKindModel === undefined) this.calSelectKindModel(this.preSelectKindModel)
			if (this.selectKindModel !== null && this.houseItems.length) {
				if (!this.filterKindItems[this.selectKindModel]) this.calSelectKindModel(0)

				const brandItems = this.filterBrandItems.filter(
					x => x.kind_code === this.filterKindItems[this.selectKindModel].kind_code,
				)

				for (let i of brandItems) {
					// 현재 houseItems가 가지는 제품목록만 표출
					const product = this.houseItems.map(x => x.goods_code)
					const set = new Set(product)
					const setArr = [...set]

					const item = this.filterProductItems
						.filter(x => x.brand_code === i.brand_code)
						.filter(x => setArr.includes(x.goods_code))

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
			if (this.filterBrandItems.length) {
				// 현재 houseItems가 가지는 종류 목록만 표출
				const kind = this.filterBrandItems.filter(x => x.use_yn === 'Y').map(x => x.kind_code)
				const set = new Set(kind)
				const setArr = [...set]

				if (setArr.length && this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) {
					return this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(x => setArr.includes(x.kind_code))
				}
			}
			return []
		},
		filterBrandItems() {
			if (this.houseItems.length) {
				// 현재 houseItems가 가지는 브랜드 목록만 추출
				const brand = this.houseItems.map(x => x.brand_code)
				const set = new Set(brand)
				const setArr = [...set]

				if (setArr.length && this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length) {
					return this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(x => setArr.includes(x.brand_code))
				}
			}
			return []
		},
		filterProductItems() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(x => x.use_yn === 'Y')
		},
		brandFilterItems() {
			// 주거용 brand 항목만 가져오기
			const part = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.filter(item => item.use_kind === '1').map(x => x.subject_code)
			const type = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(item => part.includes(item.subject_code)).map(
				x => x.kind_code,
			)
			const brand = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(item => type.includes(item.kind_code)).filter(
				x => x.use_yn === 'Y',
			)
			return brand
		},
		filterShowItems() {
			// 분류
			const brandItems = this.models.brandModel?.length
				? this.common_product_filter_code(this.models.brandModel, 'brand_code', this.houseItems, 'brand_code')
				: []
			const productItems = this.models.productModel?.length
				? this.common_product_filter_code(this.models.productModel, 'goods_code', this.houseItems, 'goods_code')
				: []
			// 공통코드
			const spaciousItems = this.models.spaciousModel?.length
				? this.common_product_filter_code(this.models.spaciousModel, 'code', this.houseItems, 'spacious_code')
				: []
			const familyItems = this.models.familyModel?.length
				? this.common_product_filter_code(this.models.familyModel, 'code', this.houseItems, 'familytype_code')
				: []
			const styleItems = this.models.styleModel?.length
				? this.common_product_filter_code(this.models.styleModel, 'code', this.houseItems, 'style_code')
				: []
			const toneItems = this.models.toneModel?.length
				? this.common_product_filter_code(this.models.toneModel, 'code', this.houseItems, 'tone_code')
				: []
			const featureItems = this.models.featureModel?.length
				? this.common_product_filter_code(this.models.featureModel, 'code', this.houseItems, 'feature_code')
				: []
			const formItems = this.models.formModel?.length
				? this.common_product_filter_code(this.models.formModel, 'code', this.houseItems, 'form_code')
				: []

			// item 병합
			const totalItems = [
				...brandItems,
				...productItems,
				...spaciousItems,
				...familyItems,
				...styleItems,
				...toneItems,
				...featureItems,
				...formItems,
			]
			const set = new Set(totalItems)
			const setArr = [...set]
			let items = setArr

			// filter 선택이 없는 경우 전체 item
			if (this.filterItems.length === 0) items = this.houseItems

			this.calFilterCount(items.length)

			return this.common_product_filter_items(items, this.selectModel).slice(0, this.showItemsCount)
		},
		filterItems() {
			const brand = this.models.brandModel?.length
				? this.models.brandModel.map(x => {
						return { text: x.text, type: 'brand', value: x.brand_code }
				  })
				: []
			const product = this.models.productModel?.length
				? this.models.productModel.map(x => {
						return { text: x.text, type: 'product', value: x.goods_code }
				  })
				: []
			const spacious = this.models.spaciousModel?.length
				? this.models.spaciousModel.map(x => {
						return { text: x.text, type: 'spacious', value: x.code }
				  })
				: []
			const family = this.models.familyModel?.length
				? this.models.familyModel.map(x => {
						return { text: x.text, type: 'family', value: x.code }
				  })
				: []
			const style = this.models.styleModel?.length
				? this.models.styleModel.map(x => {
						return { text: x.text, type: 'style', value: x.code }
				  })
				: []
			const tone = this.models.toneModel?.length
				? this.models.toneModel.map(x => {
						return { text: x.text, type: 'tone', value: x.code }
				  })
				: []
			const feature = this.models.featureModel?.length
				? this.models.featureModel.map(x => {
						return { text: x.text, type: 'feature', value: x.code }
				  })
				: []
			const form = this.models.formModel?.length
				? this.models.formModel.map(x => {
						return { text: x.text, type: 'form', value: x.code }
				  })
				: []

			return [...brand, ...product, ...spacious, ...family, ...style, ...tone, ...feature, ...form]
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.filterCount) this.showItemsCount += 16
		},
		selectKindModel(val) {
			if (val) this.preSelectKindModel = val
		},
		filterItems(val) {
			if (val.length && this.APP_GET_APP_WIDTH < 960) this.common_scrollToRight('#tagArea')
		},
	},
	async created() {
		// 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('1')
		if (this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2')
		if (this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3')
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('4')

		this.loading = true
		// 스타일코드 가져오기
		this.styleCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '904' })
		// 톤코드 가져오기
		this.toneCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '905' })
		// 평형코드 가져오기
		this.spaciousCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '902' })
		// 제품특성코드 가져오기
		this.featureCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '907' })
		// 가족형태코드 가져오기
		this.familyCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '903' })
		// 형태코드 가져오기
		this.formCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '908' })

		const items = { method: 'getList', params: { final_appstate: '2' } }
		// 전문가 집들이 상세 정보
		await this.HOME_ACT_HOUSEWARMING_SPECIAL(items).then(res => {
			this.houseItems = res
			this.loading = false
		})
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			'HOME_ACT_HOUSEWARMING_SPECIAL',
			'ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS',
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
		]),
		calSelectKindModel(val) {
			this.selectKindModel = val
		},
		activeProduct(item) {
			const check = this.models.productModel.findIndex(x => x.goods_code === item.goods_code)
			if (check > -1) this.models.productModel.splice(check, 1)
			else this.models.productModel.push(item)
		},
		calFilterCount(count) {
			this.filterCount = count
		},
		onClickProduct(val) {
			this.$router.push(`/housewarming/specialist/detail/${val.exphw_id}`).catch(() => {})
		},
		removeItem(masterItems, value, code) {
			const remove = this.models[masterItems].find(x => x[code] === value)
			this.models[masterItems].splice(this.models[masterItems].indexOf(remove), 1)
		},
		removeModel(item) {
			// console.log('item', item)
			const removeValue = item.value

			switch (item.type) {
				case 'brand':
					this.removeItem('brandModel', removeValue, 'brand_code')
					break
				case 'product':
					this.removeItem('productModel', removeValue, 'goods_code')
					break
				case 'spacious':
					this.removeItem('spaciousModel', removeValue, 'code')
					break
				case 'family':
					this.removeItem('familyModel', removeValue, 'code')
					break
				case 'style':
					this.removeItem('styleModel', removeValue, 'code')
					break
				case 'tone':
					this.removeItem('toneModel', removeValue, 'code')
					break
				case 'feature':
					this.removeItem('featureModel', removeValue, 'code')
					break
				case 'form':
					this.removeItem('formModel', removeValue, 'code')
					break
			}
		},
		resetData() {
			this.models = {
				brandModel: [],
				productModel: [],
				spaciousModel: [],
				familyModel: [],
				styleModel: [],
				toneModel: [],
				featureModel: [],
				formModel: [],
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
