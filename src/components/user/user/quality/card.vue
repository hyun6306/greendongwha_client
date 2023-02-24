<template>
	<v-col class="pa-0 card_type" elevation="0" @click="onClick">
		<v-col class="pa-0 px-2">
			<div class="py-5">
				<p class="product">{{ menu.brand_name }} {{ menu.goods_name }}</p>
				<p class="date">{{ menu.date }}</p>
			</div>

			<v-divider />

			<div class="pt-2 pb-6 px-2 tal">
				<p class="mb-2 tit tac">{{ menu.title }}</p>
				<p class="name">{{ menu.name }}</p>
			</div>
		</v-col>
	</v-col>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	name: 'UserUserQualityCard',
	props: ['menu'],
	data: () => ({}),
	computed: {},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['USER_MU_QUALITY_SELECT']),
		onClick() {
			// this.$emit('submit', this.menu)
			this.USER_MU_QUALITY_SELECT(this.menu)
			this.$router.push(`/user/listDetail/1`)
		},
	},
}
</script>

<style scoped lang="scss">
.card_type {
	width: 190px;
	height: 164px;
	border-radius: 10px;
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 5%), 0px 2px 2px 0px rgb(0 0 0 / 5%), 0px 1px 5px 0px rgb(0 0 0 / 10%) !important;
}
.product {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 15px !important;
	color: #262626;
}
.date {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px !important;
	color: #262626;
}
.tit {
	//max-width:86px !important;
	height: 20px !important;
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 13px !important;
	color: #262626;
	background-color: #f1f2f3;
	border-radius: 4px;
}
.name {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px !important;
	color: #040000 !important;
}
</style>
