<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				class="pa-0"
				cols="12"
				align="center"
			>
				<v-col
					class="pa-0"
					cols="12"
					align="center"
				>
					<h2 class="content_title">{{ common_title }}</h2>
				</v-col>

				<!-- 동화소식 배너 -->
				<HomeCustomItemBanner :banner-items="bannerItems" />

				<div class="pa-0 px-5 px-md-0 inner_wrapper">
					<v-col
						class="pa-0"
						cols="12"
					>
						<v-row
							class="ma-0"
							justify="start"
						>
							<!--							<v-col cols="4" md="2" class="pa-0 pr-2">
								<CommonSelectsSelect01
									v-model="selectModel"
									:items="searchItems"
								/>
							</v-col>-->
							<v-col
								cols="12"
								md="4"
								class="pa-0"
							>
								<CommonInputsInput03
									v-model="searchModel"
									label="검색어를 입력해주세요."
								/>
							</v-col>
						</v-row>

						<v-col
							cols="12"
							class="pa-0 mt-4 table_type01 notice_table"
						>
							<v-row class="ma-0">
								<v-col
									cols="12"
									md="10"
									class="px-3 th th_bt"
									>제목</v-col
								>
								<v-col
									cols="2"
									class="px-3 hidden-sm-and-down th th_bt"
									>등록일</v-col
								>
							</v-row>
							<div
								v-for="(item, i) in filterItems"
								:key="i"
								class="clickCursor"
							>
								<v-row
									v-if="item.notice_kind === '2'"
									class="ma-0"
									@click="pushDetail(item.notice_id)"
								>
									<v-col
										cols="12"
										md="10"
										class="td"
										align="start"
									>
										<div class="tit"><span class="tag news">뉴스</span>{{ item.title }}</div>
									</v-col>
									<v-col
										cols="2"
										class="td hidden-sm-and-down"
										align="center"
									>
										{{ item.regi_date.split(' ')[0] }}
									</v-col>
								</v-row>
								<v-row
									v-else
									class="ma-0"
									@click="pushDetail(item.notice_id)"
								>
									<v-col
										cols="12"
										md="10"
										class="td"
										align="start"
									>
										<div class="tit"><span class="tag alim">공지</span>{{ item.title }}</div>
									</v-col>
									<v-col
										cols="2"
										class="td hidden-sm-and-down"
										align="center"
									>
										{{ item.regi_date.split(' ')[0] }}
									</v-col>
								</v-row>
							</div>
						</v-col>

						<v-col
							class="pa-0 mt-7"
							align="center"
						>
							<CommonButtonsButton02
								v-if="searchCount > showItemsCount"
								:name="`더보기 (${showItemsCount}/${searchCount})`"
								class-name="btn_more"
								color="#70b341"
								outlined
								@click="showItemsCount += 16"
							/>
						</v-col>
					</v-col>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCustomNotice',
	metaInfo: {
		title: '동화소식 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '동화소식 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화소식',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 공지사항',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/custom/notice`,
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
		bannerItems: {
			image: require('@/assets/img/home/custom/icon_board_user.png'),
			title: '국내 바닥재 업계 1위 기업, 동화',
			text: '제품 출시 및 다양한 정보를 확인하세요',
		},
		selectModel: '전체',
		searchItems: ['전체', '제목', '게시글'],
		searchModel: '',
		searchCount: 0,
	}),
	computed: {
		...mapGetters([
			'APP_GET_SCROLL_BOTTOM', // 스크롤 EVENT
			'HOME_GET_CUSTOM_NOTICE',
		]),
		filterItems() {
			// searchModel
			let searchItems = []
			if (this.searchModel?.length) {
				searchItems = this.HOME_GET_CUSTOM_NOTICE.filter(item =>
					item.title.toLowerCase().includes(this.searchModel.toLowerCase()),
				)
			}

			const resultItems = this.searchModel?.length ? searchItems : this.HOME_GET_CUSTOM_NOTICE
			this.searchCount = resultItems.length
			return resultItems.slice(0, this.showItemsCount)
		},
		// noticeItems(){
		// 	return this.HOME_GET_CUSTOM_NOTICE.filter(item => item.notice_kind === '1')
		// 		.sort((a,b) => a.date > b.date? 1 : -1)
		// },
		// newsItems(){
		// 	return this.HOME_GET_CUSTOM_NOTICE.filter(item => item.notice_kind === '2')
		// 		.sort((a,b) => a.date > b.date? 1 : -1)
		// },
	},
	watch: {
		APP_GET_SCROLL_BOTTOM() {
			if (this.showItemsCount < this.searchCount) this.showItemsCount += 16
		},
	},
	async created() {
		await this.getList()
	},
	mounted() {
		console.log('HOME_GET_CUSTOM_NOTICE', this.HOME_GET_CUSTOM_NOTICE)
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
		pushDetail(id) {
			this.$router.push(`/custom/notice/detail/${id}`).catch(() => {})
		},
		// sliceData(data){
		//     return data.splice(-16)                           // 15개의 최근데이터 추출
		//     // .sort((a,b) => a.date < b.date? 1 : -1)// 오름차순으로 정렬
		//     // .sort((a,b) => a.date > b.date? 1 : -1)// 내림차순으로 정렬
		// },
		// filterData(data){
		//     const notice = data.filter(item => item.notice_kind === '1') // 공지
		// 	    .sort((a,b) => a.date < b.date? 1 : -1)
		//     const news = data.filter(item => item.notice_kind === '2') // 뉴스
		// 	    .sort((a,b) => a.date < b.date? 1 : -1)
		//
		//     return [...notice,...news]
		// },
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
		border-bottom: 1px solid #a0a1a5 !important;
	}
	.tit {
		position: relative;
		padding-left: 40px;
	}
	.tag {
		display: inline-block !important;
		position: absolute;
		left: 0;
		height: 20px !important;
		min-width: 34px !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px !important;
		text-align: center;
		color: #fff !important;
		&.news {
			background-color: #42883d !important;
		}
		&.alim {
			background-color: #0f2e73 !important;
		}
	}
}

@media all and (max-width: 600px) {
	.notice_table {
		.td {
			padding: 14px 10px !important;
		}
	}
}
</style>
