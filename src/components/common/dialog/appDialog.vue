<template>
	<v-dialog
		v-model="dialog"
		persistent
		width="600"
		min-height="600"
	>
		<v-card class="pa-0">
			<v-carousel
				:continuous="false"
				:show-arrows="true"
				delimiter-icon="mdi-color-helper"
				hide-delimiter-background
				class="slide_type01"
				height="100%"
				:hide-delimiters="items.length === 1"
			>
				<v-carousel-item
					v-for="(item, i) in items"
					:key="i"
					:class="item.popuplink_url ? 'clickCursor' : ''"
					@click="onClickPushLink(item.popuplink_url)"
				>
					<v-row class="ma-0">
						<v-col
							v-if="item.popup_kind === 'IMAGE'"
							class="pa-0 popup_item"
						>
							<v-img
								cover
								:src="item.popup_url"
							/>
						</v-col>
						<v-col
							v-if="item.popup_kind === 'EDITOR'"
							class="pa-0 popup_item"
						>
							<p
								class="popup_item_editor"
								v-html="item.description"
							></p>
						</v-col>
						<v-col
							v-if="item.popup_kind === 'VIDEO'"
							class="pa-0 popup_item"
						>
							<div
								class="youtube_container"
								style="width: 100%"
							>
								<iframe
									:src="item.popup_url"
									frameborder="0"
									width="100%"
									height="100%"
								/>
							</div>
							<!-- <HomeCommunityItemsYoutubeIframe :video-id="item.popup_url.split('/').pop()" /> -->
						</v-col>
					</v-row>
				</v-carousel-item>
			</v-carousel>
			<v-col
				cols="12"
				class="pa-0"
			>
				<v-row
					class="ma-0"
					align="center"
				>
					<v-col
						cols="6"
						class="pa-0"
					>
						<v-btn
							block
							large
							tile
							@click="noPopupOneDay"
						>
							하루 보지 않기
						</v-btn>
					</v-col>
					<v-col
						cols="6"
						class="pa-0"
						@click="$emit('close')"
					>
						<v-btn
							block
							large
							color="primary"
							tile
						>
							닫기
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'CommonDialogAppDialog',
	props: ['dialog', 'items'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	async mounted() {},
	destroyed() {},
	methods: {
		noPopupOneDay() {
			this.$cookies.set(this.items[0].location, 'false', '1d')
			this.$emit('close')
		},
		onClickPushLink(link) {
			if (link.length) location.href = link
		},
	},
}
</script>

<style scoped lang="scss">
:deep(.theme--dark.v-btn.v-btn--icon) {
	color: #6c6c6c;
}
:deep(.v-window__next) {
	background: transparent !important;
	.v-icon {
		font-size: 4rem !important;
	}
}
:deep(.v-window__prev) {
	background: transparent !important;
	.v-icon {
		font-size: 4rem !important;
	}
}

.v-card {
	box-shadow: none;
	border-radius: 0 !important;
}

.popup_item {
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 80px;
	height: 600px;
	margin-bottom: 20px;
	overflow-y: auto;
	overflow-x: hidden;
	word-break: keep-all;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 25px;
	}
	img {
		width: 100%;
		height: auto;
	}
}

:deep(.popup_item_editor) {
	width: 100%;
	.ql-align-left {
		text-align: left;
	}
	.ql-align-right {
		text-align: right;
	}
	.ql-align-center {
		text-align: center;
	}
	.ql-align-justify {
		text-align: justify;
	}
}

.youtube_container {
	aspect-ratio: 16/9;
}
</style>
