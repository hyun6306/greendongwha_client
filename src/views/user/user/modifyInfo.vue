<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<div class="content_title">
					마이페이지
					<p class="sub_title">동화자연마루를 이용해주셔서 감사합니다.</p>
				</div>
			</v-col>

			<!-- 일반 회원 수정 -->
			<UserUserModifyUser v-if="AUTH_GET_USER_AUTH === 'USER'" />

			<!-- 인테리어 회원 수정 -->
			<UserUserModifyInterior v-if="AUTH_GET_USER_AUTH === 'AGENCY'" />
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserModifyInfo',
	mixins: [common],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	methods: {
		...mapMutations([]),
	},
}
</script>

<style scoped lang="scss">
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
}
@media all and (max-width: 380px) {
}
</style>
