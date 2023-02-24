<template>
	<v-overlay
		:z-index="zIndex"
		:value="model"
		opacity="0.8"
	>
		<div class="wrapper w100">
			<v-container
				fluid
				class="overlay_area"
			>
				<v-row class="ma-0">
					<v-col
						cols="10"
						class="pa-0"
					>
						<h2>전체 제품</h2>
					</v-col>
					<v-col
						cols="2"
						align="end"
						class="pa-0"
					>
						<v-btn
							icon
							color="teal"
							@click="model = false"
						>
							<v-icon
								x-large
								color="white"
							>
								mdi-close
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row
					v-for="(part, i) in filterPartItems"
					:key="i"
					class="ma-0 section_area mt-5"
				>
					<v-col cols="12">
						<h3>{{ part.subject_name }}</h3>
					</v-col>
					<v-col
						v-for="(brand, j) in filterBrandProducts(part.subject_code)"
						:key="j"
						cols="3"
					>
						<v-card align="center">
							<p class="py-1">{{ checkTypeName(brand.kind_code).kind_name }}</p>
						</v-card>
						<p
							v-for="(item, n) in brand.items"
							:key="n"
							class="pt-1 pl-1 clickCursor"
							@click="onClickPushLink(item.text)"
						>
							{{ item.text }}
						</p>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</v-overlay>
</template>

<script>
import model from '@/mixins/model'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'OverlayMenu',
	mixins: [model],
	data: () => ({
		zIndex: 11,
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
		]),
		filterPartItems() {
			return this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.filter(x => x.use_kind === '1' && x.use_yn === 'Y')
		},
		filterKindItems() {
			const filterPartCode = this.filterPartItems.map(x => {
				return x.subject_code
			})
			return this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(
				x => x.use_yn === 'Y' && filterPartCode.includes(x.subject_code),
			)
		},
		filterBrandItems() {
			const filterKindCode = this.filterKindItems.map(x => {
				return x.kind_code
			})
			return this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(
				x => x.use_yn === 'Y' && filterKindCode.includes(x.kind_code),
			)
		},
		filterProductItems() {
			let items = []
			if (this.filterBrandItems) {
				this.filterBrandItems.forEach(element => {
					const item = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(
						x => x.brand_code === element.brand_code,
					).filter(x => x.use_yn === 'Y')
					if (item?.length)
						item.forEach(y => {
							y.subject_code = this.filterKindItems.find(x => x.kind_code === element.kind_code).subject_code
							y.kind_code = element.kind_code
							y.text = `${y.brand_name} ${y.goods_name}`
							items.push(y)
						})
				})
			}
			return items
			// return this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(x => x.use_yn === 'Y')
		},
	},
	watch: {},
	async created() {
		// 품목 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('1')
		// 종류 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2')
		// 브랜드 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3')
		// 제품 카테고리 GET
		if (this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.length === 0) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('4')
		console.log('overlay_filterPartItems', this.filterPartItems)
		console.log('overlay_filterKindItems', this.filterKindItems)
		console.log('overlay_filterBrandItems', this.filterBrandItems)
		console.log('overlay_filterProductItems', this.filterProductItems)
	},
	mounted() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS']),
		checkTypeName(code) {
			return this.filterKindItems.find(x => x.kind_code === code) || {}
		},
		filterBrandProducts(code) {
			if (this.filterProductItems.length) {
				let filterKindCode = this.filterKindItems
					.filter(y => y.subject_code === code)
					.map(x => {
						return { kind_name: x.kind_name, kind_code: x.kind_code, items: [] }
					})

				filterKindCode.forEach(x => {
					x.items = this.filterProductItems.filter(y => y.kind_code === x.kind_code)
				})
				return filterKindCode
			}
		},
		onClickPushLink(text) {
			this.$router.push(`/product/search?keyword=${text}`)
			this.model = false
		},
	},
}
</script>

<style lang="scss" scoped>
.overlay_area {
	height: 100%;
	overflow-y: scroll;
}
.section_area {
	border-top: 1px solid #ccc;
}
.v-overlay__content {
	position: relative;
	width: 100%;
	height: 85%;
}
</style>
