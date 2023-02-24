<template>
	<div>
		<v-col
			align="start"
			class="checkbox_group pa-2 mb-7"
		>
			<CommonCheckboxsCheckbox02All
				v-model="allValue"
				text="전체 동의"
				class="mb-1"
				@click="allowAll"
			/>
			<v-divider />
			<v-col class="pl-2">
				<CommonCheckboxsCheckbox02
					v-model="allow.age"
					text="(필수) 만 14세 이상입니다."
					class-name="justify-start"
				/>
				<CommonCheckboxsCheckbox02
					v-model="allow.use_yn"
					sub-text="(필수)"
					link="이용약관"
					href="/site/terms"
					text="에 동의"
					class-name="justify-start"
				/>
				<CommonCheckboxsCheckbox02
					v-model="allow.info"
					sub-text="(필수)"
					link="회원정보수집"
					href="/site/userInfo"
					text="에 동의"
					class-name="justify-start"
				/>
				<CommonCheckboxsCheckbox02
					v-model="allow.sms"
					text="(선택) 이벤트, 프로모션 알림 및 SMS 수신에 동의."
					class-name="justify-start"
				/>
				<CommonCheckboxsCheckbox02
					v-model="allow.email"
					text="(선택) 이벤트, 프로모션 알림 및 email 수신에 동의."
					class-name="justify-start"
				/>
			</v-col>
		</v-col>
		<v-col class="pa-0">
			<CommonButtonsButton01
				name="동의"
				color="#00582c"
				height="50"
				class-name="bold font_16 mb-3"
				:disabled="allowValue"
				rounded
				@click="confirm"
			/>
			<CommonButtonsButton02
				name="로그인 페이지로 이동 >"
				height="50"
				class-name="btn_more"
				color="#222222"
				text
				@click="$router.push('/login')"
			/>
		</v-col>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import model from '@/mixins/model'

export default {
	name: 'LoginSignupAllow01',
	mixins: [model],
	data: () => ({
		allow: {
			age: false,
			use_yn: false,
			info: false,
			sms: false,
			email: false,
		},
	}),
	computed: {
		allValue() {
			return Object.keys(this.allow).every(element => this.allow[element] === true)
		},
		allowValue() {
			let check = false
			const checkValue = ['age', 'use_yn', 'info']
			for (let i of checkValue) {
				if (this.allow[i] === false) check = true
			}
			return check
		},
	},
	watch: {},
	mounted() {},
	methods: {
		...mapMutations(['AUTH_MU_EVENT_INFO']),
		allowAll() {
			let val = true
			if (this.allValue) val = false

			Object.keys(this.allow).forEach(element => {
				this.allow[element] = val
			})
		},
		confirm() {
			const item = {
				sms: this.allow.sms,
				email: this.allow.email,
			}
			this.$cookies.set('signupAllowCookie', item)
			this.AUTH_MU_EVENT_INFO(item)
			this.model = 1
			this.$emit('submit')
		},
	},
}
</script>

<style scoped lang="scss">
.checkbox_group {
	min-height: 180px;
	background-color: #f8f8f8;
}
</style>
