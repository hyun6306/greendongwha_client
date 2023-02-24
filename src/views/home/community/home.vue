<template>
	<div class="community_bg">
		<div class="pa-0 wrapper">
			<v-container
				fluid
				class="pa-0"
			>
				<v-col
					cols="12"
					class="pa-0 px-4"
					align="center"
				>
					<div class="content_title">
						동화 커뮤니티
						<p class="sub_title">동화자연마루의 다양한 콘텐츠를 한 눈에 찾아보세요!</p>
					</div>
				</v-col>

				<v-row class="ma-0">
					<!-- 1열 -->
					<v-col
						class="pa-0 mb-5 mb-lg-0"
						cols="12"
						lg="4"
					>
						<!-- 노하우 -->
						<HomeCommunityHomeKnowhow />
					</v-col>

					<!-- 2열 -->
					<v-col
						class="pa-0"
						cols="12"
						lg="4"
					>
						<!-- 마루잘알티비 -->
						<HomeCommunityHomeMaruTv @click="playVideo" />

						<!-- 10년 품질보증 -->
						<HomeCommunityHomeTenYears />

						<!-- SNS -->
						<HomeCommunityHomeSns />
					</v-col>

					<!-- 3열 -->
					<v-col
						class="pa-0"
						cols="12"
						lg="4"
					>
						<!-- 마루스타그램 -->
						<HomeCommunityHomeMaruStargram />

						<!-- 이벤트 -->
						<HomeCommunityHomeEvent />
					</v-col>
				</v-row>
			</v-container>
		</div>
		<HomeCommunityItemsVideoPlayer
			v-if="videoDialog"
			v-model="videoDialog"
			:url="videoUrl"
			@close="videoDialog = false"
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityHome',
	metaInfo: {
		title: '커뮤니티 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '커뮤니티 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content:
					'동화자연마루, 커뮤니티, 콘텐츠, 마루영상, 마루사진, 이벤트, 인테리어 노하우, 마루스타그램, 마루.잘.알TV',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 다양한 콘텐츠를 한 눈에 찾아보세요!',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/home`,
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
		videoUrl: '',
		videoDialog: false,
	}),
	computed: {
		...mapGetters([
			'HOME_GET_COMMUNITY_MARU_TV_ITEMS',
			'HOME_GET_COMMUNITY_KNOW_HOW',
			'HOME_GET_COMMUNITY_EVENT',
			'HOME_GET_COMMUNITY_INSTAGRAM_ITEMS',
		]),
	},
	watch: {},
	created() {
		if (this.HOME_GET_COMMUNITY_MARU_TV_ITEMS.length === 0) this.HOME_ACT_COMMUNITY_MARU_TV()
		if (this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS.length === 0) this.HOME_ACT_COMMUNITY_INSTAGRAM()
		if (this.HOME_GET_COMMUNITY_KNOW_HOW.length === 0) this.HOME_ACT_COMMUNITY_KNOW_HOW({ method: 'getList' })
		if (this.HOME_GET_COMMUNITY_EVENT.length === 0)
			this.HOME_ACT_COMMUNITY_EVENT({ method: 'getList', params: { event_id: '', current_status: '' } })
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions([
			'HOME_ACT_COMMUNITY_MARU_TV',
			'HOME_ACT_COMMUNITY_KNOW_HOW',
			'HOME_ACT_COMMUNITY_EVENT',
			'HOME_ACT_COMMUNITY_INSTAGRAM',
		]),
		parseData(data) {
			this.eventItems = data
		},
		playVideo(item) {
			this.videoUrl = item.video_url
			this.videoDialog = true
		},
	},
}
</script>

<style scoped lang="scss">
.community_bg {
	background-color: $color_gray5;
	height: 100%;
}
</style>
