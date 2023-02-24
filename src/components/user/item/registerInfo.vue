<template>
	<v-col class="pa-4 pa-md-6 register">
		<v-col class="pa-0 body">
			<v-col
				class="pa-0 table"
				cols="12"
			>
				<HomeCustomItemRegisterBasicInfo
					title="이름"
					:text="AUTH_GET_USER.login_id"
				/>
				<HomeCustomItemRegisterBasicInfo
					title="휴대폰"
					:text="common_number_filter(AUTH_GET_USER.hand)"
				/>
				<HomeCustomItemRegisterBasicInfo
					title="이메일"
					:text="AUTH_GET_USER.emailaddr"
				/>
				<HomeCustomItemRegisterBasicInfo
					title="시공장소"
					:text="`${info.zipcode}<br>${info.address}`"
					class="topBorder"
				/>
			</v-col>
		</v-col>
	</v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserRegisterInfo',
	components: {},
	mixins: [common],
	props: ['info'],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss"></style>
