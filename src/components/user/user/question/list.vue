<template>
	<div>
		<v-row class="ma-0 py-3 mb-5 d-flex history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>1:1 문의 내역</v-col
			>
			<v-col
				class="pa-0"
				align="end"
			>
				<CommonButtonsButton03
					to="/user/create/3"
					title="문의하기"
					add-icon
				/>
			</v-col>
		</v-row>
		<!-- 1:1 문의 내역 -->
		<v-col
			v-if="USER_GET_QUESTION.length"
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
                                    mandatory
								>
									<v-btn
                                        @click="filterItems(item)"
                                        v-for="(item, i) in filterGroup"
                                        :key="i"
                                    >
                                        {{item.text}}
                                    </v-btn>
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
							cols="4"
							md="2"
							class="th"
							>문의종류</v-col
						>
						<v-col
							cols="2"
							class="th hidden-sm-and-down"
							>제품</v-col
						>
						<v-col
							cols="5"
							md="4"
							class="th"
							>제목</v-col
						>
						<v-col
							cols="2"
							class="th hidden-sm-and-down"
							>접수일</v-col
						>
						<v-col
							cols="3"
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
								cols="4"
								md="2"
								class="td"
								>{{ item.subject_name }}</v-col
							>
							<v-col
								cols="2"
								class="td hidden-sm-and-down"
								>{{ item.title }}</v-col
							>
							<v-col
								cols="5"
								md="4"
								class="td tit"
								>{{ item.contents }}</v-col
							>
							<v-col
								cols="2"
								class="td hidden-sm-and-down"
								>{{ item.date }}</v-col
							>
							<v-col
								cols="3"
								md="2"
								class="td state question"
								>{{ item.progress_state_name }}</v-col
							>
							<!-- <v-col cols="3" md="2" class="td state clear">{{ item.status }}</v-col> -->
						</v-row>
					</div>
				</v-col>
				<v-col class="pa-0 mt-10">
					<CommonButtonsButton02
						v-if="USER_GET_QUESTION.length > showItemsCount"
						:name="`더보기 (${showItemsCount}/${USER_GET_QUESTION.length})`"
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
import moment from '@/mixins/moment'

export default {
	name: 'UserMyPageQuestionList',
	mixins: [moment],
	props: ['items'],
	data: () => ({
		showItemsCount: 16,
		toggle_exclusive: 0,
		filterGroup: [
			{
				text: '전체',
				value: 'total',
			},
			{
				text: '7일',
				value: 'week',
			},
			{
				text: '1개월',
				value: 'month',
			},
			{
				text: '3개월',
				value: '3month',
			},
			{
				text: '1년',
				value: 'year',
			},
		],
		page: null,
		date: null,
	}),
	computed: {
		...mapGetters(['USER_GET_QUESTION']),
		filterShowItems() {
			return this.USER_GET_QUESTION.slice(0, this.showItemsCount)
		},
	},
	created() {},
	methods: {
		...mapMutations(['USER_MU_QUESTION_SELECT']),
		onClick(val) {
			this.USER_MU_QUESTION_SELECT(val)
			this.$router.push(`/user/listDetail/3`)
		},
		filterItems(item) {
			console.log(item)
			let items = []
			let startDate = this.moment_today
			let endDate = ''

			switch (item.value) {
				case 'total':
					items = this.USER_GET_QUESTION
					break
				case 'week':
					endDate = moment(startDate).subtract(7, 'day')
					break
			}

			console.log('date', startDate, endDate)
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
