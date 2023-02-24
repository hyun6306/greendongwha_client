<template>
	<div class="wrapper">
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
					{{ common_title }}
					<p class="sub_title">동화자연마루의 SNS 콘텐츠를 확인해보세요!</p>
				</div>
			</v-col>

			<div class="px-4 px-lg-0">
				<v-row class="ma-0 mb-5 pa-4 py-md-5 px-md-10 sns_total">
					<v-col
						class="pa-0"
						cols="8"
					>
						<!-- 인스타그램 -->
						<v-row
							class="ma-0 clickCursor"
							@click="openWindow('https://www.instagram.com/green_dongwha/')"
						>
							<v-col
								class="pa-0"
								cols="auto"
								align-self="center"
							>
								<v-img
									:src="require('@/assets/img/community/sns_insta.svg')"
									max-width="48"
									height="auto"
								/>
							</v-col>
							<v-col
								class="pa-0 pl-3"
								align-self="center"
							>
								<p class="link">INSTAGRAM ></p>
								<strong class="id">@green_dongwha</strong>
							</v-col>
						</v-row>
					</v-col>

					<v-col
						class="pa-0"
						cols="4"
					>
						<v-row class="ma-0 justify-end">
							<!-- 블로그 -->
							<v-col
								class="pa-0 mr-2 mr-md-10"
								cols="auto"
								@click="openWindow('https://blog.naver.com/dongwhagreen')"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="auto"
										align-self="center"
									>
										<v-img
											:src="require('@/assets/img/community/sns_blog.svg')"
											max-width="48"
											height="auto"
											class="clickCursor"
										/>
									</v-col>
									<v-col
										class="pa-0 pl-3 hidden-sm-and-down"
										align-self="center"
									>
										<p class="clickCursor link">BLOG ></p>
									</v-col>
								</v-row>
							</v-col>

							<!-- 유튜브 -->
							<v-col
								class="pa-0"
								cols="auto"
								@click="openWindow('https://www.youtube.com/channel/UChk6tpEqFFtBm_79Pr_pFaQ')"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="auto"
										align-self="center"
									>
										<v-img
											:src="require('@/assets/img/community/sns_youtube.svg')"
											max-width="48"
											height="auto"
											class="clickCursor"
										/>
									</v-col>
									<v-col
										class="pa-0 pl-3 hidden-sm-and-down"
										align-self="center"
									>
										<p class="clickCursor link">Youtube ></p>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</v-row>

				<v-row class="ma-0 mb-5">
					<v-col
						cols="6"
						class="pa-0"
						align-self="center"
					>
						<div class="counter">
							전체
							<strong>{{ showInstagramItems.length }}</strong>
							개
						</div>
					</v-col>
				</v-row>

				<v-row class="ma-0 card_wrapper">
					<v-col
						v-for="(item, index) in showInstagramItems"
						:key="index"
						cols="6"
						sm="4"
						md="3"
						align="center"
						class="pa-0 card_insta clickCursor"
						@click="openWindow(item.permalink)"
					>
						<div class="mb-5 mb-md-10 mx-2">
							<v-img
								:src="item.thumbnail_url"
								height="100%"
								width="100%"
								aspect-ratio="1"
							/>
						</div>
					</v-col>
				</v-row>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityInstagram',
	metaInfo: {
		title: '마루스타그램 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '마루스타그램 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 커뮤니티, 마루사진, 이벤트, 인테리어 노하우, 마루스타그램',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 인스타그램 콘텐츠를 한 눈에 찾아보세요!',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/community/instagram`,
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
		showCount: 16,
	}),
	computed: {
		...mapGetters(['HOME_GET_COMMUNITY_INSTAGRAM_ITEMS', 'APP_GET_SCROLL_BOTTOM']),
		showInstagramItems() {
			return this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS.slice(0, this.showCount)
		},
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showCount < this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS.length) this.showCount += 16
		},
	},
	created() {
		if (this.HOME_GET_COMMUNITY_INSTAGRAM_ITEMS.length === 0) this.HOME_ACT_COMMUNITY_INSTAGRAM()
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapActions(['HOME_ACT_COMMUNITY_INSTAGRAM']),
		openWindow(url) {
			window.open(url, '_blank')
		},
	},
}
</script>

<style scoped lang="scss">
.sns_total {
	border: 1px solid #e6e6e6;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	.link,
	.id {
		font-size: $font_normal;
		color: #9e9e9e;
	}
}

.card_wrapper {
	margin: 0 -8px !important;
	.card_insta {
		border-radius: 4px !important;
	}
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
	.sns_total {
		.v-image {
			max-width: 36px !important;
		}
		.link,
		.id {
			font-size: $font_sm !important;
		}
	}
}
</style>
