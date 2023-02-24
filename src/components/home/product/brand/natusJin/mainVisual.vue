<template>
	<div class="wrapper mt-0 mt-md-12">
		<div class="main_visual">
			<v-img
				:src="require('@/assets/img/natus/img_visual.jpg')"
				width="100%"
				max-height="420"
			/>

			<div class="intro">
				<v-row class="ma-0 px-4 px-md-10">
					<v-col
						class="pa-0"
						cols="12"
						lg="5"
					>
						<v-img
							class="logo"
							:src="require('@/assets/img/natus/logo_natusjin.svg')"
							width="100%"
							max-width="414"
							max-height="114"
						/>
						<div class="mt-3 mt-md-5 slogan">
							<span>찍힘 걱정 없이 예쁜 마루!</span>
							<p>나투스진</p>
						</div>
					</v-col>

					<v-col
						class="pa-0 icon_group hidden-md-and-down"
						cols="12"
						lg="7"
					>
						<v-row class="ma-0 justify-end">
							<v-col
								v-for="(item, i) in introItems"
								:key="i"
								class="pa-0 px-5"
								cols="auto"
								align="center"
							>
								<div>
									<v-img
										class="mb-3"
										:src="item.image"
										width="100%"
										max-width="58"
										height="58"
									/>
								</div>
								<div
									class="desc"
									v-html="item.description"
								/>
							</v-col>
						</v-row>
						<div class="line" />
					</v-col>
				</v-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeProductBrandNatusJinMainVisual',
	components: {},
	data: () => ({
		introItems: [
			{
				description: '<strong>친환경 소재</strong>로 <br /><strong>안심</strong>할 수 있어요!',
				image: require('@/assets/img/natus/icon_core_1.svg'),
			},
			{
				description: '<strong>생활 스크래치</strong>에 <br /><strong>강</strong>해요!',
				image: require('@/assets/img/natus/icon_core_2.svg'),
			},
			{
				description: '<strong>디자인이 트렌디해</strong> <br /><strong>선택의폭</strong>이 넓어요!',
				image: require('@/assets/img/natus/icon_core_3.svg'),
			},
			{
				description: '<strong>10년품질보증</strong>으로 <br />걱정 없어요!',
				image: require('@/assets/img/natus/icon_core_4.svg'),
			},
		],
	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.main_visual {
	position: relative;
	.intro {
		display: block;
		width: 100%;
		position: absolute;
		bottom: -125px;
		.slogan {
			color: $color_font;
			span {
				font-size: 1.8rem;
				font-weight: $fw_normal;
			}
			p {
				font-size: 2.1rem;
				font-weight: $fw_bold;
			}
		}
		.icon_group {
			margin-top: -50px;
			.desc {
				color: #672666 !important;
			}
			.line {
				height: 2px;
				margin-top: 57px;
				margin-right: -40px !important;
				background-color: #672666;
			}
		}
	}
}
@media all and (max-width: 959px) {
	.main_visual {
		:deep(.v-image) {
			max-height: 160px !important;
		}

		.intro {
			bottom: -83px !important;

			:deep(.v-image) {
				max-width: 180px !important;
				max-height: 50px !important;
			}

			.slogan {
				span {
					font-size: $font_lg !important;
				}

				p {
					font-size: $font__sub_tit !important;
				}
			}
		}
	}
}
</style>
