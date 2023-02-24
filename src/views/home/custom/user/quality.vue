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

				<!-- 10년보증 배너 -->
				<HomeCustomItemBanner :banner-items="bannerItems" />

				<!-- 품질보증 소개 -->
				<div class="inner_wrapper px-5 px-md-0">
					<v-col
						class="pa-0"
						cols="12"
					>
						<div class="graf mb-10">
							<h3 class="mb-2">품질보증이란?</h3>
							<p>
								동화자연마루/동화디자인월 제품을 시공 후 1개월 이내, 홈페이지에 품질보증을 등록하시면 최대
								10년까지 품질보증을 해 드립니다. (단, 상업용 공간은 제외됩니다.)
							</p>
						</div>

						<div class="graf mb-10">
							<h3 class="mb-2">품질보증 기간</h3>
							<v-col class="table_type01">
								<v-row><v-col class="th">강마루 / 강화마루 / 디자인월</v-col></v-row>
								<v-row>
									<v-col
										class="td tit tal"
										cols="2"
										>브랜드</v-col
									>
									<v-col
										class="td"
										cols="10"
										align="start"
									>
										나투스 진 (일반 / 헤링본 / 그란데 / 테라 / 텍스쳐) <br class="pc_only" />
										나투스 듀오 (일반 / 헤링본 / 텍스쳐) <br class="pc_only" />
										클릭, 아이온, 크로젠, 디자인월 (일반 / 그란데)
									</v-col>
								</v-row>
								<v-row>
									<v-col
										class="td tit bc_tr tal"
										cols="2"
										>내역</v-col
									>
									<v-col
										class="td bc_tr"
										cols="10"
										align="start"
									>
										기본 품질보증기간 3년<br />
										시공완료 후 1개월내 품질보증 등록시 최대 10년으로 연장<br />
									</v-col>
								</v-row>
							</v-col>
							<v-col class="table_type01">
								<v-row><v-col class="th">그 외 바닥재</v-col></v-row>
								<v-row>
									<v-col
										class="td tit tal"
										cols="2"
									>
										브랜드
									</v-col>
									<v-col
										class="td"
										cols="10"
										align="start"
									>
										나투스진 네이쳐, 나투스강(일반 / 헤링본 / 텍스쳐), 바움 등
									</v-col>
								</v-row>
								<v-row>
									<v-col
										class="td tit tal"
										cols="2"
									>
										내역
									</v-col>
									<v-col
										class="td"
										cols="10"
										align="start"
									>
										기본 품질보증기간 1년 시공완료 후 1개월내 품질보증 등록시에도 1년 (별도 연장 혜택 없음)
									</v-col>
								</v-row>
							</v-col>
						</div>

						<div class="graf mb-10">
							<h3 class="mb-2">유무상 A/S기준</h3>
							<v-col class="table_type01">
								<v-row><v-col class="th">무상 A/S</v-col></v-row>
								<v-row>
									<v-col
										class="td bc_tr"
										cols="12"
										align="start"
									>
										제품 및 시공상 문제가 발생한 경우
									</v-col>
								</v-row>
							</v-col>
							<v-col class="table_type01">
								<v-row><v-col class="th">유상 A/S</v-col></v-row>
								<v-row>
									<v-col
										class="td"
										cols="12"
										align="start"
									>
										<ul class="pa-0">
											<li>고객의 관리 부주의로 인해 제품이 손상된 경우</li>
											<li>
												보일러나 싱크대 배관 등의 누수, 결로 또는 건축물 구조상 문제로 제품이 손상된 경우
											</li>
											<li>
												동화자연마루에서 보증하는 시공팀(SM)이 아닌 사람이 시공, 보수를 하여 문제가
												발생했을 경우
											</li>
											<li>동화자연마루 표준시방서에 의거하지 않은 시공을 한 경우</li>
											<li>품질보증기간이 지난 경우</li>
											<li>천재지변으로 인한 경우</li>
										</ul>
									</v-col>
								</v-row>
							</v-col>
						</div>

						<div class="graf mb-10">
							<h3 class="mb-2">품질보증 등록절차</h3>
							<!-- 스텝 컴포넌트 -->
							<CommonCardsCard01Group
								cols="4"
								:card-items="registerCardItems"
							/>
						</div>

						<CommonButtonsButton02
							name="품질보증 등록하기"
							class-name="btn_large"
							color="#00582c"
							@click="createQuality"
						/>
					</v-col>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCustomQuality',
	metaInfo: {
		title: '품질보증등록 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '품질보증등록 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '품질 보증 등록, 품질 인증',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '최소 7년이상 사용하는 인테리어, 동화장녀마루에서 품질 보증 받으세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/custom/quality`,
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
			image: require('@/assets/img/home/custom/icon_10years.png'),
			title: '최대 10년 품질 보증 서비스로 안심하세요.',
			text: '최소 7년이상 사용하는 인테리어, 동화자연마루에서 품질 보증 받으세요.',
		},
		registerCardItems: [
			{
				number: '01',
				image: require('@/assets/img/home/custom/icon_step_01.png'),
				title: '품질보증 번호 신청',
				text: '(톡톡 또는 고객센터로 문의)',
			},
			{
				number: '02',
				image: require('@/assets/img/home/custom/icon_step_02.png'),
				title: '동화자연마루 홈페이지 로그인',
			},
			{
				number: '03',
				image: require('@/assets/img/home/custom/icon_step_03.png'),
				title: '품질보증 등록',
			},
			{
				number: '04',
				image: require('@/assets/img/home/custom/icon_step_04.png'),
				title: '제품 정보 및 설문 작성',
			},
			{
				number: '05',
				image: require('@/assets/img/home/custom/icon_step_05.png'),
				title: '등록 완료',
			},
		],
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {},
	methods: {
		createQuality() {
			if (this.AUTH_GET_USER_AUTH !== 'GEUST') {
				// google analytics
				window.gtag('event', 'click_quality_button', { button_location: `custom_quality` })

				return this.$router.push('/user/create/1')
			}
			this.$router.push('/login')
		},
	},
}
</script>

<style scoped lang="scss"></style>
