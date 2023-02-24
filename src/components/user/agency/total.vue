<template>
	<div>
		<!-- 전문가 집들이 내역 -->
		<v-col
			cols="12"
			class="pa-0"
		>
			<v-row class="ma-0 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					align="start"
					align-self="center"
					>전문가 집들이 관리</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						class="mr-2"
						@click="changeTab(1)"
					/>
					<CommonButtonsButton03
						to="/user/create/4"
						title="등록하기"
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="AGENCY_GET_HOUSEWARMING.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="housewarming"
						:card-menu="AGENCY_GET_HOUSEWARMING"
						@submit="onClick"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				justify="center"
				class="ma-0"
			>
				<UserItemEmpty :text="`첫 번째 <strong>전문가 집들이</strong>를 등록해보세요.`" />
			</v-row>
		</v-col>

		<!-- 견적상담 내역 -->
		<v-col
			cols="12"
			class="pa-0 mt-8 mt-md-15"
		>
			<v-row class="ma-0 d-flex history_bar">
				<v-col
					class="pa-0 tit"
					align="start"
					align-self="center"
					>견적상담 관리</v-col
				>
				<v-col
					class="pa-0"
					align="end"
				>
					<CommonButtonsButton03
						title="전체보기"
						class="mr-0 mr-sm-2"
						@click="changeTab(2)"
					/>
				</v-col>
			</v-row>
			<v-row
				v-if="AGENCY_GET_ESTIMATE.length"
				class="ma-0"
			>
				<v-col class="pa-0">
					<CommonCardMenuGroup04
						menu-type="agency_estimate"
						:card-menu="AGENCY_GET_ESTIMATE"
						@submit="onClick"
					/>
				</v-col>
			</v-row>
			<v-row
				v-else
				class="ma-0"
				justify="center"
			>
				<UserItemEmpty
					:text="`<strong>견적상담</strong> 문의내역이 없습니다.`"
					sub-text="견적 상담 의뢰가 들어올때까지 조금만 기다려주세요"
				/>
			</v-row>
		</v-col>

		<!-- 인테리어점 문의내역 -->
		<v-col
			cols="12"
			class="pa-0 my-8 my-md-15"
		>
			<!-- ask list -->
			<UserAgencyAskList @submit="changeTab(3)" />
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'AgencyMyPageTotal',
	mixins: [common],
	props: ['items'],
	data: () => ({}),
	computed: {
		...mapGetters(['AGENCY_GET_HOUSEWARMING', 'AGENCY_GET_ESTIMATE', 'AGENCY_GET_ASK']),
	},
	created() {},
	methods: {
		...mapMutations(['AGENCY_MU_HOUSEWARMING_SELECT', 'AGENCY_MU_ESTIMATE_SELECT', 'AGENCY_MU_ASK_SELECT']),
		onClick(val) {
			switch (val.code) {
				case 4:
					this.AGENCY_MU_HOUSEWARMING_SELECT(val)
					break
				case 5:
					this.AGENCY_MU_ESTIMATE_SELECT(val)
					break
				case 6:
					this.AGENCY_MU_ASK_SELECT(val)
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
	padding: 10px 0 !important;
	margin-bottom: 20px !important;
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
