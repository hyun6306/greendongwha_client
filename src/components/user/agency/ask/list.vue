<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>인테리어점 문의 내역</v-col
			>
			<v-col
				class="pa-0"
				align="end"
			>
				<CommonButtonsButton03
					v-if="tab !== 3"
					title="전체보기"
					class="mr-0 mr-sm-2"
					@click="$emit('submit')"
				/>
				<CommonButtonsButton03
					title="등록하기"
					@click="$router.push('/user/create/6')"
				/>
			</v-col>
		</v-row>
		<!-- 1:1 문의 내역 -->
		<v-col
			v-if="AGENCY_GET_ASK.length > 0"
			cols="12"
			class="pa-0 mb-10"
		>
			<!--개발 후 오픈-->
			<!--개발 후 오픈-->
			<!-- <v-row class="date ma-0">
				<v-col class="pa-0" cols="12" md="6">
					<v-row class="ma-0">
						<v-col class="pa-0 tal" cols="auto">
							<v-col cols="12" md="3" class="pa-0 period">
								<v-btn-toggle
									v-model="toggle_exclusive"
								>
									<v-btn>전체</v-btn>
									<v-btn>7일</v-btn>
									<v-btn>1개월</v-btn>
									<v-btn>3개월</v-btn>
									<v-btn>1년</v-btn>
								</v-btn-toggle>
							</v-col>
						</v-col>
					</v-row>
				</v-col>

				<v-col class="pa-0" cols="12" md="6" align="right">
					<v-col class="pa-0 mt-2 mt-md-0" cols="12" md="10">
						<CommonInputsInputDate01
							v-model="date"
						/>
					</v-col>
				</v-col>
			</v-row>-->

			<v-row class="ma-0 mt-3">
				<v-col
					cols="12"
					class="table_type01 pa-0"
				>
					<v-row class="ma-0">
						<v-col
							cols="2"
							md="2"
							class="th"
							>No</v-col
						>
						<v-col
							cols="8"
							md="5"
							class="th"
							>제목</v-col
						>
						<v-col
							cols="3"
							class="th hidden-sm-and-down"
							>접수일</v-col
						>
						<v-col
							cols="2"
							md="2"
							class="th"
							>상태</v-col
						>
					</v-row>
					<div
						v-for="(item, i) in filterShowItems"
						:key="i"
						class="question_item pa-0"
						@click="onClick(item)"
					>
						<v-row class="ma-0">
							<!--
								[확인사항]
								1. 상태값 : 문의 (class="state question")
								2. 상태값 : 답변완료 (class="state clear")
							-->
							<v-col
								cols="2"
								md="2"
								class="td"
								>{{ item.id }}</v-col
							>
							<v-col
								cols="8"
								md="5"
								class="td tit"
								>{{ item.title }}</v-col
							>
							<v-col
								cols="3"
								class="td hidden-sm-and-down"
								>{{ item.regi_date_convert }}</v-col
							>
							<v-col
								cols="2"
								md="2"
								class="td state question"
								>{{ item.progress_state_name }}</v-col
							>
						</v-row>
					</div>
				</v-col>
				<v-col class="pa-0 mt-10">
					<CommonButtonsButton02
						v-if="AGENCY_GET_ASK.length > showItemsCount"
						:name="`더보기 (${showItemsCount}/${AGENCY_GET_ASK.length})`"
						class-name="btn_more"
						color="#70b341"
						outlined
						@click="showItemsCount += 16"
					/>
				</v-col>
			</v-row>
		</v-col>
		<v-row
			v-else
			justify="center"
			class="ma-"
		>
			<UserItemEmpty :text="`첫 번째 <strong>1:1문의</strong>를 등록해보세요.`" />
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'UserAgencyAskList',
	props: ['items', 'tab'],
	data: () => ({
		showItemsCount: 16,
		toggle_exclusive: 0,
		page: null,
		date: null,
	}),
	computed: {
		...mapGetters(['AGENCY_GET_ASK']),
		filterShowItems() {
			return this.AGENCY_GET_ASK.slice(0, this.showItemsCount)
		},
	},
	watch: {
		tab(val) {
			console.log('tab', val)
		},
	},
	created() {},
	methods: {
		...mapMutations(['AGENCY_MU_ASK_SELECT']),
		onClick(val) {
			console.log('onClick', val)
			this.AGENCY_MU_ASK_SELECT(val)
			this.$router.push(`/user/listDetail/6`)
		},
	},
}
</script>

<style scoped lang="scss">
.table_type01 {
	.th {
		text-align: center !important;
	}
	.td {
		text-align: center;
	}
	.tit {
		text-align: left;
	}
	.state.question {
		color: #ff8111 !important;
	}
	.state.clear {
		color: #42883d !important;
	}
}

.date {
	span {
		line-height: 30px;
	}
}

// 기간
.period {
	:deep(.v-btn-toggle) button {
		padding: 10px;
		height: 36px !important;
		margin-right: 2px;
		background-color: #f1f2f3 !important;
		color: #7f7f7f !important;
		border-radius: 0 !important;
		&.v-btn.v-item--active.v-btn--active {
			background-color: #00592d !important;
			color: #fff !important;
		}
	}
}

.question_item {
	cursor: pointer;
}
</style>
