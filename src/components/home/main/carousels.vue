<template>
	<v-carousel
		v-model="model"
		:show-arrows="false"
		delimiter-icon="mdi-color-helper"
		hide-delimiter-background
		class="slide_type01"
		:style="`height:${height} !important`"
		:interval="5000"
		cycle
	>
		<v-carousel-item
			v-for="(item, i) in carouselItems"
			:key="i"
			eager
		>
			<v-img
				:src="item.mainimage_url"
				contain
				eager
				:class="item.link_url ? 'clickCursor' : ''"
				@click="onClickPushLink(item)"
			>
				<v-col class="pa-7 text_area">
					<v-row align="start">
						<v-col cols="auto">
							<v-img
								:src="item.thumimage_url"
								contain
								eager
							/>
						</v-col>
					</v-row>
					<p
						v-if="item.title"
						class="text_area_title"
					>
						{{ item.title }}
					</p>
					<p
						v-if="item.contents"
						class="text_area_text"
					>
						{{ item.contents }}
					</p>
				</v-col>
			</v-img>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
import model from '@/mixins/model'
import common from '@/mixins/common'
import google_analytic from '@/mixins/google_analytic'

export default {
	name: 'HomeMainCarousels',
	mixins: [model, common, google_analytic],
	props: ['carouselItems', 'height'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {
		// console.log('Carousels', this.carouselItems)
	},
	methods: {
		onClickPushLink(item) {
			// google analytic
			this.google_analytic_push_event('click_main_banner', { button_location: item.title })
			this.common_onLink(item.link_url)
		},
	},
}
</script>

<style scoped lang="scss">
.v-window.slide_type01 {
	border-radius: 10px;
	:deep(.v-image) {
		width: 100% !important;
		height: 100% !important;
	}
	:deep(.v-image__image--contain) {
		background-size: cover !important;
	}
	:deep(.v-item-group) {
		button::before {
			display: none;
		}
		.v-btn--icon {
			width: 60px;
			height: 6px;
		}
		.v-item--active.v-btn--active .v-icon.notranslate {
			background-color: #42883d;
		}
		.v-icon.notranslate {
			width: 60px;
			height: 6px;
			justify-content: space-between;
			background-color: #fff;
			opacity: 1;
			border-radius: 4px;
		}
		.v-icon.notranslate::before {
			display: none !important;
		}
	}

	.text_area {
		max-width: 360px;
		position: absolute;
		bottom: 50%;
		transform: translate(0, 50%);
		right: 20px;
		background-color: rgba(1, 1, 1, 0.5);

		:deep(.v-image) {
			height: 36px !important;
			margin-bottom: 5px;
		}
		:deep(.v-image__image--contain) {
			background-size: inherit !important;
		}
		.text_area_title {
			padding-bottom: 10px;
			font-family: 'NotoSansKR-Regular';
			font-size: 22px;
			color: #fff;
		}
		.text_area_text {
			font-family: 'NotoSansKR-Regular';
			font-size: 14px;
			color: #fff;
		}
	}
}

.detail {
	height: 620px !important;
	border-radius: 0 !important;
	:deep(.v-image) {
		width: 100% !important;
		height: 100% !important;
	}
}
@media all and (min-width: 960px) and (max-width: 1263px) {
}
@media all and (min-width: 600px) and (max-width: 959px) {
	.v-window.slide_type01 {
		border-radius: 0 !important;
	}
}
@media all and (max-width: 600px) {
	.v-window.slide_type01 {
		border-radius: 0 !important;
	}
	.text_area {
		padding-bottom: 50px !important;
		max-width: 100% !important;
		position: absolute;
		bottom: 0 !important;
		right: 0 !important;
		transform: translate(0, 0) !important;
		&_title {
			font-size: 22px;
		}
		&_text {
			font-size: 14px;
		}
	}
}
</style>
