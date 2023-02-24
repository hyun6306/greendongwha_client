<template>
	<v-menu
		offset-y
		open-on-click
		open-on-hover
		z-index="10000"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="#4c4c4c"
				dark
				icon
				v-bind="attrs"
				width="30"
				height="30"
				class="mx-4 ml-4 mr-lg-0"
				v-on="on"
			>
				<v-img
					width="30"
					class="icon_user"
					:src="require('@/assets/img/icon/icon_user.svg')"
				/>
			</v-btn>
		</template>
		<v-list>
			<div v-if="isLogin">
				<v-col>
					<p
						v-if="user.name"
						class="user_menu_title"
					>
						{{ user.name }}님
					</p>
					<p
						v-if="user.manager_name"
						class="user_menu_title"
					>
						{{ user.manager_name }}님
					</p>
				</v-col>
				<v-divider />
				<v-list-item
					v-for="(menu, i) in userMenu[0]"
					:key="i"
					@click="pushLink(menu)"
				>
					<v-list-item-title class="user_menu_title">{{ menu.title }}</v-list-item-title>
				</v-list-item>
			</div>
			<div v-else>
				<v-list-item
					v-for="(menu, i) in userMenu[1]"
					:key="i"
					@click="pushLink(menu)"
				>
					<v-list-item-title class="user_menu_title">{{ menu.title }}</v-list-item-title>
				</v-list-item>
			</div>
		</v-list>
	</v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'UserMenu',
	components: {},
	props: {
		user: {
			type: Object,
			default: () => {},
		},
		userMenu: {
			type: Array,
			default: () => [],
		},
		isLogin: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		...mapActions(['AUTH_ACT_LOGOUT']),
		pushLink(menu) {
			if (menu.title === '로그아웃') this.AUTH_ACT_LOGOUT()
			this.$router.push(menu.to).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.user_menu {
	&_title {
		font-weight: bold;
		font-size: 0.85em;
	}
}
</style>
