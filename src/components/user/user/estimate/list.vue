<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				align="start"
				align-self="center"
			>
				견적상담 내역
			</v-col>
			<v-col
				class="pa-0"
				align="end"
			>
				<CommonButtonsButton03
					to="/interior/price/inquire"
					title="견적 의뢰"
					add-icon
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="USER_GET_ESTIMATE.length"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'estimate'"
					:card-menu="USER_GET_ESTIMATE"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty :text="`집 근처 인테리어점을 찾아<br>첫 번째 <strong>견적상담 의뢰</strong>를 진행해보세요.`" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserMyPageEstimateList',
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_ESTIMATE']),
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_ESTIMATE_SELECT']),
	},
}
</script>

<style scoped lang="scss"></style>
