<template>
	<div class="wrapper">
		<v-container
			fluid
			class="pa-0"
		>
			<div class="px-4 px-lg-0">
				<v-row class="ma-0 my-4 my-md-10 maru_tv">
					<v-col
						class="px-4 py-5 px-md-10 py-md-8"
						cols="12"
						md="6"
					>
						<div class="top">
							<v-row class="ma-0">
								<v-col
									class="pa-0"
									cols="auto"
									align-self="center"
								>
									<v-img
										:src="require('@/assets/img/community/youtube_green.svg')"
										max-width="30"
										height="auto"
									/>
								</v-col>
								<v-col
									class="pa-0 pl-2"
									align-self="center"
								>
									<span class="tit">마루잘.알.TV</span>
								</v-col>
							</v-row>
							<span class="hidden-md-and-down sub_txt">영상으로 인테리어 궁금증을 쉽게 해결해보세요</span>
						</div>
						<div class="bottom">
							<p class="mb-0 mb-md-4 tit">이해쏙쏙 인테리어 영상</p>
							<span class="sub_txt">{{ HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM?.title || '' }}</span>
						</div>
					</v-col>

					<v-col
						class="pa-0"
						cols="12"
						md="6"
					>
						<!-- <HomeCommunityHomeMaruTvMainYoutube
							v-if="HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM"
							class="no_desc"
							:item="HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM"
							@click="$emit('click', HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM)"
						/> -->
						<!-- <iframe
							id="player"
							:src="`http://www.youtube.com/embed/${mainVideoId}?autoplay=1&enablejsapi=1`"
							frameborder="0"
							allowfullscreen
							width="100%"
							height="100%"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						></iframe> -->
						<HomeCommunityItemsYoutubeIframe
							v-if="mainVideoId"
							:video-id="mainVideoId"
						/>
					</v-col>
				</v-row>
			</div>

			<CommonTabsTab04
				v-model="themeModel"
				class="mb-0 mb-sm-7"
				:class-name="'green'"
				:tab-items="HOME_GET_COMMUNITY_KNOW_HOW_CODE"
			/>

			<v-col
				cols="12"
				class="px-4 px-lg-0 layout_align"
			>
				<v-row class="ma-0 mb-5">
					<v-col
						cols="6"
						class="pa-0"
						align-self="center"
					>
						<div class="counter">
							전체
							<strong>{{ filterShowItems.length }}</strong>
							개
						</div>
					</v-col>
				</v-row>

				<!-- 마루티비 카드 -->
				<v-row class="ma-0 card_wrapper">
					<v-col
						v-for="(item, i) in filterShowItems"
						:key="i"
						cols="6"
						sm="4"
						md="3"
						align="center"
						class="pa-0"
					>
						<CommonCardMenuCardMaruTv
							:item="item"
							@click="playVideo(item)"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-container>
		<HomeCommunityItemsVideoPlayer
			v-if="videoDialog"
			v-model="videoDialog"
			:url="videoUrl"
			@close="videoDialog = false"
		/>
	</div>
</template>

<script src="https://www.youtube.com/iframe_api"></script>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityMaruTv',
	metaInfo: {
		title: '마루잘알 TV | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '마루잘알 TV | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 커뮤니티, 콘텐츠, 마루영상, 마루사진, 이벤트, 인테리어 노하우, 마루.잘.알TV',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 유튜브 콘텐츠를 한 눈에 찾아보세요!',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/maruTv`,
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
		themeModel: null,
		videoUrl: '',
		videoDialog: false,
		player: null,
	}),
	computed: {
		...mapGetters([
			'HOME_GET_COMMUNITY_MARU_TV_ITEMS',
			'HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM',
			'HOME_GET_COMMUNITY_KNOW_HOW_CODE',
		]),
		maruTvItems() {
			return this.HOME_GET_COMMUNITY_MARU_TV_ITEMS || []
		},
		filterShowItems() {
			if (!this.themeModel) return this.maruTvItems
			return this.maruTvItems.filter(x => x.code === this.HOME_GET_COMMUNITY_KNOW_HOW_CODE[this.themeModel].value)
		},
		mainVideoId() {
			return this.HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM?.video_url.split('/').pop().split('=').pop() ?? ''
		},
	},
	watch: {},
	async created() {
		if (this.HOME_GET_COMMUNITY_KNOW_HOW_CODE.length === 0) await this.getPublicCode()
		if (this.HOME_GET_COMMUNITY_MARU_TV_ITEMS.length === 0) this.HOME_ACT_COMMUNITY_MARU_TV()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['HOME_MU_COMMUNITY_KNOW_HOW_CODE']),
		...mapActions(['HOME_ACT_COMMUNITY_MARU_TV', 'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS']),
		async getPublicCode() {
			// 테마 코드 가져오기
			let themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })
			themeCodeItems.unshift({ code_name: '전체', code: null })
			this.HOME_MU_COMMUNITY_KNOW_HOW_CODE(themeCodeItems)
		},
		playVideo(item) {
			this.videoUrl = item.video_url
			this.videoDialog = true
		},
	},
}
</script>

<style scoped lang="scss">
.card_wrapper {
	margin: 0 -8px !important;
}
.maru_tv {
	border: 1px solid #e6e6e6;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	overflow: hidden;
	.top {
		.tit {
			font-weight: $fw_bold;
			font-size: $font_tit;
			color: #00ce7d;
		}
		.sub_txt {
			font-weight: $fw_normal;
			font-size: $font_normal;
			color: $color_gray6;
		}
	}
	.bottom {
		margin-top: 146px;
		.tit {
			font-weight: $fw_bold;
			font-size: $font_xl;
			color: $color_font;
		}
		.sub_txt {
			font-weight: $fw_normal;
			font-size: $font_lg;
			color: $color_gray8;
		}
	}
}

.select_box {
	width: 153px;
}
.counter {
	color: $color_font;
}
.sm_select {
	max-width: 80px !important;
	border: 1px solid #d8d8d8;
	:deep(.v-label) {
		color: $color_font;
		font-size: $font_mid !important;
	}
	:deep(.v-text-field__details) {
		display: none !important;
	}
	:deep(.v-input__control) {
		min-height: 30px !important;
	}
	:deep(.v-input__append-inner) {
		display: none !important;
	}
	:deep(.v-input__slot) {
		padding: 0 5px !important;
		margin-bottom: 0 !important;
		box-shadow: none !important;
	}
	:deep(.v-select__selection) {
		font-size: $font_mid !important;
		text-align: center;
	}
	:deep(.v-select__selections) input {
		display: none !important;
	}
	:deep(.v-icon) {
		color: $color_gray6 !important;
	}
}

@media all and (max-width: 959px) {
	.maru_tv {
		.top {
			.v-image {
				max-width: 23px !important;
			}
			.tit {
				font-size: $font_xl !important;
			}
		}
		.bottom {
			margin-top: 20px !important;
			.tit {
				font-size: $font_lg !important;
			}
			.sub_txt {
				font-size: $font_normal !important;
			}
		}
	}
}
</style>
