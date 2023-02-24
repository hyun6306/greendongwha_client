<template>
	<v-row
		class="ma-0"
		@mouseleave="topMenu = false"
	>
		<v-col class="pa-0">
			<v-btn
				text
				:height="buttonHeight"
				class="pa-0"
				width="100"
				@mousemove="topMenu = true"
			>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<v-icon
						class="pt-1"
						size="22"
					>
						mdi-menu
					</v-icon>
					<p class="overlay_button_text">전체</p>
				</v-row>
			</v-btn>
		</v-col>
		<v-scroll-y-transition>
			<div
				v-if="topMenu"
				class="top_menu px-3"
				:style="`top:${buttonHeight}px; height:${menuHeight}px; left:${menuWidth}px;`"
				@mousemove="topMenu = true"
			>
				<v-container
					fluid
					class="pa-0 wrapper w100"
				>
					<v-row class="ma-0">
						<v-col
							v-for="(part, i) in displaySubjects"
							:key="i"
							:cols="displayItemsCheck(filterBrandProducts(part.subject_code))"
							class="pa-0"
						>
							<v-row
								class="ma-0 mt-5"
								:class="`${filterBrandProducts(part.subject_code).length > 3 ? '' : 'mr-1'}`"
							>
								<v-col
									cols="12"
									class="section_title"
								>
									<h3>{{ part.subject_name }}</h3>
								</v-col>
								<v-row class="ma-0 mx-2">
									<v-col
										v-for="(brand, j) in filterBrandProducts(part.subject_code)"
										:key="j"
										:style="`width:${filterBrandProducts(part.subject_code).length > 3 ? '20%' : '33%'}`"
										cols="auto"
									>
										<v-card
											align="start"
											elevation="0"
										>
											<p class="py-1 part_title">{{ checkTypeName(brand.kind_code).kind_name }}</p>
										</v-card>
										<p
											v-for="(item, n) in brand.items"
											:key="n"
											class="pt-1 clickCursor part_text"
											@click="onClickPushLink(item)"
										>
											{{ item.text }}
											<v-img
												v-if="item.best_yn === 'Y'"
												eager
												width="32"
												class="part_image"
												:src="require('@/assets/img/icon/overlay_menu_best.png')"
											/>
											<v-img
												v-if="item.new_yn === 'Y'"
												eager
												width="16"
												class="part_image"
												:src="require('@/assets/img/icon/overlay_menu_new.png')"
											/>
										</p>
									</v-col>
								</v-row>
							</v-row>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</v-scroll-y-transition>
	</v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'OverlayMenu',
	components: {},
	props: {
		buttonHeight: {
			type: Number,
			default: 80,
		},
		onMenu: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		topMenu: false,
		openIndex: null,
		expendMenus: null,
	}),
	computed: {
		...mapGetters([
			'APP_GET_APP_WIDTH',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
		]),
		menuHeight() {
			return window.innerHeight - this.buttonHeight
		},
		menuWidth() {
			return this.APP_GET_APP_WIDTH > 1280 ? (this.APP_GET_APP_WIDTH - 1296) / 2 : 0
		},
		displaySubjects() {
			const items = []
			const filterItems = ['SC_00001', 'SC_00002', 'SC_00003', 'SC_00004']

			if (this.filterPartItems.length) {
				for (let i of filterItems) {
					const findItems = this.filterPartItems.find(x => x.subject_code === i)
					if (findItems) items.push(findItems)
				}
			}
			return items
		},
		filterPartItems() {
			const items = []
			const filter = JSON.parse(JSON.stringify(this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS)).filter(x => x.use_yn === 'Y')
			const filterItems = ['SC_00001', 'SC_00002', 'SC_00003', 'SC_00005', 'SC_00006', 'SC_00004'] // 'SC_00005', 'SC_00006' 상업용
			if (filter.length) {
				for (let i of filterItems) {
					const findItems = filter.find(x => x.subject_code === i)
					if (findItems) items.push(findItems)
				}
			}
			return items
		},
		filterKindItems() {
			const filterPartCode = this.filterPartItems.map(x => {
				return x.subject_code
			})
			return JSON.parse(JSON.stringify(this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS)).filter(x => {
				if (x.use_yn === 'Y' && filterPartCode.includes(x.subject_code)) {
					// 상업용 추가
					if (x.subject_code === 'SC_00005') x.subject_code = 'SC_00001' // 바닥재
					if (x.subject_code === 'SC_00006') x.subject_code = 'SC_00002' // 벽재

					return x
				}
			})
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

							// 상업용 추가
							if (y.subject_code === 'SC_00005') y.subject_code = 'SC_00001' // 바닥재
							if (y.subject_code === 'SC_00006') y.subject_code = 'SC_00002' // 벽재

							y.kind_code = element.kind_code
							y.text = `${y.brand_name} ${y.goods_name}`
							items.push(y)
						})
				})
			}
			return items
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
	},
	mounted() {},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS']),
		displayItemsCheck(items) {
			return items.length > 3 ? 12 : 6
		},
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
		onClickPushLink(val) {
			console.log('onClickPushLink', val)
			this.$router.push(`/product/search?type=goods&id=${val.goods_code}&kind=${val.kind_code}`)
			this.topMenu = false
		},
	},
}
</script>

<style scoped lang="scss">
.top_menu {
	width: 1280px;
	min-height: 100%;
	max-height: 950px;
	left: 0;
	overflow: auto;
	position: absolute;
	background: white;
	color: #414141;
	border-bottom: 1px solid #ededed;
	box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
	// 스크롤 보이기 제거
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
// 스크롤 보이기 제거
.top_menu::-webkit-scrollbar {
	display: none; /* Chrome, Safari, Opera*/
}

.menu_left_align {
	margin-left: 280px;
}
.overlay_button_text {
	font-size: 16px;
}
.section_title {
	font-size: 16px;
	font-weight: bold;
	border-bottom: 1px solid #d8d8d8;
	color: $color_primary;
}
.part {
	&_title {
		font-size: 13px;
		font-weight: bold;
		color: #262626;
	}
	&_text {
		font-size: 13px;
		line-height: 18px;
		color: #7f7f7f;
	}
	&_text:hover {
		color: $color_olive;
	}
	&_image {
		display: inline-block;
		vertical-align: middle;
		height: 16px;
		margin-left: 0.1rem;
	}
}
</style>
