<template>
	<div class="main_youtube">
		<!-- <div class="thumbnail clickCursor">
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
		</div> -->
		<HomeCommunityItemsYoutubeIframe :video-id="videoId" />
		<p class="my-4 desc">
			{{ item.title }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'HomeCommunityHomeMaruTvMainYoutube',
	props: ['item'],
	computed: {
		videoId() {
			return this.item.video_url.split('/').pop().split('=').pop()
		},
		thumbnail() {
			return `https://i3.ytimg.com/vi/${this.videoId}/hqdefault.jpg`
		},
	},
}
</script>

<style lang="scss" scoped>
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
.main_youtube {
	.desc {
		@include ellipsis_2;
		color: $color_font;
		font-size: $font_lg;
		font-weight: $fw_normal;
	}

	.thumbnail {
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		.dim {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			.icon_play {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
}

.no_desc {
	.desc {
		display: none !important;
	}
}
</style>
