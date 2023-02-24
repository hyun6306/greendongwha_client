<template>
	<div
		class="mb-5 mb-md-10 card_maru_tv"
		@click="$emit('click')"
	>
		<div class="mx-2">
			<div class="thumbnail clickCursor">
				<v-img
					:src="thumbnail"
					height="100%"
					width="100%"
					aspect-ratio="1.8"
				/>
				<div class="dim">
					<v-img
						:src="require('@/assets/img/community/youtube_white.svg')"
						width="53"
						height="auto"
						class="icon_play"
					/>
				</div>
			</div>
			<p class="mt-2 mt-md-5 tal desc">{{ item.title }}</p>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name: 'CardMenuCardMaruTV',
	props: ['item'],
	data: () => ({}),
	computed: {
		thumbnail() {
			const videoId = this.item.video_url.split('/').pop().split('=').pop()
			return `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
		},
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
// 두줄이상 (...)처리
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.card_maru_tv {
	.desc {
		@include ellipsis_2;
		color: $color_font;
		font-size: $font_lg;
		font-weight: $fw_normal;
	}

	.thumbnail {
		position: relative !important;
		border-radius: 4px;
		overflow: hidden;
		.dim {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			.icon_play {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) !important;
			}
		}
	}
	.thumbnail:hover {
		.dim {
			display: block !important;
		}
	}
}
@media all and (max-width: 959px) {
	.maru_tv {
		.desc {
			@include ellipsis_2;
			font-size: $font_sm !important;
		}
	}
}
</style>
