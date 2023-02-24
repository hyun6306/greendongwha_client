<template>
	<v-bottom-sheet
		v-model="search"
		transition="scroll-y-transition"
		elevation="0"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				v-show="show"
				class="btn_search"
				color="#4c4c4c"
				dark
				icon
				v-bind="attrs"
				width="30"
				height="30"
				v-on="on"
			>
				<v-img
					width="30"
					:src="require('@/assets/img/icon/icons_search.svg')"
				/>
			</v-btn>
		</template>

		<v-sheet
			class="text-center layout_align"
			max-width="1280px"
			min-height="300px"
		>
			<v-container class="pa-0 px-3 pt-8 px-md-10 pt-md-10">
				<v-row class="ma-0">
					<!-- 왼쪽 -->
					<v-col
						class="pa-0 pr-2 pr-md-5 left"
						cols="9"
					>
						<!-- 검색창 -->
						<v-row
							class="ma-0"
							align="center"
							justify="start"
						>
							<v-col
								cols="10"
								class="pa-0"
							>
								<v-text-field
									v-model="searchModel"
									label="검색어를 입력해주세요."
									clearable
									@keyup.enter="onClickSearch"
								/>
							</v-col>
							<v-col
								cols="2"
								class="pa-0 pl-2"
								align="start"
							>
								<v-btn
									icon
									class="pa-0"
									@click="onClickSearch"
								>
									<v-icon>search</v-icon>
								</v-btn>
							</v-col>
						</v-row>

						<!-- 최근검색어 -->
						<div
							class="recent pa-3"
							style="display: none"
						>
							<v-row class="ma-0 all">
								<v-col
									class="pa-0 tal"
									align-self="center"
									>최근검색어</v-col
								>
								<v-col class="pa-0 tar">
									<v-btn text>전체삭제</v-btn>
								</v-col>
							</v-row>
							<v-row class="ma-0 px-2 list">
								<v-col
									class="pa-0 tal"
									align-self="center"
									>마루</v-col
								>
								<v-col class="pa-0 tar">
									<v-btn icon>
										<v-icon small>clear</v-icon>
									</v-btn>
								</v-col>
							</v-row>
							<v-row class="ma-0 px-2 list">
								<v-col
									class="pa-0 tal"
									align-self="center"
									>나투스진</v-col
								>
								<v-col class="pa-0 tar">
									<v-btn icon>
										<v-icon small>clear</v-icon>
									</v-btn>
								</v-col>
							</v-row>
							<v-row class="ma-0 px-2 list">
								<v-col
									class="pa-0 tal"
									align-self="center"
									>시공사례</v-col
								>
								<v-col class="pa-0 tar">
									<v-btn icon>
										<v-icon small>clear</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</div>

						<!-- 추천검색어 -->
						<div class="recommend">
							<p class="tit mb-2">추천검색</p>
							<ul
								v-for="(item, i) in APPBAR_GET_SEARCH_KEYWORDS"
								:key="i"
								class="pa-0"
							>
								<li
									class="mb-1 clickCursor"
									@click="onLink(item.link_url)"
								>
									# {{ item.search_name }}
								</li>
							</ul>
						</div>
					</v-col>

					<!-- 오른쪽 -->
					<v-col
						class="pa-0 pl-2 pl-md-5 right"
						cols="3"
						@click="onLink(`/product/detail/${recommendProductItem.product_id}`)"
					>
						<!-- 추천상품 1개 -->
						<p class="mb-2 tit">추천상품</p>
						<v-img
							width="100"
							:src="recommendProductItem.image"
						/>
						<p class="name mt-1">{{ recommendProductItem.name }}</p>
					</v-col>
				</v-row>

				<!-- 닫기버튼 -->
				<v-col
					class="pa-0 py-7"
					cols="12"
					align="center"
				>
					<v-btn
						icon
						width="25"
						height="25"
						@click="search = !search"
					>
						<v-img
							width="25"
							:src="require('@/assets/img/icon/icon_close.png')"
						/>
					</v-btn>
				</v-col>
			</v-container>
		</v-sheet>
	</v-bottom-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'Search',
	mixins: [common],
	props: {
		show: {
			type: Boolean,
			default: true,
		},
	},
	data: () => ({
		search: false,
		zIndex: 0,
		searchModel: '',
	}),
	computed: {
		...mapGetters(['APPBAR_GET_SEARCH_KEYWORDS', 'APPBAR_GET_RECOMMEND_PRODUCT']),
		recommendProductItem() {
			return this.APPBAR_GET_RECOMMEND_PRODUCT[0] || {}
		},
	},
	watch: {
		search(val) {
			if (!val) {
				this.$emit('close')
				this.searchModel = ''
			}
		},
	},
	async created() {
		if (this.APPBAR_GET_SEARCH_KEYWORDS.length === 0) await this.getSearchList()
		if (this.APPBAR_GET_RECOMMEND_PRODUCT.length === 0) await this.getRecommendProduct()
	},
	mounted() {},
	methods: {
		...mapActions(['APPBAR_ACT_SEARCH_KEYWORDS', 'APPBAR_ACT_RECOMMEND_PRODUCT']),
		async getSearchList() {
			// 추천검색어
			await this.APPBAR_ACT_SEARCH_KEYWORDS().then(res => {
				console.log('APPBAR_GET_SEARCH_KEYWORDS', res)
			})
		},
		async getRecommendProduct() {
			// 추천제품
			await this.APPBAR_ACT_RECOMMEND_PRODUCT().then(res => {
				console.log('APPBAR_ACT_RECOMMEND_PRODUCT', res)
			})
		},
		onClickSearch() {
			this.$router.push(`/product/search?keyword=${this.searchModel.trim()}`).catch(() => {})

			// 검색 후 검색창 닫기
			setTimeout(() => {
				this.search = false
			}, 100)
		},
		onLink(link) {
			console.log(link)
			this.common_onLink(link)
			this.search = false
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.v-bottom-sheet.v-dialog) {
	align-self: flex-start;
	box-shadow: none;
}

.left {
	position: relative;
	min-height: 200px;
	border-right: 1px solid #ccc;
	.recent {
		width: calc(100% - 20px);
		position: absolute;
		top: 50px;
		box-shadow: 8px 10px 1px -2px rgb(0 0 0 / 2%), 0px 5px 2px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 5%);
		background-color: #fff;
		.all {
			font-family: 'NotoSansKR-Regular';
			font-size: 14px;
			color: #777;
			:deep(.v-btn__content) {
				font-family: 'NotoSansKR-Regular';
				font-size: 14px;
				color: #777;
			}
		}
		.list {
			font-family: 'NotoSansKR-Regular';
			font-size: 13px;
			color: #262626;
			:deep(.v-btn__content) {
				font-family: 'NotoSansKR-Regular';
				font-size: 14px;
				color: #777;
			}
			&:hover {
				background-color: #f8f8f8;
				border-radius: 8px;
			}
		}
	}
	.recommend {
		.tit {
			font-family: 'NotoSansKR-Regular';
			font-weight: 600;
			font-size: 16px;
			color: #262626;
			text-align: start;
		}
		ul {
			li {
				font-family: 'NotoSansKR-Regular';
				font-size: 14px;
				color: #262626;
				text-align: start;
				list-style: none;
			}
		}
	}
}
.right {
	.tit {
		font-family: 'NotoSansKR-Regular';
		font-weight: 600;
		font-size: 16px;
		color: #262626;
		text-align: start;
	}
	.name {
		font-family: 'NotoSansKR-Regular';
		font-size: 14px;
		color: #262626;
		text-align: start;
	}
}

@media all and (min-width: 600px) and (max-width: 959px) {
	.left {
		.recent {
			width: calc(100% - 8px);
		}
	}
}
@media all and (max-width: 768px) {
	.btn_search {
		:deep(.v-image) {
			max-width: 24px !important;
		}
	}
}
@media all and (max-width: 600px) {
	.left {
		.recent {
			width: calc(100% - 8px);
		}
		.recommend {
			.tit {
				font-size: 13px;
			}
			ul {
				li {
					font-size: 13px;
				}
			}
		}
	}
	.right {
		.tit {
			font-size: 13px;
		}
		.name {
			font-size: 13px;
		}
	}
}
</style>
