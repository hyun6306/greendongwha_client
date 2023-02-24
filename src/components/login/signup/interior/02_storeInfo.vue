<template>
	<div>
		<v-col cols="12" class="pa-0">
			<div class="form">
				<p class="mb-1" align="start">상호명 *</p>
				<v-row class="ma-0 mb-5">
					<v-col class="pa-0">
						<div class="pr-1">
							<CommonInputsInput04
								v-model="business_name"
								placeholder="상호명 입력해 주세요"
							/>
						</div>
					</v-col>
				</v-row>

				<div class="mb-5">
					<p class="mb-1" align="start">회사 로고</p>

					<CommonInputsInputFile01
						v-model="company_logo"
						placeholder="jpg / png / gif 이미지"
						hide-icon
					/>
				</div>

				<div class="mb-5">
					<p class="mb-1" align="start">회사 대표이미지</p>

					<CommonInputsInputFile01
						v-model="company_pic"
						placeholder="jpg / png / gif 이미지"
						hide-icon
					/>
				</div>


				<p class="mb-1" align="start">대표자명 *</p>
				<CommonInputsInput02
					v-model="boss_name"
					placeholder="대표자명을 입력해주세요"
				/>

				<p class="mb-1" align="start">사업자 번호 *</p>
				<v-row class="ma-0 mb-5">
					<v-col class="pa-0" cols="8">
						<div class="pr-1">
							<CommonInputsInput04
								v-model="corporate_no"
								placeholder="사업자 번호를 입력해 주세요"
							/>
						</div>
					</v-col>
					<v-col class="pa-0" cols="4">
						<div class="pl-1">
							<CommonButtonsButton01
								name="인증"
								:color="interiorCheck? 'primary':'#5f6062'"
								class-name="regular font_12 edge5"
								height="40"
								@click="checkInterior"
							/>
						</div>
					</v-col>
					<v-col
						class="pa-0 pr-1"
						align="end"
					>
						<p v-if="interiorCheck"> 사용가능한 사업자 등록번호 입니다. </p>
					</v-col>
				</v-row>

				<div class="mb-5">
					<p class="mb-1" align="start">사업자 등록증 *</p>
					<CommonInputsInputFile01
						v-model="corporate"
						placeholder="jpg / png / gif 이미지"
					/>
				</div>

				<p class="mb-1" align="start">회사 전화 번호 *</p>
				<v-row class="ma-0 mb-5">
					<v-col cols="4" class="d-flex pa-0 tel">
						<div class="mr-2">
							<CommonSelectsSelect01
								v-model="localeModel"
								:items="common_localeItems"
								label="지역번호"
							/>
						</div>
					</v-col>
					<v-col class="d-flex pa-0">
						<div class="ml-2">
							<CommonInputsInput03
								v-model="tel"
								placeholder="숫자만 입력"
							/>
						</div>
					</v-col>
				</v-row>

				<p class="mb-1" align="start">회사 주소 *</p>
				<v-col cols="12" align="start" class="pa-0 mb-5">
					<v-row class="ma-0 pa-0">
						<v-col cols="6" class="pa-0">
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
						<v-col cols="3" class="pa-0">
							<CommonButtonsButton01
								name="주소검색"
								color="#9fa1a4"
								class-name="edge_5 olive"
								height="40"
								@click="postApi"
							/>
						</v-col>
					</v-row>
					<v-col cols="12" class="pa-0">
						<CommonInputsInput03
							v-model="company_addr1"
							placeholder="도로명/지번주소"
							readonly
							disabled
							class="mb-2"
						/>
					</v-col>
					<v-col cols="12" class="pa-0">
						<CommonInputsInput03
							v-model="company_addr2"
							placeholder="상세 주소를 입력해주세요."
						/>
					</v-col>
				</v-col>

				<p class="mb-1" align="start">회사 설립연도 *</p>
				<v-row class="ma-0 mb-5">
					<v-col class="d-flex pa-0 t">
						<CommonSelectsSelect01
							v-model="start_year"
							:items="common_yearItems"
						/>
						<span class="px-2 c">년</span>
					</v-col>
					<v-col class="d-flex pa-0 t">
						<CommonSelectsSelect01
							v-model="start_month"
							:items="common_monthItems"
						/>
						<span class="px-2 c">월</span>
					</v-col>
				</v-row>

				<div class="mb-5">
					<p class="mb-1" align="start">시공분야 (중복 선택 가능) *</p>
					<CommonSelectsSelect02
						v-model="buildtype"
						:items="buildCodeItems"
						label="시공분야"
					/>
				</div>


				<p class="mb-1" align="start">홈페이지 주소 (선택)</p>
				<CommonInputsInput02
					v-model="homepage_url"
					placeholder="https://www.greendongwha.com/"
				/>

				<p class="mb-1" align="start">SNS 주소 (선택)</p>
				<CommonInputsInput02
					v-model="company_snscode1"
					placeholder="인스타그램(선택)"
				/>
				<CommonInputsInput02
					v-model="company_snscode2"
					placeholder="네이버 블로그(선택)"
				/>
				<CommonInputsInput02
					v-model="company_snscode3"
					placeholder="페이스북(선택)"
				/>
				<CommonInputsInput02
					v-model="company_snscode4"
					placeholder="유튜브(선택)"
				/>
			</div>
		</v-col>

		<v-divider />

		<v-col class="pa-0">
			<p class="notice mt-5 mb-10">
				<ul>
					<li>각 SNS에 맞는 올바른 SNS 주소를 입력해주시기 바랍니다.</li>
					<li>인테리어 가입의 경우 대표자 한 명만 가입이 가능합니다.</li>
					<li>입력하신 정보는 인테리어점 찾기에 소개되는 정보로, 가입 후 My Page에서 수정이 가능합니다.</li>
					<li>올바른 사업자 번호를 입력하였음에도 실명확인이 되지 않을 시, 고객센터로 문의주세요.</li>
					<li>타인의 정보를 부정하게 사용하는 경우 3년 이하의 징역 또는 1천 만원 이하의 벌금에 처해지게 됩니다.</li>
					<li>상호명에 "(주)"가 들어갈 경우, "주식회사"로 입력하시기 바랍니다.</li>
				</ul>
			</p>
		</v-col>

		<v-col class="pa-0">
			<CommonButtonsButton01
				:disabled="allowValue"
				name="가입하기"
				color="#00582c"
				height="50"
				class-name="bold font_16"
				rounded
				@click="saveInteriorInfo"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import model from '@/mixins/model'
import common from '@/mixins/common'
import kakao_post from '@/mixins/kakao_post'
import kakao_map from '@/mixins/kakao_map'

export default {
    name: 'SignupInteriorStoreInfo02',
	mixins:[
		common,
		model,
		kakao_post,
		kakao_map
	],
	data:() =>({
		business_name: null,
		company_logo: null,
		company_pic: null,

		corporate_no: null,
		boss_name: null,
		corporate: null,
		tel: null,

		company_zipcode: null,
		company_addr1: null,
		company_addr2: null,

		latitude: null,
		longitude: null,

		start_year: null,
		start_month: null,

		buildtype: [],
		buildCodeItems: [],

		homepage_url: null,
		company_snscode1: null,
		company_snscode2: null,
		company_snscode3: null,
		company_snscode4: null,

		localeModel: null,

		interiorCheck: false,
	}),
	computed: {
		...mapGetters([
			'AUTH_GET_SIGNUP_INTERIOR_INFO'
		]),
		filterBulidType(){
			return this.buildtype.map(x => x.code).join(',') || null
		},
		company_estdate(){
			return `${this.start_year.value}${this.start_month.value}` || null
		},
		company_tel(){
			if(this.localeModel === null) return null
			return `${this.localeModel.value}${this.tel}`
		},
		allowValue(){
			let check = false
			const checkValue = [
				'business_name',
				'corporate_no',
				'corporate',
				'boss_name',
				'company_tel',
				'company_zipcode',
				'company_addr1',
				'company_addr2',
				'latitude',
				'longitude',
				'start_year',
				'start_month',
				'filterBulidType',
				// check
				'interiorCheck',
			]
			for( let i of checkValue ){
				if(this[i] === null) check = true
			}
			return check
		},
	},
	watch:{
		filterBulidType(val){
			console.log('filterBulidType', val)
		}
	},
	async created() {
		await this.getApiInteriorItems()
	},
	mounted() {
		this.kakao_map_start()
	},
	methods: {
		...mapMutations([
			'AUTH_MU_SIGNUP_INTERIOR_INFO'
		]),
		...mapActions([
			'ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS',
			'AUTH_ACT_SIGN_UP_CHECK'
		]),
		async getApiInteriorItems(){
			const params= {	group_code : '301'}
			await this.ADMIN_ACT_PRODUCT_GET_PUBLIC_CODE_ITEMS(params).then((res)=> {
				this.buildCodeItems = res
			})
		},
		async checkInterior(){
			this.interiorCheck = false
			const params = {
				corporate_no: this.common_dateFilter(this.corporate_no)
			}

			const items = { method: 'interior', params: params }
			await this.AUTH_ACT_SIGN_UP_CHECK(items).then((res)=>{
				if(res) this.interiorCheck = true
				if(res == undefined || res == null || res === null){
					this.$toastr.error( "사업자 등록번호가 잘못되었습니다.", '사업자 등록번호 오류' ,{timeOut: 2500})
				}
			})
		},
		async postApi(){
			await this.kakao_post_api_call((res)=>{
				this.company_addr1    = res.address
				this.company_zipcode  = res.post
				this.getLanLng(res)
			})
		},
		async getLanLng(res){
			this.kakao_map_search_address_model = res.address.split('(')[0]
			await this.kakao_map_search_places_lanlng('search',(res)=>{
				// console.log('getLanLng', res)
				this.latitude = res[0].y
				this.longitude = res[0].x
			})
		},
		saveInteriorInfo(){
			const item = {
				business_name   : this.business_name,
				company_logo    : this.company_logo,
				company_pic     : this.company_pic,
				corporate_no    : this.common_dateFilter(this.corporate_no),
				boss_name       : this.boss_name,
				corporate       : this.corporate,
				company_tel     : this.company_tel,
				company_zipcode : this.company_zipcode,
				company_addr1   : this.company_addr1,
				company_addr2   : this.company_addr2,
				latitude        : this.latitude,
				longitude       : this.longitude,
				company_estdate : this.company_estdate,
				buildtype       : this.filterBulidType,
				homepage_url    : this.homepage_url,
				company_snscode1: this.company_snscode1,
				company_snscode2: this.company_snscode2,
				company_snscode3: this.company_snscode3,
				company_snscode4: this.company_snscode4,
			}

			// 회원가입 인테리어 정보 임시저장
			this.AUTH_MU_SIGNUP_INTERIOR_INFO(item)

			this.model = 2
		}
    }
}
</script>

<style scoped lang="scss">
.t{display:table !important;}
.c{
	display:table-cell !important;
	vertical-align:middle;
}

.upload{
	display:table !important;
	margin-top:-20px !important;
	div{
		display: table-cell !important;
		vertical-align: middle !important;
	}
	.text{
		display:inline-block;
		font-family:'NotoSansKR-Regular' !important;
		font-size:12px !important;
		color:#262626;
		text-align:left;
		line-height:1.2;
		word-break:keep-all;
	}
}

.tel{
	position:relative;
	&::after{
		display:block;
		position:absolute;
		top:10px;
		right:-2px;
		content:'-';

	}
}

.notice{
	font-family:'NotoSansKR-Regular' !important;
	font-size:12px !important;
	color:#5f6062 !important;
	text-align:left;
	word-break:keep-all;
	ul{
		padding:0 !important;
		li{
			position:relative;
			padding-left:10px;
			list-style:none !important;
			&::before{
				display:block;
				position:absolute;
				top:0;
				left:0;
				content: '-';
			}
		}
	}
	span{
		font-weight:600;
		color:#262626;
		border-bottom:1px solid #262626;
	}
}
</style>
