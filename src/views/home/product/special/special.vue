<template>
	<v-container
		class="pa-0"
		fluid
	>
		<v-col
			cols="12"
			class="pa-0"
			align="center"
		>
			<div class="wrapper">
				<v-container
					class="pa-0"
					fluid
				>
					<!-- 비주얼영역 -->
					<v-col
						cols="12"
						align="center"
						class="pa-0"
					>
						<v-row class="ma-0">
							<v-col
								cols="12"
								md="6"
								class="pa-0"
								align="start"
							>
								<v-img
									eager
									width="100%"
									:src="require('@/assets/img/product/img_green.jpg')"
									class="img_green pa-8 pa-sm-16"
								>
									<div class="top">
										<v-img
											eager
											class="mb-3"
											width="100px"
											:src="require('@/assets/img/product/icon_white_logo.png')"
										/>
										<p class="mb-5">친환경에 대한 노력으로<br />가치 있는 제품을 만들다</p>
										<div class="mb-5">
											1948년 설립된 <span class="em">동화기업</span>은 <br />
											대한민국 <span class="em">NO.1 목질 전문기업</span> 입니다.
										</div>
										<div>
											최고의 설비와 기술력을 바탕으로 국내 주거환경에 가장 적합한 제품을 통해 당신의 행복한
											내일을 만들겠습니다.<br />
										</div>
									</div>
									<div class="line my-5 my-sm-10" />
									<div class="bottom">
										<v-row class="ma-0">
											<v-col
												cols="12"
												lg="5"
												class="pa-0 pr-lg-3"
											>
												<p>주요공급사</p>
												<span>동화기업의 품질과 제품 경쟁력을 바탕으로 우수한 건설사와 함께합니다. </span>
											</v-col>
											<v-col
												cols="12"
												lg="7"
												class="mt-3 mt-lg-0 pa-0 pl-lg-3"
											>
												<v-img
													eager
													width="313px"
													max-height="180px"
													:src="require('@/assets/img/product/img_company.png')"
												/>
											</v-col>
										</v-row>
									</div>
								</v-img>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="pa-0 d-none d-md-flex"
							>
								<v-img
									eager
									width="100%"
									height="100%"
									:src="require('@/assets/img/product/img_tree.jpg')"
								/>
							</v-col>
						</v-row>
					</v-col>

					<!-- 컨텐츠영역 -->
					<v-col
						cols="12"
						class="pa-0 px-5 px-lg-0"
						align="center"
					>
						<!-- 제품 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0 mt-10 mt-md-15"
						>
							<v-card class="feature_tit pb-3 mb-6">
								<p>Products</p>
								<span>높은 기준이 가치를 품은 공간을 만듭니다.</span>
							</v-card>
							<v-row class="ma-0 intro justify-center">
								<v-col
									cols="12"
									sm="6"
									md="3"
									class="pa-0"
									align="start"
								>
									<div class="mx-sm-2 mx-md-4">
										<p class="type mb-1">FOR FLOOR</p>
										<v-col
											cols="12"
											class="pa-0 mb-5"
										>
											<v-img
												eager
												width="100%"
												height="100%"
												max-height="330"
												:src="require('@/assets/img/product/img_floor_1.png')"
											/>
										</v-col>
										<div class="text mb-7">
											<div class="tit">
												<span class="category">Natus Jin</span>
												<p class="name">섬유판 강마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												동화기업이 자체 개발한 섬유판보드(NAF)를 사용한 SUPER E0등급 친환경 제품입니다.
												내구성, 내수성, 열전도성이 뛰어나 한국식 주거 환경에 가장 적합한 바닥재입니다.
											</div>
										</div>
										<div class="text mb-7">
											<div class="tit">
												<span class="category">Natus Duo</span>
												<p class="name">복합형 강마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												섬유판보드(NAF)와 내수 합판을 결합하여 만든 특수보드(Duo-Core™)를 사용한
												제품입니다. 강마루의 장점은 살리고, 단점은 개선한 합리적인 바닥재입니다.
											</div>
										</div>
										<div class="text mb-12">
											<div class="tit">
												<span class="category">Natus Kang</span>
												<p class="name">합판 강마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												내수 합판을 코어 소재로 사용한 제품입니다. 열전도성과 내오염성이 좋아 사용이
												편리한 바닥재입니다.
											</div>
										</div>
									</div>
								</v-col>

								<v-col
									cols="12"
									sm="6"
									md="3"
									class="pa-0"
									align="start"
								>
									<div class="mx-sm-2 mx-md-4">
										<p class="type mb-1">FOR FLOOR</p>
										<v-col
											cols="12"
											class="pa-0 mb-5"
										>
											<v-img
												eager
												width="100%"
												height="100%"
												max-height="330"
												:src="require('@/assets/img/product/img_floor_2.png')"
											/>
										</v-col>
										<div class="text mb-7">
											<div class="tit">
												<span class="category">Natus Jin Real Wood</span>
												<p class="name">섬유판 원목마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												동화기업이 자체 개발한 섬유판보드(NAF)를 사용한 SUPER E0등급 친환경 제품입니다.
												천연 원목 단판의 자연스러운 컬러와 뛰어난 내구성까지 갖춘 마루입니다.
											</div>
										</div>
										<div class="text mb-12">
											<div class="tit">
												<span class="category">Baum</span>
												<p class="name">합판 원목마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												나무 본연의 질감과 내추럴한 컬러를 살려 자연 그대로의 매력을 담은 프리미엄
												바닥재입니다.
											</div>
										</div>
									</div>
								</v-col>

								<v-col
									cols="12"
									sm="6"
									md="3"
									class="pa-0"
									align="start"
								>
									<div class="mx-sm-2 mx-md-4">
										<p class="type mb-1">FOR FLOOR</p>
										<v-col
											cols="12"
											class="pa-0 mb-5"
										>
											<v-img
												eager
												width="100%"
												height="100%"
												max-height="330"
												:src="require('@/assets/img/product/img_wall_1.png')"
											/>
										</v-col>
										<div class="text mb-12">
											<div class="tit">
												<span class="category">Laminate Flooring</span>
												<p class="name">강화마루</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												100% 국내산 소나무만을 원재료로 사용한 친환경 제품입니다. 내구성, 내마모성이
												뛰어나고 시공이 편리한 실용적인 바닥재입니다
											</div>
										</div>
									</div>
								</v-col>

								<v-col
									cols="12"
									sm="6"
									md="3"
									class="pa-0"
									align="start"
								>
									<div class="mx-sm-2 mx-md-4">
										<p class="type mb-1">FOR WALL</p>
										<v-col
											cols="12"
											class="pa-0 mb-5"
										>
											<v-img
												eager
												width="100%"
												height="100%"
												max-height="330"
												:src="require('@/assets/img/product/img_wall_2.png')"
											/>
										</v-col>
										<div class="text mb-7">
											<div class="tit">
												<span class="category">Dizainwall</span>
												<p class="name">디자인 벽장재</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												동화기업이 국내 최초로 고밀도 HDF를 활용하여 개발한 벽장재로 친환경, 방염 인증
												제품입니다. Stone, Marble 등 다양한 패턴을 사실감 있게 표현하는 프리미엄
												벽장재입니다.
											</div>
										</div>
										<div class="text mb-7">
											<div class="tit">
												<span class="category">Ecostec</span>
												<p class="name">흡음용 벽장재</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												친환경 화이트보드(MDF) 및 비스코스 레이온을 사용한 친환경 제품입니다. 뛰어난
												흡음성과 내구성, 타공/라인 가공 등 다양한 디자인 표현이 가능한 기능성
												벽장재입니다.
											</div>
										</div>
										<div class="text mb-12">
											<div class="tit">
												<span class="category">Safewall</span>
												<p class="name">준불연 벽장재</p>
											</div>
											<div class="line my-2" />
											<div class="cont">
												고밀도 SDF(Super Density Fiberboard)보드를 사용하여 개발한 벽장재로 친환경, 준불연
												제품입니다. 뛰어난 화재 안전성과 내수성, 트렌디한 디자인으로 실내 벽면에
												광범위하게 적용 가능한 기능성 벽장재입니다.
											</div>
										</div>
									</div>
								</v-col>
							</v-row>
						</v-col>

						<!-- 품질인증 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0 mt-10 mt-md-15"
						>
							<v-card class="feature_tit pb-3 mb-6">
								<p>품질인증</p>
								<span>동화기업은 품질로 말합니다.</span>
							</v-card>
							<v-row class="ma-0 pa-5 quality">
								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_1.png')"
											/>
										</v-col>
										<p class="tit mt-2">품질경영시스템 인증서</p>
										<span class="num">한국표준협회 QMS-4651</span>
									</div>
								</v-col>

								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_2.png')"
											/>
										</v-col>
										<p class="tit mt-2">KS 인증서</p>
										<span class="num">한국임업진흥원 제2016-0065호</span>
									</div>
								</v-col>

								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_3.png')"
											/>
										</v-col>
										<p class="tit mt-2">친환경 건축자재 인증서</p>
										<span class="num">한국공기청정협회 HB187916-02</span>
									</div>
								</v-col>

								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_4.png')"
											/>
										</v-col>
										<p class="tit mt-2">환경표지 인증서</p>
										<span class="num">한국환경산업기술원 제15636호</span>
									</div>
								</v-col>

								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_5.png')"
											/>
										</v-col>
										<p class="tit mt-2">저탄소제품 인증</p>
										<span class="num">한국환경산업기술원장</span>
									</div>
								</v-col>

								<v-col
									cols="6"
									sm="4"
									md="3"
									lg="2"
									class="pa-0"
								>
									<div class="ma-2 ma-md-4">
										<v-col
											cols="12"
											class="pa-1 gradient"
										>
											<v-img
												eager
												width="100%"
												:src="require('@/assets/img/product/img_qaulity_6.png')"
											/>
										</v-col>
										<p class="tit mt-2">대한아토피협회 추천서</p>
										<span class="num">대한아토피협회</span>
									</div>
								</v-col>
							</v-row>
						</v-col>

						<!-- 문의하기 -->
						<v-col
							cols="12"
							align="center"
							class="pa-0 mt-10 mt-md-15"
						>
							<v-card class="feature_tit pb-3 mb-6">
								<p>특판 문의하기</p>
								<span>특판 제품의 궁금하신 점을 문의주시면 담당자가 확인하여 회신드립니다.</span>
							</v-card>
							<div class="register">
								<div class="body">
									<v-col
										cols="12"
										sm="10"
										md="8"
										class="table pa-0 pb-5 mb-5 pb-sm-7 mb-sm-7"
									>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
											>
												<p class="required">회사명</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												align="start"
											>
												<CommonInputsInput04
													v-model="models.company"
													placeholder="회사명을 입력해주세요."
													class="mb-1"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
											>
												<p class="required">이름</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												align="start"
											>
												<CommonInputsInput04
													v-model="models.name"
													rule-name="required"
													placeholder="이름을 입력해주세요."
													class="mb-1"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
											>
												<p class="required">휴대폰 번호</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												align="start"
											>
												<CommonInputsInput04
													v-model="models.hand"
													rule-name="tel"
													placeholder="‘-’ 없이 숫자만 입력해주세요."
													class="mb-1"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
											>
												<p>일반전화</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												align="start"
											>
												<CommonInputsInput04
													v-model="models.tel"
													placeholder="‘-’ 없이 숫자만 입력해주세요."
													class="mb-1"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
											>
												<p class="required">이메일 주소</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												align="start"
											>
												<CommonInputsInput04
													v-model="models.email"
													rule-name="email"
													placeholder="이메일을 입력해주세요(예 : abc123@abc.com)."
													class="mb-1"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0 mb-4 mb-sm-2"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												align="start"
												>연락가능시간</v-col
											>
											<v-col
												class="td pa-0"
												cols="7"
												sm="4"
												md="3"
												align="start"
											>
												<CommonSelectsSelect01
													v-model="timeModel"
													:items="common_timeItems"
													label="선택해주세요"
												/>
											</v-col>
										</v-row>
										<v-row
											class="ma-0"
											align="center"
										>
											<v-col
												class="th pa-0 mb-1 mb-sm-0"
												cols="12"
												sm="3"
												md="3"
												align="start"
											>
												<p class="required">개인정보 처리약관</p>
											</v-col>
											<v-col
												class="td pa-0"
												cols="12"
												sm="9"
												md="9"
												align="start"
											>
												<div class="btn_privacy">
													<div>
														<CommonCheckboxsCheckbox02
															v-model="privateTermsCheck"
															text="상담 예약 및 개인정보 수집 이용 동의"
															class="pa-0 ma-0 fl_half"
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

								<div class="d-flex justify-center mt-3">
									<CommonButtonsButton02
										name="취소"
										class-name="btn_basic"
										color="#a0a1a5"
										class="mr-1"
										@click="confirmRemove = true"
									/>
									<CommonButtonsButton02
										name="완료"
										class-name="btn_basic"
										color="#00582c"
										:disabled="allowValue"
										@click="onApiCallItem"
									/>
								</div>
							</div>
						</v-col>
					</v-col>

					<CommonConfirm
						:dialog="confirmRemove"
						:title="'특판문의 취소'"
						:text="`현재 작성하신 모든 정보가 삭제 됩니다. <br/> 그래도 삭제하시겠습니까?`"
						@close="confirmRemove = false"
						@submit="resetData"
					/>
				</v-container>
			</div>
		</v-col>
	</v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import apiHome from '@/api/home'

export default {
	name: 'HomeProductSpecialMain',
	metaInfo: {
		title: '특판문의 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '특판문의 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루, 상업용, 특판문의',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '시공 능력 평가액 1조원 이상의 대형 건설사 40개 중 227개 업체가 동화기업과 합께합니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/product/special`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	mixins: [common],
	data: () => ({
		models: {
			company: null,
			name: null,
			hand: null,
			tel: null,
			email: null,
		},
		privateTermsCheck: false,
		timeModel: null,
		confirmRemove: false,
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER']),
		allowValue() {
			let check = false
			const checkValue = ['company', 'name', 'hand', 'email']
			for (let i of checkValue) {
				if (this.models[i] === null) return true
			}

			if (this.timeModel === null) return true
			if (!this.privateTermsCheck) return true

			return check
		},
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {
		this.resetData()
	},
	methods: {
		...mapMutations(['APP_MU_DIALOG']),
		resetData() {
			this.models = {
				company: null,
				name: null,
				hand: null,
				tel: null,
				email: null,
			}
			this.privateTermsCheck = false
			this.timeModel = null
		},
		async onApiCallItem() {
			const params = {
				companyname: this.models.company,
				custname: this.models.name,
				hand: this.models.hand,
				tel: this.models.tel,
				email: this.models.email,
				contact_time: this.timeModel,
				regi_userid: this.AUTH_GET_USER ? this.AUTH_GET_USER.login_id : null,
			}

			console.log('params', params)

			try {
				await apiHome.product.SpacialPost(params)
				this.APP_MU_DIALOG({
					dialog: true,
					title: '특판문의',
					text: `특판문의가 등록되었습니다.`,
				})
				this.resetData()
			} catch (e) {
				this.APP_MU_DIALOG({
					dialog: true,
					title: null,
					text: `${e}`,
				})
			}
		},
	},
}
</script>

<style scoped lang="scss">
// 비주얼영역
.img_green {
	.top {
		p {
			font-family: 'NanumMyeongjo' !important;
			font-size: 30px !important;
			color: #d2e5c2 !important;
		}
		div {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 15px !important;
			color: #fff !important;
			.em {
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 18px !important;
			}
		}
	}
	.line {
		width: 100% !important;
		height: 1px !important;
		background-color: #416d65 !important;
	}
	.bottom {
		color: #fff !important;
		p {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 16px !important;
		}
		span {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 14px !important;
		}
	}
}

// 제품소개
.intro {
	color: #262626 !important;
	.type {
		font-family: 'Roboto-Regular' !important;
		font-size: 14px !important;
	}
	.text {
		.tit {
			.category {
				font-family: 'Roboto-Bold' !important;
				font-size: 16px !important;
			}
			.name {
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 18px !important;
			}
		}
		.line {
			width: 30px !important;
			height: 1px !important;
			background-color: #b2b2b2 !important;
		}
		.cont {
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 14px !important;
			line-height: 1.5;
		}
	}
}

// 품질인증
.quality {
	background-color: #f1f2f3 !important;
	word-break: keep-all !important;
	color: #262626;
	.gradient {
		background: linear-gradient(to right, #b48534 0%, #efd09c 50%, #b48534 100%);
	}
	.tit {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
	}
	.num {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
	}
}

// 특판문의하기
.register {
	.body {
		.table {
			border-bottom: 1px solid #ccc;
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

@media all and (min-width: 1264px) {
	.img_green {
		max-height: 700px;
	}
}
@media all and (min-width: 960px) and (max-width: 1263px) {
	.img_green {
		max-height: 700px;
	}
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.img_green {
		max-height: 700px;
	}
	.quality {
		.tit,
		.num {
			font-size: 12px !important;
		}
	}
}
@media all and (max-width: 600px) {
	.img_green {
		max-height: 700px;
		.top {
			p {
				font-size: 22px !important;
			}
			div {
				font-size: 12px !important;
				.em {
					font-size: 12px !important;
				}
			}
		}
		.bottom {
			p {
				font-size: 14px !important;
			}
			span {
				font-size: 12px !important;
			}
		}
	}

	.intro {
		.text {
			.tit {
				.category {
					font-size: 14px !important;
				}
				.name {
					font-size: 16px !important;
				}
			}
			.cont {
				font-size: 12px !important;
			}
		}
	}

	.quality {
		.tit,
		.num {
			font-size: 12px !important;
		}
	}

	.btn_privacy {
		* {
			font-size: 12px;
		}
	}
}
</style>
