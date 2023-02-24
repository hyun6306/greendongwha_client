<template>
	<div class="wrapper">
		<v-container
			class="pa-0 py-5 py-md-15 px-3"
			fluid
		>
			<HomeInteriorStoreListItems :next="next" />
		</v-container>
		<CommonBottomSheetSheet01
			:sheet="selectInterior"
			:items="HOME_GET_INTERIOR_SELECT_INTERIOR"
			:tab-select="tabSelect"
			title="상담희망 인테리어점"
			sub-title="인테리어점은 최대 3개까지 선택하실 수 있습니다."
			components-path="home/interior/price/items/interiorList"
			@next="
				$emit('selectTab', 2)
				next = true
			"
			@close="closeSheet"
		/>
	</div>
</template>

<script>
import common from '@/mixins/common'
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'HomeInteriorPriceInquireInterior02',
	mixins: [common],
	props: {
		tabSelect: {
			type: Number,
			default: 0,
		},
	},
	data: () => ({
		next: false,
	}),
	computed: {
		...mapGetters(['HOME_GET_INTERIOR_SELECT_INTERIOR', 'APP_GET_APP_STATE']),
		selectInterior() {
			// 선택된 인테리어점이 있을 경우 sheet가 노출
			// if (this.tabSelect === 1) {
			// 	return Boolean(this.HOME_GET_INTERIOR_SELECT_INTERIOR.length)
			// } else {
			// 	return false
			// }
			return true
		},
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_INTERIOR_SELECT_INTERIOR']),
		closeSheet() {
			// this.HOME_MU_INTERIOR_SELECT_INTERIOR(null)
		},
	},
}
</script>

<style scoped lang="scss"></style>
