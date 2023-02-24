import { mapGetters } from 'vuex'

export const export_admin_booleanItems = [
	{ text: 'ON', value: 'Y' },
	{ text: 'OFF', value: 'N' },
]
export const export_admin_popup_divisionItems = [
	{ text: 'PC', value: '1' },
	{ text: '모바일', value: '2' },
]
export const export_admin_part_divisionItems = [
	{ text: '주거용', value: '1' },
	{ text: '상업용', value: '2' },
]
export const export_admin_estimate_consult_statusItems = [
	{ text: '상담요청', value: '1' },
	{ text: '상담대기중', value: '2' },
	{ text: '상담완료', value: '3' },
]
export const export_admin_event_statusItems = [
	{ text: '전체', value: '' },
	{ text: '진행중', value: '1' },
	{ text: '종료', value: '2' },
	{ text: '당첨자발표', value: '3' },
]
export const export_admin_certification_divisionItems = [
	{ text: '인증서', value: '1' },
	{ text: '시험증명서', value: '2' },
]
export const export_admin_event_winStatusItems = [
	{ text: '당첨', value: 'Y' },
	{ text: '대기', value: 'N' },
]
export const export_admin_user_interior_statusItems = [
	{ text: '가입요청', value: '1' },
	{ text: '가입승인', value: '2' },
	{ text: '탈퇴요청', value: '3' },
	{ text: '탈퇴승인', value: '4' },
]
export const export_admin_user_scrapType_statusItems = [
	{ text: '전체', value: '' },
	{ text: '제품', value: 'master' },
	{ text: '전문가 집들이', value: 'housewarming' },
	{ text: '노하우', value: 'knowhow' },
	{ text: '3D 집들이', value: 'exphousewarming' },
	{ text: '인테리어점', value: 'corporation' },
	{ text: '이벤트', value: 'event' },
]
export const export_admin_quality_statusItems = [
	{ text: '요청', value: '1' },
	{ text: '승인', value: '2' },
	{ text: '반려', value: '3' },
]
export const export_admin_as_statusItems = [
	{ text: '접수중', value: '1' },
	{ text: '처리불가', value: '2' },
	{ text: '접수완료', value: '3' },
]
export const export_admin_question_statusItems = [
	{ text: '접수', value: '1' },
	{ text: '답변 완료', value: '2' },
]
export const export_admin_question_typeItems = [
	{ text: '제품 문의', value: '1' },
	{ text: '일반(기타) 문의', value: '2' },
]
export const export_admin_notice_importantItems = [
	{ text: '일반', value: 'N' },
	{ text: '중요', value: 'Y' },
]
export const export_admin_notice_divisionItems = [
	{ text: '공지', value: '1' },
	{ text: '뉴스', value: '2' },
]
export const export_admin_interior_questionItems = [
	{ text: '문의', value: '1' },
	{ text: '답변완료', value: '2' },
]
export const export_admin_user_interior_recommand_yn = [
	{ text: '추천', value: 'Y' },
	{ text: '일반', value: 'N' },
]
export const export_admin_category_product_guaranteeItems = [
	{ text: '없음', value: '0' },
	{ text: '1년', value: '1' },
	{ text: '10년', value: '10' },
]

export default {
	data: () => ({
		admin_booleanItems: export_admin_booleanItems,
		admin_popup_divisionItems: export_admin_popup_divisionItems,
		admin_part_divisionItems: export_admin_part_divisionItems,
		admin_estimate_consult_statusItems: export_admin_estimate_consult_statusItems,
		admin_quality_statusItems: export_admin_quality_statusItems,
		admin_event_statusItems: export_admin_event_statusItems,
		admin_certification_divisionItems: export_admin_certification_divisionItems,
		admin_event_winStatusItems: export_admin_event_winStatusItems,
		admin_user_interior_statusItems: export_admin_user_interior_statusItems,
		admin_user_scrapType_statusItems: export_admin_user_scrapType_statusItems,
		admin_as_statusItems: export_admin_as_statusItems,
		admin_question_statusItems: export_admin_question_statusItems,
		admin_question_typeItems: export_admin_question_typeItems,
		admin_notice_importantItems: export_admin_notice_importantItems,
		admin_notice_divisionItems: export_admin_notice_divisionItems,
		admin_interior_questionItems: export_admin_interior_questionItems,
		admin_user_interior_recommand_yn: export_admin_user_interior_recommand_yn,
		admin_category_product_guaranteeItems: export_admin_category_product_guaranteeItems,
		admin_user_divisions: [
			{ text: '정상', value: 'Y' },
			{ text: '탈퇴', value: 'N' },
		],
		admin_menu_items: [
			{
				title: '메인관리',
				icon: 'mdi-pine-tree',
				value: 'main',
				active: false,
				subMenu: [
					{
						title: '메인베너',
						to: '/admin/main/banner',
						allow: 'A_01',
					},
					{
						title: '팝업',
						to: '/admin/main/popup',
						allow: 'A_02',
					},
					{
						title: '베스트제품',
						to: '/admin/main/bestProduct',
						allow: 'A_03',
					},
					{
						title: '추천제품',
						to: '/admin/main/recommendProduct',
						allow: 'A_04',
					},
					{
						title: '추천검색어',
						to: '/admin/main/recommendSearch',
						allow: 'A_05',
					},
				],
			},
			{
				title: '제품관리',
				icon: 'mdi-auto-fix',
				value: 'product',
				active: false,
				subMenu: [
					{
						title: '카테고리',
						to: '/admin/product/category',
						allow: 'B_01',
					},
					{
						title: '공통코드',
						to: '/admin/product/publicCode',
						allow: 'B_02',
					},
					{
						title: '태그',
						to: '/admin/product/tag',
						allow: 'B_03',
					},
					{
						title: '상품마스터',
						to: '/admin/product/master',
						allow: 'B_04',
					},
				],
			},
			{
				title: '자료관리',
				icon: 'mdi-file',
				value: 'reference',
				active: false,
				subMenu: [
					{
						title: '인증서/시험성적서',
						to: '/admin/reference/certification',
						allow: 'C_01',
					},
					{
						title: '카탈로그',
						to: '/admin/reference/catalog',
						allow: 'C_02',
					},
				],
			},
			{
				title: '전시관리',
				icon: 'mdi-chess-queen',
				value: 'display',
				active: false,
				subMenu: [
					{
						title: '3D집들이',
						to: '/admin/display/house3d',
						allow: 'D_01',
					},
					{
						title: '전문가집들이',
						to: '/admin/display/houseSpecial',
						allow: 'D_02',
					},
					{
						title: '노하우',
						to: '/admin/display/knowHowAdmin',
						allow: 'D_03',
					},
					{
						title: '동화 쇼룸',
						to: '/admin/display/showRoom',
						allow: 'D_04',
					},
					{
						title: '마루잘알TV',
						to: '/admin/display/maruTv',
						allow: 'D_05',
					},
				],
			},
			{
				title: '견적상담',
				icon: 'mdi-clipboard-list',
				value: 'estimate',
				active: false,
				subMenu: [
					{
						title: '견적관리',
						to: '/admin/estimate/manager',
						allow: 'E_01',
					},
					{
						title: '견적상담',
						to: '/admin/estimate/consult',
						allow: 'E_02',
					},
					{
						title: '제품단가',
						to: '/admin/estimate/productCost',
						allow: 'E_03',
					},
					{
						title: '견적단가',
						to: '/admin/estimate/estimateCost',
						allow: 'E_04',
					},
					{
						title: '방면적',
						to: '/admin/estimate/room',
						allow: 'E_05',
					},
				],
			},
			{
				title: '마케팅',
				icon: 'mdi-shopping',
				value: 'marketing',
				active: false,
				subMenu: [
					{
						title: '이벤트',
						to: '/admin/marketing/event',
						allow: 'F_01',
					},
				],
			},
			{
				title: '고객센터',
				icon: 'mdi-account-tie-voice',
				value: 'custom',
				active: false,
				subMenu: [
					{
						title: '특판문의',
						to: '/admin/custom/special',
						allow: 'G_01',
					},
					{
						title: '품질보증등록',
						to: '/admin/custom/quality',
						allow: 'G_02',
					},
					{
						title: 'A/S 신청',
						to: '/admin/custom/as',
						allow: 'G_03',
					},
					{
						title: '1:1 문의',
						to: '/admin/custom/question',
						allow: 'G_04',
					},
					{
						title: '동화소식',
						to: '/admin/custom/notice',
						allow: 'G_05',
					},
					{
						title: '인테리어점 문의',
						to: '/admin/custom/interiorQuestion',
						allow: 'G_06',
					},
					{
						title: '인테리어점 공지',
						to: '/admin/custom/interiorNotice',
						allow: 'G_07',
					},
				],
			},
			{
				title: '회원관리',
				icon: 'mdi-account-group',
				value: 'user',
				active: false,
				subMenu: [
					{
						title: '회원관리',
						to: '/admin/user/manager',
						allow: 'H_01',
					},
					{
						title: '인테리어점',
						to: '/admin/user/interior',
						allow: 'H_02',
					},
					{
						title: '스크랩',
						to: '/admin/user/scrap',
						allow: 'H_03',
					},
				],
			},
			{
				title: '관리자관리',
				icon: 'mdi-shield-account',
				value: 'admin',
				active: false,
				subMenu: [
					{
						title: '관리자 관리',
						to: '/admin/admin/manager',
						allow: 'I_01',
					},
				],
			},
			{
				title: '통계관리',
				icon: 'mdi-chart-bar-stacked',
				value: 'statistics',
				active: false,
				subMenu: [
					{
						title: '방문자 통계',
						to: '/admin/statistics/visit',
						allow: 'J_01',
					},
					{
						title: 'BEST 통계',
						to: '/admin/statistics/best',
						allow: 'J_02',
					},
				],
			},
		],
	}),
	computed: {
		...mapGetters([
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS',
		]),
		admin_typeFilter() {
			let selectItems
			// 선택된 item 추출
			if (this.partModel)
				selectItems = this.admin_dataFindItems_code(
					this.partModel.subject_code,
					'subject_code',
					this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS,
				)
			return this.admin_dataFilter(selectItems, this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS, 'subject_code') || []
		},
		admin_brandFilter() {
			let selectItems
			// 선택된 item 추출
			if (this.typeModel)
				selectItems = this.admin_dataFindItems_code(
					this.typeModel.kind_code,
					'kind_code',
					this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS,
				)
			return this.admin_dataFilter(selectItems, this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS, 'kind_code') || []
		},
		admin_productFilter() {
			let selectItems
			// 선택된 item 추출
			if (this.brandModel)
				selectItems = this.admin_dataFindItems_code(
					this.brandModel.brand_code,
					'brand_code',
					this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS,
				)
			return this.admin_dataFilter(selectItems, this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS, 'brand_code') || []
		},
		admin_patternFilter() {
			let selectItems
			// 선택된 item 추출
			if (this.productModel)
				selectItems = this.admin_dataFindItems_code(
					this.productModel.goods_code,
					'goods_code',
					this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS,
				)
			return this.admin_dataFilter(selectItems, this.ADMIN_GET_PRODUCT_CATEGORY_PATTERN_ITEMS, 'goods_code') || []
		},
	},
	watch: {},
	methods: {
		admin_dataFilter(selectItems, childItems, filterCode) {
			// 선택한 코드의 code와 매칭되는 item filter
			let filter = []
			if (selectItems === undefined) return filter
			const code = selectItems.map(x => x[filterCode])
			code.forEach(element => childItems.filter(x => x[filterCode] === element).forEach(y => filter.push(y)))
			return filter
		},
		admin_dataFindItems_code(item, code, parentItems) {
			// parentItems에서 item과 같은 내용 추출
			let find = []
			if (typeof item !== 'string') return find
			find.push(parentItems.find(x => x[code] === item))
			return find
		},
		admin_dataFindItems(item, parentItems) {
			// parentItems에서 item과 같은 내용 추출
			let find = []
			if (typeof item !== 'string') return find
			find.push(parentItems.find(x => x.text === item))
			return find
		},
		admin_dataFind(selectItems, childItems, subjectCode) {
			return selectItems.find(x => x[subjectCode] === childItems[subjectCode])
		},
	},
}
