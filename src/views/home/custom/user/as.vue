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

				<!-- AS신청 배너 -->
				<HomeCustomItemBanner :banner-items="bannerItems" />

				<!-- AS신청 소개 -->
				<div class="pa-0 px-5 px-md-0 inner_wrapper">
					<v-col
						class="pa-0"
						cols="12"
					>
						<div class="graf mb-8">
							<h3 class="mb-2">A/S 진행 절차</h3>
							<p>
								동화자연마루 제품 및 시공에 대한 A/S가 필요하신가요? A/S를 신청해주시면 담당자가 확인 후 신속하게
								연락 드리겠습니다.
							</p>
							<CommonCardsCard01Group
								class="mt-5"
								cols="4"
								:card-items="asCardItems"
							/>
						</div>

						<v-col
							cols="12"
							class="d-flex justify-center confirm"
						>
							<span class="ml-2"
								><v-icon
									small
									class="mr-1"
									>mdi-information-outline</v-icon
								>잠깐! A/S를 접수하기 전에 품질 보증을 등록하셨나요?</span
							>
						</v-col>

						<div
							class="mt-3 mb-15 d-flex justify-center"
							align="center"
						>
							<CommonButtonsButton02
								name="A/S 접수하기"
								class-name="btn_large mr-1"
								color="#00582c"
								@click="goRegiste"
							/>
							<CommonButtonsButton02
								name="품질보증 등록 안내"
								class-name="btn_large ml-1"
								color="#a0a1a5"
								@click="$router.push('/custom/quality')"
							/>
						</div>

						<div class="graf">
							<h3 class="mb-2">A/S 종류에 따른 문의 방법</h3>
							<v-row
								class="ma-0 card_link"
								justify="center"
							>
								<v-col
									v-for="(item, i) in questionCardItems"
									:key="i"
									class="pa-0"
									cols="12"
									md="4"
								>
									<CommonCardsCard02
										:number="item.number"
										:image="item.image"
										:title="item.title"
										:text="item.text"
										:sub-text="item.subText"
										:button="item.button"
										@submit="pushLink(item)"
									/>
								</v-col>
							</v-row>
							<div
								id="naverChatBot"
								class="talk_banner_div"
								data-id="22278"
								style="display: none"
							></div>
						</div>
					</v-col>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'
import naver_chatbot from '@/mixins/naver_chatbot'

export default {
	name: 'HomeCustomAS',
	metaInfo: {
		title: 'A/S 신청 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: 'A/S 신청 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: 'A/S 신청',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 A/S 서비스로 안심하고 사용하세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/custom/as`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common, naver_chatbot],
	data: () => ({
		bannerItems: {
			image: require('@/assets/img/home/custom/icon_as.png'),
			title: '동화자연마루 A/S 서비스로 안심하고 사용하세요.',
			text: '고객님의 A/S 신청 문의 답변은 알림톡이나 My Page > 문의 내역에서 확인하실 수 있습니다.',
			text2: '운영시간은 평일 09:00 ~ 17:00이며 최대한 빠른 시간 내 답변 드리도록 하겠습니다.',
		},
		asCardItems: [
			{
				number: '01',
				image: require('@/assets/img/home/custom/icon_step_04.png'),
				title: '유선or온라인',
				text: '신청 접수',
			},
			// {
			// 	number: "02",
			// 	image: require('@/assets/img/home/custom/icon_step_06.png'),
			// 	title: '품질보증 번호 신청',
			// 	text: '영업일 기준 3~4일 이내 소요'
			// },
			{
				number: '02',
				image: require('@/assets/img/home/custom/icon_step_07.png'),
				title: '일정 조율',
				text: 'A/S기사 연락',
			},
			{
				number: '03',
				image: require('@/assets/img/home/custom/icon_step_08.png'),
				title: 'A/S기사 방문',
			},
		],
		questionCardItems: [
			{
				number: '01',
				image: require('@/assets/img/home/custom/icon_faq_01.png'),
				title: '자주 묻는 질문',
				text: '자주 접수되는 A/S 사례를 분류하여 제공합니다.',
				button: {
					name: '바로가기',
					color: '#00582c',
					className: 'font_12 edge_5 mt-3',
					height: '34',
				},
				link: '/custom/question',
			},
			{
				number: '02',
				image: require('@/assets/img/home/custom/icon_faq_02.png'),
				title: '동화 톡톡',
				text: '1:1상담을 통해 보다 빠르게 불편사항을 해결하세요.',
				button: {
					name: '동화 톡톡 상담',
					color: '#00582c',
					className: 'font_12 edge_5 mt-3',
					height: '34',
				},
			},
			{
				number: '03',
				image: require('@/assets/img/home/custom/icon_faq_03.png'),
				title: '고객센터',
				text: '전화 상담원을 통해 A/S를 접수해보세요.',
				subText: '운영시간 평일 09:00 ~ 17:00',
				button: {
					name: '1899-2837',
					color: '#00582c',
					className: 'font_12 edge_5 mt-3',
					height: '34',
				},
			},
		],
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {},
	methods: {
		goRegiste() {
			if (this.AUTH_GET_USER_AUTH !== 'GEUST') return this.$router.push('/user/create/2')
			this.$router.push('/login')
		},
		pushLink(item) {
			switch (item.title) {
				case '자주 묻는 질문':
					this.$router.push(item.link).catch(() => {})
					break
				case '동화 톡톡':
					this.naver_chatbot_on_click()
					break
				case '고객센터':
					this.common_phoneCall()
					break
			}
		},
	},
}
</script>

<style scoped lang="scss"></style>
