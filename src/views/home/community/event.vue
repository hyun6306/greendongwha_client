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
					<p class="sub_title">동화자연마루의 다양한 이벤트를 만나보세요</p>
				</div>
			</v-col>

			<v-col
				cols="12"
				class="pa-5 pa-md-0 layout_align"
			>
				<v-row class="ma-0 mb-5">
					<div class="select_box">
						<v-col
							class="pa-0"
							cols="5"
							sm="5"
							md="4"
						>
							<CommonSelectsSelect01
								v-model="selectModel"
								:items="searchItems"
							/>
						</v-col>
					</div>
					<div class="counter tar">
						총 <strong>{{ eventItems.length }}</strong
						>건의 이벤트가 존재합니다.
					</div>
				</v-row>

				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<div class="card_align">
						<CommonCardMenuGroup02
							:menu-type="'event'"
							:card-menu="filterShowItems"
							@submit="onClickEvent"
						/>
					</div>
				</v-col>
			</v-col>

			<v-col
				class="pa-0"
				align="center"
			>
				<CommonButtonsButton02
					v-if="eventItems.length > showItemsCount"
					:name="`더보기 (${showItemsCount}/${eventItems.length})`"
					class-name="btn_more"
					color="#70b341"
					outlined
					@click="showItemsCount += 16"
				/>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityEvent',
	metaInfo: {
		title: '이벤트 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '이벤트 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루 이벤트',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 다양한 이벤트를 만나보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/event`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common],
	data: () => ({
		showItemsCount: 16,
		selectModel: { text: '전체 이벤트', value: '0' },
		searchItems: [
			{ text: '전체 이벤트', value: '0' },
			{ text: '진행중인 이벤트', value: '1' },
			{ text: '종료된 이벤트', value: '2' },
			{ text: '당첨자 발표', value: '3' },
		],
		eventItems: [],
	}),
	computed: {
		...mapGetters(['APP_GET_SCROLL_BOTTOM']),
		filterShowItems() {
			let filter = this.eventItems
			if (this.selectModel.value !== '0')
				filter = this.eventItems.filter(item => item.current_status === this.selectModel.value)
			return this.common_product_filter_items(filter).slice(0, this.showItemsCount)
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.eventItems.length) this.showItemsCount += 16
		},
	},
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

<style scoped lang="scss">
.select_box {
	width: 50%;
}
.counter {
	width: 50%;
	color: $color_font !important;
	line-height: 40px;
}
@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.select_box {
		width: 100%;
	}
	.counter {
		width: 100%;
		text-align: left;
	}
}
@media all and (max-width: 380px) {
	.select_box {
		width: 100%;
	}
	.counter {
		width: 100%;
		text-align: left;
	}
}
</style>
