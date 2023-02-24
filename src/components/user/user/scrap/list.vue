<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				align="start"
				align-self="center"
				>스크랩북 내역</v-col
			>
		</v-row>
		<v-row
			v-if="USER_GET_SCRAP.length"
			class="ma-0"
		>
			<v-col class="pa-0">
				<CommonCardMenuGroup02
					:menu-type="'scrap'"
					:card-menu="USER_GET_SCRAP"
					@submit="scrap_push_link"
				/>
			</v-col>
		</v-row>
		<v-row
			v-else
			justify="center"
			class="ma-0"
		>
			<UserItemEmpty :text="`스크랩을 선택해 <strong>나만의 스크랩 북</strong>을 완성하세요.`" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import scrap from '@/mixins/scrap'

export default {
	name: 'UserMyPageScrapList',
	mixins: [scrap],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_SCRAP']),
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_SCRAP_SELECT']),
		onClick(val) {
			console.log('onClick', val)
			if (val.code === undefined) return this.$router.push('/product/detail/0')
			this.USER_MU_SCRAP_SELECT(val)
		},
	},
}
</script>

<style scoped lang="scss"></style>
