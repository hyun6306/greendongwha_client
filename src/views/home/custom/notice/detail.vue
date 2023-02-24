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
				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<h2 class="content_title pb-3">{{ common_title }}</h2>
				</v-col>
				<div class="inner_wrapper layout_align">
					<v-container
						class="pa-0"
						fluid
					>
						<v-col
							cols="12"
							class="pa-0"
							align="center"
						>
							<v-col
								cols="12"
								class="pa-0 mt-10"
							>
								<v-col
									cols="12"
									class="pa-0 mt-4 table_type01 notice_table"
								>
									<v-row class="ma-0">
										<HomeCustomNoticeTag :item="noticeItem" />
										<v-col
											v-if="noticeItem.regi_date"
											cols="2"
											class="td hidden-sm-and-down"
											align="center"
										>
											{{ noticeItem.regi_date.split(' ')[0] }}
										</v-col>
									</v-row>

									<v-row class="ma-0">
										<v-col class="pa-0 editor_content">
											<!-- s : [확인사항] 에디터 편집영역 입니다 -->
											<v-card
												v-if="noticeItem.contents"
												width="100%"
												elevation="0"
												class="ma-0 pa-0 mb-5"
											>
												<CommonEditorQuillViewerTile
													class="py-10"
													:html="noticeItem.contents"
												/>
											</v-card>
											<!-- e : [확인사항] 에디터 편집영역 입니다 -->
										</v-col>
									</v-row>
								</v-col>

								<!-- 앞.뒤 목록리스트 -->
								<HomeCustomNoticePrevNext
									:prev-item="prevItem"
									:next-item="nextItem"
									@submit="pushLink"
								/>

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
										@click="$router.push('/custom/notice')"
									/>
								</v-col>
							</v-col>
						</v-col>
					</v-container>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'CustomNoticeDetail',
	metaInfo() {
		return {
			title: `${this.noticeItem.title} | 동화자연마루`,
			meta: [
				{
					vmid: 'title',
					property: 'og:title',
					content: `${this.noticeItem.title} | 동화자연마루`,
				},
				{
					vmid: 'description',
					property: 'og:description',
					content: '동화자연마루의 소식',
				},
				{
					vmid: 'url',
					property: 'og:url',
					content: `${process.env.VUE_APP_BASIC_SERVER}/custom/notice/detail/${this.getQuery}`,
				},
				{
					vmid: 'og:image',
					property: 'og:image',
					content: 'https://www.greendongwha.com/main.png',
				},
			],
		}
	},
	mixins: [common],
	data: () => ({
		noticeItem: {},
	}),
	computed: {
		...mapGetters(['HOME_GET_CUSTOM_NOTICE']),
		getQuery() {
			return this.$route.params.id
		},
		prevItem() {
			return this.common_prevItem(this.HOME_GET_CUSTOM_NOTICE, this.getQuery)
		},
		nextItem() {
			return this.common_nextItem(this.HOME_GET_CUSTOM_NOTICE, this.getQuery)
		},
	},
	watch: {
		getQuery() {
			this.getData()
		},
	},
	created() {
		console.log('getQuery', this.getQuery)
		this.getData()
	},
	mounted() {
		if (Object.keys(this.HOME_GET_CUSTOM_NOTICE).length === 0) this.getList()
	},
	methods: {
		...mapActions(['HOME_ACT_CUSTOM_NOTICE']),
		async getList() {
			// notice items 가져오기
			await this.HOME_ACT_CUSTOM_NOTICE({
				method: 'get',
				params: {
					notice_kind: '0',
					category: '',
					txtinput: '',
				},
			})
		},
		async getData() {
			await this.HOME_ACT_CUSTOM_NOTICE({
				method: 'detail',
				query: this.getQuery,
			}).then(res => {
				console.log('HOME_ACT_CUSTOM_NOTICE', res)
				if (res == undefined || res == null) return this.$router.push('/custom/notice').catch(() => {})
				this.noticeItem = res[0]
				console.log(this.noticeItem, 'noticeITem')
			})
		},
		pushLink(item) {
			console.log('push', item)
			if (Object.keys(item).length === 0) return this.$router.push('/custom/notice')
			this.$router.push(`/custom/notice/detail/${item.id}`).catch(() => {})
		},
	},
}
</script>

<style scoped lang="scss">
.notice_table {
	.th {
		padding: 14px 0 !important;
		border-top: 2px solid #262626 !important;
		border-bottom: 1px solid #262626 !important;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
		text-align: center !important;
	}
	.td {
		padding: 14px 30px !important;
		font-family: 'NotoSansKR-Regular';
		font-size: 15px !important;
		color: #262626;
		border-top: 2px solid #262626 !important;
		border-bottom: 1px solid #a0a1a5 !important;
	}
	.tit {
		position: relative;
		padding-left: 40px;
	}
	.content_area {
		min-height: 600px;
		padding: 30px;
	}
}
</style>
