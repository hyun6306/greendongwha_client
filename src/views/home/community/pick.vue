<template>
	<div class="wrapper">
		<v-container
			fluid
			class="pa-0"
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<div class="content_title">
					{{ common_title }}
					<p class="sub_title">동화자연마루의 {{ common_title }}</p>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityInstagram',
	metaInfo: {
		title: '동화s Pick | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '동화s Pick | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루 동화s Pick',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 동화s Pick을 만나보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/pick`,
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
	computed: {},
	watch: {},
	async created() {
		const items = { method: 'getList', params: { event_id: '', current_status: '' } }
		// event 정보 getList
		await this.HOME_ACT_COMMUNITY_EVENT(items).then(res => {
			this.parseData(res)
		})
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['HOME_ACT_COMMUNITY_EVENT']),
		parseData(data) {
			this.eventItems = data
		},
		onClickEvent(val) {
			// console.log('onClickProduct',val)
			this.$router.push(`/community/event/detail/${val.event_id}`).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss"></style>
