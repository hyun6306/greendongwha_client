<template>
	<v-container
		fluid
		fill-height
		class="background_gray"
	>
		<v-col
			v-show="false"
			cols="12"
			align="center"
			class="pa-0"
		>
			<CommonTabsTab03
				v-model="tab"
				:tab-items="tabItems"
				class-name="margin_0"
			/>
		</v-col>
		<v-col class="pa-0">
			<v-tabs-items
				v-model="tab"
				touchless
			>
				<v-tab-item>
					<!-- 신청서 가이드 ( 01_Guide ) -->
					<HomeInteriorPriceInquire01Guide @selectTab="moveTab" />
				</v-tab-item>

				<v-tab-item>
					<!-- 인테리어점 선택 ( 02_Interior ) -->
					<HomeInteriorPriceInquire02Interior
						:tab-select="tab"
						@selectTab="moveTab"
					/>
				</v-tab-item>

				<v-tab-item>
					<!-- 신청서 작성 ( 03_register ) -->
					<HomeInteriorPriceInquire03Register @selectTab="moveTab" />
				</v-tab-item>

				<v-tab-item>
					<!-- 비회원 견적상담내역 확인 ( 04_confirm ) -->
					<HomeInteriorPriceInquire04Confirm @selectTab="moveTab" />
				</v-tab-item>
			</v-tabs-items>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorPriceInquire',
	metaInfo: {
		title: '견적상담 의뢰 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '견적상담 의뢰 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '견적상담의뢰, 견적상담 신청서, 견적상담',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '고객님께 필요한 사항을 직접 파악하여 전문 인테리어점에 상담을 진행해보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/interior/price/inquire`,
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
		tabItems: ['신청서 가이드', '인테리어점 선택', '신청서 작성', '견적상담신청서 확인'],
		selectBrand: null,
		selectProduct: null,
		selectProductCard: null,
	}),
	computed: {
		...mapGetters([
			// 인테리어 선택 item
			'HOME_GET_INTERIOR_SELECT_INTERIOR',
			'HOME_GET_INTERIOR_SELECT_PRICE',
			'HOME_GET_INTERIOR_SELECT_PRODUCT',

			// 브랜드, 제품
			'HOME_GET_INTERIOR_ESTIMATE_BRAND',
			'HOME_GET_INTERIOR_ESTIMATE_PRODUCT',

			'HOME_GET_INTERIOR_ESTIMATE_SIMPLE_PRICE',

			'AUTH_GET_USER_AUTH',
		]),
		simplePrices() {
			return this.HOME_GET_INTERIOR_SELECT_PRICE || null
		},
		selectedProduct() {
			return this.HOME_GET_INTERIOR_SELECT_PRODUCT || null
		},
		storeItems() {
			return this.HOME_GET_INTERIOR_SELECT_INTERIOR || null
		},
		authAgencyCheck() {
			return this.AUTH_GET_USER_AUTH === 'AGENCY'
		},
	},
	watch: {
		authAgencyCheck(val) {
			console.log('this.AUTH_GET_USER_AUTH', val)
			if (val) this.noPermission()
		},
	},
	async created() {
		if (this.authAgencyCheck) this.noPermission()
		// 브랜드, 제품 선택 데이터 가져오기
		if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND === null || this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT === null) {
			await this.HOME_ACT_INTERIOR_ESTIMATE_BRAND() // 브랜드
			await this.HOME_ACT_INTERIOR_ESTIMATE_PRODUCT() // 제품
		}

		// 제품선택시 확인
		// if (this.HOME_GET_INTERIOR_SELECT_PRODUCT) await this.checkProduct()
	},
	mounted() {
		// console.log('this.HOME_GET_INTERIOR_SELECT_PRODUCT', this.HOME_GET_INTERIOR_SELECT_PRODUCT)
	},
	destroyed() {
		this.HOME_MU_INTERIOR_SELECT_INTERIOR(null)
		this.HOME_MU_INTERIOR_SELECT_PRICE(null)
		this.HOME_MU_INTERIOR_SELECT_PRODUCT(null)
	},
	methods: {
		...mapMutations([
			'HOME_MU_INTERIOR_SELECT_INTERIOR',
			'HOME_MU_INTERIOR_SELECT_PRICE',
			'HOME_MU_INTERIOR_SELECT_PRODUCT',

			'HOME_MU_INTERIOR_ESTIMATE_SIMPLE_PRICE',
		]),
		...mapActions(['HOME_ACT_INTERIOR_ESTIMATE_BRAND', 'HOME_ACT_INTERIOR_ESTIMATE_PRODUCT']),
		moveTab(val) {
			this.tab = val
			this.common_scrollToTop()
		},
		noPermission() {
			this.$router.go(-1)
			this.$toastr.warning('인테리어 회원은 견적상담기능을 사용하실 수 없습니다.', '견적상담 불가')
		},
		changeProduct(item) {
			if (this.selectProductCard === null) return
			// console.log('change', item, this.selectProductCard)
			if (item.title === 'brand') {
				if (item.item.brand_code !== this.selectProductCard.brand_code) return (this.selectProductCard = null)
			} else {
				if (item.item.goods_code !== this.selectProductCard.goods_code) return (this.selectProductCard = null)
			}
		},
		async checkProduct() {
			// 브랜드, 제품 선택 데이터 가져오기
			if (this.HOME_GET_INTERIOR_ESTIMATE_BRAND === null || this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT === null) {
				await this.HOME_ACT_INTERIOR_ESTIMATE_BRAND() // 브랜드
				await this.HOME_ACT_INTERIOR_ESTIMATE_PRODUCT() // 제품
			}
			const check = this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT.find(
				item => item.goods_code === this.HOME_GET_INTERIOR_SELECT_PRODUCT.goods_code,
			)
			console.log('check', check)
			if (check) {
				// 견적내기가 가능한 경우
				this.selectBrand = this.HOME_GET_INTERIOR_ESTIMATE_BRAND.find(item => item.brand_code === check.brand_code)
				this.selectProduct = this.HOME_GET_INTERIOR_ESTIMATE_PRODUCT.find(item => item.goods_code === check.goods_code)
				this.selectProductCard = this.HOME_GET_INTERIOR_SELECT_PRODUCT

				console.log('this.selectBrand', this.selectBrand)
				console.log('this.selectProduct', this.selectProduct)
				console.log('this.selectProductCard', this.selectProductCard)

				// this.HOME_MU_INTERIOR_SELECT_PRODUCT(null)
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
