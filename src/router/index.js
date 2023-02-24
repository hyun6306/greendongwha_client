import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import localStorage from '@/utils/localStorage'

// router link
import { home } from '@/router/items/home'
import { login } from '@/router/items/login'
import { user } from '@/router/items/user'
import { admin } from '@/router/items/admin'
import { site } from '@/router/items/site'

Vue.use(VueRouter)

const routes = [
	{
		path: '/master',
		name: 'Master',
		component: () => import('@/layout/basic.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '/master/login',
				name: 'Master_Login',
				component: () => import('@/views/admin/login.vue'),
				meta: { title: '관리자 로그인' },
			},
		],
	},
	{
		path: '/test',
		name: 'Test',
		component: () => import('@/layout/test.vue'),
		meta: { allow: 'ADMIN', type: 'layout' },
		children: [
			{
				path: '/test/1',
				name: 'Test_1',
				component: () => import('@/test/1.vue'),
			},
			{
				path: '/test/2',
				name: 'Test_2',
				component: () => import('@/test/2.vue'),
			},
		],
	},
	{
		path: '/splash',
		name: 'Splash',
		component: () => import('@/layout/basic.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '/splash/:type',
				name: 'Splash_Main',
				component: () => import('@/views/splash.vue'),
			},
		],
	},
	{
		path: '/prerender',
		component: () => import('@/layout/basic.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: 'generator',
				name: 'Prerender_Generator',
				component: () => import('@/views/preGenerator.vue'),
			},
		],
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "Home" */ '@/layout/basic.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '*',
				name: 'Error',
				component: () => import('@/views/error.vue'),
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	// scroll 유지
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: [
		// {
		// 	path: '/',
		// 	name: 'root',
		// 	redirect: '/',
		// },
		...home,
		...login,
		...user,
		...admin,
		...site,
		...routes,
	],
})

// router guard
router.beforeEach(async (to, from, next) => {
	const authToken = localStorage.accessToken.get() // 일반  권한 토큰
	const xAuthToken = localStorage.xAccessToken.get() // 관리자 권한 토큰

	// 관리자 권한 및 정보 확인
	const adminUserInfo = store.getters.AUTH_GET_ADMIN_USER
	const adminUserAuth = store.getters.AUTH_GET_ADMIN_AUTH

	// 일반회원 권한
	const userAuth = store.getters.AUTH_GET_USER_AUTH

	// scrollBottom Event 초기화
	store.commit('APP_MU_SCROLL_BOTTOM', 0)

	// env setting
	const devMode = process.env.NODE_ENV === 'development'
	const allAuth = process.env.VUE_APP_ADMIN_ALL_PAGE_AUTH === 'true'

	// 권한 설정 router guard
	// router gaurd
	// admin = all | user | agency | geust
	to.matched.forEach(record => {
		// 개발 모드인 경우 모두 패스
		// if(devMode) return next()

		// 일반회원 권한 체크
		const checkUserAuth = () => {
			console.log('router check user')
			// 사용자 권한과 페이지 권한이 동일한 경우
			if (record.meta.allow === userAuth) {
				if (!allAuth) return next()
			}

			// AGENCY
			if (
				(userAuth === 'AGENCY' && authToken != null) ||
				(userAuth === 'AGENCY' && record.meta.allow === 'USER') ||
				(userAuth === 'AGENCY' && record.meta.allow === 'GUEST')
			) {
				return next()
			}
			// USER
			if ((userAuth === 'USER' && authToken != null) || (userAuth === 'USER' && record.meta.allow === 'GUEST')) {
				return next()
			}
			// 미가입 회원 GUEST 페이지에 권한 주기
			if (userAuth === 'GUEST' && record.meta.allow === 'GUEST') {
				return next()
			}

			// window.alert('접근권한이 없습니다.')
			return router.go(-1)
		}

		// 관리자회원 권한 체크
		const adminAuth = () => {
			console.log('router check admin user')

			// 사용자 권한과 페이지 권한이 동일한 경우
			if (record.meta.allow === userAuth) {
				if (!allAuth) return next()
			}

			// 관리자 권한
			if (adminUserAuth === 'ADMIN') {
				if (allAuth) {
					// env셋팅이 true면 모든 페이지 권한 O
					return next()
				} else {
					if (adminUserInfo.menuauth.some(x => x === record.meta.allow)) {
						return next()
					}
				}
			}
			return router.go(-1)
		}

		// 페이지 권한이 없는 경우 || type이 layout으로 정의된 경우 pass
		if (record.meta.allow === undefined || record.meta.type === 'layout') return next()

		// 관리자 페이지 접근시 확인
		if (record.name.includes('Admin')) {
			console.log('router / admin', xAuthToken, adminUserAuth)

			// xAccessToken이 있는 경우 데이터 확인
			if (xAuthToken !== null && adminUserAuth === 'GUEST') {
				return router.push('/splash/admin')
			}
			// 토큰이 없는 경우
			else if (xAuthToken === null && adminUserAuth === 'GUEST') {
				console.log('router / admin / token null', xAuthToken, adminUserAuth)
				return router.push('/master/login')
			} else {
				// admin auth check
				return adminAuth()
			}
		}

		// 일반회원 체크
		if (record.name.includes('User') || record.name.includes('Login')) {
			console.log('router / user', authToken, userAuth)
			// accessToken이 있는 경우 데이터 확인
			if (authToken !== null && userAuth === 'GUEST') {
				return router.push('/splash/user')
			} else if (authToken === null && userAuth === 'GUEST') {
				return router.push('/login')
			} else {
				// 일반회원 페이지 권한 확인
				return checkUserAuth()
			}
		} else {
			// 일반회원 페이지 권한 확인
			return checkUserAuth()
		}

		// if(from.name !== null){
		//     if(from.name.includes('Admin_Home')){
		//         window.alert('auth')
		//     }
		// }
	})
	next()
})

export default router
