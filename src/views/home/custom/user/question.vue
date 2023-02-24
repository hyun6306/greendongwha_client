<template>
	<div class="wrapper">
		<v-container
			class="pa-0"
			fluid
		>
			<v-col
				cols="12"
				class="pa-0"
				align="center"
			>
				<v-col
					cols="12"
					class="pa-0"
					align="center"
				>
					<h2 class="content_title">{{ common_title }}</h2>
				</v-col>

				<!-- 1:1문의 배너 -->
				<HomeCustomItemBanner :banner-items="bannerItems" />

				<!-- 자주묻는질문 -->
				<div class="pa-0 px-5 px-md-0 inner_wrapper">
					<v-col
						class="pa-0"
						cols="12"
					>
						<div
							class="btn_box mb-6"
							align="right"
						>
							<span class="pr-4">찾는 질문이 없다면?</span>
							<span
								class="btn_question py-1 px-3 clickCursor"
								@click="goRegiste"
							>
								1:1 문의하기
							</span>
						</div>

						<v-expansion-panels
							accordion
							elevation="0"
							class="panel"
						>
							<!-- 1번 질문 -->
							<v-expansion-panel>
								<v-expansion-panel-header>
									<div
										class="d-flex"
										align="start"
									>
										<div class="icon_question">Q</div>
										<div class="list_question">제품 인증서를 확인하고 싶습니다.</div>
									</div>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div
										class="d-flex pt-3"
										align="start"
									>
										<div class="icon_answer">A</div>
										<div class="list_answer">
											제품 인증서 페이지에서 <span class="point">제품별 인증서</span>를 확인하실 수
											있습니다.<br />
											동화자연마루는 주거 환경에 적합한 친환경 제품을 생산 판매하고 있습니다
										</div>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- 2번 질문 -->
							<v-expansion-panel>
								<v-expansion-panel-header>
									<div
										class="d-flex"
										align="start"
									>
										<div class="icon_question">Q</div>
										<div class="list_question">
											마루 종류가 너무 다양한 것 같아요. 어떤 마루를 시공하는 것이 좋을까요?
										</div>
									</div>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div
										class="pt-3 like"
										align="center"
									>
										<p class="tit">이런 마루가 좋아요!</p>
										<span class="sub_tit color_gray1">공간과 사람에 따라 어울리는 마루가 다릅니다.</span>
										<v-row class="ma-0 mt-5 justify-center talk-box">
											<v-col
												cols="12"
												md="6"
												class="left pa-6"
											>
												“집은 휴식의 공간이죠.”,<br />
												“이곳에서 여생을 보낼 생각이에요.”,<br />
												“시간이 흐를수 록 멋이 더해지는 마루가 있을까요?”,<br />
												“트렌디한 것보다 품격있는 인테리어가 좋아요.
												<div class="d-flex talk mt-3">
													<v-img
														class="mt-2"
														width="64"
														:src="require('@/assets/img/home/custom/icon_cs_6.png')"
													/>
													<strong
														align="start"
														class="ml-2 mt-4"
														>노후를 즐기는<br />건형님</strong
													>
												</div>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="right pa-6"
											>
												<div class="mb-2">
													<strong
														>건형님에게 가장 적합한 마루는?
														<span class="color_olive">원목마루!</span></strong
													>
												</div>
												시간이 흐를수록 멋이 더해지는 마루를 원한다면 <br />
												품격있는 인테리어 스타일을 원한다면<br />
												집안 활동이 적고 마루가 손상될 염려가 없다면<br />
												원목마루를 추천합니다!<br />
												<p class="mt-2">#휴식, #품격, #오래도록</p>
												<br />
												<CommonButtonsButton01
													name="원목마루 자세히보러가기 >"
													color="#42883d"
													class-name="font_12"
													rounded
													height="24"
													@click="$router.push('/product/search?type=kind&id=KC_00003').catch(() => {})"
												/>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="left pa-6"
											>
												“아이가 무럭무럭 크고 있어요.”,<br />
												“이곳에서 오래 살 생각이에요.”,<br />
												“나만의 인테리어 스타일을 원해요.”,<br />
												“관리하기도 편하고 오래 쓸 수 있는 마루였으면 좋겠어요.”
												<div class="d-flex talk mt-3">
													<v-img
														class="mt-2"
														width="64"
														:src="require('@/assets/img/home/custom/icon_cs_7.png')"
													/>
													<strong
														align="start"
														class="ml-2 mt-4"
														>가족과 함께하는<br />예주님</strong
													>
												</div>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="right pa-6"
											>
												<div class="mb-2">
													<strong
														>예주님에게 가장 적합한 마루는?
														<span class="color_olive">강마루!</span></strong
													>
												</div>
												폭 넓은 디자인 선택지를 원한다면, 오래쓰고 관리하기 편한<br />
												마루를 원한다면 헤링본·대청마루 등 나만의 스타일로<br />
												공간을 꾸미고 싶다면 강마루를 추천합니다!​
												<p class="mt-2">#휴식, #품격, #오래도록</p>
												<br />
												<CommonButtonsButton01
													name="강마루 자세히보러가기 >"
													color="#42883d"
													class-name="font_12"
													rounded
													height="24"
													@click="$router.push('/product/search?type=kind&id=KC_00001').catch(() => {})"
												/>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="left pa-6"
											>
												얼마간 살다가 다른 곳으로 이사할 계획이에요.”,<br />
												“인테리어에 너무 큰 지출을 하진 않을 거에요.”,<br />
												“아이가 생겼어요. 아주 적은 양의 유해물질이라도 걱정이 돼요.<br />
												<div class="d-flex talk mt-3">
													<v-img
														class="mt-2"
														width="64"
														:src="require('@/assets/img/home/custom/icon_cs_8.png')"
													/>
													<strong
														align="start"
														class="ml-2 mt-4"
														>달콤한 신혼을 꿈꾸는<br />지영님</strong
													>
												</div>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="right pa-6"
											>
												<div class="mb-2">
													<strong
														>지영님에게 가장 적합한 마루는?
														<span class="color_olive">강화마루!</span></strong
													>
												</div>
												마루용 본드를 사용하는 것이 꺼려진다면,<br />
												몇 년 안에 이사할 계획이라면, 다양한 마루 스타일을 원한다면<br />
												강화마루를 추천합니다!<br />
												<p class="mt-2">#비접착식 패턴, #합리적 가격, #다양한 스타일</p>
												<br />
												<CommonButtonsButton01
													name="강화마루 자세히보러가기 >"
													color="#42883d"
													class-name="font_12"
													rounded
													height="24"
													@click="$router.push('/product/search?type=kind&id=KC_00002').catch(() => {})"
												/>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="left pa-6"
											>
												“나만의 공간을 꾸미고 싶어요.”,<br />
												“원하는 인테리어 디자인이랑 어울리는지가 가장 중요해요.”,<br />
												“합리적인 가격이었으면 좋겠어요.”,<br />
												“거주 중에도 마루를 시공할 수 있을까
												<div class="d-flex talk mt-3">
													<v-img
														class="mt-2"
														width="64"
														:src="require('@/assets/img/home/custom/icon_cs_9.png')"
													/>
													<strong
														align="start"
														class="ml-2 mt-4"
														>혼자사는<br />혜은님</strong
													>
												</div>
											</v-col>
											<v-col
												cols="12"
												md="6"
												class="right pa-6"
											>
												<div class="mb-2">
													<strong
														>혜은님에게 가장 적합한 마루는?
														<span class="color_olive">강화마루!</span></strong
													>
												</div>
												인테리어에 큰 비용을 쓰긴 부담스럽다면,<br />
												다양한 마루 스타일을 원한다면, 거주중에 마루를 바꾸고 싶다면<br />
												강화마루를 추천합니다!
												<p class="mt-2">#합리적 가격, #다양한 스타일, #당일시공</p>
												<br />
												<CommonButtonsButton01
													name="강화마루 자세히보러가기 >"
													color="#42883d"
													class-name="font_12"
													rounded
													height="24"
													@click="$router.push('/product/search?type=kind&id=KC_00002').catch(() => {})"
												/>
											</v-col>
										</v-row>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- 3번 질문 -->
							<v-expansion-panel>
								<v-expansion-panel-header>
									<div
										class="d-flex"
										align="start"
									>
										<div class="icon_question">Q</div>
										<div class="list_question">
											나투스진 그린풀 황토 접착제의 친환경 인증을 확인하고 싶습니다.
										</div>
									</div>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div
										class="d-flex pt-3"
										align="start"
									>
										<div class="icon_answer">A</div>
										<div class="list_answer">
											나투스진 전용 접착제는 환경부 실내 건축자재<br />사전적합 확인 인증과 한국공기청정협회
											친환경 건축자재 인증을 받은 친환경 제품입니다.<br /><br />
											나투스진 전용 접착제는 황토와 라돈저감제를 함유하여 더욱 친환경적인 제품입니다.
											<v-img
												class="mt-2"
												width="160"
												:src="require('@/assets/img/home/custom/icon_green.jpg')"
											/>
										</div>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- 4번 질문 -->
							<v-expansion-panel>
								<v-expansion-panel-header>
									<div
										class="d-flex"
										align="start"
									>
										<div class="icon_question">Q</div>
										<div class="list_question">입주 청소를 하고 나서 마루가 상했습니다.</div>
									</div>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div
										class="d-flex pt-3"
										align="start"
									>
										<div class="icon_answer">A</div>
										<div class="list_answer">
											청소할 때, <strong>강알칼리성 세제나 계면활성제가 첨가된 제품사용을 지양</strong>하여
											주세요.<br />
											또한 청소용 파우더와 수세미를 사용하면 마루 표면이 손상될 수 있습니다.<br />
											스팀청소기는 주 1~2회 약한 강도로 사용하여주십시오. 마루에 물을 뿌리고 청소하면 마루가
											상할 수 밖에 없습니다.<br /><br />

											마루는 나무가 원재료입니다.
											<strong>물이나 화학성분에 강하지 않은 점, 항상 유의해주세요.</strong><br /><br />
											<div class="caution">
												<span class="tag pa-2">제품 사용을 위한 주의사항</span>
												<v-row class="ma-0 mt-4">
													<v-col
														cols="1"
														class="pa-0"
														align="center"
													>
														<v-img
															width="46"
															:src="require('@/assets/img/home/custom/icon_cs_1.png')"
														/>
													</v-col>
													<v-col
														cols="11"
														class="pa-0"
													>
														<ul>
															<li>권장 실내온도 15~25°C</li>
															<li>고온에서는 마루가 손상될 수 있습니다.</li>
															<li>
																겨울철 바닥에 깐 카펫트나 이불은 주기적으로 걷어내 환기시켜주세요
															</li>
														</ul>
													</v-col>
													<v-col
														cols="1"
														class="pa-0"
														align="center"
													>
														<v-img
															width="46"
															:src="require('@/assets/img/home/custom/icon_cs_2.png')"
														/>
													</v-col>
													<v-col
														cols="11"
														class="pa-0"
													>
														<ul>
															<li>적정습도(50~60%)를 유지해주세요.</li>
															<li>바닥에 물기가 많거나 고여 있으면 마루가 손상될 수 있습니다.</li>
															<li>가습기 장기간 사용시, 바닥에 방수매트를 깔아주세요.</li>
															<li>
																보일러, 싱크대 등 배관에서 마루로 물이 새지 않는지 체크해주세요.
															</li>
															<li>화분 받침대를 꼭 사용해주세요.</li>
														</ul>
													</v-col>
													<v-col
														cols="1"
														class="pa-0"
														align="center"
													>
														<v-img
															width="46"
															:src="require('@/assets/img/home/custom/icon_cs_3.png')"
														/>
													</v-col>
													<v-col
														cols="11"
														class="pa-0"
													>
														<ul>
															<li>무거운 물건을 옮길 때에는 마루가 긁히지 않도록 조심해주세요.</li>
															<li>
																마루 표면이 긁혔다면 부분교체(유상)를 받거나, 목공보수제(마루
																보수용 메꿈제 등)를 사용해주세요.
															</li>
															<li>
																출입구에 매트를 깔면, 모래∙흙 ∙먼지로 인한 마루 긁힘을 미연에
																방지할 수 있습니다.
															</li>
														</ul>
													</v-col>
													<v-col
														cols="1"
														class="pa-0"
														align="center"
													>
														<v-img
															width="46"
															:src="require('@/assets/img/home/custom/icon_cs_4.png')"
														/>
													</v-col>
													<v-col
														cols="11"
														class="pa-0"
													>
														<ul>
															<li>
																스팀청소기는 주 1~2회 약한 강도로 사용해주세요.<br />
																<span class="color_gray1"
																	>마루결 방향으로 사용하시되, 한 곳에 집중 분사하면 마루가
																	손상될 수 있습니다.</span
																>
															</li>
															<li>바닥을 닦을 때는 물기를 짠 걸레를 사용해주세요.</li>
															<li>
																면에 이물질(기름 등)이 묻으면 마루 전용 클리너를 사용해주세요.
															</li>
															<li>
																청소용 파우더 ∙수세미를 사용하면 마루 표면이 손상될 수 있습니다.
															</li>
														</ul>
													</v-col>
													<v-col
														cols="1"
														class="pa-0 bc_tr"
														align="center"
													>
														<v-img
															width="46"
															:src="require('@/assets/img/home/custom/icon_cs_5.png')"
														/>
													</v-col>
													<v-col
														cols="11"
														class="pa-0 bc_tr"
													>
														<ul>
															<li>
																강알칼리성 세제나 계면활성제가 첨가된 제품을 사용하면 마루가
																손상됩니다.
															</li>
															<li>표면에 왁스나 니스 등 코팅은 삼가해주세요.</li>
														</ul>
													</v-col>
												</v-row>
											</div>
										</div>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- 5번 질문 -->
							<v-expansion-panel>
								<v-expansion-panel-header>
									<div
										class="d-flex"
										align="start"
									>
										<div class="icon_question">Q</div>
										<div class="list_question">
											동화자연마루 제품을 시공하였습니다. 품질보증번호는 어떻게 발급받나요?
										</div>
									</div>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div
										class="d-flex pt-3"
										align="start"
									>
										<div class="icon_answer">A</div>
										<div class="list_answer">
											<strong class="point">품질보증등록페이지,</strong> <strong>고객센터</strong>(<span
												class="point"
												>1899-2837</span
											>),(<span class="point">동화톡톡</span>) 상담원을 통해<br />
											품질보증번호를 발급받으실 수 있습니다.<br /><br />
											<p class="astro mb-2">
												고객센터 운영시간 : 평일 09:00~17:00 (토, 일 휴무)<br />
												품질보증등록을 하시면 나투스진 / 나투스 듀오 / 강화마루 / 디자인월 제품에 한해
												품질보증기간이 3년에서 최대 10년으로 연장됩니다.
											</p>
											<p class="astro">
												일부품목 제외<br />
												자세한 내용은 <span class="point">품질보증등록</span>을 확인해주세요.
											</p>
											<br /><br />
										</div>
									</div>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</div>
			</v-col>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeCustomQuestion',
	metaInfo: {
		title: '1:1문의하기 | 동화자연마루',
		meta: [
			{
				vmid: 'title',
				property: 'og:title',
				content: '1:1문의하기 | 동화자연마루',
			},
			{
				vmid: 'keywords',
				property: 'keywords',
				content: '1:1문의하기',
			},
			{
				vmid: 'description',
				property: 'og:description',
				content: '동화자연마루에 대한 궁금한 점이 있으시면 무엇이든 물어보세요.',
			},
			{
				vmid: 'url',
				property: 'og:url',
				content: `${process.env.VUE_APP_BASIC_SERVER}/custom/question`,
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
		bannerItems: {
			image: require('@/assets/img/home/custom/icon_question.png'),
			title: '동화자연마루에 대한 궁금한 점이 있으시면 무엇이든 물어보세요.',
			text: '고객님이 등록하신 문의 내용의 답변은 알림톡이나 My Page > 문의 내역에서 확인하실 수 있습니다.',
			text2: '운영시간은 평일 09:00 ~ 17:00이며 최대한 빠른 시간 내 답변 드리도록 하겠습니다',
		},
	}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {},
	methods: {
		goRegiste() {
			if (this.AUTH_GET_USER_AUTH !== 'GEUST') return this.$router.push('/user/create/3')
			this.$router.push('/login')
		},
	},
}
</script>

<style scoped lang="scss">
.btn_box {
	color: #777;
	font-size: 14px;
	.btn_question {
		border: 1px solid #000;
		color: #000;
		font-size: 13px;
	}
}
.panel {
	border-radius: 0 !important;
	border-top: 2px solid #000 !important;
	.v-expansion-panel-header--active {
		border-bottom: 1px solid #ccc;
	}
	.icon_question,
	.icon_answer {
		padding-right: 14px;
		font-family: 'Roboto-Bold';
		font-size: 20px;
		color: #42883d;
		letter-spacing: -0.5px;
	}
	.list_question,
	.list_answer {
		padding-top: 2px;
		font-size: 15px;
		font-family: 'NotoSansKR-Regular';
		color: #000;
		text-align: start;
		line-height: 1.5;
		letter-spacing: -0.5px;
		.point {
			color: #42883d;
		}
		.astro {
			position: relative;
			padding-left: 10px !important;
		}
		.astro::before {
			position: absolute;
			top: 0;
			left: 0;
			content: '*';
			color: #42883d;
		}
		.caution {
			.tag {
				font-size: 13px;
				color: #fff;
				background-color: #5f6062;
			}
			ul {
				li {
					position: relative;
					padding-left: 15px;
					list-style: none !important;
				}
				li:before {
					content: '-';
					position: absolute;
					left: 0;
				}
			}
			.col {
				&.bc_tr {
					border-bottom: 1px solid transparent !important;
				}
				padding: 10px 0 !important;
				border-bottom: 1px solid #ccc !important;
			}
		}
	}
	.like {
		.tit {
			font-family: 'NotoSansKR-Bold';
			font-size: 18px;
		}
		.sub_tit {
			font-family: 'NotoSansKR-Regular';
			font-size: 14px;
		}
		.talk-box {
			border-top: 1px solid #ccc;
			border-right: 1px solid #ccc;
			border-left: 1px solid #ccc;
		}
		.left {
			border-right: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			text-align: center;
			vertical-align: middle;
			letter-spacing: -0.5px;
			background-color: #f1f2f3;
			word-break: keep-all;
			.talk {
				justify-content: center;
				.v-image {
					max-width: 64px !important;
				}
			}
		}
		.right {
			strong {
				font-size: 16px;
			}
			p {
				font-weight: 700;
			}
			.v-btn {
				margin: 0 auto;
				min-width: 150px !important;
			}
			text-align: center;
			letter-spacing: -0.5px;
			border-bottom: 1px solid #ccc;
			word-break: keep-all;
		}
	}
}
:deep(.v-expansion-panel::before) {
	box-shadow: none !important;
}
:deep(.v-expansion-panel:not(:first-child)::after) {
	border-top: none !important;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.like {
		.left {
			font-size: 11px !important;
			border-right: none !important;
		}
		.right {
			strong {
				font-size: 13px;
			}
			font-size: 11px !important;
		}
	}
	.panel {
		.icon_question,
		.icon_answer {
			padding-right: 12px;
		}
		.list_question,
		.list_answer {
			font-size: 12px;
		}
	}
}
@media all and (max-width: 380px) {
	.like {
		.left {
			font-size: 11px !important;
			border-right: none !important;
		}
		.right {
			strong {
				font-size: 13px;
			}
			font-size: 11px !important;
		}
	}
	.panel {
		.icon_question,
		.icon_answer {
			padding-right: 12px;
		}
		.list_question,
		.list_answer {
			font-size: 12px;
		}
	}
}
</style>
