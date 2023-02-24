<template>
	<v-app-bar
		app
		:clipped-right="true"
		:height="topbarHeight"
		color="white"
		class="header"
		flat
	>
		<div class="wrapper w100">
			<v-container
				class="pa-0 d-flex justify-center"
				fluid
			>
				<v-col
					cols="12"
					class="pa-0"
				>
					<v-row
						class="ma-0"
						align="center"
					>
						<!-- 로고 -->
						<div
							class="d-flex align-center logo pl-4 pl-md-2 pl-lg-0"
							@click="goHome"
						>
							<v-img
								alt="Logo"
								class="shrink"
								contain
								:src="logoImage"
								:height="topbarHeight"
								:width="logoWidth"
								eager
							/>
						</div>

						<v-spacer></v-spacer>

						<!-- 전체 -->
						<div class="overlay_menu_btn">
							<LayoutAppbarOverlayMenu :button-height="topbarHeight" />
						</div>

						<!-- 나투스진 -->
						<div
							class="logo px-2 hidden-sm-and-down"
							@click="goNatus"
						>
							<v-img
								alt="Logo"
								class="shrink ml-3 ml-lg-0"
								contain
								:src="natusImage"
								:height="topbarHeight"
								:width="logoWidth"
								eager
								width="70"
							/>
						</div>

						<!-- 메뉴 -->
						<div class="hidden-sm-and-down d-md-flex d-sm-none">
							<v-row class="ma-0">
								<v-col
									v-for="(menu, i) in common_menus"
									:key="i"
									class="pa-0"
								>
									<LayoutAppbarMenu
										:menu="menu"
										:button-height="topbarHeight"
									/>
								</v-col>
							</v-row>
						</div>
						<!-- full menu -->
						<!--<div class="ml-5 hidden-sm-and-down d-md-flex d-sm-none">
                            <v-row class="ma-0">
                                <LayoutAppbarMenuFull :menus="common_menus" />
                            </v-row>
                        </div>-->

						<v-spacer></v-spacer>

						<!-- 검색창 -->
						<LayoutAppbarSearch />

						<!-- 사용자버튼 -->
						<div class="shrink hidden-sm-and-down d-md-flex d-sm-none">
							<v-row class="ma-0">
								<LayoutAppbarUser
									:user="AUTH_GET_USER"
									:user-menu="userMenu"
									:is-login="isLogin"
								/>
								<LayoutAppbarScrap v-if="AUTH_GET_USER_AUTH === 'USER'" />
							</v-row>
						</div>

						<!-- 햄버거버튼 -->
						<v-btn
							class="ml-2 d-sm-flex d-md-none mr-3 btn_menu"
							icon
							width="30"
							@click="model = !model"
						>
							<v-img
								width="30"
								:src="require('@/assets/img/icon/icon_menu.svg')"
							/>
						</v-btn>
					</v-row>
				</v-col>
			</v-container>
		</div>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'

export default {
	name: 'Appbar',
	mixins: [model, common],
	data: () => ({
		topMenu: null,
		logoWidth: 130,
		topbarHeight: 80,
		// logoImage: require('@/assets/logo_white.png'),
		// logoImage: require('@/assets/logo_color.webp'),
		logoImage: require('@/assets/logo_color.svg'),
		natusImage: require('@/assets/img/natus/logo_natusjin.svg'),
		userMenu: [
			[
				{
					title: '로그아웃',
					to: '/login',
				},
				{
					title: '마이페이지',
					to: '/user',
				},
			],
			[
				{
					title: '로그인',
					to: '/login',
				},
				{
					title: '회원가입',
					to: '/login/signup',
				},
			],
		],
		items: [
			{ text: 'Real-Time', icon: 'mdi-clock' },
			{ text: 'Audience', icon: 'mdi-account' },
			{ text: 'Conversions', icon: 'mdi-flag' },
		],
	}),
	computed: {
		...mapGetters(['APP_GET_APP_STATE', 'AUTH_GET_USER', 'AUTH_GET_USER_AUTH']),
		isLogin() {
			let login = false
			if (this.AUTH_GET_USER_AUTH === 'USER' || this.AUTH_GET_USER_AUTH === 'AGENCY') return (login = true)
			return login
		},
		routerName() {
			return this.$route.name
		},
	},
	watch: {
		APP_GET_APP_STATE(val) {
			this.handleResize(val)
		},
	},
	created() {
		window.addEventListener('scroll', this.handleScroll)
	},
	mounted() {
		this.handleResize(this.APP_GET_APP_STATE)
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		handleScroll(e) {
			if (this.APP_GET_APP_STATE === 'web') {
				const scrollTop = e.target.scrollingElement.scrollTop
				this.topbarHeight = scrollTop > 10 ? 56 : 80
				this.logoWidth = scrollTop > 10 ? 70 : 130
				// this.logoImage = (scrollTop > 10)? require('@/assets/logo_color.png'): require('@/assets/logo_white.png')
			}
		},
		handleResize(val) {
			this.topbarHeight = val !== 'web' ? 56 : 80
			this.logoWidth = val !== 'web' ? 70 : 130
			// this.logoImage = (val !== 'web')? require('@/assets/logo_color.png'): require('@/assets/logo_white.png')
		},
		goHome() {
			if (this.routerName === 'Home') return this.$router.go(this.$router.currentRoute)
			this.$router.push('/')
		},
		goNatus() {
			if (this.routerName === 'Product_Brand_NatusJin') return // this.$router.go(this.$router.currentRoute)
			this.$router.push('/product/brand/natusJin')
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-toolbar__content) {
	padding: 0 !important;
}
.header {
	border-bottom: 1px solid #ccc !important;
	z-index: 12;
	.logo {
		cursor: pointer !important;
	}
}
.overlay_menu_btn {
	display: inline-block;
}
@media all and (max-width: 1280px) {
	.overlay_menu_btn {
		display: none;
	}
}
@media all and (max-width: 768px) {
	.btn_menu {
		:deep(.v-image) {
			max-width: 24px !important;
		}
	}
}
</style>
