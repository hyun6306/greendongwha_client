<template>
	<!-- 모바일버전 전체메뉴 -->
	<v-navigation-drawer
		v-model="model"
		app
		clipped
		temporary
		field
		right
		touchless
		width="320"
		class="drawer_box"
	>
		<!-- 로그인상태 -->
		<v-list-item class="login_state">
			<v-row
				class="ma-0"
				align="center"
			>
				<v-col
					cols="10"
					class="pa-0"
					@click="onUserClick"
				>
					<v-row class="ma-0">
						<v-col
							class="pa-0"
							cols="auto"
						>
							<v-img
								:src="require('@/assets/img/icon/icon_user.png')"
								width="24"
								height="24"
								contain
							/>
						</v-col>
						<v-col class="pa-0 pl-2">
							<span v-if="AUTH_GET_USER_AUTH === 'GUEST'">로그인</span>
							<span v-else>
								안녕하세요!
								<strong>{{ AUTH_GET_USER.name }}</strong>
								님
							</span>
						</v-col>
					</v-row>
				</v-col>
				<v-col
					cols="2"
					class="pa-0 pl-3"
				>
					<v-btn
						icon
						text
						@click="toggleModel"
					>
						<v-icon>clear</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-list-item>

		<v-divider></v-divider>

		<!-- 버튼메뉴(회원가입/동화톡톡/동화콜센터) -->
		<v-list-item class="pa-0 icon_menu_top">
			<v-row
				class="ma-3"
				align="center"
			>
				<v-col
					v-for="(menu, i) in menuListItems"
					:key="i"
					v-ripple
					cols="4"
					align="center"
					justify="center"
					class="pa-3 icon_menu_item"
					@click="onClick(menu)"
				>
					<v-img
						width="26"
						class="pb-2"
						:src="menu.icon"
						contain
					/>
					<p class="color_white ma-0">{{ menu.title }}</p>
				</v-col>
			</v-row>
		</v-list-item>

		<!-- 버튼메뉴(최근본상품/빠른견적내기) -->
		<v-list-item class="pa-0 icon_menu_bottom">
			<v-row class="ma-3">
				<v-col
					v-for="(menu, i) in floatingMenuListItems"
					:key="i"
					v-ripple
					cols="6"
					align="center"
					justify="center"
					class="icon_menu_item pa-3"
					@click="onClick(menu)"
				>
					<v-img
						width="26"
						class="pb-2"
						:src="menu.icon"
						contain
					/>
					<p class="color_white ma-0">{{ menu.title }}</p>
				</v-col>
			</v-row>
			<div
				id="naverChatBot"
				class="talk_banner_div"
				data-id="22278"
				style="display: none"
			></div>
		</v-list-item>

		<!-- 전체메뉴 -->
		<v-list class="mb-10">
			<v-list-item class="drawer_menu ml-5">
				<v-row
					class="ma-0"
					@click="$router.push('/product/brand/natusJin')"
				>
					<v-col
						cols="4"
						class="pa-0"
					>
						<v-img
							contain
							eager
							width="70"
							:src="require('@/assets/img/natus/logo_natusjin.svg')"
						/>
					</v-col>
					<span>〉</span>
				</v-row>
			</v-list-item>
			<v-list-group
				v-for="(item, i) in common_menus"
				:key="i"
				v-model="item.active"
				no-action
				class="drawer_menu ml-5"
			>
				<template v-slot:activator>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</template>

				<v-list-item
					v-for="child in item.subMenu"
					:key="child.title"
					class="drawer_menu_sub ml-5"
					:to="child.to"
					link
				>
					<v-list-item-content>
						<v-list-item-title v-text="child.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
		<v-col
			v-if="AUTH_GET_USER_AUTH !== 'GUEST'"
			cols="12"
			class="pa-0 pb-3"
			@click="logout"
		>
			<v-btn
				block
				tile
				text
				clas="py-3"
			>
				<v-icon>mdi-logout</v-icon>
				로그아웃
			</v-btn>
		</v-col>

		<!--		<template v-slot:append>-->
		<!--		</template>-->
	</v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import naver_chatbot from '@/mixins/naver_chatbot'

export default {
	name: 'Drawer',
	mixins: [model, common, naver_chatbot],
	data: () => ({
		floatingMenuListItems: [
			{
				title: '최근 본 상품',
				icon: require('@/assets/img/icon/icon_recent_white.png'),
				to: '/recent',
			},
			{
				title: '견적내기',
				icon: require('@/assets/img/icon/icon_estimate_white.png'),
				to: '/interior/price',
			},
		],
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'AUTH_GET_USER_AUTH']),
		recentlyRouterPath() {
			return this.$route.path
		},
		menuListItems() {
			let list = [
				{
					title: '동화 톡톡',
					icon: require('@/assets/img/icon/icon_talk_white.png'),
					to: '/',
				},
				{
					title: '동화 콜센터',
					icon: require('@/assets/img/icon/icon_call_white.png'),
					to: '/',
				},
			]

			if (this.AUTH_GET_USER_AUTH === 'GUEST')
				list.unshift({ title: '회원가입', icon: require('@/assets/img/icon/icon_user_white.png'), to: '/login/signup' })
			else list.unshift({ title: '마이페이지', icon: require('@/assets/img/icon/icon_user_white.png'), to: '/user' })

			return list
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapActions(['AUTH_ACT_LOGOUT']),
		onClick(link) {
			switch (link.title) {
				case '동화 톡톡':
					this.naver_chatbot_on_click()
					break
				case '동화 콜센터':
					this.common_phoneCall('18992837')
					break
				default:
					if (this.recentlyRouterPath === link.to) return this.toggleModel()
					this.$router.push(link.to)
					break
			}
		},
		onUserClick() {
			let select

			if (this.AUTH_GET_USER_AUTH === 'GUEST') select = '/login'
			else select = '/user'

			if (this.recentlyRouterPath === select) return this.toggleModel()

			this.$router.push(select)
		},
		toggleModel() {
			this.model = !this.model
		},
		logout() {
			this.AUTH_ACT_LOGOUT()
			this.$router.push('/login')
		},
	},
}
</script>

<style scoped lang="scss">
.drawer_box {
	z-index: 13;
}

.login_state {
	height: 60px;
	span {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px !important;
		color: #262626 !important;
	}
}

.icon_menu {
	&_top {
		background: #41843c;
	}
	&_bottom {
		background: #367a31;
	}
	&_item {
		border-right: 1px solid #7aa977;
		&:last-child {
			border-right: none;
		}
	}
	p {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px;
		color: #fff;
	}
}

.drawer_menu {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	color: #262626 !important;
	border-bottom: 1px solid #262626;
	&_sub {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 13px !important;
		color: #262626 !important;
		border-bottom: 1px solid #cfcfcf;
		min-height: 40px !important;
	}
	&_sub:last-child {
		border-bottom: none !important;
	}
}
.logout_btn {
	position: absolute;
	bottom: 10px !important;
}
.v-list-item--link:before {
	background-color: transparent;
}
.v-list-group__header .v-list-item .v-list-item--active {
	border-bottom: 1px solid #f7f7f7;
}
.v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
	padding-left: 20px;
}
.v-list-item__content {
	padding-top: 5px;
	padding-bottom: 5px;
}
</style>
