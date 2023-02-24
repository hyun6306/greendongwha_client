<template>
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
				<div class="content_title">
					{{ common_title }}
					<p class="sub_title">동화자연마루를 이용해주셔서 감사합니다.</p>
				</div>
			</v-col>

			<!-- 회원정보영역 -->
			<UserItemUserInfo />

			<!-- tab 영역 -->
			<div class="inner_wrapper">
				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<CommonCardMenuTypeBtn02
						v-model="customType"
						:type-items="tabItems"
						:cols="userTypeCols"
					/>
				</v-col>
			</div>

			<!-- 내용 영역 -->
			<div class="px-5 px-md-0 pt-7 inner_wrapper">
				<!-- 고객관점 -->
				<div v-if="AUTH_GET_USER_AUTH === 'USER'">
					<!-- 전체 -->
					<div v-if="customType === 0">
						<UserUserTotal @change="changeTab" />
					</div>

					<!-- 스크랩 -->
					<div v-if="customType === 1">
						<UserUserScrapList />
					</div>

					<!-- 견적상담 -->
					<div v-if="customType === 2">
						<UserUserEstimateList />
					</div>

					<!-- 품질보증등록 -->
					<div v-if="customType === 3">
						<UserUserQualityList />
					</div>

					<!-- AS -->
					<div v-if="customType === 4">
						<UserUserAsList />
					</div>

					<!-- 1:1문의 -->
					<div v-if="customType === 5">
						<UserUserQuestionList />
					</div>
				</div>

				<!-- 인테리어점 관점 -->
				<div v-if="AUTH_GET_USER_AUTH === 'AGENCY'">
					<!-- 전체 -->
					<div v-if="customType === 0">
						<UserAgencyTotal @change="changeTab" />
					</div>

					<!-- 전문가 집들이관리 -->
					<div v-if="customType === 1">
						<UserAgencyHousewarmingList />
					</div>

					<!-- 견적상담관리 -->
					<div v-if="customType === 2">
						<UserAgencyEstimateList />
					</div>

					<!-- 인테리어점 문의내역 -->
					<div v-if="customType === 3">
						<UserAgencyAskList :tab="customType" />
					</div>
				</div>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserMyPage',
	metaInfo: {
		title: '마이페이지 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '마이페이지 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 마이페이지',
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
		customType: 0,
		customTypeItems: {
			user: [
				{ title: '전체' },
				{ title: '스크랩북' },
				{ title: '견적 상담' },
				{ title: '품질 보증 등록' },
				{ title: 'A/S 신청' },
				{ title: '1:1 문의' },
			],
			agency: [
				{ title: '전체' },
				{ title: '전문가 집들이관리' },
				{ title: '견적상담 관리' },
				{ title: '인테리어점 문의내역' },
			],
		},
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'AUTH_GET_USER_AUTH', 'APP_GET_APP_STATE']),
		tabItems() {
			if (this.AUTH_GET_USER_AUTH === 'USER') return this.customTypeItems.user
			else if (this.AUTH_GET_USER_AUTH === 'AGENCY') return this.customTypeItems.agency
			return []
		},
		userTypeCols() {
			if (this.AUTH_GET_USER_AUTH === 'USER') {
				return this.APP_GET_APP_STATE !== 'web' ? 4 : 2
			} else if (this.AUTH_GET_USER_AUTH === 'AGENCY') {
				return this.APP_GET_APP_STATE !== 'web' ? 6 : 3
			}
		},
		getTab() {
			return Number(this.$route.params.tab) || 0
		},
		getQuery() {
			return Number(this.$route.query.tab) || 0
		},
	},
	watch: {
		AUTH_GET_USER_AUTH() {
			this.checkAuthGetData()
		},
	},
	created() {},
	mounted() {
		this.checkAuthGetData()
		this.customType = this.getTab
		if (this.getQuery !== 0) this.customType = this.getQuery
	},
	methods: {
		...mapActions([
			// user
			'USER_ACT_QUALITY',
			'USER_ACT_AS',
			'USER_ACT_QUESTION',
			'USER_ACT_ESTIMATE',

			// agency
			'AGENCY_ACT_HOUSEWARMING',
			'AGENCY_ACT_ESTIMATE',
			'AGENCY_ACT_ASK',
		]),
		checkAuthGetData() {
			if (this.AUTH_GET_USER_AUTH === 'USER') this.callUserInfo()
			else if (this.AUTH_GET_USER_AUTH === 'AGENCY') this.callAgencyInfo()
			else if (this.AUTH_GET_USER_AUTH === 'GUEST') return this.$router.push('/')
		},
		async callUserInfo() {
			// 견적상담
			await this.USER_ACT_ESTIMATE({
				method: 'get',
				params: {
					login_id: this.AUTH_GET_USER.login_id,
				},
			})
			// 품질보증
			await this.USER_ACT_QUALITY({
				method: 'get',
				params: {
					login_id: this.AUTH_GET_USER.login_id,
				},
			})
			// AS
			await this.USER_ACT_AS({
				method: 'get',
				params: {
					category: '1',
					service_id: '',
				},
			})
			// 1:1 문의
			await this.USER_ACT_QUESTION({
				method: 'get',
				params: {
					category: '2',
					service_id: '',
				},
			})
		},
		async callAgencyInfo() {
			// 전문가 집들이
			await this.AGENCY_ACT_HOUSEWARMING({
				method: 'get',
				params: {
					corporate_no: this.AUTH_GET_USER.corporate_no,
				},
			})
			// 견적상담 관리
			await this.AGENCY_ACT_ESTIMATE({
				method: 'get',
				params: {
					// login_id: this.AUTH_GET_USER.login_id,
					// consult_id: '',
				},
			})
			// 인테리어점 문의
			await this.AGENCY_ACT_ASK({
				method: 'get',
				params: {
					service_id: '',
				},
			})
		},
		changeTab(tab) {
			this.customType = tab
		},
	},
}
</script>

<style scoped lang="scss"></style>
