<template>
	<v-container class="py-0 fill-height">
		<v-col
			cols="12"
			align-self="center"
			align="center"
		>
			<v-img
				:src="require('@/assets/logo.svg')"
				width="165"
				height="160"
				aspect-ratio="0"
				contain
				eager
			/>
			<v-col
				cols="6"
				md="3"
				class="pt-5"
			>
				<CommonLoaderLine01 color="primary" />
			</v-col>
			<v-col
				cols="12"
				class="pt-3"
			>
				<v-btn
					tile
					color="olive"
					dark
					large
					width="120"
					@click="goHome"
				>
					Home
				</v-btn>
			</v-col>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Splash',
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'AUTH_GET_ADMIN_AUTH']),
		type() {
			return this.$route.params.type || null
		},
	},
	async mounted() {
		console.log('this.type', this.type)
		if (this.type === 'admin') {
			await this.AUTH_ACT_GET_TOKEN('admin_accessToken_confirm').then(async res => {
				console.log('admin / splash', res)
				if (res === 'GetAdminUser') return this.checkAdminAuth()
				else if (res === 'Fail' || res === 'Start') {
					await this.AUTH_ACT_ADMIN_LOGOUT()
					return this.$router.push('/master/login')
				}
				// else this.$router.go(-1)
				else return this.$router.push('/master/login')
			})
		} else if (this.type === 'user') {
			await this.AUTH_ACT_GET_TOKEN('accessToken_confirm').then(async res => {
				console.log('user / splash', res)
				if (res === 'GetUser') return this.checkAuth()
				else if (res === 'Fail' || res === 'Start') {
					await this.AUTH_ACT_LOGOUT()
					return this.$router.push('/')
				}
				// else this.$router.go(-1)
				else return this.$router.push('/login')
			})
		} else {
			await this.AUTH_ACT_LOGOUT()
			await this.AUTH_ACT_ADMIN_LOGOUT()
			this.$router.go(-1)
		}
	},
	methods: {
		...mapActions(['AUTH_ACT_GET_TOKEN', 'AUTH_ACT_ADMIN_LOGOUT', 'AUTH_ACT_LOGOUT']),
		checkAuth() {
			let link = '/'
			// 이전 경로 확인
			if (window.history.length > 0) return window.history.go(-1)

			switch (this.AUTH_GET_USER_AUTH) {
				case 'USER':
					link = '/'
					break
				case 'AGENCY':
					link = '/user'
					break
				default:
					link = '/'
			}
			return this.$router.push(link).catch(() => {})
		},
		checkAdminAuth() {
			let link = '/'
			// 이전 경로 확인
			if (window.history.length > 0) return window.history.go(-1)

			switch (this.AUTH_GET_ADMIN_AUTH) {
				case 'ADMIN':
					link = '/admin'
					break
				default:
					link = '/'
			}
			return this.$router.push(link).catch(() => {})
		},
		goHome() {
			if (this.type === 'admin') this.$router.push('/master/login')
			else this.$router.push('/')
		},
	},
}
</script>

<style scoped></style>
