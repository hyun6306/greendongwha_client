<template>
	<div>
		<!-- 스크랩북 내역 -->
		<v-col
			cols="12"
			class="pa-0"
		>
			<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					cols="auto"
					align="start"
					align-self="center"
					>스크랩북 내역</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						@click="changeTab(1)"
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="USER_GET_SCRAP.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="scrap"
						:card-menu="USER_GET_SCRAP"
						@submit="scrap_push_link"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				justify="center"
				class="ma-0"
			>
				<UserItemEmpty :text="`스크랩을 선택해 <strong>나만의 스크랩 북</strong>을 완성하세요.`" />
			</v-row>
		</v-col>

		<!-- 견적상담 내역 -->
		<v-col
			cols="12"
			class="pa-0 mt-8 mt-md-15"
		>
			<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					cols="auto"
					align="start"
					align-self="center"
					>견적상담 내역</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						class="mr-1"
						@click="changeTab(2)"
					/>
					<CommonButtonsButton03
						to="/interior/price/inquire"
						title="견적 의뢰"
						add-icon
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="USER_GET_ESTIMATE.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="estimate"
						:card-menu="USER_GET_ESTIMATE"
						@submit="onClick"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				class="ma-0"
				justify="center"
			>
				<UserItemEmpty :text="`집 근처 인테리어점을 찾아<br>첫 번째 <strong>견적상담 의뢰</strong>를 진행해보세요.`" />
			</v-row>
		</v-col>

		<!-- 품질보증 등록내역 -->
		<v-col
			cols="12"
			class="pa-0 mt-8 mt-md-15"
		>
			<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					cols="auto"
					align="start"
					align-self="center"
					>품질보증 등록 내역</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						class="mr-0 mr-sm-2"
						@click="changeTab(3)"
					/>
					<CommonButtonsButton03
						to="/user/create/1"
						title="등록하기"
						add-icon
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="USER_GET_QUALITY.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="quality"
						:card-menu="USER_GET_QUALITY"
						@submit="onClick"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				class="ma-0"
				justify="center"
			>
				<UserItemEmpty :text="`첫 번째 <strong>품질 보증</strong>을 등록해보세요.`" />
			</v-row>
		</v-col>

		<!-- A/S신청 내역 -->
		<v-col
			cols="12"
			class="pa-0 mt-8 mt-md-15"
		>
			<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					cols="auto"
					align="start"
					align-self="center"
					>A/S 신청 내역</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						class="mr-0 mr-sm-2"
						@click="changeTab(4)"
					/>
					<CommonButtonsButton03
						to="/user/create/2"
						title="신청하기"
						add-icon
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="USER_GET_AS.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="as"
						:card-menu="USER_GET_AS"
						@submit="onClick"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				class="ma-0"
				justify="center"
			>
				<UserItemEmpty :text="`첫 번째 <strong>A/S신청</strong>을 등록해보세요.`" />
			</v-row>
		</v-col>

		<!-- 1:1 문의 내역 -->
		<v-col
			cols="12"
			class="pa-0 mt-8 mt-md-15"
		>
			<!-- question list -->
			<UserUserQuestionList />
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'

export default {
	name: 'UserMyPageTotal',
	mixins: [common, scrap],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['USER_GET_ESTIMATE', 'USER_GET_SCRAP', 'USER_GET_QUALITY', 'USER_GET_AS', 'USER_GET_QUESTION']),
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_ESTIMATE_SELECT', 'USER_MU_QUALITY_SELECT', 'USER_MU_AS_SELECT', 'USER_MU_QUESTION_SELECT']),
		onClick(val) {
			switch (val.code) {
				case 0:
					this.USER_MU_ESTIMATE_SELECT(val)
					break
				case 1:
					this.USER_MU_QUALITY_SELECT(val)
					break
				case 2:
					this.USER_MU_AS_SELECT(val)
					break
				case 3:
					this.USER_MU_QUESTION_SELECT(val)
					break
			}
			this.$router.push(`/user/listDetail/${val.code}`)
		},
		changeTab(val) {
			this.$emit('change', val)
		},
	},
}
</script>

<style scoped lang="scss">
// 내역 상세보러가기 영역
.history_bar {
	border-bottom: 1px solid #262626 !important;
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
		color: #262626;
	}
}

// 내역카드
.history_card {
	width: 180px !important;
	height: 180px !important;
	background-color: #f3f4f5 !important;
	.text {
		font-size: 14px !important;
		p {
			font-family: 'NotoSansKR-Bold' !important;
		}
		span {
			font-family: 'NotoSansKR-Regular' !important;
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 601px) and (max-width: 959px) {
}
@media all and (max-width: 600px) {
	// 내역 상세보러가기 영역
	.history_bar {
		.tit {
			font-size: 15px !important;
		}
	}
}
</style>
