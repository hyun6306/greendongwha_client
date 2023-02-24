<template>
	<v-btn-toggle
		v-model="model"
		group
		mandatory
		class="toggle_group_btn"
		active-class="toggle_active_btn"
	>
		<v-btn
			v-for="(item, i) in items"
			:key="i"
			height="38"
			:class="`toggle_button_05_${i}`"
			class="mr-2 toggle_normal_btn"
			@click="selectItem(item, i)"
		>
			<CommonTooltipType02
				:title="item.text"
				:tooltip="item.tooltip"
				:is-tooltip="item.tooltip != null"
				span-class-name="pl-2 pr-3 toggle_group_btn_txt"
			/>
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import common from '@/mixins/common'
import model from '@/mixins/model'

export default {
	name: 'ToggleButton05',
	mixins: [model, common],
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {}
	},
	computed: {},
	watch: {
		model(val) {
			if (val) this.horizontalSelectScroll(val)
		},
	},
	created() {},
	mounted() {
		// 터치 슬라이드가 가능하도록
		const slider = document.querySelector(`.toggle_group_btn`)
		this.common_touchScroll(slider)
	},
	methods: {
		selectItem(item, i) {
			this.model = i
		},
		// 선택 button 가로 스크롤
		horizontalSelectScroll(i) {
			const selectButton = document.querySelector(`.toggle_button_05_${i}`)
			selectButton.scrollIntoView({ block: 'nearest', inline: 'nearest' })
		},
	},
}
</script>
<style scoped lang="scss">
.toggle_group_btn {
	overflow: scroll;
	flex-direction: row;
	width: 100%;
	-webkit-overflow-scrolling: touch;
	// 스크롤 보이기 제거
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&_txt {
		color: $color_black;
	}
}
// 스크롤 보이기 제거
.toggle_group_btn::-webkit-scrollbar {
	display: none !important; /* Chrome, Safari, Opera*/
}

.toggle_normal_btn {
	border-radius: 50px !important;
	font-size: $font_normal;
	color: $color_font;
	//background-color: #f1f2f3 !important;
	border: 1px solid #ccc !important;
	padding-left: 2rem;
	padding-right: 2rem;
}
.toggle_active_btn {
	color: white !important;
	background-color: #672666 !important;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1) !important;
	font-weight: bold !important;
	.toggle_group_btn {
		&_txt {
			color: $color_green1 !important;
			font-weight: bold !important;
		}
	}
}
.v-btn--active:hover::before,
.v-btn--active::before {
	opacity: 1;
	background-color: #672666 !important;
}
@media all and (max-width: 959px) {
	.v-btn-toggle--group > .v-btn.v-btn {
		border-radius: 30px !important;
	}
	.v-btn-toggle--group > .v-btn--active {
		background-color: #672666 !important;
	}
}
//@media screen and (max-width: 360px) {
//	.v-btn-toggle--group > .v-btn.v-btn {
//		font-size: $font_sm;
//	}
//}
</style>
