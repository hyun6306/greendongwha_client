<template>
	<div class="user_inner_wrapper px-5">
		<v-row class="ma-0 py-3 mb-5 history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>개인회원정보</v-col
			>
		</v-row>

		<!-- 개인 정보수정 -->
		<div class="register mb-10">
			<div class="body">
				<div class="input_area">
					<v-col
						class="pa-0 table"
						cols="12"
					>
						<v-row class="ma-0 mb-4 py-1">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>아이디(이메일)</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
								>{{ AUTH_GET_USER.login_id }}</v-col
							>
						</v-row>

						<v-row class="ma-0 mb-4 py-1">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>이름</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								{{ AUTH_GET_USER.name }}
							</v-col>
						</v-row>

						<v-row
							class="ma-0 mb-3"
							align="center"
						>
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>이메일</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="emailaddr"
									type="email"
									rule-name="email"
									placeholder="abc123@naver.com"
									class="mb-1"
								/>
							</v-col>
						</v-row>

						<div v-if="AUTH_GET_USER.sns_kind === '0'">
							<v-row
								class="ma-0 mb-3"
								align="center"
							>
								<v-col
									class="pa-0 pb-1 pb-md-0 th"
									cols="12"
									md="4"
									align="start"
								>
									<p class="required">비밀번호</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									md="8"
									align="start"
								>
									<CommonInputsInput04
										v-model="password"
										type="password"
										rule-name="password"
										placeholder="8~12(영문,숫자,특수문자 조합)로 입력해주세요."
										class="mb-1"
									/>
								</v-col>
							</v-row>

							<v-row
								class="ma-0 mb-3"
								align="center"
							>
								<v-col
									class="pa-0 pb-1 pb-md-0 th"
									cols="12"
									md="4"
									align="start"
								>
									<p class="required">비밀번호 확인</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									md="8"
									align="start"
								>
									<CommonInputsInput04
										v-model="passwordConfirm"
										type="password"
										rule-name="password"
										placeholder="비밀번호를 다시 입력해주세요."
										class="mb-1"
									/>
								</v-col>
							</v-row>
						</div>

						<v-row class="ma-0">
							<v-col
								class="pa-0 th mt-2"
								cols="12"
								md="4"
								align="start"
							>
								<p class="required">휴대폰번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="8"
									>
										<CommonInputsInput03
											v-model="hand"
											placeholder="-없이 숫자만 입력해주세요"
										/>
									</v-col>
									<v-col
										class="pa-0 pl-1"
										cols="4"
									>
										<CommonButtonsButton01
											name="인증번호 발송"
											:disabled="hand === null"
											:color="smsNumberCheck ? 'primary' : '#5f6062'"
											class-name="regular font_12 edge5"
											height="40"
											@click="checkSms"
										/>
									</v-col>
								</v-row>
								<v-col
									cols="12"
									class="pa-0 pt-2 pr-1"
									align="end"
								>
									<p v-if="smsNumberCheck">인증되었습니다.</p>
								</v-col>
								<CommonLoaderLine01 v-if="telLoading" />
							</v-col>
						</v-row>

						<v-row
							v-if="smsNumberModel"
							class="ma-0 mb-4"
							align="center"
						>
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p class="required">인증번호</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row class="ma-0">
									<v-col
										class="pa-0"
										cols="8"
									>
										<CommonInputsInput04
											v-model="smsNum"
											type="number"
											placeholder="인증번호를 입력"
										/>
									</v-col>
									<v-col
										class="pa-0 pl-1"
										cols="4"
									>
										<CommonButtonsButton01
											name="인증번호 확인"
											color="#00582c"
											class-name="regular font_12 edge5"
											height="40"
											@click="confirmSmsNumber"
										/>
									</v-col>
								</v-row>
							</v-col>
							<v-col
								cols="12"
								class="pa-0 pt-2 pr-1 pb-3"
								align="end"
							>
								{{ sms_check_timer }}
							</v-col>
						</v-row>
					</v-col>
					<v-col>
						<p v-if="AUTH_GET_USER.sns_kind === '0'">
							*비밀번호 or 휴대폰 번호를 변경하기 위해 휴대폰으로 발송된 인증번호를 입력해주세요.
						</p>
						<div v-else>
							<p>*휴대폰 번호를 변경하기 위해 휴대폰으로 발송된 인증번호를 입력해주세요.</p>
							<p>*SNS 회원의 경우 비밀번호 변경은 지원되지 않습니다.</p>
						</div>
					</v-col>
				</div>
			</div>
		</div>

		<v-row class="ma-0 py-3 mb-5 history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
			>
				마케팅 수신동의<span class="required_color">*</span>
			</v-col>
		</v-row>

		<!-- 마케팅 수신동의 -->
		<div class="register mb-10">
			<div class="body">
				<div class="input_area">
					<v-col
						class="pa-0 table"
						cols="12"
					>
						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>이메일 수신여부</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row class="ma-0">
									<CommonRadiosRadio01 v-model="email_yn" />
								</v-row>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>SNS 수신여부</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row class="ma-0">
									<CommonRadiosRadio01 v-model="sms_yn" />
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</div>
			</div>
		</div>

		<div
			class="d-flex justify-center pt-5"
			align="center"
		>
			<CommonButtonsButton02
				name="취소"
				class-name="btn_basic"
				color="#a0a1a5"
				class="mr-1"
				to="/user"
			/>
			<CommonButtonsButton02
				:disabled="allowValue"
				name="회원정보 수정"
				class-name="btn_basic"
				color="#42883d"
				class="ml-1 mr-1"
				@click="onApiCallItem"
			/>
		</div>

		<div
			class="d-flex justify-center pt-5 mb-10"
			align="center"
		>
			<v-btn
				elevation="0"
				color="#c8c8c8"
				class="ml-1"
				text
				dark
				@click="secessionModel = true"
			>
				회원탈퇴
			</v-btn>
		</div>

		<UserUserModifySecessionDialog
			:dialog="secessionModel"
			:type="'user'"
			@close="secessionModel = false"
		/>

		<!--         <v-row class="ma-0 py-3 mb-5 history_bar">
                    <v-col class="pa-0 tit" cols="auto" align="start" align-self="center">계정 연동 여부</v-col>
                </v-row>
               <div class="sns_join mb-10">
                    <v-col class="pa-0 mb-1">
                        <v-row class="ma-0 mb-2 kakao">
                            <v-col class="pa-0" cols="2">
                                <v-img
                                    width="42"
                                    height="42"
                                    :src="require('@/assets/img/login/icon_kakao.png')"/>
                            </v-col>
                            <v-col class="pa-0" cols="7" align="start" align-self="center">qkrtjdduf111@naver.com 계정으로 연동중입니다.</v-col>
                            <v-col class="pa-0 tar" cols="2">
                                <CommonButtonsButton01
                                    name="연결해제"
                                    color="primary"
                                    className="regular font_12 edge5"
                                    height="35"
                                />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="pa-0 mb-1">
                        <v-row class="ma-0 mb-2 naver">
                            <v-col class="pa-0" cols="2">
                                <v-img
                                    width="42"
                                    height="42"
                                    :src="require('@/assets/img/login/icon_naver.png')"/>
                            </v-col>
                            <v-col class="pa-0" cols="7" align="start" align-self="center">연결중인 계정이 없습니다.</v-col>
                            <v-col class="pa-0" cols="2">
                                <CommonButtonsButton01
                                    name="계정연결"
                                    color="primary"
                                    className="regular font_12 edge5"
                                    height="35"
                                />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="pa-0 mb-1">
                        <v-row class="ma-0 mb-2 google">
                            <v-col class="pa-0" cols="2">
                                <v-img
                                    width="42"
                                    height="42"
                                    :src="require('@/assets/img/login/icon_google.png')"/>
                            </v-col>
                            <v-col class="pa-0" cols="7" align="start" align-self="center">연결중인 계정이 없습니다.</v-col>
                            <v-col class="pa-0" cols="2">
                                <CommonButtonsButton01
                                    name="계정연결"
                                    color="primary"
                                    className="regular font_12 edge5"
                                    height="35"
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                </div>-->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import sms from '@/mixins/sms'

export default {
	name: 'UserModifyUser',
	mixins: [sms, common],
	data: () => ({
		emailaddr: null,
		password: null,
		email_yn: 'N',
		sms_yn: 'N',
		hand: null,

		passwordConfirm: null,
		// sms
		smsNum: null,
		smsNumberCheck: null,
		smsNumberModel: false,
		telLoading: false,
		// secession
		secessionModel: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		allowValue() {
			let check = false
			let checkValue = []
			if (this.AUTH_GET_USER.sns_kind === '0') {
				// 일반계정
				checkValue = ['password', 'smsNumberCheck', 'passwordCheck']
			} else {
				// sns
				checkValue = ['smsNumberCheck']
			}

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) return true
			}

			return check
		},
		passwordCheck() {
			let val = false
			if ((this.password?.length >= 8 && this.password?.length <= 12) || this.passwordConfirm?.length >= 8) {
				val = this.password === this.passwordConfirm
			}
			return val
		},
	},
	watch: {
		sms_check_timer(val) {
			if (val === '00:00') {
				this.smsNumberCheck = null
				this.smsNumberModel = false
			}
		},
	},
	mounted() {
		this.startMapping()
	},
	methods: {
		...mapActions(['USER_ACT_USER_INFO_MODIFY']),
		startMapping() {
			this.emailaddr = this.AUTH_GET_USER.emailaddr
			this.email_yn = this.AUTH_GET_USER.email_yn
			this.sms_yn = this.AUTH_GET_USER.sms_yn
			this.hand = this.common_dateFilter(this.AUTH_GET_USER.hand)
		},
		async checkSms() {
			this.telLoading = true
			const check = await this.sms_call(this.hand)
			if (check) {
				this.telLoading = false
				this.smsNumberModel = true
			}
		},
		async confirmSmsNumber() {
			const check = await this.sms_call_check(this.hand, this.smsNum)
			if (check) {
				this.smsNumberCheck = true
				this.smsNumberModel = false
			}
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				password: this.password,
			}

			// 추가 이메일
			if (this.AUTH_GET_USER.emailaddr !== this.emailaddr) params.emailaddr = this.emailaddr
			// 전화번호
			if (this.AUTH_GET_USER.hand !== this.hand) params.hand = this.hand
			// 이메일 수신여부
			if (this.AUTH_GET_USER.email_yn !== this.email_yn) params.email_yn = this.email_yn
			// sms 수신여부
			if (this.AUTH_GET_USER.sms_yn !== this.sms_yn) params.sms_yn = this.sms_yn

			console.log('parmas', params)

			const items = { method: 'user', params: params }

			await this.USER_ACT_USER_INFO_MODIFY(items).then(res => {
				if (res) {
					this.loading = false
					this.$toastr.info('회원정보가 수정되어었습니다.', '회원정보 수정', { timeOut: 2500 })
					this.$router.push(`/user`).catch(() => {})
				} else {
					this.$toastr.error('회원정보에 문제가 생겼습니다.', '회원정보 오류', { timeOut: 2500 })
					this.loading = false
				}
			})
		},
	},
}
</script>

<style scoped lang="scss">
.user_inner_wrapper {
	max-width: 600px !important;
}
.required_color {
	color: #fa2a6f;
}
</style>
