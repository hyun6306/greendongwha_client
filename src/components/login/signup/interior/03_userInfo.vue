<template>
	<div>
		<v-col
			cols="12"
			class="pa-0"
		>
			<div class="form">
				<p align="start">담당자 이름</p>
				<CommonInputsInput02
					v-model="name"
					placeholder="이름을 입력해 주세요"
				/>

				<p
					class="mb-1"
					align="start"
				>
					이메일 주소(회원 ID로 사용)
				</p>
				<v-row class="ma-0 mb-5">
					<v-col
						class="pa-0"
						cols="8"
					>
						<div class="pr-1">
							<CommonInputsInput04
								v-model="email"
								rule-name="email"
								placeholder="이메일 주소를 입력해주세요.(abc@dongwha.com)"
							/>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="4"
					>
						<div class="pl-1">
							<CommonButtonsButton01
								:disabled="email === null"
								name="중복체크"
								:color="idCheck ? 'primary' : '#5f6062'"
								class-name="regular font_12 edge5"
								height="40"
								@click="checkId"
							/>
						</div>
					</v-col>
					<v-col
						cols="12"
						class="pa-0 pt-2 pr-1"
						align="end"
					>
						<p v-if="idCheck">사용가능한 아이디 입니다.</p>
					</v-col>
				</v-row>

				<p
					class="mb-1"
					align="start"
				>
					휴대폰 번호
				</p>
				<v-row class="ma-0 mb-5">
					<v-col
						class="pa-0"
						cols="8"
					>
						<div class="pr-1">
							<CommonInputsInput04
								v-model="hand"
								rule-name="tel"
								placeholder="‘-’ 없이 숫자만 입력해주세요."
							/>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="4"
					>
						<div class="pl-1">
							<CommonButtonsButton01
								:disabled="hand === null"
								name="인증번호 발송"
								:color="smsNumberCheck ? 'primary' : '#5f6062'"
								class-name="regular font_12 edge5"
								height="40"
								@click="checkSms"
							/>
						</div>
					</v-col>
					<v-col
						cols="12"
						class="pa-0 pt-2 pr-1"
						align="end"
					>
						<p v-if="smsNumberCheck">인증되었습니다.</p>
					</v-col>
					<CommonLoaderLine01 v-if="telLoading" />
				</v-row>

				<div v-if="smsNumberModel">
					<p
						class="mb-1"
						align="start"
					>
						인증번호
					</p>
					<v-row class="ma-0">
						<v-col
							class="pa-0"
							cols="8"
						>
							<div class="pr-1">
								<CommonInputsInput02
									v-model="smsNum"
									placeholder="인증번호를 입력해주세요."
								/>
							</div>
						</v-col>
						<v-col
							class="pa-0"
							cols="4"
						>
							<div class="pl-1">
								<CommonButtonsButton01
									name="인증 확인"
									color="#42883d"
									class-name="regular font_12 edge5"
									height="40"
									@click="confirmSmsNumber"
								/>
							</div>
							<v-col
								cols="12"
								class="pa-0 pt-2 pr-1 pb-3"
								align="end"
							>
								{{ sms_check_timer }}
							</v-col>
						</v-col>
					</v-row>
				</div>

				<p
					class="mb-1"
					align="start"
				>
					비밀번호
				</p>
				<CommonInputsInput02
					v-model="password"
					type="password"
					rule-name="password"
					placeholder="8~12(영문,숫자,특수문자 조합)로 입력해주세요."
				/>

				<p
					class="mb-1"
					align="start"
				>
					비밀번호 확인
				</p>
				<CommonInputsInput02
					v-model="passwordConfirm"
					type="password"
					placeholder="비밀번호를 다시 입력해 주세요."
					:password-value="passwordCheck"
				/>
			</div>
		</v-col>

		<v-divider class="mt-5" />

		<v-col class="pa-0">
			<p class="notice mt-5 mb-10">
				입력된 휴대폰 번호는 A/S 및 1:1문의에 대한<br />
				진행 현황을 알림톡으로 안내하는 용도로 사용 되며,<br />
				자세한 사항은 <span>개인정보처리방침</span> 내용을 확인 부탁 드립니다.
			</p>
		</v-col>

		<v-col class="pa-0">
			<CommonButtonsButton01
				name="가입하기"
				color="#00582c"
				height="50"
				class-name="bold font_16"
				:disabled="allowValue"
				rounded
				@click="saveUserInfo"
			/>
			<CommonButtonsButton02
				name="로그인 페이지로 이동 >"
				height="50"
				class-name="btn_more mt-3"
				color="#222"
				text
				@click="$router.push('/login')"
			/>
		</v-col>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import model from '@/mixins/model'
import sms from '@/mixins/sms'

export default {
	name: 'LoginSignupInteriorUserInfo03',
	mixins: [model, sms],
	data: () => ({
		name: null,
		email: null,
		hand: null,
		smsNum: null,
		password: null,
		idCheck: null,
		passwordConfirm: null,
		// sms
		smsNumberCheck: null,
		smsNumberModel: false,
		smsCheckId: null,
		telLoading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_EVENT_INFO', 'AUTH_GET_SIGNUP_INTERIOR_INFO']),
		allowValue() {
			let check = false
			const checkValue = ['name', 'email', 'hand', 'password', 'idCheck', 'smsNumberCheck', 'passwordCheck']

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) check = true
			}

			return check
		},
		passwordCheck() {
			let val = false
			if ((this.password?.length >= 8 && this.password?.length <= 12) || this.passwordConfirm?.length >= 8) {
				val = this.password === this.passwordConfirm ? true : false
			}
			return val
		},
	},
	watch: {
		email(val) {
			if (val === null) this.idCheck = null
		},
		sms_check_timer(val) {
			if (val === '00:00') {
				this.smsNumberCheck = null
				this.smsNumberModel = false
			}
		},
	},
	mounted() {},
	methods: {
		...mapActions(['AUTH_ACT_SIGN_UP_CHECK', 'AUTH_ACT_SIGN_UP']),
		async checkId() {
			this.idCheck = false
			const params = {
				login_id: this.email,
			}

			const items = { method: 'user_id', params: params }
			await this.AUTH_ACT_SIGN_UP_CHECK(items).then(res => {
				if (res) this.idCheck = true
				if (res == undefined || res == null) {
					this.$toastr.error('이미 사용중인 ID입니다.', 'ID 중복 오류', { timeOut: 2500 })
				}
			})
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
		async saveUserInfo() {
			const params = {
				// 기본정보
				business_name: this.AUTH_GET_SIGNUP_INTERIOR_INFO.business_name,
				corporate_no: this.AUTH_GET_SIGNUP_INTERIOR_INFO.corporate_no,
				boss_name: this.AUTH_GET_SIGNUP_INTERIOR_INFO.boss_name,
				corporate: this.AUTH_GET_SIGNUP_INTERIOR_INFO.corporate,
				company_tel: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_tel,
				company_zipcode: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_zipcode,
				company_addr1: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_addr1,
				company_addr2: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_addr2,
				latitude: this.AUTH_GET_SIGNUP_INTERIOR_INFO.latitude,
				longitude: this.AUTH_GET_SIGNUP_INTERIOR_INFO.longitude,
				company_estdate: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_estdate,
				buildtype: this.AUTH_GET_SIGNUP_INTERIOR_INFO.buildtype,
				homepage_url: this.AUTH_GET_SIGNUP_INTERIOR_INFO.homepage_url,
				company_snscode1: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_snscode1,
				company_snscode2: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_snscode2,
				company_snscode3: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_snscode3,
				company_snscode4: this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_snscode4,

				// 담당자 정보
				login_id: this.email,
				password: this.password,
				manager_name: this.name,
				manager_hand: this.hand,

				// event 수신 동의
				email_yn: this.AUTH_GET_EVENT_INFO.email ? 'Y' : 'N',
				sms_yn: this.AUTH_GET_EVENT_INFO.sms ? 'Y' : 'N',
			}

			if (this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_logo)
				params.company_logo = this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_logo
			if (this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_pic)
				params.company_pic = this.AUTH_GET_SIGNUP_INTERIOR_INFO.company_pic

			const items = { method: 'interior', params: params }
			console.log('params', items)

			await this.AUTH_ACT_SIGN_UP(items).then(res => {
				console.log('AUTH_ACT_SIGN_UP', res)
				if (res != null) this.model = 3
			})
		},
	},
}
</script>

<style scoped lang="scss">
.notice {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 12px !important;
	color: #5f6062 !important;
	word-break: keep-all;
	span {
		font-weight: 600;
		color: #262626;
		border-bottom: 1px solid #262626;
	}
}
</style>
