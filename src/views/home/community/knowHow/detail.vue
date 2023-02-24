<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				cols="12"
				class="pa-0 px-5 px-md-0 mt-7 mt-md-10 contents_table layout_align"
			>
				<!-- 제목 -->
				<v-row class="ma-0">
					<v-col
						cols="12"
						class="header"
					>
						<v-row class="ma-0 mb-0 mb-md-3">
							<v-col
								cols="8"
								sm="9"
								md="10"
								class="pa-0 title"
								align="start"
								align-self="center"
							>
								{{ knowHowItems.title }}
							</v-col>
							<v-col
								cols="4"
								sm="3"
								md="2"
								class="pa-0"
								align="end"
							>
								<v-btn
									v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
									class="pa-0"
									@click="scrap_call"
								>
									<v-icon v-if="scrap_check === 'post'">mdi-bookmark-outline</v-icon>
									<v-icon v-else>mdi-bookmark</v-icon>
								</v-btn>
								<CommonMenuMenu01
									:icon="'mdi-share-variant-outline'"
									:items="share_shareItems"
									@submit="onShare"
								/>
							</v-col>
						</v-row>
						<v-row class="ma-0 content_info">
							<div class="tal">
								<p
									v-if="knowHowItems.name"
									class="type"
								>
									{{ knowHowItems.name }}
								</p>
							</div>
							<div class="pa-0 tar">
								<span class="scrap"
									>스크랩 <strong v-if="scrap_detail_count">{{ scrap_detail_count }}</strong
									><strong v-else>0</strong></span
								>
								<span class="count"
									>조회 <strong v-if="knowHowItems.hits">{{ knowHowItems.hits }}</strong></span
								>
								<span
									v-if="knowHowItems.date"
									class="date"
									>{{ knowHowItems.date }}</span
								>
							</div>
						</v-row>
					</v-col>
				</v-row>

				<!-- 컨텐츠 -->
				<v-row class="ma-0">
					<v-col
						cols="12"
						class="body pa-0"
						align="center"
					>
						<v-row
							v-if="loading"
							class="ma-0 loading_area"
						>
							<v-col
								class="pa-0"
								cols="12"
							>
								<CommonLoaderCircle01 />
							</v-col>
						</v-row>
						<v-col
							v-else
							class="pa-0 editor_content"
						>
							<!-- s : [확인사항] 에디터 편집영역 입니다 -->
							<v-card
								v-if="knowHowDetailItems.description"
								width="100%"
								elevation="0"
								class="ma-0 pa-0 mb-5"
							>
								<CommonEditorQuillViewerTile
									class="py-10"
									:html="knowHowDetailItems.description"
								/>
							</v-card>
							<!-- e : [확인사항] 에디터 편집영역 입니다 -->
						</v-col>
					</v-col>

					<!-- 노하우 인기팝업 -->
					<v-col
						cols="12"
						align="center"
						class="pa-0"
					>
						<v-card class="feature_tit bc_tr mb-8">
							<p>노하우</p>
						</v-card>
						<v-col
							cols="11"
							md="12"
							class="pa-0"
						>
							<div class="card_align">
								<CommonCardMenuGroup03
									v-if="HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS.length"
									menu-type="special"
									:card-menu="HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS"
									@submit="onClickPushLink"
								/>
							</div>
						</v-col>
					</v-col>
				</v-row>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'
import share from '@/mixins/share'

export default {
	name: 'HomeCommunityknowHowDetail',
	metaInfo() {
		return {
			title: `${this.knowHowItems.title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.knowHowItems.title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루 노하우 정보입니다.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/community/knowHow/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.knowHowItems.image}`,
				},
			],
		}
	},
	mixins: [common, scrap, share],
	data: () => ({
		knowHowDetailItems: [],
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'HOME_GET_COMMUNITY_KNOW_HOW', 'HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS']),
		getQuery() {
			return this.$route.params.id
		},
		knowHowItems() {
			return this.knowHowDetailItems || null
			// return this.HOME_GET_COMMUNITY_KNOW_HOW.find(item => item.knowhow_id === this.getQuery) || null
		},
	},
	watch: {
		getQuery() {
			this.getData()
		},
	},
	async created() {
		// 정보값 없다면 뒤로가기
		// if(this.HOME_GET_COMMUNITY_KNOW_HOW.length === 0) return this.$router.push('/community/knowHow').catch(() => {})
		await this.getData()
		if (!this.HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS.length) await this.HOME_ACT_COMMUNITY_KNOW_HOW({ method: 'knowhow-pop' })
	},
	mounted() {
		// console.log('HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS', this.HOME_GET_COMMUNITY_KNOW_HOW_POP_ITEMS)
	},
	destroyed() {},
	methods: {
		...mapActions(['HOME_ACT_COMMUNITY_KNOW_HOW']),
		async getData() {
			this.loading = true
			// 노하우 상세 정보
			await this.HOME_ACT_COMMUNITY_KNOW_HOW({ method: 'detail', query: this.getQuery })
				.then(res => {
					this.loading = false
					// 날짜 추가
					res[0].date = this.common_number_filter(res[0].regi_date.split(' ')[0], 'date')
					this.knowHowDetailItems = res[0]
					// 스크랩 카운트
					this.scrap_detail_count = res[0].scrap_cnt
				})
				.catch(() => {
					this.loading = false
				})
		},
		onClickPushLink(menu) {
			let link = `/community/knowHow/detail/${menu.knowhow_id}`
			this.$router.push(link).catch(() => {})
		},
		onShare(item) {
			const productItem = {
				title: this.knowHowItems.title,
				description: '노하우',
				image: this.knowHowItems.image,
			}
			this.share_operator(item, productItem)
		},
	},
}
</script>

<style scoped lang="scss">
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.contents_table {
	.header {
		padding: 0 10px;
		// border-top:2px solid #262626;
		// border-bottom:1px solid #ccc;
		.title {
			@include ellipsis_2;
			margin-bottom: 12px;
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 24px !important;
			color: #262626;
			word-break: keep-all;
		}
		.v-btn {
			box-shadow: none !important;
			min-width: 40px !important;
			height: 40px !important;
			padding: 0 !important;
			background-color: #fff !important;
			.v-icon {
				color: #414141 !important;
			}
			&:hover {
				color: #fff !important;
				background-color: #42883d !important;
				.v-icon {
					color: #fff !important;
				}
			}
		}
		.content_info {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 16px !important;
			color: #a0a1a5;
			.tal,
			.tar {
				width: 50%;
			}
			.scrap,
			.count {
				position: relative;
				padding: 0 10px;
				&:after {
					display: block;
					width: 1px;
					height: 14px;
					position: absolute;
					top: 6px;
					right: 0;
					background-color: #a0a1a5 !important;
					content: '';
				}
				strong {
					color: #262626;
				}
			}
			.date {
				padding-left: 10px;
			}
		}
	}
	.body {
		padding: 32px !important;
		.event_clear {
			position: relative;
			width: 100%;
			height: 100px;
			margin-bottom: 40px;
			font-family: 'NotoSansKR-Bold' !important;
			background-color: #323232;
			span {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 18px !important;
				color: #fff;
				word-break: keep-all;
			}
		}
	}
	.notice {
		padding-left: 18px;
		color: #5f6062;
		.title {
			margin-bottom: 26px;
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 18px !important;
		}
		ul {
			padding: 0;
			li {
				position: relative;
				padding: 3px 10px;
				list-style: none;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 15px !important;
				word-break: keep-all;
				&::before {
					position: absolute;
					top: 0;
					left: 0;
					content: '-';
				}
			}
		}
	}
}
.board_list {
	border-top: 1px solid #262626;
	border-bottom: 1px solid #262626;
	.row {
		padding: 15px 0;
		&:first-child {
			border-bottom: 1px solid #ccc;
		}
		.arrow {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 15px !important;
			color: #262626;
		}
		.title {
			@include ellipsis;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 15px !important;
			color: #5f6062;
		}
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.contents_table {
		.body {
			.event_clear {
				height: 90px;
				margin-bottom: 30px;
			}
		}
		.board_list {
			.row {
				padding: 10px 0;
			}
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.contents_table {
		.header {
			padding: 0 !important;
			.title {
				font-size: 20px !important;
			}
			.content_info {
				font-size: 14px !important;
				.tal,
				.tar {
					width: 100%;
				}
				.tar {
					margin-left: -10px !important;
					text-align: left !important;
				}
			}
		}
		.body {
			padding: 32px 0 !important;
			.event_clear {
				height: 75px;
				margin-bottom: 20px;
			}
			span {
				font-size: 15px;
			}
		}
		.notice {
			padding-left: 0 !important;
			.title {
				margin-bottom: 14px;
				font-size: 16px !important;
			}
			ul {
				padding: 0;
				li {
					font-size: 14px !important;
				}
			}
		}
		.board_list {
			.row {
				padding: 10px 0;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.contents_table {
		.header {
			padding: 0 !important;
			.title {
				font-size: 20px !important;
			}
			.content_info {
				font-size: 14px !important;
				.tal,
				.tar {
					width: 100%;
				}
				.tar {
					margin-left: -10px !important;
					text-align: left !important;
				}
			}
		}
		.body {
			padding: 20px 0 !important;
			.event_clear {
				height: 75px;
				margin-bottom: 20px;
			}
			span {
				font-size: 15px;
			}
		}
		.notice {
			padding-left: 0 !important;
			.title {
				margin-bottom: 14px;
				font-size: 16px !important;
			}
			ul {
				padding: 0;
				li {
					font-size: 14px !important;
				}
			}
		}
		.board_list {
			.row {
				padding: 10px 0;
			}
		}
	}
}
</style>
