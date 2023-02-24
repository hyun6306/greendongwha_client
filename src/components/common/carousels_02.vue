<template>
	<v-carousel
		v-model="model"
		class="slide_type02"
	>
		<template v-slot:prev="{ on, attrs }">
			<v-btn
				text
				x-large
				v-bind="attrs"
				v-on="on"
			>
				<v-img
					eager
					width="100%"
					:src="require('@/assets/img/icon/arrow_left.png')"
				/>
			</v-btn>
		</template>
		<template v-slot:next="{ on, attrs }">
			<v-btn
				text
				x-large
				v-bind="attrs"
				v-on="on"
			>
				<v-img
					eager
					width="100%"
					:src="require('@/assets/img/icon/arrow_right.png')"
				/>
			</v-btn>
		</template>
		<v-carousel-item
			v-for="(item, i) in items"
			:key="i"
		>
			<v-img
				:src="item.src"
				contain
				eager
				:class="item.link ? 'clickCursor' : ''"
				@click="onClickPushLink(item)"
			/>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
import common from '@/mixins/common'
import model from '@/mixins/model'

export default {
	name: 'Carousels02',
	mixins: [common, model],
	props: ['items', 'height'],
	data: () => {
		return {}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		onClickPushLink(item) {
			if (item.link) this.common_onLink(item.link)
		},
	},
}
</script>

<style scoped lang="scss">
.slide_type02 {
	overflow: initial !important;
	:deep(.v-image) {
		width: 100% !important;
		height: 100% !important;
	}
	//:deep(.v-image__image--contain) {
	//	background-size: cover !important;
	//}
	:deep(.v-carousel__controls) {
		bottom: -40px;
		background: none !important;
		.v-carousel__controls__item {
			background-color: none;
			.v-btn__content {
				margin: 0 2px;
				&::before {
					display: none;
				}
				i {
					width: 50px;
					height: 4px;
					background-color: #ccc;
					&::before {
						display: none;
					}
				}
			}
		}
		.v-carousel__controls__item.v-size--small {
			width: unset;
			height: unset;
			&.v-item--active.v-btn--active {
				width: 50px;
				height: 4px;
				border-radius: 0 !important;
				background-color: #44883d;
			}
		}
	}
	:deep(.v-window__prev) {
		left: -120px;
		background: none;
	}
	:deep(.v-window__next) {
		right: -120px;
		background: none;
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.slide_type02 {
		height: 100% !important;
		:deep(.v-sheet) {
			height: 100% !important;
		}
		:deep(.v-carousel__controls) {
			bottom: -30px;
			.v-carousel__controls__item {
				.v-btn__content {
					i {
						width: 30px !important;
					}
				}
			}
			.v-carousel__controls__item.v-size--small {
				&.v-item--active.v-btn--active {
					width: 30px !important;
				}
			}
		}
	}
	:deep(.v-window__prev),
	:deep(.v-window__next) {
		display: none !important;
	}
}
@media all and (max-width: 380px) {
	.slide_type02 {
		height: 100% !important;
		:deep(.v-sheet) {
			height: 100% !important;
		}
		:deep(.v-carousel__controls) {
			bottom: -30px;
			.v-carousel__controls__item {
				.v-btn__content {
					i {
						width: 30px !important;
					}
				}
			}
			.v-carousel__controls__item.v-size--small {
				&.v-item--active.v-btn--active {
					width: 30px !important;
				}
			}
		}
	}
	:deep(.v-window__prev) {
		display: none;
	}
	:deep(.v-window__next) {
		display: none;
	}
}
</style>
