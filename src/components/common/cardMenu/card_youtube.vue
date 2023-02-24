<template>
	<div class="pa-0 card">
		<!-- basic_card : 기본카드유형 -->
		<div class="basic_card">
			<div
				class="card_img"
				@click="onClick"
			>
				<iframe
					v-if="menu.video"
					width="100%"
					max-height="170"
					:src="`${menu.video}?controls=0`"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="youtube_frame"
				/>
			</div>

			<div class="card_txt">
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
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name: 'CardMenuCard01',
	props: ['menu'],
	data: () => ({}),
	computed: {
		...mapGetters(['AUTH_GET_USER_AUTH', 'AUTH_GET_BOOKMARK']),
		bookmark() {
			return this.AUTH_GET_BOOKMARK.some(x => x.id === this.menu.id)
		},
		// videoThumbnail(){
		// 	let id = null
		// 	if (this.menu.video) {
		// 		id = this.searchParam('v') != null ? this.searchParam('v') : this.menu.video.split('/').pop()
		// 	}
		// 	return id != null? id : ''
		// }
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations(['APP_MU_SNACKBAR']),
		...mapActions(['AUTH_ACT_BOOKMARK']),
		// searchParam(key) {
		// 	return new URL(this.menu.video).searchParams.get(key);
		// },
		goToVideo(menu) {
			window.open(menu.video)
		},
		onClick() {
			if (this.menu.video) return this.goToVideo(this.menu)
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
		onScrap() {
			if (this.AUTH_GET_USER_AUTH !== 'USER') {
				this.APP_MU_SNACKBAR({
					title: '로그인이 필요합니다.',
					action: {
						name: '로그인',
						link: '/login',
					},
				})
			} else {
				this.AUTH_ACT_BOOKMARK(this.menu)
			}
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
	border: 1px solid #ccc;
	cursor: pointer;
}

.youtube_frame {
	border: none !important;
}
.card_txt {
	height: 60px;
	padding: 12px;
	color: #262626;
	line-height: 1.2;
	word-break: keep-all;
	.tit {
		@include ellipsis;
		margin-bottom: 6px !important;
		font-family: 'NotoSansKR-Regular' !important;
		font-size: 15px !important;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.basic_card {
		width: 31.3% !important;
	}
	.card_img {
		.v-image {
			height: 225px !important;
		}
	}
	.card_txt {
		.tit {
			font-size: 15px !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.basic_card {
		width: 48% !important;
	}
	.card_img {
		.v-image {
			height: 163px !important;
		}
	}
	.card_txt {
		padding: 8px;
		.tit {
			font-size: 14px !important;
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
	}
	.card_txt {
		padding: 4px;
		.tit {
			font-size: 14px !important;
		}
	}
}
</style>
