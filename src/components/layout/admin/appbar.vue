<template>
	<v-app-bar
		app
		:clipped-right="true"
		:height="appbarHeight"
		color="primary"
		class="header"
		flat
		fixed
	>
		<v-container
			fluid
			class="pa-0 d-flex justify-center"
		>
			<v-row
				class="ma-0"
				align="center"
			>
				<div
					class="d-flex align-center d-sm-flex d-md-none"
					@click="goHome"
				>
					<v-img
						alt="Logo"
						class="shrink ml-3 ml-md-5"
						contain
						:src="logoImage"
						:height="appbarHeight"
						:width="logoWidth"
						eager
					/>
				</div>
				<p class="ml-6 appbar_user">{{ titleText }}</p>

				<v-spacer></v-spacer>
				<p class="hidden-sm-and-down ml-6 appbar_user">{{ AUTH_GET_ADMIN_USER.name }} 님</p>
				<v-btn
					class="mr-0 mr-md-3"
					dark
					text
					@click="logout"
				>
					<v-icon>logout</v-icon>
					<span class="hidden-md-and-down ml-2">LOGOUT</span>
				</v-btn>

				<v-btn
					class="d-sm-flex d-md-none mr-3"
					dark
					icon
					@click="model = !model"
				>
					<v-icon>mdi-menu</v-icon>
				</v-btn>
			</v-row>
		</v-container>
	</v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'AppbarAdmin',
	mixins: [model],
	data: () => ({
		topMenu: null,
		logoWidth: 100,
		appbarHeight: 64,
		logoImage: require('@/assets/logo_white.png'),
	}),
	computed: {
		...mapGetters(['AUTH_GET_ADMIN_USER']),
		isLogin() {
			return true
		},
		routerName() {
			return this.$route.name
		},
		titleText() {
			return this.$route.meta.title || '관리자 페이지'
		},
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['AUTH_ACT_ADMIN_LOGOUT']),
		goHome() {
			this.$router.push('/admin')
		},
		logout() {
			this.AUTH_ACT_ADMIN_LOGOUT()
			this.$router.push('/master/login')
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
}
.appbar_user {
	color: white;
	font-size: 1.15rem;
	font-family: 'NotoSansKR-Regular';
}
</style>
