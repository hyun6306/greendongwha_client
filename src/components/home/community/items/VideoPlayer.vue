<template>
	<v-dialog
		v-model="model"
		width="840"
		persistent
		content-class="elevation-0"
	>
		<v-col
			class="pa-0 player_header"
			align="end"
		>
			<v-btn
				icon
				class="close_button"
				color="white"
				@click="closeDialog"
				><v-icon size="30">mdi-close</v-icon></v-btn
			>
		</v-col>
		<!-- <div class="video_container"> -->
		<!-- <iframe
				:src="`http://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&rel=0`"
				frameborder="0"
				allowfullscreen
			></iframe> -->
		<HomeCommunityItemsYoutubeIframe :video-id="videoId" />
		<!-- </div> -->
	</v-dialog>
</template>

<script>
import model from '@/mixins/model'
export default {
	name: 'HomeCommunityItemsVideoPlayer',
	mixins: [model],
	props: ['url', 'dialog'],
	computed: {
		videoId() {
			return this.url.split('/').pop().split('=').pop()
		},
	},
	mounted() {},
	methods: {
		closeDialog() {
			this.$emit('close')
		},
	},
}
</script>

<style lang="scss" scoped>
.video_container {
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 30px;
	height: 0;
	overflow: hidden;
}

.video_container iframe,
.video_container object,
.video_container embed {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
