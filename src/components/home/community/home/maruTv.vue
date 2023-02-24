<template>
	<div class="mb-5 mx-0 mx-lg-3 item">
		<v-col class="pa-0 bg_maru_tv">
			<div class="category">
				<div class="tit">
					<router-link
						tag="div"
						to="/community/maruTv"
						class="mb-3 d-flex clickCursor"
					>
						<v-img
							:src="require('@/assets/img/community/youtube_white.svg')"
							max-width="29"
							height="100%"
						/>
						<p class="mx-1">마루잘.알.TV</p>
						<v-img
							:src="require('@/assets/img/community/arrow_white.svg')"
							max-width="22"
							height="100%"
						/>
					</router-link>
					<span>
						동화자연마루 공식 유튜브 채널에서 재미있는 실험으로 <br class="hidden-sm-and-down" />
						마루에 대한 궁금증을 모두 풀어드려요!
					</span>
				</div>
			</div>
		</v-col>

		<v-col class="px-4 py-5 px-lg-5 py-lg-7 cont">
			<HomeCommunityHomeMaruTvMainYoutube
				v-if="HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM"
				:item="HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM"
				@click="$emit('click', HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM)"
			/>

			<div class="sub_youtube">
				<div class="mt-2 mb-6 chip">
					<HomeCommunityHomeMaruTvToggleItem
						v-model="themeCode"
						:items="themeCodeItems"
					/>
				</div>

				<HomeCommunityHomeMaruTvSubYoutube
					v-for="(item, i) in filterItems"
					:key="i"
					:item="item"
					@click="$emit('click', item)"
				/>
			</div>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'CommunityHomeMaruTv',
	components: {},
	data: () => ({
		themeCode: null,
		themeCodeItems: [],
	}),
	computed: {
		...mapGetters(['HOME_GET_COMMUNITY_MARU_TV_ITEMS', 'HOME_GET_COMMUNITY_MARU_TV_MAIN_ITEM']),
		filterItems() {
			return this.HOME_GET_COMMUNITY_MARU_TV_ITEMS.filter(x => x.code === this.themeCode).slice(0, 3)
		},
	},
	watch: {},
	async created() {
		this.themeCodeItems = await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '401' })
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS']),
	},
}
</script>

<style scoped lang="scss">
.item {
	background-color: $color_white;
	border-radius: 16px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;

	.category {
		color: $color_white;
		p {
			font-size: $font__sub_tit;
			font-weight: $fw_bold;
			line-height: 1 !important;
		}
		span {
			word-break: keep-all;
			font-size: $font_normal;
			font-weight: $fw_normal;
		}
	}

	.cont {
		position: relative;
		margin-top: -20px;
		border-radius: 16px !important;
		background-color: $color_white;
		h3 {
			color: $color_font;
			font-size: $font_xl;
			font-weight: $fw_bold;
		}
	}

	.bg_maru_tv {
		padding: 30px 20px 40px !important;
		background-color: $color_green1;
	}
}

@media all and (max-width: 1264px) {
	.item {
		border-radius: 0 !important;
		.cont {
			margin-top: 0 !important;
			border-radius: 0 !important;
		}
		.bg_maru_tv {
			padding: 20px 16px !important;
		}
	}
}

@media all and (max-width: 380px) {
	.item {
		.category {
			p {
				font-size: $font_xl !important;
				line-height: 22px !important;
			}
			span {
				font-size: $font_sm !important;
			}
		}
		.cont {
			h3 {
				font-size: $font_lg !important;
			}
		}

		.main_youtube {
			.desc {
				font-size: $font_normal !important;
			}
		}
	}
}
</style>
