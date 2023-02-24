<template>
	<div
		class="pa-0 card"
		@click="onClick"
	>
		<!--
			[확인사항]
			1. 상태값 : 진행중 (class="event_card")
			2. 상태값 : 이벤트종료 (class="event_card result")
		-->

		<div
			class="event_card"
			:class="{ result: statusClass, home: isHome }"
		>
			<div class="card_img">
				<v-img
					:src="menu.image"
					width="100%"
					height="400"
				>
					<div class="close_event"><p>종료된 이벤트 입니다</p></div>
				</v-img>
				<v-col
					cols="12"
					class="pa-0"
					align="start"
				>
					<span
						class="event_state"
						:class="statusEvent"
						>{{ menu.state }}</span
					>
				</v-col>
			</div>
			<div class="card_txt">
				<v-col
					class="pa-0 px-6"
					align="start"
				>
					<p class="tit">{{ menu.title }}</p>
					<p class="date">{{ menu.date }}</p>
					<p class="result">{{ menu.result }}</p>
				</v-col>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardMenuCard06',
	props: ['menu', 'isHome'],
	data: () => ({}),
	computed: {
		statusClass() {
			return this.menu.current_status !== '1'
		},
		statusEvent() {
			let className = 'event_state'
			switch (this.menu.current_status) {
				case '1':
					// 이벤트 진행중
					className += '_start'
					break
				case '2':
					// 이벤트 진행 완료
					className += '_end'
					break
				case '3':
					// 이벤트 당첨자 발표
					className += '_win'
					break
			}
			return className
		},
	},
	created() {},
	mounted() {},
	methods: {
		onClick() {
			this.$emit('submit', this.menu)
		},
	},
}
</script>

<style scoped lang="scss">
@mixin ellipsis_2 {
	display: -webkit-box !important;
	word-wrap: break-word !important;
	-webkit-line-clamp: 2 !important;
	-webkit-box-orient: vertical !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}

.card {
	background-color: #fff;
	border-radius: 0 !important;
	cursor: pointer;

	// 이벤트상태 (진행중)
	.event_card {
		width: 31.3% !important;
		float: left;
		margin: 0 1% 40px;
		&:hover {
			// 마우스호버시 이미지 확대효과
			.v-image {
				position: relative;
				transform: scale(1.02);
				transition: 0.5s;
			}
		}
		.close_event {
			display: none !important;
		} // 이벤트종료 비활성
		.card_img {
			position: relative;
			overflow: hidden;
		}
		.event_state {
			position: absolute;
			top: 10px;
			left: 10px;
			padding: 6px 14px;
			font-family: 'NotoSansKR-Regular' !important;
			font-size: 13px;
			color: #fff;
			text-align: center;
			&_start {
				background-color: #70b341 !important;
			}
			&_end {
				background-color: #606060 !important;
			}
			&_win {
				background-color: #00582c !important;
			}
		}
		.card_txt {
			height: 135px;
			color: #262626 !important;
			line-height: 1.2 !important;
			padding: 20px 0 16px;
			word-break: keep-all;
			box-shadow: 8px 10px 1px -2px rgb(0 0 0 / 2%), 0px 5px 2px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 5%);
			.tit {
				@include ellipsis_2;
				font-family: 'NotoSansKR-Bold' !important;
				font-size: 18px;
				max-height: 45px !important;
				margin-bottom: 14px !important;
				word-break: keep-all;
			}
			.date {
				margin-bottom: 10px !important;
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 14px;
				color: #a0a1a5;
			}
			.result {
				font-family: 'NotoSansKR-Regular' !important;
				font-size: 14px;
				color: #a0a1a5;
			}
		}
	}

	// 이벤트상태 (종료)
	.event_card.result {
		&:hover {
			// 마우스호버시 이미지 확대효과 해제
			.v-image {
				transform: scale(1) !important;
			}
		}
		.close_event {
			display: block !important;
			width: 100% !important;
			height: 100%;
			position: absolute !important;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			p {
				// [문구] "종료된 이벤트 입니다"
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 20px;
				color: #fff;
				opacity: 1 !important;
				word-break: keep-all;
			}
		}
	}

	// community/home 에서는 꽉차게
	.event_card.home {
		width: initial !important;
		float: none !important;
	}
}

@media all and (min-width: 981px) and (max-width: 1280px) {
}
@media all and (min-width: 769px) and (max-width: 980px) {
	.card {
		.event_card {
			width: 48% !important;
		}
	}
}
@media all and (min-width: 380px) and (max-width: 768px) {
	.card {
		.event_card {
			width: 100% !important;
			margin: 0 1% 30px;
		}
	}
}
@media all and (max-width: 380px) {
	.card {
		.event_card {
			width: 100% !important;
			margin: 0 1% 30px;
		}
	}
}
</style>
