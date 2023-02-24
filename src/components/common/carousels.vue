<template>
	<v-carousel
		v-model="model"
		:show-arrows="false"
		delimiter-icon="mdi-color-helper"
		hide-delimiter-background
		class="slide_type01"
		:style="`height:${height} !important`"
		cycle
	>
		<v-carousel-item
			v-for="(item, i) in items"
			:key="i"
			:src="item.src"
		>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
import model from '@/mixins/model'

export default {
	name: 'Carousels',
	mixins: [model],
	props: ['items', 'height'],
	data: () => ({}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="scss">
.v-window.slide_type01 {
	border-radius: 10px;
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
}
</style>
