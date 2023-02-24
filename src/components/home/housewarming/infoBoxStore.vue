<template>
	<div class="info_box">
		<p class="tit">업체정보</p>
		<CommonCardMenuCardStore :item="items" />
	</div>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HousewarmingInfoBox',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {
		console.log('this.items', this.items)
	},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.info_box {
	min-height: 245px;
	padding: 30px 40px;
	margin-bottom: 20px;
	background-color: #f1f2f3;
	border-radius: 10px;
	.tit {
		padding-bottom: 10px !important;
		margin-bottom: 10px !important;
		font-family: 'NotoSansKR-Bold';
		font-size: 18px;
		color: #262626;
		text-align: left;
		border-bottom: 1px solid #262626;
	}
	.store_list {
		padding: 0 !important;
		border-top: none !important;
		.address {
			text-align: left !important;
			font-family: 'NotoSansKR-Regular';
			font-size: 13px;
			color: #5f6062;
		}
		.explain {
			border: 1px solid red !important;
			table {
				width: 100% !important;
			}
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.info_box {
		padding: 20px 10px;
		margin-bottom: 10px;
		.tit {
			font-size: 16px;
		}
	}
}
@media all and (max-width: 380px) {
	.info_box {
		padding: 20px 10px;
		margin-bottom: 10px;
		.tit {
			font-size: 16px;
		}
	}
}
</style>
