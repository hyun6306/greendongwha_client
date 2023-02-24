<template>
	<div class="inner_wrapper">
		<div class="register">
			<HomeCustomItemRegisterTitle
				:title="title"
				text="*시공 후 1개월 이내에 홈페이지에 품질보증을 등록하시면 최대 10년까지 품질보증을 해 드립니다"
				sub-text="(단 상업용 공간은 제외됩니다.)"
			/>
			<div class="body">
				<!-- 기본정보 -->
				<div class="basic_info pt-5 pt-md-8 pb-5 pb-md-8">
					<v-col class="pa-0 desc">
						<HomeCustomItemRegisterBasicTitle />
					</v-col>
					<v-col
						cols="12"
						class="pa-0 table"
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
						<v-row class="ma-0 mt-3">
							<v-col
								class="pa-0 th"
								cols="3"
								sm="2"
								align="start"
							>
								<p class="required">주소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="9"
								sm="10"
								align="start"
							>
								<v-row class="ma-0 pa-0">
									<v-col
										cols="6"
										md="3"
										class="pa-0 pr-2"
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
										cols="3"
										md="2"
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
				<div class="input_area pt-5 pt-md-8">
					<v-col
						cols="12"
						class="pa-0 table"
					>
						<v-row class="ma-0 mb-6">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
								align-self="center"
							>
								<p class="required">제품군</p>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0 px-3"
							>
								<CommonSelectsSelect05
									v-model="kindModel"
									:parents-items="partItemsFilter"
									:child-items="kindItemsFilter"
									:select-text="selectKindModel"
									:height="40"
									select-id="kind_code"
									label="A/S항목 선택"
									@select-parents="selectPart"
									@select-child="selectKind"
								/>
							</v-col>
						</v-row>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
								align-self="center"
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
										v-model="asTitle"
										placeholder="제목을 입력해 주세요"
										class="mb-2"
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
								<p class="required">A/S접수 내용</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-col class="pa-0">
									<v-textarea
										v-model="asContents"
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
							>
								<div class="btn_privacy">
									<div>
										<CommonCheckboxsCheckbox02
											v-model="privateTermsCheck"
											text="개인정보 이용에 동의"
											class="pa-0 ma-0 pr-5"
											:block="false"
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
						:disabled="registerCheck"
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
		<CommonLoading v-if="loading" />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import kakao_post from '@/mixins/kakao_post'
import admin from '@/mixins/admin'
import common from '@/mixins/common'

export default {
	name: 'UserAsRegister',
	metaInfo: {
		title: 'A/S 신청 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: 'A/S 신청 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루 A/S 서비스로 안심하고 사용하세요.',
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [kakao_post, common, admin],
	data: () => ({
		addressDetail: '',
		partModel: null,
		kindModel: null,
		asTitle: '',
		asContents: '',
		uploadFile: null,
		privateTermsCheck: false,
		confirm: false,
		loading: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_USER',
			'USER_GET_AS_SELECT',
			'ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
		]),
		post() {
			return this.kakao_post_post
		},
		addressBasic() {
			return this.kakao_post_addressBasic
		},
		registerCheck() {
			let check = false
			const checkValue = ['kindModel', 'privateTermsCheck']

			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) return true
			}

			const checkTextValue = ['post', 'addressBasic', 'addressDetail', 'asTitle', 'asContents']

			for (let i of checkTextValue) {
				if (this[i] === null || !this[i].length) return true
			}

			return check
		},
		partItemsFilter() {
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length) return []
			let items = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.filter(item => item.use_yn === 'Y')

			items.map(x => (x.active = false)) // active reset
			if (this.partModel) {
				const selectIndex = items.findIndex(x => x.subject_code === this.partModel.subject_code)
				items[selectIndex].active = true
			} else {
				items[0].active = true
			}
			return items
		},
		kindItemsFilter() {
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) return []
			let items = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(item => item.use_yn === 'Y')

			if (this.partModel) items = items.filter(x => x.subject_code === this.partModel.subject_code)
			return items
		},
		selectKindModel() {
			let text = null
			if (this.kindModel) {
				// const subject = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.find(x => x.subject_code === this.kindModel.subject_code)
				// text = `${subject.text} > ${this.kindModel.kind_name}`
				text = `${this.kindModel.kind_name}`
			}
			return text
		},
		title() {
			return `AS ${this.getQuery === 'modify' ? '수정' : '등록'}`
		},
		getQuery() {
			return this.$route.query.type
		},
	},
	watch: {},
	async created() {
		await this.getCategorylist().then(() => {
			if (this.getQuery === 'modify') this.startDataMapping()
		})
	},
	mounted() {
		if (this.getQuery === 'modify') {
			if (Object.keys(this.USER_GET_AS_SELECT).length === 0) this.$router.go(-1)
		}
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', 'USER_ACT_AS']),
		selectPart(item) {
			this.partModel = item
		},
		selectKind(item) {
			this.kindModel = item
		},
		async getCategorylist() {
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.length)
				await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('1').then(
					() => (this.partModel = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS[0]),
				)
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2')
		},
		startDataMapping() {
			console.log('USER_GET_AS_SELECT', this.USER_GET_AS_SELECT)

			this.partModel = this.ADMIN_GET_PRODUCT_CATEGORY_PART_ITEMS.find(
				item => item.subject_code === this.USER_GET_AS_SELECT.subject_code,
			)
			this.kindModel = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.find(
				item => item.kind_code === this.USER_GET_AS_SELECT.kind_code,
			)
			this.kakao_post_post = this.USER_GET_AS_SELECT.zipcode || ''
			this.kakao_post_addressBasic = this.USER_GET_AS_SELECT.address1 || ''
			this.addressDetail = this.USER_GET_AS_SELECT.address2 || ''
			this.asTitle = this.USER_GET_AS_SELECT.title || ''
			this.asContents = this.USER_GET_AS_SELECT.contents || ''
			this.uploadFile = this.USER_GET_AS_SELECT.file_url || null
		},
		async postApi() {
			await this.kakao_post_api_call(address => address)
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
					category: '1',
					regi_userid: this.AUTH_GET_USER.login_id,
					subject_code: this.partModel?.subject_code || '',
					kind_code: this.kindModel?.kind_code || '',
					zipcode: this.post || '',
					address1: this.addressBasic || '',
					address2: this.addressDetail || '',
					title: this.asTitle || '',
					contents: this.asContents || '',
					progress_state: '1',
				},
			}

			if (this.getQuery === 'modify') {
				items.params.service_id = this.USER_GET_AS_SELECT.service_id

				// 첨부파일 추가
				if (this.USER_GET_AS_SELECT.file_url?.length === 0 && this.uploadFile !== null) {
					items.params.fileurl = this.uploadFile
				}

				// 첨부파일 삭제
				if (this.USER_GET_AS_SELECT.file_url?.length !== 0 && this.uploadFile === null) {
					items.params.file_url = this.USER_GET_AS_SELECT.file_url
				}

				// 첨부파일 수정
				if (
					this.USER_GET_AS_SELECT.file_url?.length !== 0 &&
					this.uploadFile !== null &&
					this.USER_GET_AS_SELECT.file_url !== this.uploadFile
				) {
					items.params.file_url = this.USER_GET_AS_SELECT.file_url
					items.params.fileurl = this.uploadFile
				}
			} else {
				if (this.uploadFile !== null || this.uploadFile?.length > 0) {
					items.params.fileurl = this.uploadFile
				}
			}

			console.log('USER_ACT_AS', items)

			this.USER_ACT_AS(items)
				.then(async res => {
					this.loading = false
					if (res) {
						await this.APP_MU_DIALOG({
							dialog: true,
							title: this.title,
							text: `${this.title}이 완료되었습니다.`,
						})
						this.$router.push('/user?tab=4').catch(() => {})
					}
				})
				.catch(err => {
					console.error('USER_ACT_AS_post', err)
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
