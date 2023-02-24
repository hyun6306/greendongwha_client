export const home = [
	{
		path: '/',
		name: 'root',
		component: () => import('@/layout/home.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				alias: '/',
				path: '/home',
				name: 'Home',
				component: () => import(/* webpackChunkName: "Home" */ '@/views/home/main.vue'),
				meta: { title: '홈', scrapCode: '' },
			},
			// 최근 본 상품
			{
				path: '/recent',
				name: 'Recent',
				component: () => import(/* webpackChunkName: "Recent" */ '@/views/home/recent.vue'),
				meta: { title: '최근 본 상품' },
			},
			// housewarming
			// 집들이
			{
				path: '/housewarming',
				name: 'Housewarming',
				component: () => import(/* webpackChunkName: "Housewarming" */ '@/views/home/housewarming/index.vue'),
				children: [
					{
						path: '3d',
						name: 'Housewarming_3D',
						component: () => import(/* webpackChunkName: "Housewarming_3D" */ '@/views/home/housewarming/3d.vue'),
						meta: { title: '3D 집들이', scrapCode: 'housewarming' },
					},
					{
						path: '3d/detail/:id',
						name: 'Housewarming_3D_Detail',
						component: () =>
							import(/* webpackChunkName: "Housewarming_3D_Detail" */ '@/views/home/housewarming/3d/detail.vue'),
						meta: { title: '3D 집들이', scrapCode: 'housewarming' },
					},
					{
						path: 'specialist',
						name: 'Housewarming_Specialist',
						component: () =>
							import(/* webpackChunkName: "Housewarming_Specialist" */ '@/views/home/housewarming/specialist.vue'),
						meta: { title: '전문가 집들이', scrapCode: 'exphousewarming' },
					},
					{
						path: 'specialist/detail/:id',
						name: 'Housewarming_Specialist_Detail',
						component: () =>
							import(
								/* webpackChunkName: "Housewarming_Specialist_Detail" */ '@/views/home/housewarming/specialist/detail.vue'
							),
						meta: { title: '전문가 집들이', scrapCode: 'exphousewarming' },
					},
				],
			},
			// product
			// 제품
			{
				path: '/product',
				name: 'Product',
				component: () => import(/* webpackChunkName: "Product" */ '@/views/home/product/index.vue'),
				children: [
					{
						path: 'search',
						name: 'Product_Search',
						component: () => import(/* webpackChunkName: "Product_Search" */ '@/views/home/product/search.vue'),
						meta: { title: '제품 찾기', scrapCode: 'master' },
					},
					{
						path: 'dwelling',
						name: 'Product_Dwelling',
						component: () => import(/* webpackChunkName: "Product_Dwelling" */ '@/views/home/product/dwelling.vue'),
						meta: { title: '주거용', scrapCode: 'master' },
					},
					{
						path: 'commercial',
						name: 'Product_Commercial',
						component: () =>
							import(/* webpackChunkName: "Product_Commercial" */ '@/views/home/product/commercial.vue'),
						meta: { title: '상업용', scrapCode: 'master' },
					},
					{
						path: 'special',
						component: () =>
							import(/* webpackChunkName: "Product_Special" */ '@/views/home/product/special/index.vue'),
						meta: { title: '특판 문의' },
						children: [
							{
								path: '/',
								name: 'Product_Special',
								component: () =>
									import(/* webpackChunkName: "Product_Special" */ '@/views/home/product/special/special.vue'),
								meta: { title: '특판 문의' },
							},
							{
								path: 'detail',
								name: 'Product_Special_Detail',
								component: () =>
									import(/* webpackChunkName: "Product_Special" */ '@/views/home/product/special/detail.vue'),
								meta: { title: '특판 상세' },
							},
						],
					},
					{
						path: 'brand',
						component: () => import(/* webpackChunkName: "Product_Brand" */ '@/views/home/product/brand/index.vue'),
						meta: { title: '브랜드' },
						children: [
							{
								path: 'natusJin',
								name: 'Product_Brand_NatusJin',
								component: () =>
									import(
										/* webpackChunkName: "Product_Brand_NatusJin" */ '@/views/home/product/brand/natusJin.vue'
									),
								meta: { title: '나투스진' },
							},
						],
					},
					{
						path: 'detail/:id',
						name: 'Product_Detail',
						component: () => import(/* webpackChunkName: "Product_Detail" */ '@/views/home/product/detail.vue'),
						meta: { title: '제품 상세', scrapCode: 'master' },
					},
				],
			},

			// interior
			// 인테리어
			{
				path: '/interior/price',
				name: 'Interior_Price',
				component: () => import(/* webpackChunkName: "Interior_Price" */ '@/views/home/interior/price.vue'),
				meta: { title: '견적내기' },
			},
			{
				path: '/interior/price/inquire',
				name: 'Interior_Price_Inquire',
				component: () =>
					import(/* webpackChunkName: "Interior_Price_Inquire" */ '@/views/home/interior/price/inquire.vue'),
				meta: { title: '견적상담' },
			},
			{
				path: '/interior/showRoom',
				name: 'Interior_ShowRoom',
				component: () => import(/* webpackChunkName: "Interior_ShowRoom" */ '@/views/home/interior/showRoom.vue'),
				meta: { title: '동화 쇼룸 찾기' },
			},
			{
				path: '/interior/showRoom/detail/:id',
				name: 'Interior_ShowRoom_Detail',
				component: () =>
					import(/* webpackChunkName: "Interior_ShowRoom_Detail" */ '@/views/home/interior/showRoom/detail.vue'),
				meta: { title: '동화 쇼룸 상세정보', scrapCode: 'showroom' },
			},
			{
				path: '/interior/store',
				name: 'Interior_Store',
				component: () => import(/* webpackChunkName: "Interior_Store" */ '@/views/home/interior/store.vue'),
				meta: { title: '인테리어점 찾기' },
			},
			{
				path: '/interior/store/detail/:id',
				name: 'Interior_Store_Detail',
				component: () => import(/* webpackChunkName: "Interior_Store_Detail" */ '@/views/home/interior/store/detail.vue'),
				meta: { title: '인테리어점 상세정보', scrapCode: 'corporation' },
			},

			// community
			// 커뮤니티
			{
				path: '/community',
				name: 'Community',
				component: () => import(/* webpackChunkName: "Community" */ '@/views/home/community/index.vue'),
				children: [
					{
						path: 'home',
						name: 'Community_Home',
						component: () => import(/* webpackChunkName: "Community_Home" */ '@/views/home/community/home.vue'),
						meta: { title: '커뮤니티 홈', scrapCode: 'knowhow' },
					},
					{
						path: 'knowHow',
						name: 'Community_KnowHow',
						component: () => import(/* webpackChunkName: "Community_KnowHow" */ '@/views/home/community/knowHow.vue'),
						meta: { title: '노하우', scrapCode: 'knowhow' },
					},
					{
						path: 'knowHow/detail/:id',
						name: 'Community_KnowHow_Detail',
						component: () =>
							import(
								/* webpackChunkName: "Community_KnowHow_Detail" */ '@/views/home/community/knowHow/detail.vue'
							),
						meta: { title: '노하우', scrapCode: 'knowhow' },
					},
					{
						path: 'maruTv',
						name: 'Community_MaruTv',
						component: () => import(/* webpackChunkName: "Community_MaruTv" */ '@/views/home/community/maruTv.vue'),
						meta: { title: '마루잘알TV', scrapCode: 'knowhow' },
					},
					{
						path: 'instagram',
						name: 'Community_Instagram',
						component: () =>
							import(/* webpackChunkName: "Community_Instagram" */ '@/views/home/community/instagram.vue'),
						meta: { title: '마루스타그램', scrapCode: 'knowhow' },
					},
					{
						path: 'pick',
						name: 'Community_Pick',
						component: () => import(/* webpackChunkName: "Community_Pick" */ '@/views/home/community/home.vue'),
						meta: { title: '동화s Pick', scrapCode: 'knowhow' },
					},
					{
						path: 'event',
						name: 'Community_Event',
						component: () => import(/* webpackChunkName: "Community_Event" */ '@/views/home/community/event.vue'),
						meta: { title: '이벤트', scrapCode: 'event' },
					},
					{
						path: 'event/detail/:id',
						name: 'Community_Event_Detail',
						component: () =>
							import(/* webpackChunkName: "Community_Event_Detail" */ '@/views/home/community/event/detail.vue'),
						meta: { title: '이벤트 정보', scrapCode: 'event' },
					},
				],
			},

			// custom
			// 고객센터
			{
				path: '/custom',
				name: 'Custom',
				component: () => import(/* webpackChunkName: "Custom" */ '@/views/home/custom/index.vue'),
				children: [
					{
						path: 'quality',
						name: 'Custom_Quality',
						component: () => import(/* webpackChunkName: "Custom_Quality" */ '@/views/home/custom/user/quality.vue'),
						meta: { title: '품질보증' },
					},
					{
						path: 'as',
						name: 'Custom_AS',
						component: () => import(/* webpackChunkName: "Custom_AS" */ '@/views/home/custom/user/as.vue'),
						meta: { title: 'A/S 신청' },
					},
					{
						path: 'question',
						name: 'Custom_Question',
						component: () =>
							import(/* webpackChunkName: "Custom_Question" */ '@/views/home/custom/user/question.vue'),
						meta: { title: '1:1 문의' },
					},
					{
						path: 'notice',
						name: 'Custom_Notice',
						component: () => import(/* webpackChunkName: "Custom_Notice" */ '@/views/home/custom/notice.vue'),
						meta: { title: '동화소식' },
					},
					{
						path: 'notice/detail/:id',
						name: 'Custom_Notice_Detail',
						component: () =>
							import(/* webpackChunkName: "Custom_Notice_Detail" */ '@/views/home/custom/notice/detail.vue'),
						meta: { title: '동화소식 상세' },
					},

					// 고객지원 - 인테리어
					{
						path: 'interior/notice',
						name: 'Custom_Interior_Notice',
						component: () =>
							import(/* webpackChunkName: "Custom_Interior_Notice" */ '@/views/home/custom/interior/notice.vue'),
						meta: { title: '인테리어점 공지' },
					},
					{
						path: 'interior/notice/detail/:id',
						name: 'Custom_Interior_Detail',
						component: () =>
							import(/* webpackChunkName: "Custom_Interior_Detail" */ '@/views/home/custom/interior/detail.vue'),
						meta: { title: '인테리어점공지 상세' },
					},
					{
						path: 'interior/ask',
						name: 'Custom_Interior_Ask',
						component: () =>
							import(/* webpackChunkName: "Custom_Interior_Ask" */ '@/views/home/custom/interior/ask.vue'),
						meta: { title: '인테리어점 문의' },
					},
				],
			},
		],
	},
	{
		path: '/3d',
		component: () => import(/* webpackChunkName: "Housewarming_3D" */ '@/layout/basic.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '/3d/coohome',
				name: 'Housewarming_3D_CooHome',
				component: () =>
					import(/* webpackChunkName: "Housewarming_3D_CooHome" */ '@/views/home/housewarming/3d/cooHome.vue'),
				meta: { title: '3D 집들이' },
			},
		],
	},
]
