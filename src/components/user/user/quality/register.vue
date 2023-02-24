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
					</v-col>
				</div>

				<!-- 등록영역 -->
				<div class="input_area pt-5 pt-md-8">
					<v-col
						cols="12"
						class="pa-0 table"
					>
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">품질보증 번호</p>
								<span>(QR코드)</span>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<CommonInputsInput03
									v-model="guarantee_no"
									placeholder="품질보증 번호를 입력해주세요."
									class="mb-1"
								/>
								<p class="notice">
									품질보증번호를 아직 발급받지 않으신 고객께서는 동화톡톡 또는 고객센터 1899-2837로 발급 신청을
									해주시기 바랍니다.
								</p>
							</v-col>
						</v-row>
						<v-row class="ma-0 mb-5">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">시공제품</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-col
									cols="12"
									md="7"
									class="pa-0 px-3"
								>
									<CommonSelectsSelect05
										v-model="productModel"
										:parents-items="kindItemsFilter"
										:child-items="productItemsFilter"
										:select-text="selectProductModel"
										:height="40"
										select-id="goods_code"
										label="제품 선택"
										@select-parents="selectKind"
										@select-child="selectProduct"
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
								<p class="required">시공장소</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
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
											class="mb-1"
										/>
									</v-col>
									<v-col
										cols="6"
										md="3"
										class="pa-0"
									>
										<CommonButtonsButton01
											name="주소검색"
											color="#9fa1a4"
											class-name="edge_8 olive"
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
										class="mb-1"
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
						<v-row class="ma-0 mb-3">
							<v-col
								class="pa-0 pb-1 pb-md-0 th"
								cols="12"
								md="2"
								align="start"
							>
								<p class="required">구입 월</p>
							</v-col>
							<v-col
								class="pa-0 td"
								cols="12"
								md="10"
								align="start"
							>
								<v-row class="ma-0 pa-0">
									<v-col
										cols="6"
										md="3"
										class="pa-0 pr-2"
									>
										<CommonSelectsSelect01
											v-model="yearModel"
											:items="common_yearItems"
											label="년도"
										/>
									</v-col>
									<v-col
										cols="6"
										md="3"
										class="pa-0"
									>
										<CommonSelectsSelect01
											v-model="monthModel"
											:items="common_monthItems"
											label="월"
										/>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<v-row class="ma-0">
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import kakao_post from '@/mixins/kakao_post'
import common from '@/mixins/common'
import admin from '@/mixins/admin'

export default {
	name: 'UserQualityRegister',
	metaInfo: {
		title: '품질 보증 등록 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '품질 보증 등록 | 동화자연마루',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '최소 7년이상 사용하는 인테리어, 동화장녀마루에서 품질 보증 받으세요.',
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
		guarantee_no: null,
		kindModel: null,
		brandModel: null,
		productModel: null,
		productUrl: null,
		addressDetail: null,
		yearModel: null,
		monthModel: null,
		privateTermsCheck: false,
		confirm: false,
		loading: false,
		brandList: [],
		productList: [],
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_USER',
			'USER_GET_QUALITY_SELECT',
			'ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS',
			'ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS',
		]),
		post() {
			return this.kakao_post_post
		},
		addressBasic() {
			return this.kakao_post_addressBasic
		},
		registerCheck() {
			let check = false
			const checkTextValue = ['guarantee_no', 'post', 'addressBasic', 'addressDetail']
			for (let i of checkTextValue) {
				if (this[i] === null || !this[i].trim().length) return true
			}

			const checkValue = ['yearModel', 'monthModel', 'privateTermsCheck']
			for (let i of checkValue) {
				if (this[i] === null || this[i] === false) return true
			}

			return check
		},
		kindItemsFilter() {
			if (this.brandItemsFilter && this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) {
				console.log('brandItemsFilter', this.brandItemsFilter)

				// 추출한 내용의 kind_code만 추출 > 중첩내용 제거
				const typeList = this.brandItemsFilter.map(x => x.kind_code)
				const set = new Set(typeList)
				const setArr = [...set]
				console.log('setArr', setArr)

				// 추출된 kind_code를 통해 전체종류리스트에서 종류List만들기
				let kindItems = this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.filter(x => setArr.includes(x.kind_code))
				console.log('kindItems', kindItems)
				if (!kindItems.length) return []

				kindItems.map(x => (x.active = false)) // active reset
				if (this.kindModel) {
					// 선택데이터 확인 active 체크
					const select = kindItems.findIndex(x => x.kind_code === this.kindModel.kind_code)
					kindItems[select].active = true
				} else {
					// 초기에 선택된 종류 데이터가 없을때 강제로 [0]데이터 active
					kindItems[0].active = true
				}

				return kindItems
			}
			return []
		},
		brandItemsFilter() {
			let filterItems = []

			if (this.productItems.length && this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length) {
				// 품질보증 등록이 가능한 제품의 Brand 목록 추출
				const brandList = this.productItems.map(x => x.brand_code)
				const set = new Set(brandList)
				const setArr = [...set]
				filterItems = this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.filter(item => setArr.includes(item.brand_code))
			}
			return filterItems
		},
		productItemsFilter() {
			if (this.brandItemsFilter && this.productItems.length) {
				const filterItems = this.productItems.map(x => {
					const sameData = this.brandItemsFilter.find(y => x.brand_code === y.brand_code)
					if (sameData) {
						x.kind_code = sameData.kind_code
						x.kind_name = sameData.kind_name
						x.brand_name = sameData.brand_name
						x.text = `${x.brand_name} ${x.goods_name}`
						return x
					}
				})
				if (!filterItems.length) return []

				// 빈값 확인 삭제
				const newFilterItems = filterItems.filter(element => element)

				if (this.kindModel) {
					return this.common_filterItem(this.kindModel, newFilterItems, 'kind_code')
				} else {
					return this.common_filterItem(this.kindItemsFilter[0], newFilterItems, 'kind_code')
				}
			}
			return []
		},
		productItems() {
			let items = []
			if (this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS) {
				items = this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.filter(item => item.guarantee_year !== '0')
			}
			return items
		},
		selectProductModel() {
			let text = null
			if (this.productModel) text = `${this.productModel.text}`
			return text
		},
		title() {
			return `품질보증 ${this.getQuery === 'modify' ? '수정' : '등록'}`
		},
		getQuery() {
			return this.$route.query.type
		},
	},
	watch: {},
	async created() {
		await this.getCategorylist().then(() => {
			// 수정
			if (this.getQuery === 'modify') this.startDataMapping()
		})
	},
	mounted() {
		if (this.getQuery === 'modify') {
			if (Object.keys(this.USER_GET_QUALITY_SELECT).length === 0) this.$router.go(-1)
		}
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		...mapActions(['ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS', 'USER_ACT_QUALITY']),
		selectKind(item) {
			this.kindModel = item
		},
		selectProduct(item) {
			this.productModel = item
		},
		async getCategorylist() {
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_TYPE_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('2') // 제품
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_BRAND_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('3') // 브랜드
			if (!this.ADMIN_GET_PRODUCT_CATEGORY_PRODUCT_ITEMS.length) await this.ADMIN_ACT_PRODUCT_GET_CATEGORY_ITEMS('4') // 제품
		},
		startDataMapping() {
			console.log('USER_GET_QUALITY_SELECT', this.USER_GET_QUALITY_SELECT, this.productItems)
			const date = this.USER_GET_QUALITY_SELECT.date.split('.')

			this.guarantee_no = this.USER_GET_QUALITY_SELECT.guarantee_no
			this.productModel = this.productItems.find(item => item.goods_code === this.USER_GET_QUALITY_SELECT.goods_code)
			// this.brandModel = this.brandItems.find(item => item.brand_code === this.productModel.brand_code)
			this.productUrl = this.USER_GET_QUALITY_SELECT.guarantee_no
			this.kakao_post_post = this.USER_GET_QUALITY_SELECT.zipcode || ''
			this.kakao_post_addressBasic = this.USER_GET_QUALITY_SELECT.address1 || ''
			this.addressDetail = this.USER_GET_QUALITY_SELECT.address2 || ''
			this.yearModel = this.common_yearItems.find(item => item.value === date[0])
			this.monthModel = this.common_monthItems.find(item => item.value === date[1])
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
					login_id: this.AUTH_GET_USER.login_id,
					guarantee_no: this.guarantee_no || '',
					goods_code: this.productModel.goods_code || '',
					zipcode: this.post || '',
					address1: this.addressBasic || '',
					address2: this.addressDetail || '',
					purchase_date: `${this.yearModel.value}${this.monthModel.value}` || '',
					conf_state: '1', // 1:요청  2: 승인  3: 반려
					// bigo: this.bigo,
				},
			}

			if (this.getQuery === 'modify') items.params.guarantee_id = this.USER_GET_QUALITY_SELECT.guarantee_id

			console.log('USER_ACT_QUALITY_post', items)

			this.USER_ACT_QUALITY(items)
				.then(async () => {
					this.loading = false
					await this.APP_MU_DIALOG({
						dialog: true,
						title: this.title,
						text: `${this.title}이 완료되었습니다.`,
					})

					// google analytics
					window.gtag('event', 'click_quality_button', { button_location: `user_create` })

					this.$router.push('/user?tab=3').catch(() => {})
				})
				.catch(err => {
					console.error('USER_ACT_QUALITY_post', err)
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
