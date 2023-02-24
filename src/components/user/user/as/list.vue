<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				align="start"
				align-self="center"
				>A/S 신청 내역</v-col
			>
			<v-col
				class="pa-0"
				align="end"
			>
				<CommonButtonsButton03
					to="/user/create/2"
					title="신청하기"
					add-icon
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="USER_GET_AS.length"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'as'"
					:card-menu="USER_GET_AS"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty :text="`첫 번째 <strong>A/S신청</strong>을 등록해보세요.`" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserMyPageASList',
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_AS']),
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_AS_SELECT']),
	},
}
</script>

<style scoped lang="scss"></style>
