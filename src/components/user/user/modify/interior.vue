<template>
	<div class="user_inner_wrapper px-5">
		<v-row class="ma-0 py-3 mb-5 history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>* 인테리어 회원정보 ( 필수 )</v-col
			>
		</v-row>

		<!-- 인테리어 정보수정 -->
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
								<p>업체 이름</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								{{ AUTH_GET_USER.business_name }}
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4 py-1">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>대표자명</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								{{ AUTH_GET_USER.boss_name }}
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
								<p>이메일(추가)</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="emailaddr"
									rule-name="email"
									placeholder="abc123@naver.com"
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
								<p class="required">담당자 이름</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="name"
									placeholder="홍길동"
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
						<p>*회원정보 변경을 원하시면 비밀번호와 휴대폰으로 발송된 인증번호를 입력해주세요.</p>
					</v-col>
				</div>
			</div>
		</div>

		<!-- 마케팅 수신동의 -->
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

		<!-- 회사정보 -->
		<v-row class="ma-0 py-3 mb-5 history_bar">
			<v-col
				class="pa-0 tit"
				cols="auto"
				align="start"
				align-self="center"
				>회사 정보</v-col
			>
		</v-row>
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
								<p class="required">설립연도</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row
									class="ma-0"
									align="center"
								>
									<v-col class="d-flex pa-0">
										<CommonSelectsSelect01
											v-model="start_year"
											:items="common_yearItems"
										/>
										<span class="px-2 pt-1">년</span>
									</v-col>
									<v-col class="d-flex pa-0">
										<CommonSelectsSelect01
											v-model="start_month"
											:items="common_monthItems"
										/>
										<span class="px-2 pt-1">월</span>
									</v-col>
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
								<p class="required">전화</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="company_tel"
									type="number"
									placeholder="-없이 숫자만 입력해주세요"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p class="required">주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<v-row class="ma-0 pa-0">
									<v-col
										cols="6"
										class="pa-0"
									>
										<div class="mr-1">
											<CommonInputsInput03
												v-model="company_zipcode"
												placeholder="우편번호"
												readonly
												disabled
												class="mb-2"
											/>
										</div>
									</v-col>
									<v-col
										cols="3"
										class="pa-0"
									>
										<CommonButtonsButton01
											name="주소검색"
											color="#9fa1a4"
											class-name="edge_5 olive"
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
										v-model="company_addr1"
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
										v-model="company_addr2"
										placeholder="상세 주소를 입력해주세요."
									/>
								</v-col>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>시공분야</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonSelectsSelect02
									v-model="buildtype"
									:items="buildCodeItems"
									label="시공분야"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>홈페이지</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="homepage_url"
									placeholder="www.homepage.com"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>인스타그램</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="company_snscode1"
									placeholder="www.instagram.com"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>네이버 블로그</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="company_snscode2"
									placeholder="www.naver.com"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>페이스북</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="company_snscode3"
									placeholder="www.facebook.com"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>유튜브</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInput03
									v-model="company_snscode4"
									placeholder="www.youtube.com"
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>회사 로고</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInputFile01
									v-model="company_logo"
									placeholder="jpg / png / gif 이미지"
									hide-icon
								/>
							</v-col>
						</v-row>

						<v-row class="ma-0 mb-4">
							<v-col
								class="pa-0 th"
								cols="12"
								md="4"
								align="start"
							>
								<p>회사 대표이미지</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="8"
								align="start"
							>
								<CommonInputsInputFile01
									v-model="company_pic"
									placeholder="jpg / png / gif 이미지"
									hide-icon
								/>
							</v-col>
						</v-row>
					</v-col>
				</div>
			</div>
		</div>

		<div
			class="d-flex justify-center pt-5 mb-10"
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
			:type="'interior'"
			@close="secessionModel = false"
		/>

		<CommonLoading v-if="loading" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'
import sms from '@/mixins/sms'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'

export default {
	name: 'UserModifyInterior',
	mixins: [sms, common, kakao_post, kakao_map],
	data: () => ({
		emailaddr: null,
		password: null,
		email_yn: 'N',
		sms_yn: 'N',
		name: null,
		hand: null,

		company_tel: null,

		company_zipcode: null,
		company_addr1: null,
		company_addr2: null,

		latitude: null,
		longitude: null,

		start_year: null,
		start_month: null,

		buildtype: [],

		homepage_url: null,
		company_snscode1: null,
		company_snscode2: null,
		company_snscode3: null,
		company_snscode4: null,

		// 시공타입 items
		buildCodeItems: [],
		// sms
		smsNum: null,
		smsNumberCheck: null,
		smsNumberModel: false,
		telLoading: false,

		// check
		passwordConfirm: null,
		localeModel: null,

		// image
		company_logo: null,
		company_pic: null,

		secessionModel: false,
		loading: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		filterBulidType() {
			return this.buildtype.map(x => x.code).join(',') || null
		},
		company_estdate() {
			return `${this.start_year.value}${this.start_month.value}` || null
		},
		allowValue() {
			let check = false
			const checkValue = [
				'password',
				'smsNumberCheck',
				'passwordCheck',
				'start_year',
				'start_month',
				'company_zipcode',
				'company_addr1',
			]

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) return true
			}

			if (!this.company_tel?.length) check = true

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
	async created() {
		await this.getApiInteriorItems()
		this.startMapping(this.AUTH_GET_USER)
	},
	mounted() {
		this.kakao_map_start()
	},
	methods: {
		...mapActions(['ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS', 'USER_ACT_USER_INFO_MODIFY']),
		async getApiInteriorItems() {
			// 시공타입 가져오기
			const params = { group_code: '301' }
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS(params).then(res => {
				this.buildCodeItems = res
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
		async postApi() {
			await this.kakao_post_api_call(res => {
				this.company_addr1 = res.address
				this.company_zipcode = res.post
				this.getLanLng(res)
			})
		},
		async getLanLng(res) {
			this.kakao_map_search_address_model = res.address.split('(')[0]
			await this.kakao_map_search_places_lanlng('search', res => {
				// console.log('getLanLng', res)
				this.latitude = res[0].y
				this.longitude = res[0].x
			})
		},
		startMapping(user) {
			// 설립연월
			const estdateFilter = val => {
				if (val.length === 1) val = `0${val}` // 한자리 month 예외처리
				return { text: val, value: val }
			}
			// 시공타입
			const buildTypeFilter = val => {
				let items = []
				val.forEach(element => items.push(this.buildCodeItems.find(x => x.code_name === element.code_name)))
				return items
			}

			this.emailaddr = user.emailaddr
			this.email_yn = user.email_yn
			this.sms_yn = user.sms_yn
			this.name = user.name
			this.hand = user.hand
			this.company_tel = user.company_tel
			this.company_zipcode = user.company_zipcode
			this.company_addr1 = user.company_addr1
			this.company_addr2 = user.company_addr2
			this.latitude = user.latitude
			this.longitude = user.longitude
			this.start_year = estdateFilter(user.company_estdate.substring(0, 4))
			this.start_month = estdateFilter(user.company_estdate.substring(4, 6))
			this.buildtype = buildTypeFilter(user.buildtype)
			this.homepage_url = user.homepage_url
			this.company_snscode1 = user.company_snscode1
			this.company_snscode2 = user.company_snscode2
			this.company_snscode3 = user.company_snscode3
			this.company_snscode4 = user.company_snscode4
		},
		async onApiCallItem() {
			this.loading = true

			const params = {
				corporate_no: this.AUTH_GET_USER.corporate_no,
				password: this.password,
			}
			// 추가 이메일
			if (this.AUTH_GET_USER.emailaddr !== this.emailaddr) params.emailaddr = this.emailaddr
			// 매니저 이름
			if (this.AUTH_GET_USER.name !== this.name) params.manager_name = this.name
			// 매니저 전화번호
			if (this.AUTH_GET_USER.hand !== this.hand) params.manager_hand = this.hand

			// 이메일 수신여부
			if (this.AUTH_GET_USER.email_yn !== this.email_yn) params.email_yn = this.email_yn
			// sms 수신여부
			if (this.AUTH_GET_USER.sms_yn !== this.sms_yn) params.sms_yn = this.sms_yn

			// 회사 전화
			if (this.AUTH_GET_USER.company_tel !== this.company_tel) params.company_tel = this.company_tel
			// 회사 설립연도
			if (this.AUTH_GET_USER.company_estdate != `${this.start_year.value}${this.start_month.value}`)
				params.company_estdate = `${this.start_year.value}${this.start_month.value}`

			// 회사 주소
			if (this.AUTH_GET_USER.company_addr2 !== this.company_addr2) params.company_addr2 = this.company_addr2
			// 회사 주소
			if (this.AUTH_GET_USER.latitude !== this.latitude) {
				params.company_zipcode = this.company_zipcode
				params.company_addr1 = this.company_addr1
				params.latitude = this.latitude
				params.longitude = this.longitude
			}

			// 홈페이지
			if (this.AUTH_GET_USER.homepage_url !== this.homepage_url) params.homepage_url = this.homepage_url
			// SNS ( 인스타 )
			if (this.AUTH_GET_USER.company_snscode1 !== this.company_snscode1) params.company_snscode1 = this.company_snscode1
			// SNS ( 네이버 블로그 )
			if (this.AUTH_GET_USER.company_snscode2 !== this.company_snscode2) params.company_snscode2 = this.company_snscode2
			// SNS ( 페이스북 )
			if (this.AUTH_GET_USER.company_snscode3 !== this.company_snscode3) params.company_snscode3 = this.company_snscode3
			// SNS ( 유튜브 )
			if (this.AUTH_GET_USER.company_snscode4 !== this.company_snscode4) params.company_snscode4 = this.company_snscode4

			// 시공타입
			if (this.AUTH_GET_USER.buildtype !== this.buildtype.map(x => x.code).join(','))
				params.buildtype = this.buildtype.map(x => x.code).join(',')

			// 회사 로고
			if (this.company_logo !== null) {
				params.company_logo = this.company_logo
				params.company_logourl = this.AUTH_GET_USER.company_logourl
			}
			// 회사 대표이미지
			if (this.company_pic !== null) {
				params.company_pic = this.company_pic
				params.company_picurl = this.AUTH_GET_USER.company_picurl
			}

			console.log('parmas', params)

			const items = { method: 'interior', params: params }

			await this.USER_ACT_USER_INFO_MODIFY(items).then(res => {
				if (res) {
					this.loading = false
					this.$toastr.info('인테리어 회원정보가 수정되어었습니다.', '인테리어 회원정보 수정', { timeOut: 2500 })
					this.$router.push(`/user`).catch(() => {})
				} else {
					this.$toastr.error('인테리어 회원정보에 문제가 생겼습니다.', '인테리어 회원정보 오류', { timeOut: 2500 })
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
