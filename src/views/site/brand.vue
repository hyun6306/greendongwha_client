<template>
	<v-container
		class="pa-0"
		fluid
	>
		<!-- 상단배너 -->
		<v-col class="pa-0 mb-7 mb-md-10">
			<v-img
				width="100%"
				height="180"
				:src="require('@/assets/img/fnb/brand/slogan.jpg')"
				eager
				class="slogan"
			>
				<div class="wrapper px-5 mt-6 mt-md-10">
					<p class="mb-2">Brand Story</p>
					<span>1948년 설립된 동화기업은 대한민국 No.1 목질 전문기업입니다. </span>
					<br class="pc_only" />
					<span>70년 역사의 목질 전문기업이 당신의 행복한 내일을 만들겠습니다.</span>
				</div>
			</v-img>
		</v-col>

		<!-- 10년 품질보증 -->
		<div class="wrapper px-5 mb-16">
			<v-col
				class="pa-0"
				cols="12"
				align="center"
			>
				<v-img
					eager
					width="70"
					height="80"
					class="mb-3"
					:src="require('@/assets/img/home/custom/icon_10years.png')"
				/>
				<v-card class="feature_tit pb-3 mb-8">
					<p>최대 10년 품질 보증 서비스로 안심하세요.</p>
					<span>최대 7년이상 사용하는 인테리어, 동화자연마루 그린서비스에서 품질 보증 받으세요.</span>
				</v-card>
				<v-col
					class="pa-0 brand_text"
					cols="12"
					align="center"
				>
					<p class="color_olive mb-1">"<span>마루 누적 판매 6,600만평</span>"</p>
					<span>국내 360만 가구에서 시공한 대한민국 최고의 마루 브랜드 입니다.</span>
				</v-col>
				<v-row class="ma-0 mt-16">
					<v-col
						class="pa-0"
						cols="12"
						sm="4"
						align="center"
					>
						<div class="mr-0 mr-sm-1 circle_piece c_01">
							<p class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>01</span>
								</v-img>
							</p>
							<p>국내 최초 강화마루 생산</p>
							<span>새로운 주거 문화를 만들다.</span>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="12"
						sm="4"
						align="center"
					>
						<div class="mx-0 mx-sm-1 mt-10 mt-sm-0 circle_piece c_02">
							<div class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>02</span>
								</v-img>
							</div>
							<p>목질 벽장재 시장 개척</p>
							<span>벽장재의 새로운 대안을 만나다.</span>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="12"
						sm="4"
						align="center"
					>
						<div class="ml-0 ml-sm-1 mt-10 mt-sm-0 circle_piece c_03">
							<div class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>03</span>
								</v-img>
							</div>
							<p>국내 최초 친환경 NAF마루 출시</p>
							<span>친환경 제품에 앞장서다.</span>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</div>

		<!-- 가장 좋은 제품 -->
		<v-col
			cols="12"
			class="bg_gray py-10 mb-10"
		>
			<div class="wrapper px-5">
				<v-col
					class="pa-0"
					cols="12"
				>
					<v-card class="feature_tit pb-3 mb-8">
						<p>가장 좋은 제품</p>
						<span>최고의 설비와 기술력을 바탕으로 국내 주거환경에 가장 적합한 제품을 만듭니다.</span>
					</v-card>
					<v-row
						class="ma-0"
						align="center"
					>
						<v-col
							class="pa-0"
							cols="12"
							sm="7"
							md="8"
							align="center"
						>
							<v-img
								eager
								width="520"
								:src="require('@/assets/img/fnb/brand/img_board.png')"
							/>
						</v-col>
						<v-col
							class="pa-0 text-center text-sm-left"
							cols="12"
							sm="5"
							md="4"
						>
							<p class="hdf">
								기존 HDF보다 물에 더 강하고<br />
								포름알데히드를 첨가하지 않은<br />
								<span>신소재나프(NAF:Non-Added Fomaldehyde)</span><br />
								보드개발
							</p>
						</v-col>
					</v-row>
				</v-col>
			</div>
		</v-col>

		<!-- 품질관리 -->
		<div class="wrapper px-5 mb-16">
			<v-col
				class="pa-0"
				cols="12"
			>
				<v-card class="feature_tit pb-3 mb-8">
					<p>건강을 최우선으로 생각한 친환경 제품</p>
					<span>동화자연마루 친환경 인증</span>
				</v-card>
				<v-col
					class="pa-0 brand_text"
					cols="12"
					align="center"
				>
					<p class="color_olive mb-10">"<span>엄격한 품질관리</span>"</p>
				</v-col>
				<v-row
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						sm="5"
						align="center"
					>
						<v-img
							eager
							width="350"
							:src="require('@/assets/img/fnb/brand/img_querity01.jpg')"
						/>
					</v-col>
					<v-col
						cols="12"
						sm="5"
						align="center"
					>
						<v-img
							eager
							width="430"
							:src="require('@/assets/img/fnb/brand/img_querity02.jpg')"
						/>
					</v-col>
				</v-row>
			</v-col>
		</div>

		<!-- 그린서비스 -->
		<v-col
			class="bg_gray py-10 mb-16"
			cols="12"
		>
			<div class="wrapper px-5">
				<v-card class="feature_tit pb-3 mb-8">
					<p>동화자연마루 그린서비스</p>
					<span>동화자연마루 그린서비스는, 시공부터 AS까지 원스톱으로 제공하는 시공서비스입니다.</span>
				</v-card>
				<v-col
					cols="12"
					class="pa-0 brand_text"
					align="center"
				>
					<p class="color_olive mb-1">"<span>동화자연마루 그린서비스로 안심하세요</span>"</p>
					<span>제품을 잘 알아야 시공도 잘 합니다.</span>
				</v-col>

				<v-row class="ma-0 mt-16">
					<v-col
						class="pa-0"
						cols="12"
						md="4"
						align="center"
					>
						<div class="mr-0 mr-md-1 circle_piece c_01">
							<p class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>01</span>
								</v-img>
							</p>
							<span>
								마루는 제품만큼 시공 품질이 중요합니다.<br />
								마루 전문가에서 시공하세요.<br />
								시공 서비스가 다르면 인테리어도 다릅니다.
							</span>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="12"
						md="4"
						align="center"
					>
						<div class="mx-0 mx-md-1 mt-10 mt-md-0 circle_piece c_02">
							<div class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>02</span>
								</v-img>
							</div>
							<span>
								동화자연마루의 그린 서비스는<br />
								고객 여러분께 더 나은 시공 품질을<br />
								약속합니다.
							</span>
						</div>
					</v-col>
					<v-col
						class="pa-0"
						cols="12"
						md="4"
						align="center"
					>
						<div class="ml-0 ml-md-1 mt-10 mt-md-0 circle_piece c_03">
							<div class="circle">
								<v-img
									eager
									width="55"
									class="wing mt-4"
									:src="require('@/assets/img/fnb/brand/img_wing.png')"
								>
									<span>03</span>
								</v-img>
							</div>
							<span>
								제품을 누구보다 잘 아는<br />
								동화자연마루 그린서비스에서<br />
								시공하세요
							</span>
						</div>
					</v-col>
				</v-row>
				<p
					class="hash mt-10"
					align="center"
				>
					#체계적인 시공,#본사 직접관리,교육<br />#시공품질표준화,#서비스교육받은 전문기사 시공
				</p>
			</div>
		</v-col>

		<!-- 대외수상 -->
		<div class="wrapper px-5">
			<v-col
				class="pa-0"
				cols="12"
			>
				<v-card class="feature_tit pb-3 mb-8">
					<p>대외 수상 현황</p>
				</v-card>
				<v-row class="ma-0">
					<v-col
						v-for="(item, i) in SITE_GET_BRAND_CERTIFICATION"
						:key="i"
						class="pa-0"
						cols="6"
						sm="4"
						md="3"
						align="center"
					>
						<div class="mx-2">
							<v-img
								v-if="item.thumimage_url"
								class="mb-3"
								width="80"
								:src="item.thumimage_url"
								eager
							/>
							<p
								v-if="item.docu_name"
								class="award_tit"
							>
								{{ item.docu_name }}
							</p>
							<p
								v-if="item.authority"
								class="award_part"
							>
								{{ item.authority }}
							</p>
							<p
								v-if="item.auth_from"
								class="award_date"
							>
								{{ item.auth_from.substring(0, 4) }}
							</p>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</div>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'SiteBrand',
	metaInfo: {
		title: '브랜드스토리ㅣ동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '브랜드스토리ㅣ동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '동화자연마루 브랜드스토리',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content:
					'1948년 설립된 동화기업은 대한민국 No.1 목질 전문기업입니다. 70년 역사의 목질 전문기업이 당신의 행복한 내일을 만들겠습니다.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/site/brand`,
			},
			{
				vmid: 'og:image',
				property: 'og:image',
				content: 'https://www.greendongwha.com/main.png',
			},
		],
	},
	data: () => ({}),
	computed: {
		...mapGetters(['SITE_GET_BRAND_CERTIFICATION']),
	},
	watch: {},
	async created() {
		if (this.SITE_GET_BRAND_CERTIFICATION.length === 0) await this.getCertList()
	},
	mounted() {},
	methods: {
		...mapActions(['SITE_ACT_BRAND_CERTIFICATION']),
		async getCertList() {
			this.loading = true
			const items = {
				method: 'get',
				params: {
					docu_kind: '1',
					exposure_yn: 'Y',
					regi_date_s: '',
					regi_date_e: '',
					subject_code: '',
					docu_name: '',
				},
			}
			await this.SITE_ACT_BRAND_CERTIFICATION(items).then(res => {
				console.log('SITE_ACT_BRAND_CERTIFICATION', res)
			})
		},
	},
}
</script>

<style scoped lang="scss">
.bg_gray {
	background-color: #f8f8f8 !important;
}

// 상단배너
.slogan {
	color: #fff;
	text-align: center;
	p {
		font-family: 'Roboto-Bold' !important;
		font-size: 30px !important;
	}
	span {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
		word-break: keep-all !important;
	}
}

// 브랜드 어필문구
.brand_text {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	word-break: keep-all;
	p {
		font-size: 20px !important;
		span {
			font-family: 'NotoSansKR-Bold' !important;
			border-bottom: 1px solid #42883d;
		}
	}
}

// 날개..
.circle_piece {
	position: relative;
	padding: 64px 0 40px !important;
	color: #fff !important;
	p {
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 16px !important;
	}
	span {
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px !important;
	}
	.circle {
		width: 65px !important;
		height: 65px !important;
		border-radius: 50% !important;
		position: absolute !important;
		top: -25px !important;
		left: 50% !important;
		transform: translateX(-50%) !important;
		.wing {
			span {
				font-family: 'Roboto-Regular' !important;
				font-size: 18px !important;
				color: #d5ecd3 !important;
			}
		}
	}
	&.c_01 {
		background-color: #70b341 !important;
		.circle {
			background-color: #70b341 !important;
		}
	}
	&.c_02 {
		background-color: #44883d !important;
		.circle {
			background-color: #44883d !important;
		}
	}
	&.c_03 {
		background-color: #00592d !important;
		.circle {
			background-color: #00592d !important;
		}
	}
}

// HDF설명
.hdf {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	line-height: 1.5;
	span {
		padding: 2px 3px;
		background-color: #44883d;
		color: #fff;
	}
}

// 대외수상
.award_tit {
	font-family: 'NotoSansKR-Bold' !important;
	font-size: 15px !important;
	word-break: keep-all;
}
.award_part {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 14px !important;
	word-break: keep-all;
}
.award_date {
	font-family: 'Roboto-Regular' !important;
	font-size: 14px !important;
}

.hash {
	font-family: 'NotoSansKR-Regular' !important;
	font-size: 15px !important;
	color: #777;
	line-height: 1.5;
}

@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.slogan {
		height: 150px !important;
		p {
			font-size: 24px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.circle_piece {
		p {
			font-size: 13px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
}
@media all and (max-width: 600px) {
	.pc_only {
		display: none !important;
	}
	.slogan {
		height: 150px !important;
		p {
			font-size: 24px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.brand_text {
		font-size: 13px !important;
		p {
			font-size: 16px !important;
		}
	}
	.circle_piece {
		padding: 55px 0 25px !important;
		p {
			font-size: 13px !important;
		}
		span {
			font-size: 13px !important;
		}
	}
	.hdf {
		font-size: 13px !important;
	}
}
</style>
