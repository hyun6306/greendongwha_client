<template>
	<div>
		<v-row
			v-if="AGENCY_GET_ESTIMATE"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'agency_estimate'"
					:card-menu="AGENCY_GET_ESTIMATE"
					@submit="onClick"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty
				text="'견적상담 내역이 없습니다."
				sub-text="'견적상담 요청 내역이 없습니다.'"
			/>
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserAgencyEstimateList',
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['AGENCY_GET_ESTIMATE']),
	},
	created() {},
	methods: {
		...mapMutations(['AGENCY_MU_ESTIMATE_SELECT']),
		onClick(val) {
			console.log('onClick', val)
			this.AGENCY_MU_ESTIMATE_SELECT(val)
			this.$router.push(`/user/listDetail/5`)
		},
	},
}
</script>

<style scoped lang="scss"></style>
