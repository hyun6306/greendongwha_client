<template>
	<v-row
		class="ma-0 slide_wrapper"
		align="center"
	>
		<v-col
			v-show="scroll"
			cols="1"
			class="btn_slide_back hidden-lg-and-down pa-0"
		>
			<v-btn
				icon
				text
				x-large
				@click="moveScroll('back')"
			>
				<v-img
					eager
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
					>
						<CommonCardMenuCard05
							:menu="menu"
							class="short"
							@submit="onClick"
						/>
					</v-col>
				</div>
			</main>
		</v-col>
		<v-col
			v-show="scroll"
			cols="1"
			class="btn_slide_forward hidden-lg-and-down pa-0"
		>
			<v-btn
				icon
				text
				x-large
				@click="moveScroll('forward')"
			>
				<v-img
					eager
					width="100%"
					:src="require('@/assets/img/icon/arrow_right.png')"
				/>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'CardMenuGroup03',
	props: ['menuType', 'cardMenu'],
	data: () => ({
		scroll: false,
	}),
	computed: {
		...mapGetters(['APP_GET_APP_WIDTH']),
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
		const slider = document.querySelector(`.items_${this.menuType}`)
		this.touchScroll(slider)

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
		touchScroll(slider) {
			let isDown = false
			let startX
			let scrollLeft

			slider.addEventListener('mousedown', e => {
				isDown = true
				slider.classList.add('active')
				startX = e.pageX - slider.offsetLeft
				scrollLeft = slider.scrollLeft
			})
			slider.addEventListener('mouseleave', () => {
				isDown = false
				slider.classList.remove('active')
			})
			slider.addEventListener('mouseup', () => {
				isDown = false
				slider.classList.remove('active')
			})
			slider.addEventListener('mousemove', e => {
				if (!isDown) return
				e.preventDefault()
				const x = e.pageX - slider.offsetLeft
				const walk = (x - startX) * 3 //scroll-fast
				slider.scrollLeft = scrollLeft - walk
				// console.log(walk);
			})
		},
		isScroll() {
			const scroll = document.getElementsByClassName('card_wrap')
			let value = false
			for (let element of scroll) {
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
	//grid-template-columns: inherit;
	//grid-template-rows: auto 1fr auto;
}

.main {
	grid-area: main;
	padding: 0;
	overflow-x: hidden;
	overflow-y: hidden;
}

.items {
	position: relative;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	transition: all 0.2s;
	transform: scale(0.98);
	will-change: transform;
	user-select: none;
	cursor: pointer;
}
.items_3d {
	position: relative;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	transition: all 0.2s;
	transform: scale(0.98);
	will-change: transform;
	user-select: none;
	cursor: pointer;
}
.items_special {
	position: relative;
	width: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	transition: all 0.2s;
	transform: scale(0.98);
	will-change: transform;
	user-select: none;
	cursor: pointer;
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
		width: 410px !important;
		margin: 0 10px 10px !important;
		border: 1px solid #ccc;
		flex-grow: 0;
	}
}

.btn_slide_back {
	position: absolute !important;
	top: 30%;
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
	top: 30%;
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
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.card_wrap {
		.card_item {
			width: 410px !important;
			margin: 0 10px 10px !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.card_wrap {
		.card_item {
			width: 300px !important;
			margin: 0 10px 10px !important;
			:deep(.v-image) {
				width: 100px !important;
				height: 100px !important;
			}
		}
	}
}
@media all and (max-width: 380px) {
	.card_wrap {
		.card_item {
			width: 300px !important;
			margin: 0 10px 10px !important;
			:deep(.v-image) {
				width: 100px !important;
				height: 100px !important;
			}
		}
	}
}
</style>
