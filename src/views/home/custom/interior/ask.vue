<template>
	<div class="wrapper">
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
					class="pa-0"
					align="center"
				>
					<h2 class="content_title">{{ common_title }}</h2>
				</v-col>

				<!-- 인테리어점 문의 배너 -->
				<HomeCustomItemBanner :banner-items="bannerItems" />

				<CommonButtonsButton02
					name="인테리어점 문의하기"
					class-name="btn_large"
					color="#00582c"
					to="/user/create/6"
				/>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCustomInteriorAsk',
	metaInfo: {
		title: '인테리어점 문의 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '인테리어점 문의 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루의 인테리어점 문의사항',
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
		bannerItems: {
			image: require('@/assets/img/home/custom/icon_ask.png'),
			title: '안녕하세요 인테리어점 회원 여러분 <br> 동화자연마루에 대한 궁금한 점이 있으시면 무엇이든 물어보세요.',
			text: '등록하신 문의 내용의 답변은 알림톡이나 My Page > 인테리어점 문의 내역에서 확인하실 수 있습니다. <br> 운영시간은 평일 09:00 ~ 17:00이며 최대한 빠른 시간 내 답변 드리도록 하겠습니다.',
		},
		selectModel: '전체',
		searchItems: ['전체', '제목', '게시글'],
		searchModel: '',
		moreModel: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
		filterItems() {
			const data = [...this.newsItems, ...this.noticeItems]
			if (this.moreModel) return this.filterData(data)
			return data.length > 15 ? this.filterData(this.sliceData(data)) : data
		},
		moreCheck() {
			return this.moreModel ? false : this.noticeData.length > 15
		},
		noticeItems() {
			return this.noticeData.filter(item => item.tag === '공지').sort((a, b) => (a.date > b.date ? 1 : -1))
		},
		newsItems() {
			return this.noticeData.filter(item => item.tag === '뉴스').sort((a, b) => (a.date > b.date ? 1 : -1))
		},
	},
	watch: {},
	mounted() {
		if (this.AUTH_GET_USER_AUTH !== 'AGENCY') this.$router.go(-1)
	},
	methods: {
		sliceData(data) {
			return data.splice(-15) // 15개의 최근데이터 추출
			// .sort((a,b) => a.date < b.date? 1 : -1)// 오름차순으로 정렬
			// .sort((a,b) => a.date > b.date? 1 : -1)// 내림차순으로 정렬
		},
		filterData(data) {
			const notice = data.filter(item => item.tag === '공지').sort((a, b) => (a.date < b.date ? 1 : -1))
			const news = data.filter(item => item.tag === '뉴스').sort((a, b) => (a.date < b.date ? 1 : -1))

			return [...notice, ...news]
		},
	},
}
</script>

<style scoped lang="scss"></style>
