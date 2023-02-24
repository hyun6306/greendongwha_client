<template>
	<v-row class="ma-0 mb-5">
		<v-col
			class="pa-0"
			cols="6"
			@click="$emit('click')"
		>
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
		</v-col>
		<v-col
			class="pa-0 desc"
			cols="6"
			align-self="center"
		>
			<div class="ml-5 my-2">
				{{ item.title }}
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'HomeCommunityHomeMaruTvSubYoutube',
	props: ['item'],

	computed: {
		thumbnail() {
			const videoId = this.item.video_url.split('/').pop().split('=').pop()
			return `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
		},
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
@mixin ellipsis_3 {
	display: -webkit-box !important;
	height: 75px !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 3 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
.sub_youtube {
	.desc {
		@include ellipsis_3;
		color: $color_font;
		font-size: $font_normal;
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
</style>
