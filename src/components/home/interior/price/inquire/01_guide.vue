<template>
	<div class="wrapper">
		<v-container
			class="pa-0 pt-5 pt-md-15 px-3"
			fluid
		>
			<div class="guide_guide">
				<v-col
					class="inner"
					cols="12"
					md="10"
					align="center"
				>
					<div class="guide_txt">
						<p class="mb-4 mb-md-7 tit">견적상담 신청서</p>
						<p class="mb-4 sub">
							인테리어는 하고싶은데.. <br />
							어디서부터 어떻게 해야 할 지 막막하셨죠?
						</p>
						<p class="sub">
							간단하게 작성하는 우리집 <strong>인테리어 상담 신청서!</strong><br />
							인테리어점 찾고 신청서 작성만 하면 끝!
						</p>
					</div>

					<v-col
						v-if="AUTH_GET_USER_AUTH === 'GUEST'"
						align="center"
						class="pt-5"
					>
						<p>* 동화자연마루 회원이시라면 로그인 후 이용 부탁 드립니다.</p>
						<v-btn
							text
							color="primary"
							@click="$router.push('/login')"
						>
							<h3>로그인 하기 ></h3>
						</v-btn>
					</v-col>

					<v-divider class="my-7 my-md-9" />

					<v-row class="ma-0 step">
						<v-col
							class="pa-0 mb-7 mb-md-0 item"
							cols="12"
							md="4"
							align="center"
						>
							<span class="py-2 py-md-3 px-4 px-md-5 step_num">STEP 1</span>
							<div class="icon mt-3 mt-md-9">
								<div class="pa-4 pa-md-8">
									<v-img
										max-width="60"
										max-height="54"
										:src="require('@/assets/img/icon/icon_gate_1.png')"
									/>
								</div>
							</div>
							<div class="mt-4 mt-md-8 txt">
								<p class="mb-2 mb-md-3 tit">인테리어점 찾기</p>
								<p class="sub">우리집에서 가까운</p>
								<p class="sub">인테리어 전문점 찾기</p>
							</div>
							<v-img
								class="arrow_step"
								width="30"
								height="60"
								:src="require('@/assets/img/icon/arrow_step.png')"
							/>
						</v-col>

						<v-col
							class="pa-0 mb-7 mb-md-0 item"
							cols="12"
							md="4"
							align="center"
						>
							<span class="py-3 px-5 step_num">STEP 2</span>
							<div class="icon mt-3 mt-md-9">
								<div class="pa-4 pa-md-8">
									<v-img
										max-width="60"
										max-height="54"
										:src="require('@/assets/img/icon/icon_gate_2.png')"
									/>
								</div>
							</div>
							<div class="mt-4 mt-md-8 txt">
								<p class="mb-2 mb-md-3 tit">신청서 작성</p>
								<p class="sub">상담 받으실 연락정보 및</p>
								<p class="sub">문의사항 입력!</p>
							</div>

							<v-img
								class="arrow_step"
								width="30"
								height="60"
								:src="require('@/assets/img/icon/arrow_step.png')"
							/>
						</v-col>

						<v-col
							class="pa-0 item"
							cols="12"
							md="4"
							align="center"
						>
							<span class="py-3 px-5 step_num">STEP 3</span>
							<div class="icon mt-3 mt-md-9">
								<div class="pa-4 pa-md-8">
									<v-img
										max-width="60"
										max-height="54"
										:src="require('@/assets/img/icon/icon_gate_3.png')"
									/>
								</div>
							</div>
							<div class="mt-4 mt-md-8 txt">
								<p class="mb-2 mb-md-3 tit">신청 완료</p>
								<p class="sub">전문 인테리어점과</p>
								<p class="sub">전화 상담 진행!</p>
								<p class="sub">(영업일 기준 3~4일 소요)</p>
							</div>
						</v-col>
					</v-row>

					<v-col
						class="pa-0 mt-11 layout_align"
						cols="10"
						md="4"
					>
						<CommonButtonsButton01
							class="btn_consulting"
							name="견적상담 신청하러 가기 〉"
							color="#00582c"
							height="62"
							@click="$emit('selectTab', 1)"
						/>
					</v-col>
				</v-col>

				<v-col
					class="pa-0 mt-9"
					cols="12"
					align="center"
				>
					<p class="already">이미 <strong>상담신청</strong>을 하셨다구요?</p>
					<v-col
						class="pa-0 mt-3"
						cols="4"
						md="2"
					>
						<CommonButtonsButton01
							class="btn_history"
							name="상담 내역 확인"
							color="#ccc"
							height="50"
							outlined
							@click="$emit('selectTab', 3)"
						/>
					</v-col>
				</v-col>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'HomeInteriorPriceInquireGuide01',
	mixins: [common],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
	},
	watch: {},
	created() {},
	mounted() {},
	destroyed() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.guide_guide {
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
	.guide_txt {
		.tit {
			color: $color_font;
			font-size: $font_tit;
			font-weight: $fw_bold;
		}
		.sub {
			color: $color_gray1;
			font-size: 1.065rem;
			font-weight: $fw_normal;
		}
	}
	.item {
		position: relative;
		.arrow_step {
			display: block;
			position: absolute;
			right: -20px;
			top: 120px;
		}
	}
	.step {
		.step_num {
			display: inline-block;
			color: $color_font;
			font-size: 0.9375rem;
			font-weight: $fw_bold;
			background-color: #e7f8f1;
			border-radius: 100px;
		}
		.icon > div {
			display: inline-block;
			border-radius: 100%;
			border: 1px solid #c2f3e0;
		}
	}

	.txt {
		.tit {
			font-size: $font_lg;
			font-weight: $fw_bold;
			line-height: 1 !important;
		}
		.sub {
			color: $color_gray1;
			font-size: $font_normal;
			font-weight: $fw_normal;
			line-height: 1.3 !important;
		}
	}
	.already {
		p {
			color: $color_font;
			font-size: $font_lg;
			font-weight: $fw_normal;
		}
	}
}
@media all and (max-width: 959px) {
	.guide_guide {
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
		.guide_txt {
			.tit {
				font-size: $font_xl;
			}
			.sub {
				font-size: 0.923rem;
			}
		}
		.item {
			.arrow_step {
				display: none !important;
			}
		}
		.step {
			.step_num {
				font-size: $font_sm !important;
				border-radius: 100px;
			}
			.icon > div {
				:deep(.v-image) {
					max-width: 35px !important;
				}
			}
		}
		.txt {
			.tit {
				font-size: $font_normal;
			}
			.sub {
				font-size: $font_sm;
			}
		}
		.already {
			p {
				color: $color_font;
				font-size: $font_lg;
				font-weight: $fw_normal;
			}
		}
	}
}
</style>
