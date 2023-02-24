<template>
	<div class="pa-0 card">
		<!-- basic_card : 기본카드유형 -->
		<div class="basic_card">
			<div
				class="card_img"
				@click="onClick"
			>
				<v-img
					:src="menu.image"
					eager
					width="100%"
					max-height="300"
				>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"
							align="center"
							justify="center"
						>
							<v-progress-circular
								indeterminate
								color="grey lighten-5"
							></v-progress-circular>
						</v-row>
					</template>

					<!-- 인기제품 플래그 -->
					<v-col
						v-for="(flag, i) in menu.flagItems"
						:key="i"
						class="pa-0"
					>
						<span class="flag">{{ flag }}</span>
					</v-col>

					<!-- 상호명 노출 -->
					<p
						v-if="menu.business_name"
						class="store"
					>
						{{ menu.business_name }}
					</p>
				</v-img>
			</div>

			<div
				class="card_txt"
				:class="type === 'product_menu' ? 'card_product_txt' : ''"
			>
				<!-- 카테고리 and 북마크 -->
				<div
					class="d-flex justify-space-between mb-2"
					align-self="center"
				>
					<div>
						<span class="menu_type tal">
							{{ menu.kind_name }}
							<span
								v-if="menu.new_YN === 'Y'"
								class="new"
							>
								신제품
							</span>
						</span>
					</div>
					<v-btn
						v-if="AUTH_GET_USER_AUTH !== 'AGENCY'"
						class="mark"
						@click="onScrap(menu)"
					>
						<v-icon v-if="scrapStatus(menu)">mdi-bookmark-outline</v-icon>
						<v-icon v-else>mdi-bookmark</v-icon>
					</v-btn>
				</div>

				<!-- 타이틀 -->
				<v-col
					class="pa-0"
					align="start"
					@click="onClick"
				>
					<p class="tit">{{ menu.title }}</p>
				</v-col>

				<!-- 카테고리노출 / 서브문구 / 키워드태그 -->
				<v-col
					class="pa-0"
					fill-height
					align-self="center"
				>
					<p
						class="path_text tal"
						@click="onClick"
					>
						{{ menu.text }}
					</p>
					<p
						v-if="menu.subTitle"
						class="pb-0 sub_tit tal"
						@click="onClick"
					>
						{{ menu.subTitle }}
					</p>
					<div class="keyword tal">
						<span
							v-for="(tag, i) in menu.tags"
							:key="i"
							class="tag"
						>
							{{ tag }}
						</span>
					</div>
				</v-col>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import common from '@/mixins/common'
import scrap from '@/mixins/scrap'

export default {
	name: 'CardMenuCard01',
	mixins: [common, scrap],
	props: ['menu', 'type'],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH']),
		// videoThumbnail(){
		// 	let id = null
		// 	if (this.menu.video) {
		// 		id = this.searchParam('v') != null ? this.searchParam('v') : this.menu.video.split('/').pop()
		// 	}
		// 	return id != null? id : ''
		// },
		homePath() {
			return this.common_recentlyRouterPath === '/home'
		},
		productSearchPath() {
			return this.common_recentlyRouterPath === '/product/search'
		},
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_RECENT_PRODUCT', 'APP_MU_SNACKBAR']),
		// searchParam(key) {
		// 	return new URL(this.menu.video).searchParams.get(key);
		// },
		scrapStatus(menu) {
			let scrapCheck
			if (this.homePath) scrapCheck = this.scrap_check_list(menu.id, menu.scrap_code)
			else if (this.productSearchPath) scrapCheck = this.scrap_check_list(menu.id, menu.con_gubun)
			else scrapCheck = this.scrap_check_list(menu.id)
			return scrapCheck === 'post'
		},
		goToVideo(menu) {
			window.open(menu.video)
		},
		onClick() {
			if (this.menu.video) return this.goToVideo(this.menu)
			this.APP_MU_RECENT_PRODUCT(this.menu)
			this.$emit('submit', this.menu)
			// this.$router.push('/product/detail/0')
			// video 소스일 경우
			// if(this.menu.video) {
			// 	if (this.$refs.videoPlayer.paused) {
			// 		this.$refs.videoPlayer.play()
			// 	} else {
			// 		this.$refs.videoPlayer.pause()
			// 	}
			// }
		},
		onScrap(menu) {
			// console.log('homePath', menu)
			// console.log('homePath', this.homePath)
			// console.log('homePath', this.common_recentlyRouterPath)
			// console.log('homePath', this.$route.meta)
			if (this.homePath) this.scrap_call(menu.id, 'list', menu.scrap_code)
			else if (this.productSearchPath) this.scrap_call(menu.id, 'list', menu.con_gubun)
			else this.scrap_call(menu.id, 'list')
		},
	},
}
</script>

<style scoped lang="scss">
// 한줄이상 (...)처리
@mixin ellipsis {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

// 한줄이상 (...)처리
@mixin ellipsis_1 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 1 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

// 카드타입 기본형
.basic_card {
	width: 23% !important;
	margin: 0 1% 30px;
	float: left;
	background-color: #fff;
	// border:1px solid #eee;
	cursor: pointer;
}

.card_img {
	position: relative;
	.v-image {
		height: 300px;
	}
	.flag {
		float: left;
		padding: 7px 10px;
		margin-right: 2px;
		font-family: 'Lucida-Bright' !important;
		font-size: 14px !important;
		font-weight: bold;
		line-height: 1;
		color: #fff !important;
		background-color: #f97729;
		opacity: 0.75;
	}
	.store {
		padding: 5px;
		position: absolute;
		right: 0;
		bottom: 0;
		font-family: 'NotoSansKR-Light';
		font-size: 12px !important;
		font-weight: bold;
		line-height: 1;
		color: #fff !important;
		background-color: #000;
		opacity: 0.7;
	}
}

.card_txt {
	height: 130px;
	padding: 12px;
	color: #262626;
	line-height: 1.2;
	word-break: keep-all;
	.menu_type {
		@include ellipsis_1;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 14px;
		line-height: 20px !important;
	}
	.new {
		display: inline-block;
		position: relative;
		padding-left: 10px;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 12px;
		color: #fa2a6f;
		&:before {
			display: block;
			position: absolute;
			left: 3px;
			top: 8px;
			width: 5px;
			height: 5px;
			background-color: #e1e1e1;
			border-radius: 50%;
			content: '';
		}
	}
	.mark {
		&.v-btn {
			height: 20px;
			min-width: 20px;
			padding: 0 !important;
			font-size: 20px;
			box-shadow: none !important;
			border-radius: 0 !important;
			background-color: transparent !important;
			.v-icon.v-icon {
				font-size: 20px;
				color: #00582c;
			}
		}
	}
	.tit {
		@include ellipsis_2;
		margin-bottom: 6px !important;
		font-family: 'NotoSansKR-Bold' !important;
		font-size: 18px !important;
	}
	.path_text,
	.sub_tit {
		@include ellipsis;
		font-family: 'NotoSansKR-Light';
		font-size: 12px;
		color: #7f7f7f;
		line-height: 1;
	}
	.keyword {
		margin-top: 8px;
		white-space: nowrap;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			height: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: transparent;
			// background-color:#ccc;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
			// background-color:#eee;
		}
		// -ms-overflow-style:none;
		// &::-webkit-scrollbar{display:none;}
		span {
			display: inline-block;
			padding: 6px 10px;
			margin-bottom: 2px;
			margin-right: 3px;
			font-family: 'NotoSansKR-Light' !important;
			font-size: 11px !important;
			line-height: 1;
			color: #262626 !important;
			background-color: #f1f2f3 !important;
			border-radius: 50px;
		}
	}
}

// 카드높이 제어
//.knowhow .card_txt {
//	height: 120px !important;
//}
.card_product_txt {
	height: 90px !important;
}
@media all and (min-width: 981px) and (max-width: 1280px) {
	.basic_card {
		width: 31.3% !important;
	}
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.basic_card {
		width: 31.3% !important;
	}
	.card_img {
		.v-image {
			height: 225px !important;
		}
		.flag {
			font-size: 13px !important;
		}
	}
	.card_txt {
		.menu_type {
			font-size: 13px !important;
		}
		.tit {
			font-size: 15px !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.card_product_txt {
		height: 55px !important;
	}
	.basic_card {
		width: 48% !important;
	}
	.card_img {
		.v-image {
			height: 163px !important;
		}
		.flag {
			padding: 6px !important;
			font-size: 12px !important;
		}
	}
	.card_txt {
		padding: 8px;
		.menu_type {
			font-size: 12px !important;
			line-height: 1.25rem !important;
			height: 1.25rem !important;
		}
		.tit {
			font-size: 14px !important;
			line-height: 1.25rem !important;
			height: 2.5rem !important;
		}
		.keyword {
			span {
				padding: 5px 10px;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.basic_card {
		width: 48% !important;
	}
	.card_img {
		.v-image {
			height: 163px !important;
		}
		.flag {
			padding: 6px !important;
		}
	}
	.card_txt {
		padding: 4px;
		.menu_type {
			font-size: 12px !important;
		}
		.tit {
			font-size: 12px !important;
			line-height: 1.15rem !important;
			height: 2.3rem !important;
		}
		.keyword {
			span {
				padding: 5px 10px;
			}
			-ms-overflow-style: none;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}
</style>
