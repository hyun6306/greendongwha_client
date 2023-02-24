<template>
	<div class="youtube_container">
		<iframe
			id="youtube_player"
			:src="`http://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`"
			frameborder="0"
			allowfullscreen
			width="100%"
			height="100%"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		></iframe>
	</div>
</template>

<script>
export default {
	name: 'HomeCommunityItemsYoutubeIframe',
	props: {
		videoId: {
			type: String,
			default: '',
		},
	},
	data: () => ({
		player: null,
	}),
	mounted() {
		// this.setYoutubeApi()
		// this.initPlayer()
	},
	methods: {
		// setYoutubeApi() {
		// 	const script = document.createElement('script')
		// 	script.src = `https://www.youtube.com/iframe_api`
		// 	script.onload = this.initPlayer
		// 	document.head.appendChild(script)
		// },
		// initPlayer() {
		// 	console.log('init')
		// 	YT.ready(() => {
		// 		this.player = new YT.Player('youtube_player', {
		// 			events: {
		// 				onReady: this.onPlayerReady,
		// 			},
		// 		})
		// 		console.log('yt ready')
		// 		console.log(this.player)
		// 	})
		// },
		// onPlayerReady(event) {
		// 	console.log('onplayerready')
		// 	event.target.mute()
		// 	event.target.playVideo()
		// },
	},
}
</script>

<style lang="scss" scoped>
.youtube_container {
	aspect-ratio: 1.778;
	height: 100%;
}
</style>
