<template>
	<div class="inner_wrapper">
		<h3 class="mb-4">견적상담 상세</h3>

		<v-col class="pa-0 bg_grey">
			<!-- 고객정보 -->
			<v-col
				class="pa-0 sub_tit"
				cols="12"
				align="start"
			>
				<h4>고객정보</h4>
			</v-col>
			<div
				v-if="Object.keys(estimateItems).length"
				class="register"
			>
				<div class="body">
					<div class="basic_info pt-5 pt-md-8 pb-5 pb-md-8">
						<v-col
							cols="12"
							class="pa-0 table"
						>
							<!--<HomeCustomItemRegisterBasicInfo
                                title="상담번호"
                                :text="estimateItems.consult_id"
                            />-->
							<HomeCustomItemRegisterBasicInfo
								v-if="estimateItems.name"
								title="이름"
								:text="estimateItems.name"
							/>
							<HomeCustomItemRegisterBasicInfo
								v-if="estimateItems.hand"
								title="휴대폰"
								:text="common_number_filter(estimateItems.hand)"
							/>
							<HomeCustomItemRegisterBasicInfo
								v-if="estimateItems.emailaddr"
								title="이메일"
								:text="estimateItems.emailaddr"
							/>
							<HomeCustomItemRegisterBasicInfo
								v-if="estimateItems.address1"
								title="주소"
								:text="`${estimateItems.address1} ${estimateItems.address2}`"
							/>
							<v-col class="pa-0">
								<v-row
									class="ma-0"
									align="center"
								>
									<v-col
										class="pa-0 py-2 th"
										cols="3"
										sm="2"
										align="start"
									>
										추가문의
									</v-col>
									<v-col
										class="pa-0 py-2 td"
										cols="9"
										sm="10"
										align="start"
									>
										<v-row
											v-if="estimateItems.estconsultadd.length"
											class="mx-0"
										>
											<v-chip-group
												active-class="primary--text"
												column
											>
												<v-chip
													v-for="(item, i) in estimateItems.estconsultadd"
													:key="i"
												>
													<span>{{ item.code_name }}</span>
												</v-chip>
											</v-chip-group>
										</v-row>
										<span v-else>정보가 없습니다.</span>
									</v-col>
								</v-row>
							</v-col>
							<v-col
								v-if="estimateItems.card_list"
								class="pa-0"
							>
								<v-row class="ma-0 pt-2">
									<v-col
										class="pa-0 pt-2 th"
										cols="12"
										align="start"
									>
										상담 콘텐츠
									</v-col>
									<v-col
										class="pa-0 py-2 td"
										cols="12"
										align="start"
									>
										<v-col
											class="pa-0"
											cols="12"
											align="start"
										>
											<UserItemEstimateContentsCard :item="estimateItems.card_list" />
										</v-col>
									</v-col>
								</v-row>
							</v-col>
							<v-row
								class="ma-0"
								align="center"
							>
								<v-col
									class="pa-0 py-2 th"
									cols="3"
									sm="2"
									align="start"
								>
									상담 현황
								</v-col>
								<v-col
									class="pa-0 py-2 td"
									cols="9"
									sm="10"
									align="start"
									align-self="center"
								>
									<v-col
										class="pa-0"
										cols="12"
										sm="7"
										md="5"
									>
										<CommonSelectsSelect01
											v-model="estimateModel"
											:items="estimate_consultStatusItems"
											:label="'상담현황 선택'"
										/>
									</v-col>
								</v-col>
								<v-col class="pa-0 notice mt-3">
									<ul class="pa-0">
										<li>고객 상담을 진행하지 않으셨다면 고객님께 전화를 걸어 상담을 진행해주세요.</li>
										<li>고객 상담이 완료되면 상담 상태를 변경해주세요.</li>
									</ul>
								</v-col>
							</v-row>
						</v-col>
					</div>
				</div>
			</div>
		</v-col>

		<div
			class="mt-10 mb-10"
			align="center"
		>
			<CommonButtonsButton02
				name="목록"
				class-name="btn_large"
				color="#262626"
				class="ml-1"
				outlined
				@click="$router.go(-1)"
			/>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'UserAgencyEstimateDetail',
	mixins: [common, admin],
	data: () => ({
		estimateItems: {},
		estimateModel: null,
		originEstimateModel: null,
		estimate_consultStatusItems: [
			{ text: '상담대기중', value: '2' },
			{ text: '상담완료', value: '3' },
		],
	}),
	computed: {
		...mapGetters(['AGENCY_GET_ESTIMATE_SELECT']),
	},
	watch: {
		estimateModel(val) {
			console.log('estimateModel', val, this.originEstimateModel)
			if (this.originEstimateModel.value !== val.value && this.originEstimateModel !== null) {
				this.modifyData()
			}
		},
	},
	created() {
		if (Object.keys(this.AGENCY_GET_ESTIMATE_SELECT).length === 0) this.$router.go(-1)
		this.getList()
	},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AGENCY_ACT_ESTIMATE']),
		// 견적상담 상세정보 가져오기
		async getList() {
			const items = {
				method: 'detail',
				query: this.AGENCY_GET_ESTIMATE_SELECT.consult_id,
			}
			await this.AGENCY_ACT_ESTIMATE(items).then(res => {
				console.log('AGENCY_ACT_ESTIMATE', res, this.AGENCY_GET_ESTIMATE_SELECT)
				this.estimateItems = res[0]

				// state value추출
				const stateItem = this.common_forValueFind(this.estimateItems, 'corp_card_list', 3)

				this.estimateModel = this.admin_estimate_consult_statusItems.find(item => item.value === stateItem.consult_state)
				this.originEstimateModel = this.estimateModel
			})
		},
		async modifyData() {
			await this.AGENCY_ACT_ESTIMATE({
				method: 'put',
				params: {
					consult_id: this.AGENCY_GET_ESTIMATE_SELECT.consult_id,
					consult_state: this.estimateModel.value,
				},
			})
		},
	},
}
</script>

<style scoped lang="scss">
// 제목
h3 {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 20px !important;
}
.sub_tit {
	padding: 12px 0 !important;
	border-bottom: 1px solid #262626;
	h4 {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
		color: #262626;
	}
}

// 컨텐츠
.bg_grey {
	padding: 20px !important;
	background-color: #f1f2f3;
}
.register .body {
	background-color: #fff;
}
.register .body .basic_info {
	padding: 20px 28px;
	border-bottom: none !important;
}

.notice {
	li {
		position: relative;
		padding-left: 10px;
		text-align: left;
		font-family: 'NotoSansKR-Regular';
		font-size: 13px !important;
		list-style: none;
		color: #5f6062;
		&::before {
			display: block;
			content: '*';
			position: absolute;
			top: 3px;
			left: 0;
		}
	}
}

.estimate_paper {
	padding: 30px 110px;
	background-color: #fff;
	.logo {
		:deep(.v-image) {
			width: 96px;
		}
	}
	.tit {
		padding: 27px 0;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 28px !important;
		color: #262626;
		border-bottom: 1px solid #ccc;
	}
	.table {
		.th {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 16px !important;
			color: #262626;
		}
		.td {
			font-family: 'NotoSansKR-Regular';
			font-size: 16px !important;
			color: #262626;
		}
		.price {
			border-top: 1px solid #ccc;
			strong {
				font-size: 26px !important;
			}
		}
	}

	.notice {
		ul {
			padding: 20px !important;
			background-color: #f1f2f3;
		}
		li {
			position: relative;
			padding-left: 10px;
			text-align: left;
			font-family: 'NotoSansKR-Regular';
			font-size: 13px !important;
			list-style: none;
			color: #5f6062;
			&::before {
				display: block;
				content: '*';
				position: absolute;
				top: 3px;
				left: 0;
			}
		}
	}
}

.product {
	background-color: #fff;
}
@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 601px) and (max-width: 959px) {
	.estimate_paper {
		padding: 30px !important;
		.tit {
			padding: 26px 0;
			font-size: 26px !important;
		}
		.table {
			.th {
				font-size: 14px !important;
			}
			.td {
				font-size: 14px !important;
			}
			.price {
				strong {
					font-size: 24px !important;
				}
			}
		}
		.notice {
			ul {
				padding: 14px !important;
			}
			li {
				font-size: 13px !important;
			}
		}
	}
}
@media all and (max-width: 600px) {
	.estimate_paper {
		padding: 15px !important;
		.tit {
			padding: 24px 0;
			font-size: 18px !important;
		}
		.table {
			.th {
				font-size: 13px !important;
			}
			.td {
				font-size: 13px !important;
			}
			.price {
				strong {
					font-size: 22px !important;
				}
			}
		}
		.notice {
			ul {
				padding: 14px !important;
			}
			li {
				font-size: 12px !important;
			}
		}
	}
}
</style>
