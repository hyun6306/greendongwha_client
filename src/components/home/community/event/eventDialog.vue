<template>
	<v-dialog
		v-model="dialog"
		persistent
		max-width="760"
	>
		<v-col class="pa-0 py-5 px-3 py-md-10 px-md-7 event_dialog">
			<v-col
				class="pa-0 popup_head"
				width="100%"
				elevation="0"
				tile
			>
				<v-row
					align="center"
					class="ma-0 pb-2"
				>
					<!-- 공통팝업 타이틀 -->
					<v-col
						class="pa-0 pop_title"
						cols="8"
						align="start"
					>
						이벤트 참여하기
					</v-col>

					<!-- 팝업닫기 버튼 -->
					<v-col
						class="pa-0"
						cols="4"
						align="end"
					>
						<v-btn
							icon
							large
							class="pa-0"
							@click="$emit('close')"
						>
							<v-icon
								large
								color="black"
								>clear</v-icon
							>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>

			<v-col
				class="pa-0 py-2 popup_cont"
				cols="12"
				align="center"
			>
				<v-row
					class="ma-0"
					align="center"
					justify="center"
				>
					<!-- event 타이틀 & 날짜 -->
					<v-col
						cols="12"
						align="start"
						class="event_target px-0"
					>
						<p class="title">{{ item.title }}</p>
						<p class="date pt-1">{{ item.date }}</p>
					</v-col>

					<v-col
						class="pa-5 info_zone"
						elevation="0"
					>
						<v-col
							class="pa-0 mb-4 info_title"
							align="start"
						>
							응모자 정보
						</v-col>

						<v-col class="pa-0 input_box">
							<v-row
								class="ma-0 mb-2"
								align="center"
							>
								<v-col
									class="pa-0 input_text mb-1 mb-md-0"
									cols="12"
									md="9"
									align="start"
								>
									이름
								</v-col>
								<v-col
									class="pa-0"
									cols="12"
									md="9"
								>
									<CommonInputsInput03
										v-model="this.AUTH_GET_USER.name"
										readonly
										:height="40"
									/>
								</v-col>
							</v-row>

							<v-row
								class="ma-0 mb-2"
								align="center"
							>
								<v-col
									class="pa-0 input_text mb-1 mb-md-0"
									cols="12"
									md="9"
									align="start"
								>
									휴대폰번호
								</v-col>
								<v-col
									class="pa-0"
									cols="12"
									md="9"
								>
									<CommonInputsInput03
										v-model="this.AUTH_GET_USER.hand"
										readonly
										:height="40"
									/>
								</v-col>
							</v-row>

							<v-row
								v-if="item.message_url_yn === 'Y'"
								class="ma-0"
								align="center"
							>
								<v-col
									class="pa-0 input_text mb-1 mb-md-0"
									cols="12"
									md="9"
									align="start"
								>
									게시글 URL
								</v-col>
								<v-col
									class="pa-0"
									cols="12"
									md="9"
								>
									<CommonInputsInput03
										v-model="models.url"
										placeholder="게시글 URL을 작성해주세요."
										:height="40"
									/>
								</v-col>
							</v-row>
						</v-col>
					</v-col>

					<!-- 유의사항 -->
					<v-col
						class="notice"
						cols="12"
						align="start"
					>
						<p>귀하께서는 본 동의 안내 문구를 숙지하셨으며, 안내문구에 대해 거절하실 수 있습니다.</p>
						<p>단, 거절하신 경우에는 이벤트 응모가 제한되실 수 있습니다.</p>
					</v-col>

					<!-- 개인정보 이용동의 -->
					<v-col
						class="px-0"
						cols="12"
						align="start"
					>
						<div class="btn_privacy">
							<div>
								<CommonCheckboxsCheckbox02
									v-model="models.privateTermsCheck"
									text="이벤트 참여를 위한 개인정보 수집 이용 동의"
									class="pa-0 ma-0"
								/>
							</div>
							<div>
								<v-btn
									text
									@click="common_openPrivate"
									>개인정보처리방침확인</v-btn
								>
							</div>
						</div>
					</v-col>

					<v-col
						class="pa-0"
						cols="12"
					>
						<CommonButtonsButton02
							:disabled="allowValue"
							name="이벤트 응모하기"
							color="#00582c"
							class-name="btn_large mt-5"
							rounded
							@click="actApiCall"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-col>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCommunityEventDialog',
	mixins: [common],
	props: ['item', 'dialog', 'items'],
	data: () => ({
		models: {
			url: null,
			privateTermsCheck: false,
		},
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		allowValue() {
			let check = false
			if (this.item?.message_url_yn === 'Y') {
				if (this.models.url === null) check = true
				if (this.models.privateTermsCheck === false) check = true
			} else {
				if (this.models.privateTermsCheck === false) check = true
			}
			return check
		},
		name() {
			return this.AUTH_GET_USER.name
		},
		tel() {
			return this.AUTH_GET_USER.tel
		},
	},
	watch: {},
	created() {},
	mounted() {
		console.log('AUTH_GET_USER', this.AUTH_GET_USER, this.name, this.tel)
	},
	destroyed() {},
	methods: {
		...mapActions(['HOME_ACT_COMMUNITY_EVENT']),
		async actApiCall() {
			let params = {
				event_id: this.item.event_id,
				login_id: this.AUTH_GET_USER.login_id,
			}
			if (this.item?.message_url_yn === 'Y') params.maessage_url = this.models.url

			const items = { method: 'post', params: params }
			await this.HOME_ACT_COMMUNITY_EVENT(items).then(async res => {
				if (res) {
					this.$emit('submit')
				}
				await this.APP_MU_DIALOG({
					dialog: true,
					title: '이벤트 등록 문제',
					text: '이벤트 등록에 문제가 생겼습니다. 관리자에게 문의하세요.',
				})
				this.$emit('close')
			})
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-dialog) {
	background-color: #fff;
}

// 팝업헤드
.popup_head {
	border-bottom: 2px solid #262626;
	.pop_title {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 1.4rem;
	}
}

// 이벤트컨텐츠
.event_dialog {
	.event_target {
		.title {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 1.6rem;
		}
		.date {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 1rem;
			color: #a0a1a5;
		}
	}

	.info_zone {
		background-color: #f8f8f8;
		border-radius: 10px;
		.info_title {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 18px;
		}
		.input_text {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 12px;
		}
	}

	.notice {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px;
		color: #5f6062;
	}
}

// 개인정보 처리약관
.btn_privacy {
	div {
		float: left;
	}
	div + div {
		margin-left: 30px;
		:deep(.v-btn__content) {
			border-bottom: 1px solid #262626;
		}
		.v-btn:not(.v-btn--round).v-size--default {
			padding: 0 !important;
		}
	}
}
@media all and (max-width: 600px) {
	.btn_privacy {
		* {
			font-size: 12px;
		}
	}
}
</style>
