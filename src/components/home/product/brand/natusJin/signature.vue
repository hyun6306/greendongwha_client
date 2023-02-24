<template>
	<div class="line_up pb-5 pb-md-10 natus_signature">
		<div class="px-4 px-md-0 wrapper">
			<v-col
				class="pa-0 py-2 py-md-7"
				align="center"
			>
				<span class="tit">NATUS JIN SIGNATURE</span>
			</v-col>
			<div class="mb-2 mb-md-10 img_cursor">
				<v-img
					eager
					:src="require('@/assets/img/natus/img_signature_1.jpg')"
					width="100%"
					max-height="530"
				>
					<div class="focus_item_group">
						<v-col
							v-for="(item, i) in signatureSelectItems"
							:key="i"
							class="pa-0 focus_item clickCursor"
							:class="`item_${i + 1} ${signatureSelectModel === item.value ? 'active' : ''}`"
							align="center"
							@click="$emit('selectSignature', item)"
						>
							<span
								class="btn"
								align="center"
							/>
							<br />
							<span class="name">{{ item.text }}</span>
						</v-col>
					</div>
				</v-img>
			</div>

			<v-row class="ma-0">
				<v-col
					class="pa-0 mb-5 mb-md-0"
					cols="12"
					md="6"
				>
					<div class="mr-0 mr-md-16">
						<v-row class="ma-0">
							<v-col
								class="pa-0"
								cols="6"
							>
								<div class="mr-2">
									<v-img
										eager
										:src="signatureSelectItem.image"
										width="100%"
										height="auto"
									/>
								</div>
							</v-col>
							<v-col
								class="pa-0 name_tag clickCursor"
								cols="6"
								@click="$emit('onClick', signatureSelectItem)"
							>
								<div class="ml-2">
									<v-img
										eager
										:src="signatureSelectItem.subImage"
										width="100%"
										height="auto"
									>
										<span class="py-1 px-3">{{ signatureSelectItem.label }}</span>
									</v-img>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-col>

				<v-col
					class="pa-0 short_cut"
					cols="12"
					md="4"
				>
					<div class="ml-0 ml-md-16">
						<div class="mb-3 hidden-md-and-down line" />
						<p
							class="mb-2 mb-md-5 desc"
							v-html="signatureSelectItem.description"
						/>
						<div
							class="pa-3 pa-md-4 mb-8 mb-md-13 size"
							v-html="signatureSelectItem.productInfo"
						/>
						<v-col
							class="pa-0 btn_wrap clickCursor"
							@click="$emit('onMenuClick', 'signatureSelect')"
						>
							<CommonButtonsButton01
								class="btn_link"
								height="60"
								name="제품 확인하러 가기"
								color="#672666"
							/>
							<v-img
								eager
								:src="require('@/assets/img/natus/icon_btn_arrow.svg')"
								width="56"
								height="56"
							/>
						</v-col>
					</div>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeProductBrandNatusJinSignature',
	components: {},
	props: {
		signatureSelectItems: {
			type: Array,
			default: () => [],
		},
		signatureSelectItem: {
			type: Object,
			default: () => {},
		},
		signatureSelectModel: {
			type: Number,
			default: 0,
		},
	},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>
<style scoped lang="scss">
.line_up {
	.tit {
		display: inline-block;
		margin: 0 auto;
		padding: 11px 22px;
		color: $color_font;
		font-size: $font_tit;
		font-weight: $fw_bold;
		background-color: $color_gray5;
		border-radius: 100px;
		line-height: 1;
	}

	.short_cut {
		.line {
			display: inline-block;
			width: 80px;
			height: 1px;
			background-color: $color_font;
		}

		.desc {
			color: $color_font;
			font-size: $font_xl;
			font-weight: $fw_bold;
		}

		.size {
			border: 1px solid $color_gray7;
			background-color: $color_white;
			border-radius: 8px;

			.name {
				color: $color_font;
				font-size: $font_lg;
				font-weight: $fw_bold;
			}

			span {
				color: $color_gray8;
				font-weight: $fw_normal;
			}
		}

		.btn_wrap {
			position: relative;

			.btn_link {
				border-radius: 4px !important;

				:deep(.v-btn__content) {
					font-size: $font_lg;
					font-weight: $fw_regular;
				}
			}

			:deep(.v-image) {
				position: absolute !important;
				top: -26px;
				right: 20px !important;
			}
		}
	}

	.name_tag {
		:deep(.v-image) {
			position: relative;

			span {
				display: inline-block;
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: $font_sm;
				background-color: $color_font;
				color: $color_white;
			}
		}
	}

	.img_cursor {
		position: relative;

		.focus_item_group {
			.focus_item {
				width: auto;
				position: absolute;

				.btn {
					position: relative;
					display: inline-block;
					width: 36px;
					height: 36px;
					border: 2px solid $color_white;
					border-radius: 100%;
					background-color: #f3864d;
					opacity: 0.5;

					&:after {
						display: block;
						width: 18px;
						height: 18px;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						border-radius: 100%;
						background-color: $color_white;
						content: '';
						opacity: 0;
					}
				}

				.name {
					display: inline-block;
					padding: 8px 20px;
					background-color: $color_white;
					border-radius: 100px;
					font-size: $font_lg;
					font-weight: $fw_bold;
					color: $color_font;
					box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
				}

				&.active {
					.btn {
						opacity: 1 !important;

						&:after {
							opacity: 1 !important;
						}
					}

					.name {
						background-color: #f3864d !important;
						color: $color_white !important;
					}
				}
			}
		}
	}

	&.natus_signature {
		background-color: #faefea;
		.tit {
			color: $color_white !important;
			background-color: $color_gray8 !important;
		}
		.img_cursor {
			.focus_item_group {
				.focus_item {
					&.item_1 {
						top: 55%;
						left: 24%;
					}
					&.item_2 {
						top: 40%;
						left: 55%;
					}
					&.item_3 {
						top: 68%;
						left: 73%;
					}
				}
			}
		}
	}
}

@media all and (max-width: 959px) {
	.line_up {
		.tit {
			padding: 6px 12px !important;
			font-size: $font_lg !important;
		}

		.short_cut {
			.desc {
				font-size: $font_lg !important;
			}
			.size {
				font-size: $font_normal !important;
				border: 1px solid $color_gray7;
				background-color: $color_white;
				border-radius: 8px;
			}
			.btn_wrap {
				.btn_link {
					height: 50px !important;
					:deep(.v-btn__content) {
						font-size: $font_normal !important;
					}
				}
				:deep(.v-image) {
					width: 48px !important;
					height: 48px !important;
					right: 30px !important;
				}
			}
		}

		.name_tag {
			:deep(.v-image) {
				span {
					display: block !important;
					width: 100% !important;
					text-align: center !important;
				}
			}
		}

		.img_cursor {
			.focus_item_group {
				.focus_item {
					.btn {
						width: 20px !important;
						height: 20px !important;
						&:after {
							width: 10px !important;
							height: 10px !important;
						}
					}
					.name {
						padding: 6px 10px !important;
						font-size: $font_xs !important;
					}
				}
			}
		}
	}
}
@media all and (max-width: 800px) {
	.line_up {
		&.natus_signature {
			.img_cursor {
				.focus_item_group {
					.focus_item {
						&.item_1 {
							top: 55%;
							left: 20% !important;
						}
						&.item_2 {
							top: 20% !important;
							left: 54% !important;
						}
						&.item_3 {
							top: 68%;
							left: 73%;
						}
					}
				}
			}
		}
	}
}

@media all and (max-width: 600px) {
	.line_up {
		&.natus_signature {
			.img_cursor {
				.focus_item_group {
					.focus_item {
						&.item_1 {
							top: 55%;
							left: 18% !important;
						}
						&.item_2 {
							top: 20% !important;
							left: 54% !important;
						}
						&.item_3 {
							top: 68%;
							left: 70% !important;
						}
					}
				}
			}
		}
	}
}

@media all and (max-width: 480px) {
	.line_up {
		&.natus_signature {
			.img_cursor {
				.focus_item_group {
					.focus_item {
						&.item_1 {
							top: 40% !important;
							left: 15% !important;
						}
						&.item_2 {
							top: 18% !important;
							left: 46% !important;
						}
						&.item_3 {
							top: 50% !important;
							left: 68% !important;
						}
					}
				}
			}
		}
	}
}
</style>
