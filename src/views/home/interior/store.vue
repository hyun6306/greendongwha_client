<template>
	<v-container
		class="pa-3 pa-lg-0"
		fluid
		fill-height
	>
		<v-col class="pa-0 pt-md-8">
			<!-- 인테리어점 지도 & 리스트 -->
			<HomeInteriorStoreListItems />
		</v-col>
	</v-container>
</template>

<script>
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorStore',
	metaInfo: {
		title: '인테리어점 찾기 ㅣ 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '인테리어점 찾기 ㅣ 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '인테리어점 찾기, 견적상담 의뢰, 견적상담 서비스, 인테리어 업체 찾기, 견적 상담',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '우리집에서 가까운 인테리어점이 어디있을까? 지도를 통해 찾아보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/interior/store`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common],
	data: () => ({}),
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.container.fill-height {
	background-color: #f7f7f7 !important;
	align-items: start !important;
}
</style>
