<template>
	<div
		id="special"
		class="brand_intro"
	>
		<div class="pt-7 pb-5 pt-md-12 pb-md-10 part1">
			<div class="px-4 px-md-0 wrapper">
				<div class="mb-7 mb-md-11 tit tac">
					<span>
						소비자가 선호하는 1군 브랜드<br class="hidden-md-and-up" />
						동화자연마루의 대표 강마루 브랜드
					</span>
					<p class="mt-7 mt-md-2"><b>나투스진이</b> <span class="bg">특별한 이유?</span></p>
				</div>

				<!-- 동영상 -->
				<div class="d-table">
					<div
						class="d-cell left video_area"
						@click="onVideoPlay"
					>
						<v-row
							class="ma-0"
							align="center"
						>
							<video
								ref="videoPlayer"
								:poster="require(`@/assets/img/natus/img_brand1.jpg`)"
								controls
								preload
								muted
								webkit-playsinline=""
								playsinline
								class="video_player"
								width="100%"
							>
								<source
									:src="require(`@/assets/video/brand_natus.mp4`)"
									type="video/mp4"
								/>
							</video>
						</v-row>
					</div>

					<div class="py-6 py-md-0 d-cell tac right">
						<p class="mt-0 mt-lg-10 num">01</p>
						<div class="my-2 my-md-4 my-lg-7 line layout_align" />
						<p class="mb-3 mb-md-8 txt">찍힘 걱정 없는 마루</p>
						<p class="desc">
							신소재 NAF 코어를 사용해 <strong>찍힘,</strong> <br />
							<strong>생활 스크레치에 강해요 </strong>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-12 pb-10 part2">
			<div class="px-4 px-md-0 wrapper">
				<v-row class="ma-0">
					<v-col
						v-for="(item, i) in specialItems"
						:key="i"
						class="pa-0 mb-4 mb-md-0 item"
						cols="12"
						md="4"
						align="center"
					>
						<div class="mx-0 mx-md-4">
							<v-img
								eager
								:src="item.image"
								width="100%"
								height="100%"
								max-height="400"
							>
								<div class="py-5">
									<p class="mt-2 mt-lg-5 num">{{ item.number }}</p>
									<div class="my-md-2 my-lg-5 line" />
									<p
										class="txt"
										v-html="item.text"
									/>
									<v-img
										eager
										:src="item.icon"
										width="auto"
										height="100%"
										max-width="60"
										max-height="60"
										contain
										class="my-4 mt-lg-10 mb-lg-6"
									/>
									<p
										class="desc"
										v-html="item.description"
									/>
								</div>
							</v-img>
						</div>
					</v-col>
				</v-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeProductBrandNatusJinSpecial',
	components: {},
	props: {
		specialItems: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		observer: null,
	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		// video Observer등록
		this.observer = new IntersectionObserver(this.observerCallback, { threshold: 0.8 })

		const video = document.querySelectorAll('.video_area')
		video.forEach(el => {
			this.observer.observe(el)
		})
	},
	destroyed() {
		this.observer.disconnect()
	},
	methods: {
		observerCallback(entries) {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0) {
					this.onVideoPlay()
				}
			})
		},
		onVideoPlay() {
			console.log('play')
			const video = this.$refs.videoPlayer
			video.play()
		},
		onVideoPause() {
			console.log('pause')
			const video = this.$refs.videoPlayer
			video.pause()
		},
	},
}
</script>
<style scoped lang="scss">
.d-table {
	display: table;
	width: 100%;
}
.d-cell {
	display: table-cell;
}

.video_player {
	height: 100% !important;
}
.brand_intro {
	.part1 {
		background-color: #f1c2a9;
		.tit {
			color: $color_white;
			span {
				font-size: $font_tit;
				font-weight: $fw_regular;
			}
			p {
				font-size: 2.3rem;
				font-weight: $fw_bold;
				.bg {
					background-color: $color_font;
					font-size: 2.3rem;
					font-weight: $fw_bold;
					line-height: 1 !important;
				}
			}
		}
		.left {
			width: 60%;
			vertical-align: middle;
			position: relative;
			background-color: #000;
			.dim {
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5) !important;
				:deep(.v-image) {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
		.right {
			width: 40%;
			color: $color_white;
			background-color: #f0a780;
			.num {
				font-size: 4.26rem;
				font-weight: 700 !important;
			}
			.line {
				width: 1px;
				height: 50px;
				background-color: $color_white;
				transform: rotate(45deg);
			}
			.txt {
				font-size: $font_tit;
				font-weight: $fw_bold;
			}
			.desc {
				font-size: $font_xl;
				font-weight: $fw_normal;
			}
		}
	}
	.part2 {
		background-color: #402c3f;
		.row {
			margin: 0 -16px !important;
			.item {
				.num {
					color: $color_white;
					font-size: 2.84rem;
					font-weight: 700 !important;
					line-height: 1.2 !important;
				}
				.line {
					width: 1px;
					height: 40px;
					background-color: $color_white;
					transform: rotate(45deg);
				}
				.txt {
					color: $color_white;
					font-size: $font_tit;
					font-weight: $fw_bold;
					line-height: 1.2 !important;
				}
				.desc {
					color: $color_white;
					font-size: $font_xl;
					font-weight: $fw_normal;
				}
			}
		}
	}
}

@media all and (max-width: 959px) {
	.d-cell {
		display: block !important;
	}
	.brand_intro {
		.part1 {
			.tit {
				span {
					font-size: $font_lg !important;
				}
				p {
					font-size: $font_lg !important;
					.bg {
						font-size: $font_lg !important;
					}
				}
			}
			.left {
				width: 100% !important;
				.dim {
					:deep(.v-image) {
						width: 36px !important;
						height: 36px !important;
					}
				}
			}
			.right {
				width: 100% !important;
				.num {
					font-size: 1.9rem !important;
				}
				.line {
					height: 30px !important;
				}
				.txt {
					font-size: $font_lg !important;
				}
				.desc {
					font-size: $font_normal !important;
				}
			}
		}
		.part2 {
			.row {
				margin: 0 !important;
				.item {
					.num {
						font-size: 1.9rem !important;
					}
					.txt {
						font-size: $font_lg !important;
					}
					.desc {
						font-size: $font_normal !important;
					}
				}
			}
		}
	}
}
</style>
