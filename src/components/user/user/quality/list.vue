<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				align="start"
				align-self="center"
				>품질보증 등록 내역</v-col
			>
			<v-col
				class="pa-0"
				align="end"
			>
				<CommonButtonsButton03
					to="/user/create/1"
					title="등록하기"
					add-icon
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="USER_GET_QUALITY.length"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'quality'"
					:card-menu="USER_GET_QUALITY"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty :text="`첫 번째 <strong>품질 보증</strong>을 등록해보세요.`" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserMyPageQualityList',
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_QUALITY']),
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_QUALITY_SELECT']),
		onClick(val) {
			console.log('onClick', val)
			this.USER_MU_QUALITY_SELECT(val)
			this.$router.push(`/user/listDetail/1`)
		},
	},
}
</script>

<style scoped lang="scss"></style>
