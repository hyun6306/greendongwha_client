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
			<div class="wrapper_special_detail">
				<v-img
					eager
					:src="require('@/assets/img/etc/special_detail_1.jpg')"
					width="100%"
				/>
				<v-img
					eager
					:src="require('@/assets/img/etc/special_detail_2.jpg')"
					width="100%"
					class="clickCursor"
					@click="onClickPushLink('catalog')"
				/>
				<v-img
					eager
					:src="require('@/assets/img/etc/special_detail_3.jpg')"
					width="100%"
					class="clickCursor"
					@click="onClickPushLink('/community/knowHow/detail/55')"
				/>
				<v-img
					eager
					:src="require('@/assets/img/etc/special_detail_4.jpg')"
					width="100%"
				/>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeProductSpecialDetail',
	mixins: [common],
	data: () => ({}),
	computed: {},
	watch: {},
	async created() {},
	mounted() {},
	destroyed() {},
	methods: {
		onClickPushLink(link) {
			if (link === 'catalog')
				this.common_onLink(
					'https://dwe-on-greendongwha.s3.ap-northeast-2.amazonaws.com/greendongwha/resources/catalog/8cd326b1-a27a-4cb9-b96b-7ec9114ac35b-나투스진 원목 2T_20220720%28수정본%29 v3.pdf',
				)
			else this.$router.push(link)
		},
	},
}
</script>

<style scoped lang="scss">
.wrapper_special_detail {
	max-width: 768px !important;
	margin: 0 auto !important;
}
</style>
