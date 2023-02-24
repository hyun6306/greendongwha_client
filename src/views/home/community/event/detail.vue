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
								v-if="eventItem.title"
								cols="8"
								sm="9"
								md="10"
								class="pa-0 title"
								align="start"
								align-self="center"
							>
								{{ eventItem.title }}
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
									v-if="eventItem.current_status_name"
									class="type"
								>
									{{ eventItem.current_status_name }}
								</p>
							</div>
							<div class="pa-0 tar">
								<!-- <span class="scrap" v-if="eventItem.participants_cnt"> 참여 인원 <strong>{{ eventItem.participants_cnt }}</strong></span> -->
								<span
									v-if="eventItem.hits"
									class="count"
									>조회 <strong>{{ Number(eventItem.hits).toLocaleString('ko-KR') }}</strong></span
								>
								<span
									v-if="eventItem.start_date"
									class="date"
									>{{ eventItem.start_date }}~{{ eventItem.end_date }}</span
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
						<v-col
							v-if="eventItem.current_status !== '1'"
							class="pa-0 event_clear"
						>
							<span>이벤트가 종료되었습니다.</span>
						</v-col>
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
							<!-- 에디터 영역 입니다 -->
							<v-card
								v-if="eventDetailItem.event_desc"
								width="100%"
								elevation="0"
								class="ma-0 pa-0 mb-5"
							>
								<CommonEditorQuillViewerTile
									class="py-10"
									:html="eventDetailItem.event_desc"
								/>
							</v-card>
							<!-- <v-col class="pa-0" align="start">
								<div class="notice">
									<p class="title">유의사항</p>
									<ul>
										<li>이벤트는 중복참여가 가능하나, 중복 당첨은 허용하지 않으며(휴대폰 번호 기준) 경품은 1인 1회 지급됩니다.</li>
										<li>당첨자 발표 후 7일 간 연락이 되지 않는 경우 당첨이 취소됩니다.</li>
										<li>SNS 비공개 계정 및 이벤트 기간 내 삭제된 게시물은 참여에서 제외될 수 있습니다.</li>
										<li>본 이벤트는 동화자연마루의 위탁을 받아 000에서 운영, 관리합니다.</li>
										<li>이벤트 참여 시 작성한 내용은 본 이벤트 운영과 관련된 업무에만 활용될 예정이며, 본 이벤트 관련 오보/운영.관리 시 추가 동의 없이 활용될 수 있습니다.</li>
									</ul>
								</div>
							</v-col> -->
							<div
								v-if="eventItem.current_status === '1' && eventItem.enter_yn === 'Y'"
								class="mt-12 mt-md-15"
							>
								<CommonButtonsButton02
									name="이벤트 참여하기"
									color="#00582c"
									class-name="btn_large"
									@click="joinEvent"
								/>
							</div>
							<!-- e : [확인사항] 에디터 편집영역 입니다 -->
						</v-col>
					</v-col>
				</v-row>

				<!-- 앞.뒤 목록리스트 -->
				<div class="board_list mt-5">
					<v-row class="ma-0">
						<v-col
							cols="3"
							sm="2"
							md="1"
							class="pa-0 arrow tac"
							align-self="center"
						>
							이전
						</v-col>
						<v-col
							cols="9"
							sm="9"
							md="11"
							class="pa-0 pr-5 title"
							align-self="center"
							@click="pushLink(prevItem)"
						>
							<span
								v-if="prevItem.title"
								class="clickCursor"
								>{{ prevItem.title }}</span
							>
							<span v-else>이전 공지사항은 없습니다.</span>
						</v-col>
					</v-row>
					<v-row class="ma-0">
						<v-col
							cols="3"
							sm="2"
							md="1"
							class="pa-0 arrow tac"
							align-self="center"
						>
							다음
						</v-col>
						<v-col
							cols="9"
							sm="9"
							md="11"
							class="pa-0 pr-5 title"
							align-self="center"
							@click="pushLink(nextItem)"
						>
							<span
								v-if="nextItem.title"
								class="clickCursor"
								>{{ nextItem.title }}</span
							>
							<span v-else>다음 공지사항은 없습니다.</span>
						</v-col>
					</v-row>
				</div>
				<v-col
					cols="12"
					class="mt-5"
					align="center"
				>
					<CommonButtonsButton02
						name="목록"
						class-name="btn_more"
						color="#70b341"
						outlined
						@click="$router.push('/community/event')"
					/>
				</v-col>
			</v-col>

			<HomeCommunityEventEventDialog
				:item="eventItem"
				:dialog="eventDialog"
				@close="eventDialog = false"
				@submit="confirmEvent = true"
			/>

			<CommonDialog
				:dialog="confirmEvent"
				:title="'응모 확인'"
				:text="`이벤트 응모 처리가 완료되었습니다.`"
				@close="
					confirmEvent = false
					eventDialog = false
				"
			/>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'
import share from '@/mixins/share'

export default {
	name: 'HomeCommunityEventDetail',
	metaInfo() {
		return {
			title: `${this.eventDetailItem.event_title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.eventDetailItem.event_title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루의 다양한 이벤트를 만나보세요.',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/community/event/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: `${this.eventDetailItem.image_url}`,
				},
			],
		}
	},
	mixins: [common, scrap, share],
	data: () => ({
		eventDialog: false,
		confirmEvent: false,
		eventDetailItem: {},
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'HOME_GET_COMMUNITY_EVENT']),
		getQuery() {
			return this.$route.params.id
		},
		eventItem() {
			return this.HOME_GET_COMMUNITY_EVENT.find(item => item.id === this.getQuery)
		},
		prevItem() {
			const item = this.HOME_GET_COMMUNITY_EVENT.findIndex(item => item.id === this.getQuery)
			if (item === 0) return {}
			const priv = item - 1
			return this.HOME_GET_COMMUNITY_EVENT[priv]
		},
		nextItem() {
			const next = this.HOME_GET_COMMUNITY_EVENT.findIndex(item => item.id === this.getQuery) + 1
			if (next >= this.HOME_GET_COMMUNITY_EVENT.length) return {}
			return this.HOME_GET_COMMUNITY_EVENT[next]
		},
	},
	watch: {
		getQuery() {
			this.getData()
		},
	},
	async created() {
		if (this.HOME_GET_COMMUNITY_EVENT.length === 0) {
			const items = { method: 'getList', params: { event_id: '', current_status: '' } }
			await this.HOME_ACT_COMMUNITY_EVENT(items)
		}
	},
	mounted() {
		this.getData()
	},
	destroyed() {},
	methods: {
		...mapMutations(['APP_MU_SNACKBAR']),
		...mapActions(['HOME_ACT_COMMUNITY_EVENT']),
		async getData() {
			this.loading = true
			// 이벤트 상세 정보
			await this.HOME_ACT_COMMUNITY_EVENT({ method: 'detail', query: this.getQuery })
				.then(res => {
					this.loading = false
					this.eventDetailItem = res[0]
					// 스크랩 카운트
					this.scrap_detail_count = res[0].scrap_cnt || 0
				})
				.catch(() => {
					this.loading = false
				})
		},
		pushLink(eventItem) {
			if (eventItem.event_id === undefined) return
			let link = `/community/event/detail/${eventItem.event_id}`
			this.$router.push(link).catch(() => {})
		},
		joinEvent() {
			if (this.AUTH_GET_USER_AUTH === 'GUEST') {
				return this.APP_MU_SNACKBAR({
					title: '로그인이 필요합니다.',
					action: {
						name: '로그인',
						link: '/login',
					},
				})
			} else {
				if (this.eventItem.enter_yn === 'Y') return (this.eventDialog = true)
			}
		},
		onShare(item) {
			const productItem = {
				title: this.eventItem.title,
				description: '이벤트',
				image: this.eventItem.image,
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
