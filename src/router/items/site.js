export const site = [
	{
		path: '/site',
		name: 'Site',
		component: () => import(/* webpackChunkName: "Site" */ '@/layout/home.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '/site/terms',
				name: 'Site_Terms',
				component: () => import(/* webpackChunkName: "Site_Terms" */ '@/views/site/terms.vue'),
				meta: { title: '이용약관' },
			},
			{
				path: '/site/userInfo',
				name: 'Site_UserInfo',
				component: () => import(/* webpackChunkName: "Site_UserInfo" */ '@/views/site/userInfo.vue'),
				meta: { title: '회원정보처리방침' },
			},
			{
				path: '/site/brand',
				name: 'Site_Brand',
				component: () => import(/* webpackChunkName: "Site_Brand" */ '@/views/site/brand.vue'),
				meta: { title: '브랜드스토리' },
			},
			{
				path: '/site/catalog',
				name: 'Site_Catalog',
				component: () => import(/* webpackChunkName: "Site_Catalog" */ '@/views/site/catalog.vue'),
				meta: { title: '카탈로그' },
			},
			{
				path: '/site/certificate',
				name: 'Site_Certificate',
				component: () => import(/* webpackChunkName: "Site_Certificate" */ '@/views/site/certificate.vue'),
				meta: { title: '인증서/시험성적서' },
			},
		],
	},
]
