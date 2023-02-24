<template>
	<v-card
		height="470"
		class="best_product pa-2 pa-sm-3 pa-md-8"
	>
		<div class="pt-6 pt-sm-5 pt-md-0 head">
			<p class="mb-2 title tac">베스트제품</p>
			<p class="mb-5 subtitle tac">동화자연마루 베스트제품</p>
		</div>
		<v-container class="pa-0">
			<v-carousel
				v-if="items.length"
				cycle
				height="340"
				hide-delimiter-background
				:show-arrows="false"
			>
				<v-carousel-item
					v-for="(slide, i) in filterItems"
					:key="i"
				>
					<div>
						<v-row
							v-for="(item, j) in slide"
							:key="j"
							class="ma-0 mb-2 content clickCursor"
							fill-height
							align="center"
						>
							<v-col
								class="pa-0 photo"
								cols="4"
								align="center"
								@click="pushLink(item)"
							>
								<v-img
									:src="item.image"
									eager
									cover
								/>
							</v-col>
							<v-col
								class="pa-0 text"
								cols="8"
								align="start"
							>
								<div class="pa-1">
									<p
										v-if="item.kind_name"
										class="category mb-0"
									>
										{{ item.kind_name }}
									</p>
									<p
										v-if="item.brand_name"
										class="theme mb-1"
									>
										{{ item.brand_name }} {{ item.goods_name }} {{ item.pattern_name }}
									</p>
									<!--                                    <p class="root">{{item.root}}</p>-->
								</div>
							</v-col>
						</v-row>
					</div>
				</v-carousel-item>
			</v-carousel>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: 'HomeMainBest',
	props: ['items'],
	data: () => ({}),
	computed: {
		filterItems() {
			let items = []
			let item = []
			this.items.forEach((element, i) => {
				if (i % 3 === 0) {
					item = []
					items.push(item)
				}
				item.push(element)
			})
			return items
		},
	},
	created() {},
	mounted() {},
	methods: {
		pushLink(item) {
			this.$router.push(`/product/detail/${item.product_id}`)
		},
	},
}
</script>

<style lang="scss" scoped>
@mixin ellipsis {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: keep-all;
	overflow: hidden;
	text-overflow: ellipsis;
}

.best_product {
	background: url('../../../assets/img/home/main/img_best_bg.png') no-repeat;
	background-size: cover;
	background-position: 0, 0;
	border-radius: 0 !important;
	box-shadow: none !important;

	.head {
		.title {
			font-family: 'NotoSansKR-Bold' !important;
			font-size: 22px !important;
		}
		.subtitle {
			font-family: 'NotoSansKR-Light' !important;
			font-size: 15px !important;
			color: #777 !important;
		}
	}

	.content {
		.photo {
			.v-image {
				width: 94px !important;
				height: 94px !important;
			}
		}
		.text {
			.category {
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 12px !important;
				color: #777;
			}
			.theme {
				@include ellipsis;
				max-height: 48px !important;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 16px !important;
				line-height: 1.2;
			}
			.root {
				@include ellipsis;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 13px !important;
				color: #777;
				max-height: 40px !important;
			}
		}
	}

	:deep(.v-item-group) {
		.v-carousel__controls {
			height: 40px;
		}
		button::before {
			display: none;
		}
		.v-icon {
			width: 10px;
			height: 10px;
		}
		.v-item--active.v-btn--active .v-icon.notranslate {
			background-color: #42883d;
		}
		.v-icon.notranslate {
			background-color: #fff;
			opacity: 1;
			border: 1px solid #42883d;
			border-radius: 50%;
		}
		.v-icon.notranslate::before {
			display: none !important;
		}
	}
}

@media all and (min-width: 960px) and (max-width: 1263px) {
	:deep(.v-item-group) {
		.v-carousel__controls {
			height: 40px !important;
		}
	}
}
@media all and (min-width: 600px) and (max-width: 959px) {
	:deep(.v-item-group) {
		.v-carousel__controls {
			height: 20px !important;
		}
	}
}
@media all and (max-width: 600px) {
	:deep(.v-item-group) {
		.v-carousel__controls {
			height: 20px !important;
		}
	}
}
</style>
