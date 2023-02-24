export const admin = [
	{
		path: '/admin',
		name: 'Admin',
		component: () => import(/* webpackChunkName: "Admin" */ '@/layout/admin.vue'),
		meta: { allow: 'ADMIN', type: 'layout' },
		children: [
			{
				path: '/admin',
				name: 'Admin_Home',
				component: () => import(/* webpackChunkName: "Admin" */ '@/views/admin/home.vue'),
				// meta: { allow: 'J_01' },
				meta: { title: '관리자 페이지', type: 'layout' },
			},
			// Main
			// 메인관리
			{
				path: '/admin/main/banner',
				name: 'Admin_Main_Banner',
				component: () => import(/* webpackChunkName: "Admin_Main" */ '@/views/admin/main/banner.vue'),
				meta: { allow: 'A_01', title: '메인베너' },
			},
			{
				path: '/admin/main/popup',
				name: 'Admin_Main_Popup',
				component: () => import(/* webpackChunkName: "Admin_Main" */ '@/views/admin/main/popup.vue'),
				meta: { allow: 'A_02', title: '팝업' },
			},
			{
				path: '/admin/main/bestProduct',
				name: 'Admin_Main_Best_Product',
				component: () => import(/* webpackChunkName: "Admin_Main" */ '@/views/admin/main/bestProduct.vue'),
				meta: { allow: 'A_03', title: '베스트제품' },
			},
			{
				path: '/admin/main/recommendProduct',
				name: 'Admin_Main_Recommend_Product',
				component: () => import(/* webpackChunkName: "Admin_Main" */ '@/views/admin/main/recommendProduct.vue'),
				meta: { allow: 'A_04', title: '추천제품' },
			},
			{
				path: '/admin/main/recommendSearch',
				name: 'Admin_Main_Recommend_Search',
				component: () => import(/* webpackChunkName: "Admin_Main" */ '@/views/admin/main/recommendSearch.vue'),
				meta: { allow: 'A_05', title: '추천검색어' },
			},
			// Product
			// 제품관리
			{
				path: '/admin/product/category',
				name: 'Admin_Product_Category',
				component: () => import(/* webpackChunkName: "Admin_Product" */ '@/views/admin/product/category.vue'),
				meta: { allow: 'B_01', title: '카테고리' },
			},
			{
				path: '/admin/product/publicCode',
				name: 'Admin_Product_Public_Code',
				component: () => import(/* webpackChunkName: "Admin_Product" */ '@/views/admin/product/publicCode.vue'),
				meta: { allow: 'B_02', title: '공통코드' },
			},
			{
				path: '/admin/product/tag',
				name: 'Admin_Product_Tag',
				component: () => import(/* webpackChunkName: "Admin_Product" */ '@/views/admin/product/tag.vue'),
				meta: { allow: 'B_03', title: '태그' },
			},
			{
				path: '/admin/product/master',
				name: 'Admin_Product_Master',
				component: () => import(/* webpackChunkName: "Admin_Product" */ '@/views/admin/product/master.vue'),
				meta: { allow: 'B_04', title: '상품마스터' },
			},
			// Referece
			// 자료관리
			{
				path: '/admin/reference/certification',
				name: 'Admin_Reference_Certification',
				component: () => import(/* webpackChunkName: "Admin_Reference" */ '@/views/admin/reference/certification.vue'),
				meta: { allow: 'C_01', title: '인증서/시험성적서' },
			},
			{
				path: '/admin/reference/catalog',
				name: 'Admin_Reference_Catalog',
				component: () => import(/* webpackChunkName: "Admin_Reference" */ '@/views/admin/reference/catalog.vue'),
				meta: { allow: 'C_02', title: '카탈로그' },
			},
			// display
			// 전시관리
			{
				path: '/admin/display/house3d',
				name: 'Admin_Display_House_3d',
				component: () => import(/* webpackChunkName: "Admin_Display" */ '@/views/admin/display/house3D.vue'),
				meta: { allow: 'D_01', title: '3D 집들이' },
			},
			{
				path: '/admin/display/houseSpecial',
				name: 'Admin_Display_House_Special',
				component: () => import(/* webpackChunkName: "Admin_Display" */ '@/views/admin/display/houseSpecial.vue'),
				meta: { allow: 'D_02', title: '전문가 집들이' },
			},
			{
				path: '/admin/display/knowHowAdmin',
				name: 'Admin_Display_Know_How_Admin',
				component: () => import(/* webpackChunkName: "Admin_Display" */ '@/views/admin/display/knowHow.vue'),
				meta: { allow: 'D_03', title: '노하우' },
			},
			{
				path: '/admin/display/showRoom',
				name: 'Admin_Display_Show_Room',
				component: () => import(/* webpackChunkName: "Admin_Display" */ '@/views/admin/display/showRoom.vue'),
				meta: { allow: 'D_04', title: '동화 쇼룸' },
			},
			{
				path: '/admin/display/maruTv',
				name: 'Admin_Display_MaruTv',
				component: () => import(/* webpackChunkName: "Admin_Display_MaruTv" */ '@/views/admin/display/maruTv.vue'),
				meta: { allow: 'D_05', title: '마루잘알TV' },
			},
			// estimate
			// 견적상담
			{
				path: '/admin/estimate/manager',
				name: 'Admin_Estimate_Manager',
				component: () => import(/* webpackChunkName: "Admin_Estimate" */ '@/views/admin/estimate/manager.vue'),
				meta: { allow: 'E_01', title: '견적관리' },
			},
			{
				path: '/admin/estimate/consult',
				name: 'Admin_Estimate_Consult',
				component: () => import(/* webpackChunkName: "Admin_Estimate" */ '@/views/admin/estimate/consult.vue'),
				meta: { allow: 'E_02', title: '견적상담' },
			},
			{
				path: '/admin/estimate/productCost',
				name: 'Admin_Estimate_ProductCost',
				component: () => import(/* webpackChunkName: "Admin_Estimate" */ '@/views/admin/estimate/productCost.vue'),
				meta: { allow: 'E_03', title: '제품단가' },
			},
			{
				path: '/admin/estimate/estimateCost',
				name: 'Admin_Estimate_EstimateCost',
				component: () => import(/* webpackChunkName: "Admin_Estimate" */ '@/views/admin/estimate/estimateCost.vue'),
				meta: { allow: 'E_04', title: '견적단가' },
			},
			{
				path: '/admin/estimate/room',
				name: 'Admin_Estimate_Room',
				component: () => import(/* webpackChunkName: "Admin_Estimate" */ '@/views/admin/estimate/room.vue'),
				meta: { allow: 'E_05', title: '방면적' },
			},
			// marketing
			// 마케팅
			{
				path: '/admin/marketing/event',
				name: 'Admin_Marketing_Event',
				component: () => import(/* webpackChunkName: "Admin_Marketing" */ '@/views/admin/marketing/event.vue'),
				meta: { allow: 'F_01', title: '이벤트' },
			},
			// custom
			// 고객센터
			{
				path: '/admin/custom/special',
				name: 'Admin_Custom_Special',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/special.vue'),
				meta: { allow: 'G_01', title: '특판문의' },
			},
			{
				path: '/admin/custom/quality',
				name: 'Admin_Custom_Quality',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/quality.vue'),
				meta: { allow: 'G_02', title: '품질보증등록' },
			},
			{
				path: '/admin/custom/as',
				name: 'Admin_Custom_As',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/as.vue'),
				meta: { allow: 'G_03', title: 'A/S 신청' },
			},
			{
				path: '/admin/custom/question',
				name: 'Admin_Custom_Question',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/question.vue'),
				meta: { allow: 'G_04', title: '1:1 문의' },
			},
			{
				path: '/admin/custom/notice',
				name: 'Admin_Custom_Notice',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/notice.vue'),
				meta: { allow: 'G_05', title: '동화소식' },
			},
			{
				path: '/admin/custom/interiorQuestion',
				name: 'Admin_Custom_Interior_Question',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/interiorQuestion.vue'),
				meta: { allow: 'G_06', title: '인테리어점 문의' },
			},
			{
				path: '/admin/custom/interiorNotice',
				name: 'Admin_Custom_Interior_Notice',
				component: () => import(/* webpackChunkName: "Admin_Custom" */ '@/views/admin/custom/interiorNotice.vue'),
				meta: { allow: 'G_07', title: '인테리어점 공지' },
			},
			// user
			// 회원관리
			{
				path: '/admin/user/manager',
				name: 'Admin_User_Manager',
				component: () => import(/* webpackChunkName: "Admin_User" */ '@/views/admin/user/manager.vue'),
				meta: { allow: 'H_01', title: '회원관리' },
			},
			{
				path: '/admin/user/interior',
				name: 'Admin_User_Interior',
				component: () => import(/* webpackChunkName: "Admin_User" */ '@/views/admin/user/interior.vue'),
				meta: { allow: 'H_02', title: '인테리어점' },
			},
			{
				path: '/admin/user/scrap',
				name: 'Admin_User_Scrap',
				component: () => import(/* webpackChunkName: "Admin_User" */ '@/views/admin/user/scrap.vue'),
				meta: { allow: 'H_03', title: '스크랩' },
			},
			// admin
			// 관리자관리
			{
				path: '/admin/admin/manager',
				name: 'Admin_Admin_Manager',
				component: () => import(/* webpackChunkName: "Admin_Admin" */ '@/views/admin/admin/manager.vue'),
				meta: { allow: 'I_01', title: '관리자 관리' },
			},
			// statistics
			// 통계관리
			{
				path: '/admin/statistics/visit',
				name: 'Admin_Statistics_Visit',
				component: () => import(/* webpackChunkName: "Admin_Statistics" */ '@/views/admin/statistics/visit.vue'),
				meta: { allow: 'J_01', title: '방문자 통계' },
			},
			{
				path: '/admin/statistics/best',
				name: 'Admin_Statistics_Best',
				component: () => import(/* webpackChunkName: "Admin_Statistics" */ '@/views/admin/statistics/best.vue'),
				meta: { allow: 'J_02', title: 'BEST 통계' },
			},
		],
	},
]
