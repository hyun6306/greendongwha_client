export const login = [
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" */ '@/layout/login.vue'),
		meta: { allow: 'GUEST', type: 'layout' },
		children: [
			{
				path: '/login',
				name: 'Login_Main',
				component: () => import(/* webpackChunkName: "Login" */ '@/views/login/login.vue'),
				meta: { title: '로그인' },
			},
			{
				path: '/login/find_info/:id',
				name: 'Login_Find_Info',
				component: () => import(/* webpackChunkName: "Login_Find" */ '@/views/login/findInfo.vue'),
				meta: { title: '아이디/비밀번호 찾기' },
			},
			{
				path: '/login/answer_id',
				name: 'Login_Answer_Id',
				component: () => import(/* webpackChunkName: "Login_Find" */ '@/views/login/answerId.vue'),
				meta: { title: '아이디 찾기 완료' },
			},
			{
				path: '/login/answer_password',
				name: 'Login_Answer_Password',
				component: () => import(/* webpackChunkName: "Login_Find" */ '@/views/login/answerPassword.vue'),
				meta: { title: '비밀번호 찾기 완료' },
			},
			{
				path: '/login/signup',
				name: 'Login_SignUp',
				component: () => import(/* webpackChunkName: "Login_SignUp" */ '@/views/login/signUp.vue'),
				meta: { title: '회원가입' },
			},
			{
				path: '/login/signupUser',
				name: 'Login_SignUp_User',
				component: () => import(/* webpackChunkName: "Login_SignUp" */ '@/views/login/signUpUser.vue'),
				meta: { title: '회원가입' },
			},
			{
				path: '/login/signupStore',
				name: 'Login_SignUp_Store',
				component: () => import(/* webpackChunkName: "Login_SignUp" */ '@/views/login/signUpStore.vue'),
				meta: { title: '회원가입' },
			},
			{
				path: '/login/oauth',
				name: 'Login_Main_Oauth',
				component: () => import(/* webpackChunkName: "Login_SignUp" */ '@/views/login/oauth/oauth.vue'),
				meta: { title: '리다렉트' },
			},
		],
	},
]
