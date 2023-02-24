<template>
	<div class="wrapper">
		<v-container
			class="pa-0 px-5"
			fluid
		>
			<v-col
				cols="12"
				align="center"
				class="login layout_align pa-0"
			>
				<v-col
					cols="12"
					align="center"
					class="pa-0"
				>
					<div class="content_title">
						<div
							v-if="getQuery === '0'"
							class="mb-3"
						>
							일반 회원
						</div>
						<div
							v-if="getQuery === '1'"
							class="mb-3"
						>
							인테리어 회원
						</div>
						아이디/비밀번호 찾기
					</div>
				</v-col>

				<v-col
					cols="12"
					class="pa-0"
				>
					<!-- 아이디찾기 or 비밀번호찾기 선택 -->
					<v-col
						cols="12"
						class="pa-0"
					>
						<CommonTabsTabLogin
							v-model="tab"
							:tab-items="tabItems"
							class="mb-6"
						/>
					</v-col>

					<v-col
						cols="12"
						class="pa-0"
					>
						<v-tabs-items v-model="tab">
							<!-- 찾기(아이디) -->
							<v-tab-item>
								<p class="mb-5 notice">
									가입 시 입력했던 이름과 휴대폰 번호를 입력해 주세요.<br />
									정보를 입력하면 이메일(아이디)을 알려드립니다.
								</p>
								<CommonInputsInput05
									v-model="name"
									class="mb-4"
									label="이름"
									placeholder="이름 입력"
								/>
								<v-row class="ma-0">
									<v-col
										cols="8"
										class="pa-0 pr-1"
									>
										<CommonInputsInput05
											v-model="hand"
											label="휴대폰번호"
											placeholder="휴대폰 번호 입력 (-없이 숫자만 입력해주세요)"
										/>
									</v-col>
									<v-col
										cols="4"
										class="pa-0"
									>
										<CommonButtonsButton01
											:disabled="hand === null"
											name="인증번호 발송"
											:color="smsNumberCheck ? 'primary' : '#5f6062'"
											class-name="regular font_12 edge5 font_white"
											height="48"
											@click="checkSms"
										/>
										<p v-if="smsNumberCheck">인증되었습니다.</p>
									</v-col>
									<CommonLoaderLine01
										v-if="telLoading"
										class="mb-3"
									/>
								</v-row>

								<div
									v-if="smsNumberModel"
									class="mt-4"
								>
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
													class-name="regular font_12 edge5 font_white"
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

								<CommonButtonsButton01
									:disabled="allowValue"
									name="이메일(아이디) 찾기"
									color="#00582c"
									height="50"
									class-name="bold font_16 font_white mt-15"
									@click="onApiCallFind('id')"
								/>
							</v-tab-item>

							<!-- 찾기(비밀번호) -->
							<v-tab-item>
								<p class="mb-5 notice">
									가입 시 입력했던 이름과 이메일(아이디)을 입력해 주세요.<br />
									정보를 입력하면 비밀번호를 알려드립니다.
								</p>
								<CommonInputsInput05
									v-model="name"
									label="이름"
									placeholder="이름 입력"
									class="mb-4"
								/>
								<CommonInputsInput05
									v-model="email"
									label="이메일"
									placeholder="이메일(아이디) 입력"
									class="mb-4"
								/>
								<v-row class="ma-0">
									<v-col
										cols="8"
										class="pa-0 pr-1"
									>
										<CommonInputsInput05
											v-model="hand"
											label="휴대폰번호"
											placeholder="휴대폰 번호 입력 (-없이 숫자만 입력해주세요)"
										/>
									</v-col>
									<v-col
										cols="4"
										class="pa-0"
									>
										<CommonButtonsButton01
											:disabled="hand === null"
											name="인증번호 발송"
											:color="smsNumberCheck ? 'primary' : '#5f6062'"
											class-name="regular font_12 edge5 font_white"
											height="48"
											@click="checkSms"
										/>
										<p v-if="smsNumberCheck">인증되었습니다.</p>
									</v-col>
									<CommonLoaderLine01
										v-if="telLoading"
										class="mb-3"
									/>
								</v-row>
								<div
									v-if="smsNumberModel"
									class="mt-4"
								>
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
													class-name="regular font_12 edge5 font_white"
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
								<CommonButtonsButton01
									:disabled="allowValue"
									name="비밀번호 찾기"
									color="#00582c"
									height="50"
									class-name="bold font_16 font_white mt-15"
									@click="onApiCallFind('password')"
								/>
							</v-tab-item>
						</v-tabs-items>
					</v-col>
				</v-col>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import sms from '@/mixins/sms'

export default {
	name: 'LoginFindMember',
	metaInfo: {
		title: '아이디/비밀번호 찾기 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '아이디/비밀번호 찾기 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 아이디/비밀번호 찾기',
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [sms],
	data: () => ({
		tab: 0,
		tabItems: [
			{
				name: '아이디 찾기',
			},
			{
				name: '비밀번호 찾기',
			},
		],
		checkbox: false,
		name: null,
		hand: null,
		email: null,
		smsNum: null,
		// sms
		smsNumberCheck: null,
		smsNumberModel: false,
		telLoading: false,
	}),
	computed: {
		getQuery() {
			return this.$route.params.id
		},
		allowValue() {
			let checkValue = []

			if (this.tab === 0) {
				checkValue = ['name', 'hand', 'smsNumberCheck']
			} else {
				checkValue = ['name', 'hand', 'email', 'smsNumberCheck']
			}

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) return true
			}

			return false
		},
	},
	watch: {
		hand(val) {
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
		...mapActions(['AUTH_ACT_FIND_INFO']),
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
		async onApiCallFind(type) {
			let params = {}

			if (type === 'id') {
				params = {
					member_kind: this.getQuery === '0' ? 1 : 3,
					name: this.name,
					hand: this.hand,
				}
			} else {
				params = {
					member_kind: this.getQuery === '0' ? 1 : 3,
					name: this.name,
					login_id: this.email,
					regi_userid: this.email,
					hand: this.hand,
				}
			}

			const items = { method: type, params: params }

			await this.AUTH_ACT_FIND_INFO(items).then(res => {
				console.log('res', res)
				if (res) {
					if (type === 'id') return this.$router.replace('/login/answer_id').catch(() => {})
					this.$router.replace('/login/answer_password').catch(() => {})
				} else {
					this.$toastr.error(
						'요청하신 정보와 일치한 회원 정보를 찾을 수 없습니다. 다시 한번 확인해 주시기 바랍니다',
						'회원정보 찾기 오류',
						{ timeOut: 2500 },
					)
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	max-width: 340px !important;
}
.notice {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 12px !important;
	color: #5f6061 !important;
	word-break: keep-all;
}
</style>
