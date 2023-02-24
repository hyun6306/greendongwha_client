<template>
	<div class="mb-5 mx-0 mx-lg-3">
		<v-col class="px-6 py-5 pa-0 sns item">
			<v-row class="ma-0">
				<v-col
					class="pa-0"
					cols="4"
					align-self="center"
				>
					<p class="tit">SNS</p>
				</v-col>
				<v-col
					class="pa-0"
					cols="8"
				>
					<v-row class="ma-0 justify-end">
						<v-col
							class="pa-0 mr-1 clickCursor"
							cols="auto"
							@click="openWindow('https://www.youtube.com/channel/UChk6tpEqFFtBm_79Pr_pFaQ')"
						>
							<v-img
								:src="require('@/assets/img/community/sns_youtube.svg')"
								max-width="48"
								height="100%"
							/>
						</v-col>
						<v-col
							class="pa-0 mr-1 clickCursor"
							cols="auto"
							@click="openWindow('https://www.instagram.com/green_dongwha/')"
						>
							<v-img
								:src="require('@/assets/img/community/sns_insta.svg')"
								max-width="48"
								height="100%"
							/>
						</v-col>
						<v-col
							class="pa-0 clickCursor"
							cols="auto"
							@click="openWindow('https://blog.naver.com/dongwhagreen')"
						>
							<v-img
								:src="require('@/assets/img/community/sns_blog.svg')"
								max-width="48"
								height="100%"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-col>
	</div>
</template>

<script>
export default {
	name: 'CommunityHomeSns',
	components: {},
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		openWindow(url) {
			window.open(url, '_blank')
		},
	},
}
</script>

<style scoped lang="scss">
.sns.item {
	background-color: $color_white;
	border-radius: 16px;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
	.tit {
		font-size: $font_lg;
		font-weight: $fw_bold;
	}
}
@media all and (max-width: 1264px) {
	.sns.item {
		border-radius: 0 !important;
	}
}
@media all and (max-width: 380px) {
	.sns.item {
		.tit {
			font-size: $font_normal !important;
		}
	}
}
</style>
