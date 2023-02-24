<template>
	<v-col class="pa-0 click_inquire_button_ipi">
		<div class="register">
			<div class="body px-1">
				<div class="tac guide_txt">
					<p class="mb-4 mb-md-7 tit">STEP 2 : 신청서 작성</p>
					<p class="sub">인테리어점 상담 진행을 위해 개인정보를 입력 후 추가 문의사항을 적어주세요.</p>
					<p class="sub">*동화자연마루 회원이시라면 로그인후 이용 부탁 드립니다.</p>
				</div>

				<!-- 기본정보 -->
				<div class="basic_info">
					<div class="mt-10 mb-5 pb-2 part">고객정보</div>
					<v-col
						class="pa-0 table"
						cols="12"
					>
						<HomeCustomItemRegisterBasicInfo
							v-if="AUTH_GET_USER.name"
							title="이름"
							:text="AUTH_GET_USER.name"
						/>
						<HomeCustomItemRegisterBasicInfo
							v-if="AUTH_GET_USER.hand"
							title="휴대폰"
							:text="common_number_filter(AUTH_GET_USER.hand)"
						/>
						<HomeCustomItemRegisterBasicInfo
							v-if="AUTH_GET_USER.name"
							title="이메일"
							:text="AUTH_GET_USER.emailaddr"
						/>
						<!-- 로그인 되어 있지 않은경우 본인인증 -->
						<v-row
							v-if="AUTH_GET_USER_AUTH === 'GUEST'"
							class="ma-0 mt-2"
						>
							<v-col
								class="pa-0 pb-3 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">본인인증</p>
							</v-col>

							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-col
									cols="12"
									sm="8"
									md="5"
									class="pa-0"
								>
									<v-col class="pa-0 mb-2">
										<CommonInputsInput04
											v-model="name"
											placeholder="이름"
										/>
									</v-col>
									<v-row class="ma-0 mb-2">
										<v-col
											class="pa-0"
											cols="7"
											sm="8"
											md="7"
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
											sm="4"
											md="5"
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
										<v-row class="ma-0 pt-3">
											<v-col
												class="pa-0"
												cols="7"
												sm="8"
												md="7"
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
												sm="4"
												md="5"
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
							</v-col>
						</v-row>
						<!-- 로그인 되어 있지 않은경우 본인인증 -->

						<v-row class="ma-0 mt-2">
							<v-col
								class="pa-0 pb-3 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0 pa-0">
									<v-col
										class="pa-0 pr-2"
										cols="8"
										md="3"
									>
										<CommonInputsInput03
											v-model="post"
											placeholder="우편번호"
											readonly
											disabled
											class="mb-2"
										/>
									</v-col>
									<v-col
										class="pa-0"
										cols="4"
										md="2"
									>
										<CommonButtonsButton01
											name="주소검색"
											color="#9fa1a4"
											class-name="olive"
											height="40"
											@click="postApi"
										/>
									</v-col>
								</v-row>
								<v-col
									cols="12"
									class="pa-0"
								>
									<CommonInputsInput03
										v-model="addressBasic"
										placeholder="도로명/지번주소"
										readonly
										disabled
										class="mb-2"
									/>
								</v-col>
								<v-col
									cols="12"
									class="pa-0"
								>
									<CommonInputsInput03
										v-model="addressDetail"
										placeholder="상세 주소를 입력해주세요."
									/>
								</v-col>
							</v-col>
						</v-row>
					</v-col>
				</div>

				<!-- 등록영역 -->
				<div class="input_area">
					<div class="mt-10 mb-5 pb-2 part">문의사항</div>
					<v-col
						cols="12"
						class="pa-0 table"
					>
						<div class="mb-5">
							<v-row
								v-if="selectInteriorList"
								class="ma-0 mb-6"
							>
								<v-col
									class="pa-0 th"
									cols="12"
									sm="3"
									lg="2"
									align="start"
									align-self="start"
								>
									<p>상담인테리어점</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									sm="9"
									lg="10"
									align="start"
									align-self="start"
								>
									{{ selectInteriorList }}
								</v-col>
							</v-row>

							<v-row
								v-if="selectContents"
								class="ma-0 mb-6"
							>
								<v-col
									class="pa-0 th"
									cols="12"
									sm="3"
									lg="2"
									align="start"
									align-self="start"
								>
									<p>상담콘텐츠</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									sm="9"
									lg="10"
									align="start"
									align-self="start"
								>
									{{ selectContents }}
								</v-col>
							</v-row>

							<v-row
								v-if="selectProductName"
								class="ma-0 mb-6"
							>
								<v-col
									class="pa-0 th"
									cols="12"
									sm="3"
									lg="2"
									align="start"
									align-self="start"
								>
									<p>상담제품</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									sm="9"
									lg="10"
									align="start"
									align-self="start"
								>
									{{ selectProductName }}
								</v-col>
							</v-row>

							<v-row class="ma-0 mb-6">
								<v-col
									class="pa-0 mb-3 mb-lg-0 th"
									cols="12"
									lg="2"
									align="start"
								>
									<p>시공범위</p>
									<span>(*중복가능)</span>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									lg="10"
									align="start"
								>
									<CommonButtonsToggleButton03
										v-if="addQuestionItems.length"
										v-model="addQuestionModel"
										:items="addQuestionItems"
									/>
								</v-col>
							</v-row>

							<v-row class="ma-0 mb-6">
								<v-col
									class="pa-0 mb-3 mb-lg-0 th"
									cols="12"
									lg="2"
									align="start"
								>
									<p>문의 사항</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									lg="10"
									align="start"
								>
									<v-col class="pa-0">
										<v-textarea
											v-model="askContents"
											outlined
											hide-details
											placeholder="추가 문의사항을 작성해주세요"
										/>
									</v-col>
								</v-col>
							</v-row>

							<v-row class="ma-0">
								<v-col
									class="pa-0 mb-1 th"
									cols="12"
									lg="2"
									align="start"
									align-self="center"
								>
									<p class="required">개인정보 처리약관</p>
								</v-col>
								<v-col
									class="pa-0 td"
									cols="12"
									lg="10"
									align="start"
									align-self="center"
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
											>
												개인정보처리방침확인
											</v-btn>
										</div>
									</div>
								</v-col>
							</v-row>
						</div>
					</v-col>
				</div>

				<v-row class="ma-0 mt-10 justify-center">
					<v-col
						class="pa-0"
						cols="6"
						md="2"
					>
						<div class="mr-2">
							<CommonButtonsButton01
								name="뒤로"
								height="60"
								color="secondary"
								@click="$emit('back')"
							/>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="6"
						md="3"
					>
						<div class="ml-2">
							<CommonButtonsButton01
								name="신청하기"
								height="60"
								color="#00582c"
								:disabled="!registerCheck"
								@click="apiCallRegister"
							/>
						</div>
					</v-col>
				</v-row>
			</div>
		</div>
		<CommonConfirm
			:dialog="confirm"
			:title="'정보 확인'"
			:text="`지금 이페이지를 나가시면 작성하신 데이터가 모두 삭제 됩니다. <br/> 그래도 나가시겠습니까?`"
			@close="confirm = false"
			@submit="confirmSubmit"
		/>
	</v-col>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import kakao_post from '@/mixins/kakao_post'
import ad_kakao from '@/mixins/ad/kakao'
import ad_naver from '@/mixins/ad/naver'
import ad_mobion from '@/mixins/ad/mobion'
import common from '@/mixins/common'
import sms from '@/mixins/sms'

export default {
	name: 'HomeInteriorPriceInputs',
	mixins: [kakao_post, ad_kakao, ad_naver, ad_mobion, common, sms],
	data: () => ({
		addressDetail: '',
		askContents: '',
		privateTermsCheck: false,
		confirm: false,
		addQuestionModel: [],
		addQuestionItems: [],
		// sms check
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
		...mapGetters([
			'AUTH_GET_USER',
			'AUTH_GET_USER_AUTH',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'HOME_GET_INTERIOR_SELECT_INTERIOR',
			'HOME_GET_INTERIOR_SELECT_PRICE',
			'HOME_GET_INTERIOR_SELECT_PRODUCT',
		]),
		post() {
			return this.kakao_post_post
		},
		addressBasic() {
			return this.kakao_post_addressBasic
		},
		registerCheck() {
			// 인테리어 점 선택
			if (this.HOME_GET_INTERIOR_SELECT_INTERIOR === null) return false

			const checkList = ['post', 'addressBasic', 'addressDetail', 'privateTermsCheck']
			// GUEST일 경우 본인인증 추가체크
			if (this.AUTH_GET_USER_AUTH === 'GUEST') checkList.push('smsNumberCheck')

			for (let i of checkList) {
				if (this[i] === '' || this[i] === null || this[i] === undefined || this[i] === false) return false
			}
			return true
		},
		selectInteriorList() {
			return this.HOME_GET_INTERIOR_SELECT_INTERIOR.map(x => x.business_name).join(', ')
		},
		selectProductName() {
			let name = null
			if (this.HOME_GET_INTERIOR_SELECT_PRODUCT) {
				name = this.HOME_GET_INTERIOR_SELECT_PRODUCT.contents.name
			}
			return name
		},
		selectContents() {
			let contents = null
			if (this.HOME_GET_INTERIOR_SELECT_PRODUCT?.contents) {
				contents = `${this.HOME_GET_INTERIOR_SELECT_PRODUCT.contents.name}`
			}
			return contents
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
	async created() {
		// 시공 추가문의 항목
		await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS({ group_code: '601' }).then(res => {
			// 기타 마지막으로 보내기
			let etc = res[0]
			res.shift()
			res.push(etc)
			this.addQuestionItems = res
		})
	},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', 'HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE']),
		async postApi() {
			await this.kakao_post_api_call(address => address)
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
		confirmSubmit() {
			this.confirm = false
			this.$router.go(-1)
		},
		async apiCallRegister() {
			console.log('post', this.post)
			console.log('addressBasic', this.addressBasic)
			console.log('addressDetail', this.addressDetail)
			console.log('askContents', this.askContents)
			console.log('HOME_GET_INTERIOR_SELECT_INTERIOR', this.HOME_GET_INTERIOR_SELECT_INTERIOR)
			console.log('HOME_GET_INTERIOR_SELECT_PRICE', this.HOME_GET_INTERIOR_SELECT_PRICE)
			console.log('HOME_GET_INTERIOR_SELECT_PRODUCT', this.HOME_GET_INTERIOR_SELECT_PRODUCT)
			let items = {
				method: 'post',
				params: {
					memberYN: this.AUTH_GET_USER.login_id ? 'Y' : 'N',
					login_id: this.AUTH_GET_USER.login_id ? this.AUTH_GET_USER.login_id : this.hand,
					login_name: this.AUTH_GET_USER.name ? this.AUTH_GET_USER.name : this.name,
					regi_userid: this.AUTH_GET_USER.login_id ? this.AUTH_GET_USER.login_id : this.name,

					// 문의 사항 등록정보
					zipcode: this.post,
					address1: this.addressBasic,
					address2: this.addressDetail,
					content: this.askContents,
				},
			}

			// interior 업체 등록
			this.HOME_GET_INTERIOR_SELECT_INTERIOR.forEach((x, i) => {
				const num = i + 1
				items.params[`corporate_no${num}`] = x.corporate_no
				items.params[`hand${num}`] = x.manager_hand
				items.params[`sms_yn${num}`] = x.sms_yn
			})

			if (this.addQuestionModel.length) {
				// 추가 상담이 있는경우
				const addItems = []
				this.addQuestionModel.forEach(element => addItems.push(this.addQuestionItems[element]))
				items.params.estconsultadd = addItems.map(x => x.code).join(',')
			}

			if (this.HOME_GET_INTERIOR_SELECT_PRODUCT) {
				// 제품을 선택한 경우 ( 상세제품 - '상품마스터' / 3D 집들이 - '3D집들이관리' / 전문가 집들이 - '전문가집들이관리' )
				items.params.product_kind = this.HOME_GET_INTERIOR_SELECT_PRODUCT.type
				items.params.product_id = this.HOME_GET_INTERIOR_SELECT_PRODUCT.contents.id
				items.params.product_code = this.HOME_GET_INTERIOR_SELECT_PRODUCT.goods_code
			}

			// if (this.HOME_GET_INTERIOR_SELECT_PRICE) {
			// 	// 견적 단가가 있는 경우
			// 	items.params.goods_code = this.HOME_GET_INTERIOR_SELECT_PRICE.goods_code
			// 	items.params.exclusive_area = this.HOME_GET_INTERIOR_SELECT_PRICE.exclusive_area
			// 	items.params.housetype = this.HOME_GET_INTERIOR_SELECT_PRICE.housetype
			// 	items.params.roomcount = this.HOME_GET_INTERIOR_SELECT_PRICE.roomcount
			// 	items.params.veranda_yn = this.HOME_GET_INTERIOR_SELECT_PRICE.veranda_yn
			// 	items.params.buildscope = this.HOME_GET_INTERIOR_SELECT_PRICE.buildscope
			// 	items.params.removal_yn = this.HOME_GET_INTERIOR_SELECT_PRICE.removal_yn
			// 	items.params.est_cost = this.HOME_GET_INTERIOR_SELECT_PRICE.est_cost
			// 	items.params.product_kind = this.HOME_GET_INTERIOR_SELECT_PRICE.type
			// 		? this.HOME_GET_INTERIOR_SELECT_PRICE.type
			// 		: '간편견적관리'
			// }

			console.log('params', items)

			await this.HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE(items)
				.then(async res => {
					if (res) {
						await this.APP_MU_DIALOG({
							dialog: true,
							title: '견적내기',
							text: '견적내기 접수가 완료되었습니다.',
						})

						// google analytics
						window.gtag('event', 'click_inquire_button', { button_location: 'interior_price_inquire' })
						// ad_kakao addToCart
						this.ad_kakao_addToCart(this.HOME_GET_INTERIOR_SELECT_INTERIOR.corporate_no, 'click_inquire_button_ip')
						// ad_naver
						this.ad_naver_changeScript(1, 1)
						// ad_mobion
						this.ad_mobion_click_convertion('click_inquire_button_ipi')

						if (this.AUTH_GET_USER_AUTH === 'USER') this.$router.push('/user?tab=2').catch(() => {})
						else this.$router.go(0)
					} else {
						await this.APP_MU_DIALOG({
							dialog: true,
							title: '견적내기',
							text: '견적내기 접수를 실패하였습니다.',
						})
					}
				})
				.catch(e => {
					console.log('HOME_ACT_INTERIOR_ESTIMATE_SIMPLE_PRICE', e)
				})
		},
	},
}
</script>

<style scoped lang="scss">
.register {
	max-width: 1000px;
	padding: 40px 80px 48px !important;
	margin: 0 auto;
	background-color: $color_white;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	border-radius: 16px;
	.guide_txt {
		.tit {
			color: $color_font;
			font-size: $font_tit;
			font-weight: $fw_bold;
			word-break: keep-all;
		}
		.sub {
			color: $color_gray1;
			font-size: 1.065rem;
			font-weight: $fw_normal;
			word-break: keep-all;
		}
	}
	.body {
		.part {
			font-size: $font__sub_tit !important;
			font-weight: $fw_bold;
			border-bottom: 1px solid $color_gray4;
			word-break: keep-all;
		}
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

@media all and (max-width: 959px) {
	.v-btn-toggle--group > .v-btn.v-btn {
		border-radius: 30px !important;
		width: 17.5%;
	}
	.register {
		padding: 24px !important;
		.guide_txt {
			.tit {
				font-size: $font_xl;
			}
			.sub {
				font-size: 0.923rem;
			}
		}
		.body {
			.part {
				font-size: $font_lg !important;
			}
		}
	}
	.btn_privacy {
		* {
			font-size: 12px;
		}
	}
}
</style>
