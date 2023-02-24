<template>
	<div class="bestseller">
		<div class="py-7 pt-md-12 pb-md-10 tac desc">
			<p class="mb-4">강마루 시장의 베스트 셀러!</p>
			<span>
				동화자연마루의 대표 마루 나투스진 <br />
				라인업을 소개합니다.
			</span>
		</div>

		<div class="py-5 product">
			<div class="px-4 px-md-0 wrapper">
				<v-row class="ma-0">
					<v-col
						v-for="(item, i) in bestsellerItems"
						:key="i"
						class="pa-0 mb-2 mb-md-0 item"
						cols="4"
						md="2"
						align="center"
					>
						<div class="mx-2 mx-md-4">
							<v-img
								eager
								:src="item.image"
								width="100%"
								max-width="188"
							>
								<p>{{ item.text }}</p>
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
	name: 'HomeProductBrandNatusJinLineup',
	components: {},
	data: () => ({
		bestsellerItems: [
			{
				text: 'Natus Jin',
				image: require('@/assets/img/natus/img_product1.png'),
			},
			{
				text: 'TERA',
				image: require('@/assets/img/natus/img_product2.png'),
			},
			{
				text: 'HERRING BONE',
				image: require('@/assets/img/natus/img_product3.png'),
			},
			{
				text: 'GRANDE',
				image: require('@/assets/img/natus/img_product4.png'),
			},
			{
				text: 'TEXTURE',
				image: require('@/assets/img/natus/img_product5.png'),
			},
			{
				text: 'NATURE',
				image: require('@/assets/img/natus/img_product6.png'),
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
.bestseller {
	.desc {
		p {
			color: $color_font;
			font-size: $font_tit;
			font-weight: $fw_bold;
		}
		span {
			color: $color_gray6;
			font-size: $font_xl;
			font-weight: $fw_normal;
		}
	}
	.product {
		background-color: $color_gray5;
		.wrapper {
			.row {
				margin: 0 -16px !important;
			}
			.item {
				position: relative;
				p {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: $color_white !important;
					font-size: $font_xl;
					font-weight: $fw_bold;
				}
			}
		}
	}
}
@media all and (max-width: 959px) {
	.bestseller {
		.desc {
			p {
				font-size: $font_lg !important;
			}

			span {
				font-size: $font_normal !important;
			}
		}

		.product {
			.wrapper {
				.row {
					margin: 0 !important;
				}

				.item {
					p {
						font-size: $font_normal !important;
					}
				}
			}
		}
	}
}
</style>
