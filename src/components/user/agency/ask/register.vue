<template>
	<div class="inner_wrapper">
		<div class="register">
			<HomeCustomItemRegisterTitle
				:title="title"
				:text="`${title} 입니다. 궁금한 점을 등록하시면 답변해 드립니다.`"
			/>
			<div class="body">
				<!-- 기본정보 -->
				<div class="basic_info pt-5 pt-md-8 pb-5 pb-md-8">
					<v-col class="pa-0 desc">
						<HomeCustomItemRegisterBasicTitle />
					</v-col>
					<v-col
						cols="12"
						class="table mt-md-8 mb-md-8 pa-0 mb-5 mt-0"
					>
						<HomeCustomItemRegisterBasicInfo
							title="이름"
							:text="AUTH_GET_USER.name"
						/>
						<HomeCustomItemRegisterBasicInfo
							title="휴대폰"
							:text="common_number_filter(AUTH_GET_USER.hand)"
						/>
						<HomeCustomItemRegisterBasicInfo
							title="이메일"
							:text="AUTH_GET_USER.emailaddr"
						/>
					</v-col>
				</div>

				<!-- 등록영역 -->
				<div class="input_area pt-5 pt-md-8">
					<v-col
						class="table pa-0"
						cols="12"
					>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">제목</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-col
									cols="12"
									class="pa-0"
								>
									<CommonInputsInput03
										v-model="askTitle"
										placeholder="제목을 입력해 주세요"
									/>
								</v-col>
							</v-col>
						</v-row>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">문의 내용</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-col class="pa-0">
									<v-textarea
										v-model="askContents"
										outlined
										hide-details
										placeholder="내용을 입력해주세요"
									/>
								</v-col>
							</v-col>
						</v-row>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								첨부파일
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0">
									<CommonInputsInputFile01
										v-model="uploadFile"
										placeholder="jpg / png / gif 이미지 * 파일제한: 3MB 이하 첨부 가능"
									/>
								</v-row>
							</v-col>
						</v-row>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">개인정보 처리약관</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<div class="btn_privacy">
									<div>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="개인정보 이용에 동의"
											class="pa-0 ma-0 pr-5"
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
						</v-row>
					</v-col>
				</div>

				<div
					class="my-7 d-flex justify-center"
					align="center"
				>
					<CommonButtonsButton02
						name="취소"
						class-name="btn_basic"
						color="#9fa1a4"
						class="mr-1"
						@click="cancelRegister"
					/>
					<CommonButtonsButton02
						name="완료"
						class-name="btn_basic"
						color="#00582c"
						class="ml-1"
						:disabled="!registerCheck"
						@click="apiCallRegister"
					/>
				</div>
			</div>
		</div>
		<CommonConfirm
			:dialog="confirm"
			:title="'정보 확인'"
			:text="`지금 이페이지를 나가시면 작성하신 데이터가 모두 삭제 됩니다. <br/> 그래도 나가시겠습니까?`"
			@close="confirm = false"
			@submit="confirmSubmit"
		/>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'UserAgencyAskRegister',
	mixins: [common],
	data: () => ({
		askTitle: null,
		askContents: null,
		uploadFile: null,
		privateTermsCheck: false,
		confirm: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER', 'AGENCY_GET_ASK_SELECT']),
		registerCheck() {
			const checkList = ['askTitle', 'askContents', 'privateTermsCheck']

			for (let i of checkList) {
				if (this[i] === null || this[i]?.length === 0 || this[i] === false) return false
			}
			return true
		},
		title() {
			return `인테리어점 문의 ${this.getQuery === 'modify' ? '수정' : '등록'}`
		},
		getQuery() {
			return this.$route.query.type
		},
	},
	watch: {},
	async created() {
		// 수정
		if (this.getQuery === 'modify') this.startDataMapping()
	},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['AGENCY_ACT_ASK']),
		startDataMapping() {
			console.log('AGENCY_GET_ASK_SELECT', this.AGENCY_GET_ASK_SELECT)
			this.askTitle = this.AGENCY_GET_ASK_SELECT.title || ''
			this.askContents = this.AGENCY_GET_ASK_SELECT.contents || ''
			this.uploadFile = this.AGENCY_GET_ASK_SELECT.file_url || null
		},
		cancelRegister() {
			this.registerCheck ? (this.confirm = true) : this.$router.go(-1)
		},
		confirmSubmit() {
			this.confirm = false
			this.$router.go(-1)
		},
		async apiCallRegister() {
			this.loading = true
			let items = {
				method: this.getQuery === 'modify' ? 'put' : 'post',
				params: {
					title: this.askTitle || '',
					contents: this.askContents || '',
				},
			}

			if (this.uploadFile !== null || this.uploadFile?.length > 0) items.params.fileurl = this.uploadFile

			if (this.getQuery === 'modify') {
				items.params.service_id = this.AGENCY_GET_ASK_SELECT.service_id

				// 첨부파일 추가
				if (this.AGENCY_GET_ASK_SELECT.file_url?.length === 0 && this.uploadFile !== null) {
					items.params.fileurl = this.uploadFile
				}

				// 첨부파일 삭제
				if (this.AGENCY_GET_ASK_SELECT.file_url?.length !== 0 && this.uploadFile === null) {
					items.params.file_url = this.AGENCY_GET_ASK_SELECT.file_url
				}

				// 첨부파일 수정
				if (
					this.AGENCY_GET_ASK_SELECT.file_url?.length !== 0 &&
					this.uploadFile !== null &&
					this.AGENCY_GET_ASK_SELECT.file_url !== this.uploadFile
				) {
					items.params.file_url = this.AGENCY_GET_ASK_SELECT.file_url
					items.params.fileurl = this.uploadFile
				}
			} else {
				if (this.uploadFile !== null || this.uploadFile?.length > 0) {
					items.params.fileurl = this.uploadFile
				}
			}

			console.log('AGENCY_ACT_ASK', items)

			this.AGENCY_ACT_ASK(items)
				.then(async res => {
					this.loading = false
					if (res) {
						await this.APP_MU_DIALOG({
							dialog: true,
							title: this.title,
							text: `${this.title}이 완료되었습니다.`,
						})
						await this.$router.push('/user?tab=3').catch(() => {})
					}
				})
				.catch(err => {
					console.error('USER_ACT_QUESTION_post', err)
					this.loading = false
				})
		},
	},
}
</script>

<style scoped lang="scss">
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
