<template>
	<div class="click_price_button_ip">
		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="price_step">
				<p class="num">01</p>
				<p class="topic">어떤 유형의 집을 시공할건가요?</p>
			</div>
			<v-col
				cols="12"
				class="pa-0"
			>
				<CommonCardMenuTypeBtn03
					v-model="allow.type_1"
					:type-items="homeTypeItems_1"
					:cols="4"
				/>
			</v-col>
		</v-col>

		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="price_step">
				<p class="num">02</p>
				<p class="topic">시공 장소의 전용 면적과 방개수를 알려주세요</p>
			</div>
			<v-row class="ma-0 d-flex justify-space-between">
				<v-col
					cols="12"
					sm="6"
					align="start"
					class="pa-0"
				>
					<p class="mb-1">전용면적</p>
					<CommonSelectsSelect01
						v-if="widthCodeItems"
						v-model="allow.widthModel"
						:items="widthCodeItems"
						label="평(㎡)"
						class-name="option"
					/>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					align="end"
					class="pa-0 mt-2 mt-sm-0"
				>
					<p class="mb-1 ml-0 ml-sm-4 tal">방 개수</p>
					<div class="ml-0 ml-sm-4">
						<CommonSelectsSelect01
							v-if="roomItems"
							v-model="allow.roomModel"
							:items="roomItems"
							:disabled="allow.widthModel === null"
							label="방 선택"
							class-name="option"
						/>
					</div>
				</v-col>
			</v-row>
		</v-col>

		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="price_step">
				<p class="num">03</p>
				<p class="topic">베란다 확장 여부를 알려주세요</p>
			</div>
			<v-col
				cols="12"
				class="pa-0"
			>
				<CommonCardMenuTypeBtn03
					v-model="allow.type_2"
					:type-items="homeTypeItems_2"
					:cols="6"
				/>
			</v-col>
		</v-col>

		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="price_step">
				<p class="num">04</p>
				<p class="topic">원하는 시공 범위와 종류를 선택해주세요</p>
			</div>
			<v-row class="ma-0 d-flex justify-space-between">
				<v-col
					cols="12"
					sm="6"
					align="start"
					class="pa-0"
				>
					<p class="mb-1">시공범위</p>
					<CommonCardMenuTypeBtn03
						v-model="allow.type_3"
						:type-items="homeTypeItems_3"
						:cols="6"
					/>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					align="end"
					class="pa-0 mt-2 mt-sm-0 pl-0 pl-sm-4"
				>
					<p class="mb-1 ml-0 tal">바닥재종류</p>
					<!--<v-row class="ma-0">
							<v-col cols="6" class="pa-0">
								<CommonSelectsSelect01
									v-if="HOME_GET_INTERIOR_ESTIMATE_BRAND"
									v-model="brandModel"
									:items="HOME_GET_INTERIOR_ESTIMATE_BRAND"
									label="브랜드 선택"
									className="option"
								/>
							</v-col>
							<v-col cols="6" class="pa-0">
								<CommonSelectsSelect01
									v-if="productItemsFilter"
									v-model="productModel"
									:items="productItemsFilter"
									:disabled="allow.brandModel === null"
									label="제품 선택"
									className="option"
								/>
							</v-col>
						</v-row>-->
					<v-row
						class="ma-0 ml-md-3 mx-3"
						align="center"
					>
						<v-col
							cols="12"
							class="pa-0"
						>
							<CommonSelectsSelect05
								v-model="productModel"
								:parents-items="kindItemsFilter"
								:child-items="productItemsFilter"
								:select-text="selectProductModel"
								select-id="goods_code"
								label="제품 선택"
								@select-parents="selectKind"
								@select-child="selectProduct"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-col>

		<v-col
			class="pa-0"
			cols="12"
		>
			<div class="price_step">
				<p class="num">05</p>
				<p class="topic">기존 시공되어 있는 제품의 철거 유무를 선택해주세요</p>
			</div>
			<v-col
				cols="12"
				class="pa-0"
			>
				<CommonCardMenuTypeBtn03
					v-model="allow.type_4"
					:type-items="homeTypeItems_4"
					:cols="6"
				/>
			</v-col>
		</v-col>

		<v-col
			class="pa-0 my-12"
			cols="12"
		>
			<CommonButtonsButton02
				:disabled="allowValue"
				name="견적내기"
				color="#00582c"
				class-name="btn_large"
				@click="submit"
			/>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'
import ad_kakao from '@/mixins/ad/kakao'
import ad_mobion from '@/mixins/ad/mobion'

export default {
	name: 'HomeInteriorPriceInputs',
	mixins: [common, admin, ad_kakao, ad_mobion],
	props: ['reset', 'brand', 'product'],
	data: () => ({
		allow: {
			type_1: 0,
			type_2: 0,
			type_3: 0,
			type_4: 0,
			widthModel: null,
			roomModel: null,
			brandModel: null,
			productModel: null,
		},
		kindModel: null,
		brandModel: null,
		productModel: null,
		homeTypeItems_1: [
			{ title: '아파트', value: '아파트' },
			{ title: '오피스텔', value: '오피스텔' },
			{ title: '빌라/주택', value: '빌라/주택' },
		],
		homeTypeItems_2: [
			{ title: '베란다 확장', value: 'Y' },
			{ title: '베란다 미 확장', value: 'N' },
		],
		homeTypeItems_3: [
			{ title: '집 전체', value: '집전체' },
			{ title: '거실', value: '거실' },
		],
		homeTypeItems_4: [
			{ title: '철거 진행', value: 'Y' },
			{ title: '철거 미진행', value: 'N' },
		],
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			// 제품 데이터
			'HOME_GET_INTERIOR_ESTIMATE_BRAND',
			'HOME_GET_INTERIOR_ESTIMATE_PRODUCT',

			// 평수 , 방 갯수 데이터
			'HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA',
			'HOME_GET_INTERIOR_ESTIMATE_ROOM_COUNT',

			// 선택 제품 확인
			'HOME_GET_INTERIOR_SELECT_PRODUCT',
		]),
		widthCodeItems() {
			return this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA || []
		},
		roomItems() {
			if (this.allow.widthModel === null) return []
			return (
				this.common_filterItem(this.allow.widthModel, this.HOME_GET_INTERIOR_ESTIMATE_ROOM_COUNT, 'exclusive_area') || []
			)
		},
		kindItemsFilter() {
			if (this.brandItemsFilter && this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) {
				console.log('brandItemsFilter', this.brandItemsFilter)

				// 추출한 내용의 kind_code만 추출 > 중첩내용 제거
				const typeList = this.brandItemsFilter.map(x => x.kind_code)
				const set = new Set(typeList)
				const setArr = [...set]
				console.log('setArr', setArr)

				// 추출된 kind_code를 통해 전체종류리스트에서 종류List만들기
				let kindItems = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(x => setArr.includes(x.kind_code))
				console.log('kindItems', kindItems)
				if (!kindItems.length) return []

				kindItems.map(x => (x.active = false)) // active reset
				if (this.kindModel) {
					// 선택데이터 확인 active 체크
					const select = kindItems.findIndex(x => x.kind_code === this.kindModel.kind_code)
					kindItems[select].active = true
				} else {
					// 초기에 선택된 종류 데이터가 없을때 강제로 [0]데이터 active
					kindItems[0].active = true
				}

				return kindItems
			}
			return []
		},
		brandItemsFilter() {
			let filterItems = []
			if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND) {
				// 견적 리스트에 존재하는 브랜드 목록 ( 값에 대한 내용 부족 ) > 전체 브랜드 목록 ( kind_code , kind_name ) 내용 추출
				filterItems = this.HOME_GET_INTERIOR_ESTIMATE_BRAND.map(x => {
					const sameItem = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.find(y => x.brand_code === y.brand_code)
					// console.log('brandItemsFilter', sameItem, this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS)
					x.kind_code = sameItem.kind_code
					x.kind_name = sameItem.kind_name
					return x
				})
				console.log('brandItemsFilter', filterItems)
			}
			return filterItems
		},
		productItemsFilter() {
			console.log('HOME_GET_INTERIOR_ESTIMATE_PRODUCT', this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT)
			if (this.brandItemsFilter && this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT) {
				const filterItems = this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT.map(x => {
					const sameData = this.brandItemsFilter.find(y => x.brand_code === y.brand_code)
					x.kind_code = sameData.kind_code
					x.kind_name = sameData.kind_name
					x.brand_name = sameData.brand_name
					x.text = `${sameData.brand_name} ${x.goods_name}`
					return x
				})
				console.log('filterItems', filterItems)
				console.log('filterItems', this.kindItemsFilter)
				console.log('filterItems', this.kindModel)

				if (this.kindModel) {
					return this.common_filterItem(this.kindModel, filterItems, 'kind_code')
				} else {
					console.log('HOME_GET_INTERIOR_ESTIMATE_PRODUCT')
					return this.common_filterItem(this.kindItemsFilter[0], filterItems, 'kind_code')
				}
			}
			return []
		},
		currentPath() {
			return this.common_recentlyRouterPath === '/interior/price/inquire' ? 'components' : 'page'
		},
		allowValue() {
			const checkValue = ['widthModel', 'roomModel']
			for (let i of checkValue) {
				if (this.allow[i] === null) return true
			}

			const checkItems = ['productModel']
			for (let i of checkItems) {
				if (this[i] === null) return true
			}

			return false
		},
		selectProductModel() {
			let text = null
			if (this.productModel) text = `${this.productModel.text}`
			return text
		},
	},
	watch: {
		reset(val) {
			if (val) this.dataReset()
		},
		brandModel(val) {
			this.allow.brandModel = val
			this.$emit('change', { title: 'brand', item: val })
		},
		productModel(val) {
			this.allow.productModel = val
			this.$emit('change', { title: 'product', item: val })
		},
	},
	created() {},
	async mounted() {
		// 브랜드, 제품 , 평수 , 방 데이터 가져오기
		await this.getData()
		// 바닥재 제품 견적 가능한 상품 선택시 제품 등록
		if (this.brand) {
			this.brandModel = this.brandItemsFilter.find(x => x.brand_code === this.brand.brand_code)
			this.allow.brandModel = this.brandModel
		}
		if (this.product) {
			this.productModel = this.productItemsFilter.find(x => x.goods_code === this.product.goods_code)
			this.allow.productModel = this.productModel
		}
	},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_PRICE']),
		...mapActions([
			// 종류 가져오기
			'ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS',
			// 브랜드, 제품 선택 데이터 가져오기
			'HOME_ACT_INTERIOR_ESTIMATE_BRAND',
			'HOME_ACT_INTERIOR_ESTIMATE_PRODUCT',
			// 평수, 방 갯수 선택 데이터 가져오기
			'HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA',
			'HOME_ACT_INTERIOR_ESTIMATE_ROOM_COUNT',
			// 간편견적
			'HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE',
		]),
		selectKind(item) {
			this.kindModel = item
		},
		selectProduct(item) {
			this.productModel = item
		},
		async getData() {
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2') // 제품
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3') // 브랜드 전체 정보
			if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND === null) await this.HOME_ACT_INTERIOR_ESTIMATE_BRAND() // 브랜드
			if (this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT === null) await this.HOME_ACT_INTERIOR_ESTIMATE_PRODUCT() // 제품
			if (this.HOME_GET_INTERIOR_ESTIMATE_EXCLUSIVE_AREA === null) await this.HOME_ACT_INTERIOR_ESTIMATE_EXCLUSIVE_AREA() // 평수
			if (this.HOME_GET_INTERIOR_ESTIMATE_ROOM_COUNT === null) await this.HOME_ACT_INTERIOR_ESTIMATE_ROOM_COUNT() // 방
		},
		dataReset() {
			this.allow = {
				type_1: 0,
				type_2: 0,
				type_3: 0,
				type_4: 0,
				widthModel: null,
				roomModel: null,
				brandModel: null,
				productModel: null,
			}
			this.kindModel = null
			this.brandModel = null
			this.productModel = null
		},
		async submit() {
			if (this.currentPath === 'page') {
				// google analytics
				window.gtag('event', 'click_price_button', { button_location: 'interior_price' })
				// ad_kakao click
				this.ad_kakao_clickScript(null, 'click_price_button_ip')
				// ad_mobion click
				this.ad_mobion_click_convertion('click_price_button_ip')
			}

			this.allow.value_1 = this.homeTypeItems_1[this.allow.type_1]
			this.allow.value_2 = this.homeTypeItems_2[this.allow.type_2]
			this.allow.value_3 = this.homeTypeItems_3[this.allow.type_3]
			this.allow.value_4 = this.homeTypeItems_4[this.allow.type_4]
			// this.$emit('submit', this.allow)
			// console.log('this.allow', this.allow)

			const items = {
				method: 'get',
				params: {
					housetype: this.allow.value_1.value,
					exclusive_area: this.allow.roomModel.exclusive_area,
					roomcount: this.allow.roomModel.roomcount,
					veranda_yn: this.allow.value_2.value,
					buildscope: this.allow.value_3.value,
					removal_yn: this.allow.value_4.value,
					goods_code: this.allow.productModel.goods_code,
				},
			}

			console.log('params', items)

			await this.HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE(items).then(res => {
				if (this.currentPath === 'components') this.HOME_MU_INTERIOR_SELECT_PRICE(res)
				this.$emit('submit', this.allow)
			})
		},
	},
}
</script>

<style scoped lang="scss">
.price_step {
	margin: 46px 0 18px;
	.num {
		margin-bottom: 12px;
		font-family: 'Roboto-Bold';
		font-size: 18px;
		color: #00582c;
	}
	.topic {
		font-family: 'NotoSansKR-Regular';
		font-size: 20px;
		color: #333;
		word-break: keep-all;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.price_step {
		margin: 40px 0 18px !important;
		.topic {
			font-size: 16px !important;
		}
	}
}
@media all and (max-width: 380px) {
	.price_step {
		margin: 30px 0 15px !important;
		.topic {
			font-size: 16px !important;
		}
	}
}
</style>
