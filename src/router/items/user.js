export const user = [
	{
		path: '/user',
		name: 'User',
		component: () => import(/* webpackChunkName: "User" */ '@/layout/user.vue'),
		meta: { allow: 'USER', type: 'layout' },
		children: [
			{
				path: '/user',
				name: 'User_MyPage',
				component: () => import(/* webpackChunkName: "User_MyPage" */ '@/views/user/myPage.vue'),
				meta: { title: '마이페이지' },
			},
			{
				path: '/user/detail/:tab',
				name: 'User_MyPage_Detail',
				component: () => import(/* webpackChunkName: "User_MyPage" */ '@/views/user/myPage.vue'),
				meta: { title: '마이페이지' },
			},
			{
				path: '/user/modify',
				name: 'User_Modify',
				component: () => import(/* webpackChunkName: "User_Modify" */ '@/views/user/user/modify.vue'),
				meta: { title: '정보수정' },
			},
			{
				path: '/user/modifyInfo',
				name: 'User_Modify_Info',
				component: () => import(/* webpackChunkName: "User_Modify" */ '@/views/user/user/modifyInfo.vue'),
				meta: { title: '회원정보수정' },
			},
			{
				path: '/user/scrap',
				name: 'User_Scrap',
				component: () => import(/* webpackChunkName: "User_MyPage" */ '@/views/user/user/scrap.vue'),
				meta: { title: '스크랩' },
			},
			{
				path: '/user/listDetail/:part',
				name: 'User_List_Detail',
				component: () => import(/* webpackChunkName: "User_MyPage" */ '@/views/user/listDetail.vue'),
			},
			{
				path: '/user/create/:part',
				name: 'User_Create',
				component: () => import(/* webpackChunkName: "User_Create" */ '@/views/user/create.vue'),
			},
			{
				path: '/interior/modify',
				name: 'Interior_Modify',
				component: () => import(/* webpackChunkName: "Interior_Modify" */ '@/views/user/interior/modify.vue'),
				meta: { title: '인테리어 정보수정' },
			},
			{
				path: '/interior/modifyInfo',
				name: 'Interior_Modify_Info',
				component: () => import(/* webpackChunkName: "Interior_Modify" */ '@/views/user/interior/modifyInfo.vue'),
				meta: { title: '인테리어 회원정보수정' },
			},
		],
	},
]
