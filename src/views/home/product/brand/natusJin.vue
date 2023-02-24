<template>
	<v-container
		class="pa-0"
		fluid
	>
		<!-- 나투스진 메인 비쥬얼 -->
		<HomeProductBrandNatusJinMainVisual />

		<!-- 앵커드탭 -->
		<v-tabs
			v-model="tab"
			class="anchor_tab"
			fixed-tabs
			dark
			:show-arrows="false"
		>
			<v-tab
				v-for="(item, i) of tabItems"
				:key="i"
				@click="moveScroll(item)"
			>
				{{ item.title }}<br class="hidden-md-and-up" />
				{{ item.subTitle }}
			</v-tab>
		</v-tabs>

		<!-- 베스트셀러 -->
		<HomeProductBrandNatusJinLineup id="lineup" />

		<!-- 나투스진 -->
		<HomeProductBrandNatusJinNatusJin
			:lineup-select-items="lineupSelectItems"
			:lineup-select-item="lineupSelectItem"
			:lineup-select-model="lineupSelectModel"
			@selectLineup="selectLineup"
			@onMenuClick="onMenuClick"
			@onClick="onClick"
		/>

		<!-- 나투스 시그니처 -->
		<HomeProductBrandNatusJinSignature
			id="signature"
			:signature-select-items="signatureSelectItems"
			:signature-select-item="signatureSelectItem"
			:signature-select-model="signatureSelectModel"
			@selectSignature="selectSignature"
			@onMenuClick="onMenuClick"
			@onClick="onClick"
		/>

		<!-- 브랜드 장단점 -->
		<HomeProductBrandNatusJinSpecial
			id="special"
			:special-items="specialItems"
		/>

		<!-- 나투스진 List -->
		<div
			id="menuList"
			class="py-7 py-md-15 find_product wrapper"
		>
			<p class="mb-7 mb-md-11 tit tac">내게 딱 맞는 나투스 진을 골라보세요!</p>

			<v-col
				cols="12"
				class="pa-3 px-0 pl-3 mb-5 search_zone_box"
			>
				<CommonButtonsToggleButton05
					v-if="filterProductItems.length"
					v-model="selectNatusModel"
					:items="filterProductItems"
				/>
			</v-col>
			<v-col
				cols="12"
				class="pl-4 pl-md-6 pt-0"
			>
				전체 <b> {{ totalItemsCount }} </b>개
			</v-col>
			<v-row class="ma-0">
				<v-col class="pa-0 clickCursor">
					<div
						v-for="(menu, i) in filterPatternItems"
						:key="i"
						class="mx-3"
					>
						<CommonCardMenuCard01
							type="product_menu"
							:menu="menu"
							@submit="onClick"
						/>
					</div>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import common from '@/mixins/common'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'HomeProductNatusJin',
	metaInfo: {
		title: '나투스진 대표페이지ㅣ동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '나투스진ㅣ동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content:
					'나투스진, 마루, 강마루, 바닥재, 주거용 마루, 포름알데히드, 친환경, 신소재, 친환경자재, 고퀄리티, 고품질',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content:
					'나투스진은 동화의 독자 생산 기술을 적용한 친환경 신소재 NAF 코어를 가진 제품으로 포름알데히드가 거의 없는 SUPER E0 친환경 마루 입니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/product/brand/natusJin`,
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
			{
				title: '나투스진',
				subTitle: '제품 라인업',
				value: 0,
			},
			{
				title: '나투스진이',
				subTitle: '특별한이유!',
				value: 1,
			},
			{
				title: '내게 딱 맞는',
				subTitle: '나투스진!',
				value: 2,
			},
		],
		bestsellerItems: [
			{
				text: 'Natus Jin',
				image: require('@/assets/img/natus/img_product1.png'),
			},
			{
				text: 'TERA',
				image: require('@/assets/img/natus/img_product2.png'),
			},
			{
				text: 'HERRING BONE',
				image: require('@/assets/img/natus/img_product3.png'),
			},
			{
				text: 'GRANDE',
				image: require('@/assets/img/natus/img_product4.png'),
			},
			{
				text: 'TEXTURE',
				image: require('@/assets/img/natus/img_product5.png'),
			},
			{
				text: 'NATURE',
				image: require('@/assets/img/natus/img_product6.png'),
			},
		],
		specialItems: [
			{
				number: '02',
				image: require('@/assets/img/natus/img_brand2.jpg'),
				icon: require('@/assets/img/natus/icon_core_white_1.svg'),
				text: '선택의 폭이 넓은<br class="hidden-lg-and-up" />트렌디한 디자인',
				description:
					'<strong>다양한 사이즈, 패턴,</strong><br /><strong>컬러</strong>로 나만의 <strong>공간을 연출</strong>할 수 있어요.',
			},
			{
				number: '03',
				image: require('@/assets/img/natus/img_brand3.jpg'),
				icon: require('@/assets/img/natus/icon_core_white_2.svg'),
				text: '안심하고 사용하는<br class="hidden-lg-and-up" />친환경 마루',
				description:
					'NAF 코어는 포름알데히드 無첨가 자재로,<br />친환경자재 <strong>최고등급인 SEO 등급 </strong>을 받았어요',
			},
			{
				number: '04',
				image: require('@/assets/img/natus/img_brand4.jpg'),
				icon: require('@/assets/img/natus/icon_core_white_3.svg'),
				text: '10년,<br class="hidden-lg-and-up" />품질보증',
				description:
					'<strong>한번 깔면 오래 사용하는 마루,</strong><br /><strong>최대 10년 까지 품질</strong>을 보증해요.',
			},
		],
		lineupSelectModel: 0,
		lineupSelectItems: [
			{
				text: '나투스진',
				id: '2070',
				value: 0,
				goods_code: 'GC_00001',
				image: require('@/assets/img/natus/img_natusjin_2.jpg'),
				subImage: require('@/assets/img/natus/img_natusjin_3.jpg'),
				label: '나투스진 퓨어 그레이',
				description: '찍힘에 강한 고퀄리티 <br />마루를 찾고 있나요?',
				productInfo: '<p class="name">나투스진</p><span>(W)98 x (L)815 x (T)7mm</span>',
			},
			{
				text: '나투스진 테라',
				id: '2105',
				value: 1,
				goods_code: 'GC_00004',
				image: require('@/assets/img/natus/img_natusjin_4.jpg'),
				subImage: require('@/assets/img/natus/img_natusjin_5.jpg'),
				label: '나투스진 테라 캐러멜',
				description: '길어진 사이즈로 공간을 <br />더 넓어 보이게 하고 싶나요?',
				productInfo: '<p class="name">나투스진 테라</p><span>(W)161 x (L)1,215 x (T)7.5 mm</span>',
			},
			{
				text: '나투스진 헤링본',
				id: '2098',
				value: 2,
				goods_code: 'GC_00003',
				image: require('@/assets/img/natus/img_natusjin_6.jpg'),
				subImage: require('@/assets/img/natus/img_natusjin_7.jpg'),
				label: '나투스진 헤링본 옐로우',
				description: '우리집 만을 위한 특별한 <br />디자인 연출은 어때요?',
				productInfo: '<p class="name">나투스진 헤링본</p><span>(W)95 x (L)475 x (T)7 mm</span>',
			},
		],
		signatureSelectModel: 0,
		signatureSelectItems: [
			{
				text: '나투스진 그란데',
				id: '2089',
				value: 0,
				goods_code: 'GC_00002',
				image: require('@/assets/img/natus/img_signature_2.jpg'),
				subImage: require('@/assets/img/natus/img_signature_3.jpg'),
				label: '나투스진 그란데 플레인 그레이',
				description: '타일 느낌의 고급스러운 <br />인테리어는 어때요?',
				productInfo: '<p class="name">나투스진 그란데</p><span>(W)325 x (L)810 x (T)7mm</span>',
			},
			{
				text: '나투스진 텍스쳐',
				id: '2112',
				value: 1,
				goods_code: 'GC_00005',
				image: require('@/assets/img/natus/img_signature_4.jpg'),
				subImage: require('@/assets/img/natus/img_signature_5.jpg'),
				label: '나투스진 텍스쳐 럭스 그레이',
				description: '마루의 표면 감촉에서 나뭇결을 <br />그대로 느낄 수 있어요!',
				productInfo: '<p class="name">나투스진 텍스쳐</p><span>(W)125 x (L)800 x (T)7mm</span>',
			},
			{
				text: '나투스진 네이쳐',
				id: '2124',
				value: 2,
				goods_code: 'GC_00006',
				image: require('@/assets/img/natus/img_signature_6.jpg'),
				subImage: require('@/assets/img/natus/img_signature_7.jpg'),
				label: '나투스진 네이쳐 오크 베이지',
				description: '자연 그대로의 천연 목재를 <br />사용한 프리미엄 마루는 어때요?',
				productInfo: '<p class="name">나투스진 네이쳐</p><span>(W)143 x (L)1,205 x (T)7mm</span>',
			},
		],
		selectNatusModel: 0,
		models: {
			productModel: [],
		},
		loop: null,
	}),
	computed: {
		...mapGetters([
			'APP_GET_APP_WIDTH',
			'APP_GET_APP_STATE',
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS', // 제품 카테고리
			'HOME_GET_TOTAL_PRODUCT_ITEMS', // 전체제품,
			'APP_GET_PAGE_LOAD',
		]),
		lineupSelectItem() {
			return this.lineupSelectItems[this.lineupSelectModel]
		},
		signatureSelectItem() {
			return this.signatureSelectItems[this.signatureSelectModel]
		},
		filterProductItems() {
			const natusItems = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(
				x => x.brand_code === 'BC_00001' && x.use_yn === 'Y',
			).map(x => {
				x.text = `나투스진 ${x.goods_name}`
				return x
			})
			natusItems.unshift({ text: '전체', goods_code: 'all' })
			return natusItems
		},
		filterPatternItems() {
			const product = this.filterProductItems[this.selectNatusModel]
			const totalData = this.HOME_GET_TOTAL_PRODUCT_ITEMS.filter(x => x.con_gubun === 'master')
			if (product.goods_code === 'all') {
				return totalData.filter(x => x.brand_code === 'BC_00001')
			} else {
				return totalData.filter(x => x.goods_code === product.goods_code)
			}
		},
		totalItemsCount() {
			return this.filterPatternItems.length
		},
	},
	watch: {},
	created() {
		window.addEventListener('scroll', this.handleScroll)
		if (!this.HOME_GET_TOTAL_PRODUCT_ITEMS.length) this.HOME_ACT_TOTAL_PRODUCT_ITEMS({})
	},
	mounted() {
		this.selectLoop()
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll)
		this.clearLoop()
	},
	methods: {
		...mapActions(['HOME_ACT_TOTAL_PRODUCT_ITEMS']),
		handleScroll() {
			const lineup = document.querySelector('#lineup')
			if (lineup.getBoundingClientRect().top - 120 < 0 && lineup.getBoundingClientRect().bottom > 0) {
				this.checkSection('lineup')
			}

			const special = document.querySelector('#special')
			if (special.getBoundingClientRect().top - 120 < 0 && special.getBoundingClientRect().bottom > 0) {
				this.checkSection('special')
			}

			const menuList = document.querySelector('#menuList')
			if (menuList.getBoundingClientRect().top - 120 < 0 && menuList.getBoundingClientRect().bottom > 0) {
				this.checkSection('menuList')
			}
		},
		checkSection(val) {
			let section
			switch (val) {
				case 'lineup':
					section = 0
					break
				case 'special':
					section = 1
					break
				case 'menuList':
					section = 2
					break
			}
			this.tab = this.tabItems.findIndex(item => item.value === section)
		},
		moveScroll(val) {
			let target
			switch (val.value) {
				case 0:
					target = '#lineup'
					break
				case 1:
					target = '#special'
					break
				case 2:
					target = '#menuList'
					break
			}

			const offsetValue = this.APP_GET_APP_STATE !== 'web' ? 55 : 30

			this.common_moveScroll(target, offsetValue)
		},
		selectLineup(val) {
			this.lineupSelectModel = val.value
			this.clearLoop()
			this.selectLoop()
		},
		selectSignature(val) {
			this.signatureSelectModel = val.value
			this.clearLoop()
			this.selectLoop()
		},
		selectLoop() {
			this.loop = setInterval(() => {
				// lineupSelectModel
				if (this.lineupSelectModel === 2) this.lineupSelectModel = 0
				else this.lineupSelectModel++

				// signatureSelectModel
				if (this.signatureSelectModel === 2) this.signatureSelectModel = 0
				else this.signatureSelectModel++
			}, 3000)
		},
		clearLoop() {
			clearInterval(this.loop)
		},
		onClick(val) {
			if (val) this.$router.push(`/product/detail/${val.id}`)
		},
		onMenuClick(val) {
			// 선택 메뉴 찾기
			const select = this[`${val}Items`][this[`${val}Model`]]
			this.selectNatusModel = this.filterProductItems.findIndex(x => x.goods_code === select.goods_code)

			// scroll move
			this.moveScroll({ value: 2 })
		},
	},
}
</script>

<style scoped lang="scss">
.anchor_tab {
	position: -webkit-sticky;
	position: sticky;
	top: 56px;
	z-index: 2;
	margin-top: 180px;
	:deep(.v-item-group) {
		background-color: #f0a178 !important;
	}
	:deep(.v-tabs-slider-wrapper) {
		height: 0;
		bottom: 3px;
		.v-tabs-slider {
			height: 5px;
		}
	}
	:deep(.v-tab) {
		color: $color_white !important;
		font-weight: $fw_normal;
		font-size: $font_xl;
		word-break: keep-all;
		opacity: 1 !important;
		&.v-tab--active {
			font-weight: $fw_bold;
		}
	}
}

.find_product {
	margin-bottom: 5rem;
	.tit {
		font-weight: $fw_regular;
		font-size: $font_tit;
		color: $color_font;
	}
}

@media all and (max-width: 959px) {
	.find_product {
		.tit {
			font-size: $font_lg !important;
		}
	}
}
@media (min-width: 341px) and (max-width: 959px) {
	.anchor_tab {
		margin-top: 100px !important;
		:deep(.v-item-group) {
			height: 60px;
		}
		:deep(.v-tab) {
			font-size: $font_normal !important;
		}
	}
}
@media all and (max-width: 340px) {
	.anchor_tab {
		margin-top: 100px !important;
		:deep(.v-tab) {
			font-size: $font_sm !important;
		}
		:deep(.v-slide-group__prev) {
			display: none !important;
		}
	}
}
@media all and (max-width: 320px) {
	.anchor_tab {
		:deep(.v-tab) {
			font-size: 0.8em !important;
		}
	}
}
</style>
