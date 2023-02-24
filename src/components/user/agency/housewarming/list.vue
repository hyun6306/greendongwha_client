<template>
	<div>
		<v-col
			class="pa-0"
			align="end"
		>
			<CommonButtonsButton03
				to="/user/create/4"
				title="등록하기"
				add-icon
			/>
		</v-col>
		<v-row
			v-if="AGENCY_GET_HOUSEWARMING"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'housewarming'"
					:card-menu="AGENCY_GET_HOUSEWARMING"
					@submit="onClick"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty text="'첫 번째 <strong>전문가 집들이</strong>를 올려보세요'" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserAgencyHousewarmingList',
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['AGENCY_GET_HOUSEWARMING']),
	},
	created() {},
	methods: {
		...mapMutations(['AGENCY_MU_HOUSEWARMING_SELECT']),
		onClick(val) {
			console.log('onClick', val)
			this.AGENCY_MU_HOUSEWARMING_SELECT(val)
			this.$router.push(`/user/listDetail/4`)
		},
	},
}
</script>

<style scoped lang="scss"></style>
