<template>
	<div class="wrapper">
		<v-container
			class="pa-0 pt-5 pt-md-15 pb-3"
			fluid
		>
			<v-col
				class="inner pa-0"
				cols="12"
				md="10"
				align="center"
			>
				<v-row
					v-if="confirmNoUserData"
					class="ma-0"
					justify="center"
				>
					<v-col cols="12">
						<p class="mb-4 mb-md-7 tit">견적상담 신청서 확인</p>
						<v-divider class="my-7 my-md-9" />
						<p class="mb-4 mb-md-7 sub_tit">비회원 확인</p>
						<p class="mb-4 mb-md-7 sub_text">
							견적상담의뢰 의뢰 시 입력한 개인정보를 입력하시면 신청 내역을 확인할 수 있습니다.
						</p>
					</v-col>
					<v-col
						cols="12"
						sm="8"
						md="5"
						class="px-0"
					>
						<v-col
							cols="12"
							class="pb-0"
						>
							<CommonInputsInput04
								v-model="name"
								placeholder="이름"
							/>
						</v-col>
						<v-row class="ma-0 mb-1 mb-md-2 pa-3">
							<v-col
								class="pa-0"
								cols="7"
								md="8"
							>
								<div class="pr-1">
									<CommonInputsInput04
										v-model="hand"
										rule-name="tel"
										placeholder="전화번호"
									/>
								</div>
							</v-col>
							<v-col
								class="pa-0"
								cols="5"
								md="4"
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
							<v-row class="ma-0 pa-3 pt-0">
								<v-col
									class="pa-0"
									cols="7"
									md="8"
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
									cols="5"
									md="4"
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
					</v-col>
					<v-col cols="12">
						<v-col
							class="pa-0"
							cols="10"
							md="4"
						>
							<CommonButtonsButton01
								:disabled="allowValue"
								class="btn_consulting"
								name="견적상담 신청서 확인"
								color="#00582c"
								height="62"
								@click="checkNoUserData"
							/>
						</v-col>
					</v-col>
					<v-col
						cols="12"
						class="pt-11"
					>
						<v-col
							class="pa-0"
							cols="4"
							md="2"
						>
							<CommonButtonsButton01
								class="btn_history"
								name="회원이신가요? >"
								color="#ccc"
								height="50"
								outlined
								@click="$router.replace('/login')"
							/>
						</v-col>
					</v-col>
				</v-row>
				<v-row
					v-else
					class="ma-0"
					justify="center"
				>
					<v-col
						cols="12"
						class="pa-0"
					>
						<UserUserEstimateDetail
							list-type="guest"
							:user-data="GUEST_GET_ESTIMATE_DETAIL"
							@back="close"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import common from '@/mixins/common'
import sms from '@/mixins/sms'

export default {
	name: 'HomeInteriorPriceInquireConfirm04',
	mixins: [common, sms],
	data: () => ({
		name: null,
		hand: null,
		smsNum: null,
		// sms
		smsNumberCheck: null,
		smsNumberModel: false,
		smsCheckId: null,
		telLoading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'GUEST_GET_ESTIMATE_DETAIL']),
		allowValue() {
			let check = false
			let checkValue = ['name', 'hand', 'smsNumberCheck']

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) check = true
			}

			return check
		},
		confirmNoUserData() {
			return Object.keys(this.GUEST_GET_ESTIMATE_DETAIL).length === 0
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
	created() {
		if (this.AUTH_GET_USER_AUTH !== 'GUEST') this.$router.push('/user?tab=2').catch(() => {})
	},
	mounted() {},
	destroyed() {},
	methods: {
		...mapMutations(['GUEST_MU_ESTIMATE', 'GUEST_MU_ESTIMATE_DETAIL']),
		...mapActions(['AUTH_ACT_SIGN_UP_CHECK', 'GUEST_ACT_ESTIMATE']),
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
		async checkNoUserData() {
			await this.GUEST_ACT_ESTIMATE({
				method: 'get',
				params: {
					login_name: this.name,
					login_id: this.hand,
				},
			}).catch(e => {
				console.log('checkNoUserData', e)
			})
		},
		close() {
			this.GUEST_MU_ESTIMATE([])
			this.GUEST_MU_ESTIMATE_DETAIL({})
			this.$emit('selectTab', 0)
		},
	},
}
</script>

<style scoped lang="scss">
.inner {
	max-width: 1000px;
	padding: 40px 80px 48px !important;
	margin: 0 auto;
	background-color: $color_white;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	border-radius: 16px;
	.btn_consulting {
		:deep(.v-btn__content) {
			font-size: $font_xl;
			font-weight: $fw_bold;
		}
	}
}
.tit {
	font-size: $font_tit;
}
.btn_history {
	background-color: $color_white !important;
	:deep(.v-btn__content) {
		font-size: $font_lg;
		font-weight: $fw_regular;
		span {
			color: $color_font !important;
		}
	}
}
.sub {
	&_tit {
		font-size: $font__sub_tit;
	}
	&_text {
		font-size: $font_normal;
		color: $color_gray2;
	}
}

@media all and (max-width: 959px) {
	.inner {
		padding: 32px 20px 32px !important;

		.btn_consulting {
			height: 56px !important;

			:deep(.v-btn__content) {
				font-size: $font_lg;
			}
		}
	}

	.btn_history {
		height: 46px !important;

		:deep(.v-btn__content) {
			font-size: $font_normal;
		}
	}
}
</style>
