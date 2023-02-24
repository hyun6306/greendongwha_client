<template>
	<v-navigation-drawer
		v-model="model"
		app
		:mini-variant="mini"
		:permanent="APP_GET_APP_STATE === 'web'"
		:expand-on-hover="mini"
		field
		touchless
		color="#f3f6f3"
		width="250"
	>
		<v-list-item
			v-if="!mini"
			class="px-2 py-1"
		>
			<v-img
				alt="Logo"
				class="shrink ma-10"
				contain
				:src="require('@/assets/logo_color.webp')"
				:width="150"
				eager
				@click="$router.push('/splash/admin')"
			/>
		</v-list-item>

		<v-divider v-if="!mini"></v-divider>

		<v-list
			dense
			class="pa-0 pt-3"
		>
			<v-list-item
				v-model="selectHome"
				active-class="list_active"
				@click="common_pushRouter('/admin')"
			>
				<v-list-item-icon>
					<v-icon>mdi-home</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>홈</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<template v-for="(menuItems, i) in items">
				<template v-if="menuItems.subMenu">
					<v-list-group
						:key="i"
						v-model="menuItems.active"
						:prepend-icon="menuItems.icon"
						:link="mini"
						no-action
						color="primary"
						@click="mini ? common_pushRouter(menuItems.subMenu[0].to) : ''"
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>{{ menuItems.title }}</v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item
							v-for="(item, n) in menuItems.subMenu"
							:key="n"
							:to="item.to"
							active-class="list_active"
							link
						>
							<v-list-item-content>
								<v-list-item-title v-text="item.title"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
				</template>
				<template v-else>
					<v-list-item
						:key="i"
						:to="menuItems.to"
						link
						color="primary"
					>
						<v-list-item-icon>
							<v-icon>{{ menuItems.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="menuItems.title"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</template>
		</v-list>
		<template v-slot:append>
			<div class="pa-2">
				<v-btn
					:icon="mini"
					text
					block
					@click="mini = !mini"
				>
					<v-icon v-if="mini">arrow_forward_ios</v-icon>
					<span v-else>mini mode</span>
				</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

// 페이지 필터 여부
const envMenuFilter = process.env.VUE_APP_ADMIN_MENU_FILTER === 'true'

export default {
	name: 'DrawerAdmin',
	components: {},
	mixins: [model, common, admin],
	data: () => ({
		drawer: false,
		selectHome: true,
		items: [],
		mini: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER', 'APP_GET_APP_STATE']),
		recentlyRouterPath() {
			return this.$route.path
		},
	},
	watch: {
		APP_GET_APP_STATE(val) {
			val === 'web' ? (this.mini = true) : (this.mini = false)
		},
		recentlyRouterPath() {
			this.checkAdminHome()
		},
		AUTH_GET_ADMIN_USER() {
			if (envMenuFilter) this.filterUserMenu()
			else this.items = this.admin_menu_items
		},
	},
	created() {
		// this.filterUserMenu()
	},
	mounted() {},
	methods: {
		filterUserMenu() {
			let userMenu = []
			// console.log('menuauth',this.AUTH_GET_ADMIN_USER.menuauth)
			// console.log('menuauth',this.AUTH_GET_ADMIN_USER)
			if (this.AUTH_GET_ADMIN_USER.menuauth === null || this.AUTH_GET_ADMIN_USER.menuauth === undefined)
				return (this.admin_menu_items = [])

			// 권한이 있는 메뉴만 보이게 filter
			this.AUTH_GET_ADMIN_USER.menuauth.forEach(element => {
				this.admin_menu_items.forEach(menuGroup => {
					menuGroup.subMenu.forEach(menu => {
						if (menu.allow === element) {
							let findMenu

							// userMenu에 menuGroup이 있는지 확인
							if (userMenu !== []) findMenu = userMenu.find(x => menuGroup.title === x.title)
							else findMenu = false

							// menuGroup이 없다면 생성 // 있다면 subMenu에 push
							if (!findMenu) {
								let customMenu = { ...menuGroup }
								customMenu.subMenu = [menu]
								userMenu.push(customMenu)
							} else {
								let menuIndex = userMenu.findIndex(x => menuGroup.title === x.title)
								userMenu[menuIndex].subMenu.push(menu)
							}
						}
					})
				})
			})
			this.items = userMenu
			this.checkAdminHome()
			// console.log('user', userMenu)
		},
		checkAdminHome() {
			// home 선택여부 확인
			if (this.recentlyRouterPath === '/admin') return (this.selectHome = true)
			this.selectHome = false

			// 해당 router active 추가
			const activePartName = this.recentlyRouterPath.split('/')[2]

			// 선택 active 속성 수정
			const index = this.items.findIndex(x => x.value === activePartName)
			this.items[index].active = true
		},
	},
}
</script>
<style scoped lang="scss">
:deep(.v-list-group__items) {
	background-color: #e3eae6 !important;
}
.list_active {
	background-color: #007e3f;
	color: white;
}
</style>
