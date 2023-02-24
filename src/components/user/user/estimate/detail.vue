<template>
	<div class="inner_wrapper">
		<v-container class="pa-0">
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
					v-if="Object.keys(estimateItems).length !== 0"
					class="register"
				>
					<div class="body">
						<div class="basic_info pt-5 pt-md-8 pb-5 pb-md-8">
							<v-col
								v-if="listType === 'user'"
								class="pa-0 desc"
							>
								<HomeCustomItemRegisterBasicTitle />
							</v-col>
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
									:text="`${estimateItems.address1} ${estimateItems.address2 || ''}`"
								/>
							</v-col>
						</div>
					</div>
				</div>

				<!-- 시공견적서 -->
				<v-col
					class="pa-0 mt-9 sub_tit"
					cols="12"
					align="start"
				>
					<h4>문의정보</h4>
				</v-col>
				<div class="register">
					<div class="body">
						<div class="basic_info pt-5 pt-md-8 pb-5 pb-md-8">
							<v-col
								class="pa-0 table"
								cols="12"
							>
								<HomeCustomItemRegisterBasicInfo
									v-if="USER_GET_ESTIMATE_SELECT.content"
									title="문의상세"
									:text="USER_GET_ESTIMATE_SELECT.content"
								/>
								<HomeCustomItemRegisterBasicInfo
									v-if="USER_GET_ESTIMATE_SELECT.status"
									title="상담 현황"
									:text="USER_GET_ESTIMATE_SELECT.status.text"
								/>

								<!-- 상담 인테리어점 -->
								<v-col
									v-if="interiorItems.length"
									class="pa-0"
								>
									<v-row
										class="ma-0"
										align="center"
									>
										<v-col
											class="pa-0 py-2 th"
											cols="12"
											align="start"
										>
											상담 인테리어점
										</v-col>
										<v-col
											class="pa-0 py-2 td"
											cols="12"
											align="start"
										>
											<v-col
												v-for="(item, i) in interiorItems"
												:key="i"
												cols="12"
												align="start"
												class="pa-0"
											>
												<UserItemEstimateInteriorCard :item="item" />
											</v-col>
										</v-col>
									</v-row>
								</v-col>

								<!-- 상담 콘텐츠 -->
								<v-col
									v-if="estimateItems.card_list"
									class="pa-0"
								>
									<v-row
										class="ma-0"
										align="center"
									>
										<v-col
											class="pa-0 py-2 th"
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

								<!-- 시공범위 -->
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
											시공범위
										</v-col>
										<v-col
											v-if="estimateItems.estconsultadd && estimateItems.estconsultadd.length"
											class="pa-0 py-2 td"
											cols="9"
											sm="10"
											align="start"
										>
											<v-chip
												v-for="(item, i) in estimateItems.estconsultadd"
												:key="i"
												filter
												outlined
												class="mr-1"
											>
												{{ item.code_name }}
											</v-chip>
										</v-col>
										<v-col
											v-else
											class="pa-0 py-2 td"
											cols="9"
											sm="10"
											align="start"
										>
											<span>정보가 없습니다.</span>
										</v-col>
									</v-row>
								</v-col>

								<!-- 문의 사항 -->
								<v-col class="pa-0">
									<v-row class="ma-0">
										<v-col
											class="pa-0 py-2 th"
											cols="3"
											sm="2"
											align="start"
										>
											문의 사항
										</v-col>
										<v-col
											class="pa-0 py-2 td"
											cols="9"
											sm="10"
											align="start"
										>
											<span>{{ estimateItems.content }}</span>
										</v-col>
									</v-row>
								</v-col>
							</v-col>
						</div>
					</div>
				</div>
			</v-col>

			<v-col cols="12">
				<div
					class="mt-10 mb-10 d-flex justify-center"
					align="center"
				>
					<CommonButtonsButton02
						v-if="listType === 'user'"
						name="삭제"
						class-name="btn_large mr-1"
						color="#a0a1a5"
						@click="confirmRemove = true"
					/>
					<CommonButtonsButton02
						v-if="listType === 'user'"
						name="목록"
						class-name="btn_large ml-1"
						color="#262626"
						outlined
						@click="$router.go(-1)"
					/>
					<CommonButtonsButton02
						v-if="listType === 'guest'"
						name="닫기"
						class-name="btn_large ml-1"
						color="#262626"
						outlined
						@click="$emit('back')"
					/>
				</div>
			</v-col>

			<CommonConfirm
				:dialog="confirmRemove"
				:title="`견적상담 내용 삭제`"
				:text="`선택하신 견적상담 내용이 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
				@close="confirmRemove = false"
				@submit="removeData"
			/>
		</v-container>
	</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserEstimateDetail',
	mixins: [common],
	props: {
		listType: {
			type: String,
			default: 'user',
		},
		userData: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		confirmRemove: false,
		addQuestionModel: [],
		addQuestionItems: [],
		interiorItems: [],
		estimateItems: {},
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'USER_GET_ESTIMATE_SELECT']),
	},
	async created() {
		if (this.listType === 'user') {
			if (Object.keys(this.USER_GET_ESTIMATE_SELECT).length === 0) this.$router.go(-1)
			await this.getData()
		} else {
			if (Object.keys(this.userData).length !== 0) {
				this.parseInteriorItems(this.userData)
				this.estimateItems = this.userData
			}
		}
		// 시공 추가문의 항목
		await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '601' }).then(res => {
			// 기타 마지막으로 보내기
			let etc = res[0]
			res.shift()
			res.push(etc)
			this.addQuestionItems = res
		})
	},
	mounted() {
		console.log('interiorItems', this.interiorItems)
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['USER_ACT_ESTIMATE', 'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS']),
		async getData() {
			await this.USER_ACT_ESTIMATE({
				method: 'detail',
				query: this.USER_GET_ESTIMATE_SELECT.consult_id,
			}).then(res => {
				this.estimateItems = res[0]
				this.parseInteriorItems(this.estimateItems)
			})
		},
		parseInteriorItems(data) {
			for (let i = 0; i < 3; i++) {
				const num = i + 1
				if (data[`corp_card_list${num}`]) this.interiorItems.push(data[`corp_card_list${num}`])
			}
		},
		async removeData() {
			await this.USER_ACT_ESTIMATE({
				method: 'del',
				params: [{ consult_id: this.USER_GET_ESTIMATE_SELECT.consult_id }],
			}).then(async () => {
				await this.APP_MU_DIALOG({
					dialog: true,
					title: '견적상담 내용 삭제',
					text: '해당 내용을 삭제하였습니다.',
				})
				this.$router.go(-1)
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

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
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
@media all and (min-width: 380px) and (max-width: 768px) {
	h3 {
		font-size: 16px !important;
	}
	.sub_tit {
		h4 {
			font-size: 15px !important;
		}
	}
	.bg_grey {
		padding: 20px 10px !important;
	}
	.register .body .basic_info {
		padding: 15px !important;
	}
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
@media all and (max-width: 380px) {
	h3 {
		font-size: 16px !important;
	}
	.sub_tit {
		h4 {
			font-size: 15px !important;
		}
	}
	.bg_grey {
		padding: 20px 10px !important;
	}
	.register .body .basic_info {
		padding: 15px !important;
	}
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
