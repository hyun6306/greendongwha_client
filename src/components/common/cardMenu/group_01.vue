<template>
	<v-row
		class="ma-0 slide_wrapper"
		align="center"
		@mouseover="hover = true"
		@mouseout="hover = false"
	>
		<v-col
			v-show="scroll && hideArrow !== true && hover"
			cols="1"
			class="btn_slide_back hidden-lg-and-down pa-0"
			align="center"
		>
			<v-btn
				icon
				text
				x-large
				@click="moveScroll('back')"
			>
				<v-img
					width="100%"
					:src="require('@/assets/img/icon/arrow_left.png')"
				/>
			</v-btn>
		</v-col>
		<v-col
			cols="12"
			class="pa-0 grid-container"
		>
			<main class="main">
				<div
					class="card_wrap"
					:class="`items_${menuType}`"
					:data-key="menuType"
				>
					<v-col
						v-for="(menu, n) in cardMenu"
						:key="n"
						class="card_item pa-0 item"
						:style="`width:${menuWidth}`"
					>
						<CommonCardMenuCard03
							v-if="menuType.includes('scrap')"
							:menu="menu"
							@submit="onClick"
						/>
						<CommonCardMenuCard04
							v-else-if="menuType.includes('register')"
							:menu="menu"
							@submit="onClick"
						/>
						<CommonCardMenuCardYoutube
							v-else-if="menuType.includes('video')"
							:menu="menu"
							@submit="onClick"
						/>
						<CommonCardMenuCard01
							v-else
							:menu="menu"
							@submit="onClick"
						/>
					</v-col>
				</div>
			</main>
		</v-col>
		<v-col
			v-show="scroll && hideArrow !== true && hover"
			cols="1"
			class="btn_slide_forward hidden-lg-and-down pa-0"
			align="center"
		>
			<v-btn
				icon
				text
				x-large
				@click="moveScroll('forward')"
			>
				<v-img
					width="100%"
					:src="require('@/assets/img/icon/arrow_right.png')"
				/>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
	name: 'CardMenuGroup01',
	mixins: [common],
	props: ['menuType', 'cardMenu', 'hideArrow'],
	data: () => ({
		scroll: false,
		hover: false,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
		menuWidth() {
			return this.menuType === 'housewarming' ? `31.2%` : `23%`
		},
	},
	watch: {
		APP_GET_APP_WIDTH(val) {
			if (val > 1910) return this.isScroll()
		},
		cardMenu() {
			// 새로운 데이터로 바뀔때 left = 0으로 설정
			const slider = document.querySelector(`.items_${this.menuType}`)
			slider.scrollLeft = 0

			this.isScroll()
		},
	},
	created() {},
	mounted() {
		// 터치 슬라이드가 가능하도록
		const slider = document.querySelector(`.items_${this.menuType}`)
		this.common_touchScroll(slider)

		// 너무 초기에 width값을 가져오게 되면 scroll값을 가져오지 못함
		// 0.5초뒤에 함수실행
		setTimeout(() => {
			this.isScroll()
		}, 500)
	},
	methods: {
		onClick(val) {
			this.$emit('submit', val)
		},
		isScroll() {
			const scroll = document.getElementsByClassName('card_wrap')
			let value = false
			for (let element of scroll) {
				console.log('isScroll', element.dataset.key, this.menuType, this.cardMenu)
				if (element.dataset.key === this.menuType) {
					console.log('isScroll', element.scrollWidth, element.clientWidth)
					value = element.scrollWidth > element.clientWidth
				}
			}
			this.scroll = value
		},
		moveScroll(method) {
			const scroll = document.getElementsByClassName('card_wrap')
			for (let element of scroll) {
				if (element.dataset.key === this.menuType) {
					method === 'back' ? (element.scrollLeft -= 200) : (element.scrollLeft += 200)
				}
			}
		},
	},
}
</script>

<style scoped lang="scss">
.grid-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: auto 1fr auto;
}

.main {
	grid-area: main;
	padding: 0;
	overflow-x: hidden;
	overflow-y: hidden;
}

.items,
.items_scrap,
.items_register,
.items_product,
.items_video {
	position: relative;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	transition: all 0.2s;
	transform: scale(0.98);
	will-change: transform;
	user-select: none;
	cursor: pointer;
}
.items_video {
	white-space: nowrap;
}
.item {
	display: inline-block;
}

.slide_wrapper {
	position: relative;
}
.card_wrap {
	display: flex;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	flex-direction: row;
	-webkit-overflow-scrolling: touch;
	.card_item {
		//width:23% !important;
		margin: 0 1% !important;
	}
	:deep(.card .basic_card) {
		width: 100% !important;
	}
}

.btn_slide_back {
	position: absolute !important;
	top: 35%;
	left: -100px;
	.v-image {
		width: 30px !important;
	}
	:deep(.v-image__image--cover) {
		background-size: inherit !important;
	}
}
.btn_slide_forward {
	position: absolute !important;
	top: 35%;
	right: -100px;
	.v-image {
		width: 30px !important;
	}
	:deep(.v-image__image--cover) {
		background-size: inherit !important;
	}
}

::-webkit-scrollbar {
	display: none !important;
	z-index: 10000;
	-webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
	width: 10px;
}
::-webkit-scrollbar:horizontal {
	height: 5px;
}
::-webkit-scrollbar-track {
	background: #ededed;
	border-radius: 3px;
}
::-webkit-scrollbar-thumb {
	background: #414141;
	border-radius: 3px;
}

@media all and (min-width: 981px) and (max-width: 1280px) {
	.card_wrap {
		.card_item {
			width: 31.3% !important;
		}
	}
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.card_wrap {
		.card_item {
			width: 31.3% !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.card_wrap {
		.card_item {
			width: 48% !important;
		}
	}
}
@media all and (max-width: 380px) {
	.card_wrap {
		.card_item {
			width: 48% !important;
		}
	}
}
</style>
